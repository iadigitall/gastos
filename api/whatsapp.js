const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

function initFirebase() {
  if (getApps().length) return;
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

function normPhone(phone) {
  const d = String(phone || '').replace(/\D/g, '').replace(/^55/, '');
  // Normaliza número BR de 11 dígitos (DDD+9+8) para 10 dígitos (DDD+8)
  if (d.length === 11) return d.slice(0, 2) + d.slice(3);
  return d;
}

async function findUserByPhone(db, phone) {
  const normalized = normPhone(phone);
  console.log('Buscando telefone:', phone, '→ normPhone:', normalized);
  const snap = await db.ref('users').once('value');
  const users = snap.val();
  if (!users) { console.log('Nenhum usuario no Firebase'); return null; }
  for (const [uid, userData] of Object.entries(users)) {
    const tel = normPhone(userData?.profile?.telefone);
    console.log(`uid: ${uid} | tel Firebase: "${userData?.profile?.telefone}" → normPhone: "${tel}"`);
    if (tel && tel === normalized) return { uid, profile: userData.profile };
  }
  return null;
}

async function getUserData(db, uid) {
  const mesAtual = new Date().toISOString().slice(0, 7);
  const [profileSnap, mesesSnap, fixasSnap] = await Promise.all([
    db.ref(`users/${uid}/profile`).once('value'),
    db.ref(`users/${uid}/meses/${mesAtual}`).once('value'),
    db.ref(`users/${uid}/contasFixas`).once('value'),
  ]);
  return {
    profile: profileSnap.val() || {},
    mes: mesesSnap.val() || {},
    fixas: fixasSnap.val() || {},
    mesAtual,
  };
}

function fmt(n) { return Number(n || 0).toFixed(2); }

function resumoMes(data) {
  console.log('resumoMes data.mes:', JSON.stringify(data.mes).slice(0, 200));
  console.log('resumoMes data.profile:', JSON.stringify(data.profile).slice(0, 200));

  const gastos = Object.values(data.mes.gastos || {});
  const contas = Object.values(data.mes.contas || {});
  const totalGastos = gastos.reduce((s, g) => s + Number(g.valor || 0), 0);
  const totalContas = contas.reduce((s, c) => s + Number(c.valor || 0), 0);
  const contasPendentes = contas.filter(c => !c.paga);

  const porCategoria = {};
  for (const g of gastos) {
    const cat = g.categoria || 'outros';
    porCategoria[cat] = (porCategoria[cat] || 0) + Number(g.valor || 0);
  }
  const topCat = Object.entries(porCategoria).sort(([, a], [, b]) => b - a).slice(0, 3);

  const salario = Number(data.profile.salario || 0);
  const limite = Number(data.profile.limiteGastos || 0);
  const nome = data.profile.nome || 'usuário';
  const total = totalGastos + totalContas;
  const pctSalario = salario > 0 ? Math.round((total / salario) * 100) : null;

  let msg = `Olá, *${nome}*! 👋\n\n`;
  msg += `📅 *${data.mesAtual.replace('-', '/')}*\n`;
  msg += `💸 Gastos: *R$ ${fmt(totalGastos)}*\n`;
  msg += `📋 Contas: *R$ ${fmt(totalContas)}*\n`;
  msg += `📊 Total: *R$ ${fmt(total)}*`;
  if (pctSalario !== null) msg += ` (${pctSalario}% do salário)`;
  msg += '\n';
  if (limite > 0) {
    const pctLimite = Math.round((total / limite) * 100);
    msg += `🎯 Limite: R$ ${fmt(limite)} — ${pctLimite}% usado\n`;
  }
  if (topCat.length) {
    msg += `\n🏆 *Top categorias:*\n`;
    for (const [cat, val] of topCat) msg += `  ${cat}: R$ ${fmt(val)}\n`;
  }
  if (contasPendentes.length) {
    msg += `\n⚠️ *${contasPendentes.length} conta(s) pendente(s):*\n`;
    for (const c of contasPendentes.slice(0, 3)) msg += `  ${c.nome} — R$ ${fmt(c.valor)}\n`;
  }
  return msg.trim();
}

async function sendWhatsApp(to, message) {
  const evolutionUrl = process.env.EVOLUTION_API_URL;
  const evolutionKey = process.env.EVOLUTION_API_KEY;
  const instanceName = process.env.EVOLUTION_INSTANCE;
  console.log('sendWhatsApp vars:', { evolutionUrl, instanceName, hasKey: !!evolutionKey });
  if (!evolutionUrl || !evolutionKey || !instanceName) {
    console.log('sendWhatsApp: env vars ausentes, abortando');
    return;
  }
  const url = `${evolutionUrl}/message/sendText/${instanceName}`;
  const body = JSON.stringify({ number: to, text: message });
  console.log('sendWhatsApp POST:', url, body.slice(0, 100));
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': evolutionKey },
    body,
  });
  const respText = await resp.text();
  console.log('sendWhatsApp response:', resp.status, respText.slice(0, 200));
}

async function parseGastoIA(text) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  console.log('parseGastoIA: apiKey=', apiKey ? 'SET' : 'MISSING', '| text=', text.slice(0, 50));
  if (!apiKey) return null;
  try {
    console.log('parseGastoIA: chamando Claude...');
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 80,
        messages: [{
          role: 'user',
          content: `Analise se esta mensagem descreve um gasto financeiro e extraia os dados.
Mensagem: "${text}"

Retorne APENAS JSON, sem explicação:
- Se for gasto: {"valor":50.00,"descricao":"almoço no restaurante","categoria":"restaurante"}
- Se não for gasto: {"valor":null}

Categorias válidas (use exatamente uma dessas chaves):
alimentacao, mercado, restaurante, padaria, transporte, combustivel, lazer, streaming, saude, farmacia, aluguel, internet, educacao, roupas, academia, outros`
        }]
      })
    });
    const json = await resp.json();
    const raw = json.content?.[0]?.text?.trim() || '';
    console.log('parseGastoIA raw:', raw);
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    if (!parsed.valor || parsed.valor <= 0) return null;
    return { valor: Number(parsed.valor), descricao: parsed.descricao || 'Gasto', categoria: parsed.categoria || 'outros' };
  } catch (e) { console.log('parseGastoIA erro:', e.message); return null; }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    initFirebase();
    const db = getDatabase();

    const body = req.body || {};
    // Evolution API v2 webhook format
    const event = body.event || '';
    if (event !== 'messages.upsert') return res.status(200).json({ ok: true });

    const msgData = body.data;
    if (!msgData || msgData.key?.fromMe) return res.status(200).json({ ok: true });

    const from = msgData.key?.remoteJid?.replace('@s.whatsapp.net', '').replace(/\D/g, '');
    const text = (msgData.message?.conversation || msgData.message?.extendedTextMessage?.text || '').trim().toLowerCase();
    if (!from || !text) return res.status(200).json({ ok: true });

    const user = await findUserByPhone(db, from);
    if (!user) {
      await sendWhatsApp(from, 'Número não encontrado. Cadastre seu telefone no perfil do app Minhas Finanças.');
      return res.status(200).json({ ok: true });
    }

    const data = await getUserData(db, user.uid);
    let reply = '';

    if (/resumo|saldo|total|quanto/.test(text)) {
      reply = resumoMes(data);
    } else if (/conta|pagar|venc/.test(text)) {
      const contas = Object.values(data.mes.contas || {}).filter(c => !c.paga);
      if (!contas.length) {
        reply = '✅ Nenhuma conta pendente este mês!';
      } else {
        reply = `📋 *Contas pendentes (${contas.length}):*\n`;
        for (const c of contas) reply += `• ${c.nome} — R$ ${fmt(c.valor)}\n`;
      }
    } else if (/gasto|categori/.test(text)) {
      const gastos = Object.values(data.mes.gastos || {});
      const porCat = {};
      for (const g of gastos) {
        const cat = g.categoria || 'outros';
        porCat[cat] = (porCat[cat] || 0) + Number(g.valor || 0);
      }
      const sorted = Object.entries(porCat).sort(([, a], [, b]) => b - a);
      if (!sorted.length) {
        reply = 'Nenhum gasto registrado este mês ainda.';
      } else {
        reply = `💸 *Gastos por categoria:*\n`;
        for (const [cat, val] of sorted) reply += `• ${cat}: R$ ${fmt(val)}\n`;
      }
    } else if (/ajuda|help|oi|ola|olá/.test(text)) {
      reply = `Olá! 👋 Sou seu assistente financeiro.\n\nPode me falar naturalmente:\n• _"gastei 50 no almoço"_\n• _"paguei 30 de uber"_\n• _"deu 89 na farmácia"_\n\nOu use os comandos:\n*resumo* — saldo do mês\n*contas* — contas pendentes\n*gastos* — gastos por categoria`;
    } else {
      // Tenta interpretar como gasto em linguagem natural via IA
      const gasto = await parseGastoIA(text);
      if (gasto) {
        const data_br = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
        const mesAtual = data_br.slice(0, 7);
        const entry = { descricao: gasto.descricao, valor: gasto.valor, categoria: gasto.categoria, data: data_br, criadoEm: Date.now() };
        await db.ref(`users/${user.uid}/meses/${mesAtual}/gastos`).push(entry);
        reply = `✅ *Gasto salvo!*\n💸 R$ ${fmt(gasto.valor)} — ${gasto.descricao}\n📂 ${gasto.categoria}`;
      } else {
        reply = `Não entendi. Pode falar naturalmente, tipo:\n_"gastei 50 no almoço"_\n\nOu mande *ajuda* para ver os comandos.`;
      }
    }

    await sendWhatsApp(from, reply);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('whatsapp webhook error:', e);
    res.status(200).json({ ok: true }); // sempre 200 para não fazer Evolution API retentar
  }
};

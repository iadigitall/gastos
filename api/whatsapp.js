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

async function findUserByPhone(db, phone) {
  const snap = await db.ref('users').once('value');
  const users = snap.val();
  if (!users) return null;
  for (const [uid, userData] of Object.entries(users)) {
    const tel = (userData?.profile?.telefone || '').replace(/\D/g, '');
    if (tel && tel === phone) return { uid, profile: userData.profile };
  }
  return null;
}

async function getUserData(db, uid) {
  const mesAtual = new Date().toISOString().slice(0, 7);
  const [profileSnap, mesesSnap, fixasSnap] = await Promise.all([
    db.ref(`users/${uid}/profile`).once('value'),
    db.ref(`meses/${uid}/${mesAtual}`).once('value'),
    db.ref(`contasFixas/${uid}`).once('value'),
  ]);
  return {
    profile: profileSnap.val() || {},
    mes: mesesSnap.val() || {},
    fixas: fixasSnap.val() || {},
    mesAtual,
  };
}

function resumoMes(data) {
  const gastos = Object.values(data.mes.gastos || {});
  const contas = Object.values(data.mes.contas || {});
  const totalGastos = gastos.reduce((s, g) => s + (g.valor || 0), 0);
  const totalContas = contas.reduce((s, c) => s + (c.valor || 0), 0);
  const contasPendentes = contas.filter(c => !c.paga);

  const porCategoria = {};
  for (const g of gastos) {
    const cat = g.categoria || 'outros';
    porCategoria[cat] = (porCategoria[cat] || 0) + (g.valor || 0);
  }
  const topCat = Object.entries(porCategoria).sort(([, a], [, b]) => b - a).slice(0, 3);

  const salario = data.profile.salario || 0;
  const limite = data.profile.limiteGastos || 0;
  const nome = data.profile.nome || 'usuário';
  const total = totalGastos + totalContas;
  const pctSalario = salario > 0 ? Math.round((total / salario) * 100) : null;

  let msg = `Olá, *${nome}*! 👋\n\n`;
  msg += `📅 *${data.mesAtual.replace('-', '/')}*\n`;
  msg += `💸 Gastos: *R$ ${totalGastos.toFixed(2)}*\n`;
  msg += `📋 Contas: *R$ ${totalContas.toFixed(2)}*\n`;
  msg += `📊 Total: *R$ ${total.toFixed(2)}*`;
  if (pctSalario !== null) msg += ` (${pctSalario}% do salário)`;
  msg += '\n';
  if (limite > 0) {
    const pctLimite = Math.round((total / limite) * 100);
    msg += `🎯 Limite: R$ ${limite.toFixed(2)} — ${pctLimite}% usado\n`;
  }
  if (topCat.length) {
    msg += `\n🏆 *Top categorias:*\n`;
    for (const [cat, val] of topCat) msg += `  ${cat}: R$ ${val.toFixed(2)}\n`;
  }
  if (contasPendentes.length) {
    msg += `\n⚠️ *${contasPendentes.length} conta(s) pendente(s):*\n`;
    for (const c of contasPendentes.slice(0, 3)) msg += `  ${c.nome} — R$ ${(c.valor || 0).toFixed(2)}\n`;
  }
  return msg.trim();
}

async function sendWhatsApp(to, message) {
  const evolutionUrl = process.env.EVOLUTION_API_URL;
  const evolutionKey = process.env.EVOLUTION_API_KEY;
  const instanceName = process.env.EVOLUTION_INSTANCE;
  if (!evolutionUrl || !evolutionKey || !instanceName) return;
  await fetch(`${evolutionUrl}/message/sendText/${instanceName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': evolutionKey },
    body: JSON.stringify({ number: to, text: message }),
  });
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

    const msgData = body.data?.message;
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
        for (const c of contas) reply += `• ${c.nome} — R$ ${(c.valor || 0).toFixed(2)}\n`;
      }
    } else if (/gasto|categori/.test(text)) {
      const gastos = Object.values(data.mes.gastos || {});
      const porCat = {};
      for (const g of gastos) {
        const cat = g.categoria || 'outros';
        porCat[cat] = (porCat[cat] || 0) + (g.valor || 0);
      }
      const sorted = Object.entries(porCat).sort(([, a], [, b]) => b - a);
      if (!sorted.length) {
        reply = 'Nenhum gasto registrado este mês ainda.';
      } else {
        reply = `💸 *Gastos por categoria:*\n`;
        for (const [cat, val] of sorted) reply += `• ${cat}: R$ ${val.toFixed(2)}\n`;
      }
    } else if (/ajuda|help|oi|ola|olá/.test(text)) {
      reply = `Olá! 👋 Comandos disponíveis:\n\n*resumo* — saldo e totais do mês\n*contas* — contas pendentes\n*gastos* — gastos por categoria`;
    } else {
      reply = `Não entendi. Tente: *resumo*, *contas* ou *gastos*.`;
    }

    await sendWhatsApp(from, reply);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('whatsapp webhook error:', e);
    res.status(200).json({ ok: true }); // sempre 200 para não fazer Evolution API retentar
  }
};

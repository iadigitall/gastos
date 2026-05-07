# Plano de Lançamento — Minhas Finanças PWA

Data de elaboração: 03/05/2026 — Atualizado: 06/05/2026

---

## Visão Geral

App: PWA (Progressive Web App) — sem Play Store, instala direto pelo navegador  
Hospedagem: Hostinger  
Autenticação: Firebase Auth (já implementado)  
Banco de dados: Firebase Firestore (já implementado)  
Pagamentos: Kiwify ou Hotmart (gratuito para criar, cobra % por venda)  
Backend: Firebase Cloud Functions (gratuito até 2 milhões de chamadas/mês)

---

## Estrutura de Páginas

```
seudominio.com/              → Landing page (apresentação + botão Assinar)
seudominio.com/app/          → O app PWA em si
```

A landing page é uma página HTML separada, simples, com:
- Nome e descrição do app
- Print/demo do app
- Preço e planos
- Botão "Assinar" → leva para link de pagamento da Kiwify/Hotmart

---

## Fluxo Completo de Acesso

```
1. Usuário acessa landing page
2. Clica em "Assinar"
3. É redirecionado para a página de pagamento da Kiwify
4. Paga (PIX, cartão de crédito, boleto)
5. Kiwify envia webhook automático para sua Firebase Cloud Function
6. A Cloud Function grava no Firestore: active=true + data de expiração
7. Kiwify envia e-mail automático ao cliente com link do app + instruções de cadastro
8. Cliente lê o e-mail, acessa o app e cria a conta com o mesmo e-mail do pagamento
9. App verifica active=true → acesso liberado
10. Quando a assinatura vence → active=false → app bloqueia automaticamente
```

---

## ⚠️ Ponto Crítico — E-mail do Cadastro

**Problema identificado:** o cliente pode pagar na Kiwify com um e-mail e se cadastrar no app com outro. Nesse caso o Firebase não encontra o usuário e o acesso nunca é liberado.

**Solução adotada:** orientar o cliente via e-mail pós-compra a usar obrigatoriamente o mesmo e-mail do pagamento no cadastro do app.

### Modelo de E-mail Pós-Compra (configurar na Kiwify)

> **Assunto:** Seu acesso ao Minhas Finanças está pronto!
>
> Olá [Nome],
>
> Seu pagamento foi confirmado! Para acessar o app siga os passos abaixo:
>
> **⚠️ IMPORTANTE:** O cadastro deve ser feito com o mesmo e-mail usado no pagamento: **[email da Kiwify]**
>
> **Como acessar:**
> 1. Acesse: **seudominio.com/app**
> 2. Clique em **"Criar conta"**
> 3. Use obrigatoriamente o e-mail **[email da Kiwify]**
> 4. Defina sua senha e pronto — seu acesso já estará liberado
>
> Qualquer dúvida é só responder este e-mail.

**Observação:** essa solução depende do cliente ler e seguir a instrução. Casos de suporte onde o cliente usou e-mail errado devem ser resolvidos manualmente pelo Console do Firebase, trocando o e-mail da conta. No futuro, isso pode ser automatizado pela Cloud Function criando a conta diretamente com o e-mail da Kiwify.

---

## As 3 Peças Técnicas a Implementar

---

### PEÇA 1 — Estrutura no Firestore

Cada usuário precisa ter estes campos em `users/{uid}`:

```json
{
  "email": "cliente@gmail.com",
  "active": false,
  "plan": "mensal",
  "expiresAt": "2026-06-03T00:00:00Z",
  "createdAt": "2026-05-03T00:00:00Z"
}
```

- `active: false` → bloqueado
- `active: true` + `expiresAt` no futuro → acesso liberado
- Quando `expiresAt` passa → app trata como bloqueado

---

### PEÇA 2 — Firebase Cloud Function (webhook de pagamento)

Arquivo: `functions/index.js`

Esta função recebe a notificação da Kiwify/Hotmart quando um pagamento é aprovado,
cancelado ou reembolsado, e atualiza o Firestore automaticamente.

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// URL que você vai cadastrar no painel da Kiwify/Hotmart como webhook
exports.webhookPagamento = functions.https.onRequest(async (req, res) => {
  const { email, status } = req.body;
  // Kiwify envia: status = "approved", "cancelled", "refunded", "chargeback"

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;
    const ref = admin.firestore().doc(`users/${uid}`);

    if (status === 'approved') {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // +30 dias

      await ref.update({
        active: true,
        plan: 'mensal',
        expiresAt: expiresAt.toISOString()
      });

    } else if (['cancelled', 'refunded', 'chargeback'].includes(status)) {
      await ref.update({
        active: false
      });
    }

    res.status(200).send('ok');
  } catch (err) {
    console.error(err);
    res.status(500).send('erro');
  }
});
```

ATENÇÃO: Verificar o formato exato do webhook da plataforma escolhida.
Kiwify: https://docs.kiwify.com.br/webhooks
Hotmart: https://developers.hotmart.com/docs/pt-BR/webhooks

---

### PEÇA 3 — Verificação de Acesso no App (app.js)

Adicionar esta verificação logo após o login bem-sucedido, antes de carregar o app.

Localização no app.js: dentro do `onAuthStateChanged`, após carregar os dados do usuário.

```javascript
async function verificarAssinatura(uid) {
  const snap = await db.collection('users').doc(uid).get();
  if (!snap.exists) return false;

  const { active, expiresAt } = snap.data();
  if (!active) return false;
  if (expiresAt && new Date(expiresAt) < new Date()) return false;

  return true;
}

// No onAuthStateChanged, após login:
const temAcesso = await verificarAssinatura(user.uid);
if (!temAcesso) {
  // Esconder o app e mostrar tela de bloqueio
  document.getElementById('app').classList.add('hidden');
  document.getElementById('tela-bloqueio').classList.remove('hidden');
  return;
}
```

Tela de bloqueio (adicionar no index.html):

```html
<div id="tela-bloqueio" class="hidden">
  <h2>Sua assinatura está inativa</h2>
  <p>Para acessar o app, assine um plano.</p>
  <a href="https://seudominio.com" class="btn-primary">Ver Planos</a>
  <button onclick="logout()">Sair</button>
</div>
```

---

## Passo a Passo de Lançamento

### Etapa 1 — Hospedagem no Hostinger
1. Comprar domínio + plano de hospedagem no Hostinger
2. Acessar o File Manager ou conectar via FTP
3. Subir todos os arquivos do app na pasta `public_html/app/`
   - index.html, app.js, style.css, sw.js, manifest.json, firebase-config.js, icons/
4. Subir a landing page em `public_html/index.html`
5. Atualizar o `manifest.json`: trocar `start_url` de `/Gastos/` para `/app/`
6. Atualizar o `firebase-config.js` se necessário (domínio autorizado no Firebase)

### Etapa 2 — Firebase Console
1. Acessar console.firebase.google.com
2. Em Authentication → Settings → Authorized domains: adicionar seu domínio Hostinger
3. Em Firestore → Rules: garantir que as regras só permitem o usuário ler seus próprios dados
4. Ativar Cloud Functions (requer plano Blaze — pagamento por uso, gratuito no início)

### Etapa 3 — Implementar as 3 Peças Técnicas
1. Adicionar campos de assinatura no Firestore (pelo Console, manualmente nos primeiros usuários)
2. Criar a Firebase Cloud Function do webhook (Peça 2)
3. Adicionar verificação de assinatura no app.js (Peça 3)
4. Adicionar tela de bloqueio no index.html

### Etapa 4 — Plataforma de Pagamento (Kiwify recomendada)
1. Criar conta em kiwify.com.br (gratuito)
2. Criar produto "Minhas Finanças — Plano Mensal"
3. Definir preço (ex: R$ 14,90/mês)
4. Em Configurações → Webhooks: adicionar a URL da sua Cloud Function
   Formato: `https://us-central1-SEU-PROJETO.cloudfunctions.net/webhookPagamento`
5. Configurar e-mail pós-compra com o modelo definido na seção "Ponto Crítico" acima
   — incluir o link do app e a instrução de usar o mesmo e-mail do pagamento
6. Copiar o link de pagamento e colocar no botão "Assinar" da landing page

### Etapa 5 — Testar tudo antes de divulgar
1. Fazer uma compra teste (Kiwify tem modo sandbox)
2. Verificar se o webhook chegou na Cloud Function (logs do Firebase)
3. Verificar se o Firestore foi atualizado com active=true
4. Abrir o app com a conta teste e confirmar que o acesso foi liberado
5. Simular cancelamento e confirmar bloqueio

---

## Custos Estimados

| Item | Custo |
|------|-------|
| Hostinger (plano básico) | ~R$ 10-20/mês |
| Firebase (plano Blaze) | Gratuito até escalar muito |
| Kiwify | 0% de taxa de setup + % por venda (~4-7%) |
| Domínio | ~R$ 40/ano |
| **Total fixo inicial** | **~R$ 15-25/mês** |

---

## Observações Importantes

- O `firebase-config.js` contém as chaves do Firebase — manter no .gitignore quando for público
- Regras do Firestore devem bloquear leitura cruzada entre usuários
- Renovação automática: se usar assinatura recorrente na Kiwify, o webhook dispara todo mês
  e a Cloud Function renova o `expiresAt` automaticamente
- Backup: Firebase faz backup automático dos dados
- LGPD: adicionar política de privacidade na landing page antes de lançar

---

## Resumo em Uma Linha

> Usuário paga na Kiwify → recebe e-mail com instruções → cria conta no app com o mesmo e-mail do pagamento → Kiwify já avisou o Firebase → App verifica e libera o acesso.

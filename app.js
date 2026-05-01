'use strict';

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const ICO = {
  cart:      (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  car:       (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17H5M17 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M3 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M1 11l4-6h14l4 6v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z"/></svg>`,
  music:     (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  heart:     (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  box:       (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  inbox:     (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
  warning:   (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  bell:      (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  check:     (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
  bag:       (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  clipboard: (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  chart:     (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  calendar:  (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  repeat:    (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  settings:  (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 4.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  trash:     (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
};

const CATEGORIAS = {
  alimentacao: { icon: (s=26)=>ICO.cart(s),  label: 'Alimentação' },
  transporte:  { icon: (s=26)=>ICO.car(s),   label: 'Transporte' },
  lazer:       { icon: (s=26)=>ICO.music(s), label: 'Lazer' },
  saude:       { icon: (s=26)=>ICO.heart(s), label: 'Saúde' },
  outros:      { icon: (s=26)=>ICO.box(s),   label: 'Outros' },
};
const state = { mesAtual: '', gastos: {}, contas: {}, contasFixas: {}, selectedCategory: 'alimentacao', pendingDeleteId: null, pendingDeleteType: null, firebaseOk: false, demoMode: false, currentUser: null };
let db = null, toastTimer = null, currentMonthListener = null;
const _addingFixed = new Set(), _appliedFixed = new Set();
const CAT_COLORS = { alimentacao:'#A3FF47', transporte:'#76db1a', lazer:'#FFFFFF', saude:'#b2fc5d', outros:'#555555' };
let chartCategories = null, chartMonthly = null;

document.addEventListener('DOMContentLoaded', () => {
  state.mesAtual = getCurrentMonthKey();
  updateHeaderMonth();
  registerServiceWorker();
  setupOnlineStatus();
  initAuth();
});

function initFirebase() {
  try {
    if (typeof firebase === 'undefined' || !firebase.apps.length) throw new Error('Firebase não inicializado');
    db = firebase.database(); state.firebaseOk = true;
    db.ref('.info/connected').on('value', snap => {
      document.getElementById('offline-banner').classList.toggle('hidden', snap.val() === true);
    });
    subscribeToMonth(state.mesAtual);
    subscribeToFixedBills();
  } catch (err) {
    console.warn('Firebase:', err.message);
    state.firebaseOk = false;
    loadFromLocalStorage(); loadFixedBillsFromLocalStorage();
    showSetupMessage(); renderAll();
  }
}

function showSetupMessage() {
  const dashboard = document.querySelector('#view-home .dashboard-grid .dash-left');
  if (document.getElementById('setup-msg') || !dashboard) return;
  const card = document.createElement('div');
  card.id = 'setup-msg'; card.className = 'setup-card';
  card.innerHTML = `<h3>${ICO.settings(16)} Configure o Firebase para sincronizar</h3><p>Abra <code>firebase-config.js</code> e preencha com os dados do seu projeto Firebase.</p><p>Enquanto isso o app funciona <strong>só neste aparelho</strong>.</p>`;
  dashboard.prepend(card);
}

function subscribeToMonth(key) {
  if (!db) return;
  if (currentMonthListener) db.ref(`meses/${currentMonthListener}`).off('value');
  currentMonthListener = key;
  db.ref(`meses/${key}`).on('value', snap => {
    const data = snap.val() || {};
    state.gastos = data.gastos || {}; state.contas = data.contas || {};
    saveToLocalStorage(); renderAll();
  }, err => { console.error(err); showToast('Erro ao carregar dados'); });
}

function subscribeToFixedBills() {
  if (!db) return;
  db.ref('contasFixas').on('value', snap => {
    state.contasFixas = snap.val() || {};
    renderFixedBills();
    applyFixedBillsToCurrentMonth();
  }, err => console.error('Erro contasFixas:', err));
}

async function applyFixedBillsToCurrentMonth() {
  if (!db) return;
  for (const [fixaId, fixa] of Object.entries(state.contasFixas)) {
    if (fixa.ativa === false) continue;
    if (_appliedFixed.has(fixaId)) continue;
    if (_addingFixed.has(fixaId)) continue;
    if (Object.values(state.contas).some(c => c.contaFixaId === fixaId)) {
      _appliedFixed.add(fixaId); continue;
    }
    _addingFixed.add(fixaId);
    const [year, month] = state.mesAtual.split('-');
    const dia = Math.min(fixa.diaVencimento || 1, 28);
    const vencimento = `${year}-${month}-${String(dia).padStart(2, '0')}`;
    try {
      await db.ref(`meses/${state.mesAtual}/contas`).push({
        nome: fixa.nome, valor: fixa.valor, vencimento,
        paga: false, pagaEm: null, criadoEm: Date.now(), contaFixaId: fixaId
      });
      _appliedFixed.add(fixaId);
    } catch(err) { console.error('Erro ao aplicar conta fixa:', err); }
    finally { _addingFixed.delete(fixaId); }
  }
}

function saveToLocalStorage() {
  if (state.demoMode) return;
  try { localStorage.setItem(`nd_${state.mesAtual}`, JSON.stringify({ gastos: state.gastos, contas: state.contas })); } catch(_) {}
}
function loadFromLocalStorage() {
  try { const d = JSON.parse(localStorage.getItem(`nd_${state.mesAtual}`) || '{}'); state.gastos = d.gastos||{}; state.contas = d.contas||{}; } catch(_) {}
}
function saveFixedBillsToLocalStorage() {
  if (state.demoMode) return;
  try { localStorage.setItem('nd_contasFixas', JSON.stringify(state.contasFixas)); } catch(_) {}
}
function loadFixedBillsFromLocalStorage() {
  try { state.contasFixas = JSON.parse(localStorage.getItem('nd_contasFixas') || '{}'); } catch(_) {}
}

function getCurrentMonthKey() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function todayStr() { return new Date().toISOString().split('T')[0]; }
function formatCurrency(val) { return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(val)||0); }
function formatDate(str) { if(!str)return''; const[y,m,d]=str.split('-'); return`${d}/${m}/${y}`; }
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function genId() { return`${Date.now()}_${Math.random().toString(36).slice(2,7)}`; }

function renderAll() {
  renderDashboard();
  renderBills();
  renderHistory();
  renderHomeContas();
  renderHomeNotifications();
  renderHomeTransactions();
  renderCategoryChart();
  renderMonthlyChart();
}

function updateHeaderMonth() {
  const d = new Date();
  const elNum = document.getElementById('header-month-num');
  const elName = document.getElementById('header-month-name');
  const elYear = document.getElementById('header-month-year');
  if(elNum) elNum.textContent = String(d.getDate()).padStart(2, '0');
  if(elName) elName.textContent = `${MESES[d.getMonth()]},`;
  if(elYear) elYear.textContent = d.getFullYear();
  const oldEl = document.getElementById('header-month');
  if(oldEl) oldEl.textContent = `${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

function renderDashboard() {
  const gastos=Object.values(state.gastos), contas=Object.values(state.contas);
  const totalGastos=gastos.reduce((s,g)=>s+(g.valor||0),0);
  const totalContas=contas.reduce((s,c)=>s+(c.valor||0),0);
  const totalPago=contas.filter(c=>c.paga).reduce((s,c)=>s+(c.valor||0),0);
  const totalPendente=contas.filter(c=>!c.paga).reduce((s,c)=>s+(c.valor||0),0);
  const saldoDevedor=totalGastos+totalPendente;
  const totalGeral=totalGastos+totalContas;
  const limite=1000;
  const pct=Math.min(100,Math.round((saldoDevedor/limite)*100));
  document.getElementById('total-debt').textContent=formatCurrency(saldoDevedor);
  document.getElementById('paid-amount').textContent=formatCurrency(totalPago);
  document.getElementById('total-amount').textContent=formatCurrency(totalGeral);
  document.getElementById('progress-bar').style.width=`${pct}%`;
  document.getElementById('progress-percent').textContent=pct;
  const elExp=document.getElementById('stat-expenses'); if(elExp)elExp.textContent=formatCurrency(totalGastos);
  const elPen=document.getElementById('stat-pending'); if(elPen)elPen.textContent=formatCurrency(totalPendente);
  document.getElementById('debt-card').classList.toggle('zeroed',saldoDevedor===0&&totalGeral>0);
  const ccTotal=document.getElementById('cc-total'); if(ccTotal) ccTotal.textContent=formatCurrency(saldoDevedor);
}

/* ─── HOME: Contas Pendentes ─── */
function renderHomeContas() {
  const container = document.getElementById('home-contas');
  if (!container) return;
  const COLORS = ['#FF4444', '#A3FF47', '#F59E0B', '#60A5FA', '#A78BFA'];
  const contas = Object.entries(state.contas)
    .filter(([, c]) => !c.paga)
    .sort(([, a], [, b]) => (a.vencimento || '9999').localeCompare(b.vencimento || '9999'))
    .slice(0, 3);
  if (!contas.length) {
    container.innerHTML = `<div class="conta-pill-empty">Nenhuma conta pendente</div>`;
    return;
  }
  container.innerHTML = contas.map(([, c], i) => `
    <div class="conta-pill">
      <div class="conta-pill-top">
        <span class="conta-pill-name">${escHtml(c.nome)}</span>
        <div class="conta-pill-dot" style="background:${COLORS[i % COLORS.length]};color:${COLORS[i % COLORS.length]}"></div>
      </div>
      <span class="conta-pill-val">${formatCurrency(c.valor)}</span>
    </div>`).join('');
}

/* ─── HOME: Notificações ─── */
function renderHomeNotifications() {
  const container = document.getElementById('home-notif');
  if (!container) return;
  const today = todayStr();
  const notifs = Object.entries(state.contas)
    .filter(([, c]) => !c.paga && c.vencimento)
    .sort(([, a], [, b]) => a.vencimento.localeCompare(b.vencimento))
    .slice(0, 3);
  if (!notifs.length) {
    container.innerHTML = `<div class="notif-empty">Nenhuma notificação pendente</div>`;
    return;
  }
  container.innerHTML = notifs.map(([id, c]) => {
    const overdue = c.vencimento < today;
    return `<div class="notif-item${overdue ? ' notif-danger' : ' notif-success'}">
      <div class="notif-text">${overdue ? `${ICO.warning(14)} <strong>${escHtml(c.nome)}</strong> está vencida!` : `${ICO.bell(14)} <strong>${escHtml(c.nome)}</strong> próxima a vencer`}</div>
      <div class="notif-footer">
        <span class="notif-date">${formatDate(c.vencimento)}</span>
      </div>
    </div>`;
  }).join('');
}

/* ─── HOME: Transações Recentes ─── */
function renderHomeTransactions() {
  const container = document.getElementById('home-transacoes');
  if (!container) return;
  const entries = Object.entries(state.gastos)
    .sort(([, a], [, b]) => (b.criadoEm || 0) - (a.criadoEm || 0))
    .slice(0, 5);
  if (!entries.length) {
    container.innerHTML = `<div class="transacao-empty">Nenhuma transação ainda</div>`;
    return;
  }
  container.innerHTML = entries.map(([, g]) => {
    const cat = CATEGORIAS[g.categoria] || CATEGORIAS.outros;
    return `<div class="transacao-item">
      <span class="transacao-icon cat-${g.categoria || 'outros'}">${cat.icon(26)}</span>
      <div class="transacao-info">
        <div class="transacao-desc">${escHtml(g.descricao)}</div>
        <div class="transacao-sub">${cat.label}</div>
      </div>
      <div class="transacao-right">
        <div class="transacao-date">${formatDate(g.data)}</div>
        <div class="transacao-val">-${formatCurrency(g.valor)}</div>
      </div>
    </div>`;
  }).join('');
}

function setupForms() {
  document.querySelectorAll('.category-btn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); state.selectedCategory=btn.dataset.cat;
  }));
  document.getElementById('form-expense').addEventListener('submit',handleAddExpense);
  document.getElementById('form-bill').addEventListener('submit',handleAddBill);
  document.getElementById('form-fixed-bill').addEventListener('submit',handleAddFixedBill);
  resetDates();
}
function resetDates() { const t=todayStr(); const e=document.getElementById('expense-date'),b=document.getElementById('bill-due'); if(e)e.value=t; if(b)b.value=t; }
function resetExpenseForm() {
  document.getElementById('expense-desc').value=''; document.getElementById('expense-value').value='';
  document.getElementById('expense-date').value=todayStr(); state.selectedCategory='alimentacao';
  document.querySelectorAll('.category-btn').forEach(b=>b.classList.toggle('active',b.dataset.cat==='alimentacao'));
}

async function handleAddExpense(e) {
  e.preventDefault();
  const desc=document.getElementById('expense-desc').value.trim();
  const value=parseFloat(document.getElementById('expense-value').value);
  const date=document.getElementById('expense-date').value;
  if(!desc) return showToast('Escreve o que foi gasto');
  if(!value||value<=0) return showToast('Coloca o valor certinho');
  if(!date) return showToast('Escolhe a data');
  const btn=document.getElementById('btn-submit-expense'); btn.disabled=true; btn.textContent='Salvando...';
  const entry={descricao:desc,valor:value,categoria:state.selectedCategory,data:date,criadoEm:Date.now()};
  try {
    if(db) { await db.ref(`meses/${state.mesAtual}/gastos`).push(entry); }
    else { state.gastos[genId()]=entry; saveToLocalStorage(); renderAll(); }
    showToast('Gasto adicionado!'); navigateTo('home'); resetExpenseForm();
  } catch(err) { showToast('Erro ao salvar. Tente de novo.'); }
  finally { btn.disabled=false; btn.textContent='Confirmar Gasto'; }
}

function confirmDeleteExpense(id,descricao) {
  state.pendingDeleteId=id; state.pendingDeleteType='gasto';
  document.querySelector('#modal-confirm-delete .modal-title').textContent='Apagar este gasto?';
  document.getElementById('delete-item-name').textContent=`"${descricao}" será apagado.`;
  openModal('modal-confirm-delete');
}

async function executeDelete() {
  const{pendingDeleteId:id,pendingDeleteType:type}=state;
  if(!id) return;
  closeModal('modal-confirm-delete');
  try {
    if(type==='gasto') {
      if(db) await db.ref(`meses/${state.mesAtual}/gastos/${id}`).remove();
      else { delete state.gastos[id]; saveToLocalStorage(); renderAll(); }
      showToast('Gasto removido');
    } else if(type==='conta') {
      if(db) await db.ref(`meses/${state.mesAtual}/contas/${id}`).remove();
      else { delete state.contas[id]; saveToLocalStorage(); renderAll(); }
      showToast('Conta removida');
    } else if(type==='contaFixa') {
      if(db) await db.ref(`contasFixas/${id}`).remove();
      else { delete state.contasFixas[id]; saveFixedBillsToLocalStorage(); renderFixedBills(); }
      _appliedFixed.delete(id);
      showToast('Conta fixa removida');
    }
  } catch(err) { showToast('Erro ao apagar'); }
  state.pendingDeleteId=null; state.pendingDeleteType=null;
}

function renderBills() {
  const container=document.getElementById('bills-list');
  const entries=Object.entries(state.contas), today=todayStr();
  if(!entries.length){container.innerHTML=`<div class="empty-state"><span class="empty-icon">${ICO.inbox(40)}</span><p>Nenhuma conta cadastrada</p><p class="empty-sub">Toque no + para adicionar</p></div>`;return;}
  entries.sort(([,a],[,b])=>{if(a.paga!==b.paga)return a.paga?1:-1;return(a.vencimento||'9999').localeCompare(b.vencimento||'9999');});
  container.innerHTML=`<div class="bills-list-inner">${entries.map(([id,c])=>{
    const overdue=!c.paga&&c.vencimento&&c.vencimento<today;
    const meta=c.vencimento?`${overdue?`${ICO.warning(12)} Venceu em: `:'Vence em: '}${formatDate(c.vencimento)}`:'Sem data de vencimento';
    const fixedBadge=c.contaFixaId?`<span class="fixed-badge">${ICO.repeat(10)} Fixa</span>`:'';
    return`<div class="bill-item${c.paga?' paid':''}" id="bill-${escHtml(id)}"><div class="bill-status-dot"></div><div class="bill-info"><div class="bill-name">${escHtml(c.nome)}${fixedBadge}</div><div class="bill-meta${overdue?' overdue':''}">${meta}</div></div><div class="bill-value">${formatCurrency(c.valor)}</div>${c.paga?`<button class="btn-pay done" disabled>${ICO.check(16)}</button>`:`<button class="btn-pay" onclick="payBill('${escHtml(id)}')">Pagar</button>`}${!c.paga?`<button class="btn-delete-bill" onclick="confirmDeleteBill('${escHtml(id)}','${escHtml(c.nome)}')">${ICO.trash(16)}</button>`:''}</div>`;
  }).join('')}</div>`;
}

async function payBill(id) {
  const btn=document.querySelector(`#bill-${CSS.escape(id)} .btn-pay`);
  if(btn){btn.innerHTML=ICO.check(16);btn.classList.add('pay-anim','done');btn.disabled=true;}
  try {
    if(db) await db.ref(`meses/${state.mesAtual}/contas/${id}`).update({paga:true,pagaEm:Date.now()});
    else{if(state.contas[id]){state.contas[id].paga=true;state.contas[id].pagaEm=Date.now();}saveToLocalStorage();renderAll();}
    showToast('Conta marcada como paga!');
  } catch(err){showToast('Erro ao marcar como paga');if(btn){btn.textContent='Pagar';btn.classList.remove('pay-anim','done');btn.disabled=false;}}
}

function confirmDeleteBill(id,nome) {
  state.pendingDeleteId=id; state.pendingDeleteType='conta';
  document.querySelector('#modal-confirm-delete .modal-title').textContent='Remover esta conta?';
  document.getElementById('delete-item-name').textContent=`A conta "${nome}" será removida.`;
  openModal('modal-confirm-delete');
}

async function handleAddBill(e) {
  e.preventDefault();
  const nome=document.getElementById('bill-name').value.trim();
  const value=parseFloat(document.getElementById('bill-value').value);
  const due=document.getElementById('bill-due').value;
  if(!nome) return showToast('Dá um nome pra conta');
  if(!value||value<=0) return showToast('Coloca o valor certinho');
  const entry={nome,valor:value,vencimento:due||null,paga:false,pagaEm:null,criadoEm:Date.now()};
  try {
    if(db) await db.ref(`meses/${state.mesAtual}/contas`).push(entry);
    else{state.contas[genId()]=entry;saveToLocalStorage();renderAll();}
    closeModal('modal-add-bill'); document.getElementById('form-bill').reset(); showToast('Conta adicionada!');
  } catch(err){showToast('Erro ao salvar.');}
}

function renderFixedBills() {
  const container=document.getElementById('fixed-bills-list');
  if(!container) return;
  const entries=Object.entries(state.contasFixas);
  if(!entries.length){
    container.innerHTML=`<div class="empty-state"><span class="empty-icon">${ICO.repeat(40)}</span><p>Nenhuma conta fixa cadastrada</p><p class="empty-sub">Toque no + para adicionar</p></div>`;
    return;
  }
  entries.sort(([,a],[,b])=>(a.nome||'').localeCompare(b.nome||''));
  container.innerHTML=`<div class="fixed-bills-inner">${entries.map(([id,f])=>{
    return`<div class="fixed-bill-item"><div class="fixed-bill-info"><div class="fixed-bill-name">${escHtml(f.nome)}</div><div class="fixed-bill-meta">Todo dia ${f.diaVencimento||'?'} · ${formatCurrency(f.valor)}</div></div><button class="btn-delete-fixed" onclick="confirmDeleteFixedBill('${escHtml(id)}','${escHtml(f.nome)}')">${ICO.trash(15)}</button></div>`;
  }).join('')}</div>`;
}

async function handleAddFixedBill(e) {
  e.preventDefault();
  const nome=document.getElementById('fixed-name').value.trim();
  const value=parseFloat(document.getElementById('fixed-value').value);
  const day=parseInt(document.getElementById('fixed-day').value);
  if(!nome) return showToast('Dá um nome pra conta fixa');
  if(!value||value<=0) return showToast('Coloca o valor certinho');
  if(!day||day<1||day>28) return showToast('Dia deve ser entre 1 e 28');
  const entry={nome,valor:value,diaVencimento:day,ativa:true,criadoEm:Date.now()};
  try {
    if(db) { await db.ref('contasFixas').push(entry); }
    else { state.contasFixas[genId()]=entry; saveFixedBillsToLocalStorage(); renderFixedBills(); applyFixedBillsToCurrentMonth(); }
    closeModal('modal-add-fixed-bill'); document.getElementById('form-fixed-bill').reset();
    showToast('Conta fixa criada! Adicionada a este mês.');
  } catch(err){showToast('Erro ao salvar.');}
}

function confirmDeleteFixedBill(id,nome) {
  state.pendingDeleteId=id; state.pendingDeleteType='contaFixa';
  document.querySelector('#modal-confirm-delete .modal-title').textContent='Remover conta fixa?';
  document.getElementById('delete-item-name').textContent=`"${nome}" não será mais gerada nos próximos meses.`;
  openModal('modal-confirm-delete');
}

function renderHistory() {
  const container=document.getElementById('history-list');
  const entries=Object.entries(state.gastos);
  if(!entries.length){container.innerHTML=`<div class="empty-state"><span class="empty-icon">${ICO.inbox(40)}</span><p>Nenhum gasto lançado</p><p class="empty-sub">Use o botão + para adicionar</p></div>`;return;}
  entries.sort(([,a],[,b])=>(b.criadoEm||0)-(a.criadoEm||0));
  container.innerHTML=`<div class="history-inner">${entries.map(([id,g])=>{
    const cat=CATEGORIAS[g.categoria]||CATEGORIAS.outros;
    return`<div class="history-item"><span class="history-cat-icon cat-${g.categoria||'outros'}">${cat.icon(26)}</span><div class="history-info"><div class="history-desc">${escHtml(g.descricao)}</div><div class="history-meta">${cat.label} · ${formatDate(g.data)}</div></div><div class="history-value">-${formatCurrency(g.valor)}</div><button class="btn-delete-expense" onclick="confirmDeleteExpense('${escHtml(id)}','${escHtml(g.descricao)}')">${ICO.trash(16)}</button></div>`;
  }).join('')}</div>`;
}

function openCloseMonthModal() {
  const pendentes=Object.values(state.contas).filter(c=>!c.paga).length;
  document.getElementById('close-month-warning').classList.toggle('hidden',pendentes===0);
  openModal('modal-close-month');
}

async function handleCloseMonth() {
  const key=state.mesAtual;
  const gastos=Object.values(state.gastos),contas=Object.values(state.contas);
  const arquivo={gastos:state.gastos,contas:state.contas,totalGastos:gastos.reduce((s,g)=>s+(g.valor||0),0),totalContas:contas.reduce((s,c)=>s+(c.valor||0),0),totalPago:contas.filter(c=>c.paga).reduce((s,c)=>s+(c.valor||0),0),fechadoEm:Date.now()};
  try {
    if(db){await db.ref(`historico/${key}`).set(arquivo);await db.ref(`meses/${key}`).remove();}
    else{try{localStorage.setItem(`nd_hist_${key}`,JSON.stringify(arquivo));localStorage.removeItem(`nd_${key}`);}catch(_){}}
    state.gastos={};state.contas={};
    _appliedFixed.clear();
    closeModal('modal-close-month');showToast('Mês fechado!');navigateTo('home');renderAll();
  } catch(err){showToast('Erro ao fechar o mês');}
}

async function loadPastMonths() {
  const container=document.getElementById('past-months-list');
  container.innerHTML=`<div class="empty-state"><div class="spinner"></div><p>Carregando...</p></div>`;
  try {
    let data=null;
    if(db){const snap=await db.ref('historico').once('value');data=snap.val();}
    else{data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('nd_hist_')){try{data[k.replace('nd_hist_','')]=JSON.parse(localStorage.getItem(k));}catch(_){}}};if(!Object.keys(data).length)data=null;}
    if(!data){container.innerHTML=`<div class="empty-state"><span class="empty-icon">${ICO.calendar(40)}</span><p>Nenhum mês fechado ainda</p></div>`;return;}
    const months=Object.entries(data).sort(([a],[b])=>b.localeCompare(a));
    container.innerHTML=`<div class="past-months-inner">${months.map(([key,d])=>{
      const[y,m]=key.split('-'),nomeMes=MESES[parseInt(m)-1];
      return`<div class="past-month-card"><div class="past-month-title">${nomeMes} de ${y}</div><div class="past-month-grid"><div class="past-stat"><div class="past-stat-label">${ICO.bag(14)} Gastos</div><div class="past-stat-value" style="color:var(--danger)">${formatCurrency(d.totalGastos)}</div></div><div class="past-stat"><div class="past-stat-label">${ICO.clipboard(14)} Contas</div><div class="past-stat-value">${formatCurrency(d.totalContas)}</div></div><div class="past-stat"><div class="past-stat-label">${ICO.check(14)} Pago</div><div class="past-stat-value" style="color:var(--green)">${formatCurrency(d.totalPago)}</div></div><div class="past-stat"><div class="past-stat-label">${ICO.chart(14)} Total</div><div class="past-stat-value">${formatCurrency((d.totalGastos||0)+(d.totalContas||0))}</div></div></div></div>`;
    }).join('')}</div>`;
  } catch(err){container.innerHTML=`<div class="empty-state"><span class="empty-icon">${ICO.warning(40)}</span><p>Erro ao carregar</p></div>`;}
}

function setupNavigation() {
  // Bottom nav + sidebar buttons com data-view
  document.querySelectorAll('.nav-btn[data-view], .sidebar-btn[data-view]').forEach(btn =>
    btn.addEventListener('click', () => navigateTo(btn.dataset.view))
  );
  // Botões "Ver tudo" no home (data-nav)
  document.querySelectorAll('[data-nav]').forEach(btn =>
    btn.addEventListener('click', () => navigateTo(btn.dataset.nav))
  );
  // Voltar
  on('btn-back-expense','click',()=>navigateTo('home'));
  on('btn-back-bills','click',()=>navigateTo('home'));
  on('btn-back-history','click',()=>navigateTo('home'));
  on('btn-back-past','click',()=>navigateTo('home'));
  on('btn-back-fixed','click',()=>navigateTo('bills'));
  // Ações
  on('btn-add-expense','click',()=>navigateTo('add-expense'));
  on('btn-add-expense-header','click',()=>navigateTo('add-expense'));
  on('btn-go-bills','click',()=>navigateTo('bills'));
  on('btn-manage-fixed-hdr','click',()=>navigateTo('fixed-bills'));
  // Fechar mês
  on('btn-close-month','click',openCloseMonthModal);
  on('btn-close-month-mobile','click',openCloseMonthModal);
  // Meses anteriores
  on('btn-history-months','click',()=>{loadPastMonths();navigateTo('past-months');});
  on('btn-history-months-sb','click',()=>{loadPastMonths();navigateTo('past-months');});
  // Contas fixas
  on('btn-manage-fixed','click',()=>navigateTo('fixed-bills'));
  // Logout
  on('btn-logout','click',logout);
}

function navigateTo(viewName) {
  if (!viewName) return;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn[data-view], .sidebar-btn[data-view]').forEach(b =>
    b.classList.toggle('active', b.dataset.view === viewName)
  );
  const view = document.getElementById(`view-${viewName}`);
  if (view) view.classList.add('active');
  // Ocultar bottom-nav em certas views
  const hideNav = ['past-months','fixed-bills'].includes(viewName);
  document.getElementById('bottom-nav').style.display = hideNav ? 'none' : '';
  if (viewName === 'add-expense') resetExpenseForm();
  if (viewName === 'past-months') loadPastMonths();
}

function setupModals() {
  on('btn-add-bill','click',()=>{document.getElementById('form-bill').reset();document.getElementById('bill-due').value=todayStr();openModal('modal-add-bill');setTimeout(()=>document.getElementById('bill-name').focus(),300);});
  on('btn-add-fixed-bill','click',()=>{document.getElementById('form-fixed-bill').reset();openModal('modal-add-fixed-bill');setTimeout(()=>document.getElementById('fixed-name').focus(),300);});
  on('btn-confirm-close','click',handleCloseMonth);
  on('btn-confirm-delete','click',executeDelete);
  document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.close)));
}
function openModal(id){document.getElementById(id).classList.remove('hidden');}
function closeModal(id){document.getElementById(id).classList.add('hidden');}

function showToast(msg,duration=2600){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.remove('hidden');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.add('hidden'),duration);
}
function setupOnlineStatus(){window.addEventListener('online',()=>showToast('Conexão restaurada'));window.addEventListener('offline',()=>showToast('Sem conexão'));}
function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});}
function on(id,ev,fn){const el=document.getElementById(id);if(el)el.addEventListener(ev,fn);}

/* ─── CHARTS ─── */
function renderCategoryChart() {
  const totals={};
  for(const g of Object.values(state.gastos)){const c=g.categoria||'outros';totals[c]=(totals[c]||0)+(g.valor||0);}
  const cats=Object.entries(totals).filter(([,v])=>v>0);
  const empty=document.getElementById('chart-cat-empty');
  const canvas=document.getElementById('chart-categories');
  if(!cats.length){
    if(chartCategories){chartCategories.destroy();chartCategories=null;}
    if(empty)empty.classList.remove('hidden');
    if(canvas)canvas.style.display='none';
    return;
  }
  if(empty)empty.classList.add('hidden');
  if(canvas)canvas.style.display='';
  if(chartCategories){chartCategories.destroy();chartCategories=null;}
  if(!canvas)return;
  const labels=cats.map(([k])=>CATEGORIAS[k]?.label||k);
  const data=cats.map(([,v])=>v);
  const colors=cats.map(([k])=>CAT_COLORS[k]||'#94a3b8');
  chartCategories=new Chart(canvas,{
    type:'doughnut',
    data:{labels,datasets:[{data,backgroundColor:colors,borderWidth:0,hoverOffset:8}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{
      legend:{position:'bottom',labels:{color:'#f0f0f5',padding:14,font:{size:12},usePointStyle:true}},
      tooltip:{callbacks:{label:c=>` ${formatCurrency(c.raw)}`}}
    }}
  });
}

async function renderMonthlyChart() {
  const empty=document.getElementById('chart-monthly-empty');
  const canvas=document.getElementById('chart-monthly');
  let historico={};
  if(db){try{const snap=await db.ref('historico').once('value');historico=snap.val()||{};}catch(e){}}
  const pastKeys=Object.keys(historico).sort().slice(-5);
  const allKeys=[...pastKeys,state.mesAtual];
  if(allKeys.length<=1&&!Object.values(state.gastos).length&&!Object.values(state.contas).length){
    if(chartMonthly){chartMonthly.destroy();chartMonthly=null;}
    if(empty)empty.classList.remove('hidden');
    if(canvas)canvas.style.display='none';
    return;
  }
  if(empty)empty.classList.add('hidden');
  if(canvas)canvas.style.display='';
  if(chartMonthly){chartMonthly.destroy();chartMonthly=null;}
  if(!canvas)return;
  const labels=allKeys.map(k=>{const[,m]=k.split('-');return MESES[parseInt(m)-1].slice(0,3);});
  const gastosData=allKeys.map(k=>k===state.mesAtual?Object.values(state.gastos).reduce((s,g)=>s+(g.valor||0),0):(historico[k]?.totalGastos||0));
  const contasData=allKeys.map(k=>k===state.mesAtual?Object.values(state.contas).reduce((s,c)=>s+(c.valor||0),0):(historico[k]?.totalContas||0));
  chartMonthly=new Chart(canvas,{
    type:'bar',
    data:{labels,datasets:[
      {label:'Gastos',data:gastosData,backgroundColor:'#A3FF47',borderRadius:6,borderSkipped:false},
      {label:'Contas',data:contasData,backgroundColor:'#d7fca4',borderRadius:6,borderSkipped:false}
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{
        x:{ticks:{color:'#6B7280',font:{size:12}},grid:{color:'rgba(42,42,42,0.8)'}},
        y:{ticks:{color:'#6B7280',font:{size:11},callback:v=>'R$'+v},grid:{color:'rgba(42,42,42,0.8)'}}
      },
      plugins:{
        legend:{labels:{color:'#f0f0f5',font:{size:12},usePointStyle:true,padding:14}},
        tooltip:{callbacks:{label:c=>` ${c.dataset.label}: ${formatCurrency(c.raw)}`}}
      }
    }
  });
}

/* Compatibilidade com JS antigo */
function renderDashboardTab() {
  const d=new Date();
  const el=document.getElementById('dash-month-label');
  if(el) el.textContent=`${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

window.payBill=payBill;
window.confirmDeleteExpense=confirmDeleteExpense;
window.confirmDeleteBill=confirmDeleteBill;
window.confirmDeleteFixedBill=confirmDeleteFixedBill;

/* ═══════════════════════════════════════
   AUTH
═══════════════════════════════════════ */
let _appInitialized = false;

function initAuth() {
  showAuthUI();
  initAuthCanvas();
  setupAuthForms();

  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        state.currentUser = user;
        state.demoMode = false;
        showMainApp();
      } else if (!state.demoMode) {
        showAuthUI();
      }
    });
  }
}

function showAuthUI() {
  const authScreen = document.getElementById('auth-screen');
  const appWrapper = document.querySelector('.app-wrapper');
  const sidebar = document.querySelector('.sidebar');
  const bottomNav = document.getElementById('bottom-nav');
  if (authScreen) authScreen.classList.remove('hidden');
  if (appWrapper) appWrapper.style.display = 'none';
  if (sidebar) sidebar.style.display = 'none';
  if (bottomNav) bottomNav.style.display = 'none';
}

function showMainApp() {
  const authScreen = document.getElementById('auth-screen');
  const appWrapper = document.querySelector('.app-wrapper');
  const sidebar = document.querySelector('.sidebar');
  if (authScreen) authScreen.classList.add('hidden');
  if (appWrapper) appWrapper.style.display = '';
  if (sidebar) sidebar.style.display = '';

  if (!_appInitialized) {
    _appInitialized = true;
    setupNavigation();
    setupForms();
    setupModals();
  }

  if (state.demoMode) {
    db = null;
    renderAll();
    const demoBanner = document.getElementById('demo-banner');
    if (demoBanner) demoBanner.classList.add('visible');
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) logoutBtn.classList.add('visible');
  } else {
    const demoBanner = document.getElementById('demo-banner');
    if (demoBanner) demoBanner.classList.remove('visible');
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) logoutBtn.classList.add('visible');
    initFirebase();
  }

  const shortcut = new URLSearchParams(location.search).get('shortcut');
  if (shortcut === 'add-expense') navigateTo('add-expense');
}

function setupAuthForms() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.getElementById('form-login').classList.toggle('hidden', target !== 'login');
      document.getElementById('form-signup').classList.toggle('hidden', target !== 'signup');
      clearAuthError();
    });
  });

  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      if (!email || !password) return showAuthError('Preencha todos os campos');
      const btn = document.getElementById('btn-login-submit');
      btn.disabled = true; btn.textContent = 'Entrando...';
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch(err) {
        showAuthError(getAuthErrorMsg(err.code));
        btn.disabled = false; btn.textContent = 'Entrar';
      }
    });
  }

  const signupForm = document.getElementById('form-signup');
  if (signupForm) {
    signupForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      if (!email || !password) return showAuthError('Preencha todos os campos');
      if (password !== confirm) return showAuthError('As senhas não conferem');
      if (password.length < 6) return showAuthError('A senha precisa ter ao menos 6 caracteres');
      const btn = document.getElementById('btn-signup-submit');
      btn.disabled = true; btn.textContent = 'Criando...';
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch(err) {
        showAuthError(getAuthErrorMsg(err.code));
        btn.disabled = false; btn.textContent = 'Criar Conta';
      }
    });
  }

  const demoBtn = document.getElementById('btn-try-demo');
  if (demoBtn) demoBtn.addEventListener('click', enterDemoMode);
}

function enterDemoMode() {
  state.demoMode = true;
  const now = Date.now();
  const today = todayStr();
  const [y, m] = today.split('-');
  state.mesAtual = `${y}-${m}`;
  state.gastos = {
    'd1': { descricao: 'Almoço no Restaurante', valor: 45.90, categoria: 'alimentacao', data: today, criadoEm: now - 3600000 },
    'd2': { descricao: 'Uber', valor: 22.50, categoria: 'transporte', data: today, criadoEm: now - 7200000 },
    'd3': { descricao: 'Spotify', valor: 19.90, categoria: 'lazer', data: today, criadoEm: now - 86400000 },
    'd4': { descricao: 'Farmácia', valor: 67.30, categoria: 'saude', data: today, criadoEm: now - 172800000 },
    'd5': { descricao: 'Supermercado', valor: 312.80, categoria: 'alimentacao', data: today, criadoEm: now - 259200000 },
  };
  state.contas = {
    'c1': { nome: 'Aluguel', valor: 1200.00, vencimento: `${y}-${m}-10`, paga: false, pagaEm: null, criadoEm: now },
    'c2': { nome: 'Internet', valor: 99.90, vencimento: `${y}-${m}-15`, paga: true, pagaEm: now - 86400000, criadoEm: now },
    'c3': { nome: 'Energia', valor: 187.40, vencimento: `${y}-${m}-08`, paga: false, pagaEm: null, criadoEm: now },
  };
  showMainApp();
}

function logout() {
  if (state.demoMode) {
    state.demoMode = false;
    state.gastos = {}; state.contas = {}; state.contasFixas = {};
    document.getElementById('demo-banner').classList.remove('visible');
  } else if (typeof firebase !== 'undefined' && firebase.auth) {
    if (db && currentMonthListener) db.ref(`meses/${currentMonthListener}`).off('value');
    if (db) db.ref('contasFixas').off('value');
    db = null; state.firebaseOk = false; currentMonthListener = null;
    state.gastos = {}; state.contas = {}; state.contasFixas = {};
    firebase.auth().signOut();
  }
  state.currentUser = null;
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) logoutBtn.classList.remove('visible');
  showAuthUI();
  initAuthCanvas();
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.classList.remove('hidden'); }
}

function clearAuthError() {
  const el = document.getElementById('auth-error');
  if (el) el.classList.add('hidden');
}

function getAuthErrorMsg(code) {
  const msgs = {
    'auth/user-not-found': 'Email não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/email-already-in-use': 'Este email já está cadastrado',
    'auth/invalid-email': 'Email inválido',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde um momento',
    'auth/weak-password': 'Senha muito fraca',
    'auth/invalid-credential': 'Email ou senha incorretos',
    'auth/network-request-failed': 'Sem conexão. Verifique sua internet',
  };
  return msgs[code] || 'Erro ao autenticar. Tente novamente.';
}

function initAuthCanvas() {
  const canvas = document.getElementById('auth-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speed: 0.25 + Math.random() * 0.55,
    length: 50 + Math.random() * 130,
    opacity: 0.035 + Math.random() * 0.09,
    width: 0.5 + Math.random() * 1.2,
  }));

  function draw() {
    const authScreen = document.getElementById('auth-screen');
    if (!authScreen || authScreen.classList.contains('hidden')) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.y -= p.speed;
      if (p.y + p.length < 0) {
        p.y = canvas.height + p.length;
        p.x = Math.random() * canvas.width;
      }
      const grad = ctx.createLinearGradient(p.x, p.y + p.length, p.x, p.y);
      grad.addColorStop(0, 'rgba(163,255,71,0)');
      grad.addColorStop(1, `rgba(163,255,71,${p.opacity})`);
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = p.width;
      ctx.moveTo(p.x, p.y + p.length);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
  forceVideoPlay();
}

function forceVideoPlay() {
  const video = document.getElementById('auth-bg-video');
  if (!video) return;
  video.muted = true;
  const tryPlay = () => video.play().catch(() => {});
  tryPlay();
  document.addEventListener('touchstart', tryPlay, { once: true });
  document.addEventListener('click', tryPlay, { once: true });
}

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
  edit:      (s=24)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
};

const CATEGORIAS = {
  alimentacao: { icon: (s=26)=>ICO.cart(s),  label: 'Alimentação' },
  transporte:  { icon: (s=26)=>ICO.car(s),   label: 'Transporte' },
  lazer:       { icon: (s=26)=>ICO.music(s), label: 'Lazer' },
  saude:       { icon: (s=26)=>ICO.heart(s), label: 'Saúde' },
  outros:      { icon: (s=26)=>ICO.box(s),   label: 'Outros' },
};
const state = { mesAtual: '', gastos: {}, contas: {}, contasFixas: {}, fixasIgnoradas: {}, selectedCategory: 'alimentacao', pendingDeleteId: null, pendingDeleteType: null, firebaseOk: false, demoMode: false, currentUser: null, salario: 0, limiteGastos: 1000, _limitAlertShown: false, _limitExceededAlertShown: false, hideValues: false, _profileName: '', _profileFoto: null, _pendingPhoto: null };
let db = null, toastTimer = null, currentMonthListener = null;
const _addingFixed = new Set(), _appliedFixed = new Set();
const CAT_COLORS = { alimentacao:'#A3FF47', transporte:'#60A5FA', lazer:'#F59E0B', saude:'#F87171', outros:'#A78BFA' };
let chartCategories = null, chartMonthly = null;

document.addEventListener('DOMContentLoaded', () => {
  state.mesAtual = getCurrentMonthKey();
  updateHeaderMonth();
  registerServiceWorker();
  setupOnlineStatus();
  initAuth();
});

function uRef(path) {
  return db.ref(`users/${state.currentUser.uid}/${path}`);
}

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
  if (currentMonthListener) uRef(`meses/${currentMonthListener}`).off('value');
  currentMonthListener = key;
  uRef(`meses/${key}`).on('value', snap => {
    const data = snap.val() || {};
    state.gastos = data.gastos || {}; state.contas = data.contas || {}; state.fixasIgnoradas = data.fixasIgnoradas || {};
    saveToLocalStorage(); renderAll();
  }, err => { console.error(err); showToast('Erro: ' + (err.code || err.message), 5000); });
}

function subscribeToFixedBills() {
  if (!db) return;
  uRef('contasFixas').on('value', snap => {
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
    if (state.fixasIgnoradas[fixaId]) { _appliedFixed.add(fixaId); continue; }
    if (Object.values(state.contas).some(c => c.contaFixaId === fixaId)) {
      _appliedFixed.add(fixaId); continue;
    }
    const totalParcelas = fixa.totalParcelas || 0;
    let parcelaAtual = 1;
    if (fixa.mesInicio) parcelaAtual = monthDiff(fixa.mesInicio, state.mesAtual) + 1;
    if (totalParcelas > 0 && parcelaAtual > totalParcelas) {
      await uRef(`contasFixas/${fixaId}`).update({ ativa: false }).catch(() => {});
      continue;
    }
    _addingFixed.add(fixaId);
    const [year, month] = state.mesAtual.split('-');
    const dia = Math.min(fixa.diaVencimento || 1, 28);
    const vencimento = `${year}-${month}-${String(dia).padStart(2, '0')}`;
    const entry = { nome: fixa.nome, valor: fixa.valor, vencimento, paga: false, pagaEm: null, criadoEm: Date.now(), contaFixaId: fixaId };
    if (totalParcelas > 0) { entry.parcelaAtual = parcelaAtual; entry.totalParcelas = totalParcelas; }
    try {
      await uRef(`meses/${state.mesAtual}/contas`).push(entry);
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
function formatCurrency(val) { if (state.hideValues) return 'R$ •••'; return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(val)||0); }
function formatDate(str) { if(!str)return''; const[y,m,d]=str.split('-'); return`${d}/${m}/${y}`; }
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function genId() { return`${Date.now()}_${Math.random().toString(36).slice(2,7)}`; }
function monthDiff(from, to) { const[fy,fm]=from.split('-').map(Number);const[ty,tm]=to.split('-').map(Number);return(ty-fy)*12+(tm-fm); }

function renderAll() {
  renderDashboard();
  renderBills();
  renderHistory();
  renderHomeContas();
  renderHomeTransactions();
  renderCategoryChart();
  renderMonthlyChart();
  renderInsights();
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
  const limite = state.limiteGastos || 1000;
  const pct=Math.min(100,Math.round((saldoDevedor/limite)*100));
  document.getElementById('total-debt').textContent=formatCurrency(saldoDevedor);
  document.getElementById('paid-amount').textContent=formatCurrency(totalPago);
  document.getElementById('total-amount').textContent=formatCurrency(totalGeral);
  const bar = document.getElementById('progress-bar');
  bar.style.width=`${pct}%`;
  bar.classList.toggle('danger', pct >= 70);
  document.getElementById('progress-percent').textContent=pct;
  const limitTag=document.getElementById('limit-tag'); if(limitTag) limitTag.textContent=formatCurrency(limite);
  const limitInfo=document.getElementById('limit-info-text'); if(limitInfo) limitInfo.textContent=`utilizado de ${formatCurrency(limite)}`;
  if(pct>=70 && !state._limitAlertShown && saldoDevedor>0 && saldoDevedor<=limite){
    state._limitAlertShown=true;
    showToast(`Atenção! ${pct}% do limite usado. Restam ${formatCurrency(Math.max(0,limite-saldoDevedor))}`,4500);
  }
  const limitExcAlert=document.getElementById('limit-exceeded-alert');
  if(limitExcAlert){
    if(saldoDevedor>limite){
      limitExcAlert.classList.remove('hidden');
      const excTxt=document.getElementById('limit-exceeded-text');
      const excPct=Math.round((saldoDevedor/limite)*100);
      if(excTxt) excTxt.textContent=`Você gastou ${excPct}% do limite — pare de gastar agora!`;
      if(!state._limitExceededAlertShown){state._limitExceededAlertShown=true;showToast('🚨 Limite estourado! Pare de gastar agora!',5000);}
    } else { limitExcAlert.classList.add('hidden'); }
  }
  bar.classList.toggle('over-limit', saldoDevedor>limite);
  const salAlert=document.getElementById('salary-alert');
  if(salAlert){
    if(state.salario>0){
      const comprometido=Math.round((saldoDevedor/state.salario)*100);
      const alertTxt=document.getElementById('salary-alert-text');
      if(comprometido>35){
        salAlert.classList.remove('hidden');
        if(alertTxt) alertTxt.textContent=`${comprometido}% do salário comprometido — o recomendado é até 35%`;
      } else { salAlert.classList.add('hidden'); }
    } else { salAlert.classList.add('hidden'); }
  }
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
    if(db) { await uRef(`meses/${state.mesAtual}/gastos`).push(entry); }
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
      if(db) { await uRef(`meses/${state.mesAtual}/gastos/${id}`).remove(); delete state.gastos[id]; renderAll(); }
      else { delete state.gastos[id]; saveToLocalStorage(); renderAll(); }
      showToast('Gasto removido');
    } else if(type==='conta') {
      const fixaId = state.contas[id]?.contaFixaId || null;
      if(db) {
        await uRef(`meses/${state.mesAtual}/contas/${id}`).remove();
        if(fixaId) { await uRef(`meses/${state.mesAtual}/fixasIgnoradas/${fixaId}`).set(true); state.fixasIgnoradas[fixaId]=true; _appliedFixed.add(fixaId); }
        delete state.contas[id]; renderAll();
      } else {
        if(fixaId) { state.fixasIgnoradas[fixaId]=true; _appliedFixed.add(fixaId); }
        delete state.contas[id]; saveToLocalStorage(); renderAll();
      }
      showToast('Conta removida');
    } else if(type==='contaFixa') {
      if(db) { await uRef(`contasFixas/${id}`).remove(); delete state.contasFixas[id]; renderFixedBills(); }
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
    let fixedBadge='';if(c.contaFixaId){fixedBadge=c.parcelaAtual&&c.totalParcelas?`<span class="fixed-badge">${ICO.repeat(10)} ${c.parcelaAtual}/${c.totalParcelas}</span>`:`<span class="fixed-badge">${ICO.repeat(10)} Fixa</span>`;}
    return`<div class="bill-item${c.paga?' paid':''}" id="bill-${escHtml(id)}"><div class="bill-status-dot"></div><div class="bill-info"><div class="bill-name">${escHtml(c.nome)}${fixedBadge}</div><div class="bill-meta${overdue?' overdue':''}">${meta}</div></div><div class="bill-value">${formatCurrency(c.valor)}</div>${c.paga?`<button class="btn-pay done" disabled>${ICO.check(16)}</button>`:`<button class="btn-pay" onclick="payBill('${escHtml(id)}')">Pagar</button>`}${!c.paga?`<button class="btn-edit-bill" onclick="openEditBill('${escHtml(id)}')" title="Editar">${ICO.edit(16)}</button>`:''  }${!c.paga?`<button class="btn-delete-bill" onclick="confirmDeleteBill('${escHtml(id)}','${escHtml(c.nome)}')">${ICO.trash(16)}</button>`:''}</div>`;
  }).join('')}</div>`;
}

async function payBill(id) {
  const btn=document.querySelector(`#bill-${CSS.escape(id)} .btn-pay`);
  if(btn){btn.innerHTML=ICO.check(16);btn.classList.add('pay-anim','done');btn.disabled=true;}
  try {
    if(db) await uRef(`meses/${state.mesAtual}/contas/${id}`).update({paga:true,pagaEm:Date.now()});
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
    if(db) await uRef(`meses/${state.mesAtual}/contas`).push(entry);
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
    const totalP=f.totalParcelas||0;
    let parcelaTag='';
    if(totalP>0){const atual=f.mesInicio?Math.min(monthDiff(f.mesInicio,state.mesAtual)+1,totalP):1;parcelaTag=`<span class="parcela-badge">${atual}/${totalP}</span>`;}
    return`<div class="fixed-bill-item"><div class="fixed-bill-info"><div class="fixed-bill-name">${escHtml(f.nome)} ${parcelaTag}</div><div class="fixed-bill-meta">Todo dia ${f.diaVencimento||'?'} · ${formatCurrency(f.valor)}</div></div><div class="fixed-bill-actions"><button class="btn-edit-fixed" onclick="openEditFixedBill('${escHtml(id)}')" title="Editar">${ICO.edit(15)}</button><button class="btn-delete-fixed" onclick="confirmDeleteFixedBill('${escHtml(id)}','${escHtml(f.nome)}')">${ICO.trash(15)}</button></div></div>`;
  }).join('')}</div>`;
}

async function handleAddFixedBill(e) {
  e.preventDefault();
  const nome=document.getElementById('fixed-name').value.trim();
  const value=parseFloat(document.getElementById('fixed-value').value);
  const day=parseInt(document.getElementById('fixed-day').value);
  const parcelas=parseInt(document.getElementById('fixed-parcelas')?.value)||0;
  if(!nome) return showToast('Dá um nome pra conta fixa');
  if(!value||value<=0) return showToast('Coloca o valor certinho');
  if(!day||day<1||day>28) return showToast('Dia deve ser entre 1 e 28');
  const entry={nome,valor:value,diaVencimento:day,ativa:true,criadoEm:Date.now(),mesInicio:state.mesAtual};
  if(parcelas>0) entry.totalParcelas=parcelas;
  try {
    if(db) { await uRef('contasFixas').push(entry); }
    else { state.contasFixas[genId()]=entry; saveFixedBillsToLocalStorage(); renderFixedBills(); applyFixedBillsToCurrentMonth(); }
    closeModal('modal-add-fixed-bill'); document.getElementById('form-fixed-bill').reset();
    showToast(parcelas>0?`Conta fixa criada! ${parcelas} parcelas.`:'Conta fixa criada! Adicionada a este mês.');
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
    if(db){await uRef(`historico/${key}`).set(arquivo);await uRef(`meses/${key}`).remove();}
    else{try{localStorage.setItem(`nd_hist_${key}`,JSON.stringify(arquivo));localStorage.removeItem(`nd_${key}`);}catch(_){}}
    state.gastos={};state.contas={};
    _appliedFixed.clear();
    _historicoCache = null; _historicoPending = null;
    closeModal('modal-close-month');showToast('Mês fechado!');navigateTo('home');renderAll();
  } catch(err){showToast('Erro ao fechar o mês');}
}

async function loadPastMonths() {
  const container=document.getElementById('past-months-list');
  container.innerHTML=`<div class="empty-state"><div class="spinner"></div><p>Carregando...</p></div>`;
  try {
    let data=null;
    if(db){const snap=await uRef('historico').once('value');data=snap.val();}
    else{data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('nd_hist_')){try{data[k.replace('nd_hist_','')]=JSON.parse(localStorage.getItem(k));}catch(_){}}};if(!Object.keys(data).length)data=null;}
    if(!data){container.innerHTML=`<div class="empty-state"><span class="empty-icon">${ICO.calendar(40)}</span><p>Nenhum mês fechado ainda</p></div>`;return;}
    const months=Object.entries(data).sort(([a],[b])=>b.localeCompare(a));
    container.innerHTML=`<div class="past-months-inner">${months.map(([key,d])=>{
      const[y,m]=key.split('-'),nomeMes=MESES[parseInt(m)-1];
      return`<div class="past-month-card"><div class="past-month-title">${nomeMes} de ${y}</div><div class="past-month-grid"><div class="past-stat"><div class="past-stat-label">${ICO.bag(14)} Gastos</div><div class="past-stat-value" style="color:var(--danger)">${formatCurrency(d.totalGastos)}</div></div><div class="past-stat"><div class="past-stat-label">${ICO.clipboard(14)} Contas</div><div class="past-stat-value">${formatCurrency(d.totalContas)}</div></div><div class="past-stat"><div class="past-stat-label">${ICO.check(14)} Pago</div><div class="past-stat-value" style="color:var(--green)">${formatCurrency(d.totalPago)}</div></div><div class="past-stat"><div class="past-stat-label">${ICO.chart(14)} Total</div><div class="past-stat-value">${formatCurrency((d.totalGastos||0)+(d.totalContas||0))}</div></div></div></div>`;
    }).join('')}</div>`;
  } catch(err){container.innerHTML=`<div class="empty-state"><span class="empty-icon">${ICO.warning(40)}</span><p>Erro ao carregar</p></div>`;}
}

function toggleHideValues() {
  state.hideValues = !state.hideValues;
  const btn = document.getElementById('btn-toggle-hide');
  if (btn) btn.classList.toggle('active', state.hideValues);
  const icon = document.getElementById('eye-icon');
  if (icon) icon.innerHTML = state.hideValues
    ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
    : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  renderAll();
}

function openEditFixedBill(id) {
  const fixa = state.contasFixas[id];
  if (!fixa) return;
  document.getElementById('edit-fixed-id').value = id;
  document.getElementById('edit-fixed-nome').value = fixa.nome || '';
  document.getElementById('edit-fixed-valor').value = fixa.valor || '';
  document.getElementById('edit-fixed-day').value = fixa.diaVencimento || '';
  document.getElementById('edit-fixed-parcelas-edit').value = fixa.totalParcelas || '';
  openModal('modal-edit-fixed-day');
}

async function saveEditFixedBill(e) {
  e.preventDefault();
  const id = document.getElementById('edit-fixed-id').value;
  const nome = document.getElementById('edit-fixed-nome').value.trim();
  const valor = parseFloat(document.getElementById('edit-fixed-valor').value);
  const day = parseInt(document.getElementById('edit-fixed-day').value);
  const parcelas = parseInt(document.getElementById('edit-fixed-parcelas-edit').value) || 0;
  if (!nome) return showToast('Dá um nome pra conta');
  if (!valor || valor <= 0) return showToast('Coloca o valor certinho');
  if (!day || day < 1 || day > 28) return showToast('Dia deve ser entre 1 e 28');
  const updates = { nome, valor, diaVencimento: day };
  if (parcelas > 0) updates.totalParcelas = parcelas; else updates.totalParcelas = null;
  try {
    if (db) {
      await uRef(`contasFixas/${id}`).update(updates);
      // Update matching conta in current month so the change takes effect immediately
      const contasSnap = await uRef(`meses/${state.mesAtual}/contas`).once('value');
      const contas = contasSnap.val() || {};
      const match = Object.entries(contas).find(([,c]) => c.contaFixaId === id && !c.paga);
      if (match) {
        const [contaId] = match;
        const mes = state.mesAtual;
        const [y, m] = mes.split('-').map(Number);
        const vencimento = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        await uRef(`meses/${mes}/contas/${contaId}`).update({ nome, valor, vencimento });
      }
    } else {
      if (state.contasFixas[id]) Object.assign(state.contasFixas[id], updates);
      saveFixedBillsToLocalStorage();
      // Update local month too
      const match = Object.entries(state.contas).find(([,c]) => c.contaFixaId === id && !c.paga);
      if (match) {
        const [contaId] = match;
        const [y, m] = state.mesAtual.split('-').map(Number);
        const vencimento = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        Object.assign(state.contas[contaId], { nome, valor, vencimento });
        saveToLocalStorage();
      }
    }
    closeModal('modal-edit-fixed-day');
    renderFixedBills();
    renderBills();
    showToast('Conta fixa atualizada!');
  } catch(_) { showToast('Erro ao salvar'); }
}

function openEditBill(id) {
  const c = state.contas[id];
  if (!c) return;
  document.getElementById('edit-bill-id').value = id;
  document.getElementById('edit-bill-nome').value = c.nome || '';
  document.getElementById('edit-bill-valor').value = c.valor || '';
  document.getElementById('edit-bill-vencimento').value = c.vencimento || '';
  openModal('modal-edit-bill');
}

async function saveEditBill(e) {
  e.preventDefault();
  const id = document.getElementById('edit-bill-id').value;
  const nome = document.getElementById('edit-bill-nome').value.trim();
  const valor = parseFloat(document.getElementById('edit-bill-valor').value);
  const vencimento = document.getElementById('edit-bill-vencimento').value;
  if (!nome) return showToast('Dá um nome pra conta');
  if (!valor || valor <= 0) return showToast('Coloca o valor certinho');
  const updates = { nome, valor, vencimento: vencimento || null };
  try {
    if (db) await uRef(`meses/${state.mesAtual}/contas/${id}`).update(updates);
    else { if (state.contas[id]) Object.assign(state.contas[id], updates); saveToLocalStorage(); }
    closeModal('modal-edit-bill');
    renderBills();
    showToast('Conta atualizada!');
  } catch(_) { showToast('Erro ao salvar'); }
}

function deleteFromEditFixed() {
  const id = document.getElementById('edit-fixed-id').value;
  const nome = document.getElementById('edit-fixed-nome').value;
  closeModal('modal-edit-fixed-day');
  confirmDeleteFixedBill(id, nome);
}

function deleteFromEditBill() {
  const id = document.getElementById('edit-bill-id').value;
  const nome = document.getElementById('edit-bill-nome').value;
  closeModal('modal-edit-bill');
  confirmDeleteBill(id, nome);
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
  on('btn-add-expense-header','click',()=>openModal('modal-add-type'));
  on('btn-go-bills','click',()=>navigateTo('bills'));
  // Fechar mês
  on('btn-close-month','click',openCloseMonthModal);
  on('btn-close-month-mobile','click',openCloseMonthModal);
  // Meses anteriores
  on('btn-history-months','click',()=>{loadPastMonths();navigateTo('past-months');});
  on('btn-history-months-sb','click',()=>{loadPastMonths();navigateTo('past-months');});
  // Contas fixas
  on('btn-manage-fixed','click',()=>navigateTo('fixed-bills'));
  on('btn-go-bills-from-fixed','click',()=>navigateTo('bills'));
  // Logout
  on('btn-logout','click',logout);
  // Perfil
  on('btn-open-profile','click',()=>navigateTo('profile'));
  on('btn-back-profile','click',()=>navigateTo('home'));
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
  const hideNav = ['past-months','fixed-bills','profile'].includes(viewName);
  document.getElementById('bottom-nav').style.display = hideNav ? 'none' : '';
  if (viewName === 'add-expense') resetExpenseForm();
  if (viewName === 'past-months') loadPastMonths();
  if (viewName === 'profile') renderProfile();
}

function setupModals() {
  on('btn-add-bill','click',()=>{ openModal('modal-add-type'); });
  on('add-type-expense','click',()=>{ closeModal('modal-add-type'); navigateTo('add-expense'); });
  on('add-type-bill','click',()=>{ closeModal('modal-add-type'); document.getElementById('form-bill').reset(); document.getElementById('bill-due').value=todayStr(); openModal('modal-add-bill'); setTimeout(()=>document.getElementById('bill-name').focus(),300); });
  on('add-type-fixed','click',()=>{ closeModal('modal-add-type'); document.getElementById('form-fixed-bill').reset(); openModal('modal-add-fixed-bill'); setTimeout(()=>document.getElementById('fixed-name').focus(),300); });
  on('btn-toggle-hide','click',toggleHideValues);
  const formEditFixed=document.getElementById('form-edit-fixed-day');
  if(formEditFixed) formEditFixed.addEventListener('submit',saveEditFixedBill);
  const formEditBill=document.getElementById('form-edit-bill');
  if(formEditBill) formEditBill.addEventListener('submit',saveEditBill);
  on('btn-confirm-close','click',handleCloseMonth);
  on('btn-confirm-delete','click',executeDelete);
  document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.close)));
}
function openModal(id){document.getElementById(id).classList.remove('hidden');}
function closeModal(id){document.getElementById(id).classList.add('hidden');}

function showToast(msg,duration=2600,position='bottom'){
  const t=document.getElementById('toast'); t.textContent=msg;
  t.classList.remove('hidden','toast-motivational');
  t.classList.toggle('toast-top',position==='top');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>{t.classList.add('hidden');t.classList.remove('toast-top');},duration);
}
function showMotivationalToast(msg){
  const t=document.getElementById('toast'); t.textContent=msg;
  t.classList.remove('hidden'); t.classList.add('toast-top','toast-motivational');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>{t.classList.add('hidden');t.classList.remove('toast-top','toast-motivational');},5000);
}
function setupOnlineStatus(){window.addEventListener('online',()=>showToast('Conexão restaurada'));window.addEventListener('offline',()=>showToast('Sem conexão'));}
function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});}
function on(id,ev,fn){const el=document.getElementById(id);if(el)el.addEventListener(ev,fn);}

/* ─── CHARTS ─── */
function renderCategoryChart() {
  const ALL_CATS = ['alimentacao','transporte','lazer','saude','outros'];
  const totals={};
  for(const g of Object.values(state.gastos)){const c=g.categoria||'outros';totals[c]=(totals[c]||0)+(g.valor||0);}
  const total = ALL_CATS.reduce((s,k)=>s+(totals[k]||0),0);
  const empty=document.getElementById('chart-cat-empty');
  const canvas=document.getElementById('chart-categories');
  if(!total){
    if(chartCategories){chartCategories.destroy();chartCategories=null;}
    if(empty)empty.classList.remove('hidden');
    if(canvas)canvas.style.display='none';
    return;
  }
  if(empty)empty.classList.add('hidden');
  if(canvas)canvas.style.display='';
  if(chartCategories){chartCategories.destroy();chartCategories=null;}
  if(!canvas)return;
  const labels = ALL_CATS.map(k=>CATEGORIAS[k].label);
  const data   = ALL_CATS.map(k=>totals[k]||0);
  const colors = ALL_CATS.map(k=>CAT_COLORS[k]);
  chartCategories=new Chart(canvas,{
    type:'doughnut',
    data:{labels,datasets:[{data,backgroundColor:colors,borderWidth:2,borderColor:'#0d0d0d',hoverOffset:6}]},
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{
          position:'bottom',
          labels:{
            color:'#f0f0f5',padding:14,font:{size:12},usePointStyle:true,
            generateLabels: chart => ALL_CATS.map((k,i)=>({
              text:`${CATEGORIAS[k].label}  ${Math.round((totals[k]||0)/total*100)}%`,
              fillStyle:colors[i],
              strokeStyle:colors[i],
              fontColor:colors[i],
              pointStyle:'circle',
              hidden:false,
              index:i
            }))
          }
        },
        tooltip:{callbacks:{label:c=>` ${formatCurrency(c.raw)} (${Math.round(c.raw/total*100)}%)`}},
        datalabels:{
          color:'#ffffff',
          font:{weight:'bold',size:13},
          textShadowBlur:6,
          textShadowColor:'rgba(0,0,0,0.6)',
          formatter:(value)=>{
            const pct=Math.round(value/total*100);
            return pct>=5?`${pct}%`:'';
          }
        }
      }
    },
    plugins:[ChartDataLabels]
  });
}

async function renderMonthlyChart() {
  const empty=document.getElementById('chart-monthly-empty');
  const canvas=document.getElementById('chart-monthly');
  let historico={};
  if(db){try{const snap=await uRef('historico').once('value');historico=snap.val()||{};}catch(e){}}
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
window.openEditFixedBill=openEditFixedBill;
window.openEditBill=openEditBill;
window.toggleHideValues=toggleHideValues;
window.openInsights=openInsights;
window.closeInsights=closeInsights;
window.insightPayBill=insightPayBill;
window.toggleInsights=toggleInsights;

/* ═══════════════════════════════════════
   INTELIGÊNCIA FINANCEIRA
═══════════════════════════════════════ */
let _historicoCache = null;
let _historicoPending = null;

async function getHistoricoCache() {
  if (_historicoCache !== null) return _historicoCache;
  if (_historicoPending) return _historicoPending;
  if (!db) return (_historicoCache = {});
  _historicoPending = uRef('historico').once('value')
    .then(snap => { _historicoCache = snap.val() || {}; _historicoPending = null; return _historicoCache; })
    .catch(() => { _historicoPending = null; return (_historicoCache = {}); });
  return _historicoPending;
}

function buildSyncInsights() {
  const insights = [];
  const today = todayStr();

  // contas vencidas — uma por uma com botão de pagar
  const vencidas = Object.entries(state.contas)
    .filter(([, c]) => !c.paga && c.vencimento && c.vencimento < today)
    .sort(([, a], [, b]) => a.vencimento.localeCompare(b.vencimento));
  for (const [id, c] of vencidas) {
    insights.push({
      type: 'danger',
      icon: ICO.warning(18),
      title: `"${escHtml(c.nome)}" está vencida`,
      detail: `Venceu em ${formatDate(c.vencimento)} · ${formatCurrency(c.valor)}`,
      billId: id
    });
  }

  // contas vencendo em até 3 dias — uma por uma com botão de pagar
  const limite3d = new Date();
  limite3d.setDate(limite3d.getDate() + 3);
  const limite3dStr = limite3d.toISOString().split('T')[0];
  const proximas = Object.entries(state.contas)
    .filter(([, c]) => !c.paga && c.vencimento && c.vencimento >= today && c.vencimento <= limite3dStr)
    .sort(([, a], [, b]) => a.vencimento.localeCompare(b.vencimento));
  for (const [id, c] of proximas) {
    const diff = Math.round((new Date(c.vencimento + 'T12:00:00') - new Date()) / 86400000);
    const label = diff <= 0 ? 'vence hoje' : diff === 1 ? 'vence amanhã' : `vence em ${diff} dias`;
    insights.push({
      type: 'warning',
      icon: ICO.calendar(18),
      title: `"${escHtml(c.nome)}" ${label}`,
      detail: formatCurrency(c.valor),
      billId: id
    });
  }

  // projeção do mês (só a partir do dia 5, com 3+ gastos)
  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const expenses = Object.values(state.gastos);
  if (dayOfMonth >= 5 && expenses.length >= 3) {
    const totalGastos = expenses.reduce((s, g) => s + (g.valor || 0), 0);
    const totalContas = Object.values(state.contas).reduce((s, c) => s + (c.valor || 0), 0);
    const projected = Math.round((totalGastos / dayOfMonth) * daysInMonth + totalContas);
    const limiteVal = state.limiteGastos || 1000;
    const pctProj = Math.round((projected / limiteVal) * 100);
    if (projected > totalGastos + totalContas) {
      insights.push({
        type: projected > limiteVal ? 'danger' : pctProj >= 80 ? 'warning' : 'info',
        icon: ICO.chart(18),
        title: `Projeção: ${formatCurrency(projected)} este mês`,
        detail: projected > limiteVal
          ? `Acima do limite em ${formatCurrency(projected - limiteVal)} se continuar neste ritmo`
          : `${pctProj}% do limite de ${formatCurrency(limiteVal)}`
      });
    }
  }

  return insights;
}

async function buildHistoricoInsights() {
  const insights = [];
  const historico = await getHistoricoCache();
  const keys = Object.keys(historico).sort();
  if (!keys.length) return insights;

  // comparação com mês anterior (só se diferença >= 10%)
  const lastKey = keys[keys.length - 1];
  const lastMonth = historico[lastKey];
  const lastTotal = (lastMonth.totalGastos || 0) + (lastMonth.totalContas || 0);
  const currentTotal = Object.values(state.gastos).reduce((s, g) => s + (g.valor || 0), 0)
    + Object.values(state.contas).reduce((s, c) => s + (c.valor || 0), 0);
  if (lastTotal > 0 && currentTotal > 0) {
    const diff = currentTotal - lastTotal;
    const pct = Math.abs(Math.round((diff / lastTotal) * 100));
    const mesNome = MESES[parseInt(lastKey.split('-')[1]) - 1];
    if (pct >= 10) {
      insights.push({
        type: diff > 0 ? 'warning' : 'success',
        icon: diff > 0 ? ICO.warning(18) : ICO.check(18),
        title: diff > 0 ? `Gastos ${pct}% acima de ${mesNome}` : `Gastos ${pct}% abaixo de ${mesNome}`,
        detail: diff > 0
          ? `${formatCurrency(Math.abs(diff))} a mais que no mês passado`
          : `${formatCurrency(Math.abs(diff))} economizados em relação ao mês passado`
      });
    }
  }

  // categoria acima da média (só com 2+ meses e média >= R$50)
  if (keys.length >= 2) {
    const catAccum = {};
    let validMonths = 0;
    for (const key of keys) {
      const h = historico[key];
      if (!h.gastos || !Object.keys(h.gastos).length) continue;
      validMonths++;
      for (const g of Object.values(h.gastos)) {
        const cat = g.categoria || 'outros';
        catAccum[cat] = (catAccum[cat] || 0) + (g.valor || 0);
      }
    }
    if (validMonths >= 2) {
      const catAvg = {};
      for (const [cat, total] of Object.entries(catAccum)) catAvg[cat] = total / validMonths;
      const currentCats = {};
      for (const g of Object.values(state.gastos)) {
        const cat = g.categoria || 'outros';
        currentCats[cat] = (currentCats[cat] || 0) + (g.valor || 0);
      }
      let topSpike = null, topPct = 0;
      for (const [cat, val] of Object.entries(currentCats)) {
        const avg = catAvg[cat] || 0;
        if (avg >= 50 && val > avg) {
          const pct = Math.round(((val - avg) / avg) * 100);
          if (pct >= 30 && pct > topPct) { topSpike = { cat, val, avg, pct }; topPct = pct; }
        }
      }
      if (topSpike) {
        const catLabel = CATEGORIAS[topSpike.cat]?.label || topSpike.cat;
        insights.push({
          type: 'warning',
          icon: ICO.warning(18),
          title: `${catLabel} ${topSpike.pct}% acima da sua média`,
          detail: `${formatCurrency(topSpike.val)} este mês · média histórica: ${formatCurrency(Math.round(topSpike.avg))}`
        });
      }
    }
  }

  return insights;
}

function renderInsightsList(insights) {
  const container = document.getElementById('insights-list');
  if (!container) return;

  const hasData = Object.keys(state.gastos).length > 0 || Object.keys(state.contas).length > 0;

  // atualiza botão flutuante
  const btn = document.getElementById('floating-insights-btn');
  const label = document.getElementById('floating-insights-label');
  if (btn && label) {
    const alerts = insights.filter(i => i.type === 'danger' || i.type === 'warning').length;
    if (alerts > 0) {
      label.textContent = `${alerts} alerta${alerts > 1 ? 's' : ''}`;
      btn.classList.add('has-alerts');
    } else {
      label.textContent = 'Análise';
      btn.classList.remove('has-alerts');
    }
  }

  if (!insights.length) {
    container.innerHTML = `<div class="insights-empty">${hasData ? 'Tudo em ordem — continue assim! 👍' : 'Registre seus primeiros gastos para ver análises aqui'}</div>`;
    return;
  }

  const VISIBLE = 2;
  const hasMore = insights.length > VISIBLE;
  const hidden = insights.length - VISIBLE;

  container.innerHTML = insights.map((ins, i) => `
    <div class="insight-item insight-${ins.type}${i >= VISIBLE ? ' insight-hidden' : ''}">
      <div class="insight-icon">${ins.icon}</div>
      <div class="insight-body">
        <div class="insight-title">${ins.title}</div>
        <div class="insight-detail">${ins.detail}</div>
        ${ins.billId ? `<button class="insight-pay-btn" onclick="insightPayBill('${ins.billId}', this)">Já paguei ✓</button>` : ''}
      </div>
    </div>
  `).join('') + (hasMore ? `
    <button class="insights-show-more" id="btn-insights-toggle" onclick="toggleInsights(this)" data-hidden="${hidden}">
      <span class="insights-show-more-badge">${hidden}</span>
      <span class="insights-show-more-text">análise${hidden > 1 ? 's' : ''} oculta${hidden > 1 ? 's' : ''}</span>
      <svg class="insights-show-more-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
  ` : '');
}

function toggleInsights(btn) {
  const hidden = document.querySelectorAll('#insights-list .insight-hidden');
  const isExpanded = hidden.length === 0;
  if (isExpanded) {
    document.querySelectorAll('#insights-list .insight-item').forEach((el, i) => {
      if (i >= 2) el.classList.add('insight-hidden');
    });
    const count = parseInt(btn.dataset.hidden);
    btn.querySelector('.insights-show-more-badge').textContent = count;
    btn.querySelector('.insights-show-more-text').textContent = `análise${count > 1 ? 's' : ''} oculta${count > 1 ? 's' : ''}`;
    btn.querySelector('.insights-show-more-arrow').style.transform = '';
  } else {
    hidden.forEach(el => el.classList.remove('insight-hidden'));
    btn.querySelector('.insights-show-more-badge').textContent = '✓';
    btn.querySelector('.insights-show-more-text').textContent = 'ver menos';
    btn.querySelector('.insights-show-more-arrow').style.transform = 'rotate(180deg)';
  }
}

async function insightPayBill(id, btn) {
  if (btn) { btn.textContent = 'Pagando...'; btn.disabled = true; }
  await payBill(id);
}

function openInsights() {
  document.getElementById('insights-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeInsights() {
  document.getElementById('insights-modal').classList.add('hidden');
  document.body.style.overflow = '';
}


async function renderInsights() {
  const sync = buildSyncInsights();
  renderInsightsList(sync);
  const hist = await buildHistoricoInsights();
  renderInsightsList([...sync, ...hist]);
}

/* ═══════════════════════════════════════
   ONBOARDING TOUR
═══════════════════════════════════════ */
const TOUR_STEPS = [
  {
    targetId: 'debt-card',
    title: 'Painel Principal',
    desc: 'Aqui você vê o resumo completo do seu mês: gastos totais, limite disponível e a barra de progresso. Você recebe um alerta ao atingir 70% do limite. O botão Fechar Mês arquiva tudo no histórico no fim do mês — use-o para começar o próximo mês do zero.'
  },
  {
    targetId: 'btn-add-expense-header',
    title: 'Adicionar',
    desc: 'Toque aqui para adicionar qualquer tipo de lançamento. Você escolhe entre: Despesa (alimentação, transporte, lazer...), Conta Comum (conta avulsa do mês) ou Conta Fixa (recorrente todo mês, como aluguel e internet).'
  },
  {
    targetId: 'nav-tour-bills',
    title: 'Contas a Pagar',
    desc: 'Lista todas as suas contas do mês — as fixas geradas automaticamente e as avulsas que você adicionar. Marque como paga, edite o valor ou exclua quando precisar. Contas não pagas ao fechar o mês ficam registradas no histórico como pendentes.'
  },
  {
    targetId: 'nav-tour-history',
    title: 'Histórico de Transações',
    desc: 'Veja todas as despesas lançadas no mês atual em ordem cronológica. Os resumos dos meses anteriores ficam disponíveis pelo botão "Ver meses anteriores" na tela inicial — lá você acompanha a evolução dos seus gastos ao longo do tempo.'
  },
  {
    targetId: 'nav-tour-profile',
    title: 'Perfil',
    desc: 'Configure seu nome, salário mensal e limite de gastos. O salário alimenta os alertas automáticos — como o aviso quando suas contas passam 35% da sua renda. Você também pode adicionar uma foto, compartilhar o app e sair da conta por aqui.'
  }
];

let _tourStep = 0;

function _tourInjectDOM() {
  if (document.getElementById('tour-backdrop')) return;
  const backdrop = document.createElement('div');
  backdrop.id = 'tour-backdrop';
  document.body.appendChild(backdrop);

  const card = document.createElement('div');
  card.id = 'tour-card';
  card.innerHTML = `
    <button class="tour-btn-close" id="tour-close">✕</button>
    <div class="tour-card-title" id="tour-title"></div>
    <div class="tour-card-desc" id="tour-desc"></div>
    <div class="tour-card-footer">
      <span class="tour-card-step" id="tour-step-lbl"></span>
      <div class="tour-card-actions">
        <button class="tour-btn-skip" id="tour-skip">Pular</button>
        <button class="tour-btn-next" id="tour-next">Próximo →</button>
      </div>
    </div>
  `;
  document.body.appendChild(card);
  document.getElementById('tour-next').addEventListener('click', _tourAdvance);
  document.getElementById('tour-skip').addEventListener('click', _tourAdvance);
  document.getElementById('tour-close').addEventListener('click', _tourAdvance);
}

function startTour() {
  if (localStorage.getItem('tourDone') === '1') return;
  _tourInjectDOM();
  _tourStep = 0;
  _tourShowRing(0);
}

function _tourShowRing(index) {
  document.querySelectorAll('.tour-pulse').forEach(el => el.classList.remove('tour-pulse'));
  const oldInterceptor = document.getElementById('tour-interceptor');
  if (oldInterceptor) oldInterceptor.remove();
  const oldHint = document.getElementById('tour-tap-hint');
  if (oldHint) oldHint.remove();
  const backdrop = document.getElementById('tour-backdrop');
  const card = document.getElementById('tour-card');
  if (backdrop) backdrop.style.display = 'none';
  if (card) card.style.display = 'none';

  const step = TOUR_STEPS[index];
  const target = document.getElementById(step.targetId);
  if (!target) { _tourAdvance(); return; }

  target.classList.add('tour-pulse');
  target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  setTimeout(() => {
    const rect = target.getBoundingClientRect();
    const interceptor = document.createElement('div');
    interceptor.id = 'tour-interceptor';
    interceptor.style.top    = rect.top + 'px';
    interceptor.style.left   = rect.left + 'px';
    interceptor.style.width  = rect.width + 'px';
    interceptor.style.height = rect.height + 'px';
    document.body.appendChild(interceptor);
    interceptor.addEventListener('click', () => {
      interceptor.remove();
      _tourOpenCard(index);
    });

    const hint = document.createElement('div');
    hint.id = 'tour-tap-hint';
    hint.textContent = '👆 Toque aqui';
    const hintTop = rect.height > 80
      ? rect.top + rect.height / 2 - 18
      : rect.bottom + 8;
    hint.style.top  = Math.min(hintTop, window.innerHeight - 50) + 'px';
    hint.style.left = (rect.left + rect.width / 2) + 'px';
    document.body.appendChild(hint);
  }, 350);
}

function _tourOpenCard(index) {
  const hint = document.getElementById('tour-tap-hint');
  if (hint) hint.remove();
  const step = TOUR_STEPS[index];
  document.getElementById('tour-title').textContent = step.title;
  document.getElementById('tour-desc').textContent  = step.desc;
  document.getElementById('tour-step-lbl').textContent = `${index + 1} de ${TOUR_STEPS.length}`;

  const isLast = index === TOUR_STEPS.length - 1;
  document.getElementById('tour-next').textContent = isLast ? 'Concluir ✓' : 'Próximo →';
  document.getElementById('tour-skip').style.display = isLast ? 'none' : '';

  document.getElementById('tour-backdrop').style.display = 'block';
  document.getElementById('tour-card').style.display = 'block';
}

function _tourAdvance() {
  const next = _tourStep + 1;
  if (next >= TOUR_STEPS.length) {
    _tourEnd();
  } else {
    _tourStep = next;
    _tourShowRing(next);
  }
}

function _tourEnd() {
  document.querySelectorAll('.tour-pulse').forEach(el => el.classList.remove('tour-pulse'));
  const interceptor = document.getElementById('tour-interceptor');
  if (interceptor) interceptor.remove();
  const hint = document.getElementById('tour-tap-hint');
  if (hint) hint.remove();
  const backdrop = document.getElementById('tour-backdrop');
  if (backdrop) backdrop.style.display = 'none';
  const card = document.getElementById('tour-card');
  if (card) card.style.display = 'none';
  localStorage.setItem('tourDone', '1');
}

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
  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) bottomNav.style.display = '';

  if (!_appInitialized) {
    _appInitialized = true;
    setupNavigation();
    setupForms();
    setupModals();
    setupProfileForm();
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

  loadUserProfile();
  showMotivationalQuote();

  const shortcut = new URLSearchParams(location.search).get('shortcut');
  if (shortcut === 'add-expense') navigateTo('add-expense');

  setTimeout(startTour, 1500);
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
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      if (!name) return showAuthError('Coloca seu nome primeiro');
      if (!email || !password) return showAuthError('Preencha todos os campos');
      if (password !== confirm) return showAuthError('As senhas não conferem');
      if (password.length < 6) return showAuthError('A senha precisa ter ao menos 6 caracteres');
      const btn = document.getElementById('btn-signup-submit');
      btn.disabled = true; btn.textContent = 'Criando...';
      try {
        const salary = parseFloat(document.getElementById('signup-salary')?.value) || 0;
        const limit = parseFloat(document.getElementById('signup-limit')?.value) || 1000;
        const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.database().ref(`users/${cred.user.uid}/profile`).set({ nome: name, salario: salary, limiteGastos: limit });
      } catch(err) {
        showAuthError(getAuthErrorMsg(err.code));
        btn.disabled = false; btn.textContent = 'Criar Conta';
      }
    });
  }

  const demoBtn = document.getElementById('btn-try-demo');
  if (demoBtn) demoBtn.addEventListener('click', enterDemoMode);

  const signupSalary = document.getElementById('signup-salary');
  const signupLimit  = document.getElementById('signup-limit');
  if (signupSalary && signupLimit) {
    signupSalary.addEventListener('input', () => {
      const sal = parseFloat(signupSalary.value) || 0;
      signupLimit.value = sal > 0 ? (Math.round(sal * 0.8 * 100) / 100) : '';
    });
  }
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
    if (db && currentMonthListener) uRef(`meses/${currentMonthListener}`).off('value');
    if (db) uRef('contasFixas').off('value');
    db = null; state.firebaseOk = false; currentMonthListener = null;
    state.gastos = {}; state.contas = {}; state.contasFixas = {};
    firebase.auth().signOut();
  }
  state.currentUser = null;
  state.salario = 0; state.limiteGastos = 1000;
  state._limitAlertShown = false; state._limitExceededAlertShown = false; state.hideValues = false; state._profileName = '';
  state._profileFoto = null; state._pendingPhoto = null;
  _motivationalShown = false;
  updateHeaderAvatar(null);
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

async function loadUserProfile() {
  const el = document.getElementById('greeting-text');
  if (state.demoMode) { if (el) el.textContent = 'Olá!'; return; }
  if (!state.currentUser || !db) { if (el) el.textContent = 'Oi!'; return; }
  try {
    const snap = await uRef('profile').once('value');
    const profile = snap.val() || {};
    state._profileName = profile.nome || '';
    state.salario = profile.salario || 0;
    state.limiteGastos = profile.limiteGastos || 1000;
    state._limitAlertShown = false;
    if (el) el.textContent = state._profileName ? `Oi, ${state._profileName}!` : 'Oi!';
    if (profile.foto) { state._profileFoto = profile.foto; updateHeaderAvatar(profile.foto); }
    renderDashboard();
  } catch(_) { if (el) el.textContent = 'Oi!'; }
}

const FRASES_MOTIVACIONAIS = [
  'O rico não é quem mais ganha, é quem mais guarda.',
  'Cada centavo guardado hoje é liberdade amanhã.',
  'Cuide do seu dinheiro ou ele vai embora sozinho.',
  'Disciplina financeira hoje, sonhos realizados amanhã.',
  'Gastar menos do que ganha é o segredo dos ricos.',
  'Pequenas economias constroem grandes fortunas.',
  'Investir em você mesmo é o melhor investimento.',
  'O controle do seu dinheiro começa com consciência.',
  'Poupe primeiro, gaste depois — nunca o contrário.',
  'Seu futuro financeiro começa nas escolhas de hoje.',
];

let _motivationalShown = false;
function showMotivationalQuote() {
  if (_motivationalShown) return;
  _motivationalShown = true;
  const frase = FRASES_MOTIVACIONAIS[Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length)];
  setTimeout(() => showMotivationalToast(frase), 800);
}

/* ═══════════════════════════════════════
   PERFIL / CONFIGURAÇÕES
═══════════════════════════════════════ */

function updateHeaderAvatar(photoUrl) {
  const pairs = [
    [document.getElementById('header-avatar-img'),  document.getElementById('header-avatar-icon')],
    [document.getElementById('nav-avatar-img'),      document.getElementById('nav-avatar-icon')],
  ];
  for (const [img, icon] of pairs) {
    if (photoUrl) {
      if (img)  { img.src = photoUrl; img.classList.remove('hidden'); }
      if (icon) icon.classList.add('hidden');
    } else {
      if (img)  img.classList.add('hidden');
      if (icon) icon.classList.remove('hidden');
    }
  }
}

function renderProfile() {
  const nameInput   = document.getElementById('profile-name');
  const salaryInput = document.getElementById('profile-salary');
  const limitInput  = document.getElementById('profile-limit');
  if (nameInput)   nameInput.value   = state._profileName || '';
  if (salaryInput) salaryInput.value = state.salario || '';
  if (limitInput)  limitInput.value  = state.limiteGastos || '';

  const nameDisplay  = document.getElementById('profile-name-display');
  const emailDisplay = document.getElementById('profile-email-display');
  if (nameDisplay)  nameDisplay.textContent  = state._profileName || 'Usuário';
  if (emailDisplay) emailDisplay.textContent = state.demoMode ? 'Modo Demo' : (state.currentUser?.email || '');

  const img         = document.getElementById('profile-avatar-img');
  const placeholder = document.getElementById('profile-avatar-placeholder');
  if (state._profileFoto) {
    if (img)         { img.src = state._profileFoto; img.classList.remove('hidden'); }
    if (placeholder) placeholder.classList.add('hidden');
  } else {
    if (img)         img.classList.add('hidden');
    if (placeholder) placeholder.classList.remove('hidden');
  }
}

function setupProfileForm() {
  const form = document.getElementById('form-profile');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    await saveProfile();
  });

  const photoInput = document.getElementById('profile-photo-input');
  const cameraBtn  = document.getElementById('profile-camera-btn');
  if (cameraBtn && photoInput) cameraBtn.addEventListener('click', () => photoInput.click());

  if (photoInput) {
    photoInput.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      const base64 = await compressImage(file, 220, 220);
      state._pendingPhoto = base64;
      const img         = document.getElementById('profile-avatar-img');
      const placeholder = document.getElementById('profile-avatar-placeholder');
      if (img)         { img.src = base64; img.classList.remove('hidden'); }
      if (placeholder) placeholder.classList.add('hidden');
    });
  }

  const shareBtn = document.getElementById('btn-share-app');
  if (shareBtn) shareBtn.addEventListener('click', shareApp);

  const profileSalary = document.getElementById('profile-salary');
  const profileLimit  = document.getElementById('profile-limit');
  if (profileSalary && profileLimit) {
    profileSalary.addEventListener('input', () => {
      const sal = parseFloat(profileSalary.value) || 0;
      if (sal > 0) profileLimit.value = Math.round(sal * 0.8 * 100) / 100;
    });
  }

  on('btn-logout-profile', 'click', logout);
}

async function saveProfile() {
  const btn = document.getElementById('btn-save-profile');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvando...'; }

  const nome    = (document.getElementById('profile-name')?.value   || '').trim();
  const salario = parseFloat(document.getElementById('profile-salary')?.value) || 0;
  const limite  = parseFloat(document.getElementById('profile-limit')?.value)  || 1000;

  const data = { nome, salario, limiteGastos: limite };
  if (state._pendingPhoto) data.foto = state._pendingPhoto;

  try {
    if (!state.demoMode && db && state.currentUser) {
      await uRef('profile').update(data);
    }
    state._profileName  = nome;
    state.salario       = salario;
    state.limiteGastos  = limite;
    state._limitAlertShown = false;
    if (state._pendingPhoto) {
      state._profileFoto  = state._pendingPhoto;
      state._pendingPhoto = null;
      updateHeaderAvatar(state._profileFoto);
    }
    const greetEl = document.getElementById('greeting-text');
    if (greetEl) greetEl.textContent = nome ? `Oi, ${nome}!` : 'Oi!';
    const nameDisplay = document.getElementById('profile-name-display');
    if (nameDisplay) nameDisplay.textContent = nome || 'Usuário';
    renderDashboard();
    showToast('Perfil salvo!');
  } catch(err) {
    showToast('Erro ao salvar perfil');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Salvar Alterações'; }
  }
}

function compressImage(file, maxW, maxH) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        const ratio = Math.min(maxW / w, maxH / h);
        if (ratio < 1) { w = Math.round(w * ratio); h = Math.round(h * ratio); }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ═══════════════════════════════════════
   SHARE
═══════════════════════════════════════ */

async function shareApp() {
  const shareBtn = document.getElementById('btn-share-app');
  if (shareBtn) { shareBtn.disabled = true; shareBtn.textContent = 'Gerando...'; }
  const APP_URL = 'https://iadigitall.github.io/Gastos/';
  const name = state._profileName || '';
  const msgText = name
    ? `💚 *${name}* te convida para o *Minhas Finanças*\nControle inteligente do seu dinheiro — grátis!\n\n👉 ${APP_URL}`
    : `💚 *Minhas Finanças* — Controle inteligente do seu dinheiro!\nInstale grátis direto no celular.\n\n👉 ${APP_URL}`;

  try {
    const blob = await generateShareCard();
    const file = new File([blob], 'minhas-financas.png', { type: 'image/png' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Minhas Finanças', text: msgText });
    } else if (navigator.share) {
      await navigator.share({ title: 'Minhas Finanças', text: msgText, url: APP_URL });
    } else {
      await navigator.clipboard.writeText(msgText);
      showToast('Mensagem copiada!');
    }
  } catch(err) {
    if (err.name !== 'AbortError') {
      try {
        await navigator.clipboard.writeText(msgText);
        showToast('Mensagem copiada!');
      } catch(_) { showToast('Link: ' + APP_URL, 5000); }
    }
  } finally {
    if (shareBtn) {
      shareBtn.disabled = false;
      shareBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Compartilhar App`;
    }
  }
}

function _cardRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

async function generateShareCard() {
  const W = 1080, H = 1080;
  const F = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── Fundo
  ctx.fillStyle = '#0D0D0D';
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W/2, H*0.42, 0, W/2, H*0.42, W*0.6);
  glow.addColorStop(0, 'rgba(163,255,71,0.06)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── Barras de acento
  ctx.fillStyle = '#A3FF47';
  ctx.fillRect(0, 0, W, 8);
  ctx.fillRect(0, H - 8, W, 8);

  // ── Cabeçalho
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 62px ${F}`;
  ctx.fillText('Minhas Finanças', W/2, 108);
  ctx.fillStyle = '#6B7280';
  ctx.font = `400 30px ${F}`;
  ctx.fillText('Controle inteligente do seu dinheiro', W/2, 152);

  // ── Linha separadora topo
  ctx.strokeStyle = '#1E1E1E';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W*0.12, 188); ctx.lineTo(W*0.88, 188); ctx.stroke();

  // ── Dois círculos lado a lado
  const r = 148;
  const leftCx = W/2 - 195, rightCx = W/2 + 195, cy = 430;

  // Avatar do usuário (esquerda)
  ctx.save();
  ctx.beginPath();
  ctx.arc(leftCx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  if (state._profileFoto) {
    const img = new Image();
    await new Promise(res => { img.onload = res; img.onerror = res; img.src = state._profileFoto; });
    const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    const scale = Math.max((r*2) / iw, (r*2) / ih);
    const dw = iw * scale, dh = ih * scale;
    ctx.drawImage(img, leftCx - r - (dw - r*2)/2, cy - r - (dh - r*2)/2, dw, dh);
  } else {
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(leftCx - r, cy - r, r*2, r*2);
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(leftCx, cy - 32, 56, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(leftCx, cy + 136, 100, Math.PI, 0); ctx.fill();
  }
  ctx.restore();
  ctx.strokeStyle = '#A3FF47';
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.arc(leftCx, cy, r + 5, 0, Math.PI * 2); ctx.stroke();

  // Logo do app (direita) — rounded square verde com gráfico
  const logoSize = r * 2;
  const lx = rightCx - r, ly = cy - r, lrr = Math.round(logoSize * 0.29);
  ctx.fillStyle = '#A3FF47';
  _cardRoundRect(ctx, lx, ly, logoSize, logoSize, lrr);
  ctx.fill();

  // Gráfico de linha dentro do logo (escala do viewBox 56x56)
  const sc = logoSize / 56;
  ctx.strokeStyle = '#0D0D0D';
  ctx.lineWidth = 3.8 * sc;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(lx + 14*sc, ly + 38*sc);
  ctx.lineTo(lx + 20*sc, ly + 30*sc);
  ctx.lineTo(lx + 27*sc, ly + 34*sc);
  ctx.lineTo(lx + 35*sc, ly + 22*sc);
  ctx.lineTo(lx + 42*sc, ly + 18*sc);
  ctx.stroke();
  ctx.fillStyle = '#0D0D0D';
  ctx.beginPath(); ctx.arc(lx + 14*sc, ly + 38*sc, 3.2*sc, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(lx + 42*sc, ly + 18*sc, 3.2*sc, 0, Math.PI*2); ctx.fill();

  // ── Badge "+" entre os dois
  const badgeR = 34;
  ctx.fillStyle = '#0D0D0D';
  ctx.beginPath(); ctx.arc(W/2, cy, badgeR, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#2A2A2A';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(W/2, cy, badgeR, 0, Math.PI*2); ctx.stroke();
  ctx.fillStyle = '#A3FF47';
  ctx.font = `700 38px ${F}`;
  ctx.textAlign = 'center';
  ctx.fillText('+', W/2, cy + 13);

  // ── Label abaixo de cada círculo
  ctx.font = `600 26px ${F}`;
  ctx.fillStyle = '#6B7280';
  const nome = state._profileName || 'Usuário';
  ctx.fillText(nome, leftCx, cy + r + 44);
  ctx.fillText('App', rightCx, cy + r + 44);

  // ── Mensagem principal
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 52px ${F}`;
  ctx.fillText(`${nome} te convida!`, W/2, cy + r + 130);

  ctx.fillStyle = '#9CA3AF';
  ctx.font = `400 32px ${F}`;
  ctx.fillText('Controle suas finanças com inteligência.', W/2, cy + r + 184);
  ctx.fillText('Grátis · Instala direto no celular.', W/2, cy + r + 226);

  // ── Pill com URL
  const pillW = 560, pillH = 68, pillX = W/2 - pillW/2, pillY = cy + r + 278;
  ctx.fillStyle = '#161616';
  _cardRoundRect(ctx, pillX, pillY, pillW, pillH, 34);
  ctx.fill();
  ctx.strokeStyle = 'rgba(163,255,71,0.25)';
  ctx.lineWidth = 1.5;
  _cardRoundRect(ctx, pillX, pillY, pillW, pillH, 34);
  ctx.stroke();
  ctx.fillStyle = '#A3FF47';
  ctx.font = `700 28px ${F}`;
  ctx.fillText('iadigitall.github.io/Gastos', W/2, pillY + 44);

  return new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.95));
}

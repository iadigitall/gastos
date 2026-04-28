'use strict';

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const CATEGORIAS = {
  alimentacao: { icon: '🛒', label: 'Alimentação' },
  transporte:  { icon: '🚗', label: 'Transporte' },
  lazer:       { icon: '🎉', label: 'Lazer' },
  saude:       { icon: '🏥', label: 'Saúde' },
  outros:      { icon: '📦', label: 'Outros' },
};
const state = { mesAtual: '', gastos: {}, contas: {}, selectedCategory: 'alimentacao', pendingDeleteId: null, pendingDeleteType: null, firebaseOk: false };
let db = null, toastTimer = null, currentMonthListener = null;

document.addEventListener('DOMContentLoaded', () => {
  state.mesAtual = getCurrentMonthKey();
  updateHeaderMonth(); setupNavigation(); setupForms(); setupModals();
  initFirebase(); registerServiceWorker(); setupOnlineStatus();
  const shortcut = new URLSearchParams(location.search).get('shortcut');
  if (shortcut === 'add-expense') navigateTo('add-expense');
});

function initFirebase() {
  try {
    if (typeof firebase === 'undefined' || !firebase.apps.length) throw new Error('Firebase não inicializado');
    db = firebase.database(); state.firebaseOk = true;
    db.ref('.info/connected').on('value', snap => {
      document.getElementById('offline-banner').classList.toggle('hidden', snap.val() === true);
    });
    subscribeToMonth(state.mesAtual);
  } catch (err) {
    console.warn('Firebase:', err.message);
    state.firebaseOk = false; loadFromLocalStorage(); showSetupMessage(); renderAll();
  }
}

function showSetupMessage() {
  const dashboard = document.querySelector('#view-home .view-content');
  if (document.getElementById('setup-msg')) return;
  const card = document.createElement('div');
  card.id = 'setup-msg'; card.className = 'setup-card';
  card.innerHTML = `<h3>⚙️ Configure o Firebase para sincronizar</h3><p>Abra <code>firebase-config.js</code> e preencha com os dados do seu projeto Firebase.</p><p>Enquanto isso o app funciona <strong>só neste aparelho</strong>.</p>`;
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
  }, err => { console.error(err); showToast('❌ Erro ao carregar dados'); });
}

function saveToLocalStorage() {
  try { localStorage.setItem(`nd_${state.mesAtual}`, JSON.stringify({ gastos: state.gastos, contas: state.contas })); } catch(_) {}
}
function loadFromLocalStorage() {
  try { const d = JSON.parse(localStorage.getItem(`nd_${state.mesAtual}`) || '{}'); state.gastos = d.gastos||{}; state.contas = d.contas||{}; } catch(_) {}
}

function getCurrentMonthKey() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function todayStr() { return new Date().toISOString().split('T')[0]; }
function formatCurrency(val) { return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(val)||0); }
function formatDate(str) { if(!str)return''; const[y,m,d]=str.split('-'); return`${d}/${m}/${y}`; }
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function genId() { return`${Date.now()}_${Math.random().toString(36).slice(2,7)}`; }
function renderAll() { renderDashboard(); renderBills(); renderHistory(); }

function updateHeaderMonth() {
  const d=new Date();
  document.getElementById('header-month').textContent=`${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

function renderDashboard() {
  const gastos=Object.values(state.gastos), contas=Object.values(state.contas);
  const totalGastos=gastos.reduce((s,g)=>s+(g.valor||0),0);
  const totalContas=contas.reduce((s,c)=>s+(c.valor||0),0);
  const totalPago=contas.filter(c=>c.paga).reduce((s,c)=>s+(c.valor||0),0);
  const totalPendente=contas.filter(c=>!c.paga).reduce((s,c)=>s+(c.valor||0),0);
  const saldoDevedor=totalGastos+totalPendente;
  const totalGeral=totalGastos+totalContas;
  const pct=totalGeral>0?Math.min(100,Math.round((totalPago/totalGeral)*100)):0;
  document.getElementById('total-debt').textContent=formatCurrency(saldoDevedor);
  document.getElementById('paid-amount').textContent=formatCurrency(totalPago);
  document.getElementById('total-amount').textContent=formatCurrency(totalGeral);
  document.getElementById('progress-bar').style.width=`${pct}%`;
  document.getElementById('progress-percent').textContent=pct;
  document.getElementById('stat-expenses').textContent=formatCurrency(totalGastos);
  document.getElementById('stat-pending').textContent=formatCurrency(totalPendente);
  document.getElementById('debt-card').classList.toggle('zeroed',saldoDevedor===0&&totalGeral>0);
}

function setupForms() {
  document.querySelectorAll('.category-btn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); state.selectedCategory=btn.dataset.cat;
  }));
  document.getElementById('form-expense').addEventListener('submit',handleAddExpense);
  document.getElementById('form-bill').addEventListener('submit',handleAddBill);
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
  if(!desc) return showToast('❗ Escreve o que foi gasto');
  if(!value||value<=0) return showToast('❗ Coloca o valor certinho');
  if(!date) return showToast('❗ Escolhe a data');
  const btn=document.getElementById('btn-submit-expense'); btn.disabled=true; btn.textContent='Salvando...';
  const entry={descricao:desc,valor:value,categoria:state.selectedCategory,data:date,criadoEm:Date.now()};
  try {
    if(db) { await db.ref(`meses/${state.mesAtual}/gastos`).push(entry); }
    else { state.gastos[genId()]=entry; saveToLocalStorage(); renderAll(); }
    showToast('✅ Gasto adicionado!'); navigateTo('home'); resetExpenseForm();
  } catch(err) { showToast('❌ Erro ao salvar. Tente de novo.'); }
  finally { btn.disabled=false; btn.textContent='✅ Confirmar Gasto'; }
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
      showToast('🗑️ Gasto removido');
    } else {
      if(db) await db.ref(`meses/${state.mesAtual}/contas/${id}`).remove();
      else { delete state.contas[id]; saveToLocalStorage(); renderAll(); }
      showToast('🗑️ Conta removida');
    }
  } catch(err) { showToast('❌ Erro ao apagar'); }
  state.pendingDeleteId=null; state.pendingDeleteType=null;
}

function renderBills() {
  const container=document.getElementById('bills-list');
  const entries=Object.entries(state.contas), today=todayStr();
  if(!entries.length){container.innerHTML=`<div class="empty-state"><span class="empty-icon">📭</span><p>Nenhuma conta cadastrada</p><p class="empty-sub">Toque no ➕ para adicionar</p></div>`;return;}
  entries.sort(([,a],[,b])=>{if(a.paga!==b.paga)return a.paga?1:-1;return(a.vencimento||'9999').localeCompare(b.vencimento||'9999');});
  container.innerHTML=`<div class="bills-list-inner">${entries.map(([id,c])=>{
    const overdue=!c.paga&&c.vencimento&&c.vencimento<today;
    const meta=c.vencimento?`${overdue?'⚠️ Venceu em: ':'Vence em: '}${formatDate(c.vencimento)}`:'Sem data de vencimento';
    return`<div class="bill-item${c.paga?' paid':''}" id="bill-${escHtml(id)}"><div class="bill-info"><div class="bill-name">${escHtml(c.nome)}</div><div class="bill-meta${overdue?' overdue':''}">${meta}</div></div><div class="bill-value">${formatCurrency(c.valor)}</div>${c.paga?`<button class="btn-pay done" disabled>✅ Pago</button>`:`<button class="btn-pay" onclick="payBill('${escHtml(id)}')">Pagar</button>`}${!c.paga?`<button class="btn-delete-bill" onclick="confirmDeleteBill('${escHtml(id)}','${escHtml(c.nome)}')">🗑️</button>`:''}</div>`;
  }).join('')}</div>`;
}

async function payBill(id) {
  const btn=document.querySelector(`#bill-${CSS.escape(id)} .btn-pay`);
  if(btn){btn.textContent='✅';btn.classList.add('pay-anim','done');btn.disabled=true;}
  try {
    if(db) await db.ref(`meses/${state.mesAtual}/contas/${id}`).update({paga:true,pagaEm:Date.now()});
    else{if(state.contas[id]){state.contas[id].paga=true;state.contas[id].pagaEm=Date.now();}saveToLocalStorage();renderAll();}
    showToast('🎉 Conta marcada como paga!');
  } catch(err){showToast('❌ Erro ao marcar como paga');if(btn){btn.textContent='Pagar';btn.classList.remove('pay-anim','done');btn.disabled=false;}}
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
  if(!nome) return showToast('❗ Dá um nome pra conta');
  if(!value||value<=0) return showToast('❗ Coloca o valor certinho');
  const entry={nome,valor:value,vencimento:due||null,paga:false,pagaEm:null,criadoEm:Date.now()};
  try {
    if(db) await db.ref(`meses/${state.mesAtual}/contas`).push(entry);
    else{state.contas[genId()]=entry;saveToLocalStorage();renderAll();}
    closeModal('modal-add-bill'); document.getElementById('form-bill').reset(); showToast('✅ Conta adicionada!');
  } catch(err){showToast('❌ Erro ao salvar.');}
}

function renderHistory() {
  const container=document.getElementById('history-list');
  const entries=Object.entries(state.gastos);
  if(!entries.length){container.innerHTML=`<div class="empty-state"><span class="empty-icon">📭</span><p>Nenhum gasto lançado</p><p class="empty-sub">Use o botão ➕ para adicionar</p></div>`;return;}
  entries.sort(([,a],[,b])=>(b.criadoEm||0)-(a.criadoEm||0));
  container.innerHTML=`<div class="history-inner">${entries.map(([id,g])=>{
    const cat=CATEGORIAS[g.categoria]||CATEGORIAS.outros;
    return`<div class="history-item"><span class="history-cat-icon">${cat.icon}</span><div class="history-info"><div class="history-desc">${escHtml(g.descricao)}</div><div class="history-meta">${cat.label} · ${formatDate(g.data)}</div></div><div class="history-value">${formatCurrency(g.valor)}</div><button class="btn-delete-expense" onclick="confirmDeleteExpense('${escHtml(id)}','${escHtml(g.descricao)}')">🗑️</button></div>`;
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
    state.gastos={};state.contas={};closeModal('modal-close-month');showToast('🎉 Mês fechado!');navigateTo('home');renderAll();
  } catch(err){showToast('❌ Erro ao fechar o mês');}
}

async function loadPastMonths() {
  const container=document.getElementById('past-months-list');
  container.innerHTML=`<div class="empty-state"><div class="spinner"></div><p>Carregando...</p></div>`;
  try {
    let data=null;
    if(db){const snap=await db.ref('historico').once('value');data=snap.val();}
    else{data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('nd_hist_')){try{data[k.replace('nd_hist_','')]=JSON.parse(localStorage.getItem(k));}catch(_){}}};if(!Object.keys(data).length)data=null;}
    if(!data){container.innerHTML=`<div class="empty-state"><span class="empty-icon">📅</span><p>Nenhum mês fechado ainda</p></div>`;return;}
    const months=Object.entries(data).sort(([a],[b])=>b.localeCompare(a));
    container.innerHTML=`<div class="past-months-inner">${months.map(([key,d])=>{
      const[y,m]=key.split('-'),nomeMes=MESES[parseInt(m)-1];
      return`<div class="past-month-card"><div class="past-month-title">${nomeMes} de ${y}</div><div class="past-month-grid"><div class="past-stat"><div class="past-stat-label">🛍️ Gastos</div><div class="past-stat-value" style="color:var(--danger)">${formatCurrency(d.totalGastos)}</div></div><div class="past-stat"><div class="past-stat-label">📋 Contas</div><div class="past-stat-value" style="color:var(--bills-color)">${formatCurrency(d.totalContas)}</div></div><div class="past-stat"><div class="past-stat-label">✅ Pago</div><div class="past-stat-value" style="color:var(--success)">${formatCurrency(d.totalPago)}</div></div><div class="past-stat"><div class="past-stat-label">📊 Total</div><div class="past-stat-value" style="color:var(--primary)">${formatCurrency((d.totalGastos||0)+(d.totalContas||0))}</div></div></div></div>`;
    }).join('')}</div>`;
  } catch(err){container.innerHTML=`<div class="empty-state"><span class="empty-icon">⚠️</span><p>Erro ao carregar</p></div>`;}
}

function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn=>btn.addEventListener('click',()=>navigateTo(btn.dataset.view)));
  on('btn-back-expense','click',()=>navigateTo('home')); on('btn-back-bills','click',()=>navigateTo('home'));
  on('btn-back-history','click',()=>navigateTo('home')); on('btn-back-past','click',()=>navigateTo('home'));
  on('btn-add-expense','click',()=>navigateTo('add-expense')); on('btn-go-bills','click',()=>navigateTo('bills'));
  on('btn-close-month','click',openCloseMonthModal);
  on('btn-history-months','click',()=>{loadPastMonths();navigateTo('past-months');});
}

function navigateTo(viewName) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===viewName));
  const view=document.getElementById(`view-${viewName}`); if(view)view.classList.add('active');
  document.getElementById('bottom-nav').style.display=['past-months'].includes(viewName)?'none':'';
  if(viewName==='add-expense')resetExpenseForm();
}

function setupModals() {
  on('btn-add-bill','click',()=>{document.getElementById('form-bill').reset();document.getElementById('bill-due').value=todayStr();openModal('modal-add-bill');setTimeout(()=>document.getElementById('bill-name').focus(),300);});
  on('btn-confirm-close','click',handleCloseMonth); on('btn-confirm-delete','click',executeDelete);
  document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.close)));
}
function openModal(id){document.getElementById(id).classList.remove('hidden');}
function closeModal(id){document.getElementById(id).classList.add('hidden');}

function showToast(msg,duration=2600){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.remove('hidden');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.add('hidden'),duration);
}
function setupOnlineStatus(){window.addEventListener('online',()=>showToast('✅ Conexão restaurada'));window.addEventListener('offline',()=>showToast('📵 Sem conexão'));}
function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});}
function on(id,ev,fn){const el=document.getElementById(id);if(el)el.addEventListener(ev,fn);}
window.payBill=payBill; window.confirmDeleteExpense=confirmDeleteExpense; window.confirmDeleteBill=confirmDeleteBill;

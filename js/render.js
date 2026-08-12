import { state, subscribe } from './state.js';
import { renderDashboard } from './views/dashboard.js';
import { renderIncomeExpenses } from './views/incomeExpenses.js';
import { renderInvestments } from './views/investments.js';
import { renderWatchlist } from './views/watchlist.js';

const TAB_PANELS = {
  dashboard: document.getElementById('panel-dashboard'),
  incomeExpenses: document.getElementById('panel-incomeExpenses'),
  investments: document.getElementById('panel-investments'),
  watchlist: document.getElementById('panel-watchlist'),
};

const TAB_RENDERERS = {
  dashboard: renderDashboard,
  incomeExpenses: renderIncomeExpenses,
  investments: renderInvestments,
  watchlist: renderWatchlist,
};

const navButtons = document.querySelectorAll('.tab-btn');

export function render() {
  const activeTab = state.ui.activeTab;

  Object.entries(TAB_PANELS).forEach(([tab, panel]) => {
    panel.hidden = tab !== activeTab;
  });

  navButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.tab === activeTab);
  });

  TAB_RENDERERS[activeTab](TAB_PANELS[activeTab], state);
}

subscribe(render);

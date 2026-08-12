import {
  setActiveTab,
  addIncome,
  deleteIncome,
  addExpense,
  deleteExpense,
  setExpenseCategoryFilter,
} from './state.js';
import { render } from './render.js';

const DELETE_ACTIONS = {
  'delete-income': deleteIncome,
  'delete-expense': deleteExpense,
};

const ADD_ACTIONS = {
  'add-income': (data) =>
    addIncome({
      source: data.get('source').trim(),
      amount: Number(data.get('amount')),
      date: data.get('date'),
    }),
  'add-expense': (data) =>
    addExpense({
      category: data.get('category'),
      amount: Number(data.get('amount')),
      date: data.get('date'),
      note: (data.get('note') || '').trim(),
    }),
};

document.addEventListener('click', (event) => {
  const tabBtn = event.target.closest('[data-tab]');
  if (tabBtn) {
    setActiveTab(tabBtn.dataset.tab);
    return;
  }

  const actionBtn = event.target.closest('[data-action]');
  if (actionBtn && DELETE_ACTIONS[actionBtn.dataset.action]) {
    DELETE_ACTIONS[actionBtn.dataset.action](actionBtn.dataset.id);
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-action]');
  if (form && ADD_ACTIONS[form.dataset.action]) {
    event.preventDefault();
    ADD_ACTIONS[form.dataset.action](new FormData(form));
    form.reset();
  }
});

document.addEventListener('change', (event) => {
  const filterSelect = event.target.closest('[data-action="filter-expense-category"]');
  if (filterSelect) {
    setExpenseCategoryFilter(filterSelect.value);
  }
});

render();

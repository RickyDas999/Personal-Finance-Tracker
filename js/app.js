import { setActiveTab, addIncome, deleteIncome } from './state.js';
import { render } from './render.js';

const DELETE_ACTIONS = {
  'delete-income': deleteIncome,
};

const ADD_ACTIONS = {
  'add-income': (data) =>
    addIncome({
      source: data.get('source').trim(),
      amount: Number(data.get('amount')),
      date: data.get('date'),
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

render();

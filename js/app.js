import { setActiveTab } from './state.js';
import { render } from './render.js';

document.addEventListener('click', (event) => {
  const tabBtn = event.target.closest('[data-tab]');
  if (tabBtn) {
    setActiveTab(tabBtn.dataset.tab);
  }
});

render();

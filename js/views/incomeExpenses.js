import { escapeHTML, formatINR, formatDate } from '../format.js';

function renderIncomeList(income) {
  if (income.length === 0) {
    return '<p class="empty-state">No income recorded yet.</p>';
  }

  const rows = [...income]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (item) => `
        <li class="list-row">
          <div>
            <strong>${escapeHTML(item.source)}</strong>
            <div class="text-muted">${formatDate(item.date)}</div>
          </div>
          <div class="form-row">
            <span>${formatINR(item.amount)}</span>
            <button type="button" class="btn btn-danger" data-action="delete-income" data-id="${escapeHTML(item.id)}">Delete</button>
          </div>
        </li>
      `
    )
    .join('');

  return `<ul class="list">${rows}</ul>`;
}

export function renderIncomeExpenses(panel, state) {
  panel.innerHTML = `
    <h2>Income &amp; Expenses</h2>

    <section class="card" aria-labelledby="income-heading">
      <h3 id="income-heading">Income</h3>
      <form data-action="add-income" class="form-row">
        <div class="field">
          <label for="income-source">Source</label>
          <input id="income-source" name="source" type="text" required maxlength="60" />
        </div>
        <div class="field">
          <label for="income-amount">Amount (₹)</label>
          <input id="income-amount" name="amount" type="number" min="0" step="1" required />
        </div>
        <div class="field">
          <label for="income-date">Date</label>
          <input id="income-date" name="date" type="date" required />
        </div>
        <button type="submit" class="btn btn-primary">Add income</button>
      </form>

      ${renderIncomeList(state.income)}
    </section>

    <section class="card section-gap" aria-labelledby="expenses-heading">
      <h3 id="expenses-heading">Expenses</h3>
      <p class="empty-state">Expense tracking coming soon.</p>
    </section>
  `;
}

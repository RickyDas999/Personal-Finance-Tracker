import { escapeHTML, formatINR, formatDate } from '../format.js';
import { loanOutstandingBalance, fdCurrentValue } from '../calculations.js';

function renderLoanList(loans) {
  if (loans.length === 0) {
    return '<p class="empty-state">No loans added yet.</p>';
  }

  const rows = loans
    .map(
      (loan) => `
        <li class="list-row">
          <div>
            <strong>${escapeHTML(loan.name)}</strong>
            <div class="text-muted">EMI ${formatINR(loan.emi)} &middot; ${escapeHTML(loan.ratePct)}% p.a. &middot; ${escapeHTML(loan.monthsLeft)} months left</div>
          </div>
          <div class="form-row">
            <span>Outstanding: ${formatINR(loanOutstandingBalance(loan))}</span>
            <button type="button" class="btn btn-danger" data-action="delete-loan" data-id="${escapeHTML(loan.id)}">Delete</button>
          </div>
        </li>
      `
    )
    .join('');

  return `<ul class="list">${rows}</ul>`;
}

function renderFdList(fds) {
  if (fds.length === 0) {
    return '<p class="empty-state">No FDs added yet.</p>';
  }

  const rows = fds
    .map(
      (fd) => `
        <li class="list-row">
          <div>
            <strong>${escapeHTML(fd.name)}</strong>
            <div class="text-muted">Principal ${formatINR(fd.principal)} &middot; ${escapeHTML(fd.ratePct)}% p.a. &middot; ${formatDate(fd.startDate)} to ${formatDate(fd.maturityDate)}</div>
          </div>
          <div class="form-row">
            <span title="Simple-interest estimate, not compounded">Current value (est.): ${formatINR(fdCurrentValue(fd))}</span>
            <button type="button" class="btn btn-danger" data-action="delete-fd" data-id="${escapeHTML(fd.id)}">Delete</button>
          </div>
        </li>
      `
    )
    .join('');

  return `<ul class="list">${rows}</ul>`;
}

export function renderInvestments(panel, state) {
  panel.innerHTML = `
    <h2>Investments</h2>

    <section class="card" aria-labelledby="loans-heading">
      <h3 id="loans-heading">Loans</h3>
      <form data-action="add-loan" class="form-row">
        <div class="field">
          <label for="loan-name">Name</label>
          <input id="loan-name" name="name" type="text" required maxlength="60" />
        </div>
        <div class="field">
          <label for="loan-emi">EMI (₹)</label>
          <input id="loan-emi" name="emi" type="number" min="0" step="1" required />
        </div>
        <div class="field">
          <label for="loan-rate">Rate (% p.a.)</label>
          <input id="loan-rate" name="ratePct" type="number" min="0" step="0.01" required />
        </div>
        <div class="field">
          <label for="loan-months">Months left</label>
          <input id="loan-months" name="monthsLeft" type="number" min="0" step="1" required />
        </div>
        <button type="submit" class="btn btn-primary">Add loan</button>
      </form>

      ${renderLoanList(state.loans)}
    </section>

    <section class="card section-gap" aria-labelledby="fds-heading">
      <h3 id="fds-heading">Fixed Deposits</h3>
      <p class="text-muted">Current value is a simple-interest estimate from the principal, rate, and dates you enter &mdash; not a bank-quoted figure.</p>
      <form data-action="add-fd" class="form-row">
        <div class="field">
          <label for="fd-name">Name</label>
          <input id="fd-name" name="name" type="text" required maxlength="60" />
        </div>
        <div class="field">
          <label for="fd-principal">Principal (₹)</label>
          <input id="fd-principal" name="principal" type="number" min="0" step="1" required />
        </div>
        <div class="field">
          <label for="fd-rate">Rate (% p.a.)</label>
          <input id="fd-rate" name="ratePct" type="number" min="0" step="0.01" required />
        </div>
        <div class="field">
          <label for="fd-start">Start date</label>
          <input id="fd-start" name="startDate" type="date" required />
        </div>
        <div class="field">
          <label for="fd-maturity">Maturity date</label>
          <input id="fd-maturity" name="maturityDate" type="date" required />
        </div>
        <button type="submit" class="btn btn-primary">Add FD</button>
      </form>

      ${renderFdList(state.fds)}
    </section>

    <section class="card section-gap" aria-labelledby="sips-heading">
      <h3 id="sips-heading">SIPs</h3>
      <p class="empty-state">SIP tracking coming soon.</p>
    </section>

    <section class="card section-gap" aria-labelledby="stocks-heading">
      <h3 id="stocks-heading">My Stocks</h3>
      <p class="empty-state">Stock holdings coming soon.</p>
    </section>
  `;
}

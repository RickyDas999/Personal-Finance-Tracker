export function loanOutstandingBalance(loan) {
  const emi = Number(loan.emi) || 0;
  const monthsLeft = Number(loan.monthsLeft) || 0;
  const monthlyRate = (Number(loan.ratePct) || 0) / 100 / 12;

  if (monthsLeft <= 0) return 0;
  if (monthlyRate === 0) return emi * monthsLeft;

  return (emi * (1 - Math.pow(1 + monthlyRate, -monthsLeft))) / monthlyRate;
}

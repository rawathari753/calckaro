// EMI Calculation Utility
// Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
// P = Loan Amount, R = Monthly Interest Rate, N = Number of Months

export function calculateEMI({ loanAmount, interestRate, tenure, tenureType }) {
  // Convert tenure to months if needed
  const n = tenureType === 'years' ? tenure * 12 : tenure;
  const r = interestRate / 12 / 100; // Monthly interest rate
  // EMI formula
  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;
  return {
    'Monthly EMI': emi ? emi.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0,
    'Total Interest': totalInterest ? totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0,
    'Total Payment': totalPayment ? totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0,
  };
}

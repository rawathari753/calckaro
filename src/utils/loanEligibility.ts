// Loan Eligibility Calculation Utility
// Assumption: Max EMI allowed = 50% of net monthly income
// Formula: Eligible EMI = (Monthly Salary - Existing EMIs) * 0.5
// Eligible Loan = [Eligible EMI * {(1+R)^N - 1}] / [R * (1+R)^N]
// R = monthly interest rate, N = tenure in months

interface LoanEligibilityInput {
  monthlySalary: number;
  existingEmis: number;
  interestRate: number;
  tenure: number;
}

export function calculateLoanEligibility({ monthlySalary, existingEmis, interestRate, tenure }: LoanEligibilityInput): Record<string, string | number> {
  const maxEmi = (monthlySalary - existingEmis) * 0.5;
  const r = interestRate / 12 / 100;
  const n = tenure;
  // Reverse EMI formula to get eligible loan
  const numerator = maxEmi * (Math.pow(1 + r, n) - 1);
  const denominator = r * Math.pow(1 + r, n);
  const eligibleLoan = denominator !== 0 ? numerator / denominator : 0;
  return {
    'Eligible Loan Amount': eligibleLoan > 0 ? eligibleLoan.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0,
  };
}

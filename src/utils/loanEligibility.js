// Loan Eligibility Calculation Utility
// FOIR (Fixed Obligation to Income Ratio) = 50%
// Eligible EMI = (Monthly Salary * 0.5) - Existing EMIs
// Shows estimated max loan at standard rates for common tenures

function reversePMT(emi, annualRate, months) {
  if (annualRate === 0) return emi * months;
  const r = annualRate / 12 / 100;
  return (emi * (Math.pow(1 + r, months) - 1)) / (r * Math.pow(1 + r, months));
}

export function calculateLoanEligibility({ monthlySalary, existingEmis, monthlyExpenses }) {
  const disposable = monthlySalary - (monthlyExpenses || 0);
  const eligibleEmi = disposable * 0.5 - (existingEmis || 0);

  if (eligibleEmi <= 0) {
    return {
      'Max Eligible EMI': '₹0 — obligations exceed 50% of salary',
    };
  }

  const fmt = (n) => '₹' + Math.max(0, Math.round(n)).toLocaleString('en-IN');

  return {
    'Max Eligible EMI': fmt(eligibleEmi),
    'Est. Loan (10 yrs @ 8.5%)': fmt(reversePMT(eligibleEmi, 8.5, 120)),
    'Est. Loan (15 yrs @ 8.5%)': fmt(reversePMT(eligibleEmi, 8.5, 180)),
    'Est. Loan (20 yrs @ 8.5%)': fmt(reversePMT(eligibleEmi, 8.5, 240)),
  };
}

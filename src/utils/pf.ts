// PF Calculation Utility
// Formula: PF = (Employee + Employer contribution) * years + interest
// Interest is compounded yearly

interface PfInput {
  basicSalary: number;
  employeePercent: number;
  employerPercent: number;
  interestRate: number;
  years: number;
}

export function calculatePF({ basicSalary, employeePercent, employerPercent, interestRate, years }: PfInput): Record<string, string | number> {
  const empCont = basicSalary * (employeePercent / 100);
  const emprCont = basicSalary * (employerPercent / 100);
  let total = 0;
  let interest = 0;
  const yearly = empCont + emprCont;
  for (let i = 1; i <= years; i++) {
    total += yearly;
    // Interest for the year on opening balance
    interest += (total * interestRate) / 100;
    total += (total * interestRate) / 100;
  }
  return {
    'Total PF accumulated': total.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    'Total interest earned': interest.toLocaleString(undefined, { maximumFractionDigits: 2 }),
  };
}

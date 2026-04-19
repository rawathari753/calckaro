import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { calculateLoanEligibility } from '../utils/loanEligibility';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const LoanEligibilityCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlySalary: '',
    existingEmis: '',
    monthlyExpenses: '',
  });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!inputs.monthlySalary || isNaN(inputs.monthlySalary) || Number(inputs.monthlySalary) <= 0) {
      errs.monthlySalary = 'Enter a valid monthly salary';
    }
    if (inputs.existingEmis && (isNaN(inputs.existingEmis) || Number(inputs.existingEmis) < 0)) {
      errs.existingEmis = 'Enter a valid EMI amount';
    }
    if (inputs.monthlyExpenses && (isNaN(inputs.monthlyExpenses) || Number(inputs.monthlyExpenses) < 0)) {
      errs.monthlyExpenses = 'Enter valid monthly expenses';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const res = calculateLoanEligibility({
        monthlySalary: Number(inputs.monthlySalary),
        existingEmis: Number(inputs.existingEmis) || 0,
        monthlyExpenses: Number(inputs.monthlyExpenses) || 0,
      });
      setResults(res);
    } else {
      setResults(null);
    }
  };

  const handleReset = () => {
    setInputs({ monthlySalary: '', existingEmis: '', monthlyExpenses: '' });
    setErrors({});
    setResults(null);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, width: '100%', boxSizing: 'border-box' }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={0.5}
        textAlign="center"
        sx={{ fontSize: { xs: 20, sm: 30 }, letterSpacing: 0.5 }}
      >
        Loan Eligibility
      </Typography>
      <Typography
        variant="body2"
        textAlign="center"
        mb={3}
        sx={{ color: 'text.secondary', fontSize: { xs: 13, sm: 14 } }}
      >
        Based on 50% FOIR — estimates shown at 8.5% p.a.
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1.5 } }}
      >
        <InputField
          label="Monthly Net Salary (₹)"
          name="monthlySalary"
          type="number"
          value={inputs.monthlySalary}
          onChange={handleChange}
          error={errors.monthlySalary}
          min={0}
          sx={{
            '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
            '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
          }}
        />
        <InputField
          label="Existing EMIs per month (₹) — optional"
          name="existingEmis"
          type="number"
          value={inputs.existingEmis}
          onChange={handleChange}
          error={errors.existingEmis}
          min={0}
          sx={{
            '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
            '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
          }}
        />
        <InputField
          label="Monthly Expenses (₹) — optional"
          name="monthlyExpenses"
          type="number"
          value={inputs.monthlyExpenses}
          onChange={handleChange}
          error={errors.monthlyExpenses}
          min={0}
          sx={{
            '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
            '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
          }}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={2} sx={{ width: '100%' }}>
          <Button
            type="submit"
            sx={{ flex: 1, minWidth: 120, mb: { xs: 1, sm: 0 }, py: 1.2, fontSize: { xs: 15, sm: 17 }, borderRadius: 2 }}
          >
            Check Eligibility
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            color="secondary"
            sx={{ flex: 1, minWidth: 120, py: 1.2, fontSize: { xs: 15, sm: 17 }, borderRadius: 2 }}
          >
            Reset
          </Button>
        </Stack>
      </Box>
      {results && (
        <Box sx={{ mt: { xs: 3, sm: 4 } }}>
          <ResultCard title="Your Loan Eligibility" results={results} />
        </Box>
      )}
    </Box>
  );
};

export default LoanEligibilityCalculator;


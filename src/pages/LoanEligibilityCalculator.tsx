// Converted from LoanEligibilityCalculator.jsx to .tsx
import * as React from 'react';
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { calculateLoanEligibility } from '../utils/loanEligibility.ts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const LoanEligibilityCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    monthlySalary: '',
    existingEmis: '',
    interestRate: '',
    tenure: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [results, setResults] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs: any = {};
    if (!inputs.monthlySalary || isNaN(Number(inputs.monthlySalary)) || Number(inputs.monthlySalary) <= 0) {
      errs.monthlySalary = 'Enter a valid salary';
    }
    if (inputs.existingEmis && (isNaN(Number(inputs.existingEmis)) || Number(inputs.existingEmis) < 0)) {
      errs.existingEmis = 'Enter a valid EMI';
    }
    if (!inputs.interestRate || isNaN(Number(inputs.interestRate)) || Number(inputs.interestRate) <= 0) {
      errs.interestRate = 'Enter a valid interest rate';
    }
    if (!inputs.tenure || isNaN(Number(inputs.tenure)) || Number(inputs.tenure) <= 0) {
      errs.tenure = 'Enter a valid tenure';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const res = calculateLoanEligibility({
        monthlySalary: Number(inputs.monthlySalary),
        existingEmis: Number(inputs.existingEmis) || 0,
        interestRate: Number(inputs.interestRate),
        tenure: Number(inputs.tenure),
      });
      setResults(res);
    } else {
      setResults(null);
    }
  };

  const handleReset = () => {
    setInputs({ monthlySalary: '', existingEmis: '', interestRate: '', tenure: '' });
    setErrors({});
    setResults(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        ml: { xs: '-6px', sm: 0 },
      }}
    >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2.5,
            textAlign: 'center',
            fontSize: { xs: 20, sm: 32 },
            letterSpacing: 0.5,
          }}
        >
          Loan Eligibility Calculator
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1.5 } }}
        >
          <InputField
            label="Monthly Salary"
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
            label="Existing EMIs (monthly)"
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
            label="Interest Rate (%)"
            name="interestRate"
            type="number"
            value={inputs.interestRate}
            onChange={handleChange}
            error={errors.interestRate}
            min={0}
            step={0.01}
            sx={{
              '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
              '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
            }}
          />
          <InputField
            label="Tenure (months)"
            name="tenure"
            type="number"
            value={inputs.tenure}
            onChange={handleChange}
            error={errors.tenure}
            min={0}
            sx={{
              '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
              '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
            }}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ width: '100%', mt: 2 }}
          >
            <Button
              type="submit"
              sx={{
                flex: 1,
                minWidth: 120,
                mb: { xs: 1, sm: 0 },
                py: 1.2,
                fontSize: { xs: 15, sm: 17 },
                borderRadius: 2,
              }}
            >
              Calculate
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              color="secondary"
              sx={{
                flex: 1,
                minWidth: 120,
                py: 1.2,
                fontSize: { xs: 15, sm: 17 },
                borderRadius: 2,
              }}
            >
              Reset
            </Button>
          </Stack>
        </Box>
        {results && (
          <Box sx={{ mt: { xs: 3, sm: 4 } }}>
            <ResultCard title="Results" results={results} />
          </Box>
        )}
    </Box>
  );
};

export default LoanEligibilityCalculator;

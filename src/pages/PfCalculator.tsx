// Converted from PfCalculator.jsx to .tsx
import * as React from 'react';
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { calculatePF } from '../utils/pf.ts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const PfCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    basicSalary: '',
    employeePercent: '',
    employerPercent: '',
    interestRate: 8.1,
    years: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [results, setResults] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs: any = {};
    if (!inputs.basicSalary || isNaN(Number(inputs.basicSalary)) || Number(inputs.basicSalary) <= 0) {
      errs.basicSalary = 'Enter a valid salary';
    }
    if (!inputs.employeePercent || isNaN(Number(inputs.employeePercent)) || Number(inputs.employeePercent) < 0) {
      errs.employeePercent = 'Enter a valid %';
    }
    if (!inputs.employerPercent || isNaN(Number(inputs.employerPercent)) || Number(inputs.employerPercent) < 0) {
      errs.employerPercent = 'Enter a valid %';
    }
    if (!inputs.interestRate || isNaN(Number(inputs.interestRate)) || Number(inputs.interestRate) < 0) {
      errs.interestRate = 'Enter a valid interest rate';
    }
    if (!inputs.years || isNaN(Number(inputs.years)) || Number(inputs.years) <= 0) {
      errs.years = 'Enter valid years';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const res = calculatePF({
        basicSalary: Number(inputs.basicSalary),
        employeePercent: Number(inputs.employeePercent),
        employerPercent: Number(inputs.employerPercent),
        interestRate: Number(inputs.interestRate),
        years: Number(inputs.years),
      });
      setResults(res);
    } else {
      setResults(null);
    }
  };

  const handleReset = () => {
    setInputs({ basicSalary: '', employeePercent: '', employerPercent: '', interestRate: 8.1, years: '' });
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
          PF Calculator
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 2 }, width: '100%' }}
        >
          <InputField
            label="Monthly Basic Salary"
            name="basicSalary"
            type="number"
            value={inputs.basicSalary}
            onChange={handleChange}
            error={errors.basicSalary}
            min={0}
            sx={{
              '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
              '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
            }}
          />
          <InputField
            label="Employee Contribution (%)"
            name="employeePercent"
            type="number"
            value={inputs.employeePercent}
            onChange={handleChange}
            error={errors.employeePercent}
            min={0}
            step={0.01}
            sx={{
              '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
              '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
            }}
          />
          <InputField
            label="Employer Contribution (%)"
            name="employerPercent"
            type="number"
            value={inputs.employerPercent}
            onChange={handleChange}
            error={errors.employerPercent}
            min={0}
            step={0.01}
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
            label="Years of Service"
            name="years"
            type="number"
            value={inputs.years}
            onChange={handleChange}
            error={errors.years}
            min={0}
            sx={{
              '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
              '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
            }}
          />
          <Box sx={{ height: { xs: 10, sm: 14 } }} />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ width: '100%', mt: 1 }}
          >
            <Button
              type="submit"
              sx={{
                flex: 1,
                minWidth: 120,
                mb: { xs: 1, sm: 0 },
                py: 1.1,
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
                py: 1.1,
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

export default PfCalculator;

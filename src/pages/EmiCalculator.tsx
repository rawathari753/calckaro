// Converted from EmiCalculator.jsx to .tsx
import * as React from 'react';
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import { calculateEMI } from '../utils/emi.ts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

const EmiCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    tenureType: 'years',
  });
  const [errors, setErrors] = useState<any>({});
  const [results, setResults] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setInputs((prev) => ({ ...prev, [name!]: value }));
  };

  const validate = () => {
    const errs: any = {};
    if (!inputs.loanAmount || isNaN(Number(inputs.loanAmount)) || Number(inputs.loanAmount) <= 0) {
      errs.loanAmount = 'Enter a valid loan amount';
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
      const res = calculateEMI({
        loanAmount: Number(inputs.loanAmount),
        interestRate: Number(inputs.interestRate),
        tenure: Number(inputs.tenure),
        tenureType: inputs.tenureType,
      });
      setResults(res);
    } else {
      setResults(null);
    }
  };

  const handleReset = () => {
    setInputs({ loanAmount: '', interestRate: '', tenure: '', tenureType: 'years' });
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
          EMI Calculator
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 2 }, width: '100%' }}
        >
          <InputField
            label="Loan Amount"
            name="loanAmount"
            type="number"
            value={inputs.loanAmount}
            onChange={handleChange}
            error={errors.loanAmount}
            min={0}
            sx={{
              '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
              '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
            }}
          />
          <InputField
            label="Interest Rate (annual %)"
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: '100%', alignItems: 'flex-end' }}>
            <InputField
              label="Loan Tenure"
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
            <InputField
              label="Tenure Type"
              name="tenureType"
              select
              value={inputs.tenureType}
              onChange={handleChange}
              error={''}
              sx={{
                '& .MuiInputBase-root': { fontSize: { xs: 15, sm: 18 }, height: { xs: 44, sm: 52 } },
                '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
              }}
              helperText="Choose whether tenure is in years or months"
              placeholder="Select tenure type"
            >
              <MenuItem value="years">Years</MenuItem>
              <MenuItem value="months">Months</MenuItem>
            </InputField>
          </Stack>
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

export default EmiCalculator;

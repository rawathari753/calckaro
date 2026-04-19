import * as React from 'react';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
  label: string;
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  select?: boolean;
  children?: React.ReactNode;
  sx?: any;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', value, onChange, name, placeholder, error, min, max, step, select, children, sx, helperText }) => {
  const inputProps = min !== undefined || max !== undefined || step !== undefined ? { min, max, step } : undefined;
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      error={!!error}
      helperText={error || helperText}
      {...(!select && inputProps ? { inputProps } : {})}
      variant="outlined"
      select={select}
      sx={{
        '& .MuiInputBase-root': {
          px: { xs: 1.3, sm: 1.7 },
          py: { xs: 0.7, sm: 1.1 },
          fontSize: { xs: 15, sm: 17 },
          borderRadius: 2.5,
          minHeight: { xs: 36, sm: 40 },
        },
        '& .MuiInputLabel-root': { fontSize: { xs: 14, sm: 16 } },
        ...sx,
      }}
    >
      {children}
    </TextField>
  );
};

export default InputField;

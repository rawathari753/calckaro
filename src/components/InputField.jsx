import React from 'react';
import TextField from '@mui/material/TextField';

/**
 * Reusable input field component with label and error message (MUI)
 */
const InputField = ({ label, type = 'text', value, onChange, name, placeholder, error, min, max, step, sx }) => (
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
    helperText={error}
    inputProps={{ min, max, step }}
    variant="outlined"
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
  />
);

export default InputField;

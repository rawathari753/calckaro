import React from 'react';
import MuiButton from '@mui/material/Button';

/**
 * Reusable button component (MUI)
 */
const Button = ({ children, onClick, type = 'button', className = '', ...props }) => (
  <MuiButton
    type={type}
    onClick={onClick}
    variant="contained"
    color={type === 'button' ? 'secondary' : 'primary'}
    sx={{
      mr: 1,
      px: { xs: 2.2, sm: 2.8 },
      py: { xs: 0.9, sm: 1.2 },
      fontSize: { xs: 15, sm: 17 },
      borderRadius: 2.5,
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </MuiButton>
);

export default Button;

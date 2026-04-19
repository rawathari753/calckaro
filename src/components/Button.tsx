import React from 'react';
import MuiButton from '@mui/material/Button';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit';
  sx?: any;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '', color, sx, ...props }) => (
  <MuiButton
    type={type}
    onClick={onClick}
    variant="contained"
    color={color || (type === 'button' ? 'secondary' : 'primary')}
    sx={{
      mr: 1,
      px: { xs: 2.2, sm: 2.8 },
      py: { xs: 0.9, sm: 1.2 },
      fontSize: { xs: 15, sm: 17 },
      borderRadius: 2.5,
      ...sx,
    }}
    {...props}
  >
    {children}
  </MuiButton>
);

export default Button;

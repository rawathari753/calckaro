import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import EmiCalculator from './pages/EmiCalculator';
import PfCalculator from './pages/PfCalculator';
import LoanEligibilityCalculator from './pages/LoanEligibilityCalculator';
import ChatBot from './components/ChatBot';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SavingsIcon from '@mui/icons-material/Savings';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navItems = [
    { label: 'EMI Calculator', to: '/emi' },
    { label: 'PF Calculator', to: '/pf' },
    { label: 'Loan Eligibility', to: '/loan-eligibility' },
  ];

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="primary" elevation={3} sx={{ background: 'linear-gradient(90deg, #1976d2 60%, #ec407a 100%)' }}>
          <Toolbar sx={{ minHeight: { xs: 48, sm: 64 }, px: { xs: 1, sm: 2 } }}>
            <SavingsIcon sx={{ mr: 1, fontSize: { xs: 26, sm: 32 } }} />
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{ flexGrow: 1, letterSpacing: 1, fontSize: { xs: 18, sm: 24 }, fontWeight: 700 }}
            >
              Calckaro
            </Typography>
            {isMobile ? (
              <IconButton color="inherit" edge="end" onClick={handleDrawerToggle} aria-label="menu">
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            ) : (
              navItems.map((item) => (
                <Button
                  key={item.to}
                  color="inherit"
                  component={Link}
                  to={item.to}
                  sx={{ fontWeight: 600, mx: 1, fontSize: 16 }}
                >
                  {item.label}
                </Button>
              ))
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
          slotProps={{ paper: { sx: { width: 220 } } }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={handleDrawerClose}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{ fontWeight: 600, fontSize: 16 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 }, width: '100%', boxSizing: 'border-box' }}>
          <Box sx={{ width: '100%', maxWidth: 520 }}>
            <Routes>
              <Route path="/emi" element={<EmiCalculator />} />
              <Route path="/pf" element={<PfCalculator />} />
              <Route path="/loan-eligibility" element={<LoanEligibilityCalculator />} />
              <Route path="*" element={<Navigate to="/emi" replace />} />
            </Routes>
          </Box>
        </Box>
        <Divider />
        <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'background.paper', color: 'text.secondary' }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Calckaro. All rights reserved.</Typography>
        </Box>
        <ChatBot />
      </Box>
    </Router>
  );
}

export default App;

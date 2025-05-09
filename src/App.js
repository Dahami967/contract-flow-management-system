import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigation from './components/Navigation';
import ProjectDetailsForm from './components/ProjectDetailsForm';
import ContractorSelectionForm from './components/ContractorSelectionForm';
import AdvancePaymentForm from './components/AdvancePaymentForm';
import BillPaymentsForm from './components/BillPaymentsForm';
import AdjustmentsForm from './components/AdjustmentsForm';
import Reports from './components/Reports';
import '@fontsource/poppins';
import '@fontsource/roboto';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Professional blue
      light: '#60a5fa',
      dark: '#1e40af',
    },
    secondary: {
      main: '#475569', // Slate color
      light: '#64748b',
      dark: '#334155',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#2563eb',
            '&:hover': {
              backgroundColor: '#1e40af',
            },
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          '& .MuiPickersCalendarHeader-label': {
            color: '#475569',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ 
            display: 'flex',
            minHeight: '100vh',
            bgcolor: 'background.default'
          }}>
            <Navigation />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: { xs: 2, sm: 3, md: 4 }, 
                mt: 8,
                overflow: 'auto'
              }}
            >
              <Routes>
                <Route path="/" element={<ProjectDetailsForm />} />
                <Route path="/contractor" element={<ContractorSelectionForm />} />
                <Route path="/advance-payment" element={<AdvancePaymentForm />} />
                <Route path="/bill-payments" element={<BillPaymentsForm />} />
                <Route path="/adjustments" element={<AdjustmentsForm />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;

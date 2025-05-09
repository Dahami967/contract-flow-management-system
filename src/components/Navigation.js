import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  ListItemButton,
  Box,
  Divider,
} from '@mui/material';
import {
  Description,
  Person,
  Payment,
  Receipt,
  Settings,
  Assessment,
  AccountBalance,
} from '@mui/icons-material';

const drawerWidth = 280;

const menuItems = [
  { text: 'Project Details', icon: <Description />, path: '/' },
  { text: 'Contractor Selection', icon: <Person />, path: '/contractor' },
  { text: 'Advance Payment', icon: <Payment />, path: '/advance-payment' },
  { text: 'Bill Payments', icon: <Receipt />, path: '/bill-payments' },
  { text: 'Adjustments', icon: <Settings />, path: '/adjustments' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
];

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            color="primary.main"
            sx={{ 
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            Contract Flow Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                {index > 0 && index % 3 === 0 && (
                  <Divider sx={{ my: 2 }} />
                )}
                <ListItem disablePadding>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      borderRadius: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.main',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      },
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 40,
                        color: location.pathname === item.path ? 'primary.main' : 'secondary.main'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{
                        fontSize: '0.95rem',
                        fontWeight: location.pathname === item.path ? 600 : 400
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navigation;
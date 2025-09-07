
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  Home as HomeIcon,
  AccountBalance as AccountsIcon,
  SwapHoriz as TransferIcon,
  Receipt as TransactionsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronRight as ChevronRightIcon,
  HelpOutline as HelpIcon
} from '@mui/icons-material';
import React from 'react';

const drawerWidth = 280;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Accounts', icon: <AccountsIcon />, path: '/accounts' },
  { text: 'Transfer', icon: <TransferIcon />, path: '/transfer' },
  { text: 'Transactions', icon: <TransactionsIcon />, path: '/transactions' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Help Center', icon: <HelpIcon />, path: '/help' },
];

interface SidebarProps {
  onLogout: () => void;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  userName?: string;
  userEmail?: string;
}

const LogoImg = styled('img')({
  height: 40,
  margin: '20px auto',
  display: 'block'
});

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    background: 'linear-gradient(to bottom, #2E86C1, #138D75)',
    color: '#FFFFFF',
    width: drawerWidth,
    borderRight: 'none',
  },
});


export const Sidebar = ({
  onLogout,
  mobileOpen,
  onDrawerToggle,
  userName = 'Vinamra Parashar'
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');

  // Update document title based on current route
  React.useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname) || menuItems[0];
    document.title = currentItem.text;
  }, [location.pathname]);

  const drawerContent = (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '16px 0',
    }}>
      {/* User Profile Section */}
      <Box sx={{
        padding: '24px 20px 16px',
        marginBottom: '8px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{
            width: 48,
            height: 48,
            bgcolor: '#4CAF50',
            marginBottom: '8px'
          }}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>{userName}</Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ padding: '16px 8px', flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={isSelected}
                onClick={isMobile ? onDrawerToggle : undefined}
                sx={{
                  margin: '4px 0',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                    minWidth: 40,
                  },
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9375rem',
                    fontWeight: isSelected ? 600 : 400,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.25rem',
                  },
                  '&:hover': {
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9375rem',
                    fontWeight: isSelected ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Section */}
      <Box sx={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: 'auto'
      }}>
        <Box sx={{ '& > * + *': { marginTop: '8px' } }}>
          <ListItemButton
            onClick={onLogout}
            sx={{
              margin: '4px 0',
              padding: '12px 24px',
              textDecoration: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              '& .MuiListItemIcon-root': {
                color: 'inherit',
                minWidth: 40,
              },
              '& .MuiListItemText-primary': {
                fontSize: '0.9375rem',
                fontWeight: 400,
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1.25rem',
              },
              '&:hover': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontSize: '0.9375rem',
                fontWeight: 400
              }}
            />
          </ListItemButton>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              display: 'block',
              mt: 1,
              fontSize: '14px'
            }}
          >
            v1.0.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <LogoImg src="/logo.webp" alt="Bank Logo" />
        {drawerContent}
      </StyledDrawer>
    </Box>
  );
};

export default Sidebar;

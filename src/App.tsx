import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, useMediaQuery, useTheme, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMemo, useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { SettingsPage } from './pages/SettingsPage';

// Create a mobile-first theme
const getTheme = () => {
  // First create a base theme with default values
  const baseTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        main: '#1a3a8f', // Standard Chartered blue
      },
      secondary: {
        main: '#ff671f', // Standard Chartered orange
      },
      background: {
        default: '#f5f7fa',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '1.8rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.3rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '0.875rem',
      },
    },
  });

  // Then enhance it with responsive styles
  return createTheme({
    ...baseTheme,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
            padding: '10px 20px',
            minWidth: '44px',
            minHeight: '44px',
            [baseTheme.breakpoints.down('sm')]: {
              width: '100%',
              margin: '4px 0',
            },
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.05)',
            '&:hover': {
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
            },
            [baseTheme.breakpoints.up('sm')]: {
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
              '&:hover': {
                boxShadow: '0 6px 24px 0 rgba(0,0,0,0.1)',
              },
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: '16px',
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
    },
  }, {
    // Override typography with responsive values
    typography: {
      h1: {
        [baseTheme.breakpoints.up('sm')]: {
          fontSize: '2.2rem',
        },
        [baseTheme.breakpoints.up('md')]: {
          fontSize: '2.5rem',
        },
      },
      h2: {
        [baseTheme.breakpoints.up('sm')]: {
          fontSize: '1.8rem',
        },
        [baseTheme.breakpoints.up('md')]: {
          fontSize: '2rem',
        },
      },
      h3: {
        [baseTheme.breakpoints.up('sm')]: {
          fontSize: '1.5rem',
        },
        [baseTheme.breakpoints.up('md')]: {
          fontSize: '1.75rem',
        },
      },
      body1: {
        [baseTheme.breakpoints.up('sm')]: {
          fontSize: '1rem',
        },
      },
    },
  });
};

const drawerWidth = 240;

const AppLayout = () => {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoginPage = location.pathname === '/login';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Close mobile drawer when route changes
    setMobileOpen(false);
  }, [location]);

  if (isLoginPage) {
    return <LoginPage />;
  }

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      <Sidebar
        onLogout={logout}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 0, sm: 0 },
          width: '100%',
          maxWidth: '100%',
          ml: { sm: `${drawerWidth}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(isMobile && {
            pt: 8, // Add padding for mobile header
          }),
        }}
      >
        {isMobile && isAuthenticated && (
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar,
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {location.pathname === '/' ? 'Home' :
                location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)}
            </Typography>
            <Box sx={{ width: 48 }} /> {/* Spacer for alignment */}
          </Box>
        )}

        <Box sx={{
          maxWidth: 1200,
          mx: 'auto',
          width: '100%',
          ...(isMobile && { mt: 2 })
        }}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute>
                  <MaintenancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer"
              element={
                <ProtectedRoute>
                  <MaintenancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <MaintenancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <MaintenancePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const theme = useMemo(() => getTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

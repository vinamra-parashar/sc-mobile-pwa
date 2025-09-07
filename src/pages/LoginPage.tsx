import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Box,
  Button,
  Typography,
  Alert,
  CssBaseline,
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 3,
          backgroundColor: 'black',
          color: 'white',
          maxWidth: 400,
          margin: '0 auto'
        }}
      >
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: '600', 
            mb: 4,
            textAlign: 'left',
            color: 'white'
          }}
        >
          Login to Mobile Banking
        </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <OutlinedInput
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px',
                    borderColor: '#A1887F',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#BCAAA4',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8D6E63',
                    borderWidth: '1px',
                  },
                  backgroundColor: '#D7CCC8',
                  color: '#3E2723',
                  '& .MuiInputBase-input::placeholder': {
                    color: '#8D6E63',
                    opacity: 1,
                  },
                  '& .MuiInputBase-input': {
                    color: '#3E2723',
                  },
                }} />
            </FormControl>

            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        color: '#8D6E63',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                required
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px',
                    borderColor: '#A1887F',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#BCAAA4',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8D6E63',
                    borderWidth: '1px',
                  },
                  backgroundColor: '#D7CCC8',
                  color: '#3E2723',
                  '& .MuiInputBase-input::placeholder': {
                    color: '#8D6E63',
                    opacity: 1,
                  },
                  '& .MuiInputBase-input': {
                    color: '#3E2723',
                  },
                }} />
            </FormControl>

            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Typography
                component={Link}
                to="/forgot-password"
                sx={{
                  color: '#81C784',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#A5D6A7',
                  },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#4CAF50',
                color: 'white',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#43A047',
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: '#388E3C',
                },
                '&:disabled': {
                  backgroundColor: '#A5D6A7',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

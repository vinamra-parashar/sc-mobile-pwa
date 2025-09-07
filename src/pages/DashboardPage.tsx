import { useAuth } from '../contexts/AuthContext';
import { Box, Typography } from '@mui/material';

export const DashboardPage = () => {
  const { user } = useAuth();
  const bannerImage = 'https://av.sc.com/in/content/images/in-scb-global-wealth-campaign-nav-banner.jpg';


  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <Box sx={{ 
      width: '100vw', 
      maxWidth: '100%',
      overflowX: 'hidden',
      margin: 0,
      padding: 0 
    }}>
      {/* Banner */}
      <Box sx={{ 
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
        <img
          src={bannerImage}
          alt="Global Wealth Campaign"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </Box>

      {/* Balance Section */}
      <Box
        sx={{
          backgroundColor: '#012a4a',
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Box sx={{ ml: 3 }}>
          <Typography variant="h6" sx={{ opacity: 0.8 }}>I Have</Typography>
        </Box>
        <Box sx={{ mr: 3, display: 'flex', alignItems: 'flex-end' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            <sup><span style={{ fontSize: '0.5em', marginRight: '1px' }}>INR</span></sup>
            {user?.balance?.toLocaleString('en-IN') || '0'}
          </Typography>
        </Box>
      </Box>

      {/* Account Balance Section */}
      <Box sx={{ width: '100%', p: 3, backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" color="textPrimary" sx={{ fontWeight: 500 }}>
              Smart Pay Savings Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.accountNumber || '23310972560'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right', color: 'success.main' }}>
              <sup style={{ fontSize: '0.6em', marginRight: '2px' }}>INR</sup>
              {user?.balance?.toLocaleString('en-IN') || '0'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* I Owe Section */}
      <Box
        sx={{
          backgroundColor: '#012a4a',
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Box sx={{ ml: 3 }}>
          <Typography variant="h6" sx={{ opacity: 0.8 }}>I Owe</Typography>
        </Box>
        <Box sx={{ mr: 3, display: 'flex', alignItems: 'flex-end' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            <sup><span style={{ fontSize: '0.5em', marginRight: '1px' }}>INR</span></sup>
            0.00
          </Typography>
        </Box>
      </Box>

      {/* Credit Card Account Section */}
      <Box sx={{ width: '100%', p: 3, backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" color="textPrimary" sx={{ fontWeight: 500 }}>
              Credit Card Account 6661
            </Typography>
            <Typography variant="body2" color="textSecondary">
              •••• 6661
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
              <sup style={{ fontSize: '0.6em', marginRight: '2px' }}>INR</sup>
              0.00
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;

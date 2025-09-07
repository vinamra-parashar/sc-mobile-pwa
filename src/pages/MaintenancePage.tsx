import { Box, Typography, Container, Paper } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

export const MaintenancePage = () => {
  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 8, 
          textAlign: 'center',
          borderRadius: 2
        }}
      >
        <Box sx={{ mb: 3 }}>
          <ConstructionIcon color="primary" sx={{ fontSize: 60 }} />
        </Box>
        <Typography variant="h5" component="h1" gutterBottom>
          Under Maintenance
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We're currently performing scheduled maintenance. Please check back later.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We apologize for any inconvenience this may cause.
        </Typography>
      </Paper>
    </Container>
  );
};

export default MaintenancePage;

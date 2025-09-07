import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../contexts/AuthContext';

export const SettingsPage = () => {
  const { user, updateUserBalance } = useAuth();
  const [balance, setBalance] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (user?.balance !== undefined) {
      setBalance(user.balance.toString());
    } else {
      setBalance('0');
    }
  }, [user]);

  const handleSave = () => {
    const newBalance = parseFloat(balance);
    if (isNaN(newBalance)) {
      setError('Please enter a valid number');
      return;
    }
    if (newBalance < 0) {
      setError('Balance cannot be negative');
      return;
    }
    
    try {
      updateUserBalance(newBalance);
      setSuccess('Balance updated successfully!');
      setError('');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update balance');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Account Settings
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Balance
          </Typography>
          
          {isEditing ? (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
              <TextField
                label="New Balance"
                variant="outlined"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                inputProps={{
                  min: 0,
                  step: '0.01'
                }}
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                  setBalance(user?.balance?.toString() || '0');
                }}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(user?.balance || 0)}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(true)}
              >
                Edit Balance
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default SettingsPage;

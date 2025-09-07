import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  ArrowUpward as IncomeIcon,
  ArrowDownward as ExpenseIcon,
} from '@mui/icons-material';

// Generate random transaction data
const generateTransactions = (count: number) => {
  const types = ['Grocery', 'Shopping', 'Transfer', 'Salary', 'Utilities', 'Dining'];
  const transactions = [];

  for (let i = 0; i < count; i++) {
    const amount = (Math.random() * 1000 + 10).toFixed(2);
    const isExpense = Math.random() > 0.5;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    transactions.push({
      id: i + 1,
      description: types[Math.floor(Math.random() * types.length)],
      amount: isExpense ? -Number(amount) : Number(amount),
      date: date.toISOString().split('T')[0],
      type: isExpense ? 'expense' : 'income'
    });
  }

  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const DashboardPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const bannerImage = 'https://av.sc.com/in/content/images/in-scb-global-wealth-campaign-nav-banner.jpg';
  const [balance] = useState(parseFloat((Math.random() * 10000 + 1000).toFixed(2)));

  useEffect(() => {
    // Simulate API call to fetch transactions
    const timer = setTimeout(() => {
      setTransactions(generateTransactions(10));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const totalIncome = transactions
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = Math.abs(transactions
    .filter(tx => tx.amount < 0)
    .reduce((sum, tx) => sum + tx.amount, 0));

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Banner */}
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
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
            {formatCurrency(200000).replace('$', '')}
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
              {formatCurrency(200000).replace('$', '')}
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

      {/* Main Content */}
      <Box sx={{ width: '100%', p: 3, visibility: 'hidden' }}>
        <Grid container spacing={2}>
          {/* Quick Stats */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <ExpenseIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Expenses</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(totalExpenses)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    This month
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recent Transactions
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  View All
                </Typography>
              </Box>

              {loading ? (
                <Box display="flex" justifyContent="center" p={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <List sx={{ width: '100%' }}>
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <div key={transaction.id}>
                      {index > 0 && <Divider variant="inset" component="li" />}
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {transaction.amount > 0 ? (
                            <IncomeIcon color="success" />
                          ) : (
                            <ExpenseIcon color="error" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={transaction.description}
                          secondary={new Date(transaction.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                          primaryTypographyProps={{
                            fontWeight: 'medium',
                            color: 'text.primary'
                          }}
                        />
                        <Typography
                          variant="body1"
                          color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                          sx={{ fontWeight: 'medium' }}
                        >
                          {transaction.amount > 0 ? '+' : ''}
                          {formatCurrency(transaction.amount)}
                        </Typography>
                      </ListItem>
                    </div>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;

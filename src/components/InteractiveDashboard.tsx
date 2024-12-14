import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  AccountBalance,
  Settings,
  Calculate,
  Notifications,
  Add,
  Edit,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const mockPortfolioData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Portfolio Value',
      data: [100000, 105000, 110000, 115000, 120000, 125000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const mockAlerts = [
  {
    id: 1,
    type: 'Market Change',
    message: 'S&P 500 is down by 2%',
    timestamp: '10:00 AM',
  },
  {
    id: 2,
    type: 'Investment Opportunity',
    message: 'New tech stock with high growth potential',
    timestamp: '11:30 AM',
  },
];

const InteractiveDashboard: React.FC = () => {
  const [openCalculator, setOpenCalculator] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [calculatorType, setCalculatorType] = useState('retirement');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [investmentReturn, setInvestmentReturn] = useState('');

  const handleCalculatorOpen = () => {
    setOpenCalculator(true);
  };

  const handleCalculatorClose = () => {
    setOpenCalculator(false);
  };

  const handleSettingsOpen = () => {
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  const handleCalculatorSubmit = () => {
    // Handle calculator logic here
    console.log('Calculator submitted:', {
      calculatorType,
      retirementAge,
      currentSavings,
      monthlyContribution,
      taxRate,
      investmentReturn,
    });
    handleCalculatorClose();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Interactive Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track your portfolio, plan your finances, and stay informed
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">Portfolio Performance</Typography>
                <Tooltip title="View Settings">
                  <IconButton onClick={handleSettingsOpen}>
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Box>
              <Line data={mockPortfolioData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alerts & Notifications
              </Typography>
              {mockAlerts.map((alert) => (
                <Box
                  key={alert.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{alert.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {alert.timestamp}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">Financial Planning Tools</Typography>
                <Button
                  variant="contained"
                  startIcon={<Calculate />}
                  onClick={handleCalculatorOpen}
                >
                  Open Calculator
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                      gap: 1,
                    }}
                  >
                    <AccountBalance color="primary" />
                    <Typography variant="body1">Retirement Calculator</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                      gap: 1,
                    }}
                  >
                    <TrendingUp color="primary" />
                    <Typography variant="body1">Tax Strategy Planner</Typography>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Calculator Dialog */}
      <Dialog open={openCalculator} onClose={handleCalculatorClose}>
        <DialogTitle>Financial Calculator</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Calculator Type</InputLabel>
            <Select
              value={calculatorType}
              onChange={(e) => setCalculatorType(e.target.value)}
              label="Calculator Type"
            >
              <MenuItem value="retirement">Retirement Calculator</MenuItem>
              <MenuItem value="tax">Tax Strategy Planner</MenuItem>
            </Select>
          </FormControl>
          {calculatorType === 'retirement' && (
            <>
              <TextField
                fullWidth
                label="Retirement Age"
                type="number"
                margin="normal"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
              />
              <TextField
                fullWidth
                label="Current Savings"
                type="number"
                margin="normal"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
              />
              <TextField
                fullWidth
                label="Monthly Contribution"
                type="number"
                margin="normal"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
              <TextField
                fullWidth
                label="Expected Investment Return"
                type="number"
                margin="normal"
                value={investmentReturn}
                onChange={(e) => setInvestmentReturn(e.target.value)}
              />
            </>
          )}
          {calculatorType === 'tax' && (
            <TextField
              fullWidth
              label="Tax Rate"
              type="number"
              margin="normal"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCalculatorClose}>Cancel</Button>
          <Button onClick={handleCalculatorSubmit} variant="contained">
            Calculate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={openSettings} onClose={handleSettingsClose}>
        <DialogTitle>Dashboard Settings</DialogTitle>
        <DialogContent>
          <Typography>Customize your dashboard settings here.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Close</Button>
          <Button variant="contained">Save Settings</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InteractiveDashboard;
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
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  TrendingUp,
  AccountBalance,
  Settings,
  Calculate,
  ShowChart,
  PieChart,
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
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const calculateCompoundInterest = (
  principal: number,
  monthlyContribution: number,
  years: number,
  rate: number
): number => {
  const r = rate / 100 / 12;
  const n = years * 12;
  const futureValuePrincipal = principal * Math.pow(1 + r, n);
  const futureValueContributions =
    monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
  return futureValuePrincipal + futureValueContributions;
};

const calculateTaxLiability = (income: number, taxRate: number): number => {
  return (income * taxRate) / 100;
};

const mockPortfolioData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Portfolio Value',
      data: [100000, 105000, 110000, 115000, 120000, 125000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
    },
  ],
};

const mockAllocationData = {
  labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
  datasets: [
    {
      data: [45, 30, 15, 10],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
    },
  ],
};

const mockAlerts = [
  {
    id: 1,
    type: 'Market Change',
    message: 'S&P 500 is down by 2%',
    timestamp: '10:00 AM',
    severity: 'warning',
  },
  {
    id: 2,
    type: 'Investment Opportunity',
    message: 'New tech stock with high growth potential',
    timestamp: '11:30 AM',
    severity: 'info',
  },
  {
    id: 3,
    type: 'Portfolio Alert',
    message: 'Your portfolio has exceeded target allocation',
    timestamp: '12:45 PM',
    severity: 'error',
  },
];

const InteractiveDashboard: React.FC = () => {
  const [openCalculator, setOpenCalculator] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [calculatorType, setCalculatorType] = useState('retirement');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentAge, setCurrentAge] = useState('30');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('1000');
  const [taxRate, setTaxRate] = useState('25');
  const [investmentReturn, setInvestmentReturn] = useState('7');
  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [chartType, setChartType] = useState<'line' | 'pie'>('line');
  const [showRealTimeUpdates, setShowRealTimeUpdates] = useState(true);
    const [currentAgeError, setCurrentAgeError] = useState('');
    const [retirementAgeError, setRetirementAgeError] = useState('');
    const [currentSavingsError, setCurrentSavingsError] = useState('');
    const [monthlyContributionError, setMonthlyContributionError] = useState('');
    const [investmentReturnError, setInvestmentReturnError] = useState('');
    const [taxRateError, setTaxRateError] = useState('');


  const handleCalculatorOpen = () => {
    setOpenCalculator(true);
  };

  const handleCalculatorClose = () => {
    setOpenCalculator(false);
    setCalculationResult(null);
      resetCalculatorForm();
  };

    const resetCalculatorForm = () => {
        setCurrentAge('30');
        setRetirementAge('65');
        setCurrentSavings('50000');
        setMonthlyContribution('1000');
        setTaxRate('25');
        setInvestmentReturn('7');
        setCurrentAgeError('');
        setRetirementAgeError('');
        setCurrentSavingsError('');
        setMonthlyContributionError('');
        setInvestmentReturnError('');
        setTaxRateError('');
    };

  const handleSettingsOpen = () => {
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

    const validateCalculatorInputs = () => {
        let isValid = true;

        if (calculatorType === 'retirement') {
            if (!currentAge || isNaN(Number(currentAge)) || Number(currentAge) < 0 || Number(currentAge) > 100) {
                setCurrentAgeError('Please enter a valid current age (0-100)');
                isValid = false;
            } else {
                setCurrentAgeError('');
            }

            if (!retirementAge || isNaN(Number(retirementAge)) || Number(retirementAge) < 0 || Number(retirementAge) > 100) {
                setRetirementAgeError('Please enter a valid retirement age (0-100)');
                isValid = false;
            } else {
                setRetirementAgeError('');
            }

            if (!currentSavings || isNaN(Number(currentSavings)) || Number(currentSavings) < 0) {
                setCurrentSavingsError('Please enter a valid current savings amount');
                isValid = false;
            } else {
                setCurrentSavingsError('');
            }

            if (!monthlyContribution || isNaN(Number(monthlyContribution)) || Number(monthlyContribution) < 0) {
                setMonthlyContributionError('Please enter a valid monthly contribution amount');
                isValid = false;
            } else {
                setMonthlyContributionError('');
            }

            if (!investmentReturn || isNaN(Number(investmentReturn)) || Number(investmentReturn) < 0 || Number(investmentReturn) > 100) {
                setInvestmentReturnError('Please enter a valid investment return (0-100)');
                isValid = false;
            } else {
                setInvestmentReturnError('');
            }
        } else {
            if (!currentSavings || isNaN(Number(currentSavings)) || Number(currentSavings) < 0) {
                setCurrentSavingsError('Please enter a valid annual income');
                isValid = false;
            } else {
                setCurrentSavingsError('');
            }

            if (!taxRate || isNaN(Number(taxRate)) || Number(taxRate) < 0 || Number(taxRate) > 100) {
                setTaxRateError('Please enter a valid tax rate (0-100)');
                isValid = false;
            } else {
                setTaxRateError('');
            }
        }

        return isValid;
    };


  const handleCalculatorSubmit = () => {
      if (!validateCalculatorInputs()) {
          setSnackbarMessage('Please correct the errors in the form.');
          setShowSnackbar(true);
          return;
      }
    try {
      let result: number;
      if (calculatorType === 'retirement') {
        const years = parseInt(retirementAge) - parseInt(currentAge);
        result = calculateCompoundInterest(
          parseFloat(currentSavings),
          parseFloat(monthlyContribution),
          years,
          parseFloat(investmentReturn)
        );
      } else {
        result = calculateTaxLiability(
          parseFloat(currentSavings),
          parseFloat(taxRate)
        );
      }
      setCalculationResult(result);
      setSnackbarMessage('Calculation completed successfully!');
      setShowSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error in calculation. Please check your inputs.');
      setShowSnackbar(true);
    }
  };

  const handleChartTypeChange = () => {
    setChartType(chartType === 'line' ? 'pie' : 'line');
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: chartType === 'line' ? 'Portfolio Performance' : 'Asset Allocation',
      },
    },
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
                <Typography variant="h6">Portfolio Overview</Typography>
                <Box>
                  <Tooltip title="Toggle Chart Type">
                    <IconButton onClick={handleChartTypeChange}>
                      {chartType === 'line' ? <PieChart /> : <ShowChart />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Settings">
                    <IconButton onClick={handleSettingsOpen}>
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              {chartType === 'line' ? (
                <Line data={mockPortfolioData} options={chartOptions} />
              ) : (
                <Pie data={mockAllocationData} options={chartOptions} />
              )}
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
                <Alert
                  key={alert.id}
                  severity={alert.severity as 'error' | 'warning' | 'info' | 'success'}
                  sx={{ mb: 1 }}
                >
                  <Typography variant="subtitle2">{alert.type}</Typography>
                  <Typography variant="body2">{alert.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {alert.timestamp}
                  </Typography>
                </Alert>
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
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => {
                      setCalculatorType('retirement');
                      handleCalculatorOpen();
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
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => {
                      setCalculatorType('tax');
                      handleCalculatorOpen();
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
      <Dialog
        open={openCalculator}
        onClose={handleCalculatorClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {calculatorType === 'retirement'
            ? 'Retirement Calculator'
            : 'Tax Strategy Planner'}
        </DialogTitle>
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
          {calculatorType === 'retirement' ? (
            <>
              <TextField
                fullWidth
                label="Current Age"
                type="number"
                margin="normal"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  error={!!currentAgeError}
                  helperText={currentAgeError}
              />
              <TextField
                fullWidth
                label="Retirement Age"
                type="number"
                margin="normal"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  error={!!retirementAgeError}
                  helperText={retirementAgeError}
              />
              <TextField
                fullWidth
                label="Current Savings"
                type="number"
                margin="normal"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                  error={!!currentSavingsError}
                  helperText={currentSavingsError}
              />
              <TextField
                fullWidth
                label="Monthly Contribution"
                type="number"
                margin="normal"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                  error={!!monthlyContributionError}
                  helperText={monthlyContributionError}
              />
              <TextField
                fullWidth
                label="Expected Investment Return (%)"
                type="number"
                margin="normal"
                value={investmentReturn}
                onChange={(e) => setInvestmentReturn(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 100, step: 0.1 } }}
                  error={!!investmentReturnError}
                  helperText={investmentReturnError}
              />
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Annual Income"
                type="number"
                margin="normal"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                  error={!!currentSavingsError}
                  helperText={currentSavingsError}
              />
              <TextField
                fullWidth
                label="Tax Rate (%)"
                type="number"
                margin="normal"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 100, step: 0.1 } }}
                  error={!!taxRateError}
                  helperText={taxRateError}
              />
            </>
          )}
          {calculationResult !== null && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                {calculatorType === 'retirement'
                  ? 'Estimated Retirement Savings:'
                  : 'Estimated Tax Liability:'}
              </Typography>
              <Typography variant="h6">
                ${(calculationResult || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Alert>
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
          <FormControlLabel
            control={
              <Switch
                checked={showRealTimeUpdates}
                onChange={(e) => setShowRealTimeUpdates(e.target.checked)}
              />
            }
            label="Enable Real-time Updates"
          />
          {/* Add more settings as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Cancel</Button>
          <Button onClick={handleSettingsClose} variant="contained">
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default InteractiveDashboard;
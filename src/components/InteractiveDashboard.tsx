import React, { useState, useEffect } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  AccountBalance,
  Settings,
  Calculate,
  ShowChart,
  PieChart,
  Notifications,
  NotificationsActive,
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

interface Alert {
  id: number;
  type: string;
  message: string;
		timestamp: string;
		severity: 'error' | 'warning' | 'info' | 'success';
}

interface TaxBracket {
		rate: number;
		min: number;
		max: number | null;
}

const taxBrackets: TaxBracket[] = [
  { rate: 10, min: 0, max: 11000 },
  { rate: 12, min: 11001, max: 44725 },
  { rate: 22, min: 44726, max: 95375 },
  { rate: 24, min: 95376, max: 182100 },
  { rate: 32, min: 182101, max: 231250 },
  { rate: 35, min: 231251, max: 578125 },
  { rate: 37, min: 578126, max: null },
];

const calculateCompoundInterest = (
  principal: number,
  monthlyContribution: number,
  years: number,
  rate: number
): { total: number; yearlyData: { year: number; amount: number }[] } => {
  const r = rate / 100 / 12;
  const yearlyData = [];
  let currentAmount = principal;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      currentAmount = (currentAmount + monthlyContribution) * (1 + r);
    }
    yearlyData.push({
      year,
      amount: currentAmount,
    });
  }

  return {
    total: currentAmount,
    yearlyData,
  };
};

const calculateTaxLiability = (income: number): {
  totalTax: number;
  effectiveRate: number;
  brackets: { rate: number; tax: number; income: number }[];
} => {
  let totalTax = 0;
  const brackets: { rate: number; tax: number; income: number }[] = [];

  taxBrackets.forEach((bracket, index) => {
    if (income > bracket.min) {
      const taxableInThisBracket =
        bracket.max === null
          ? income - bracket.min
          : Math.min(income - bracket.min, bracket.max - bracket.min);
      
      const taxInBracket = (taxableInThisBracket * bracket.rate) / 100;
      totalTax += taxInBracket;
      
      brackets.push({
        rate: bracket.rate,
        tax: taxInBracket,
        income: taxableInThisBracket,
      });
    }
  });

  return {
    totalTax,
    effectiveRate: (totalTax / income) * 100,
    brackets,
  };
};

const generatePortfolioData = (months: number = 12, showRealTimeUpdates: boolean = false) => {
  const labels = [];
  const data = [];
  let baseValue = 100000;

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - i));
    labels.push(date.toLocaleString('default', { month: 'short', year: '2-digit' }));
    
    // Add some randomness for real-time simulation
    const volatility = showRealTimeUpdates ? (Math.random() - 0.5) * 0.05 : 0.01;
    baseValue = baseValue * (1 + volatility);
    data.push(Math.round(baseValue));
  }

  return {
    labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
      },
    ],
  };
};

const generateAllocationData = (showRealTimeUpdates: boolean = false) => {
  // Base allocations
  let stocks = 45;
  let bonds = 30;
  let realEstate = 15;
  let cash = 10;

  // Add some variation for real-time updates
  if (showRealTimeUpdates) {
    const variation = 2;
    stocks += (Math.random() - 0.5) * variation;
    bonds += (Math.random() - 0.5) * variation;
    realEstate += (Math.random() - 0.5) * variation;
    cash += (Math.random() - 0.5) * variation;

    // Normalize to ensure total is 100%
    const total = stocks + bonds + realEstate + cash;
    stocks = (stocks / total) * 100;
    bonds = (bonds / total) * 100;
    realEstate = (realEstate / total) * 100;
    cash = (cash / total) * 100;
  }

  return {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
    datasets: [
      {
        data: [stocks, bonds, realEstate, cash],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };
};

const generateAlerts = () => {
  const baseAlerts = [
    {
      id: 1,
      type: 'Market Change',
      message: 'S&P 500 is down by 2%',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleTimeString(),
      severity: 'warning' as const,
    },
    {
      id: 2,
      type: 'Investment Opportunity',
      message: 'New tech stock with high growth potential',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toLocaleTimeString(),
      severity: 'info' as const,
    },
    {
      id: 3,
      type: 'Portfolio Alert',
      message: 'Your portfolio has exceeded target allocation',
      timestamp: new Date().toLocaleTimeString(),
      severity: 'error' as const,
    },
  ];

  // Add dynamic market updates
  const marketChange = (Math.random() - 0.5) * 4;
  if (Math.abs(marketChange) > 1) {
    baseAlerts.unshift({
      id: Date.now(),
      type: 'Market Update',
      message: `Market ${marketChange > 0 ? 'up' : 'down'} by ${Math.abs(marketChange).toFixed(1)}%`,
      timestamp: new Date().toLocaleTimeString(),
      severity: marketChange > 0 ? 'success' : 'warning',
    } as any);
  }

  return baseAlerts;
};

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
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [chartType, setChartType] = useState<'line' | 'pie'>('line');
  const [showRealTimeUpdates, setShowRealTimeUpdates] = useState(true);
  const [portfolioData, setPortfolioData] = useState(generatePortfolioData(12, true));
  const [allocationData, setAllocationData] = useState(generateAllocationData(true));
  const [alerts, setAlerts] = useState(generateAlerts());
  const [currentAgeError, setCurrentAgeError] = useState('');
  const [retirementAgeError, setRetirementAgeError] = useState('');
  const [currentSavingsError, setCurrentSavingsError] = useState('');
  const [monthlyContributionError, setMonthlyContributionError] = useState('');
  const [investmentReturnError, setInvestmentReturnError] = useState('');
  const [taxRateError, setTaxRateError] = useState('');

  useEffect(() => {
    if (showRealTimeUpdates) {
      const interval = setInterval(() => {
        setPortfolioData(generatePortfolioData(12, true));
        setAllocationData(generateAllocationData(true));
        setAlerts(generateAlerts());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showRealTimeUpdates]);

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
      if (calculatorType === 'retirement') {
        const years = parseInt(retirementAge) - parseInt(currentAge);
        const result = calculateCompoundInterest(
          parseFloat(currentSavings),
          parseFloat(monthlyContribution),
          years,
          parseFloat(investmentReturn)
        );
        setCalculationResult({
          type: 'retirement',
          ...result,
        });
      } else {
        const result = calculateTaxLiability(parseFloat(currentSavings));
        setCalculationResult({
          type: 'tax',
          ...result,
        });
      }
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

  const handleSettingsSave = () => {
    // Reset data with new settings
    setPortfolioData(generatePortfolioData(12, showRealTimeUpdates));
    setAllocationData(generateAllocationData(showRealTimeUpdates));
    handleSettingsClose();
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
    scales: chartType === 'line' ? {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(this: any, tickValue: string | number) {
            if (typeof tickValue === 'number') {
              return `$${tickValue.toLocaleString()}`;
            }
            return tickValue;
          }
        }
      }
    } : undefined,
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
                <Line data={portfolioData} options={chartOptions} />
              ) : (
                <Pie data={allocationData} options={chartOptions} />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Alerts & Notifications</Typography>
                <Tooltip title={showRealTimeUpdates ? 'Real-time updates enabled' : 'Real-time updates disabled'}>
                  <IconButton>
                    {showRealTimeUpdates ? <NotificationsActive color="primary" /> : <Notifications />}
                  </IconButton>
                </Tooltip>
              </Box>
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  severity={alert.severity}
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
        maxWidth="md"
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
            </>
          )}
          {calculationResult && (
            <Box sx={{ mt: 2 }}>
              {calculationResult.type === 'retirement' ? (
                <>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      Estimated Retirement Savings at Age {retirementAge}:
                    </Typography>
                    <Typography variant="h6">
                      ${calculationResult.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Alert>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Year</TableCell>
                          <TableCell align="right">Age</TableCell>
                          <TableCell align="right">Projected Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {calculationResult.yearlyData.map((data: any) => (
                          <TableRow key={data.year}>
                            <TableCell>{data.year}</TableCell>
                            <TableCell align="right">
                              {Number(currentAge) + data.year}
                            </TableCell>
                            <TableCell align="right">
                              ${data.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      Tax Liability Summary:
                    </Typography>
                    <Typography variant="h6">
                      Total Tax: ${calculationResult.totalTax.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                    <Typography variant="subtitle2">
                      Effective Tax Rate: {calculationResult.effectiveRate.toFixed(2)}%
                    </Typography>
                  </Alert>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Tax Bracket</TableCell>
                          <TableCell align="right">Taxable Income</TableCell>
                          <TableCell align="right">Tax Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {calculationResult.brackets.map((bracket: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{bracket.rate}%</TableCell>
                            <TableCell align="right">
                              ${bracket.income.toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              ${bracket.tax.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCalculatorClose}>Close</Button>
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            When enabled, portfolio data and alerts will update automatically every 5 seconds
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Cancel</Button>
          <Button onClick={handleSettingsSave} variant="contained">
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
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  BarChart,
  Timeline,
  TrendingUp,
  People,
  AccessTime,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const initialEngagementData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Communication Frequency',
      data: [15, 20, 25, 30, 28, 35],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
    },
    {
      label: 'App Usage',
      data: [10, 15, 18, 22, 20, 24],
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
    },
  ],
};

const mockPredictiveData = [
  {
    id: 1,
    investment: 'Tech Stock A',
    predictedReturn: '12%',
    confidence: 'High',
  },
  {
    id: 2,
    investment: 'Bond Fund B',
    predictedReturn: '5%',
    confidence: 'Medium',
  },
  {
    id: 3,
    investment: 'Real Estate C',
    predictedReturn: '8%',
    confidence: 'Low',
  },
];

const Analytics: React.FC = () => {
    const [engagementData, setEngagementData] = useState(initialEngagementData);

    useEffect(() => {
        const interval = setInterval(() => {
            setEngagementData(prevData => {
                const newData = { ...prevData };
                newData.datasets = prevData.datasets.map(dataset => {
                    return {
                        ...dataset,
                        data: dataset.data.map(value => value + Math.floor(Math.random() * 5) - 2),
                    };
                });
                return newData;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics & Reporting
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Gain insights into client engagement and investment outcomes
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
                <Typography variant="h6">Client Engagement</Typography>
                <Timeline color="primary" />
              </Box>
              <Bar data={engagementData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
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
                <Typography variant="h6">Predictive Analytics</Typography>
                <TrendingUp color="primary" />
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Investment</TableCell>
                      <TableCell>Predicted Return</TableCell>
                      <TableCell>Confidence</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockPredictiveData.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.investment}</TableCell>
                        <TableCell>{data.predictedReturn}</TableCell>
                        <TableCell>{data.confidence}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                <Typography variant="h6">Key Metrics</Typography>
                <People color="primary" />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
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
                    <AccessTime color="primary" />
                    <Typography variant="body1">Avg. Session Time</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    <People color="primary" />
                    <Typography variant="body1">Active Clients</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    <BarChart color="primary" />
                    <Typography variant="body1">Portfolio Growth</Typography>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';
import {
  Analytics,
  Chat,
  Security,
  TrendingUp,
  School,
  People,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Communication Hub',
    description: 'Seamlessly connect with clients through multiple channels',
    icon: <Chat fontSize="large" color="primary" />,
    path: '/communication',
  },
  {
    title: 'Client Management',
    description: 'Comprehensive tools for managing client relationships',
    icon: <People fontSize="large" color="primary" />,
    path: '/clients',
  },
  {
    title: 'Interactive Dashboard',
    description: 'Real-time portfolio tracking and performance analytics',
    icon: <TrendingUp fontSize="large" color="primary" />,
    path: '/dashboard',
  },
  {
    title: 'Educational Resources',
    description: 'Curated content to enhance financial literacy',
    icon: <School fontSize="large" color="primary" />,
    path: '/resources',
  },
  {
    title: 'Advanced Analytics',
    description: 'Data-driven insights for better decision making',
    icon: <Analytics fontSize="large" color="primary" />,
    path: '/analytics',
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security and regulatory compliance',
    icon: <Security fontSize="large" color="primary" />,
    path: '/compliance',
  },
];

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          borderRadius: theme.shape.borderRadius,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Financial Advisor Platform
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Enhance client communication, increase engagement, and improve portfolio
            satisfaction with our comprehensive financial advisor platform.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/resources')}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    {feature.title}
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
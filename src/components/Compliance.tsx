import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Security,
  VerifiedUser,
  Policy,
  Lock,
  AssignmentTurnedIn,
} from '@mui/icons-material';

const Compliance: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Compliance & Security
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Ensure data protection and regulatory compliance
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
                <Typography variant="h6">Security Measures</Typography>
                <Security color="primary" />
              </Box>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Lock color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="End-to-end encryption for all communications" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedUser color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Secure document sharing and storage" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Policy color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Regular security audits and updates" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
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
                <Typography variant="h6">Regulatory Compliance</Typography>
                <AssignmentTurnedIn color="primary" />
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Compliance with GDPR regulations" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Compliance with SEC regulations" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Compliance with FINRA regulations" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Compliance;
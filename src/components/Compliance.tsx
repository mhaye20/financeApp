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
    Button,
    IconButton,
    Tooltip,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Switch,
} from '@mui/material';
import {
  Security,
  VerifiedUser,
  Policy,
  Lock,
  AssignmentTurnedIn,
    Description,
    Add,
} from '@mui/icons-material';

const mockComplianceDocuments = [
    {
        id: 1,
        name: 'GDPR Compliance Policy',
        url: 'https://example.com/gdpr-policy.pdf',
    },
    {
        id: 2,
        name: 'SEC Compliance Report',
        url: 'https://example.com/sec-report.pdf',
    },
    {
        id: 3,
        name: 'FINRA Compliance Guidelines',
        url: 'https://example.com/finra-guidelines.pdf',
    },
];

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
                          <Typography variant="h6">Compliance Documents</Typography>
                          <Button
                              variant="contained"
                              startIcon={<Add />}
                          >
                              Add Document
                          </Button>
                      </Box>
                      <List>
                          {mockComplianceDocuments.map((doc) => (
                              <ListItem
                                  key={doc.id}
                                  secondaryAction={
                                      <Tooltip title="View Document">
                                          <IconButton
                                              edge="end"
                                              aria-label="view"
                                              onClick={() => window.open(doc.url, '_blank')}
                                          >
                                              <Description />
                                          </IconButton>
                                      </Tooltip>
                                  }
                              >
                                  <ListItemText
                                      primary={doc.name}
                                  />
                              </ListItem>
                          ))}
                      </List>
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
                          <Typography variant="h6">Security Settings</Typography>
                          <Security color="primary" />
                      </Box>
                      <FormControl component="fieldset" variant="standard">
                          <FormGroup>
                              <FormControlLabel
                                  control={<Switch />}
                                  label="Enable Two-Factor Authentication"
                              />
                              <FormControlLabel
                                  control={<Switch />}
                                  label="Enable Session Timeout"
                              />
                              <FormControlLabel
                                  control={<Switch />}
                                  label="Enable Data Encryption at Rest"
                              />
                          </FormGroup>
                      </FormControl>
                  </CardContent>
              </Card>
          </Grid>
      </Grid>
    </Container>
  );
};

export default Compliance;
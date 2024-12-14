import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Person,
  Add,
  Edit,
  TrendingUp,
  AttachMoney,
  Flag,
  Assessment,
} from '@mui/icons-material';

interface Client {
  id: number;
  name: string;
  email: string;
  aum: number;
  riskProfile: string;
  goals: Goal[];
  segment: 'High Value' | 'Mid Tier' | 'Growth Potential';
}

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

const mockClients: Client[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    aum: 1500000,
    riskProfile: 'Moderate',
    segment: 'High Value',
    goals: [
      {
        id: 1,
        name: 'Retirement',
        target: 2000000,
        current: 1500000,
        deadline: '2030',
      },
      {
        id: 2,
        name: 'College Fund',
        target: 500000,
        current: 300000,
        deadline: '2025',
      },
    ],
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    aum: 750000,
    riskProfile: 'Conservative',
    segment: 'Mid Tier',
    goals: [
      {
        id: 3,
        name: 'Home Purchase',
        target: 1000000,
        current: 600000,
        deadline: '2024',
      },
    ],
  },
];

const ClientManagement: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openGoalDialog, setOpenGoalDialog] = useState(false);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setOpenDialog(true);
  };

  const handleAddGoal = () => {
    setOpenGoalDialog(true);
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'High Value':
        return 'success';
      case 'Mid Tier':
        return 'primary';
      case 'Growth Potential':
        return 'warning';
      default:
        return 'default';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Client Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage client profiles, track goals, and monitor progress
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Client Overview</Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  color="primary"
                >
                  Add Client
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>AUM</TableCell>
                      <TableCell>Risk Profile</TableCell>
                      <TableCell>Segment</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>
                          ${client.aum.toLocaleString()}
                        </TableCell>
                        <TableCell>{client.riskProfile}</TableCell>
                        <TableCell>
                          <Chip
                            label={client.segment}
                            color={getSegmentColor(client.segment) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleClientClick(client)}
                          >
                            <Assessment />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Client Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedClient && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person />
                {selectedClient.name}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Profile Information
                      </Typography>
                      <Typography>
                        <strong>Email:</strong> {selectedClient.email}
                      </Typography>
                      <Typography>
                        <strong>AUM:</strong> ${selectedClient.aum.toLocaleString()}
                      </Typography>
                      <Typography>
                        <strong>Risk Profile:</strong> {selectedClient.riskProfile}
                      </Typography>
                      <Typography>
                        <strong>Segment:</strong>{' '}
                        <Chip
                          label={selectedClient.segment}
                          color={getSegmentColor(selectedClient.segment) as any}
                          size="small"
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Financial Goals</Typography>
                        <Button
                          size="small"
                          startIcon={<Add />}
                          onClick={handleAddGoal}
                        >
                          Add Goal
                        </Button>
                      </Box>
                      {selectedClient.goals.map((goal) => (
                        <Box key={goal.id} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">{goal.name}</Typography>
                            <Typography variant="caption">
                              Target: ${goal.target.toLocaleString()}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={calculateProgress(goal.current, goal.target)}
                            sx={{ my: 1 }}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">
                              Current: ${goal.current.toLocaleString()}
                            </Typography>
                            <Typography variant="caption">
                              Deadline: {goal.deadline}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button variant="contained" startIcon={<Edit />}>
                Edit Profile
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Goal Dialog */}
      <Dialog
        open={openGoalDialog}
        onClose={() => setOpenGoalDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Goal Name"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Target Amount"
            type="number"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Deadline"
            type="date"
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGoalDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientManagement;
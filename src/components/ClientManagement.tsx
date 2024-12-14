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

const riskProfiles = ['Conservative', 'Moderate', 'Aggressive'];
const clientSegments = ['High Value', 'Mid Tier', 'Growth Potential'];

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openGoalDialog, setOpenGoalDialog] = useState(false);
  const [openAddClientDialog, setOpenAddClientDialog] = useState(false);
  const [openEditClientDialog, setOpenEditClientDialog] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientAum, setNewClientAum] = useState('');
  const [newClientRiskProfile, setNewClientRiskProfile] = useState(riskProfiles[0]);
  const [newClientSegment, setNewClientSegment] = useState(clientSegments[0]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [editClientName, setEditClientName] = useState('');
  const [editClientEmail, setEditClientEmail] = useState('');
  const [editClientAum, setEditClientAum] = useState('');
  const [editClientRiskProfile, setEditClientRiskProfile] = useState('');
  const [editClientSegment, setEditClientSegment] = useState('');

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setOpenDialog(true);
  };

  const handleAddGoalOpen = () => {
    setOpenGoalDialog(true);
  };

  const handleAddGoalClose = () => {
    setOpenGoalDialog(false);
    resetAddGoalForm();
  };

  const resetAddGoalForm = () => {
    setNewGoalName('');
    setNewGoalTarget('');
    setNewGoalDeadline('');
  };

  const handleAddGoalSubmit = () => {
    if (selectedClient) {
      const newGoal: Goal = {
        id: selectedClient.goals.length + 1,
        name: newGoalName,
        target: parseFloat(newGoalTarget),
        current: 0,
        deadline: newGoalDeadline,
      };
      const updatedClient = { ...selectedClient, goals: [...selectedClient.goals, newGoal] };
      setClients(clients.map(client => client.id === selectedClient.id ? updatedClient : client));
      setSelectedClient(updatedClient);
      handleAddGoalClose();
    }
  };

    const handleEditClientOpen = () => {
        if (selectedClient) {
            setEditClientName(selectedClient.name);
            setEditClientEmail(selectedClient.email);
            setEditClientAum(selectedClient.aum.toString());
            setEditClientRiskProfile(selectedClient.riskProfile);
            setEditClientSegment(selectedClient.segment);
            setOpenEditClientDialog(true);
        }
    };

    const handleEditClientClose = () => {
        setOpenEditClientDialog(false);
    };

    const handleEditClientSubmit = () => {
        if (selectedClient) {
            const updatedClient = {
                ...selectedClient,
                name: editClientName,
                email: editClientEmail,
                aum: parseFloat(editClientAum),
                riskProfile: editClientRiskProfile,
                segment: editClientSegment as 'High Value' | 'Mid Tier' | 'Growth Potential',
            };
            setClients(clients.map(client => client.id === selectedClient.id ? updatedClient : client));
            setSelectedClient(updatedClient);
            handleEditClientClose();
            setOpenDialog(false);
        }
    };


  const handleAddClientOpen = () => {
    setOpenAddClientDialog(true);
  };

  const handleAddClientClose = () => {
    setOpenAddClientDialog(false);
    resetAddClientForm();
  };

  const resetAddClientForm = () => {
    setNewClientName('');
    setNewClientEmail('');
    setNewClientAum('');
    setNewClientRiskProfile(riskProfiles[0]);
    setNewClientSegment(clientSegments[0]);
  };

  const handleAddClientSubmit = () => {
    const newClient: Client = {
      id: clients.length + 1,
      name: newClientName,
      email: newClientEmail,
      aum: parseFloat(newClientAum),
      riskProfile: newClientRiskProfile,
      segment: newClientSegment as 'High Value' | 'Mid Tier' | 'Growth Potential',
      goals: [],
    };
    setClients([...clients, newClient]);
    handleAddClientClose();
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
                  onClick={handleAddClientOpen}
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
                    {clients.map((client) => (
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
                          onClick={handleAddGoalOpen}
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
              <Button variant="contained" startIcon={<Edit />} onClick={handleEditClientOpen}>
                Edit Profile
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

        {/* Edit Client Dialog */}
        <Dialog open={openEditClientDialog} onClose={handleEditClientClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Client Profile</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Client Name"
                    margin="normal"
                    value={editClientName}
                    onChange={(e) => setEditClientName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={editClientEmail}
                    onChange={(e) => setEditClientEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Assets Under Management"
                    type="number"
                    margin="normal"
                    value={editClientAum}
                    onChange={(e) => setEditClientAum(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Risk Profile</InputLabel>
                    <Select
                        value={editClientRiskProfile}
                        onChange={(e) => setEditClientRiskProfile(e.target.value)}
                        label="Risk Profile"
                    >
                        {riskProfiles.map((profile) => (
                            <MenuItem key={profile} value={profile}>
                                {profile}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Client Segment</InputLabel>
                    <Select
                        value={editClientSegment}
                        onChange={(e) => setEditClientSegment(e.target.value)}
                        label="Client Segment"
                    >
                        {clientSegments.map((segment) => (
                            <MenuItem key={segment} value={segment}>
                                {segment}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClientClose}>Cancel</Button>
                <Button onClick={handleEditClientSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>

      {/* Add Goal Dialog */}
      <Dialog
        open={openGoalDialog}
        onClose={handleAddGoalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Goal Name"
            margin="normal"
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Target Amount"
            type="number"
            margin="normal"
            value={newGoalTarget}
            onChange={(e) => setNewGoalTarget(e.target.value)}
          />
          <TextField
            fullWidth
            label="Deadline"
            type="date"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={newGoalDeadline}
            onChange={(e) => setNewGoalDeadline(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddGoalClose}>Cancel</Button>
          <Button onClick={handleAddGoalSubmit} variant="contained" color="primary">
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog
        open={openAddClientDialog}
        onClose={handleAddClientClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Client Name"
            margin="normal"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={newClientEmail}
            onChange={(e) => setNewClientEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Assets Under Management"
            type="number"
            margin="normal"
            value={newClientAum}
            onChange={(e) => setNewClientAum(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Risk Profile</InputLabel>
            <Select
              value={newClientRiskProfile}
              onChange={(e) => setNewClientRiskProfile(e.target.value)}
              label="Risk Profile"
            >
              {riskProfiles.map((profile) => (
                <MenuItem key={profile} value={profile}>
                  {profile}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Client Segment</InputLabel>
            <Select
              value={newClientSegment}
              onChange={(e) => setNewClientSegment(e.target.value)}
              label="Client Segment"
            >
              {clientSegments.map((segment) => (
                <MenuItem key={segment} value={segment}>
                  {segment}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClientClose}>Cancel</Button>
          <Button onClick={handleAddClientSubmit} variant="contained" color="primary">
            Add Client
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientManagement;
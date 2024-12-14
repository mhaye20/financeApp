import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Share,
  PersonAdd,
  Redeem,
  Feedback,
  Edit,
  Delete,
} from '@mui/icons-material';

interface Referral {
  id: number;
  referrer: string;
  referred: string;
  date: string;
  status: 'pending' | 'completed';
}

const mockReferrals: Referral[] = [
  {
    id: 1,
    referrer: 'John Doe',
    referred: 'Jane Smith',
    date: '2023-05-10',
    status: 'completed',
  },
  {
    id: 2,
    referrer: 'Sarah Smith',
    referred: 'Mike Johnson',
    date: '2023-05-15',
    status: 'pending',
  },
];

const referralStatuses = ['pending', 'completed'];

const ReferralSystem: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newReferrer, setNewReferrer] = useState('');
  const [newReferred, setNewReferred] = useState('');
  const [newReferralDate, setNewReferralDate] = useState('');
  const [newReferralStatus, setNewReferralStatus] = useState(referralStatuses[0]);
  const [editReferrer, setEditReferrer] = useState('');
  const [editReferred, setEditReferred] = useState('');
  const [editReferralDate, setEditReferralDate] = useState('');
  const [editReferralStatus, setEditReferralStatus] = useState(referralStatuses[0]);
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);

  const handleReferralClick = (referral: Referral) => {
    setSelectedReferral(referral);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedReferral(null);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedReferral(null);
  };

  const handleAddReferralOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddReferralClose = () => {
    setOpenAddDialog(false);
    resetAddReferralForm();
  };

  const resetAddReferralForm = () => {
    setNewReferrer('');
    setNewReferred('');
    setNewReferralDate('');
    setNewReferralStatus(referralStatuses[0]);
  };

  const handleAddReferralSubmit = () => {
    const newReferral: Referral = {
      id: referrals.length + 1,
      referrer: newReferrer,
      referred: newReferred,
      date: newReferralDate,
      status: newReferralStatus as 'pending' | 'completed',
    };
    setReferrals([...referrals, newReferral]);
    handleAddReferralClose();
  };

  const handleEditReferralOpen = (referral: Referral) => {
    setSelectedReferral(referral);
    setEditReferrer(referral.referrer);
    setEditReferred(referral.referred);
    setEditReferralDate(referral.date);
    setEditReferralStatus(referral.status);
    setOpenEditDialog(true);
  };

  const handleEditReferralSubmit = () => {
    if (selectedReferral) {
      const updatedReferral = {
        ...selectedReferral,
        referrer: editReferrer,
        referred: editReferred,
        date: editReferralDate,
        status: editReferralStatus as 'pending' | 'completed',
      };
      setReferrals(referrals.map(referral => referral.id === selectedReferral.id ? updatedReferral : referral));
      handleEditDialogClose();
    }
  };

  const handleDeleteReferral = () => {
    if (selectedReferral) {
      const updatedReferrals = referrals.filter(referral => referral.id !== selectedReferral.id);
      setReferrals(updatedReferrals);
      handleDialogClose();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Referral System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Incentivize clients to refer friends and family
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6">Referral Overview</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={handleAddReferralOpen}
        >
          Add Referral
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <List>
                {referrals.map((referral) => (
                  <ListItem
                    key={referral.id}
                    alignItems="flex-start"
                    secondaryAction={
                      <Tooltip title="View Details">
                        <IconButton onClick={() => handleReferralClick(referral)}>
                          <Share />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>{referral.referrer.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${referral.referrer} referred ${referral.referred}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Date: {referral.date}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption">
                            Status: <Chip label={referral.status} size="small" color={referral.status === 'completed' ? 'success' : 'primary'} />
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Redeem />}
                fullWidth
                sx={{ mb: 2 }}
              >
                View Rewards
              </Button>
              <Button
                variant="outlined"
                startIcon={<Feedback />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Provide Feedback
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Referral Details Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        {selectedReferral && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Share />
                Referral Details
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                <strong>Referrer:</strong> {selectedReferral.referrer}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Referred:</strong> {selectedReferral.referred}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {selectedReferral.date}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Status:</strong> {selectedReferral.status}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
              <Button variant="contained" startIcon={<Edit />} onClick={() => handleEditReferralOpen(selectedReferral)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteReferral}>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Referral Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddReferralClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Referral</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Referrer Name"
            margin="normal"
            value={newReferrer}
            onChange={(e) => setNewReferrer(e.target.value)}
          />
          <TextField
            fullWidth
            label="Referred Name"
            margin="normal"
            value={newReferred}
            onChange={(e) => setNewReferred(e.target.value)}
          />
          <TextField
            fullWidth
            label="Referral Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={newReferralDate}
            onChange={(e) => setNewReferralDate(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Referral Status</InputLabel>
            <Select
              value={newReferralStatus}
              onChange={(e) => setNewReferralStatus(e.target.value)}
              label="Referral Status"
            >
              {referralStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddReferralClose}>Cancel</Button>
          <Button onClick={handleAddReferralSubmit} variant="contained" color="primary">
            Add Referral
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Referral Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Referral</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Referrer Name"
            margin="normal"
            value={editReferrer}
            onChange={(e) => setEditReferrer(e.target.value)}
          />
          <TextField
            fullWidth
            label="Referred Name"
            margin="normal"
            value={editReferred}
            onChange={(e) => setEditReferred(e.target.value)}
          />
          <TextField
            fullWidth
            label="Referral Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={editReferralDate}
            onChange={(e) => setEditReferralDate(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Referral Status</InputLabel>
            <Select
              value={editReferralStatus}
              onChange={(e) => setEditReferralStatus(e.target.value)}
              label="Referral Status"
            >
              {referralStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditReferralSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReferralSystem;
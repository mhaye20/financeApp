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

const ReferralSystem: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const handleReferralClick = (referral: Referral) => {
    setSelectedReferral(referral);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedReferral(null);
  };

  const handleAddReferral = () => {
    // Handle add referral logic here
    console.log('Add referral');
  };

  const handleEditReferral = () => {
    // Handle edit referral logic here
    console.log('Edit referral');
  };

  const handleDeleteReferral = () => {
    // Handle delete referral logic here
    console.log('Delete referral');
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Referral Overview</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={handleAddReferral}
        >
          Add Referral
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <List>
                {mockReferrals.map((referral) => (
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
                            Status: {referral.status}
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
              <Button variant="contained" startIcon={<Edit />} onClick={handleEditReferral}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteReferral}>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ReferralSystem;
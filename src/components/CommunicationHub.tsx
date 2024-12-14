import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Email,
  Message,
  Phone,
  VideoCall,
  Schedule,
  Send,
  AttachFile,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`communication-tabpanel-${index}`}
      aria-labelledby={`communication-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const mockMessages = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Question about my portfolio performance',
    timestamp: '10:30 AM',
    type: 'email',
    avatar: 'JD',
  },
  {
    id: 2,
    sender: 'Sarah Smith',
    content: 'Requesting meeting for retirement planning',
    timestamp: '11:45 AM',
    type: 'message',
    avatar: 'SS',
  },
];

const mockMeetings = [
  {
    id: 1,
    client: 'Michael Johnson',
    type: 'Virtual',
    date: '2023-05-20',
    time: '14:00',
    platform: 'Zoom',
  },
  {
    id: 2,
    client: 'Emma Wilson',
    type: 'In-person',
    date: '2023-05-21',
    time: '10:30',
    platform: 'Office',
  },
];

const CommunicationHub: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('virtual');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleScheduleOpen = () => {
    setOpenSchedule(true);
  };

  const handleScheduleClose = () => {
    setOpenSchedule(false);
  };

  const handleScheduleSubmit = () => {
    // Handle scheduling logic here
    console.log('Scheduled:', { selectedDate, selectedTime, selectedType });
    handleScheduleClose();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Communication Hub
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage all your client communications in one place
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="communication tabs">
          <Tab icon={<Message />} label="Messages" />
          <Tab icon={<Email />} label="Email" />
          <Tab icon={<Schedule />} label="Meetings" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <List>
                  {mockMessages.map((message) => (
                    <ListItem
                      key={message.id}
                      alignItems="flex-start"
                      secondaryAction={
                        <Chip
                          size="small"
                          label={message.type}
                          color="primary"
                          variant="outlined"
                        />
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>{message.avatar}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={message.sender}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {message.content}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption">
                              {message.timestamp}
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
                  startIcon={<VideoCall />}
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={handleScheduleOpen}
                >
                  Schedule Meeting
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Phone />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Schedule Call
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              label="To"
              margin="normal"
              placeholder="Enter recipient email"
            />
            <TextField
              fullWidth
              label="Subject"
              margin="normal"
              placeholder="Enter email subject"
            />
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              multiline
              rows={4}
              placeholder="Type your message here"
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <IconButton color="primary">
                <AttachFile />
              </IconButton>
              <Button variant="contained" endIcon={<Send />}>
                Send Email
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {mockMeetings.map((meeting) => (
            <Grid item xs={12} md={6} key={meeting.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {meeting.client}
                  </Typography>
                  <Typography color="text.secondary">
                    {meeting.type} Meeting
                  </Typography>
                  <Typography>
                    Date: {meeting.date} at {meeting.time}
                  </Typography>
                  <Typography>Platform: {meeting.platform}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" size="small">
                      Join Meeting
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <Dialog open={openSchedule} onClose={handleScheduleClose}>
        <DialogTitle>Schedule Meeting</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Meeting Type</InputLabel>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Meeting Type"
            >
              <MenuItem value="virtual">Virtual Meeting</MenuItem>
              <MenuItem value="in-person">In-person Meeting</MenuItem>
              <MenuItem value="phone">Phone Call</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScheduleClose}>Cancel</Button>
          <Button onClick={handleScheduleSubmit} variant="contained">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommunicationHub;
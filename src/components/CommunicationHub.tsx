import React, { useState, useRef, useEffect } from 'react';
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
  SelectChangeEvent,
  MenuItem,
  Paper,
  Divider,
  Badge,
  Alert,
  Tooltip,
  Snackbar,
} from '@mui/material';
import {
  Email,
  Message,
  Phone,
  VideoCall,
  Schedule,
  Send,
  AttachFile,
  InsertDriveFile,
  Link as LinkIcon,
  EmojiEmotions,
  NotificationsActive,
  Sms,
} from '@mui/icons-material';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  type: 'email' | 'message' | 'system';
  avatar: string;
  isRead: boolean;
}

interface Meeting {
  id: number;
  client: string;
  type: 'Virtual' | 'In-person' | 'Phone';
  date: string;
  time: string;
  platform: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const emailTemplates = [
  {
    id: 1,
    name: 'Portfolio Review',
    subject: 'Your Quarterly Portfolio Review',
    content: `Dear [Client Name],

I hope this email finds you well. I wanted to schedule some time to review your portfolio performance for the past quarter. During our review, we'll discuss:

1. Portfolio Performance Analysis
2. Market Conditions Impact
3. Rebalancing Opportunities
4. Progress Towards Your Financial Goals
5. Any Adjustments Needed to Your Strategy

Please let me know what time works best for you next week.

Best regards,
[Your Name]`,
  },
  {
    id: 2,
    name: 'Market Update',
    subject: 'Important Market Update',
    content: `Dear [Client Name],

I wanted to bring to your attention some recent market developments that may affect your portfolio:

• Market Overview: [Current Market Situation]
• Impact on Your Portfolio: [Specific Impact]
• Our Strategy: [Action Plan]
• Recommendations: [Specific Recommendations]

Please don't hesitate to schedule a call if you'd like to discuss these developments in detail.

Best regards,
[Your Name]`,
  },
  {
    id: 3,
    name: 'Tax Planning',
    subject: 'Year-End Tax Planning Strategies',
    content: `Dear [Client Name],

As we approach the end of the tax year, I wanted to discuss some tax planning strategies that could benefit your financial situation:

1. Tax-Loss Harvesting Opportunities
2. Retirement Account Contributions
3. Charitable Giving Strategies
4. Required Minimum Distributions (if applicable)
5. Tax-Efficient Investment Strategies

Would you like to schedule a meeting to review these strategies in detail?

Best regards,
[Your Name]`,
  },
  {
    id: 4,
    name: 'Retirement Planning',
    subject: 'Retirement Planning Check-In',
    content: `Dear [Client Name],

I'd like to schedule our retirement planning review to ensure we're on track with your goals. We'll cover:

• Progress Towards Retirement Goals
• Income Projections
• Risk Assessment
• Social Security Strategy
• Healthcare Planning

Please let me know your availability for a detailed discussion.

Best regards,
[Your Name]`,
  },
];

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

const CommunicationHub: React.FC = (): React.ReactElement => {
  const [tabValue, setTabValue] = useState(0);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('virtual');
  const [selectedPlatform, setSelectedPlatform] = useState('Zoom');
  const [selectedClient, setSelectedClient] = useState('');
  const [meetingNotes, setMeetingNotes] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLDivElement>(null);
  const [messageInputHasFocus, setMessageInputHasFocus] = useState(false);

  const sendAutomatedUpdate = (client: string, update: string) => {
    // Implement automated financial updates
    setSnackbarMessage(`Automated update sent to ${client}`);
    setSnackbarOpen(true);
    
    // Add to messages
    const automatedMessage: Message = {
      id: messages.length + 1,
      sender: 'System',
      content: `Automated Update: ${update}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      avatar: 'SY',
      isRead: false,
    };
    setMessages([...messages, automatedMessage]);
  };

  const sendPushNotification = (message: string) => {
    // Implement push notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Financial Advisor App', { body: message });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Financial Advisor App', { body: message });
        }
      });
    }
    
    setSnackbarMessage('Push notification sent');
    setSnackbarOpen(true);
  };

  const handleSendMessage = () => {
    if (messageInputRef.current && messageInputRef.current.textContent) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'You',
        content: messageInputRef.current.textContent,
        timestamp: new Date().toLocaleTimeString(),
        type: 'message',
        avatar: 'YO',
        isRead: true,
      };
      setMessages([...messages, newMessage]);
      messageInputRef.current.textContent = '';
      
      // Simulate response
      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
          sender: 'System',
          content: 'Message received and will be processed shortly.',
          timestamp: new Date().toLocaleTimeString(),
          type: 'system',
          avatar: 'SY',
          isRead: false,
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  const handleSendSMS = () => {
    setSnackbarMessage('SMS sent successfully');
    setSnackbarOpen(true);
    
    // Add to messages
    const smsMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: 'SMS: ' + document.querySelector<HTMLInputElement>('[placeholder="Type your message..."]')?.value,
      timestamp: new Date().toLocaleTimeString(),
      type: 'message',
      avatar: 'YO',
      isRead: true,
    };
    setMessages([...messages, smsMessage]);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleFocus = () => setMessageInputHasFocus(true);
    const handleBlur = () => setMessageInputHasFocus(false);

    if (messageInputRef.current) {
      messageInputRef.current.addEventListener('focus', handleFocus);
      messageInputRef.current.addEventListener('blur', handleBlur);
    }

    return () => {
      if (messageInputRef.current) {
        messageInputRef.current.removeEventListener('focus', handleFocus);
        messageInputRef.current.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleScheduleOpen = () => {
    setOpenSchedule(true);
  };

  const handleScheduleClose = () => {
    setOpenSchedule(false);
    resetScheduleForm();
  };

  const resetScheduleForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setSelectedType('virtual');
    setSelectedPlatform('Zoom');
    setSelectedClient('');
    setMeetingNotes('');
  };

  const handleScheduleSubmit = () => {
    const newMeeting: Meeting = {
      id: meetings.length + 1,
      client: selectedClient,
      type: selectedType as 'Virtual' | 'In-person' | 'Phone',
      date: selectedDate,
      time: selectedTime,
      platform: selectedPlatform,
      notes: meetingNotes,
      status: 'scheduled',
    };

    setMeetings([...meetings, newMeeting]);
    handleScheduleClose();

    // Add system message about new meeting
    const systemMessage: Message = {
      id: messages.length + 1,
      sender: 'System',
      content: `New meeting scheduled with ${selectedClient} for ${selectedDate} at ${selectedTime}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      avatar: 'SY',
      isRead: false,
    };
    setMessages([...messages, systemMessage]);

    sendAutomatedUpdate(selectedClient, `New meeting scheduled for ${selectedDate} at ${selectedTime}`);
    sendPushNotification(`New meeting scheduled with ${selectedClient}`);
  };

  const handleTemplateSelect = (event: SelectChangeEvent<string>) => {
    const template = emailTemplates.find(t => t.id === parseInt(event.target.value));
    if (template) {
      setSelectedTemplate(event.target.value);
      setEmailSubject(template.subject);
      setEmailContent(template.content);
    }
  };

  const handleSendEmail = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: `Email: ${emailSubject}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'email',
      avatar: 'YO',
      isRead: true,
    };
    setMessages([...messages, newMessage]);
    setEmailSubject('');
    setEmailContent('');
    setSelectedTemplate('');
    
    setSnackbarMessage('Email sent successfully');
    setSnackbarOpen(true);
  };

  const handleClearMessageInput = () => {
    if (messageInputRef.current) {
      messageInputRef.current.innerHTML = '';
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

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
          <Tab 
            icon={
              <Badge badgeContent={unreadCount} color="error">
                <Message />
              </Badge>
            } 
            label="Messages" 
          />
          <Tab icon={<Email />} label="Email" />
          <Tab icon={<Sms />} label="Text" />
          <Tab icon={<Schedule />} label="Meetings" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Paper 
                  sx={{ 
                    height: 400, 
                    overflow: 'auto',
                    p: 2,
                    backgroundColor: 'background.default'
                  }}
                >
                  <List>
                    {messages.map((message) => (
                      <ListItem
                        key={message.id}
                        alignItems="flex-start"
                        sx={{
                          backgroundColor: message.isRead ? 'transparent' : 'action.hover',
                          borderRadius: 1,
                          mb: 1,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: message.type === 'system' ? 'info.main' : 'primary.main' }}>
                            {message.avatar}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography component="span" variant="subtitle2">
                                {message.sender}
                              </Typography>
                              <Chip
                                size="small"
                                label={message.type}
                                color={message.type === 'system' ? 'info' : 'primary'}
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {message.content}
                              </Typography>
                              <br />
                              <Typography component="span" variant="caption" color="text.secondary">
                                {message.timestamp}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                    <div ref={messageEndRef} />
                  </List>
                </Paper>
                <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
                  <div
                    ref={messageInputRef}
                    contentEditable
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      flexGrow: 1,
                      minHeight: '40px',
                      overflow: 'auto',
                    }}
                    data-placeholder="Type your message..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <IconButton color="primary">
                    <AttachFile />
                  </IconButton>
                  <IconButton color="primary">
                    <EmojiEmotions />
                  </IconButton>
                  <Button 
                    variant="contained" 
                    endIcon={<Send />}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                  <Button onClick={handleClearMessageInput}>Clear</Button>
                </Box>
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
                <Button
                  variant="outlined"
                  startIcon={<NotificationsActive />}
                  fullWidth
                >
                  Set Reminder
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              label="To"
              margin="normal"
              placeholder="Enter recipient phone number"
            />
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              multiline
              rows={6}
              placeholder="Type your message..."
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                endIcon={<Send />}
                onClick={handleSendSMS}
              >
                Send Text
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Email Template</InputLabel>
              <Select
                value={selectedTemplate}
                onChange={handleTemplateSelect}
                label="Email Template"
              >
                {emailTemplates.map((template) => (
                  <MenuItem key={template.id} value={template.id}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              multiline
              rows={6}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
              <Box>
                <Tooltip title="Attach File">
                  <IconButton color="primary">
                    <InsertDriveFile />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Insert Link">
                  <IconButton color="primary">
                    <LinkIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Button 
                variant="contained" 
                endIcon={<Send />}
                onClick={handleSendEmail}
                disabled={!emailSubject || !emailContent}
              >
                Send Email
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {meetings.map((meeting) => (
            <Grid item xs={12} md={6} key={meeting.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      {meeting.client}
                    </Typography>
                    <Chip
                      label={meeting.status}
                      color={
                        meeting.status === 'scheduled'
                          ? 'primary'
                          : meeting.status === 'completed'
                          ? 'success'
                          : 'error'
                      }
                      size="small"
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {meeting.type} Meeting
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Date: {new Date(meeting.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Time: {meeting.time}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Platform: {meeting.platform}
                  </Typography>
                  {meeting.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Notes: {meeting.notes}
                    </Typography>
                  )}
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    {meeting.status === 'scheduled' && (
                      <>
                        <Button 
                          variant="contained" 
                          size="small"
                          startIcon={meeting.type === 'Virtual' ? <VideoCall /> : <Schedule />}
                        >
                          {meeting.type === 'Virtual' ? 'Join Meeting' : 'View Details'}
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Schedule Meeting Dialog */}
      <Dialog open={openSchedule} onClose={handleScheduleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Meeting</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Client Name"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            margin="normal"
          />
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Meeting Platform</InputLabel>
            <Select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              label="Meeting Platform"
            >
              <MenuItem value="Zoom">Zoom</MenuItem>
              <MenuItem value="Google Meet">Google Meet</MenuItem>
              <MenuItem value="Office">In-person</MenuItem>
              <MenuItem value="Phone">Phone Call</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Meeting Notes"
            multiline
            rows={3}
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScheduleClose}>Cancel</Button>
          <Button
            onClick={handleScheduleSubmit}
            variant="contained"
            disabled={!selectedClient || !selectedDate || !selectedTime}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Question about my portfolio performance',
    timestamp: '10:30 AM',
    type: 'email',
    avatar: 'JD',
    isRead: false,
  },
  {
    id: 2,
    sender: 'Sarah Smith',
    content: 'Requesting meeting for retirement planning',
    timestamp: '11:45 AM',
    type: 'message',
    avatar: 'SS',
    isRead: true,
  },
  {
    id: 3,
    sender: 'System',
    content: 'Market alert: S&P 500 down 2%',
    timestamp: '12:15 PM',
    type: 'system',
    avatar: 'SY',
    isRead: false,
  },
];

const mockMeetings: Meeting[] = [
  {
    id: 1,
    client: 'Michael Johnson',
    type: 'Virtual',
    date: '2023-05-20',
    time: '14:00',
    platform: 'Zoom',
    status: 'scheduled',
  },
  {
    id: 2,
    client: 'Emma Wilson',
    type: 'In-person',
    date: '2023-05-21',
    time: '10:30',
    platform: 'Office',
    notes: 'Portfolio review and retirement planning',
    status: 'scheduled',
  },
];

export default CommunicationHub;
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
  SmartToy,
  QuestionAnswer,
  Lightbulb,
  Send,
  Edit,
  Delete,
} from '@mui/icons-material';

interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: 'bot',
    text: 'Hello! How can I assist you today?',
    timestamp: '10:00 AM',
  },
  {
    id: 2,
    sender: 'user',
    text: 'What is my current portfolio performance?',
    timestamp: '10:05 AM',
  },
  {
    id: 3,
    sender: 'bot',
    text: 'Your portfolio has increased by 5% in the last month.',
    timestamp: '10:06 AM',
  },
];

const mockSuggestions = [
  {
    id: 1,
    title: 'Recommended Resources',
    description: 'Based on your goals, we recommend these resources.',
  },
  {
    id: 2,
    title: 'Investment Opportunities',
    description: 'Check out these new investment opportunities.',
  },
];

const AI: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);

  const handleSuggestionClick = (suggestion: any) => {
    setSelectedSuggestion(suggestion);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedSuggestion(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newChatMessage: ChatMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: chatMessages.length + 2,
          sender: 'bot',
          text: 'This is a simulated response from the AI bot.',
          timestamp: new Date().toLocaleTimeString(),
        };
        setChatMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleAddSuggestion = () => {
    // Handle add suggestion logic here
    console.log('Add suggestion');
  };

  const handleEditSuggestion = () => {
    // Handle edit suggestion logic here
    console.log('Edit suggestion');
  };

  const handleDeleteSuggestion = () => {
    // Handle delete suggestion logic here
    console.log('Delete suggestion');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI-Enhanced Functionality
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Get AI-driven suggestions and answers to your questions
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
                <Typography variant="h6">AI Chat Assistant</Typography>
                <SmartToy color="primary" />
              </Box>
              <Box
                sx={{
                  height: 300,
                  overflowY: 'auto',
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <List>
                  {chatMessages.map((message) => (
                    <ListItem
                      key={message.id}
                      alignItems="flex-start"
                      sx={{
                        justifyContent:
                          message.sender === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <ListItemAvatar sx={{ display: message.sender === 'bot' ? 'block' : 'none' }}>
                        <Avatar>
                          {message.sender === 'bot' ? 'AI' : ''}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={message.text}
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {message.timestamp}
                          </Typography>
                        }
                        sx={{
                          textAlign: message.sender === 'user' ? 'right' : 'left',
                        }}
                      />
                      <ListItemAvatar sx={{ display: message.sender === 'user' ? 'block' : 'none' }}>
                        <Avatar>
                          {message.sender === 'user' ? 'U' : ''}
                        </Avatar>
                      </ListItemAvatar>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  fullWidth
                  label="Type your message"
                  variant="outlined"
                  size="small"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                  <Send />
                </IconButton>
              </Box>
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
                <Typography variant="h6">AI Suggestions</Typography>
                <Lightbulb color="primary" />
              </Box>
              <List>
                {mockSuggestions.map((suggestion) => (
                  <ListItem
                    key={suggestion.id}
                    button
                    onClick={() => handleSuggestionClick(suggestion)}
                    secondaryAction={
                      <Tooltip title="View Details">
                        <IconButton>
                          <QuestionAnswer />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemText
                      primary={suggestion.title}
                      secondary={suggestion.description}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Suggestion Details Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        {selectedSuggestion && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lightbulb />
                {selectedSuggestion.title}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                {selectedSuggestion.description}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
              <Button variant="contained" startIcon={<Edit />} onClick={handleEditSuggestion}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteSuggestion}>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default AI;
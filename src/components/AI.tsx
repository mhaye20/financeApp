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
    Add as AddIcon,
} from '@mui/icons-material';

interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface Suggestion {
    id: number;
    title: string;
    description: string;
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

const mockSuggestions: Suggestion[] = [
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
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
    const [newSuggestionTitle, setNewSuggestionTitle] = useState('');
    const [newSuggestionDescription, setNewSuggestionDescription] = useState('');
    const [editSuggestionTitle, setEditSuggestionTitle] = useState('');
    const [editSuggestionDescription, setEditSuggestionDescription] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedSuggestion(null);
  };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setSelectedSuggestion(null);
    };

  const handleAddSuggestionOpen = () => {
    setOpenAddDialog(true);
  };

    const handleAddSuggestionClose = () => {
        setOpenAddDialog(false);
        resetAddSuggestionForm();
    };

    const resetAddSuggestionForm = () => {
        setNewSuggestionTitle('');
        setNewSuggestionDescription('');
    };

    const handleAddSuggestionSubmit = () => {
        const newSuggestion: Suggestion = {
            id: suggestions.length + 1,
            title: newSuggestionTitle,
            description: newSuggestionDescription,
        };
        setSuggestions([...suggestions, newSuggestion]);
        handleAddSuggestionClose();
    };

    const handleEditSuggestionOpen = (suggestion: Suggestion) => {
        setSelectedSuggestion(suggestion);
        setEditSuggestionTitle(suggestion.title);
        setEditSuggestionDescription(suggestion.description);
        setOpenEditDialog(true);
    };

    const handleEditSuggestionSubmit = () => {
        if (selectedSuggestion) {
            const updatedSuggestion = {
                ...selectedSuggestion,
                title: editSuggestionTitle,
                description: editSuggestionDescription,
            };
            setSuggestions(suggestions.map(suggestion => suggestion.id === selectedSuggestion.id ? updatedSuggestion : suggestion));
            handleEditDialogClose();
        }
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
      handleAddSuggestionOpen();
  };

  const handleEditSuggestion = () => {
      if (selectedSuggestion) {
          handleEditSuggestionOpen(selectedSuggestion);
      }
  };

  const handleDeleteSuggestion = () => {
      if (selectedSuggestion) {
          const updatedSuggestions = suggestions.filter(suggestion => suggestion.id !== selectedSuggestion.id);
          setSuggestions(updatedSuggestions);
          handleDialogClose();
      }
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
                {suggestions.map((suggestion) => (
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

        {/* Add Suggestion Dialog */}
        <Dialog open={openAddDialog} onClose={handleAddSuggestionClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Suggestion</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Suggestion Title"
                    margin="normal"
                    value={newSuggestionTitle}
                    onChange={(e) => setNewSuggestionTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Suggestion Description"
                    margin="normal"
                    multiline
                    rows={3}
                    value={newSuggestionDescription}
                    onChange={(e) => setNewSuggestionDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddSuggestionClose}>Cancel</Button>
                <Button onClick={handleAddSuggestionSubmit} variant="contained" color="primary">
                    Add Suggestion
                </Button>
            </DialogActions>
        </Dialog>

        {/* Edit Suggestion Dialog */}
        <Dialog open={openEditDialog} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Suggestion</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Suggestion Title"
                    margin="normal"
                    value={editSuggestionTitle}
                    onChange={(e) => setEditSuggestionTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Suggestion Description"
                    margin="normal"
                    multiline
                    rows={3}
                    value={editSuggestionDescription}
                    onChange={(e) => setEditSuggestionDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditDialogClose}>Cancel</Button>
                <Button onClick={handleEditSuggestionSubmit} variant="contained" color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    </Container>
  );
};

export default AI;
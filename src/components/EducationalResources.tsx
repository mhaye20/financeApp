import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Article,
  OndemandVideo,
  Web,
  Search,
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'webinar';
  url: string;
  description: string;
}

const mockResources: Resource[] = [
  {
    id: 1,
    title: 'Understanding Market Volatility',
    type: 'article',
    url: 'https://example.com/article1',
    description: 'Learn how to navigate market fluctuations.',
  },
  {
    id: 2,
    title: 'Retirement Planning Basics',
    type: 'video',
    url: 'https://example.com/video1',
    description: 'A step-by-step guide to planning for retirement.',
  },
  {
    id: 3,
    title: 'Tax Efficient Investing',
    type: 'webinar',
    url: 'https://example.com/webinar1',
    description: 'Strategies to minimize your tax burden.',
  },
];

const EducationalResources: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState(mockResources);

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedResource(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = mockResources.filter((resource) =>
      resource.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResources(filtered);
  };

  const handleAddResource = () => {
    // Handle add resource logic here
    console.log('Add resource');
  };

  const handleEditResource = () => {
    // Handle edit resource logic here
    console.log('Edit resource');
  };

  const handleDeleteResource = () => {
    // Handle delete resource logic here
    console.log('Delete resource');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Article />;
      case 'video':
        return <OndemandVideo />;
      case 'webinar':
        return <Web />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Educational Resources
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Enhance your financial knowledge with our curated resources
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Resources"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddResource}
        >
          Add Resource
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredResources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
              onClick={() => handleResourceClick(resource)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <ListItemIcon>{getIcon(resource.type)}</ListItemIcon>
                  <Typography variant="h6" component="h2">
                    {resource.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  {resource.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Resource Details Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        {selectedResource && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getIcon(selectedResource.type)}
                {selectedResource.title}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong> {selectedResource.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>URL:</strong>{' '}
                <a href={selectedResource.url} target="_blank" rel="noopener noreferrer">
                  {selectedResource.url}
                </a>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
              <Button variant="contained" startIcon={<Edit />} onClick={handleEditResource}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteResource}>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default EducationalResources;
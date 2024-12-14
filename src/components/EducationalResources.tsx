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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Article,
  OndemandVideo,
  Web,
  Search,
  Add,
  Edit,
  Delete,
  Category,
} from '@mui/icons-material';

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'webinar';
  url: string;
  description: string;
  category: string;
}

const mockResources: Resource[] = [
  {
    id: 1,
    title: 'Understanding Market Volatility',
    type: 'article',
    url: 'https://example.com/article1',
    description: 'Learn how to navigate market fluctuations.',
    category: 'Market Analysis',
  },
  {
    id: 2,
    title: 'Retirement Planning Basics',
    type: 'video',
    url: 'https://example.com/video1',
    description: 'A step-by-step guide to planning for retirement.',
    category: 'Retirement Planning',
  },
  {
    id: 3,
    title: 'Tax Efficient Investing',
    type: 'webinar',
    url: 'https://example.com/webinar1',
    description: 'Strategies to minimize your tax burden.',
    category: 'Tax Planning',
  },
  {
    id: 4,
    title: 'Advanced Investment Strategies',
    type: 'article',
    url: 'https://example.com/article2',
    description: 'Explore advanced techniques for portfolio growth.',
    category: 'Investment Strategies',
  },
  {
    id: 5,
    title: 'Estate Planning Guide',
    type: 'video',
    url: 'https://example.com/video2',
    description: 'Learn how to plan your estate effectively.',
    category: 'Estate Planning',
  },
  {
    id: 6,
    title: 'Economic Outlook 2024',
    type: 'webinar',
    url: 'https://example.com/webinar2',
    description: 'A comprehensive look at the economic forecast for the year.',
    category: 'Market Analysis',
  },
];

const resourceTypes = ['article', 'video', 'webinar'];
const resourceCategories = [
  'Market Analysis',
  'Retirement Planning',
  'Tax Planning',
  'Investment Strategies',
  'Estate Planning',
];

const EducationalResources: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState(mockResources);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceType, setNewResourceType] = useState(resourceTypes[0]);
  const [newResourceUrl, setNewResourceUrl] = useState('');
  const [newResourceDescription, setNewResourceDescription] = useState('');
  const [newResourceCategory, setNewResourceCategory] = useState(resourceCategories[0]);
  const [editResourceTitle, setEditResourceTitle] = useState('');
  const [editResourceType, setEditResourceType] = useState(resourceTypes[0]);
  const [editResourceUrl, setEditResourceUrl] = useState('');
  const [editResourceDescription, setEditResourceDescription] = useState('');
  const [editResourceCategory, setEditResourceCategory] = useState(resourceCategories[0]);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [newResourceTitleError, setNewResourceTitleError] = useState('');
  const [newResourceUrlError, setNewResourceUrlError] = useState('');
  const [newResourceDescriptionError, setNewResourceDescriptionError] = useState('');
  const [editResourceTitleError, setEditResourceTitleError] = useState('');
  const [editResourceUrlError, setEditResourceUrlError] = useState('');
  const [editResourceDescriptionError, setEditResourceDescriptionError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedResource(null);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedResource(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = resources.filter((resource) =>
      resource.title.toLowerCase().includes(query.toLowerCase()) ||
      resource.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResources(filtered);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement> | any) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter((resource) => resource.category === category);
      setFilteredResources(filtered);
    }
  };

  const handleAddResourceOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddResourceClose = () => {
    setOpenAddDialog(false);
    resetAddResourceForm();
  };

  const handleEditResourceOpen = (resource: Resource) => {
    setSelectedResource(resource);
    setEditResourceTitle(resource.title);
    setEditResourceType(resource.type);
    setEditResourceUrl(resource.url);
    setEditResourceDescription(resource.description);
    setEditResourceCategory(resource.category);
    setOpenEditDialog(true);
  };

  const resetAddResourceForm = () => {
    setNewResourceTitle('');
    setNewResourceType(resourceTypes[0]);
    setNewResourceUrl('');
    setNewResourceDescription('');
    setNewResourceCategory(resourceCategories[0]);
    setNewResourceTitleError('');
    setNewResourceUrlError('');
    setNewResourceDescriptionError('');
  };

  const validateAddResourceForm = () => {
    let isValid = true;

    if (!newResourceTitle) {
      setNewResourceTitleError('Please enter a title');
      isValid = false;
    } else {
      setNewResourceTitleError('');
    }

    if (!newResourceUrl) {
      setNewResourceUrlError('Please enter a URL');
      isValid = false;
    } else {
      setNewResourceUrlError('');
    }

    if (!newResourceDescription) {
      setNewResourceDescriptionError('Please enter a description');
      isValid = false;
    } else {
      setNewResourceDescriptionError('');
    }

    return isValid;
  };

  const validateEditResourceForm = () => {
    let isValid = true;

    if (!editResourceTitle) {
      setEditResourceTitleError('Please enter a title');
      isValid = false;
    } else {
      setEditResourceTitleError('');
    }

    if (!editResourceUrl) {
      setEditResourceUrlError('Please enter a URL');
      isValid = false;
    } else {
      setEditResourceUrlError('');
    }

    if (!editResourceDescription) {
      setEditResourceDescriptionError('Please enter a description');
      isValid = false;
    } else {
      setEditResourceDescriptionError('');
    }

    return isValid;
  };

  const handleAddResourceSubmit = () => {
    if (!validateAddResourceForm()) {
      return;
    }
    const newResource: Resource = {
      id: resources.length + 1,
      title: newResourceTitle,
      type: newResourceType as 'article' | 'video' | 'webinar',
      url: newResourceUrl,
      description: newResourceDescription,
      category: newResourceCategory,
    };
    setResources([...resources, newResource]);
    setFilteredResources([...resources, newResource]);
    handleAddResourceClose();
  };

  const handleEditResourceSubmit = () => {
    if (!validateEditResourceForm()) {
      return;
    }
    if (selectedResource) {
      const updatedResource = {
        ...selectedResource,
        title: editResourceTitle,
        type: editResourceType as 'article' | 'video' | 'webinar',
        url: editResourceUrl,
        description: editResourceDescription,
        category: editResourceCategory,
      };
      setResources(resources.map(resource => resource.id === selectedResource.id ? updatedResource : resource));
      setFilteredResources(resources.map(resource => resource.id === selectedResource.id ? updatedResource : resource));
      handleEditDialogClose();
    }
  };

  const handleDeleteResource = () => {
    if (selectedResource) {
      const updatedResources = resources.filter(resource => resource.id !== selectedResource.id);
      setResources(updatedResources);
      setFilteredResources(updatedResources);
      handleDialogClose();
    }
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
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
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="All">All Categories</MenuItem>
            {resourceCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddResourceOpen}
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
                <Typography color="text.secondary" gutterBottom>
                  {resource.description}
                </Typography>
                <Chip label={resource.category} size="small" color="primary" variant="outlined" />
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
              <Typography variant="body1" gutterBottom>
                <strong>Category:</strong> {selectedResource.category}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
              <Button variant="contained" startIcon={<Edit />} onClick={() => handleEditResourceOpen(selectedResource)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteResource}>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Resource Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddResourceClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Resource</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={newResourceTitle}
            onChange={(e) => setNewResourceTitle(e.target.value)}
            error={!!newResourceTitleError}
            helperText={newResourceTitleError}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Resource Type</InputLabel>
            <Select
              value={newResourceType}
              onChange={(e) => setNewResourceType(e.target.value)}
              label="Resource Type"
            >
              {resourceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={newResourceCategory}
              onChange={(e) => setNewResourceCategory(e.target.value)}
              label="Category"
            >
              {resourceCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="URL"
            margin="normal"
            value={newResourceUrl}
            onChange={(e) => setNewResourceUrl(e.target.value)}
            error={!!newResourceUrlError}
            helperText={newResourceUrlError}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={newResourceDescription}
            onChange={(e) => setNewResourceDescription(e.target.value)}
            error={!!newResourceDescriptionError}
            helperText={newResourceDescriptionError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddResourceClose}>Cancel</Button>
          <Button onClick={handleAddResourceSubmit} variant="contained" color="primary">
            Add Resource
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Resource Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Resource</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={editResourceTitle}
            onChange={(e) => setEditResourceTitle(e.target.value)}
            error={!!editResourceTitleError}
            helperText={editResourceTitleError}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Resource Type</InputLabel>
            <Select
              value={editResourceType}
              onChange={(e) => setEditResourceType(e.target.value)}
              label="Resource Type"
            >
              {resourceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={editResourceCategory}
              onChange={(e) => setEditResourceCategory(e.target.value)}
              label="Category"
            >
              {resourceCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="URL"
            margin="normal"
            value={editResourceUrl}
            onChange={(e) => setEditResourceUrl(e.target.value)}
            error={!!editResourceUrlError}
            helperText={editResourceUrlError}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={editResourceDescription}
            onChange={(e) => setEditResourceDescription(e.target.value)}
            error={!!editResourceDescriptionError}
            helperText={editResourceDescriptionError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditResourceSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EducationalResources;
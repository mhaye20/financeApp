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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Slider,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import {
  Palette,
  Brush,
  Image,
  Settings,
  Edit,
  Delete,
  Add as AddIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';

const ColorPicker = styled('input')({
  appearance: 'none',
  width: 40,
  height: 40,
  border: 'none',
  cursor: 'pointer',
  '&::-webkit-color-swatch-wrapper': {
    padding: 0,
  },
  '&::-webkit-color-swatch': {
    border: 'none',
    borderRadius: 4,
  },
  '&::-moz-color-swatch-wrapper': {
    padding: 0,
  },
  '&::-moz-color-swatch': {
    border: 'none',
    borderRadius: 4,
  },
});

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: number;
  darkMode: boolean;
}

interface Template {
    id: number;
    name: string;
    type: 'newsletter' | 'report';
}

const initialThemeSettings: ThemeSettings = {
  primaryColor: '#1976d2',
  secondaryColor: '#9c27b0',
  fontFamily: 'Roboto',
  borderRadius: 8,
  darkMode: false,
};

const mockTemplates: Template[] = [
    {
        id: 1,
        name: 'Newsletter',
        type: 'newsletter',
    },
    {
        id: 2,
        name: 'Report',
        type: 'report',
    },
];

interface CustomizationProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

const Customization: React.FC<CustomizationProps> = ({ darkMode, setDarkMode }) => {
  const [themeSettings, setThemeSettings] = useState(initialThemeSettings);
  const [openDialog, setOpenDialog] = useState(false);
    const [openAddTemplateDialog, setOpenAddTemplateDialog] = useState(false);
    const [openEditTemplateDialog, setOpenEditTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
				const [newTemplateName, setNewTemplateName] = useState('');
    const [newTemplateType, setNewTemplateType] = useState<'newsletter' | 'report'>('newsletter');
    const [editTemplateName, setEditTemplateName] = useState('');
    const [editTemplateType, setEditTemplateType] = useState<'newsletter' | 'report'>('newsletter');
    const [templates, setTemplates] = useState<Template[]>(mockTemplates);

  const handleThemeChange = (
				event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ThemeSettings
  ) => {
    setThemeSettings({ ...themeSettings, [key]: event.target.value });
  };

  const handleSliderChange = (
				event: Event,
    newValue: number | number[]
  ) => {
    setThemeSettings({ ...themeSettings, borderRadius: newValue as number });
  };

  const handleToggleChange = (
				event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDarkMode(event.target.checked);
  };

  const handleFontChange = (
				event: SelectChangeEvent<string>,
  ) => {
    setThemeSettings({ ...themeSettings, fontFamily: event.target.value });
  };

		const handleTemplateClick = (template: string) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

		const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTemplate(null);
  };

    const handleEditTemplateOpen = (template: Template) => {
        setSelectedTemplate(template.name);
								setEditTemplateName(template.name);
        setEditTemplateType(template.type);
        setOpenEditTemplateDialog(true);
    };

				const handleEditTemplateClose = () => {
        setOpenEditTemplateDialog(false);
        setSelectedTemplate(null);
    };

    const handleEditTemplateSubmit = () => {
        if (selectedTemplate) {
            const updatedTemplates = templates.map(template => {
                if (template.name === selectedTemplate) {
                    return {
                        ...template,
                        name: editTemplateName,
                        type: editTemplateType,
                    };
                }
                return template;
            });
												setTemplates(updatedTemplates);
            handleEditTemplateClose();
        }
    };

    const handleAddTemplateOpen = () => {
        setOpenAddTemplateDialog(true);
    };

				const handleAddTemplateClose = () => {
        setOpenAddTemplateDialog(false);
        resetAddTemplateForm();
    };

				const resetAddTemplateForm = () => {
        setNewTemplateName('');
        setNewTemplateType('newsletter');
    };

    const handleAddTemplateSubmit = () => {
        const newTemplate: Template = {
            id: templates.length + 1,
            name: newTemplateName,
            type: newTemplateType,
								};
        setTemplates([...templates, newTemplate]);
        handleAddTemplateClose();
    };

  const handleAddTemplate = () => {
      handleAddTemplateOpen();
  };

  const handleEditTemplate = () => {
      if (selectedTemplate) {
          const template = templates.find(template => template.name === selectedTemplate);
          if (template) {
														handleEditTemplateOpen(template);
          }
      }
  };

  const handleDeleteTemplate = () => {
      if (selectedTemplate) {
          const updatedTemplates = templates.filter(template => template.name !== selectedTemplate);
										setTemplates(updatedTemplates);
          handleDialogClose();
      }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customization & Branding
        </Typography>
								<Typography variant="subtitle1" color="text.secondary">
          Personalize the app with your brand and style
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
                <Typography variant="h6">Theme Settings</Typography>
                <Settings color="primary" />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Primary Color</Typography>
                  <ColorPicker
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => handleThemeChange(e, 'primaryColor')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Secondary Color</Typography>
                  <ColorPicker
                    type="color"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => handleThemeChange(e, 'secondaryColor')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Font Family</Typography>
                  <FormControl fullWidth>
                    <InputLabel>Font</InputLabel>
                    <Select
                      value={themeSettings.fontFamily}
                      onChange={handleFontChange}
                      label="Font"
                    >
                      <MenuItem value="Roboto">Roboto</MenuItem>
                      <MenuItem value="Arial">Arial</MenuItem>
                      <MenuItem value="Helvetica">Helvetica</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Border Radius</Typography>
                  <Slider
                    value={themeSettings.borderRadius}
                    onChange={handleSliderChange}
                    min={0}
                    max={20}
                    step={1}
                    aria-label="Border Radius"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={darkMode}
                          onChange={handleToggleChange}
                        />
                      }
                      label="Dark Mode"
                    />
                  </FormGroup>
                </Grid>
														</Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
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
                <Typography variant="h6">Templates</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddTemplate}
                >
                  Add Template
                </Button>
              </Box>
              <Grid container spacing={2}>
                {templates.map((template) => (
                    <Grid item xs={12} sm={6} key={template.id}>
                        <Card
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                boxShadow: 1,
                                gap: 1,
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    transition: 'transform 0.3s ease-in-out',
                                },
                            }}
                            onClick={() => handleTemplateClick(template.name)}
                        >
                            {template.type === 'newsletter' ? <Brush color="primary" /> : <Image color="primary" />}
                            <Typography variant="body1">{template.name}</Typography>
                        </Card>
                    </Grid>
                ))}
              </Grid>
												</CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Template Details Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        {selectedTemplate && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Palette />
                {selectedTemplate} Template
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                Customize your {selectedTemplate} template here.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
              <Button variant="contained" startIcon={<Edit />} onClick={handleEditTemplate}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteTemplate}>
                Delete
              </Button>
												</DialogActions>
          </>
        )}
      </Dialog>

        {/* Add Template Dialog */}
        <Dialog open={openAddTemplateDialog} onClose={handleAddTemplateClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Template</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Template Name"
                    margin="normal"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Template Type</InputLabel>
                    <Select
                        value={newTemplateType}
                        onChange={(e) => setNewTemplateType(e.target.value as 'newsletter' | 'report')}
                        label="Template Type"
                    >
                        <MenuItem value="newsletter">Newsletter</MenuItem>
                        <MenuItem value="report">Report</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddTemplateClose}>Cancel</Button>
                <Button onClick={handleAddTemplateSubmit} variant="contained" color="primary">
																				Add Template
                </Button>
            </DialogActions>
        </Dialog>

        {/* Edit Template Dialog */}
        <Dialog open={openEditTemplateDialog} onClose={handleEditTemplateClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Template Name"
                    margin="normal"
                    value={editTemplateName}
                    onChange={(e) => setEditTemplateName(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Template Type</InputLabel>
                    <Select
                        value={editTemplateType}
                        onChange={(e) => setEditTemplateType(e.target.value as 'newsletter' | 'report')}
                        label="Template Type"
                    >
                        <MenuItem value="newsletter">Newsletter</MenuItem>
                        <MenuItem value="report">Report</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditTemplateClose}>Cancel</Button>
                <Button onClick={handleEditTemplateSubmit} variant="contained" color="primary">
                    Save Changes
                </Button>
												</DialogActions>
								</Dialog>
				</Container>
		);
};

export default Customization;
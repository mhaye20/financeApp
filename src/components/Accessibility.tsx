import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Switch,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Accessibility as AccessibilityIcon,
  Contrast,
  TextFormat,
  VolumeUp,
} from '@mui/icons-material';

interface AccessibilitySettings {
  highContrast: boolean;
  textSize: number;
  screenReader: boolean;
  voiceControl: boolean;
}

const initialAccessibilitySettings: AccessibilitySettings = {
  highContrast: false,
  textSize: 16,
  screenReader: false,
  voiceControl: false,
};

const Accessibility: React.FC = () => {
  const [accessibilitySettings, setAccessibilitySettings] = useState(
    initialAccessibilitySettings
  );

  const handleToggleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof AccessibilitySettings
  ) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      [key]: event.target.checked,
    });
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      textSize: newValue as number,
    });
  };

  const handleFontChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof AccessibilitySettings
  ) => {
    setAccessibilitySettings({ ...accessibilitySettings, [key]: event.target.value });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Accessibility Features
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Customize the app for diverse client needs
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
                <Typography variant="h6">Visual Adjustments</Typography>
                <AccessibilityIcon color="primary" />
              </Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibilitySettings.highContrast}
                      onChange={(e) => handleToggleChange(e, 'highContrast')}
                    />
                  }
                  label="High Contrast Mode"
                />
              </FormGroup>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Text Size</Typography>
                <Slider
                  value={accessibilitySettings.textSize}
                  onChange={handleSliderChange}
                  min={12}
                  max={24}
                  step={1}
                  aria-label="Text Size"
                />
              </Box>
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
                <Typography variant="h6">Assistive Technologies</Typography>
                <VolumeUp color="primary" />
              </Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibilitySettings.screenReader}
                      onChange={(e) => handleToggleChange(e, 'screenReader')}
                    />
                  }
                  label="Screen Reader Support"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibilitySettings.voiceControl}
                      onChange={(e) => handleToggleChange(e, 'voiceControl')}
                    />
                  }
                  label="Voice Control"
                />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accessibility;
import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  LandingPage,
  CommunicationHub,
  ClientManagement,
  InteractiveDashboard,
  EducationalResources,
  Analytics,
  ReferralSystem,
  Customization,
  Compliance,
  Accessibility,
  AI
} from './components';
import { Layout } from './components/layout';
import { theme as lightTheme } from './styles/theme';
import { createTheme } from '@mui/material/styles';
import './styles/styles.css';

interface AccessibilitySettings {
    highContrast: boolean;
				textSize: number;
    fontFamily: string;
}

const initialAccessibilitySettings: AccessibilitySettings = {
    highContrast: false,
    textSize: 16,
    fontFamily: 'Roboto',
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
    const [accessibilitySettings, setAccessibilitySettings] = useState(initialAccessibilitySettings);

  const theme = useMemo(() => {
      const baseTheme = createTheme({
          ...lightTheme,
          palette: {
              ...lightTheme.palette,
														mode: darkMode ? 'dark' : 'light',
														background: {
																		default: darkMode ? '#303030' : '#F5F5F5',
																		paper: darkMode ? '#424242' : '#FFFFFF',
														},
														text: {
																		primary: darkMode ? '#FFFFFF' : '#212121',
																		secondary: darkMode ? '#BDBDBD' : '#757575',
														},
										},
										components: {
														...lightTheme.components,
														MuiAppBar: {
																		styleOverrides: {
																						root: {
																										backgroundColor: darkMode ? '#424242' : '#ffffff',
																										color: darkMode ? '#ffffff' : '#212121',
																						},
																		},
														},
														MuiDrawer: {
																		styleOverrides: {
																						paper: {
																										backgroundColor: darkMode ? '#424242' : '#ffffff',
																										borderRight: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
																						},
																		},
														},
														MuiTableHead: {
																		styleOverrides: {
																						root: {
																										backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
																						},
																		},
														},
														MuiTableCell: {
																		styleOverrides: {
																						root: {
																										borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
																						},
																						head: {
																										color: darkMode ? '#ffffff' : '#212121',
																						},
																		},
														},
										},
						});

						return createTheme({
										...baseTheme,
										palette: {
														...baseTheme.palette,
														...(accessibilitySettings.highContrast
																		? {
																						primary: {
																										main: '#000000',
																										light: '#000000',
																										dark: '#000000',
																										contrastText: '#ffffff',
																						},
																						secondary: {
																										main: '#ffffff',
																										light: '#ffffff',
																										dark: '#ffffff',
																										contrastText: '#000000',
																						},
																						background: {
																										default: darkMode ? '#000000' : '#ffffff',
																										paper: darkMode ? '#000000' : '#ffffff',
																						},
																						text: {
																										primary: darkMode ? '#ffffff' : '#000000',
																										secondary: darkMode ? '#ffffff' : '#000000',
																						},
																		}
																		: {}),
										},
										typography: {
														...baseTheme.typography,
														fontSize: accessibilitySettings.textSize,
														fontFamily: accessibilitySettings.fontFamily,
										},
						});
		}, [darkMode, accessibilitySettings]);

		return (
				<ThemeProvider theme={theme}>
						<CssBaseline />
								<Layout>
										<Routes>
												<Route path="/" element={<LandingPage />} />
												<Route path="/communication" element={<CommunicationHub />} />
												<Route path="/clients" element={<ClientManagement />} />
												<Route path="/dashboard" element={<InteractiveDashboard />} />
												<Route path="/resources" element={<EducationalResources />} />
												<Route path="/analytics" element={<Analytics />} />
												<Route path="/referrals" element={<ReferralSystem />} />
												<Route path="/customize" element={<Customization darkMode={darkMode} setDarkMode={setDarkMode} />} />
												<Route path="/compliance" element={<Compliance />} />
												<Route path="/accessibility" element={<Accessibility accessibilitySettings={accessibilitySettings} setAccessibilitySettings={setAccessibilitySettings} />} />
												<Route path="/ai-assistant" element={<AI />} />
												<Route path="*" element={<Navigate to="/" replace />} />
										</Routes>
								</Layout>
				</ThemeProvider>
		);
}

export default App;

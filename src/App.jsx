import React from 'react';
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
import { theme } from './styles/theme';
import './styles/styles.css';

function App() {
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
            <Route path="/customize" element={<Customization />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/ai-assistant" element={<AI />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
    </ThemeProvider>
  );
}

export default App;

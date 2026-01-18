import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// --- LAYOUT COMPONENTS ---
import Sidebar from './components/Layout/Sidebar';
import GlobalHeader from './components/Layout/GlobalHeader';

// --- FEATURE MODULES ---
import Overview from './modules/Overview/Overview';
import LiveMap from './modules/LiveMap/LiveMap';
import Ports from './modules/Ports/Ports';
import Dashboard from './modules/Analytics/Dashboard';
import VoyageReplay from './modules/History/VoyageReplay';
import NotificationModule from './modules/Notifications/NotificationModule';
import ProfileModule from './modules/Profile/ProfileModule';
import AdminTools from './modules/Admin/AdminTools';
import Login from './modules/Auth/Login';
import Signup from './modules/Auth/Signup';
import Vessels from './components/Vessels.js';
/**
 * Layout Wrapper to conditionally show Sidebar/Header
 */
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return <div style={{ width: '100vw', height: '100vh' }}>{children}</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <main style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f1f5f9' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Auth Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Core Operational Routes */}
          <Route path="/overview" element={<Overview />} />
          <Route path="/map" element={<LiveMap />} />
          <Route path="/ports" element={<Ports />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/replay" element={<VoyageReplay />} />
          <Route path="/vessels" element={<Vessels/>} />
          {/* Header-Driven Routes */}
          <Route path="/notifications" element={<NotificationModule />} />
          <Route path="/profile" element={<ProfileModule />} />
          
          {/* Admin Route */}
          <Route path="/admin" element={<AdminTools />} />

          {/* Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={
            <div style={{ padding: '100px', textAlign: 'center' }}>
              <h2>404 - Not Found</h2>
              <button onClick={() => window.location.href='/login'}>Back to Home</button>
            </div>
          } />
        </Routes>
      </AppLayout>
    </Router>
  );
}

// --- GLOBAL UI STYLES ---
const styles = {
  appWrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif",
    background: '#f8fafc'
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden'
  },
  modulePadding: {
    flex: 1,
    padding: '25px',
    overflowY: 'auto',
    background: '#f1f5f9'
  }
};

export default App;

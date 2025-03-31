import React, { useState, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './pages/dashboard';
import Consultation from './pages/consultation';
import Home from './pages/home';
import Reports from './pages/reports';
import SignIn from './components/Authentication/signIn';
import SignUp from './components/Authentication/signUp';
import PrivateRoute from './components/Authentication/privateRoute';
import { AuthProvider, useAuth } from './context/authContext';
import Navbar from './components/navbar';
import BackgroundBubbles from './components/backgroundBubbles';

// Theme context
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function AppContent() {
  const [mode, setMode] = useState('dark');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#1976d2' },
                background: { default: '#f5f5f5', paper: '#ffffff' },
                text: { primary: '#000000', secondary: '#666666' },
              }
            : {
                primary: { main: '#00ccff' },
                background: { default: '#1a1b2e', paper: '#2a2b4e' },
                text: { primary: '#ffffff', secondary: '#bbbbbb' },
              }),
        },
      }),
    [mode]
  );

  const [sweatData, setSweatData] = useState({
    sodium: 0,
    glucose: 0,
    hydration: 0,
    lactate: 0,
  });
const socket = io('https://sweatsensorbackend.onrender.com/', {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    transports: ['websocket'],
  });

  useEffect(() => {
    console.log('Connecting to socket at:', socket.io.uri);

    socket.on('connect', () => {
      console.log('Socket connected successfully at:', socket.io.uri);
    });

    socket.on('sweatData', (data) => {
      console.log('Received sweat data:', data);
      setSweatData(data);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected due to:', reason);
    });

    socket.on('reconnect', (attempt) => {
      console.log('Reconnected after', attempt, 'attempts');
    });

    socket.on('connect_error', (error) => {
      console.log('Connection error:', error.message);
    });

    return () => {
      socket.off('sweatData');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('reconnect');
      socket.off('connect_error');
    };
  }, []);

  // Calculate sidebar width for main content positioning
  const drawerWidth = 260;
  const collapsedWidth = 80;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Pass needed props to Navbar component */}
            <BackgroundBubbles />
            <Navbar colorMode={colorMode} mode={mode} />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { md: `calc(100% - ${collapsedWidth}px)` }, // Default to collapsed width
                background: muiTheme.palette.background.default,
                transition: 'all 0.3s ease',
                color: muiTheme.palette.text.primary,
              }}
            >
              <Container maxWidth="lg">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/how-it-works" element={<Home />} />
                  <Route path="/testimonials" element={<Home />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard sweatData={sweatData}/>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/consultation"
                    element={
                      <PrivateRoute>
                        <Consultation />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <PrivateRoute>
                        <Reports />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <PrivateRoute>
                        <Typography>Settings (Under Construction)</Typography>
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Container>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
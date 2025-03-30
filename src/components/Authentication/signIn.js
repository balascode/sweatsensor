import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  useTheme,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon, 
  VisibilityOff as VisibilityOffIcon 
} from '@mui/icons-material';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { io } from 'socket.io-client';

function SignIn() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [sweatData, setSweatData] = useState({
    sodium: 0,
    glucose: 0,
    hydration: 0,
    lactate: 0,
  });
  const [socket, setSocket] = useState(null);
  
  const { signin, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const socket = initializeSocket();
      setSocket(socket);
      navigate('/dashboard', { state: { sweatData } });
    }
  }, [currentUser, navigate]);

  // Listen for sweat data updates and update state
  useEffect(() => {
    if (socket) {
      // When sweat data is updated, update state and pass to dashboard if logged in
      socket.on('sweatData', (data) => {
        console.log('Received sweat data:', data);
        setSweatData(data);
        
        // If user is logged in, update the dashboard state with new data
        if (currentUser) {
          navigate('/dashboard', { 
            state: { sweatData: data },
            replace: true // Replace current history entry to avoid navigation stack issues
          });
        }
      });
      
      return () => {
        socket.off('sweatData');
      };
    }
  }, [socket, currentUser, navigate]);

  const initializeSocket = () => {
    const socketInstance = io('https://sweatsensorbackend.onrender.com/', {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    console.log('Connecting to socket at:', socketInstance.io.uri);

    socketInstance.on('connect', () => {
      console.log('Socket connected successfully at:', socketInstance.io.uri);
      setSnackbar({
        open: true,
        message: 'Connected to SweatSense device',
        severity: 'success'
      });
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket disconnected due to:', reason);
      setSnackbar({
        open: true,
        message: 'Disconnected from SweatSense device',
        severity: 'warning'
      });
    });

    socketInstance.on('reconnect', (attempt) => {
      console.log('Reconnected after', attempt, 'attempts');
      setSnackbar({
        open: true,
        message: `Reconnected to SweatSense after ${attempt} attempts`,
        severity: 'success'
      });
    });

    socketInstance.on('connect_error', (error) => {
      console.log('Connection error:', error.message);
      setSnackbar({
        open: true,
        message: 'Connection error: ' + error.message,
        severity: 'error'
      });
    });

    return socketInstance;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      await signin(email, password);
      
      // Initialize socket connection
      const socketInstance = initializeSocket();
      setSocket(socketInstance);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Sign in successful! Connecting to SweatSense...',
        severity: 'success'
      });
      
      // Navigate to dashboard with the current sweat data
      navigate('/dashboard', { state: { sweatData } });
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  // Create gradient strings for consistent styling
  const createGradient = (start, end) => `linear-gradient(45deg, ${start}, ${end})`;
  const primaryGradient = createGradient('#00ffcc', '#00ccff');
  const hoverGradient = createGradient('#00ccff', '#00ffcc');

  // Clean up socket connection when component unmounts
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          zIndex: 0,
        }
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: { xs: '100%', sm: 430 },
          p: 4,
          borderRadius: 3,
          background: theme.palette.background.paper,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 10px 40px rgba(0,0,0,0.6)'
            : '0 10px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: primaryGradient,
            zIndex: 2,
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: primaryGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            Sign in to your SweatSense account to track your performance
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: theme.palette.error.main
              }
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: '#00ccff',
                }
              }
            }}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: '#00ccff',
                }
              }
            }}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Typography
              component={NavLink}
              to="/reset-password"
              variant="body2"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              background: primaryGradient,
              color: '#fff',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              transition: 'all 0.3s',
              boxShadow: '0 4px 10px rgba(0,204,255,0.3)',
              '&:hover': {
                background: hoverGradient,
                boxShadow: '0 6px 15px rgba(0,204,255,0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 5px rgba(0,204,255,0.3)',
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Sign In'
            )}
          </Button>
          
          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography 
                variant="body2" 
                component="span"
                sx={{ 
                  color: theme.palette.text.secondary,
                  px: 1,
                  fontWeight: 500
                }}
              >
                OR
              </Typography>
            </Divider>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Don't have an account?{' '}
              <Typography
                component={NavLink}
                to="/signup"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: primaryGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </form>
      </Paper>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SignIn;
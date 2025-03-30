import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  useTheme, 
  Container, 
  Paper, 
  InputAdornment, 
  IconButton,
  Link,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

function SignUp() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setError('');
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account.');
      console.error(err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={6} 
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          fontWeight="700" 
          sx={{ mb: 4, color: theme.palette.primary.main }}
        >
          Create Your Account
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: 1 }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 3 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mb: 4 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large"
            sx={{ 
              py: 1.5, 
              mb: 3, 
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Create Account
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AppleIcon />}
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Sign up with Apple
            </Button>
          </Box> */}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                href="/login" 
                underline="hover"
                sx={{ fontWeight: 600, color: theme.palette.primary.main }}
              >
                Log In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUp;
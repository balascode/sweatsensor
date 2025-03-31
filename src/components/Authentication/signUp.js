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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Email validation regex - checks for @ and . in the email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation - checks if password is at least 8 characters
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword && !validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }

    // Check if confirm password still matches
    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    
    if (newConfirmPassword && newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    let hasError = false;
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      hasError = true;
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    try {
      setError('');
      await signup(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      
      // Check for error code or message that indicates the email is already in use
      // Firebase example: err.code === 'auth/email-already-in-use'
      // This needs to be adapted based on your authentication provider
      if (err.code === 'auth/email-already-in-use' || 
          (err.message && err.message.includes('email already in use'))) {
        setError('An account with this email already exists. Please log in instead.');
        setEmailError('Email address already in use');
      } else {
        setError('Failed to create an account. Please try again.');
      }
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
            action={
              error.includes('already exists') ? (
                <Button color="inherit" size="small" onClick={() => navigate('/signin')}>
                  Log In
                </Button>
              ) : undefined
            }
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
            onChange={handleEmailChange}
            required
            error={!!emailError}
            helperText={emailError}
            sx={{ mb: 3 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color={emailError ? "error" : "primary"} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            required
            error={!!passwordError}
            helperText={passwordError}
            sx={{ mb: 3 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color={passwordError ? "error" : "primary"} />
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
            onChange={handleConfirmPasswordChange}
            required
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            sx={{ mb: 4 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color={confirmPasswordError ? "error" : "primary"} />
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

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                href="/signin" 
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
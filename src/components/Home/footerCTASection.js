import React from 'react';
import { Box, Button, Container, Typography, Zoom, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const FooterCTASection = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();

  return (
    <Box sx={{
      py: { xs: 6, md: 8 },
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(145deg, #1a1b2e 0%, #2a2b4e 100%)'
        : '#f0f4f8',
    }}>
      <Container maxWidth="md">
        <Zoom in={true} timeout={1000}>
          <Box sx={{
            textAlign: 'center',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(145deg, rgba(42,43,78,0.8), rgba(26,27,46,0.9))'
              : 'white',
            p: { xs: 4, md: 6 },
            borderRadius: 8,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 20px 80px rgba(0,204,255,0.2)'
              : '0 20px 80px rgba(0,0,0,0.1)',
          }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              Ready to experience SweatSense?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Join our community and transform how you monitor your health and performance.
            </Typography>
            <Button
              component={NavLink}
              to={currentUser ? "/dashboard" : "/signup"}
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                color: '#fff',
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(0,204,255,0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00ccff, #00ffcc)',
                  boxShadow: '0 15px 30px rgba(0,204,255,0.5)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {currentUser ? "Go to Dashboard" : "Get Started Free"}
            </Button>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
};

export default FooterCTASection;
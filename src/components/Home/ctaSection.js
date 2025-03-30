import React from 'react';
import { Box, Button, Container, Typography, Slide, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { ChevronRight as ArrowRightIcon } from '@mui/icons-material';

const CTASection = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();

  return (
    <Box sx={{
      py: { xs: 8, md: 12 },
      background: 'linear-gradient(135deg, #00ffcc 0%, #00ccff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }} id="cta">
      <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatBubble ${Math.random() * 10 + 15}s infinite linear`,
              '@keyframes floatBubble': {
                '0%': { transform: 'translateY(0) translateX(0) scale(1)' },
                '33%': { transform: 'translateY(-30px) translateX(30px) scale(1.1)' },
                '66%': { transform: 'translateY(20px) translateX(-20px) scale(0.9)' },
                '100%': { transform: 'translateY(0) translateX(0) scale(1)' }
              }
            }}
          />
        ))}
      </Box>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Slide direction="up" in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', color: '#fff' }}>
            <Typography variant="h2" fontWeight="bold" sx={{ mb: 3 }}>
              Ready to Transform Your Health?
            </Typography>
            <Typography variant="h5" sx={{ mb: 5, opacity: 0.9 }}>
              Join thousands of users who are revolutionizing how they monitor their health and performance.
            </Typography>
            <Button
              component={NavLink}
              to={currentUser ? "/dashboard" : "/signup"}
              variant="contained"
              size="large"
              endIcon={<ArrowRightIcon />}
              sx={{
                background: '#fff',
                color: '#00ccff',
                px: 5,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                '&:hover': {
                  background: '#f8f9fa',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              {currentUser ? "Go to Dashboard" : "Get Started Now"}
            </Button>
          </Box>
        </Slide>
      </Container>
    </Box>
  );
};

export default CTASection;
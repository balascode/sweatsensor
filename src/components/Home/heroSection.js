import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Container,
  Fade,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import {
  ArrowDownward as ScrollIcon,
  ChevronRight as ArrowRightIcon,
} from '@mui/icons-material';

const HeroSection = ({ scrollToFeatures }) => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100vh - 80px)', md: '100vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a1b2e 0%, #2a2b4e 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        pt: { xs: 8, md: 0 },
      }}
      id="herosection"
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {[...Array(10)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.05,
              filter: 'blur(1px)',
              transform: `translateY(${offset * Math.random() * 0.3}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        ))}
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 3, md: 4 },
        }}
      >
        {/* Main Flex Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', lg: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Text Content */}
          <Box
            sx={{
              width: { xs: '100%', lg: '50%' },
              textAlign: { xs: 'center', lg: 'left' },
              mt: { xs: -2, lg: 0 },
            }}
          >
            <Fade in={true} timeout={800}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: { xs: '2.75rem', sm: '3.5rem', lg: '4.5rem' },
                  lineHeight: 1.1,
                }}
              >
                SweatSense
              </Typography>
            </Fade>

            <Fade in={true} timeout={1000} style={{ transitionDelay: '150ms' }}>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 4,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', lg: '1.5rem' },
                  fontWeight: 400,
                  maxWidth: { lg: '90%' },
                }}
              >
                Revolutionize your health monitoring with precise, real-time
                sweat analysis
              </Typography>
            </Fade>

            <Fade in={true} timeout={1200} style={{ transitionDelay: '300ms' }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2.5,
                  flexDirection: { xs: isSmall ? 'column' : 'row', lg: 'row' },
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                {!currentUser ? (
                  <>
                    <Button
                      component={NavLink}
                      to="/signin"
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                        color: '#fff',
                        px: { xs: 3, lg: 4 },
                        py: 1.5,
                        borderRadius: '12px',
                        fontWeight: 600,
                        boxShadow: '0 8px 16px rgba(0,204,255,0.25)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00ccff, #00ffcc)',
                          boxShadow: '0 12px 20px rgba(0,204,255,0.35)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                        minWidth: { xs: isSmall ? '100%' : '160px', lg: '160px' },
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={scrollToFeatures}
                      sx={{
                        borderColor:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.3)'
                            : 'rgba(0,0,0,0.2)',
                        color: theme.palette.text.primary,
                        px: { xs: 3, lg: 4 },
                        py: 1.5,
                        borderRadius: '12px',
                        fontWeight: 600,
                        borderWidth: 1.5,
                        '&:hover': {
                          background:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(0,0,0,0.03)',
                          borderColor:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.5)'
                              : 'rgba(0,0,0,0.3)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                        minWidth: { xs: isSmall ? '100%' : '160px', lg: '160px' },
                      }}
                    >
                      Learn More
                    </Button>
                  </>
                ) : (
                  <Button
                    component={NavLink}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRightIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                      color: '#fff',
                      px: 4,
                      py: 1.5,
                      borderRadius: '12px',
                      fontWeight: 600,
                      boxShadow: '0 8px 16px rgba(0,204,255,0.25)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00ccff, #00ffcc)',
                        boxShadow: '0 12px 20px rgba(0,204,255,0.35)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Go to Dashboard
                  </Button>
                )}
              </Box>
            </Fade>
          </Box>

          {/* Image/Device Display */}
          <Box
            sx={{
              width: { xs: '100%', lg: '50%' },
              display: 'flex',
              justifyContent: { xs: 'center', lg: 'flex-end' },
            }}
          >
            <Fade in={true} timeout={1200}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '250px', sm: '300px', lg: '400px' },
                  borderRadius: { xs: 4, lg: 8 },
                  overflow: 'hidden',
                  boxShadow: '0 15px 50px rgba(0,204,255,0.2)',
                  transform: `translateY(${offset * -0.1}px)`,
                  transition: 'transform 0.1s ease-out',
                  maxWidth: { xs: '80%', sm: '70%', lg: '90%' },
                }}
              >
                <Box
                  component="img"
                  src="/images/sweatsensordevice1.png"
                  alt="SweatSense Device"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(45deg, rgba(0,255,204,0.15), rgba(0,204,255,0.15))',
                  }}
                />
              </Box>
            </Fade>
          </Box>
        </Box>

        {/* Scroll indicator */}
        <Fade in={true} timeout={1500} style={{ transitionDelay: '700ms' }}>
          <Box
            sx={{
              textAlign: 'center',
              mt: { xs: 4, lg: 8 },
              mb: 2,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.7, transform: 'translateY(0)' },
                '50%': { opacity: 1, transform: 'translateY(6px)' },
              },
            }}
          >
            <IconButton
              onClick={scrollToFeatures}
              aria-label="Scroll down"
              sx={{
                color: theme.palette.primary.main,
                background:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(0,0,0,0.03)',
                p: 1.5,
                '&:hover': {
                  background:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(0,0,0,0.07)',
                },
              }}
            >
              <ScrollIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default HeroSection;

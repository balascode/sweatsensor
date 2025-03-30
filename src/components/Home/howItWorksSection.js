import React from 'react';
import { Box, Container, Typography, Fade, Slide, useTheme } from '@mui/material';

const HowItWorksSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, #2a2b4e 0%, #1a1b2e 100%)'
            : '#f0f4f8',
        position: 'relative',
      }}
      id="process"
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              letterSpacing: 2,
            }}
          >
            PROCESS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How SweatSense Works
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Our cutting-edge technology transforms sweat analysis into actionable
            health insights
          </Typography>
        </Box>

        {/* Flexbox for Main Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Image Section */}
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 20px 80px rgba(0,204,255,0.2)',
                position: 'relative',
                width: { xs: '100%', md: '30%' },
                mx: 'auto',
              }}
            >
              <Box
                component="img"
                src="/images/ssdevice2.png"
                alt="How SweatSense Works"
                sx={{ width: '100%', height: 'auto' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(45deg, rgba(0,255,204,0.2), rgba(0,204,255,0.2))',
                }}
              />
            </Box>
          </Fade>

          {/* Process Steps Section */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {[
              {
                title: '1. Wear the SweatSense Device',
                description:
                  'Our non-invasive, comfortable sensor attaches easily to your skin and begins collecting data immediately.',
                delay: 0,
              },
              {
                title: '2. Real-time Biochemical Analysis',
                description:
                  'Advanced microfluidic technology analyzes your sweat composition, measuring key biomarkers like sodium, glucose, and lactate.',
                delay: 200,
              },
              {
                title: '3. Data Transmission to Your Dashboard',
                description:
                  'Readings are instantly transmitted to your SweatSense dashboard, where you can view your metrics in real-time.',
                delay: 400,
              },
              {
                title: '4. Personalized Health Insights',
                description:
                  'Our AI analyzes your data to provide customized health recommendations and alerts you to potential issues before they become problems.',
                delay: 600,
              },
            ].map((step, index) => (
              <Slide
                key={index}
                direction="left"
                in={true}
                timeout={1000}
                style={{ transitionDelay: `${step.delay}ms` }}
              >
                <Box>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Slide>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;

import React from 'react';
import { Box, Card, CardContent, Container, Typography, Fade, useTheme } from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  MonitorHeartOutlined as HealthIcon,
  BoltOutlined as EnergyIcon,
  WaterDrop as HydrationIcon
} from '@mui/icons-material';

const FeatureCard = ({ title, description, icon, delay = 0 }) => {
  const theme = useTheme();

  return (
    <Fade in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: 'visible',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, rgba(42,43,78,0.8), rgba(26,27,46,0.9))'
            : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 10px 30px rgba(0,204,255,0.3)'
              : '0 10px 30px rgba(0,0,0,0.1)'
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            top: -8,
            left: -8,
            right: -8,
            bottom: -8,
            borderRadius: 5,
            background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
            opacity: 0,
            transition: 'opacity 0.3s',
            zIndex: -1
          },
          '&:hover:before': {
            opacity: 0.5
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
              color: '#fff',
              fontSize: '1.8rem'
            }}
          >
            {icon}
          </Box>
          <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};

const FeaturesSection = () => {
  const theme = useTheme();

  // Feature data to map over
  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Track sodium, glucose, hydration levels, and lactate in real-time as you exercise or go about your day.',
      icon: <AnalyticsIcon fontSize="large" />,
      delay: 0
    },
    {
      title: 'Health Insights',
      description: 'Receive personalized insights and recommendations based on your unique biochemical profile.',
      icon: <HealthIcon fontSize="large" />,
      delay: 200
    },
    {
      title: 'Performance Optimization',
      description: "Optimize your training, recovery, and nutrition with data-driven feedback tailored to your body's needs.",
      icon: <EnergyIcon fontSize="large" />,
      delay: 400
    },
    {
      title: 'Hydration Management',
      description: 'Prevent dehydration with precise measurements of your fluid and electrolyte balance throughout the day.',
      icon: <HydrationIcon fontSize="large" />,
      delay: 600
    },
    {
      title: 'Glucose Monitoring',
      description: 'Keep track of glucose levels without invasive blood tests, ideal for diabetes management and metabolic health.',
      icon: <HealthIcon fontSize="large" />,
      delay: 800
    },
    {
      title: 'Trend Analysis',
      description: 'View your health metrics over time to identify patterns and make informed lifestyle adjustments.',
      icon: <AnalyticsIcon fontSize="large" />,
      delay: 1000
    }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: theme.palette.background.default }} id="features">
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: theme.palette.primary.main, fontWeight: 'bold', letterSpacing: 2 }}
          >
            FEATURES
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Why Choose SweatSense?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our advanced technology provides real-time insights into your body's biochemistry through sweat analysis.
          </Typography>
        </Box>

        {/* Feature Cards Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4,
            justifyItems: 'center'
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;

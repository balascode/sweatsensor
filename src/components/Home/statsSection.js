import React, { useEffect } from 'react';
import { Box, Card, Container, Typography, Zoom, useTheme } from '@mui/material';
import { Analytics as AnalyticsIcon, WaterDrop as HydrationIcon, MonitorHeartOutlined as HealthIcon, BoltOutlined as EnergyIcon } from '@mui/icons-material';

const CounterAnimation = ({ end, label, icon, delay = 0 }) => {
  const theme = useTheme();
  const [count, setCount] = React.useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev < end) return prev + 1;
        clearInterval(interval);
        return end;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [end]);
  
  return (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        elevation={6}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          borderRadius: 4,
          transition: 'transform 0.3s, box-shadow 0.3s',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, rgba(42,43,78,0.8), rgba(26,27,46,0.9))'
            : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 10px 30px rgba(0,204,255,0.3)'
              : '0 10px 30px rgba(0,0,0,0.1)',
          }
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
          color: '#fff',
          fontSize: '2rem'
        }}>
          {icon}
        </Box>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>{count}+</Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary">{label}</Typography>
      </Card>
    </Zoom>
  );
};

const StatsSection = ({ featuresRef }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(145deg, #1a1b2e 0%, #2a2b4e 100%)'
          : '#f8f9fa',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00ffcc, #00ccff)',
        }
      }}
      ref={featuresRef}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            margin: { xs: -1, sm: -2 }
          }}
        >
          <Box sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 32px)', md: '1 1 calc(25% - 32px)' },
            padding: { xs: 1, sm: 2 },
            marginBottom: { xs: 2, md: 0 }
          }}>
            <CounterAnimation end={98} label="Accuracy Rate" icon={<AnalyticsIcon fontSize="large" />} delay={0} />
          </Box>
          <Box sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 32px)', md: '1 1 calc(25% - 32px)' },
            padding: { xs: 1, sm: 2 },
            marginBottom: { xs: 2, md: 0 }
          }}>
            <CounterAnimation end={150} label="Active Users" icon={<HydrationIcon fontSize="large" />} delay={200} />
          </Box>
          <Box sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 32px)', md: '1 1 calc(25% - 32px)' },
            padding: { xs: 1, sm: 2 },
            marginBottom: { xs: 2, sm: 2, md: 0 }
          }}>
            <CounterAnimation end={5} label="Health Markers" icon={<HealthIcon fontSize="large" />} delay={400} />
          </Box>
          <Box sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 32px)', md: '1 1 calc(25% - 32px)' },
            padding: { xs: 1, sm: 2 }
          }}>
            <CounterAnimation end={24} label="Hour Monitoring" icon={<EnergyIcon fontSize="large" />} delay={600} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StatsSection;
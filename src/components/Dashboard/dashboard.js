import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Alert, 
  Chip,
  Paper,
  useTheme,
  CircularProgress
} from '@mui/material';
import { 
  HealthAndSafety as HealthIcon,
  Timeline as TrendIcon,
  WaterDrop as HydrationIcon,
  LocalFireDepartment as SodiumIcon,
  Bloodtype as GlucoseIcon,
  FitnessCenter as LactateIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, BarElement);

function Dashboard({ sweatData }) {
  const theme = useTheme();
  const location = useLocation();
  const [historicalData, setHistoricalData] = useState({
    sodium: [],
    glucose: [],
    hydration: [],
    lactate: []
  });
  // const [sweatData, setSweatData] = useState({
  //   sodium: 0,
  //   glucose: 0,
  //   hydration: 0,
  //   lactate: 0,
  // });
  // useEffect(() => {
  //   if (location.state && location.state.sweatData) {
  //     setSweatData(location.state.sweatData);
  //   }
  // }, [location.state]);

  useEffect(() => {
    console.log('Dashboard received sweatData:', sweatData);
    setHistoricalData(prev => ({
      sodium: [...prev.sodium.slice(-5), sweatData.sodium].slice(-6),
      glucose: [...prev.glucose.slice(-5), sweatData.glucose].slice(-6),
      hydration: [...prev.hydration.slice(-5), sweatData.hydration].slice(-6),
      lactate: [...prev.lactate.slice(-5), sweatData.lactate].slice(-6)
    }));
  }, [sweatData]);

  const healthScore = Math.round(
    (sweatData.sodium + sweatData.glucose + sweatData.hydration + sweatData.lactate) / 4
  );

  const getAlert = () => {
    if (sweatData.sodium > 80) return { severity: "error", message: "High Sodium Levels Detected!" };
    if (sweatData.hydration < 70) return { severity: "warning", message: "Hydration Levels Low!" };
    if (sweatData.glucose > 50) return { severity: "warning", message: "Elevated Glucose Levels!" };
    return { severity: "success", message: "Biomarkers Within Optimal Range" };
  };

  // Modified Trend Chart Data
  const trendChartData = {
    labels: historicalData.sodium.map((_, i) => i === historicalData.sodium.length - 1 ? 'Now' : `${5 - i}m ago`),
    datasets: [
      { label: "Sodium", data: historicalData.sodium, borderColor: "#ff6b6b", backgroundColor: "rgba(255, 107, 107, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
      { label: "Glucose", data: historicalData.glucose, borderColor: "#4ecdc4", backgroundColor: "rgba(78, 205, 196, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
      { label: "Hydration", data: historicalData.hydration, borderColor: "#45b7d1", backgroundColor: "rgba(69, 183, 209, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
      { label: "Lactate", data: historicalData.lactate, borderColor: "#96ceb4", backgroundColor: "rgba(150, 206, 180, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 }
    ],
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: theme.palette.text.primary } },
      title: { display: true, text: 'Biomarker Trends', color: theme.palette.text.primary, font: { size: 18, weight: 'bold' } },
      tooltip: { backgroundColor: theme.palette.background.paper, titleColor: theme.palette.text.primary, bodyColor: theme.palette.text.secondary }
    },
    scales: { x: { ticks: { color: theme.palette.text.secondary } }, y: { ticks: { color: theme.palette.text.secondary } } }
  };

  // New Current Values Bar Chart Data
  const currentChartData = {
    labels: ['Sodium', 'Glucose', 'Hydration', 'Lactate'],
    datasets: [{
      label: 'Current Levels',
      data: [sweatData.sodium, sweatData.glucose, sweatData.hydration, sweatData.lactate],
      backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
      borderColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
      borderWidth: 1
    }]
  };

  const currentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: theme.palette.text.primary } },
      title: { display: true, text: 'Current Biomarker Levels', color: theme.palette.text.primary, font: { size: 18, weight: 'bold' } },
      tooltip: { backgroundColor: theme.palette.background.paper, titleColor: theme.palette.text.primary, bodyColor: theme.palette.text.secondary }
    },
    scales: {
      x: { ticks: { color: theme.palette.text.secondary } },
      y: { 
        ticks: { color: theme.palette.text.secondary },
        beginAtZero: true,
        suggestedMax: 100
      }
    }
  };

  const biomarkerIcons = {
    sodium: <SodiumIcon />,
    glucose: <GlucoseIcon />,
    hydration: <HydrationIcon />,
    lactate: <LactateIcon />
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'radial-gradient(circle at center, #2a2b4e 0%, #1a1b2e 100%)'
        : 'radial-gradient(circle at center, #ffffff 0%, #ffffff 100%)',
      p: { xs: 2, md: 4 },
      color: theme.palette.text.primary,
      transition: 'all 0.3s ease'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold', background: 'linear-gradient(45deg, #00ffcc, #00ccff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: { xs: 'center', md: 'left' }, mb: 4 
      }}>
        BioSense Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #2a2b4e, #1a1b2e)' : 'linear-gradient(145deg, #ffffff, #f0f2f5)', borderRadius: 3, boxShadow: theme.palette.mode === 'dark' ? '0 0 20px rgba(0,204,255,0.2)' : '0 8px 24px rgba(0,0,0,0.1)', height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(0,204,255,0.3)' : '0 12px 32px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <HealthIcon sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Biomarkers</Typography>
              </Box>
              <Grid container spacing={2}>
                {Object.entries(sweatData).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Chip icon={biomarkerIcons[key]} label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`} sx={{ width: '100%', background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}`, '& .MuiChip-icon': { color: theme.palette.primary.main } }} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #2a2b4e, #1a1b2e)' : 'linear-gradient(145deg, #ffffff, #f0f2f5)', borderRadius: 3, boxShadow: theme.palette.mode === 'dark' ? '0 0 20px rgba(0,204,255,0.2)' : '0 8px 24px rgba(0,0,0,0.1)', height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(0,204,255,0.3)' : '0 12px 32px rgba(0,0,0,0.15)' } }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress variant="determinate" value={healthScore} size={120} thickness={6} sx={{ color: healthScore > 70 ? '#45b7d1' : '#ff6b6b', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Health Score</Typography>
              <Typography variant="h3" sx={{ color: healthScore > 70 ? '#45b7d1' : '#ff6b6b', fontWeight: 'bold' }}>
                {healthScore}
                <Typography component="span" variant="h5">/100</Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Paper elevation={3} sx={{ p: 2, background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: 3, border: `1px solid ${theme.palette.divider}`, height: '100%', transition: 'all 0.3s ease' }}>
            <Alert severity={getAlert().severity} icon={<HealthIcon fontSize="inherit" />} sx={{ background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: theme.palette.text.primary, '& .MuiAlert-icon': { color: theme.palette[getAlert().severity].main } }}>
              {getAlert().message}
            </Alert>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #2a2b4e, #1a1b2e)' : 'linear-gradient(145deg, #ffffff, #f0f2f5)', borderRadius: 3, boxShadow: theme.palette.mode === 'dark' ? '0 0 20px rgba(0,204,255,0.2)' : '0 8px 24px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { boxShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(0,204,255,0.3)' : '0 12px 32px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendIcon sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Trend Analysis</Typography>
              </Box>
              <Box sx={{ height: { xs: 300, md: 400 }, width: {xs: 300, md: 400} }}>
                <Line data={trendChartData} options={trendChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #2a2b4e, #1a1b2e)' : 'linear-gradient(145deg, #ffffff, #f0f2f5)', borderRadius: 3, boxShadow: theme.palette.mode === 'dark' ? '0 0 20px rgba(0,204,255,0.2)' : '0 8px 24px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { boxShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(0,204,255,0.3)' : '0 12px 32px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BarChartIcon sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Current Levels</Typography>
              </Box>
              <Box sx={{ height: { xs: 300, md: 400 }, width: {xs: 300, md: 400} }}>
                <Bar data={currentChartData} options={currentChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
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
  FitnessCenter as LactateIcon
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function Dashboard({ sweatData }) {
  const theme = useTheme();
  const [historicalData, setHistoricalData] = useState({
    sodium: [],
    glucose: [],
    hydration: [],
    lactate: []
  });

  // Log sweatData to verify updates
  useEffect(() => {
    console.log('Dashboard received sweatData:', sweatData);
    setHistoricalData(prev => ({
      sodium: [...prev.sodium.slice(-5), sweatData.sodium].slice(-6),
      glucose: [...prev.glucose.slice(-5), sweatData.glucose].slice(-6),
      hydration: [...prev.hydration.slice(-5), sweatData.hydration].slice(-6),
      lactate: [...prev.lactate.slice(-5), sweatData.lactate].slice(-6)
    }));
  }, [sweatData]);

  // Health score calculation
  const healthScore = Math.round(
    (sweatData.sodium + sweatData.glucose + sweatData.hydration + sweatData.lactate) / 4
  );
  console.log('Calculated healthScore:', healthScore); // Log healthScore

  // Alerts logic
  const getAlert = () => {
    if (sweatData.sodium > 80) return { severity: "error", message: "High Sodium Levels Detected!" };
    if (sweatData.hydration < 70) return { severity: "warning", message: "Hydration Levels Low!" };
    if (sweatData.glucose > 50) return { severity: "warning", message: "Elevated Glucose Levels!" };
    return { severity: "success", message: "Biomarkers Within Optimal Range" };
  };

  // Chart configuration (unchanged for brevity, but works fine)
  const chartData = {
    labels: historicalData.sodium.map((_, i) => `${5 - i}m ago`).concat('Now'),
    datasets: [
      { label: "Sodium", data: historicalData.sodium, borderColor: "#ff6b6b", backgroundColor: "rgba(255, 107, 107, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
      { label: "Glucose", data: historicalData.glucose, borderColor: "#4ecdc4", backgroundColor: "rgba(78, 205, 196, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
      { label: "Hydration", data: historicalData.hydration, borderColor: "#45b7d1", backgroundColor: "rgba(69, 183, 209, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
      { label: "Lactate", data: historicalData.lactate, borderColor: "#96ceb4", backgroundColor: "rgba(150, 206, 180, 0.2)", tension: 0.4, pointRadius: 4, pointHoverRadius: 6 }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: theme.palette.text.primary } },
      title: { display: true, text: 'Biomarker Trends', color: theme.palette.text.primary, font: { size: 18, weight: 'bold' } },
      tooltip: { backgroundColor: theme.palette.background.paper, titleColor: theme.palette.text.primary, bodyColor: theme.palette.text.secondary }
    },
    scales: { x: { ticks: { color: theme.palette.text.secondary } }, y: { ticks: { color: theme.palette.text.secondary } } }
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
        : 'radial-gradient(circle at center, #f5f7fa 0%, #c3cfe2 100%)',
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

        <Grid item xs={12}>
          <Card sx={{ background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #2a2b4e, #1a1b2e)' : 'linear-gradient(145deg, #ffffff, #f0f2f5)', borderRadius: 3, boxShadow: theme.palette.mode === 'dark' ? '0 0 20px rgba(0,204,255,0.2)' : '0 8px 24px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { boxShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(0,204,255,0.3)' : '0 12px 32px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendIcon sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Trend Analysis</Typography>
              </Box>
              <Box sx={{ height: { xs: 300, md: 400 } }}>
                <Line data={chartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
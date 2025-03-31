import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/authContext';
import { useTheme } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Button, 
  Divider, 
  Chip,
  CircularProgress,
  Avatar,
  useMediaQuery
} from '@mui/material';
import {
  DownloadOutlined,
  ImageOutlined,
  PictureAsPdfOutlined,
  BarChart,
  Timeline,
  WaterDrop,
  LocalFireDepartment,
  Accessibility
} from '@mui/icons-material';
import { LineChart, Line, AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const UserReport = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const reportRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  // Function to extract username from email
  const getUsernameFromEmail = (email) => {
    if (!email) return '';
    return email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
  };

  // Demo data (unchanged)
  const userData = {
    name: currentUser ? getUsernameFromEmail(currentUser.email) : '',
    email: currentUser?.email || "jane.doe@example.com",
    age: 28,
    weight: "65 kg",
    height: "170 cm",
    activityLevel: "Athletic",
    reportDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const weeklyData = [
    { day: 'Mon', sodium: 42, glucose: 5.2, hydration: 78, lactate: 1.8 },
    { day: 'Tue', sodium: 38, glucose: 4.9, hydration: 82, lactate: 1.5 },
    { day: 'Wed', sodium: 45, glucose: 5.5, hydration: 75, lactate: 2.0 },
    { day: 'Thu', sodium: 39, glucose: 5.1, hydration: 80, lactate: 1.7 },
    { day: 'Fri', sodium: 48, glucose: 5.8, hydration: 72, lactate: 2.2 },
    { day: 'Sat', sodium: 36, glucose: 4.7, hydration: 85, lactate: 1.4 },
    { day: 'Sun', sodium: 41, glucose: 5.3, hydration: 79, lactate: 1.6 }
  ];

  const monthlyTrendData = [
    { week: 'Week 1', hydrationAvg: 76, sodiumAvg: 40 },
    { week: 'Week 2', hydrationAvg: 79, sodiumAvg: 38 },
    { week: 'Week 3', hydrationAvg: 81, sodiumAvg: 36 },
    { week: 'Week 4', hydrationAvg: 83, sodiumAvg: 35 },
  ];

  const workoutCorrelationData = [
    { workout: 'Running', performance: 85, hydration: 82, sodium: 42 },
    { workout: 'HIIT', performance: 78, hydration: 75, sodium: 48 },
    { workout: 'Weights', performance: 88, hydration: 85, sodium: 38 },
    { workout: 'Cycling', performance: 82, hydration: 80, sodium: 41 },
    { workout: 'Swimming', performance: 90, hydration: 88, sodium: 36 },
  ];

  const healthInsights = [
    "Your average hydration level is optimal for your activity level",
    "Sodium levels spike during intense workouts - consider adjusting electrolyte intake",
    "Glucose levels remain stable throughout the week - good glycemic control",
    "Lactate buildup is minimal, indicating good recovery between workouts",
    "Consider increasing hydration on Friday workouts to maintain optimal levels"
  ];

  const downloadPDF = async () => {
    setIsDownloading(true);
    const element = reportRef.current;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: theme.palette.background.paper
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userData.name.replace(/\s+/g, '_')}_SweatReport_${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadImage = async () => {
    setIsDownloading(true);
    const element = reportRef.current;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: theme.palette.background.paper
      });
      
      const link = document.createElement('a');
      link.download = `${userData.name.replace(/\s+/g, '_')}_SweatReport_${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Image generation failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 3 }, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfOutlined />}
          onClick={downloadPDF}
          disabled={isDownloading}
          sx={{ borderRadius: '12px', minWidth: 120 }}
        >
          {isDownloading ? <CircularProgress size={24} /> : "Download PDF"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<ImageOutlined />}
          onClick={downloadImage}
          disabled={isDownloading}
          sx={{ borderRadius: '12px', minWidth: 120 }}
        >
          {isDownloading ? <CircularProgress size={24} /> : "Download Image"}
        </Button>
      </Box>

      <Paper
        ref={reportRef}
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: '16px',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, rgba(42, 43, 78, 0.8), rgba(42, 43, 78, 0.95))'
            : '#ffffff',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 4,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: theme.palette.primary.main, mr: 2 }}>
              {userData.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">{userData.name}</Typography>
              <Typography variant="body2" color="text.secondary">{userData.email}</Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Chip 
              icon={<DownloadOutlined />}
              label="Sweat Analysis Report"
              color="primary"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Generated on {userData.reportDate}
            </Typography>
          </Box>
        </Box>

        {/* Personal Metrics */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            <BarChart sx={{ mr: 1, verticalAlign: 'middle' }} />
            Personal Metrics
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'space-between'
          }}>
            {[
              { label: 'Age', value: `${userData.age} years` },
              { label: 'Weight', value: userData.weight },
              { label: 'Height', value: userData.height },
              { label: 'Activity', value: userData.activityLevel }
            ].map((metric) => (
              <Card
                key={metric.label}
                sx={{
                  flex: { xs: '1 1 48%', sm: '1 1 23%' },
                  p: 2,
                  borderRadius: '12px'
                }}
              >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <Typography variant="overline" color="text.secondary">{metric.label}</Typography>
                  <Typography variant="h6" fontWeight="bold">{metric.value}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Weekly Analysis */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
            Weekly Sweat Analysis
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 2 
          }}>
            <Card sx={{ flex: 1, p: 2, borderRadius: '12px' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                <WaterDrop sx={{ mr: 1, verticalAlign: 'middle' }} />
                Hydration & Sodium
              </Typography>
              <Box sx={{ height: isMobile ? 200 : 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="hydration" name="Hydration %" stroke="#1976d2" />
                    <Line yAxisId="right" type="monotone" dataKey="sodium" name="Sodium (mmol/L)" stroke="#ff9800" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
            <Card sx={{ flex: 1, p: 2, borderRadius: '12px' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                <LocalFireDepartment sx={{ mr: 1, verticalAlign: 'middle' }} />
                Glucose & Lactate
              </Typography>
              <Box sx={{ height: isMobile ? 200 : 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="glucose" name="Glucose (mmol/L)" stroke="#4caf50" />
                    <Line yAxisId="right" type="monotone" dataKey="lactate" name="Lactate (mmol/L)" stroke="#f44336" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Box>
        </Box>

        {/* Monthly Trends */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
            Monthly Trends
          </Typography>
          <Card sx={{ p: 2, borderRadius: '12px' }}>
            <Box sx={{ height: isMobile ? 250 : 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Area type="monotone" dataKey="hydrationAvg" name="Avg Hydration %" stroke="#1976d2" fill="#1976d2" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="sodiumAvg" name="Avg Sodium (mmol/L)" stroke="#ff9800" fill="#ff9800" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>

        {/* Workout Correlations */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            <Accessibility sx={{ mr: 1, verticalAlign: 'middle' }} />
            Workout Performance
          </Typography>
          <Card sx={{ p: 2, borderRadius: '12px' }}>
            <Box sx={{ height: isMobile ? 250 : 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={workoutCorrelationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="workout" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="performance" name="Performance" fill="#9c27b0" />
                  <Bar dataKey="hydration" name="Hydration %" fill="#1976d2" />
                  <Bar dataKey="sodium" name="Sodium (mmol/L)" fill="#ff9800" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Box>

        {/* Insights & Recommendations */}
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Health Insights
          </Typography>
          <Card sx={{ p: 3, borderRadius: '12px' }}>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {healthInsights.map((insight, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ mb: 2, display: 'flex', alignItems: 'center', '&::before': {
                    content: '""',
                    width: 6,
                    height: 6,
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    mr: 1
                  }}}
                >
                  {insight}
                </Typography>
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Recommendations
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2,
              flexWrap: 'wrap' 
            }}>
              {[
                { 
                  icon: <WaterDrop />, 
                  title: 'Hydration Strategy',
                  text: 'Increase water intake by 250ml before HIIT workouts. Consider electrolyte supplement on Fridays.',
                  color: '#1976d2'
                },
                { 
                  icon: <LocalFireDepartment />, 
                  title: 'Nutrition Adjustments',
                  text: 'Add potassium-rich foods (bananas, spinach, avocados) to balance sodium levels.',
                  color: '#ff9800'
                },
                { 
                  icon: <Accessibility />, 
                  title: 'Performance Optimization',
                  text: 'Increase swimming and weight training based on optimal performance correlation.',
                  color: '#9c27b0'
                }
              ].map((rec) => (
                <Card
                  key={rec.title}
                  sx={{ 
                    flex: { xs: '1 0 100%', sm: '1 0 30%' }, 
                    p: 2,
                    borderRadius: '8px',
                    border: `1px solid ${rec.color}33`
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {React.cloneElement(rec.icon, { sx: { mr: 1, color: rec.color } })}
                    {rec.title}
                  </Typography>
                  <Typography variant="body2">{rec.text}</Typography>
                </Card>
              ))}
            </Box>
          </Card>
        </Box>

        {/* Footer */}
        <Box sx={{ 
          mt: 4, 
          pt: 3, 
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' }
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 1, sm: 0 } }}>
            Generated based on recent sweat analysis data for informational purposes only.
          </Typography>
          <Chip 
            label="SweatSense Analytics™"
            size="small"
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UserReport;
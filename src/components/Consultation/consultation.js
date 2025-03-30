import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Avatar,
  Button,
  useTheme,
  IconButton,
  Chip,
  Paper
} from '@mui/material';
import { 
  LocalHospital as DoctorIcon,
  VideoCall as VideoCallIcon,
  HealthAndSafety as HealthIcon,
  Restaurant as NutritionIcon,
  SportsSoccer as SportsIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

function Consultation() {
  const theme = useTheme();
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: ''
  });

  const specialistTypes = [
    { 
      title: 'Sports Medicine', 
      description: 'Optimized for athletic performance',
      icon: <SportsIcon />,
      color: '#ff6b6b'
    },
    { 
      title: 'Nutrition Expert', 
      description: 'Tailored diet & hydration plans',
      icon: <NutritionIcon />,
      color: '#4ecdc4'
    },
    { 
      title: 'General Physician', 
      description: 'Holistic health evaluation',
      icon: <DoctorIcon />,
      color: '#45b7d1'
    }
  ];

  const handleBookConsultation = (specialist) => {
    setSelectedSpecialist(specialist);
    setOpenBooking(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Here you would typically send this data to a backend
    console.log('Booking:', { specialist: selectedSpecialist.title, ...formData });
    setOpenBooking(false);
    setFormData({ name: '', email: '', date: '' });
    setSelectedSpecialist(null);
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
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: { xs: 'center', md: 'left' },
          mb: 4,
          textShadow: theme.palette.mode === 'dark'
            ? '0 0 10px rgba(0,204,255,0.5)'
            : 'none'
        }}
      >
        TeleHealth Portal
      </Typography>

      <Grid container spacing={3}>
        {specialistTypes.map((specialist, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(145deg, #2a2b4e, #1a1b2e)'
                  : 'linear-gradient(145deg, #ffffff, #f0f2f5)',
                borderRadius: 3,
                boxShadow: theme.palette.mode === 'dark'
                  ? `0 0 20px ${specialist.color}33`
                  : '0 8px 24px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 0 30px ${specialist.color}66`
                    : '0 12px 32px rgba(0,0,0,0.15)'
                },
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                p: 3
              }}>
                <Avatar sx={{ 
                  mb: 3, 
                  width: 80, 
                  height: 80, 
                  background: `linear-gradient(45deg, ${specialist.color}, ${specialist.color}cc)`,
                  boxShadow: `0 0 15px ${specialist.color}66`
                }}>
                  {specialist.icon}
                </Avatar>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    mb: 1
                  }}
                >
                  {specialist.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    mb: 3
                  }}
                >
                  {specialist.description}
                </Typography>
                <Button 
                  variant="outlined"
                  startIcon={<VideoCallIcon />}
                  onClick={() => handleBookConsultation(specialist)}
                  sx={{
                    borderRadius: 20,
                    borderColor: specialist.color,
                    color: specialist.color,
                    '&:hover': {
                      background: `${specialist.color}22`,
                      borderColor: specialist.color,
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Schedule Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Dialog */}
      <Dialog 
        open={openBooking} 
        onClose={() => setOpenBooking(false)}
        PaperProps={{
          sx: {
            background: theme.palette.mode === 'dark'
              ? 'rgba(42, 43, 78, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 0 30px rgba(0,204,255,0.2)'
              : '0 8px 24px rgba(0,0,0,0.1)'
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          textAlign: 'center',
          pb: 1
        }}>
          Schedule Consultation
          {selectedSpecialist && (
            <Chip 
              label={selectedSpecialist.title}
              size="small"
              sx={{ 
                ml: 2,
                background: selectedSpecialist.color,
                color: '#fff'
              }}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            mt: 2,
            px: 2
          }}>
            <TextField 
              fullWidth 
              label="Full Name" 
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)'
                }
              }}
            />
            <TextField 
              fullWidth 
              label="Email" 
              type="email" 
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)'
                }
              }}
            />
            <TextField 
              fullWidth 
              label="Preferred Date" 
              type="date" 
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)'
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenBooking(false)}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            startIcon={<ScheduleIcon />}
            onClick={handleSubmit}
            disabled={!formData.name || !formData.email || !formData.date}
            sx={{
              borderRadius: 20,
              background: selectedSpecialist
                ? `linear-gradient(45deg, ${selectedSpecialist.color}, ${selectedSpecialist.color}cc)`
                : 'linear-gradient(45deg, #00ffcc, #00ccff)',
              color: '#fff',
              px: 3,
              '&:hover': {
                boxShadow: `0 0 20px ${selectedSpecialist ? selectedSpecialist.color : '#00ccff'}66`,
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Consultation;
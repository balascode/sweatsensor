import React from 'react';
import { Box, Card, Container, Grid, Typography, Slide, useTheme } from '@mui/material';

const Testimonial = ({ quote, name, role, avatar, delay = 0 }) => {
  const theme = useTheme();
  return (
    <Slide in={true} direction="up" style={{ transitionDelay: `${delay}ms` }}>
      <Card
        sx={{
          borderRadius: 4,
          p: 3,
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, rgba(42,43,78,0.5), rgba(26,27,46,0.6))'
            : 'linear-gradient(145deg, rgba(255,255,255,0.7), rgba(245,245,245,0.8))',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          position: 'relative',
          overflow: 'visible',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: 20,
            width: 20,
            height: 20,
            background: theme.palette.mode === 'dark' ? 'rgba(42,43,78,0.7)' : 'rgba(255,255,255,0.9)',
            transform: 'rotate(45deg)',
            borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          }
        }}
      >
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Typography
            variant="body1"
            fontStyle="italic"
            sx={{ pl: 4, pr: 4 }} // Added padding for the quotes
          >
            {quote}
          </Typography>
          <Typography
            component="span"
            sx={{
              position: 'absolute',
              top: -10,
              left: 0,
              fontSize: '2rem',
              color: theme.palette.primary.main,
              lineHeight: 1
            }}
          >
            "
          </Typography>
          <Typography
            component="span"
            sx={{
              position: 'absolute',
              bottom: -10,
              right: 0,
              fontSize: '2rem',
              color: theme.palette.primary.main,
              lineHeight: 1
            }}
          >
            "
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={avatar || "/api/placeholder/60/60"}
            alt={name}
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              border: `2px solid ${theme.palette.primary.main}`,
              mr: 2
            }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>
            <Typography variant="body2" color="text.secondary">{role}</Typography>
          </Box>
        </Box>
      </Card>
    </Slide>
  );
};

const TestimonialsSection = () => {
  const theme = useTheme();
  
  // Dummy array of testimonial data
  const testimonials = [
    {
      quote: "SweatSense has completely changed how I manage my diabetes. Being able to track my glucose levels without constant finger pricks is a game-changer.",
      name: "Sarah Johnson",
      role: "Type 1 Diabetic, Marathon Runner",
      avatar: "/images/profile.png",
      delay: 0
    },
    {
      quote: "As a professional athlete, every detail matters. SweatSense helps me fine-tune my hydration and electrolyte balance, which has measurably improved my recovery time.",
      name: "Michael Torres",
      role: "Professional Triathlete",
      avatar: "/images/profile.png",
      delay: 200
    },
    {
      quote: "I've tried many fitness trackers, but none gave me the detailed biochemical insights that SweatSense provides. It's helped me optimize my nutrition and training regimen.",
      name: "Lisa Chen",
      role: "Fitness Coach",
      avatar: "/images/profile.png",
      delay: 400
    },
    {
      quote: "The real-time data from SweatSense allowed me to adjust my race strategy and avoid a potential bonk. This technology is revolutionary for endurance sports.",
      name: "David Reynolds",
      role: "Ultra Runner",
      avatar: "/images/profile.png",
      delay: 600
    },
    {
      quote: "As a team physician, I can now monitor my athletes' physiological status without invasive procedures. SweatSense provides insights we could only dream of before.",
      name: "Dr. Amanda Wright",
      role: "Sports Medicine Specialist",
      avatar: "/images/profile.png",
      delay: 800
    }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: theme.palette.background.default }} id="testimonials">
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', letterSpacing: 2 }}>
            TESTIMONIALS
          </Typography>
          <Typography variant="h3" sx={{
            fontWeight: 'bold',
            mb: 2,
            background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            What Our Users Say
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Discover how SweatSense is transforming health monitoring and performance
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Testimonial
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
                delay={testimonial.delay}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
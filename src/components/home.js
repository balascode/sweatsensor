import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  useTheme, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Divider,
  Fade,
  Slide,
  Zoom,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { 
  WaterDrop as HydrationIcon, 
  BoltOutlined as EnergyIcon,
  MonitorHeartOutlined as HealthIcon,
  Analytics as AnalyticsIcon,
  ArrowDownward as ScrollIcon,
  ChevronRight as ArrowRightIcon
} from '@mui/icons-material';

function Home() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const featuresRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Smooth scroll to features section
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax effect on hero section
  const [offset, setOffset] = React.useState(0);
  const handleScroll = () => {
    setOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate counters
  const CounterAnimation = ({ end, label, icon, delay = 0 }) => {
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
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
            {count}+
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            {label}
          </Typography>
        </Card>
      </Zoom>
    );
  };

  // Feature card component
  const FeatureCard = ({ title, description, icon, delay = 0 }) => (
    <Fade in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        elevation={6}
        sx={{
          height: '100%',
          borderRadius: 4,
          position: 'relative',
          overflow: 'visible',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, rgba(42,43,78,0.8), rgba(26,27,46,0.9))' 
            : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 10px 30px rgba(0,204,255,0.3)' 
              : '0 10px 30px rgba(0,0,0,0.1)',
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
            zIndex: -1,
          },
          '&:hover:before': {
            opacity: 0.5,
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ 
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
          }}>
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

  // Testimonial component
  const Testimonial = ({ quote, name, role, avatar, delay = 0 }) => (
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
        <Typography 
          variant="body1" 
          fontStyle="italic" 
          mb={3}
          sx={{
            '&:before': {
              content: '"""',
              fontSize: '2rem',
              color: theme.palette.primary.main,
              verticalAlign: 'sub',
              lineHeight: 0,
              marginRight: 1
            },
            '&:after': {
              content: '"""',
              fontSize: '2rem',
              color: theme.palette.primary.main,
              verticalAlign: 'middle',
              lineHeight: 0,
              marginLeft: 1
            }
          }}
        >
          {quote}
        </Typography>
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

  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1b2e 0%, #2a2b4e 100%)' 
            : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        {/* Background Animated Elements */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`,
                transform: `translateY(${offset * Math.random() * 0.5}px)`,
                '@keyframes float': {
                  '0%': { transform: 'translateY(0) translateX(0)' },
                  '50%': { transform: 'translateY(20px) translateX(10px)' },
                  '100%': { transform: 'translateY(0) translateX(0)' }
                }
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 3 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Slide direction="down" in={true} timeout={1000}>
                <Typography
                  variant={isSmall ? 'h3' : 'h1'}
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    textShadow: '0 0 20px rgba(0,204,255,0.3)',
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    lineHeight: 1.2
                  }}
                >
                  SweatSense
                </Typography>
              </Slide>
              
              <Slide direction="down" in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    mb: 4,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Revolutionize your health monitoring with real-time sweat analysis
                </Typography>
              </Slide>
              
              <Fade in={true} timeout={2000} style={{ transitionDelay: '400ms' }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
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
                          px: 4,
                          py: 1.5,
                          borderRadius: '50px',
                          fontWeight: 'bold',
                          boxShadow: '0 10px 20px rgba(0,204,255,0.3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #00ccff, #00ffcc)',
                            boxShadow: '0 15px 30px rgba(0,204,255,0.5)',
                            transform: 'translateY(-3px)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Get Started
                      </Button>
                      <Button
                        component={NavLink}
                        to="/signup"
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          px: 4,
                          py: 1.5,
                          borderRadius: '50px',
                          fontWeight: 'bold',
                          borderWidth: 2,
                          '&:hover': {
                            background: 'rgba(0,204,255,0.1)',
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                            transform: 'translateY(-3px)'
                          },
                          transition: 'all 0.3s ease'
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
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        boxShadow: '0 10px 20px rgba(0,204,255,0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00ccff, #00ffcc)',
                          boxShadow: '0 15px 30px rgba(0,204,255,0.5)',
                          transform: 'translateY(-3px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Go to Dashboard
                    </Button>
                  )}
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Zoom in={true} timeout={1500} style={{ transitionDelay: '600ms' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: '0 20px 80px rgba(0,204,255,0.3)',
                    transform: `translateY(${offset * -0.2}px)`
                  }}
                >
                  {/* Placeholder for a hero image - you can replace with your actual image */}
                  <Box
                    component="img"
                    src="/api/placeholder/600/400"
                    alt="SweatSense Device"
                    sx={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, rgba(0,255,204,0.2), rgba(0,204,255,0.2))',
                    }}
                  />
                </Box>
              </Zoom>
            </Grid>
          </Grid>

          <Box 
            sx={{ 
              textAlign: 'center', 
              mt: { xs: 6, md: 10 },
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(10px)' }
              }
            }}
          >
            <IconButton 
              onClick={scrollToFeatures} 
              aria-label="Scroll down" 
              sx={{ 
                color: theme.palette.primary.main,
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                '&:hover': {
                  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                }
              }}
            >
              <ScrollIcon fontSize="large" />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
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
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sm={6}>
              <CounterAnimation 
                end={98} 
                label="Accuracy Rate" 
                icon={<AnalyticsIcon fontSize="large" />}
                delay={0}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <CounterAnimation 
                end={10000} 
                label="Active Users" 
                icon={<HydrationIcon fontSize="large" />}
                delay={200}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <CounterAnimation 
                end={5} 
                label="Health Markers" 
                icon={<HealthIcon fontSize="large" />}
                delay={400}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <CounterAnimation 
                end={24} 
                label="Hour Monitoring" 
                icon={<EnergyIcon fontSize="large" />}
                delay={600}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box 
        sx={{
          py: { xs: 6, md: 10 },
          background: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontWeight: 'bold',
                letterSpacing: 2 
              }}
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
                WebkitTextFillColor: 'transparent',
              }}
            >
              Why Choose SweatSense?
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Our advanced technology provides real-time insights into your body's biochemistry through sweat analysis.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Real-time Monitoring"
                description="Track sodium, glucose, hydration levels, and lactate in real-time as you exercise or go about your day."
                icon={<AnalyticsIcon fontSize="large" />}
                delay={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Health Insights"
                description="Receive personalized insights and recommendations based on your unique biochemical profile."
                icon={<HealthIcon fontSize="large" />}
                delay={200}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Performance Optimization"
                description="Optimize your training, recovery, and nutrition with data-driven feedback tailored to your body's needs."
                icon={<EnergyIcon fontSize="large" />}
                delay={400}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Hydration Management"
                description="Prevent dehydration with precise measurements of your fluid and electrolyte balance throughout the day."
                icon={<HydrationIcon fontSize="large" />}
                delay={600}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Glucose Monitoring"
                description="Keep track of glucose levels without invasive blood tests, ideal for diabetes management and metabolic health."
                icon={<HealthIcon fontSize="large" />}
                delay={800}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                title="Trend Analysis"
                description="View your health metrics over time to identify patterns and make informed lifestyle adjustments."
                icon={<AnalyticsIcon fontSize="large" />}
                delay={1000}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box 
        sx={{
          py: { xs: 6, md: 10 },
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, #2a2b4e 0%, #1a1b2e 100%)' 
            : '#f0f4f8',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontWeight: 'bold',
                letterSpacing: 2 
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
              Our cutting-edge technology transforms sweat analysis into actionable health insights
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box
                  sx={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: '0 20px 80px rgba(0,204,255,0.2)',
                    position: 'relative',
                  }}
                >
                  {/* Placeholder for how it works image - you can replace with your actual image */}
                  <Box
                    component="img"
                    src="/api/placeholder/600/400"
                    alt="How SweatSense Works"
                    sx={{ 
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, rgba(0,255,204,0.2), rgba(0,204,255,0.2))',
                    }}
                  />
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Slide direction="left" in={true} timeout={1000}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                      1. Wear the SweatSense Device
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Our non-invasive, comfortable sensor attaches easily to your skin and begins collecting data immediately.
                    </Typography>
                  </Box>
                </Slide>
                
                <Slide direction="left" in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                      2. Real-time Biochemical Analysis
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Advanced microfluidic technology analyzes your sweat composition, measuring key biomarkers like sodium, glucose, and lactate.
                    </Typography>
                  </Box>
                </Slide>
                
                <Slide direction="left" in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                      3. Data Transmission to Your Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Readings are instantly transmitted to your SweatSense dashboard, where you can view your metrics in real-time.
                    </Typography>
                  </Box>
                </Slide>
                
                <Slide direction="left" in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                      4. Personalized Health Insights
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Our AI analyzes your data to provide customized health recommendations and alerts you to potential issues before they become problems.
                    </Typography>
                  </Box>
                </Slide>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box 
        sx={{
          py: { xs: 6, md: 10 },
          background: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontWeight: 'bold',
                letterSpacing: 2 
              }}
            >
              TESTIMONIALS
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
              What Our Users Say
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Discover how SweatSense is transforming health monitoring and performance
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Testimonial 
                quote="SweatSense has completely changed how I manage my diabetes. Being able to track my glucose levels without constant finger pricks is a game-changer." 
                name="Sarah Johnson"
                role="Type 1 Diabetic, Marathon Runner"
                delay={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Testimonial 
                quote="As a professional athlete, every detail matters. SweatSense helps me fine-tune my hydration and electrolyte balance, which has measurably improved my recovery time." 
                name="Michael Torres"
                role="Professional Triathlete"
                delay={200}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Testimonial 
                quote="I've tried many fitness trackers, but none gave me the detailed biochemical insights that SweatSense provides. It's helped me optimize my nutrition and training regimen." 
                name="Lisa Chen"
                role="Fitness Coach"
                delay={400}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #00ffcc 0%, #00ccff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background animated elements */}
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

      {/* FAQ Section */}
      <Box 
        sx={{
          py: { xs: 6, md: 10 },
          background: theme.palette.background.default,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontWeight: 'bold',
                letterSpacing: 2 
              }}
            >
              FAQ
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
              Frequently Asked Questions
            </Typography>
          </Box>

          <Box>
            {[
              {
                question: "How accurate is SweatSense for glucose monitoring?",
                answer: "SweatSense provides glucose readings with 98% accuracy compared to traditional blood glucose monitors. While not a replacement for medical devices in critical situations, it offers reliable continuous monitoring for daily management."
              },
              {
                question: "Is the device comfortable to wear during exercise?",
                answer: "Yes, the SweatSense device is designed to be lightweight and waterproof, with a flexible adhesive that stays secure during intense physical activity without causing skin irritation."
              },
              {
                question: "How long does the battery last?",
                answer: "The SweatSense device has a battery life of up to 7 days with continuous use. Recharging takes approximately 1 hour using the included magnetic charging dock."
              },
              {
                question: "Can SweatSense detect dehydration?",
                answer: "Yes, SweatSense measures electrolyte concentrations and sweat rate to provide accurate hydration status updates and can alert you when you're approaching dehydration thresholds."
              },
              {
                question: "Is my data secure and private?",
                answer: "Absolutely. All SweatSense data is encrypted end-to-end and stored securely. We never share your health data with third parties without your explicit consent."
              }
            ].map((faq, index) => (
              <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }} key={index}>
                <Card 
                  sx={{ 
                    mb: 3, 
                    borderRadius: 4,
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 4px 20px rgba(0,204,255,0.15)' 
                      : '0 4px 20px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box 
        sx={{
          py: { xs: 6, md: 8 },
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, #1a1b2e 0%, #2a2b4e 100%)' 
            : '#f0f4f8',
        }}
      >
        <Container maxWidth="md">
          <Zoom in={true} timeout={1000}>
            <Box 
              sx={{ 
                textAlign: 'center',
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, rgba(42,43,78,0.8), rgba(26,27,46,0.9))' 
                  : 'white',
                p: { xs: 4, md: 6 },
                borderRadius: 8,
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 20px 80px rgba(0,204,255,0.2)' 
                  : '0 20px 80px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Ready to experience SweatSense?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Join our community and transform how you monitor your health and performance.
              </Typography>
              <Button
                component={NavLink}
                to={currentUser ? "/dashboard" : "/signup"}
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 20px rgba(0,204,255,0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00ccff, #00ffcc)',
                    boxShadow: '0 15px 30px rgba(0,204,255,0.5)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {currentUser ? "Go to Dashboard" : "Get Started Free"}
              </Button>
            </Box>
          </Zoom>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
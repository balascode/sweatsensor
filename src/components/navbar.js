import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
  Tooltip,
  Divider,
  alpha,
  Badge
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalHospital as ConsultIcon,
  Menu as MenuIcon,
  AssessmentOutlined as ReportIcon,
  SettingsOutlined as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  ExitToApp as SignOutIcon,
  Info as InfoIcon,
  RateReview as TestimonialsIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  QuestionAnswer as FAQIcon,
  Assignment as CTAIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../context/authContext';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ colorMode, mode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const { currentUser, signout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  // Function to extract username from email
  const getUsernameFromEmail = (email) => {
    if (!email) return '';
    return email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
  };

  // Get username from currentUser's email
  const username = currentUser ? getUsernameFromEmail(currentUser.email) : '';

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signout();
      if (isMobile) setMobileOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  const scrollToSection = (sectionId) => {
    handleNavClick();
    
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
  
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Improved navigation items with better icons and organization
  const getNavItems = () => {
    if (currentUser) {
      return [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', notification: 0 },
        { text: 'Consultation', icon: <ConsultIcon />, path: '/consultation', notification: 0 },
        { text: 'Reports', icon: <ReportIcon />, path: '/reports', notification: 0 },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings', notification: 0 },
      ];
    } else {
      return [
        { text: 'Home', icon: <HomeIcon />, path: null, onClick: () => scrollToSection('herosection') },
        { text: 'Features', icon: <InfoIcon />, path: null, onClick: () => scrollToSection('features') },
        { text: 'How It Works', icon: <ConsultIcon />, path: null, onClick: () => scrollToSection('process') },
        { text: 'Testimonials', icon: <TestimonialsIcon />, path: null, onClick: () => scrollToSection('testimonials') },
        { text: 'Get Started', icon: <CTAIcon />, path: null, onClick: () => scrollToSection('cta') },
        { text: 'FAQ', icon: <FAQIcon />, path: null, onClick: () => scrollToSection('faq') },
      ];
    }
  };

  const navItems = getNavItems();
  const drawerWidth = 280;
  const collapsedWidth = 80;

  // Gradient creator function for dynamic theming
  const createGradient = (start, end) => `linear-gradient(45deg, ${start}, ${end})`;
  
  // Theme-aware gradients
  const primaryGradient = createGradient('#00ffcc', '#00ccff');
  const hoverGradient = createGradient('#00ccff', '#00ffcc');
  const backgroundGradient = mode === 'dark' 
    ? 'linear-gradient(180deg, #111827 0%, #1f2937 100%)'
    : 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)';
  
  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: backgroundGradient,
        color: theme.palette.text.primary,
        overflow: 'hidden',
        position: 'relative',
        width: isCollapsed && !isMobile ? collapsedWidth : drawerWidth,
        transition: theme.transitions.create(['width', 'background'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: primaryGradient,
          zIndex: 1,
        },
      }}
    >
      {/* Logo & Toggle Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        }}
      >
        {(!isCollapsed || isMobile) && (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              background: primaryGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            SweatSense
          </Typography>
        )}
        <Tooltip title={isCollapsed ? "Expand" : "Collapse"}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ 
              color: theme.palette.text.primary,
              ml: isCollapsed && !isMobile ? 'auto' : 0,
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                transform: 'rotate(180deg)',
              }
            }}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* User Profile Section - Enhanced */}
      {currentUser && !isCollapsed && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
            px: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            background: alpha(mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[100], 0.5),
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              bgcolor: theme.palette.primary.main,
              background: primaryGradient,
              fontSize: '2rem',
              boxShadow: `0 0 20px ${alpha(mode === 'dark' ? '#00ccff' : '#00ffcc', 0.4)}`,
              border: `2px solid ${mode === 'dark' ? '#00ccff' : '#00ffcc'}`,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              background: primaryGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            {username}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              textAlign: 'center',
              mb: 2,
            }}
          >
            Premium Member
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              width: '100%',
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              size="small"
              sx={{
                background: primaryGradient,
                borderRadius: '20px',
                py: 0.75,
                boxShadow: `0 4px 12px ${alpha('#00ccff', 0.3)}`,
                transition: 'all 0.3s',
                '&:hover': {
                  background: hoverGradient,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 15px ${alpha('#00ccff', 0.4)}`,
                },
              }}
            >
              Profile
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="small"
              onClick={handleSignOut}
              startIcon={<SignOutIcon />}
              sx={{
                borderRadius: '20px',
                py: 0.75,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      )}

      {/* Collapsed user icon - enhanced */}
      {currentUser && isCollapsed && !isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          }}
        >
          <Tooltip title={username}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                fontSize: '1.5rem',
                background: primaryGradient,
                boxShadow: `0 0 15px ${alpha('#00ccff', 0.4)}`,
                border: `2px solid ${mode === 'dark' ? '#00ccff' : '#00ffcc'}`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: `0 0 20px ${alpha('#00ccff', 0.6)}`,
                }
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        </Box>
      )}

      {/* Enhanced Navigation Items */}
      <List sx={{ pt: 1, px: 1.5 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={item.path ? NavLink : 'div'}
            to={item.path}
            onClick={item.onClick || handleNavClick}
            disablePadding
            sx={{
              display: 'block',
              mb: 0.75,
              color: theme.palette.text.primary,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                minHeight: 48,
                px: 2.5,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: mode === 'dark' 
                    ? alpha(theme.palette.primary.main, 0.15)
                    : alpha(theme.palette.primary.main, 0.08),
                  transform: isCollapsed && !isMobile ? 'scale(1.1)' : 'translateX(5px)',
                  '&:after': {
                    opacity: 1,
                    transform: 'translateX(0)',
                  }
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  background: primaryGradient,
                  opacity: 0,
                  transform: 'translateX(-5px)',
                  transition: 'all 0.3s ease',
                },
                '&.active': {
                  background: mode === 'dark' 
                    ? alpha(theme.palette.primary.main, 0.2) 
                    : alpha(theme.palette.primary.main, 0.12),
                  '&:after': {
                    opacity: 1,
                    transform: 'translateX(0)',
                  }
                },
              }}
              className={
                (item.path && location.pathname === item.path) ? 'active' : ''
              }
            >
              <Tooltip title={isCollapsed && !isMobile ? item.text : ''} placement="right">
                <ListItemIcon
                  sx={{
                    color: (item.path && location.pathname === item.path) 
                      ? theme.palette.primary.main 
                      : theme.palette.text.primary,
                    minWidth: isCollapsed && !isMobile ? 0 : 36,
                    mr: isCollapsed && !isMobile ? 0 : 3,
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.notification && item.notification > 0 ? (
                    <Badge badgeContent={item.notification} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
              </Tooltip>
              
              {(!isCollapsed || isMobile) && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    variant: 'body2',
                    letterSpacing: 0.2,
                    color: (item.path && location.pathname === item.path) 
                      ? theme.palette.primary.main 
                      : theme.palette.text.primary,
                  }}
                />
              )}
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Bottom Actions - Improved Layout */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: isCollapsed && !isMobile ? 1 : 2,
          display: 'flex',
          flexDirection: isCollapsed && !isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          background: alpha(mode === 'dark' ? '#1a1b2e' : '#f8f9fa', 0.8),
          backdropFilter: 'blur(5px)',
        }}
      >
        {/* Theme Toggle */}
        <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{
              color: theme.palette.primary.main,
              borderRadius: '10px',
              p: 1,
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                transform: 'rotate(30deg)',
              },
              mb: isCollapsed && !isMobile ? 1 : 0,
            }}
          >
            {mode === 'dark' ? (
              <Brightness7Icon sx={{ color: '#f9d71c' }} />
            ) : (
              <Brightness4Icon sx={{ color: '#5e35b1' }} />
            )}
          </IconButton>
        </Tooltip>

        {/* Sign In/Up Buttons for non-authenticated users */}
        {!currentUser && (!isCollapsed || isMobile) && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <NavLink
              to="/signin"
              onClick={handleNavClick}
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  background: primaryGradient,
                  color: '#fff',
                  px: 2,
                  py: 0.75,
                  borderRadius: 20,
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  '&:hover': {
                    background: hoverGradient,
                    boxShadow: `0 4px 10px ${alpha('#00ccff', 0.4)}`,
                  },
                }}
              >
                Sign In
              </Button>
            </NavLink>

            <NavLink
              to="/signup"
              onClick={handleNavClick}
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: '#00ccff',
                  color: '#00ccff',
                  px: 2,
                  py: 0.75,
                  borderRadius: 20,
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  '&:hover': {
                    background: 'transparent',
                    borderColor: '#00ffcc',
                    color: '#00ffcc',
                    boxShadow: `0 2px 8px ${alpha('#00ccff', 0.3)}`,
                  },
                }}
              >
                Sign Up
              </Button>
            </NavLink>
          </Box>
        )}

        {/* Logout button for authenticated users in collapsed view */}
        {currentUser && isCollapsed && !isMobile && (
          <Tooltip title="Sign Out">
            <IconButton
              onClick={handleSignOut}
              sx={{
                color: theme.palette.primary.main,
                borderRadius: '10px',
                p: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                },
              }}
            >
              <SignOutIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {/* Main Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: isCollapsed && !isMobile ? collapsedWidth : drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            boxShadow: mode === 'dark' 
              ? '0 8px 32px rgba(0,0,0,0.5)' 
              : '0 8px 32px rgba(0,0,0,0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Enhanced Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="Open menu"
          sx={{
            position: 'fixed',
            top: '20px',      
            left: '20px',      
            zIndex: 1200,
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            background: primaryGradient,
            color: '#fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: hoverGradient,
              transform: 'scale(1.05)',
              boxShadow: '0 6px 20px rgba(0,204,255,0.4)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default Navbar;
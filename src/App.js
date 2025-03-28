import React, { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes, 
  NavLink 
} from 'react-router-dom';
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
  Container,
  CssBaseline,
  Switch
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
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './components/dashboard';
import Consultation from './components/consultation';

// Theme context
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [sweatData, setSweatData] = useState({
    sodium: 0,
    glucose: 0,
    hydration: 0,
    lactate: 0,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mode, setMode] = useState('dark'); // Default to dark mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => console.log("Socket connected"));
    socket.on("sweatData", (data) => setSweatData(data));
    socket.on("disconnect", () => console.log("Socket disconnected"));
    return () => {
      socket.off("sweatData");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // Theme creation
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#1976d2' },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#000000',
                  secondary: '#666666',
                },
              }
            : {
                primary: { main: '#00ccff' },
                background: {
                  default: '#1a1b2e',
                  paper: '#2a2b4e',
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#bbbbbb',
                },
              }),
        },
      }),
    [mode]
  );

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

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Consultation', icon: <ConsultIcon />, path: '/consultation' },
    { text: 'Reports', icon: <ReportIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawerWidth = 260;
  const collapsedWidth = 80;

  const drawer = (
    <Box sx={{
      height: '100%',
      background: mode === 'dark' 
        ? 'linear-gradient(180deg, #1a1b2e 0%, #2a2b4e 100%)' 
        : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
      color: muiTheme.palette.text.primary,
      overflow: 'hidden',
      position: 'relative',
      width: isCollapsed && !isMobile ? collapsedWidth : drawerWidth,
      transition: 'width 0.3s ease, background 0.3s ease',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #00ffcc, #00ccff)',
      }
    }}>
      <Box sx={{ 
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${muiTheme.palette.divider}`
      }}>
        {!isCollapsed && (
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SweatSense
          </Typography>
        )}
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ 
            color: muiTheme.palette.text.primary,
            ml: isCollapsed ? 'auto' : 0
          }}
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={handleNavClick}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
              color: muiTheme.palette.text.primary,
              '&:hover': {
                background: mode === 'dark' 
                  ? 'rgba(255,255,255,0.1)' 
                  : 'rgba(0,0,0,0.1)',
                transform: isCollapsed && !isMobile ? 'scale(1.1)' : 'translateX(5px)',
                boxShadow: mode === 'dark' 
                  ? '0 0 15px rgba(0,204,255,0.3)' 
                  : '0 0 15px rgba(0,0,0,0.1)',
                color: muiTheme.palette.text.primary
              },
              '&.active': {
                background: mode === 'dark' 
                  ? 'rgba(255,255,255,0.15)' 
                  : 'rgba(0,0,0,0.15)',
                borderLeft: isCollapsed && !isMobile ? 'none' : `4px solid ${muiTheme.palette.primary.main}`,
                color: muiTheme.palette.text.primary,
                '& .MuiListItemIcon-root': {
                  color: muiTheme.palette.text.primary
                }
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: muiTheme.palette.text.primary,
              minWidth: isCollapsed && !isMobile ? '0' : '40px',
            }}>
              {item.icon}
            </ListItemIcon>
            {(!isCollapsed || isMobile) && (
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                  letterSpacing: 0.5,
                  color: muiTheme.palette.text.primary
                }}
              />
            )}
          </ListItem>
        ))}
      </List>

      {(!isCollapsed || isMobile) && (
        <Box sx={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {mode === 'dark' ? <Brightness7Icon sx={{ color: muiTheme.palette.text.primary }} /> : <Brightness4Icon sx={{ color: muiTheme.palette.text.primary }} />}
          </IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? mobileOpen : true}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                '& .MuiDrawer-paper': { 
                  width: isCollapsed && !isMobile ? collapsedWidth : drawerWidth,
                  boxSizing: 'border-box',
                  borderRight: 'none',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: mobileOpen || !isCollapsed 
                    ? '0 8px 32px rgba(0,0,0,0.5)' 
                    : 'none'
                },
              }}
            >
              {drawer}
            </Drawer>
            
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: 3, 
                width: { 
                  md: `calc(100% - ${isCollapsed ? collapsedWidth : drawerWidth}px)` 
                },
                background: muiTheme.palette.background.default,
                transition: 'all 0.3s ease',
                color: muiTheme.palette.text.primary
              }}
            >
              {isMobile && (
                <IconButton 
                  onClick={handleDrawerToggle}
                  sx={{ 
                    mb: 2,
                    background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00ccff, #00ffcc)',
                      boxShadow: '0 0 15px rgba(0,204,255,0.5)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              <Container maxWidth="lg">
                <Routes>
                  <Route path="/" element={<Dashboard sweatData={sweatData} />} />
                  <Route path="/consultation" element={<Consultation />} />
                </Routes>
              </Container>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
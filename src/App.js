import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Dashboard from "./components/dashboard";
import Consultation from "./components/consultation";

function App() {
  const [sweatData, setSweatData] = useState({
    sodium: 0,
    glucose: 0,
    hydration: 0,
    lactate: 0,
  });

  useEffect(() => {
    // Advanced socket configuration with fallback mechanisms
    const socket = io("https://sweatsensorbackend.vercel.app", {
      transports: ['websocket', 'polling'],
      forceNew: true,
      reconnection: true,
      timeout: 10000
    });
    // const socket = io("https://sweatsensorbackend.vercel.app", {
    //   // Comprehensive connection options
    //   forceNew: true,
    //   reconnection: true,
    //   reconnectionAttempts: 10,
    //   reconnectionDelay: 2000,
    //   timeout: 40000,
      
    //   // Explicit transport configuration
    //   transports: ['websocket', 'polling'],
      
    //   // Cross-origin handling
    //   withCredentials: false,
      
    //   // Additional connection parameters
    //   extraHeaders: {
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // });

    // Comprehensive connection lifecycle management
    const handleConnect = () => {
      console.log("🟢 Socket Connected", {
        id: socket.id,
        connected: socket.connected,
        transport: socket.io.engine.transport.name
      });
    };

    
      // Optional: Implement custom reconnection logic
      if (error.message.includes("websocket")) {
        socket.io.opts.transports = ['polling'];
        socket.connect();
      }
    });

    const handleConnectError = (error) => {
      console.error("🔴 Detailed Connection Error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        type: typeof error
      });
    };



    // Attach event listeners
    socket.io.on("reconnect_attempt", handleReconnectAttempt);
    socket.on("connect", handleConnect);
    socket.on("connect_error", (error) => {
      console.error("Detailed Connection Error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        type: typeof error
      });
    });

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SweatSense
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/consultation">
            Consult a Doctor
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard sweatData={sweatData} />} />
          <Route path="/consultation" element={<Consultation />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
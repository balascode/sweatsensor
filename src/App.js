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
    // Comprehensive socket configuration
    const socket = io("https://sweatsensorbackend.vercel.app", {
      path: "/socket.io/", // Match server's socket path
      forceNew: true,      // Create a new connection each time
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,      // Connection timeout
      transports: ['websocket', 'polling'], // Specify transports
      withCredentials: true,
    });

    // Extensive logging and error handling
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
      console.log("Socket Connected URL:", socket.io.uri);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection Error Details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket Disconnected. Reason:", reason);
    });

    socket.on("sweatData", (data) => {
      console.log("✅ Received Sweat Data:", data);
      setSweatData(data);
    });

    // Cleanup function
    return () => {
      socket.disconnect();
    };
  }, []);


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
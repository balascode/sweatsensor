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
    // Advanced socket configuration for Vercel deployment
    const socket = io("https://sweatsensorbackend.vercel.app", {
      path: "/socket.io/",
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 30000,
      transports: ['websocket', 'polling'],
      withCredentials: false, // Set to false if cross-origin
    });

    // Comprehensive connection lifecycle logging
    socket.io.on("reconnect_attempt", (attempt) => {
      console.log(`Attempting to reconnect (Attempt ${attempt})`);
    });

    socket.on("connect", () => {
      console.log("🟢 Socket Connected:", {
        id: socket.id,
        connected: socket.connected,
        url: socket.io.uri
      });
    });

    socket.on("connect_error", (error) => {
      console.error("🔴 Detailed Connection Error:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("🔵 Socket Disconnected:", {
        reason: reason,
        reconnecting: socket.io.reconnecting
      });
    });

    socket.on("sweatData", (data) => {
      console.log("📊 Received Sweat Data:", data);
      setSweatData(data);
    });

    // Cleanup on component unmount
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
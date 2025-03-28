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
    // Configure socket connection with more detailed options
    const socket = io("https://sweatsensorbackend.vercel.app", {
      // Specify the path explicitly if needed
      path: "/socket.io/",
      
      // Enable CORS and credentials
      withCredentials: true,
      
      // Specify transport methods
      transports: ['websocket', 'polling'],
      
      // Optional: reconnection settings
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully at:", socket.io.uri);
    });

    socket.on("sweatData", (data) => {
      console.log("Received sweat data:", data);
      setSweatData(data);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("sweatData");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
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
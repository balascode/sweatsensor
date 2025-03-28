import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Dashboard from "./components/dashboard";
import Consultation from "./components/consultation";

// const socket = io("http://localhost:5000");
const socket = io("https://sweatsensorbackend.vercel.app/");

function App() {
  const [sweatData, setSweatData] = useState({
    sodium: 0,
    glucose: 0,
    hydration: 0,
    lactate: 0,
  });

  useEffect(() => {
    // Log the full socket URL
    console.log("Connecting to socket at:", socket.io.uri);
  
    // Log the socket path being used
    console.log("Socket path:", socket.io.opts.path);
  
    socket.on("connect", () => {
      console.log("Socket connected successfully at:", socket.io.uri);
    });
  
    socket.on("sweatData", (data) => {
      console.log("Received sweat data:", data);
      setSweatData(data);
    });
  
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  
    return () => {
      socket.off("sweatData");
      socket.off("connect");
      socket.off("disconnect");
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
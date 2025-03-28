import React from "react";
import { Typography, Button, Box } from "@mui/material";

function Consultation() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Consult a Doctor
      </Typography>
      <Typography paragraph>
        Book an online consultation with a specialist based on your sweat data.
      </Typography>
      <Button variant="contained" color="primary">
        Book Now (Demo)
      </Button>
    </Box>
  );
}

export default Consultation;
import React from "react";
import { Grid, Card, CardContent, Typography, Alert, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Dashboard({ sweatData }) {
  // Health score (simple average for demo)
  const healthScore = Math.round(
    (sweatData.sodium + sweatData.glucose + sweatData.hydration + sweatData.lactate) / 4
  );

  // Alerts logic
  const getAlert = () => {
    if (sweatData.sodium > 80) return { severity: "error", message: "High sodium levels!" };
    if (sweatData.hydration < 70) return { severity: "warning", message: "Low hydration!" };
    return { severity: "success", message: "All levels normal." };
  };

  // Chart data (mock history)
  const chartData = {
    labels: ["5s ago", "Now"],
    datasets: [
      { label: "Sodium", data: [50, sweatData.sodium], borderColor: "#f44336" },
      { label: "Glucose", data: [10, sweatData.glucose], borderColor: "#2196f3" },
      { label: "Hydration", data: [80, sweatData.hydration], borderColor: "#4caf50" },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Real-Time Sweat Analysis
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Biomarkers</Typography>
              <Typography>Sodium: {sweatData.sodium} mg/L</Typography>
              <Typography>Glucose: {sweatData.glucose} mg/dL</Typography>
              <Typography>Hydration: {sweatData.hydration}%</Typography>
              <Typography>Lactate: {sweatData.lactate} mmol/L</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Health Score</Typography>
              <Typography variant="h4" color={healthScore > 70 ? "green" : "red"}>
                {healthScore}/100
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Alert severity={getAlert().severity}>{getAlert().message}</Alert>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Trend Analysis</Typography>
              <Line data={chartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
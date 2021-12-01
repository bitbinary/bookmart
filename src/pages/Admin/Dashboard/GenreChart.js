import { LinearProgress, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import LineCharts from "utils/AdminPageComponents/AddBook/DashboardPageComponent/LineCharts";
import { AdminDashboard } from "context/Dashboard";


export default function GenreChart() {
  const { genresVisualX, genresVisualY, genresloading, genreserror } =
    useContext(AdminDashboard);
  if (genreserror) return <>Failed to load visual</>;
  return (
    <Box  elevation={4} p={1}>
      <Typography m={1} variant="h5">Sales Report by Genres</Typography>
      <Box sx={{ background: "transparent", marginTop: "15px" }}>
        {!genresloading ? (
          <LineCharts
            xVariables={genresVisualX}
            yVariables={genresVisualY}
            title="Genre Summary"
          />
        ) : (
          <LinearProgress />
        )}
      </Box>
    </Box>
  );
}

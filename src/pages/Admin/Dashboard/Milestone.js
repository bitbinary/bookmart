import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, Paper, Stack } from "@mui/material";
import { AdminDashboard } from "context/Dashboard";

export default function Milestone() {
   const {totalNumberOfSales, totRevenue, totalRegistrations} = useContext(AdminDashboard)
  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-around" }} gap={3}>
            <Stack display="flex" flexWrap="wrap" component={Paper} elevation={4} p={3}>
              <Typography
                variant="h5"
                gutterBottom
                // sx={{ color: '#0092bd' }}
              >
                Total Orders Completed
              </Typography>
              <Typography
                variant="h2"
                gutterBottom
                sx={{ color: '#0092bd' }}
              >
                {totalNumberOfSales}
                {!totalNumberOfSales && <CircularProgress color="success" />}
              </Typography>
            </Stack>
            <Box component={Paper} elevation={4} p={3}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                // sx={{ color: '#0092bd' }}
              >
                Total Revenue Made
              </Typography>
              <Typography
                variant="h2"
                gutterBottom
                sx={{ color: '#0092bd' }}
              >
               {!totRevenue? <CircularProgress color="success" />:new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(totRevenue.toFixed(2))}
              </Typography>
            </Box>
            <Box component={Paper} elevation={4} p={3}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                // sx={{ color: '#0092bd' }}
              >
                Total Number of User Registrations
              </Typography>
              <Typography
                variant="h2"
                gutterBottom
                sx={{ color: '#0092bd' }}
              >
                {totalRegistrations}
               {!totalRegistrations && <CircularProgress color="success" />}

              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

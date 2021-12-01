import { Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import GenreChart from "./GenreChart";
import Milestone from "./Milestone";
import RegistrationChart from "./Registrations";
import TitleChart from "./TitleChart";
import TransactionChart from "./TransactionChart";
export default function Charts() {
  return (
    <Box p={1}>
      <Typography m={1} variant="h4" sx={{ color: "white" }}>
        Dashboard
      </Typography>

      <Grid gap={5} container justifyContent="space-around">
        <Grid component={Paper} elevation={4} item sm={12} md={12}>
          <Milestone />
        </Grid>
        <Grid component={Paper} elevation={4} item sm={12} md={5}>
          <GenreChart />
        </Grid>
        <Grid component={Paper} elevation={4} item sm={12} md={5}>
          <TitleChart />
        </Grid>
        <Grid component={Paper} elevation={4} item sm={12} lg={5}>
          <TransactionChart />
        </Grid>
        <Grid component={Paper} elevation={4} item sm={12} lg={5}>
          <RegistrationChart />
        </Grid>
      </Grid>
    </Box>
  );
}

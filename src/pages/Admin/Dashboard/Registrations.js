import React, { useContext } from "react";
import LineCharts from "utils/AdminPageComponents/AddBook/DashboardPageComponent/LineCharts";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LinearProgress, Paper, Typography } from "@mui/material";
import { AdminDashboard } from "context/Dashboard";

export default function RegistrationChart() {
  const { registrationData, userloading, usererror } =
    useContext(AdminDashboard);
  const [period, setPeriod] = React.useState("monthly");
  const [changeVariables, setChangeVariables] = React.useState("count");

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };
  if(usererror) return <>Failed to load visual</>; 
  return (
    <Box component={Paper} elevation={4} p={1}>
      <Typography variant="h5">Registration Report by time</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="registration-label">
            Registration Summary by period
          </InputLabel>
          <Select
            labelId="registration-label"
            id="demo-simple-select"
            value={period}
            label="Registration Summary by period"
            onChange={handlePeriodChange}
          >
            <MenuItem value={"weekly"}>By Week</MenuItem>
            <MenuItem value={"monthly"}>By Month</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ background: "transparent" }}>
        {!userloading?<LineCharts
          xVariables={registrationData[period]?.["timeline"]}
          yVariables={registrationData[period]?.[changeVariables]}
          title="Registration Summary"
        />: (
          <LinearProgress />
        )}
      </Box>
    </Box>
  );
}

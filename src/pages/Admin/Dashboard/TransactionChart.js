import React, { useContext } from "react";
import LineCharts from "utils/AdminPageComponents/AddBook/DashboardPageComponent/LineCharts";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LinearProgress, Paper, Typography } from "@mui/material";
import { AdminDashboard } from "context/Dashboard";

export default function TransactionChart() {
  const { transactionData, transactionerror, transactionloading } =
    useContext(AdminDashboard);
  const [period, setPeriod] = React.useState("monthly");
  const [changeVariables, setChangeVariables] = React.useState("revenues");

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleVariableChange = (event) => {
    setChangeVariables(event.target.value);
  };
  if(transactionerror) return <>Failed to load visual</>;
  return (
    <Box
      // component={Paper}
      elevation={4}
      p={1}
    >
      <Typography variant="h5">Transaction Report by time</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="transaction-label" >
            Transaction Summary by period
          </InputLabel>
          <Select
            labelId="transaction-label"
            id="demo-simple-select"
            value={period}
            label="Transaction Summary by period"
            onChange={handlePeriodChange}
          >
            <MenuItem value={"weekly"}>By Week</MenuItem>
            <MenuItem value={"monthly"}>By Month</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="orders-revenues-label" >
            Orders Vs Revenue
          </InputLabel>
          <Select
            labelId="orders-revenues-label"
            id="demo-simple-select"
            value={changeVariables}
            label="Count Vs Revenue"
            onChange={handleVariableChange}
          >
            <MenuItem value="revenues">Total Revenue Summary</MenuItem>

            <MenuItem value="counts">Order Count Summary</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ background: "transparent" }}>
       {!transactionloading? <LineCharts
          xVariables={transactionData[period]["timeline"]}
          yVariables={transactionData[period][changeVariables]}
          title="Transaction Summary"
        />: (
          <LinearProgress />
        )}
      </Box>
    </Box>
  );
}

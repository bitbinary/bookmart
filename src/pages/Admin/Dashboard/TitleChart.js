import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import LineCharts from "utils/AdminPageComponents/AddBook/DashboardPageComponent/LineCharts";
import { AdminDashboard } from "context/Dashboard";

export default function TitleChart() {
  const { topSellersData, summaryloading, summaryerror } =
    useContext(AdminDashboard);
  const [month, setMonth] = useState("April");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  if (summaryerror) return <>Failed to load visual</>;
  return (
    <Box elevation={4} p={1}>
      <Typography m={1} variant="h5">
        Top Sellers by month
      </Typography>
      {!summaryloading ? (
        <>
          <FormControl fullWidth>
            <InputLabel id="topsellers-label">
              Transaction Summary by period
            </InputLabel>
            <Select
              labelId="topsellers-label"
              id="demo-simple-select"
              value={month}
              label="Transaction Summary by period"
              onChange={handleMonthChange}
            >
              {Object.keys(topSellersData || []).map((month) => {
                return (
                  <MenuItem value={month} key={month}>
                    {month}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Box sx={{ background: "transparent" }}>
            <LineCharts
              xVariables={topSellersData?.[month]?.["titles"]}
              yVariables={topSellersData?.[month]?.["counts"]}
              title="Top Sellers Summary by Month"
            />
          </Box>
        </>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}

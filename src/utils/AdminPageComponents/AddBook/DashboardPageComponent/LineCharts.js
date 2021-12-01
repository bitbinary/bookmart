import * as React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Box } from "@mui/system";

export default function LineCharts(props) {
  const { xVariables, yVariables, title } = props;

  const plotData = {
    labels: xVariables,
    datasets: [
      {
        fillColor: [],
        label: title,
        data: yVariables,
        backgroundColor: [
          "#00ffdf",
          "#00ffd1",
          "#00ffc0",
          "#00ffac",
          "#00ff96",
          "#0fff7c",
          "#3dff60",
          "#5aff3b",
          "#5aff3b",
          "#00e97b",
          "#00cea5",
          "#00b1bb",
          "#0092bd",
          "#0073a9",
          "#005586",
          "#2e3a5c",
        ],
        borderColor: "#2d485c",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio:false,
    legend: {
      position: "bottom",
    },
  };

  return (
    <Box className="chart-wrapper">
      {title === "Transaction Summary" && (
        <Line data={plotData} options={options}  height="500" />
      )}
       {title === "Registration Summary" && (
        <Line data={plotData} options={options}  height="500" />
      )}

      {title === "Genre Summary" && <Pie options={options} data={plotData}   height="500"  />}
      {title === "Top Sellers Summary by Month" && (
        <Bar options={options} data={plotData}    height="500" />
      )}
    </Box>
  );
}

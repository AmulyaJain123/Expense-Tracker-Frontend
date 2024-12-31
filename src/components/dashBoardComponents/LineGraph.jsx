import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { BarChart, LineChart } from "@mui/x-charts";
import { formatVal } from "../../util/algo";

const monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function LineGraph({ data }) {
  console.log(data);

  function func(event) {
    console.log(event, event.target);
  }

  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          dataKey: "month",
          disableTicks: true,
        },
      ]}
      leftAxis={null}
      dataset={data}
      series={[
        {
          label: "Outgoing",
          dataKey: "outgoing",
          color: "blue",
          valueFormatter: (val) => formatVal(val),
        },
        {
          label: "Incoming",
          dataKey: "incoming",
          color: "green",
          valueFormatter: (val) => formatVal(val),
        },
      ]}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
      width={800}
      height={320}
      borderRadius={5}
      margin={{ top: 10 }}
    />
  );
}

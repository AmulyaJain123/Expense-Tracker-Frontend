import { ScatterChart } from "@mui/x-charts";
import { format, set } from "date-fns";
import { formatVal } from "../../util/algo";
import numeral from "numeral";

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

export default function Scatter({ data, mode, year }) {
  const dates = {
    min: set(new Date(), {
      year: year - 1,
      month: 11,
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).getTime(),
    max: set(new Date(), {
      year: year + 1,
      month: 0,
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).getTime(),
  };

  const tickScale = monthArr.map((i, ind) =>
    set(new Date(), {
      year: year,
      month: ind,
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).getTime()
  );

  tickScale.unshift(
    set(new Date(), {
      year: year - 1,
      month: 11,
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).getTime()
  );

  tickScale.push(
    set(new Date(), {
      year: year + 1,
      month: 0,
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).getTime()
  );

  const configObj = [
    {
      label: "Outgoing",
      color: "#ffba49",
      valueFormatter: (val) => {
        console.log(val);
        return `${
          format(new Date(val.x), "hh:mm a ") + new Date(val.x).toDateString()
        } | ${formatVal(val.y)}`;
      },
      data: data.outgoing.map((v) => ({
        x: v.date,
        y: v.amount,
        id: v.id,
      })),
    },
    {
      label: "Incoming",
      color: "#20a39e",
      valueFormatter: (val) => {
        console.log(val);
        return `${
          format(new Date(val.x), "hh:mm a ") + new Date(val.x).toDateString()
        } | ${formatVal(val.y)}`;
      },
      data: data.incoming.map((v) => ({
        x: v.date,
        y: v.amount,
        id: v.id,
      })),
    },
  ];

  console.log(dates, configObj);

  return (
    <ScatterChart
      width={1200}
      height={450}
      voronoiMaxRadius={5}
      slotProps={{ legend: { hidden: true } }}
      xAxis={[
        {
          valueFormatter: (val) => format(new Date(val), "MMM yy"),
          tickInterval: tickScale,

          ...dates,
        },
      ]}
      yAxis={[
        {
          valueFormatter: (val) => numeral(val).format("0") + " ₹",
          scaleType: "log",
          tickInterval: [
            0, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000,
            5000000, 10000000,
          ],
        },
      ]}
      series={
        mode === 0 ? configObj : mode === 1 ? [configObj[0]] : [configObj[1]]
      }
    />
  );
}

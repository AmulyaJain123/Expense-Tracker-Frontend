import { useSelector } from "react-redux";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";
import numeral from "numeral";

const colorPal = [
  "#fd7f6f",
  "#7eb0d5",
  "#b2e061",
  "#bd7ebe",
  "#ffb55a",
  "#ffee65",
  "#beb9db",
  "#fdcce5",
  "#8bd3c7",
];

export default function PieChart1() {
  const filteredData = useSelector((data) => data.distribution.filteredData);
  const [activeSector, setActiveSector] = useState(null);

  function sectorHover(event, index) {
    const percent = numeral(event.percent).format("0.00%");
    const name = event.name;
    setActiveSector({ index, percent, name });
  }

  function legendHover(event, index) {
    // console.log("legend", event, index);

    const percent = numeral(event.payload.percent).format("0.00%");
    const name = event.payload.name;
    setActiveSector({ index, percent, name });
  }

  return (
    <section className="relative flex h-[550px] pt-4 flex-grow">
      {filteredData != null ? (
        <>
          {filteredData.length != 0 ? (
            <div className="flex relative justify-center items-center flex-grow mt-4">
              <div className="absolute top-[48%] right-[44%] ">
                {activeSector === null ? (
                  ""
                ) : (
                  <div className="flex flex-grow items-center flex-col">
                    <p className="text-base flex-grow flex  font-medium mb-2">
                      {activeSector.name}
                    </p>
                    <span className="text-base pl-2 flex-grow flex  font-semibold">
                      {activeSector.percent}
                    </span>
                  </div>
                )}
              </div>
              <PieChart width={600} height={500} className="">
                <Legend
                  align="center"
                  verticalAlign="top"
                  iconType="circle"
                  onMouseEnter={(event, index) => legendHover(event, index)}
                  onMouseLeave={() => setActiveSector(null)}
                ></Legend>
                <Tooltip filterNull wrapperClassName="hidden" />
                <Pie
                  data={filteredData}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  minAngle={2}
                  isAnimationActive={false}
                  className="cursor-pointer focus:outline-none active:outline-none active:border-none focus:border-none"
                  outerRadius={150}
                  innerRadius={90}
                  label={<CustomLabel />}
                  onMouseEnter={(event, index) => sectorHover(event, index)}
                  onMouseLeave={() => setActiveSector(null)}
                  labelLine={false}
                >
                  {filteredData.map((entry, index) => {
                    return (
                      <Cell
                        stroke="#000"
                        strokeWidth={1}
                        outerRadius={index % 2 === 0 ? 150 : 200}
                        key={`cell-${index}`}
                        fill={colorPal[index]}
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </div>
          ) : (
            <p className="flex py-16 items-center flex-grow text-base font-normal text-stone-500 justify-center">
              No Data to Process
            </p>
          )}
        </>
      ) : (
        <p className="flex py-16 items-center flex-grow text-base font-normal text-stone-500 justify-center">
          No Durations Found
        </p>
      )}
    </section>
  );
}

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2; // Increase the radius to place the label outside the pie chart
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const textAnchor = x > cx ? "start" : "end";
  const dominantBaseline = "middle";

  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        className="font-semibold"
        style={{ fill: "black" }} // Equivalent to Tailwind's text-sm and text-white
      >
        {`${numeral(value).format("0,0.00")} ₹`}
      </text>
    </g>
  );
};

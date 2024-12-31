import { useSelector } from "react-redux";
import { useState } from "react";
import {
  outgoingTransactionCategories,
  incomingTransactionCategories,
} from "../../util/componentNavigation";
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

export default function PieChart2() {
  const filteredData = useSelector((data) => data.distribution.filteredData);
  const [activeSector, setActiveSector] = useState(null);
  const [stage, setStage] = useState(null);

  function sectorHover(event, index) {
    const percent = numeral(event.percent).format("0.00%");
    const name = event.name;
    setActiveSector({ index, percent, name });
  }

  function sectorClick(event, index) {
    // console.log("click", event, index);
    setStage({ level: 1, ind: index });
    setActiveSector(null);
  }
  function sectorClick2(event, index) {
    setStage((preval) => ({ ind: index }));
    setActiveSector(null);
  }

  function legendHover(event, index) {
    // console.log("legend", event, index);

    const percent = numeral(event.payload.percent).format("0.00%");
    const name = event.payload.name;
    setActiveSector({ index, percent, name });
  }

  function goBack() {
    setStage(null);
  }

  return (
    <section className="relative flex h-[620px] pt-4 flex-grow">
      {filteredData != null ? (
        <>
          {filteredData[1] != undefined &&
          filteredData[1].name === "Incoming" &&
          filteredData[1].subFields.length != 0 ? (
            <div className="flex relative justify-center items-center flex-grow mt-4">
              <div
                style={{ top: stage === null ? "36.5%" : "38.5%" }}
                className="absolute flex justify-between items-center right-[36.5%] w-[180px] h-[180px] rounded-full"
              >
                {activeSector === null ? (
                  ""
                ) : (
                  <div className="flex flex-grow items-center flex-col">
                    <p className="text-base flex-grow flex max-w-[200px] text-center  font-medium mb-2">
                      {activeSector.name}
                    </p>
                    <span className="text-base pl-2 flex-grow flex  font-semibold">
                      {activeSector.percent}
                    </span>
                  </div>
                )}
              </div>
              {stage != null ? (
                <button
                  onClick={() => goBack()}
                  className="flex z-20 rounded-full justify-center items-center text-3xl text-black absolute left-[-5px] top-[50%] -translate-y-[50%]"
                >
                  <i className="fi fi-ss-angle-circle-left flex justify-center items-center"></i>
                </button>
              ) : null}
              {stage != null ? (
                <div className="flex absolute bottom-[-5px] right-[50%] translate-x-[50%]">
                  <span>{incomingTransactionCategories[stage.ind].name}</span>
                </div>
              ) : null}

              {stage === null ? (
                <PieChart width={600} height={600} className="">
                  <Legend
                    align="center"
                    verticalAlign="top"
                    iconType="circle"
                    onMouseEnter={(event, index) => legendHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    onClick={(event, index) => sectorClick2(event, index)}
                  ></Legend>
                  <Tooltip filterNull wrapperClassName="hidden" />
                  <Pie
                    data={filteredData[1].subFields}
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
                    onClick={(event, index) => sectorClick2(event, index)}
                    labelLine={false}
                  >
                    {filteredData[1].subFields.map((entry, index) => {
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
              ) : (
                <PieChart width={600} height={600} className="">
                  <Legend
                    align="center"
                    verticalAlign="top"
                    iconType="circle"
                    onMouseEnter={(event, index) => legendHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                  ></Legend>
                  <Tooltip filterNull wrapperClassName="hidden" />
                  <Pie
                    data={filteredData[1].subFields[stage.ind].subFields}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    minAngle={2}
                    isAnimationActive={false}
                    className="cursor-pointer focus:outline-none active:outline-none active:border-none focus:border-none"
                    outerRadius={170}
                    innerRadius={140}
                    label={<CustomLabel />}
                    onMouseEnter={(event, index) => sectorHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    labelLine={false}
                  >
                    {filteredData[1].subFields[stage.ind].subFields.map(
                      (entry, index) => {
                        return (
                          <Cell
                            stroke="#000"
                            strokeWidth={1}
                            outerRadius={index % 2 === 0 ? 150 : 200}
                            key={`cell-${index}`}
                            fill={colorPal[8 - index]}
                          />
                        );
                      }
                    )}
                  </Pie>
                  <Pie
                    data={filteredData[1].subFields}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    minAngle={2}
                    isAnimationActive={false}
                    className="cursor-pointer focus:outline-none active:outline-none active:border-none focus:border-none"
                    outerRadius={130}
                    innerRadius={100}
                    onMouseEnter={(event, index) => sectorHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    labelLine={false}
                  >
                    {filteredData[1].subFields.map((entry, index) => {
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
              )}
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

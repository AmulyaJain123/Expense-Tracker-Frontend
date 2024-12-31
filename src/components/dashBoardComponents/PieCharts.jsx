import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts";
import { formatVal } from "../../util/algo";
import { useState } from "react";
import right from "../../assets/right.png";
import { useLoaderData } from "react-router-dom";
import noEntries from "../../assets/empty.png";

export default function PieCharts({ data }) {
  const { colors } = useLoaderData();
  console.log(
    data,
    colors,
    colors
      .filter((i) => i.list.length === 2 && i.list[0] === "outgoing")
      .map((j) => j.color)
  );
  const [pc2Content, setPc2Content] = useState(null);
  const [pc3Content, setPc3Content] = useState(null);

  const isHidden = true;

  function firstOutgoingClick(event, d) {
    console.log(event, d);
    if (d.dataIndex >= data.fullOutgoing.length) {
      return;
    }
    setPc2Content({
      name: data.pc2[d.dataIndex].label,
      data: data.fullOutgoing[d.dataIndex],
    });
  }

  function firstIncomingClick(event, d) {
    console.log(event, d);
    if (d.dataIndex >= data.fullIncoming.length) {
      return;
    }
    setPc3Content({
      name: data.pc3[d.dataIndex].label,
      data: data.fullIncoming[d.dataIndex],
    });
  }

  return (
    <div className="flex flex-grow justify-evenly mt-6 ml-24 ">
      <div className="flex flex-col relative items-center">
        <span className="pr-24 text-lg font-medium mb-8 ">
          Overall Expenses
        </span>
        {data.pc1.filter((i) => i.value != 0).length === 0 ? (
          <div className="min-h-[200px]">
            <div className="flex absolute top-[50%] w-[300px] left-[50%] pr-24 translate-x-[-50%] translate-y-[-50%]  flex-grow flex-col justify-center items-center space-y-3">
              <img src={noEntries} className="w-[80px] h-[80px]" alt="" />
              <span>No Transactions Found</span>
            </div>
          </div>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <PieChart
              colors={["blue", "green"]}
              series={[
                {
                  data: data.pc1,
                  highlightScope: { fade: "global", highlight: "item" },
                  cornerRadius: 8,
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter: (val) => formatVal(val.data),
                },
              ]}
              slotProps={{ legend: { hidden: isHidden } }}
              height={240}
              width={350}
            />
          </Box>
        )}
      </div>

      <div className="flex flex-col relative items-center">
        <span className="pr-24 text-lg font-medium mb-8 ">
          Outgoing Expenses
        </span>
        {pc2Content != null ? (
          <div className="absolute top-[50%] translate-y-[-50%] -left-10 transalate-x-[-100%]">
            <button onClick={() => setPc2Content(null)}>
              <img
                src={right}
                className="w-[25px] h-[25px] rotate-180"
                alt=""
              />
            </button>
          </div>
        ) : null}
        {data.pc2.filter((i) => i.value != 0).length === 0 ? (
          <div className="flex absolute top-[50%] w-[300px] left-[50%] pr-24 translate-x-[-50%] translate-y-[-50%]  flex-grow flex-col justify-center items-center space-y-3">
            <img src={noEntries} className="w-[80px] h-[80px]" alt="" />
            <span>No Transactions Found</span>
          </div>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            {pc2Content === null ? (
              <PieChart
                series={[
                  {
                    data: data.pc2.map((i, ind) => ({
                      ...i,
                      color: colors.find(
                        (j) =>
                          j.list.length === 2 &&
                          j.list[0] === "outgoing" &&
                          j.list[1] === i.label
                      ).color,
                    })),
                    cornerRadius: 8,
                    highlightScope: { fade: "global", highlight: "item" },

                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },

                    valueFormatter: (val) => formatVal(val.data),
                  },
                ]}
                onItemClick={(event, d) => firstOutgoingClick(event, d)}
                slotProps={{ legend: { hidden: isHidden } }}
                height={240}
                width={350}
              />
            ) : (
              <PieChart
                series={[
                  {
                    data: data.pc2.map((i, ind) => ({
                      ...i,
                      color: colors.find(
                        (j) =>
                          j.list.length === 2 &&
                          j.list[0] === "outgoing" &&
                          j.list[1] === i.label
                      ).color,
                    })),
                    cornerRadius: 5,
                    highlightScope: { highlight: "item" },
                    innerRadius: 0,
                    outerRadius: 70,
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },

                    valueFormatter: (val) => formatVal(val.data),
                  },
                  {
                    data: pc2Content.data.map((i, ind) => ({
                      ...i,
                      color: colors.find(
                        (j) =>
                          j.list.length === 3 &&
                          j.list[0] === "outgoing" &&
                          j.list[1] === pc2Content.name &&
                          j.list[2] === i.label
                      ).color,
                    })),
                    cornerRadius: 8,
                    highlightScope: { fade: "global", highlight: "item" },
                    innerRadius: 90,
                    outerRadius: 120,
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },

                    valueFormatter: (val) => formatVal(val.data),
                  },
                ]}
                slotProps={{ legend: { hidden: isHidden } }}
                height={240}
                width={350}
              />
            )}
          </Box>
        )}

        <div className="min-h-[40px] mt-8 pr-24 flex capitalize">
          {pc2Content != null ? pc2Content.name : ""}
        </div>
      </div>

      <div className="flex flex-col relative items-center">
        <span className="pr-24 text-lg font-medium mb-8 ">
          Incoming Expenses
        </span>
        {pc3Content != null ? (
          <div className="absolute top-[50%] translate-y-[-50%] -left-10 transalate-x-[-100%]">
            <button onClick={() => setPc3Content(null)}>
              <img
                src={right}
                className="w-[25px] h-[25px] rotate-180"
                alt=""
              />
            </button>
          </div>
        ) : null}
        {data.pc3.filter((i) => i.value != 0).length === 0 ? (
          <div className="flex absolute top-[50%] w-[300px] left-[50%] pr-24 translate-x-[-50%] translate-y-[-50%]  flex-grow flex-col justify-center items-center space-y-3">
            <img src={noEntries} className="w-[80px] h-[80px]" alt="" />
            <span>No Transactions Found</span>
          </div>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            {pc3Content === null ? (
              <PieChart
                series={[
                  {
                    data: data.pc3.map((i, ind) => ({
                      ...i,
                      color: colors.find(
                        (j) =>
                          j.list.length === 2 &&
                          j.list[0] === "incoming" &&
                          j.list[1] === i.label
                      ).color,
                    })),
                    cornerRadius: 8,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },

                    valueFormatter: (val) => formatVal(val.data),
                  },
                ]}
                slotProps={{ legend: { hidden: isHidden } }}
                onItemClick={(event, d) => firstIncomingClick(event, d)}
                height={240}
                width={350}
              />
            ) : (
              <PieChart
                series={[
                  {
                    data: data.pc3.map((i, ind) => ({
                      ...i,
                      color: colors.find(
                        (j) =>
                          j.list.length === 2 &&
                          j.list[0] === "incoming" &&
                          j.list[1] === i.label
                      ).color,
                    })),
                    cornerRadius: 5,
                    highlightScope: { highlight: "item" },
                    innerRadius: 0,
                    outerRadius: 70,
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },

                    valueFormatter: (val) => formatVal(val.data),
                  },
                  {
                    data: pc3Content.data.map((i, ind) => ({
                      ...i,
                      color: colors.find(
                        (j) =>
                          j.list.length === 3 &&
                          j.list[0] === "incoming" &&
                          j.list[1] === pc3Content.name &&
                          j.list[2] === i.label
                      ).color,
                    })),
                    cornerRadius: 8,
                    highlightScope: { fade: "global", highlight: "item" },
                    innerRadius: 90,
                    outerRadius: 120,
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },

                    valueFormatter: (val) => formatVal(val.data),
                  },
                ]}
                slotProps={{ legend: { hidden: isHidden } }}
                height={240}
                width={350}
              />
            )}
          </Box>
        )}
        <div className="min-h-[40px] mt-8 pr-24 flex capitalize">
          {pc3Content != null ? pc3Content.name : ""}
        </div>
      </div>
    </div>
  );
}

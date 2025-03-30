import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts";
import { formatVal } from "../../util/algo";
import { useState } from "react";
import right from "../../assets/right.png";
import { useLoaderData } from "react-router-dom";
import noEntries from "../../assets/empty.png";
import { EmptyBox } from "../../UIComponents/NoneFound";

export default function TagsPieChart({ data }) {
  const { tagColors } = useLoaderData();
  console.log(tagColors, data);
  //   console.log(
  //     data,
  //     colors,
  //     colors
  //       .filter((i) => i.list.length === 2 && i.list[0] === "outgoing")
  //       .map((j) => j.color)
  //   );

  return (
    <div className="flex flex-grow justify-evenly mt-2 ml-24 ">
      <div className="flex flex-col relative items-center">
        <span className="pr-24 text-sm font-medium mb-6 ">Expenses</span>
        {data.tagMap.filter((i) => i.value != 0).length === 0 ? (
          <div className="flex text-sm w-[300px] h-[200px]  pr-24   flex-grow flex-col justify-center items-center space-y-3">
            <EmptyBox
              IconSize={50}
              gap={8}
              textSize={14}
              fontWeight={500}
              textColor="#d4d4d4"
              msg="No Transactions Found"
            />
          </div>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <PieChart
              series={[
                {
                  data: data.tagMap.map((i, ind) => {
                    if (RegExp(/\b\d+ Others\b/).test(i.label)) {
                      return {
                        ...i,
                        color: tagColors.at(-1).color,
                      };
                    }
                    return {
                      ...i,
                      color: tagColors.find((j) => j.tag === i.label).color,
                    };
                  }),
                  cornerRadius: 6,
                  highlightScope: { fade: "global", highlight: "item" },

                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },

                  valueFormatter: (val) => formatVal(val.data),
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              height={200}
              width={300}
            />
          </Box>
        )}
      </div>

      <div className="flex flex-col relative items-center">
        <span className="pr-24 text-sm font-medium mb-6 ">Frequency</span>
        {data.tagMap2.filter((i) => i.value != 0).length === 0 ? (
          <div className="flex text-sm w-[300px] h-[200px]  pr-24   flex-grow flex-col justify-center items-center space-y-3">
            <EmptyBox
              IconSize={50}
              gap={8}
              textSize={14}
              fontWeight={500}
              textColor="#d4d4d4"
              msg="No Transactions Found"
            />
          </div>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <PieChart
              series={[
                {
                  data: data.tagMap2.map((i, ind) => {
                    if (RegExp(/\b\d+ Others\b/).test(i.label)) {
                      return {
                        ...i,
                        color: tagColors.at(-1).color,
                      };
                    }
                    return {
                      ...i,
                      color: tagColors.find((j) => j.tag === i.label).color,
                    };
                  }),
                  cornerRadius: 6,
                  highlightScope: { fade: "global", highlight: "item" },

                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              height={200}
              width={300}
            />
          </Box>
        )}
      </div>

      <div className="flex flex-grow flex-col border-l-[1.5px] pl-2 border-stone-500">
        <div className="flex flex-col flex-1 ">
          <span className="font-semibold uppercase text-base">
            Highest Spending Tags{" "}
          </span>
          <div className="flex mt-2 flex-wrap gap-2">
            {data.tagMap.length === 0 ? (
              <span className="rounded-[5px]  flex">
                <span className="rounded-[5px] text-neutral-500 p-1 px-2 bg-white font-medium text-xs">
                  No Tags
                </span>
              </span>
            ) : (
              data.tagMap.map((i) => {
                if (!RegExp(/\b\d+ Others\b/).test(i.label)) {
                  const col = tagColors.find((j) => j.tag === i.label).color;
                  return (
                    <>
                      <span className="rounded-[5px]  flex">
                        <span
                          style={{ backgroundColor: col }}
                          className="w-[15px] rounded-l-[5px]"
                        ></span>
                        <span className="rounded-r-[5px] text-black min-w-[40px] p-[3px] pl-1 pr-2 bg-white  text-xs">
                          {i.label}
                        </span>
                      </span>
                    </>
                  );
                }
              })
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <span className="font-semibold uppercase text-base">
            Most Used Tags{" "}
          </span>
          <div className="flex mt-2 flex-wrap gap-2">
            {data.tagMap2.length === 0 ? (
              <span className="rounded-[5px]  flex">
                <span className="rounded-[5px] text-neutral-500 p-1 px-2 bg-white font-medium text-xs">
                  No Tags
                </span>
              </span>
            ) : (
              data.tagMap2.map((i) => {
                if (!RegExp(/\b\d+ Others\b/).test(i.label)) {
                  const col = tagColors.find((j) => j.tag === i.label).color;
                  return (
                    <span className="rounded-[5px]  flex">
                      <span
                        style={{ backgroundColor: col }}
                        className="w-[15px] rounded-l-[5px]"
                      ></span>
                      <span className="rounded-r-[5px] text-black  pr-2 min-w-[40px] p-[3px] pl-1  bg-white  text-xs">
                        {i.label}
                      </span>
                    </span>
                  );
                }
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

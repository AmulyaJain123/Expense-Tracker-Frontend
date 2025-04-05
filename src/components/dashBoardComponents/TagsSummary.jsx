import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts";
import { formatVal } from "../../util/algo";
import { useState } from "react";
import right from "../../assets/right.png";
import { useLoaderData } from "react-router-dom";
import noEntries from "../../assets/empty.png";
import { EmptyBox } from "../../UIComponents/NoneFound";
import { formatDistanceToNowStrict } from "date-fns";

export default function TagsSummary({ data }) {
  const { tagColors } = useLoaderData();
  console.log(tagColors, data);

  let sum1 = 0;
  let sum2 = 0;

  data.tagMap.forEach((i) => {
    sum1 += i.value;
  });
  data.tagMap2.forEach((i) => {
    sum2 += i.value;
  });

  return (
    <div className="flex flex-grow justify-center mt-2  ">
      <div className="flex flex-col relative mr-6">
        <span className="mx-3 text-sm text-center font-semibold mb-6 ">
          Top 10 Most Spending Tags
        </span>
        <div className="flex flex-col mt-2 flex-wrap gap-2">
          {data.tagMap.length === 0 ? (
            <span className="rounded-[5px] flex justify-center">
              <span className="rounded-[5px] text-neutral-500 p-1 px-2 bg-white font-medium text-xs">
                No Tags
              </span>
            </span>
          ) : (
            data.tagMap.map((i, ind) => {
              let num = (i.value / sum1) * 100;

              return (
                <>
                  <span className="rounded-[5px] items-center flex">
                    <span className="bg-white aspect-square rounded-md flex justify-center items-center h-[23px] mr-1 text-xs font-medium">
                      {ind + 1}
                    </span>
                    <span className="w-[140px] ">
                      <span className="rounded-[5px] text-black min-w-[40px] p-[3px] px-2 bg-white  text-xs">
                        {i.label}
                      </span>
                    </span>
                    <span className="text-neutral-500 mx-2 w-[100px] font-medium text-xs">
                      {formatVal(i.value)}
                    </span>
                    <span className="w-[70px] rounded-sm bg-white flex h-[15px] border-[1.5px] border-[#9f21e3]">
                      <span
                        style={{ width: `${num}%` }}
                        className=" flex bg-[#dc93f6]"
                      ></span>
                    </span>
                  </span>
                </>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col relative border-x-[1.5px] border-neutral-300 px-6">
        <span className="mx-3 text-sm text-center font-semibold mb-6 ">
          Top 10 Most Used Tags
        </span>
        <div className="flex flex-col mt-2 flex-wrap gap-2">
          {data.tagMap2.length === 0 ? (
            <span className="rounded-[5px] justify-center flex">
              <span className="rounded-[5px] text-neutral-500 p-1 px-2 bg-white font-medium text-xs">
                No Tags
              </span>
            </span>
          ) : (
            data.tagMap2.map((i, ind) => {
              let num = (i.value / sum2) * 100;

              return (
                <>
                  <span className="rounded-[5px]  items-center flex">
                    <span className="bg-white aspect-square rounded-md flex justify-center items-center h-[23px] mr-1 text-xs font-medium">
                      {ind + 1}
                    </span>
                    <span className="w-[140px] ">
                      <span className="rounded-[5px] text-black min-w-[40px] p-[3px] px-2 bg-white  text-xs">
                        {i.label}
                      </span>
                    </span>
                    <span className="text-neutral-500 mx-2 w-[30px] font-medium text-xs">
                      {i.value}
                    </span>
                    <span className="w-[70px] rounded-sm bg-white flex h-[15px] border-[1.5px] border-[#9f21e3]">
                      <span
                        style={{ width: `${num}%` }}
                        className=" flex bg-[#dc93f6]"
                      ></span>
                    </span>
                  </span>
                </>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col relative ml-6">
        <span className="mx-3 text-sm text-center font-semibold mb-6 ">
          Top 10 Recently Used Tags
        </span>
        <div className="flex flex-col mt-2 flex-wrap gap-2">
          {data.tagMap3.length === 0 ? (
            <span className="rounded-[5px] flex justify-center">
              <span className="rounded-[5px] text-neutral-500 p-1 px-2 bg-white font-medium text-xs">
                No Tags
              </span>
            </span>
          ) : (
            data.tagMap3.map((i, ind) => {
              return (
                <>
                  <span className="rounded-[5px] items-center flex">
                    <span className="bg-white aspect-square rounded-md flex justify-center items-center h-[23px] mr-1 text-xs font-medium">
                      {ind + 1}
                    </span>
                    <span className="w-[140px] ">
                      <span className="rounded-[5px] text-black min-w-[40px] p-[3px] px-2 bg-white  text-xs">
                        {i.label}
                      </span>
                    </span>
                    <span className="text-neutral-500  capitalize font-medium text-xs">
                      {formatDistanceToNowStrict(new Date(i.value))}
                    </span>
                  </span>
                </>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

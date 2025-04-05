import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PieCharts from "./PieCharts";
import { useLoaderData } from "react-router-dom";
import Pallate from "./Pallate";
import right from "../../assets/right.png";
import PieChart from "./TagsPieChart";
import TagsPieChart from "./TagsPieChart";
import TagPallate from "./TagPallate";
import TagsSummary from "./TagsSummary";

export default function TagDistribution() {
  const { tags } = useLoaderData();
  const data = useSelector((state) => state.dashboard.data);
  const [val, setVal] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data != null) {
      let tagMap = [];
      tags.forEach((i) => {
        tagMap.push({ label: i, value: 0 });
      });
      data.forEach((i) => {
        const amount = i.transactionAmount;
        console.log(i);
        i.tags.forEach((j) => {
          tagMap.find((k) => k.label === j).value += amount;
        });
      });
      tagMap = tagMap.filter((i) => i.value > 0);
      tagMap.sort((a, b) => {
        return b.value - a.value;
      });
      console.log(tagMap);

      let tagMap2 = [];
      tags.forEach((i) => {
        tagMap2.push({ label: i, value: 0 });
      });
      data.forEach((i) => {
        console.log(i);
        i.tags.forEach((j) => {
          tagMap2.find((k) => k.label === j).value += 1;
        });
      });
      tagMap2 = tagMap2.filter((i) => i.value > 0);
      tagMap2.sort((a, b) => {
        return b.value - a.value;
      });
      console.log(tagMap2);

      let tagMap3 = [];
      tags.forEach((i) => {
        tagMap3.push({ label: i, value: 0 });
      });
      data.forEach((i) => {
        console.log(i);
        i.tags.forEach((j) => {
          const val = tagMap3.find((k) => k.label === j).value;
          if (val === 0) {
            tagMap3.find((k) => k.label === j).value = i.createdOn;
          }
        });
      });
      tagMap3 = tagMap3.filter((i) => i.value != 0);
      tagMap3.sort((a, b) => {
        return new Date(b.value).getTime() - new Date(a.value).getTime();
      });

      // if (tagMap.length > 5) {
      //   const val = tagMap[4].value;
      //   let ind = 5;
      //   while (ind < tagMap.length && tagMap[ind].value === val) {
      //     ++ind;
      //   }
      //   if (ind != tagMap.length) {
      //     let sum = 0;
      //     let count = 0;
      //     for (let i = ind; i < tagMap.length; ++i) {
      //       sum += tagMap[i].value;
      //       ++count;
      //     }
      //     let str = `${count} Others`;
      //     tagMap = [...tagMap.slice(0, ind), { label: str, value: sum }];
      //   }
      // }

      // if (tagMap2.length > 5) {
      //   const val = tagMap2[4].value;
      //   let ind = 5;
      //   while (ind < tagMap2.length && tagMap2[ind].value === val) {
      //     ++ind;
      //   }
      //   if (ind != tagMap2.length) {
      //     let sum = 0;
      //     let count = 0;
      //     for (let i = ind; i < tagMap2.length; ++i) {
      //       sum += tagMap2[i].value;
      //       count++;
      //     }
      //     let str = `${count} Others`;
      //     tagMap2 = [...tagMap2.slice(0, ind), { label: str, value: sum }];
      //   }
      // }

      setVal({
        tagMap: tagMap.slice(0, 10),
        tagMap2: tagMap2.slice(0, 10),
        tagMap3: tagMap3.slice(0, 10),
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-grow flex-col  space-y-3">
        <div className="flex flex-col space-y-3 flex-grow rounded-xl p-3 bg-[#f7ebfd]">
          <header className="flex p-[6px] px-4 pr-2 h-fit justify-center rounded-lg bg-[#9f21e3] text-white">
            <span className="text-lg font-semibold ">Tag Distribution</span>
          </header>
          <div className="flex flex-grow py-3 pb-6">
            {val != null ? <TagsSummary data={val} /> : null}
          </div>
          {/* <div className="flex flex-col   flex-grow">
            {open ? <TagPallate /> : null}
            <div className="flex flex-grow flex-col items-center">
              <span className="uppercase text-sm font-medium mb-1">
                {open ? "close legend" : "Open Legend"}
              </span>
              <button
                onClick={() => setOpen((p) => !p)}
                className=" duration-500 hover:scale-110"
              >
                <img
                  src={right}
                  style={{
                    transform: !open ? "rotate(90deg)" : "rotate(-90deg)",
                  }}
                  className="w-[20px] h-[20px] "
                  alt=""
                />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

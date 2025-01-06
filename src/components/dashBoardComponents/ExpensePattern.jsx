import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import right from "../../assets/right.png";
import { getMonth } from "date-fns";
import noEntries from "../../assets/empty.png";
import LineGraph from "./LineGraph";

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

export default function ExpensePattern() {
  const [val, setVal] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const { transactions } = useLoaderData();

  useEffect(() => {
    if (transactions != null) {
      const arr = new Array(12).fill(0);
      const val = { outgoing: [...arr], incoming: [...arr], net: [...arr] };
      for (let i of transactions) {
        if (new Date(i.dateTime).getFullYear() === year) {
          if (i.transactionType === "outgoing") {
            val.outgoing[getMonth(new Date(i.dateTime))] += i.transactionAmount;
            val.net[getMonth(new Date(i.dateTime))] -= i.transactionAmount;
          } else {
            val.incoming[getMonth(new Date(i.dateTime))] += i.transactionAmount;
            val.net[getMonth(new Date(i.dateTime))] += i.transactionAmount;
          }
        }
      }
      const dataset = [];
      for (let i = 0; i < 12; ++i) {
        dataset.push({
          outgoing: val.outgoing[i],
          incoming: val.incoming[i],
          month: monthArr[i],
        });
      }
      setVal(dataset);
    }
  }, [year]);

  console.log(val);

  return (
    <>
      <div className="flex flex-grow flex-col space-y-3">
        <div className="flex flex-col space-y-3 flex-grow rounded-xl p-3 bg-[#f7ebfd]">
          <header className="flex p-[6px] px-3 pr-2 h-fit justify-center rounded-lg bg-[#9f21e3] text-white">
            <span className="text-lg font-semibold ">Expense Pattern</span>
          </header>

          <div className="flex flex-col flex-grow  space-y-3">
            <div className="flex space-x-2 pr-4 text-xs justify-end items-center">
              <button
                onClick={() => setYear((p) => p - 1)}
                className="hover:scale-110 disabled:pointer-events-none disabled:opacity-50 duration-500"
                disabled={
                  transactions.length === 0 ||
                  new Date(
                    transactions[transactions.length - 1].dateTime
                  ).getFullYear() >
                    year - 1
                }
              >
                <img
                  src={right}
                  className="w-[15px] rotate-180 h-[15px] flex justify-center items-center"
                  alt=""
                />
              </button>
              <div className="py-1 px-3 capitalize rounded-md bg-white font-medium">
                {year}
              </div>
              <button
                onClick={() => setYear((p) => p + 1)}
                className="hover:scale-110 disabled:pointer-events-none disabled:opacity-50 duration-500"
                disabled={
                  transactions.length === 0 ||
                  new Date(transactions[0].dateTime).getFullYear() < year + 1
                }
              >
                <img
                  src={right}
                  className="w-[15px]  h-[15px] flex justify-center items-center"
                  alt=""
                />
              </button>
            </div>

            {val &&
            val.filter((i) => i.incoming != 0 || i.outgoing != 0).length !=
              0 ? (
              <div className="flex normal-case flex-grow text-xs flex-col space-y-[6px]  p-2 ">
                {val ? (
                  <>
                    <div className="flex space-x-4 pl-8">
                      <div className="flex items-center">
                        <div className="w-[15px] h-[15px] bg-blue-600 rounded-full border mr-[6px] border-stone-500"></div>
                        <span>Outgoing</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[15px] h-[15px] bg-green-600 rounded-full border mr-[6px] border-stone-500"></div>
                        <span>Incoming</span>
                      </div>
                    </div>
                    <LineGraph data={val} />
                  </>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-grow text-sm flex-col justify-center items-center space-y-2">
                <img src={noEntries} className="w-[60px] h-[60px]" alt="" />
                <span>No Transactions Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

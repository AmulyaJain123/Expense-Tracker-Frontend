import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import right from "../../assets/right.png";
import { getMonth } from "date-fns";
import noEntries from "../../assets/empty.png";
import LineGraph from "./LineGraph";
import Scatter from "./Scatter";
import { EmptyBox } from "../../UIComponents/NoneFound";

export default function ScatterGraph() {
  const [val, setVal] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const { transactions } = useLoaderData();
  const [mode, setMode] = useState(0);

  useEffect(() => {
    if (transactions != null) {
      const val = { outgoing: [], incoming: [] };
      for (let i of transactions) {
        if (new Date(i.dateTime).getFullYear() === year) {
          if (i.transactionType === "outgoing") {
            val.outgoing.push({
              id: i.transactionId,
              amount: i.transactionAmount,
              date: new Date(i.dateTime).getTime(),
            });
          } else {
            val.incoming.push({
              id: i.transactionId,
              amount: i.transactionAmount,
              date: new Date(i.dateTime).getTime(),
            });
          }
        }
      }
      setVal(val);
    }
  }, [year]);

  console.log(val);

  return (
    <>
      <div className="flex flex-grow flex-col mx-3 space-y-3">
        <div className="flex flex-col space-y-3 flex-grow rounded-xl p-3 bg-[#f7ebfd]">
          <header className="flex p-[6px] px-4 pr-2 h-fit justify-center rounded-md bg-[#9f21e3] text-white">
            <span className="text-lg font-semibold ">Expense Distribution</span>
          </header>

          <div className="flex flex-col flex-grow  space-y-2">
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

            {val && (val.incoming.length != 0 || val.outgoing.length != 0) ? (
              <div className="flex normal-case flex-grow flex-col space-y-[6px]  p-3 ">
                {val ? (
                  <>
                    <div className="flex space-x-6 pl-6">
                      <div className="flex space-x-2 text-xs">
                        <div className="flex items-center">
                          <div className="w-[15px] h-[15px] bg-[#ffba49] rounded-full border mr-[6px] border-stone-500"></div>
                          <span>Outgoing</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-[15px] h-[15px] bg-[#20a39e] rounded-full border mr-[6px] border-stone-500"></div>
                          <span>Incoming</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="flex space-x-3 text-xs items-center">
                          <button
                            style={{
                              color: mode === 0 ? "white" : "black",
                              backgroundColor:
                                mode === 0 ? "#9f21e3" : "#dc93f6",
                            }}
                            onClick={() => setMode(0)}
                            disabled={mode === 0}
                            className="p-1 px-3 rounded-md font-medium  hover:scale-105 duration-500  disabled:pointer-events-none "
                          >
                            Both
                          </button>
                          <button
                            style={{
                              color: mode === 1 ? "white" : "black",
                              backgroundColor:
                                mode === 1 ? "#9f21e3" : "#dc93f6",
                            }}
                            onClick={() => setMode(1)}
                            disabled={mode === 1}
                            className="p-1 px-3 rounded-md font-medium  hover:scale-105 duration-500  disabled:pointer-events-none "
                          >
                            Only Outgoing
                          </button>
                          <button
                            style={{
                              color: mode === 2 ? "white" : "black",
                              backgroundColor:
                                mode === 2 ? "#9f21e3" : "#dc93f6",
                            }}
                            onClick={() => setMode(2)}
                            disabled={mode === 2}
                            className="p-1 px-3 rounded-md font-medium  hover:scale-105 duration-500  disabled:pointer-events-none "
                          >
                            Only Incoming
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-grow justify-center">
                      <Scatter mode={mode} data={val} year={year} />
                    </div>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-grow text-sm flex-col min-h-[400px] justify-center items-center space-y-2">
                <EmptyBox
                  IconSize={50}
                  gap={8}
                  textSize={14}
                  fontWeight={500}
                  textColor="#d4d4d4"
                  msg="No Transactions Found"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import right from "../../assets/right.png";
import { getMonth } from "date-fns";
import noEntries from "../../assets/empty.png";
import LineGraph from "./LineGraph";
import Scatter from "./Scatter";

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
      <div className="flex flex-grow flex-col mx-4 space-y-4">
        <div className="flex flex-col space-y-4 flex-grow rounded-xl p-4 bg-[#f7ebfd]">
          <header className="flex p-2 px-4 pr-2 h-fit justify-center rounded-xl bg-[#9f21e3] text-white">
            <span className="text-2xl font-semibold ">
              Expense Distribution
            </span>
          </header>
          {val && (val.incoming.length != 0 || val.outgoing.length != 0) ? (
            <div className="flex flex-col flex-grow  space-y-3">
              <div className="flex space-x-3 pr-4 text-sm xl:text-base justify-end items-center">
                <button
                  onClick={() => setYear((p) => p - 1)}
                  className="hover:scale-110 disabled:pointer-events-none disabled:opacity-50 duration-500"
                  disabled={
                    new Date(
                      transactions[transactions.length - 1].dateTime
                    ).getFullYear() >
                    year - 1
                  }
                >
                  <img
                    src={right}
                    className="w-[20px] rotate-180 h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
                <div className="py-1 px-3 capitalize rounded-lg bg-white font-medium">
                  {year}
                </div>
                <button
                  onClick={() => setYear((p) => p + 1)}
                  className="hover:scale-110 disabled:pointer-events-none disabled:opacity-50 duration-500"
                  disabled={
                    new Date(transactions[0].dateTime).getFullYear() < year + 1
                  }
                >
                  <img
                    src={right}
                    className="w-[20px]  h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </div>

              <div className="flex normal-case flex-grow flex-col space-y-2  p-4 ">
                {val ? (
                  <>
                    <div className="flex space-x-8 pl-8">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <div className="w-[20px] h-[20px] bg-[#ffba49] rounded-full border mr-2 border-stone-500"></div>
                          <span>Outgoing</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-[20px] h-[20px] bg-[#20a39e] rounded-full border mr-2 border-stone-500"></div>
                          <span>Incoming</span>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex space-x-4 items-center">
                          <button
                            style={{
                              color: mode === 0 ? "white" : "black",
                              backgroundColor:
                                mode === 0 ? "#9f21e3" : "#dc93f6",
                            }}
                            onClick={() => setMode(0)}
                            disabled={mode === 0}
                            className="p-1 px-4 rounded-lg font-medium  hover:scale-105 duration-500  disabled:pointer-events-none "
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
                            className="p-1 px-4 rounded-lg font-medium  hover:scale-105 duration-500  disabled:pointer-events-none "
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
                            className="p-1 px-4 rounded-lg font-medium  hover:scale-105 duration-500  disabled:pointer-events-none "
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
            </div>
          ) : (
            <div className="flex flex-grow flex-col min-h-[500px] justify-center items-center space-y-3">
              <img src={noEntries} className="w-[80px] h-[80px]" alt="" />
              <span>No Transactions Found</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

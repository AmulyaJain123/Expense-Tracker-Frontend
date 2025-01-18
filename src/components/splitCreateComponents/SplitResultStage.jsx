import { useEffect, useState } from "react";
import { formatVal, splitAlgo } from "../../util/algo";
import { useSelector } from "react-redux";
import load from "../../assets/loader.gif";
import General from "./General";
import Bills from "./Bills";
import Stats from "./Stats";
import Transactions from "./Transactions";

export default function SplitResultStage() {
  const bills = useSelector((state) => state.splitCreate.bills);
  const friends = useSelector((state) => state.splitCreate.friends);
  const splitInfo = useSelector((state) => state.splitCreate.splitInfo);
  const [split, setSplit] = useState(null);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    document
      .getElementById("Top")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    // [finalMatrix, finalList, oweList, transactions, expenditure, spendings]
    const res = splitAlgo(bills);
    setSplit(res);
  }, []);

  const selectedBill = useSelector(
    (state) => state.splitCreate.selectBillNavStatus
  );

  return (
    <div className="flex=grow  flex justify-center">
      <div className="flex p-1 sm:p-3  rounded-2xl max-w-[900px] mx-1 sm:mx-6 flex-grow flex-col">
        <h1 className="py-1 sm:py-[6px] text-[20px] sm:text-[25px] font-bold text-center rounded-lg sm:rounded-xl bg-[#9d4edd] text-white ">
          SPLIT Result
        </h1>
        <div className="text-sm font-bold min-h-[600px] flex text-center bg-white rounded-xl p-2 sm:p-4 mt-4 flex-grow">
          {split === null ? (
            <div className="mt-36 sm:mt-48 flex justify-center flex-grow">
              <img
                src={load}
                className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : (
            <div className="flex flex-col flex-grow">
              <div className="flex flex-wrap gap-x-[6px] gap-y-[6px] sm:gap-x-[10px] p-2 sm:p-[10px] items-center ">
                <button
                  style={{
                    color: status === 0 ? "white" : "black",
                    backgroundColor: status === 0 ? "#9d4edd" : "#d393f6",
                  }}
                  disabled={status === 0}
                  onClick={() => setStatus(0)}
                  className="uppercase py-[1px] disabled:pointer-events-none hover:scale-110 duration-700 font-medium  text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
                >
                  General
                </button>
                <button
                  style={{
                    color: status === 1 ? "white" : "black",
                    backgroundColor: status === 1 ? "#9d4edd" : "#d393f6",
                  }}
                  disabled={status === 1}
                  onClick={() => setStatus(1)}
                  className="uppercase  py-[1px] disabled:pointer-events-none hover:scale-110 duration-700 font-medium  text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
                >
                  Transactions
                </button>
                <button
                  style={{
                    color: status === 2 ? "white" : "black",
                    backgroundColor: status === 2 ? "#9d4edd" : "#d393f6",
                  }}
                  disabled={status === 2}
                  onClick={() => setStatus(2)}
                  className="uppercase  py-[1px] disabled:pointer-events-none hover:scale-110 duration-700 font-medium  text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
                >
                  Stats
                </button>
                <button
                  style={{
                    color: status === 3 ? "white" : "black",
                    backgroundColor: status === 3 ? "#9d4edd" : "#d393f6",
                  }}
                  disabled={status === 3}
                  onClick={() => setStatus(3)}
                  className="uppercase  py-[1px] disabled:pointer-events-none hover:scale-110 duration-700 font-medium  text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
                >
                  Bills
                </button>
              </div>

              <div className="flex bg-slate-100 p-2 sm:p-3 mt-[6px] sm:mt-2  rounded-xl sm:rounded-2xl flex-grow flex-col">
                {status === 0 ? (
                  <General data={{ splitInfo, friends }} />
                ) : null}
                {status === 3 ? <Bills data={bills} /> : null}
                {status === 2 ? <Stats data={split} /> : null}
                {status === 1 ? <Transactions data={split} /> : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

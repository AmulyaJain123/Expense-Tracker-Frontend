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
    <div className="flex=grow flex justify-center">
      <div className="flex p-4  rounded-2xl max-w-[1200px] mx-8 flex-grow flex-col">
        <h1 className="py-[8px] text-[35px] font-bold text-center rounded-2xl bg-[#9d4edd] text-white ">
          SPLIT Result
        </h1>
        <div className="text-3xl font-bold min-h-[800px] flex text-center bg-white rounded-2xl p-4 mt-6 flex-grow">
          {split === null ? (
            <div className="mt-64 flex justify-center flex-grow">
              <img
                src={load}
                className="w-[50px] h-[50px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : (
            <div className="flex flex-col flex-grow">
              <div className="flex space-x-4 p-4">
                <button
                  style={{
                    color: status === 0 ? "white" : "black",
                    backgroundColor: status === 0 ? "#9d4edd" : "#d393f6",
                  }}
                  disabled={status === 0}
                  onClick={() => setStatus(0)}
                  className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
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
                  className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
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
                  className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
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
                  className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
                >
                  Bills
                </button>
              </div>

              <div className="flex bg-slate-100 p-4 mt-2 rounded-3xl flex-grow flex-col">
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { formats } from "numeral";
import exit from "../../assets/backward.png";
import add from "../../assets/plus.png";
import application from "../../assets/application.png";
import { useSelector } from "react-redux";
import { formatVal } from "../../util/algo";
import noEntries from "../../assets/empty.png";

export default function WidgetSquare() {
  const [val, setVal] = useState(null);
  const transactions = useSelector((state) => state.dashboard.data);

  useEffect(() => {
    if (transactions != null) {
      let pos = 0;
      let neg = 0;
      let net = 0;
      // console.log(transactions);
      for (let i of transactions) {
        // console.log(i);
        if (i.transactionType === "incoming") {
          pos += i.transactionAmount;
          net += i.transactionAmount;
        } else {
          neg += i.transactionAmount;
          net -= i.transactionAmount;
        }
      }
      setVal({ pos, neg, net });
    }
  }, [transactions]);

  return (
    <section className="flex w-[500px]  aspect-square flex-col space-y-4">
      <div className="flex flex-col space-y-4  rounded-xl p-4 bg-[#f7ebfd]">
        <header className="flex p-2 px-4 pr-2 h-fit justify-center rounded-xl bg-[#9f21e3] text-white">
          <span className="text-2xl font-semibold ">Financial Summary</span>
        </header>
        {transactions && transactions.length != 0 ? (
          <div className="flex flex-col space-y-2 px-4 py-2 text-center">
            <div className="flex flex-col  space-y-2">
              <span className=" rounded-lg bg-black text-white  p-[6px] font-medium">
                Outgoing Expense
              </span>
              <span className="text-blue-700 bg-[#f8f9fa] border-[#adb5bd] border-b-2 p-1 font-medium">
                {val && formatVal(val.neg)}
              </span>
            </div>

            <div className="flex flex-col  space-y-2">
              <span className="rounded-lg bg-black text-white p-[6px] font-medium">
                Incoming Expense
              </span>
              <span className="text-green-500 bg-[#f8f9fa] border-[#adb5bd] border-b-2 p-1 font-medium">
                {val && formatVal(val.pos)}
              </span>
            </div>

            <div className="flex flex-col  space-y-2">
              <span className="rounded-lg bg-black text-white p-[6px] font-medium">
                Net Expense
              </span>
              {val ? (
                <span
                  style={{
                    color:
                      val.net < 0 ? "blue" : val.net > 0 ? "#22c55e" : "black",
                  }}
                  className="flex justify-center bg-[#f8f9fa] border-[#adb5bd] border-b-2 space-x-2 p-1 font-medium"
                >
                  <span className="">
                    {val.net > 0 ? "(+)" : val.net < 0 ? "(-)" : ""}
                  </span>
                  <span>{val && formatVal(Math.abs(val.net))}</span>
                </span>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-grow h-[265px] flex-col justify-center items-center space-y-3">
            <img src={noEntries} className="w-[80px] h-[80px]" alt="" />
            <span>No Transactions Found</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-grow space-x-4">
        <Link
          to={"/track"}
          className="rounded-2xl aspect-square  group  duration-500 flex-grow flex justify-center items-center bg-[#f7ebfd] flex-1 p-4"
        >
          <img
            src={exit}
            className="w-[100px] group-hover:scale-[120%] duration-500"
            alt=""
          />
        </Link>
        <Link
          to={"/track/protected/create"}
          className="rounded-2xl aspect-square  group  duration-500 flex-grow flex justify-center items-center bg-[#f7ebfd] flex-1 p-4"
        >
          <img
            src={add}
            className="w-[100px] group-hover:scale-[120%] duration-500"
            alt=""
          />
        </Link>
        <Link
          to={"/track/protected/categories"}
          className="rounded-2xl aspect-square  group  duration-500 flex-grow flex justify-center items-center bg-[#f7ebfd] flex-1 p-4"
        >
          <img
            src={application}
            className="w-[100px] group-hover:scale-[120%] duration-500"
            alt=""
          />
        </Link>
      </div>
    </section>
  );
}

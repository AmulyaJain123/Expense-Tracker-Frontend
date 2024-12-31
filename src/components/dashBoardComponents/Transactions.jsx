import { useState, useRef, useEffect } from "react";
import { formatVal } from "../../util/algo";
import { format, isAfter } from "date-fns";
import numeral from "numeral";
import empty from "../../assets/empty.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import more from "../../assets/open-book.gif";

export default function Transactions() {
  const data = useSelector((state) => state.dashboard.data);
  console.log(data);
  return (
    <div className="flex flex-col relative p-4  rounded-2xl mx-4 h-fit bg-[#f7ebfd]">
      <Link
        to={"/track/protected/transactions"}
        className="absolute rounded-lg bg-[#fffdf7] border-2 border-stone-700 text-[black] font-medium shadow-xl text-md bottom-[40px] z-20  right-[50px]"
      >
        <div className="flex space-x-1 px-2 items-center">
          <img src={more} className="w-[50px]" alt="" />
        </div>
      </Link>
      <div className=" flex justify-center mb-4 pl-6 pr-2 rounded-xl  py-2 bg-[#9f21e3] ">
        <span className="text-2xl text-white font-semibold">
          Last 15 Transactions
        </span>
      </div>
      <div className="p-4 px-8 rounded-t-sm space-y-2 rounded-b-xl bg-[#f7ebfd]  ">
        <>
          <header className="flex border-b-[2px] border-stone-500 pb-2 mr-4 space-x-3 flex-grow text-md font-semibold text-stone-500 p-1 px-4">
            <div className="flex-[0.14] flex space-x-3  ">
              <span className="flex justify-center items-center">Name</span>
            </div>
            <div className="flex-[0.14]  flex space-x-3 ">
              <span className="flex justify-center items-center">From</span>
            </div>
            <div className="flex-[0.12]  flex space-x-3 ">
              <span className="flex justify-center items-center">Amt</span>
            </div>
            <div className=" flex-[0.14] flex space-x-3 ">
              <span className="flex justify-center items-center">To</span>
            </div>
            <div className=" flex-[0.13] flex space-x-3 ">
              <span className="flex justify-center items-center">Date</span>
            </div>
            <div className=" flex-[0.13] flex space-x-3 ">
              <span className="flex justify-center items-center">Created</span>
            </div>
            <div className="flex-[0.22]  flex space-x-3 ">
              <span className="flex justify-center items-center">Category</span>
            </div>
            <div className="w-[30px] flex space-x-3">Type</div>
          </header>
          <div className="flex flex-col pt-4 space-y-3 h-[450px] overflow-auto customScrollThin pr-2">
            {data != null && data.length === 0 ? (
              <div className="flex flex-col mt-24 items-center space-y-4">
                <img
                  src={empty}
                  className="h-[100px] w-[100px] flex justify-center items-center"
                  alt=""
                />
                <p className="text-center text-stone-500 mt-16 text-lg font-medium">
                  No Transactions Found
                </p>
              </div>
            ) : (
              <>
                {data != null &&
                  [...data].slice(0, 15).map((i, ind) => {
                    const {
                      category,
                      dateTime,
                      createdOn,
                      from,
                      to,
                      transactionAmount,
                      transactionName,
                      transactionType,
                    } = i;

                    const date = format(new Date(dateTime), "hh:mm dd-MM-yy");
                    const createdOnDate = format(
                      new Date(createdOn),
                      "hh:mm dd-MM-yy"
                    );

                    return (
                      <div
                        key={ind}
                        className="flex rounded-sm text-sm border-b-2 border-[#adb5bd] bg-[#f8f9fa] text-black space-x-3 p-1 py-2 px-4"
                      >
                        <span className="flex-[0.14]  ">
                          {transactionName.length > 15
                            ? transactionName.substr(0, 15) + "..."
                            : transactionName}
                        </span>
                        <span className="flex-[0.14]   ">
                          {from.length > 15 ? from.substr(0, 15) + "..." : from}
                        </span>
                        <span className="flex-[0.12]   ">
                          {`${numeral(transactionAmount).format("0")}`.length >
                          8
                            ? formatVal(transactionAmount).substr(0, 8) + "..."
                            : formatVal(transactionAmount)}
                        </span>
                        <span className=" flex-[0.14]  ">
                          {to.length > 15 ? to.substr(0, 15) + "..." : to}
                        </span>
                        <span className=" flex-[0.13]  ">{date}</span>
                        <span className=" flex-[0.13]  ">{createdOnDate}</span>
                        <span className="flex-[0.22] capitalize">
                          {category.length === 3
                            ? `${
                                category[1].length > 11
                                  ? category[1].substr(0, 11) + "..."
                                  : category[1]
                              } > ${
                                category[2].length > 11
                                  ? category[2].substr(0, 11) + "..."
                                  : category[2]
                              }
                          `
                            : `${
                                category[1].length > 11
                                  ? category[1].substr(0, 11) + "..."
                                  : category[1]
                              }`}
                        </span>
                        <span
                          style={{
                            color:
                              transactionType != "outgoing"
                                ? "blue"
                                : "#55a630",
                          }}
                          className="w-[30px] font-semibold "
                        >
                          {transactionType === "outgoing" ? "OUT" : "IN"}
                        </span>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </>
      </div>
    </div>
  );
}

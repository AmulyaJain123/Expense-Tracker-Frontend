import { useState, useRef, useEffect } from "react";
import { formatVal } from "../../util/algo";
import { format, isAfter } from "date-fns";
import numeral from "numeral";
import empty from "../../assets/empty.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import more from "../../assets/open-book.gif";
import { EmptyBox } from "../../UIComponents/NoneFound";

export default function Transactions() {
  const data = useSelector((state) => state.dashboard.data);
  console.log(data);
  return (
    <div className="flex flex-col relative p-3  rounded-2xl mx-3 h-fit bg-[#f7ebfd]">
      <Link
        to={"/track/protected/transactions"}
        className="absolute rounded-md bg-[#fffdf7] border-[1.5px] border-stone-700 text-[black] font-medium shadow-xl text-md bottom-[25px] z-20  right-[25px]"
      >
        <div className="flex space-x-1 px-2 items-center">
          <img src={more} className="w-[40px]" alt="" />
        </div>
      </Link>
      <div className=" flex justify-center mb-3 pl-4 pr-2 rounded-lg  py-[6px] bg-[#9f21e3] ">
        <span className="text-lg text-white font-semibold">
          Last 15 Transactions
        </span>
      </div>
      <div className="p-3 px-6 rounded-t-sm space-y-[6px] rounded-b-xl bg-[#f7ebfd]  ">
        <>
          <header className="flex border-b-[1.5px] border-stone-500 pb-[6px] mr-2 space-x-2 flex-grow text-xs font-semibold text-stone-500 p-1 px-3">
            <div className="flex-[0.14] flex space-x-3  ">
              <span className="flex justify-center items-center">Name</span>
            </div>
            <div className="flex-[0.14]  flex space-x-3 ">
              <span className="flex justify-center items-center">From</span>
            </div>

            <div className=" flex-[0.14] flex space-x-3 ">
              <span className="flex justify-center items-center">To</span>
            </div>
            <div className="flex-[0.14]  flex space-x-3 ">
              <span className="flex justify-center items-center">Amt</span>
            </div>
            <div className=" flex-[0.12] flex space-x-3 ">
              <span className="flex justify-center items-center">Date</span>
            </div>
            <div className=" flex-[0.12] flex space-x-3 ">
              <span className="flex justify-center items-center">Created</span>
            </div>
            <div className="flex-[0.20]  flex space-x-3 ">
              <span className="flex justify-center items-center">Category</span>
            </div>
            <div className="w-[30px] flex space-x-3">Type</div>
          </header>
          <div className="flex flex-col pt-3 space-y-2 h-[350px] overflow-auto customScrollThin pr-2">
            {data != null && data.length === 0 ? (
              <div className="flex flex-col flex-grow items-center space-y-3">
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

                    const date = format(new Date(dateTime), "HH:mm dd MM yy");
                    const createdOnDate = format(
                      new Date(createdOn),
                      "HH:mm dd MM yy"
                    );

                    return (
                      <div
                        key={ind}
                        className="flex rounded-sm text-[11px] border-b-[1.5px] border-[#adb5bd] bg-[#f8f9fa] text-black space-x-2 p-1 py-[6px] px-3"
                      >
                        <span className="flex-[0.14]  ">
                          {transactionName.length > 15
                            ? transactionName.substr(0, 15) + "..."
                            : transactionName}
                        </span>
                        <span className="flex-[0.14]   ">
                          {from.length > 15 ? from.substr(0, 15) + "..." : from}
                        </span>

                        <span className=" flex-[0.14]  ">
                          {to.length > 15 ? to.substr(0, 15) + "..." : to}
                        </span>
                        <span className="flex-[0.14]   ">
                          {`${numeral(transactionAmount).format("0")}`.length >
                          8
                            ? formatVal(transactionAmount).substr(0, 8) + "..."
                            : formatVal(transactionAmount)}
                        </span>
                        <span className=" flex-[0.12]  ">
                          <div className="flex gap-x-[4px]">
                            <span className="w-[30px]">
                              {date.split(" ")[0]}
                            </span>
                            <div className="flex ">
                              <span className="w-[15px] text-center">
                                {date.split(" ")[1]}
                              </span>
                              -
                              <span className="w-[15px] text-center">
                                {date.split(" ")[2]}
                              </span>
                              -
                              <span className="w-[15px] text-center">
                                {date.split(" ")[3]}
                              </span>
                            </div>
                          </div>
                        </span>
                        <span className=" flex-[0.12]  ">
                          <div className="flex gap-x-[4px]">
                            <span className="w-[30px]">
                              {createdOnDate.split(" ")[0]}
                            </span>
                            <div className="flex ">
                              <span className="w-[15px] text-center">
                                {createdOnDate.split(" ")[1]}
                              </span>
                              -
                              <span className="w-[15px] text-center">
                                {createdOnDate.split(" ")[2]}
                              </span>
                              -
                              <span className="w-[15px] text-center">
                                {createdOnDate.split(" ")[3]}
                              </span>
                            </div>
                          </div>
                        </span>
                        <span className="flex-[0.20] capitalize">
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
                                ? "#55a630"
                                : "blue",
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

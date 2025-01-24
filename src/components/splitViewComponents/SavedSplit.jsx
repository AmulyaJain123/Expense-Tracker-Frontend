import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function SavedSplit({ data }) {
  return (
    <Link
      to={`${data.splitId}`}
      className="flex flex-col hover:scale-105 hover:shadow-lg duration-500 h-[160px] tab:h-[190px] rounded-lg bg-slate-100 "
    >
      <div className="rounded-t-lg h-[40px] striped"></div>
      <div className="flex flex-col text-[11px] tab:text-xs space-y-[6px] pl-2 tab:pl-3">
        <div className="flex space-x-2 tab:space-x-3">
          <div className="flex flex-col p-[6px] w-[128px] tab:w-[150px] py-[10px] tab:py-3 space-y-[6px] tab:space-y-2">
            <div className="flex flex-col">
              <span className="font-semibold">SPLIT Name</span>{" "}
              <span className="pl-[3px]">
                <OnlyXChars x={15} text={data.splitInfo.splitName} />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Created On</span>{" "}
              <span className="pl-[3px]">
                {new Date(data.splitInfo.splitDate).toDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-[6px] w-[128px] tab:w-[150px] py-2 tab:py-3 space-y-[6px] tab:space-y-2">
            <div className="flex flex-col">
              <span className="font-semibold">Description</span>{" "}
              <span className="pl-[3px]">
                <OnlyXChars x={30} text={data.splitInfo.description} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex p-[6px] w-[148px] tab:w-[175px] py-2 tab:py-3 space-x-4 tab:space-x-6">
          <div className="flex space-x-1 lg:space-x-[6px]">
            <span className="font-semibold">PARTICIPANTS</span>{" "}
            <span className="pl-[3px]">
              <OnlyXChars x={15} text={data.friends.length} />
            </span>
          </div>
          <div className="flex space-x-1 lg:space-x-[6px]">
            <span className="font-semibold">BILLS</span>{" "}
            <span className="pl-[3px]">
              <OnlyXChars x={15} text={data.bills.length} />
            </span>
          </div>
          <div className="flex space-x-1 lg:space-x-[6px]">
            <span className="font-semibold text-nowrap">SHARED TO </span>{" "}
            <span className="pl-[3px]">
              <OnlyXChars x={15} text={data.sharedTo.length} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { format } from "date-fns";

export default function SavedSplit({ data }) {
  return (
    <Link
      to={`${data.splitId}`}
      className="flex flex-col hover:scale-105 hover:shadow-lg shadow duration-500 h-[160px] tab:h-[190px] rounded-lg bg-slate-100 "
    >
      <div className="rounded-t-lg h-[30px] tab:h-[40px]  striped"></div>
      <div className="flex flex-col pt-3 text-[11px] flex-grow tab:text-xs space-y-[6px] justify-between pl-2 tab:pl-3 w-[260px] tab:w-[300px]">
        <div className="flex flex-col gap-y-2 px-1 tab:gap-y-3">
          <div className="flex gap-x-2">
            <span className="font-semibold">SPLIT Name</span>{" "}
            <span className="pl-[3px]">
              <OnlyXChars x={15} text={data.splitInfo.splitName} />
            </span>
          </div>
          <div className="flex gap-x-2">
            <span className="font-semibold">Created On</span>{" "}
            <span className="pl-[3px]">
              {format(new Date(data.splitInfo.splitDate), "EEE, dd MMM yyyy")}
            </span>
          </div>

          <div className="flex gap-x-2">
            <span className="font-semibold">Description</span>{" "}
            <span className="pl-[3px]">
              <OnlyXChars x={15} text={data.splitInfo.description} />
            </span>
          </div>
        </div>

        <div className="flex p-[6px] px-1 py-2 tab:py-3 space-x-3 tab:space-x-4">
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
            <span className="font-semibold text-nowrap">SHARED </span>{" "}
            <span className="pl-[3px]">
              <OnlyXChars x={15} text={data.sharedTo.length} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

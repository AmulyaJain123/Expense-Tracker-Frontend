import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function SavedSplit({ data }) {
  return (
    <Link
      to={`${data.splitId}`}
      className="flex hover:scale-105 hover:shadow-lg duration-500 h-[200px] rounded-xl bg-slate-100 "
    >
      <div className="rounded-l-xl w-[100px] striped"></div>
      <div className="flex flex-col space-y-2 pl-4">
        <div className="flex space-x-4">
          <div className="flex flex-col p-2 w-[200px] py-4 space-y-2">
            <div className="flex flex-col">
              <span className="font-semibold">SPLIT Name</span>{" "}
              <span className="pl-1">
                <OnlyXChars x={15} text={data.splitInfo.splitName} />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Created On</span>{" "}
              <span className="pl-1">
                {new Date(data.splitInfo.splitDate).toDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-2 w-[200px] py-4 space-y-2">
            <div className="flex flex-col">
              <span className="font-semibold">Description</span>{" "}
              <span className="pl-1">
                <OnlyXChars x={30} text={data.splitInfo.description} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex p-2 w-[220px] py-4 space-x-8">
          <div className="flex space-x-2">
            <span className="font-semibold">PARTICIPANTS</span>{" "}
            <span className="pl-1">
              <OnlyXChars x={15} text={data.friends.length} />
            </span>
          </div>
          <div className="flex space-x-2">
            <span className="font-semibold">BILLS</span>{" "}
            <span className="pl-1">
              <OnlyXChars x={15} text={data.bills.length} />
            </span>
          </div>
          <div className="flex space-x-2">
            <span className="font-semibold text-nowrap">SHARED TO </span>{" "}
            <span className="pl-1">
              <OnlyXChars x={15} text={data.sharedTo.length} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

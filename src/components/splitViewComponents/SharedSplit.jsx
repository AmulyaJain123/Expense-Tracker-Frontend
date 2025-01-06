import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { format } from "date-fns";
import user from "../../assets/user.png";

export default function SharedSplit({ data }) {
  return (
    <Link
      to={`${data.splitId}`}
      className="flex hover:scale-105 hover:shadow-lg duration-500 h-[150px] rounded-lg bg-slate-100 "
    >
      <div className="rounded-l-lg w-[75px] striped"></div>
      <div className="flex flex-col text-xs space-y-[6px] pl-3 w-[300px]">
        <div className="p-2 pb-0 pt-4">
          <div className="flex space-x-4">
            <span className="font-semibold">SPLIT Name</span>{" "}
            <span className="pl-1">
              <OnlyXChars x={20} text={data.splitInfo.splitName} />
            </span>
          </div>
        </div>
        <div className="p-2 py-0">
          <div className="flex space-x-4">
            <span className="font-semibold">Description</span>{" "}
            <span className="pl-1">
              <OnlyXChars x={20} text={data.splitInfo.description} />
            </span>
          </div>
        </div>

        <div className="p-2 py-0">
          <div className="flex space-x-4 items-center">
            <span className="font-semibold">Shared By</span>{" "}
            <div className="pl-1">
              <div className="bg-slate-200 p-1 rounded-full items-center flex space-x-2">
                <img
                  src={data.splitInfo.sharedBy.profilePic || user}
                  className="w-[22px] h-[22px] rounded-full"
                  alt=""
                />
                <span className="pr-2 text-[11px]">
                  {
                    <OnlyXChars
                      x={20}
                      text={data.splitInfo.sharedBy.username}
                    />
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 py-0">
          <div className="flex space-x-4">
            <span className="font-semibold">Shared On</span>{" "}
            <span className="pl-1">
              {`${format(
                new Date(data.splitInfo.sharedOn),
                "hh:mm a"
              )} | ${new Date(data.splitInfo.sharedOn).toDateString()}`}
            </span>
          </div>
        </div>

        <div className="flex p-2 pt-0 w-[220px]  space-x-8">
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
        </div>
      </div>
    </Link>
  );
}

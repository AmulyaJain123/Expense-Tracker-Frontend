import { useState, useEffect } from "react";
import user from "../../assets/user.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import Requests from "./Requests";
import Find from "./Find";
import Friends from "./Friends";

export default function Inbox() {
  const [selectedMode, setSelectedMode] = useState(0);

  return (
    <>
      <div className="flex flex-col h-full w-full space-y-2">
        <div className="flex space-x-[6px] pl-2 lg:space-x-2 text-xs lg:text-sm">
          <button
            style={{
              backgroundColor: selectedMode === 0 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 0 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(0)}
            className="py-[2px] lg:py-[2px] px-2 lg:px-3 rounded-md   font-semibold "
          >
            Friends
          </button>
          <button
            style={{
              backgroundColor: selectedMode === 1 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 1 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(1)}
            className="py-[2px] lg:py-[2px] px-2 lg:px-3 rounded-md  font-semibold "
          >
            Requests
          </button>
          <button
            style={{
              backgroundColor: selectedMode === 2 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 2 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(2)}
            className="py-[2px] lg:py-[2px] px-2 lg:px-3 rounded-md  font-semibold "
          >
            Find People
          </button>
        </div>

        <div
          style={{ height: "calc( 100% - 35px )" }}
          className="flex  w-full bg-slate-100 p-2 rounded-lg"
        >
          {selectedMode === 0 ? (
            <Friends />
          ) : selectedMode === 1 ? (
            <Requests />
          ) : (
            <Find />
          )}
        </div>
      </div>
    </>
  );
}

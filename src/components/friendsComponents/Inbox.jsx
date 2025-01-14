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
      <div className="flex flex-col flex-grow space-y-2">
        <div className="flex space-x-2 lg:space-x-3">
          <button
            style={{
              backgroundColor: selectedMode === 0 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 0 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(0)}
            className="py-[4px] lg:py-1 px-3 lg:px-4 rounded-md text-xs lg:text-sm  font-semibold "
          >
            Friends
          </button>
          <button
            style={{
              backgroundColor: selectedMode === 1 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 1 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(1)}
            className="py-[4px] lg:py-1 px-3 lg:px-4 rounded-md text-xs lg:text-sm  font-semibold "
          >
            Requests
          </button>
          <button
            style={{
              backgroundColor: selectedMode === 2 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 2 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(2)}
            className="py-[4px] lg:py-1 px-3 lg:px-4 rounded-md text-xs lg:text-sm  font-semibold "
          >
            Find People
          </button>
        </div>

        <div className="flex  bg-slate-100 p-3 rounded-xl">
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

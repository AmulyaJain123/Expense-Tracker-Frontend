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
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex space-x-4">
          <button
            style={{
              backgroundColor: selectedMode === 0 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 0 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(0)}
            className="py-1 px-6 rounded-lg text-lg  font-semibold "
          >
            Friends
          </button>
          <button
            style={{
              backgroundColor: selectedMode === 1 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 1 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(1)}
            className="py-1 px-6 rounded-lg text-lg  font-semibold "
          >
            Requests
          </button>
          <button
            style={{
              backgroundColor: selectedMode === 2 ? "#9d4edd" : "#dc93f6",
              color: selectedMode != 2 ? "black" : "#fff",
            }}
            onClick={() => setSelectedMode(2)}
            className="py-1 px-6 rounded-lg text-lg  font-semibold "
          >
            Find People
          </button>
        </div>

        <div className="flex flex-grow bg-slate-100 p-4 rounded-xl">
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

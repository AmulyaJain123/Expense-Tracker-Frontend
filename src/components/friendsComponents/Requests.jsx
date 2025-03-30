import { useState } from "react";
import SendRequests from "./SendRequests";
import RecievedRequests from "./RecievedRequests";

export default function Requests() {
  const [selectedMode, setSelectedMode] = useState(0);

  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className="text-xl mob:text-2xl font-bold flex items-center justify-between p-[6px] lg:p-2 pl-4 lg:pl-6 pr-2 mob:pr-4 lg:pr-3 bg-white rounded-lg ">
          <span className="uppercase">Requests</span>
          <div className="flex space-x-[6px] mob:space-x-3 text-xs">
            <button
              style={{
                backgroundColor: selectedMode === 0 ? "#9d4edd" : "#dc93f6",
                color: selectedMode != 0 ? "black" : "#fff",
              }}
              onClick={() => setSelectedMode(0)}
              className="py-1 px-[6px] mob:px-2 rounded-md  font-medium "
            >
              <span className="hidden mob:flex">Sent</span>
              <i className="fi fi-ss-paper-plane flex mob:hidden"></i>
            </button>
            <button
              style={{
                backgroundColor: selectedMode === 1 ? "#9d4edd" : "#dc93f6",
                color: selectedMode != 1 ? "black" : "#fff",
              }}
              onClick={() => setSelectedMode(1)}
              className="py-1 px-[6px] mob:px-2 rounded-md  font-medium "
            >
              <span className="hidden mob:flex">Received</span>
              <i className="fi fi-ss-paper-plane flex mob:hidden rotate-180"></i>
            </button>
          </div>
        </div>
        <div style={{ height: "calc( 100% - 48px )" }} className=" rounded-lg">
          <div style={{ height: "calc( 100%  )" }} className="flex flex-col ">
            {selectedMode === 0 ? <SendRequests /> : <RecievedRequests />}
          </div>
        </div>
      </div>
    </>
  );
}

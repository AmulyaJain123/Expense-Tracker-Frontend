import { useState } from "react";
import SendRequests from "./SendRequests";
import RecievedRequests from "./RecievedRequests";

export default function Requests() {
  const [selectedMode, setSelectedMode] = useState(0);

  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className="text-3xl font-bold flex justify-between p-4 pl-8 bg-white rounded-xl ">
          <span className="uppercase">Requests</span>
          <div className="flex space-x-4">
            <button
              style={{
                backgroundColor: selectedMode === 0 ? "#9d4edd" : "#dc93f6",
                color: selectedMode != 0 ? "black" : "#fff",
              }}
              onClick={() => setSelectedMode(0)}
              className="py-1 px-3 rounded-lg text-base font-medium "
            >
              Sent
            </button>
            <button
              style={{
                backgroundColor: selectedMode === 1 ? "#9d4edd" : "#dc93f6",
                color: selectedMode != 1 ? "black" : "#fff",
              }}
              onClick={() => setSelectedMode(1)}
              className="py-1 px-3 rounded-lg text-base font-medium "
            >
              Received
            </button>
          </div>
        </div>
        <div className=" rounded-xl flex-grow ">
          <div className="flex flex-col flex-grow">
            {selectedMode === 0 ? <SendRequests /> : <RecievedRequests />}
          </div>
        </div>
      </div>
    </>
  );
}

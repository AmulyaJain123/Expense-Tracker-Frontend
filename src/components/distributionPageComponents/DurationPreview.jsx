import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { distributionActions } from "../../store/main";
import { useState, useRef, useEffect } from "react";

const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DurationPreview() {
  const dispatch = useDispatch();
  const durations = useSelector((state) => state.distribution.durations);

  function removeClick(ind) {
    dispatch(distributionActions.popDuration(ind));
  }

  return (
    <div className="flex flex-col space-y-4 flex-grow rounded-xl p-4 bg-white shadow-lg">
      <div className="flex text-xl font-semibold justify-center p-2 mt-2 uppercase">
        Durations Added
      </div>
      <div className="flex flex-col pt-8 space-y-4 items-center flex-grow py-4">
        {durations.length === 0 ? (
          <p className="flex justify-center mt-16 text-lg font-medium ">
            No Durations
          </p>
        ) : (
          <>
            {durations.map((i, index) => {
              const date1 = `${
                day[(new Date(i.first).getDay() + 6) % 7]
              } ${new Date(i.first).getDate()}/${
                new Date(i.first).getMonth() + 1
              }/${new Date(i.first).getFullYear()}`;
              const date2 = `${
                day[(new Date(i.second).getDay() + 6) % 7]
              } ${new Date(i.second).getDate()}/${
                new Date(i.second).getMonth() + 1
              }/${new Date(i.second).getFullYear()}`;

              return (
                <div
                  key={Math.random()}
                  className="flex py-1 w-fit rounded-md bg-[#9d4edd] text-white items-center space-x-1"
                >
                  <div className="flex flex-grow space-x-2 px-4">
                    <span className="text-base font-medium  ">{date1}</span>
                    <span className="mx-2">-</span>
                    <span className="text-base font-medium text-right">
                      {date2}
                    </span>
                  </div>
                  <button
                    onClick={() => removeClick(index)}
                    className="pr-2 justify-center items-center"
                  >
                    <i className="fi fi-ss-cross-circle text-xl flex h-[30px] justify-center items-center"></i>
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

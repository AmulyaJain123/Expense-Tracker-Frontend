import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../store/main";
import { useSelector } from "react-redux";
import DatePicker from "./DatePicker";
import { format } from "date-fns";

const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Button = styled.button`
  position: absolute;
  bottom: 2rem; /* bottom-8 */
  right: 2rem; /* right-8 */
  padding-left: 0.8rem; /* px-4 */
  padding-right: 0.8rem; /* px-4 */
  padding-top: 0.4rem; /* py-2 */
  padding-bottom: 0.4rem; /* py-2 */
  border-radius: 0.6rem; /* rounded-xl */
  font-size: 0.9rem; /* text-lg */
  font-weight: 800; /* font-semibold */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-xl */
  border-width: 1.5px; /* border-[3px] */
  border-color: #38a3a5; /* border-[#2dc653] */
  background-color: #38a3a5; /* bg-[#2dc653] */
  color: #fff; /* text-[#f0fff1] */
  transition-property: background-color, color, transform; /* hover:bg-[#f0fff1] hover:text-[#2dc653] hover:scale-110 */
  transition-duration: 700ms; /* duration-700 */

  &:hover {
    background-color: #fff; /* hover:bg-[#f0fff1] */
    color: #38a3a5; /* hover:text-[#2dc653] */
    transform: scale(1.1); /* hover:scale-110 */
  }
`;

export default function DateFilter() {
  const dispatch = useDispatch();
  const filterParam = useSelector((state) => state.transactions.filterParam);
  const durations = useSelector((state) => state.transactions.durations);

  useEffect(() => {
    dispatch(transactionActions.clearDurations());
  }, []);

  function applyClick() {
    const arr = durations.map((i, index) => {
      const date1 = `${day[(new Date(i.first).getDay() + 6) % 7]} ${new Date(
        i.first
      ).getDate()}/${new Date(i.first).getMonth() + 1}/${new Date(
        i.first
      ).getFullYear()}`;
      const date2 = `${day[(new Date(i.second).getDay() + 6) % 7]} ${new Date(
        i.second
      ).getDate()}/${new Date(i.second).getMonth() + 1}/${new Date(
        i.second
      ).getFullYear()}`;
      return `${date1} - ${date2}`;
    });
    const obj = { name: filterParam, options: [...arr] };
    // console.log(obj);
    dispatch(transactionActions.pushFilter(obj));
    dispatch(transactionActions.closeOpen());
  }

  function removeClick(ind) {
    dispatch(transactionActions.popDuration(ind));
  }

  return (
    <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-3 rounded-r-lg p-4 px-8">
      <div className="font-semibold flex flex-col mt-[8px] mb-[20px] text-xl text-black text-center"></div>
      <div className="flex flex-grow">
        <div className="flex flex-col ">
          <div className="text-base font-semibold mx-auto uppercase">
            {"add Duration(s)"}
          </div>
          <div className="w-[340px] p-4 h-[610px] flex  overflow-clip">
            <DatePicker />
          </div>
        </div>

        <div className="flex flex-col px-2 items-center flex-grow gap-y-2  h-[500px]">
          <div className="text-base w-full text-center font-semibold uppercase mb-4 pb-8 border-b-[1.5px] border-stone-400">
            Preview
          </div>
          <div className="flex flex-col h-[300px] w-[200px] overflow-auto customScrollThin px-3 items-center space-y-[6px]">
            {durations.length === 0 ? (
              <p className="flex justify-center text-xs font-medium ">
                No Durations
              </p>
            ) : (
              <>
                {durations.map((i, index) => {
                  const date1 = ` ${format(new Date(i.first), "dd/MM/yyyy")}`;
                  const date2 = `${format(new Date(i.second), "dd/MM/yyyy")}`;

                  return (
                    <div
                      key={Math.random()}
                      className="flex py-1 w-fit pr-1 rounded-md bg-[#dc93f6] text-black text-xs items-center space-x-1"
                    >
                      <div className="flex flex-grow flex-col px-[10px]">
                        <div className="flex ">
                          <span className="font-semibold mr-2 ">From </span>
                          <span className="   ">{date1}</span>
                        </div>
                        <div className="flex ">
                          <span className="font-semibold mr-2">To</span>
                          <span className="  ">{date2}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeClick(index)}
                        className="pr-1 justify-center items-center"
                      >
                        <i className="fi fi-ss-cross-circle text-[16px] flex  justify-center items-center"></i>
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <Button
        disabled={durations.length === 0}
        className={durations.length > 0 ? "" : "disabled"}
        onClick={applyClick}
      >
        Apply
      </Button>
    </div>
  );
}

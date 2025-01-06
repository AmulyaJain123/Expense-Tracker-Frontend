import { useState } from "react";
import NameFilter from "./NameFilter";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../store/main";
import { useSelector } from "react-redux";
import AmountFilter from "./AmountFilter";
import TypeFilter from "./TypeFilter";
import NullFilter from "./NullFilter";
import CategoryFilter from "./CategoryFilter";
import DateFilter from "./DateFilter";

const filterParams = [
  "Name",
  "To",
  "From",
  "Amount",
  "Date",
  "Category",
  "Type",
];

export default function Filter() {
  const dispatch = useDispatch();
  const filterParam = useSelector((state) => state.transactions.filterParam);
  const open = useSelector((state) => state.transactions.open);

  function clickHandle() {
    dispatch(transactionActions.setFilterParam(null));
    dispatch(transactionActions.reverseOpen());
  }
  function filterClick(event) {
    dispatch(transactionActions.setFilterParam(event.target.innerText));
  }

  return (
    <>
      <div
        style={{ top: open ? "45px" : "-505px" }}
        className="mx-auto w-[90%] flex rounded-b-xl  h-[600px] duration-1000 z-10 bg-[#eabffa] absolute right-1 left-1 "
      >
        <button
          onClick={clickHandle}
          className="bg-inherit  rounded-full p-[6px] aspect-square z-[11] absolute bottom-[-18px] right-[50%] translate-x-[50%]"
        >
          {open ? (
            <i className="fi fi-sr-angle-circle-up flex justify-center text-[23px] items-center"></i>
          ) : (
            <i className="fi fi-sr-angle-circle-down flex justify-center text-[23px] items-center"></i>
          )}
        </button>
        <span className="bottom-[15px] uppercase absolute text-md font-semibold right-[50%] translate-x-[50%] ">
          Filter
        </span>

        <div className="flex flex-grow py-4 my-3 mb-8">
          <div className="flex ml-3 bg-[#fefae0] rounded-l-lg relative flex-col text-lg font-medium justify-center space-y-2 min-w-48 w-48 border-r-[1.5px] border-black p-3  pr-3">
            <span className="text-base font-semibold absolute top-5 right-[50%] translate-x-[50%]">
              FILTER BY
            </span>
            <div className="flex flex-col divide-stone-300 text-sm border-y-[1.5px] mx-6 border-stone-300 divide-y-[1.5px]">
              {filterParams.map((para) => {
                return (
                  <button
                    key={para}
                    style={{
                      backgroundColor: filterParam === para ? "#9d4edd" : "",
                      color: filterParam === para ? "white" : "black",
                    }}
                    disabled={filterParam === para}
                    onClick={(event) => filterClick(event)}
                    className=" p-1 py-[6px] hover:bg-white"
                  >
                    {para}
                  </button>
                );
              })}
            </div>
          </div>
          {filterParam === null ? <NullFilter /> : null}
          {filterParam === "Name" ||
          filterParam === "From" ||
          filterParam === "To" ? (
            <NameFilter />
          ) : null}
          {filterParam === "Amount" ? <AmountFilter /> : null}
          {filterParam === "Type" ? <TypeFilter /> : null}
          {filterParam === "Category" ? <CategoryFilter /> : null}
          {filterParam === "Date" ? <DateFilter /> : null}
        </div>
      </div>
    </>
  );
}

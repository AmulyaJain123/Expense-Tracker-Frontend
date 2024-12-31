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
        style={{ top: open ? "65px" : "-680px" }}
        className="mx-auto w-[90%] flex rounded-b-xl  h-[800px] duration-1000 z-10 bg-[#eabffa] absolute right-1 left-1 "
      >
        <button
          onClick={clickHandle}
          className="bg-inherit  rounded-full p-2 aspect-square absolute bottom-[-25px] right-[50%] translate-x-[50%]"
        >
          {open ? (
            <i className="fi fi-sr-angle-circle-up flex justify-center text-3xl items-center"></i>
          ) : (
            <i className="fi fi-sr-angle-circle-down flex justify-center text-3xl items-center"></i>
          )}
        </button>
        <span className="bottom-[18px] uppercase absolute text-xl font-semibold right-[50%] translate-x-[50%] ">
          Filter
        </span>

        <div className="flex flex-grow py-4 my-4 mb-12">
          <div className="flex ml-4 bg-[#fefae0] rounded-l-xl relative flex-col text-lg font-medium justify-center space-y-2 min-w-64 w-64 border-r-2 border-black p-4  pr-4">
            <span className="text-xl font-semibold absolute top-6 right-[50%] translate-x-[50%]">
              FILTER BY
            </span>
            <div className="flex flex-col divide-stone-300 border-y-2 mx-12 border-stone-300 divide-y-2">
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
                    className=" p-1 py-2 hover:bg-white"
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

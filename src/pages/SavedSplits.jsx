import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vaultActions } from "../store/main";
import SavedSplit from "../components/splitViewComponents/SavedSplit";
import empty from "../assets/empty.png";
import { Helmet } from "react-helmet-async";

export default function SavedSplits() {
  const data = useLoaderData();

  console.log(data);

  return (
    <>
      <Helmet>
        <title> Saved SPLITS | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[150px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        <div className="flex flex-col m-auto max-w-[1200px]">
          <div className="flex justify-center tab:justify-between mb-8 sm:mb-10 tab:mb-12 my-10 tab:my-12  px-8 tab:px-16">
            <div className="flex sm:space-x-3 tab:space-x-6 items-center ">
              <div className="hidden  h-[32px] sm:h-[38px] sm:flex  w-[50px] sm:w-[60px] rounded-[4px] sm:rounded-md scale-[80%] sm:scale-90 tab:scale-100 bg-stone-100">
                <div className="rounded-l-[4px] sm:rounded-l-md w-[15px] sm:w-[20px] striped"></div>
                <div className="flex flex-col px-[6px] flex-grow space-y-[3px] justify-center ">
                  <div className="w-[90%]  border border-stone-400"></div>
                  <div className="w-[50%]  border border-stone-400"></div>
                  <div className="w-[40%]  border border-stone-400"></div>
                  <div className="w-[60%]  border border-stone-400"></div>
                  <div className="w-[80%]  border border-stone-400"></div>
                  <div className="w-[50%]  border border-stone-400"></div>
                </div>
              </div>
              <span className="text-[22px] sm:text-[26px] tab:text-[30px] font-bold text-stone-600">
                Saved SPLITS
              </span>
            </div>
          </div>
          <div className="mt-3 tab:mt-4 px-4 sm:px-8 tab:px-12 flex flex-wrap justify-center gap-3 tab:gap-5">
            {data.length === 0 ? (
              <div className="flex flex-col mt-6 tab:mt-8 space-y-2 tab:space-y-3">
                <img
                  src={empty}
                  className="h-[80px] w-[80px] sm:h-[110px] sm:w-[110px] flex justify-center items-center"
                  alt=""
                />
                <p className="text-center text-stone-500 mt-8 tab:mt-12 text-xs tab:text-sm font-medium">
                  No SPLITS Found
                </p>
              </div>
            ) : (
              <>
                {data.map((i) => {
                  return <SavedSplit data={i} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

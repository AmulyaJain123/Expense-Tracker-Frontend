import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import empty from "../assets/empty.png";
import SharedSplit from "../components/splitViewComponents/SharedSplit";
import { Helmet } from "react-helmet-async";

export default function SharedSplits() {
  const data = useLoaderData();

  console.log(data);

  return (
    <>
      <Helmet>
        <title>Shared SPLITS | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        <div className="flex justify-between my-12 px-16">
          <div className="flex space-x-8 items-center">
            <div className="h-[50px] flex w-[80px] rounded-lg bg-stone-100">
              <div className="rounded-l-lg w-[40px] striped"></div>
              <div className="flex flex-col px-2 flex-grow space-y-1 justify-center ">
                <div className="w-[90%]  border border-stone-400"></div>
                <div className="w-[50%]  border border-stone-400"></div>
                <div className="w-[40%]  border border-stone-400"></div>
                <div className="w-[60%]  border border-stone-400"></div>
                <div className="w-[80%]  border border-stone-400"></div>
                <div className="w-[50%]  border border-stone-400"></div>
              </div>
            </div>
            <span className="text-[40px] font-bold text-stone-600">
              Shared SPLITS
            </span>
          </div>
        </div>
        <div className="mt-12 px-16 flex flex-wrap justify-center gap-8">
          {data.length === 0 ? (
            <div className="flex flex-col mt-12 space-y-4">
              <img
                src={empty}
                className="h-[150px] w-[150px] flex justify-center items-center"
                alt=""
              />
              <p className="text-center text-stone-500 mt-16 text-lg font-medium">
                No SPLITS Found
              </p>
            </div>
          ) : (
            <>
              {data.map((i) => {
                return <SharedSplit data={i} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

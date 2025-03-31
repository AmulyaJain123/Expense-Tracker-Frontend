import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import right from "../../assets/right.png";
import { getMonth } from "date-fns";
import noEntries from "../../assets/empty.png";
import LineGraph from "./LineGraph";
import Scatter from "./Scatter";

export default function CategoricalHeirarchy() {
  const { categories, tags } = useLoaderData();
  const [mode, setMode] = useState(false);

  return (
    <>
      <div className="flex flex-grow flex-col mx-3 space-y-3">
        <div className="flex flex-col space-y-3 relative flex-grow rounded-xl p-3 bg-[#f7ebfd]">
          <header className="flex p-[6px] px-3 pr-2 h-fit justify-center rounded-lg bg-[#9f21e3] text-white">
            <span className="text-lg font-semibold ">Categories & Tags</span>
          </header>
          <div className="absolute bottom-3 z-[1] right-[50%] translate-x-[50%]">
            <button
              onClick={() => setMode((p) => !p)}
              className="duration-500 hover:scale-110"
            >
              <img
                src={right}
                style={{
                  transform: !mode ? "rotate(90deg)" : "rotate(-90deg)",
                }}
                className="w-[20px] h-[20px] "
                alt=""
              />
            </button>
          </div>
          <div
            style={{ height: mode === false ? "370px" : "auto" }}
            className={`overflow-hidden ${mode === false ? "fadeBottom" : ""}`}
          >
            <div className="flex flex-grow pb-4">
              <div className="flex w-[50%] p-3 flex-col space-y-3">
                <h1 className="bg-black text-white text-sm font-medium p-1 px-3 rounded-md">
                  Outgoing Categories
                </h1>
                <div className="flex flex-col pl-4 space-y-[6px]">
                  {categories.outgoing.map((i) => {
                    return (
                      <div className="flex text-xs flex-col">
                        <div className="flex py-1 px-3 bg-[#f8f9fa] border-b-[1.5px] rounded-t-sm border-b-stone-600">
                          {i.name}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 p-1 pl-4">
                          {i.categories.map((j) => {
                            return (
                              <>
                                <div className="flex space-x-[6px] items-center ">
                                  <div className="w-[7px] h-[7px] bg-black rounded-full"></div>
                                  <span className="capitalize ">{j}</span>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex py-1 px-2 bg-[#f8f9fa] border-b-[1.5px] rounded-t-sm text-xs border-b-stone-600">
                    Null
                  </div>
                </div>
              </div>

              <div className="flex w-[50%] p-3 flex-col space-y-3">
                <h1 className="bg-black text-white text-sm font-medium p-1 px-3 rounded-md">
                  Incoming Categories
                </h1>
                <div className="flex flex-col pl-4 space-y-[6px]">
                  {categories.incoming.map((i) => {
                    return (
                      <div className="flex text-xs flex-col">
                        <div className="flex py-1 px-3 bg-[#f8f9fa] border-b-[1.5px] rounded-t-sm border-b-stone-600">
                          {i.name}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 p-1 pl-4">
                          {i.categories.map((j) => {
                            return (
                              <>
                                <div className="flex space-x-[6px] items-center ">
                                  <div className="w-[7px] h-[7px] bg-black rounded-full"></div>
                                  <span className="capitalize ">{j}</span>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex py-1 px-2 bg-[#f8f9fa] border-b-[1.5px] rounded-t-sm text-xs border-b-stone-600">
                    Null
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-grow pb-10">
              <div className="flex flex-grow p-3 flex-col space-y-3">
                <h1 className="bg-black text-white text-sm font-medium text-center p-1 px-3 rounded-md">
                  Tags
                </h1>
                <div className="flex flex-wrap justify-center gap-2 pl-4 ">
                  {tags.map((i) => {
                    return (
                      <div className="flex text-xs ">
                        <div className="flex py-1 px-2 bg-white  rounded-md">
                          {i}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

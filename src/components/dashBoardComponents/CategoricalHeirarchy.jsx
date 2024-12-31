import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import right from "../../assets/right.png";
import { getMonth } from "date-fns";
import noEntries from "../../assets/empty.png";
import LineGraph from "./LineGraph";
import Scatter from "./Scatter";

export default function CategoricalHeirarchy() {
  const { categories } = useLoaderData();
  const [mode, setMode] = useState(false);

  return (
    <>
      <div className="flex flex-grow flex-col mx-4 space-y-4">
        <div className="flex flex-col space-y-4 relative flex-grow rounded-xl p-4 bg-[#f7ebfd]">
          <header className="flex p-2 px-4 pr-2 h-fit justify-center rounded-xl bg-[#9f21e3] text-white">
            <span className="text-2xl font-semibold ">
              Categorical Heirarchy
            </span>
          </header>
          <div className="absolute bottom-4 z-[1] right-[50%] translate-x-[50%]">
            <button
              onClick={() => setMode((p) => !p)}
              className="duration-500 hover:scale-110"
            >
              <img
                src={right}
                style={{
                  transform: !mode ? "rotate(90deg)" : "rotate(-90deg)",
                }}
                className="w-[25px] h-[25px] "
                alt=""
              />
            </button>
          </div>
          <div
            style={{ height: mode === false ? "500px" : "auto" }}
            className={`overflow-hidden ${mode === false ? "fadeBottom" : ""}`}
          >
            <div className="flex flex-grow pb-20">
              <div className="flex w-[50%] p-4 flex-col space-y-4">
                <h1 className="bg-black text-white text-lg font-medium p-1 px-4 rounded-lg">
                  Outgoing Categories
                </h1>
                <div className="flex flex-col pl-6 spave-y-4">
                  {categories.outgoing.map((i) => {
                    return (
                      <div className="flex flex-col">
                        <div className="flex py-1 px-3 bg-[#f8f9fa] border-b-2 rounded-t-lg border-b-stone-600">
                          {i.name}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 p-1 pl-6">
                          {i.categories.map((j) => {
                            return (
                              <>
                                <div className="flex space-x-2 items-center ">
                                  <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                                  <span className="capitalize ">{j}</span>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex py-1 px-3 bg-[#f8f9fa] border-b-2 rounded-t-lg border-b-stone-600">
                    Null
                  </div>
                </div>
              </div>

              <div className="flex w-[50%] p-4 flex-col space-y-4">
                <h1 className="bg-black text-white text-lg font-medium p-1 px-4 rounded-lg">
                  Incoming Categories
                </h1>
                <div className="flex flex-col pl-6 spave-y-4">
                  {categories.incoming.map((i) => {
                    return (
                      <div className="flex flex-col">
                        <div className="flex py-1 px-3 bg-[#f8f9fa] border-b-2 rounded-t-lg border-b-stone-600">
                          {i.name}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 p-1 pl-6">
                          {i.categories.map((j) => {
                            return (
                              <>
                                <div className="flex space-x-2 items-center ">
                                  <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                                  <span className="capitalize ">{j}</span>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex py-1 px-3 bg-[#f8f9fa] border-b-2 rounded-t-lg border-b-stone-600">
                    Null
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

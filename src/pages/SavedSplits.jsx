import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vaultActions } from "../store/main";
import SavedSplit from "../components/splitViewComponents/SavedSplit";
import empty from "../assets/empty.png";
import { Helmet } from "react-helmet-async";
import { EmptyBox } from "../UIComponents/NoneFound";

export default function SavedSplits() {
  const data = useLoaderData();
  const contentRef = useRef(null);

  const [no, setNo] = useState(0);

  useEffect(() => {
    console.log(contentRef.current.clientWidth);
    setNo(
      Math.floor(contentRef.current.clientWidth / 320) -
        (data.length % Math.floor(contentRef.current.clientWidth / 320) ||
          Math.floor(contentRef.current.clientWidth / 320))
    );
  }, [contentRef]);

  console.log(data);

  return (
    <>
      <Helmet>
        <title> Saved SPLITS | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[150px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        <div className="flex flex-col m-auto max-w-[1200px]">
          <div className="flex justify-center tab:justify-between mb-4 sm:mb-4 tab:mb-6 my-8 tab:my-8 border-b-[1.5px] pb-2 pl-4 border-stone-400 mx-8 tab:mx-8">
            <div className="flex sm:space-x-3 tab:space-x-6 items-center ">
              <div className="hidden  h-[32px] sm:h-[38px] sm:flex flex-col w-[45px] sm:w-[55px] rounded-[4px] sm:rounded-[4px] scale-[80%] sm:scale-90 tab:scale-100 bg-stone-100">
                <div className="rounded-t-[4px] sm:rounded-t-[4px] sm:h-[10px] w-full bg-[#9d4edd]"></div>
                <div className="flex flex-col px-[6px] flex-grow space-y-[3px] justify-center ">
                  <div className="w-[90%]  border-[0.1px] border-stone-400"></div>
                  <div className="w-[50%]  border-[0.1px] border-stone-400"></div>
                  <div className="w-[40%]  border-[0.1px] border-stone-400"></div>
                  <div className="w-[80%]  border-[0.1px] border-stone-400"></div>
                  <div className="w-[50%]  border-[0.1px] border-stone-400"></div>
                </div>
              </div>
              <span className="text-[26px] tab:text-[30px] font-bold text-stone-600">
                Saved SPLITS
              </span>
            </div>
          </div>
          <div className="mt-3 tab:mt-4 px-4 sm:px-8 tab:px-12">
            <div
              ref={contentRef}
              className=" flex flex-wrap justify-center gap-3 tab:gap-5"
            >
              {data.length === 0 ? (
                <div className="mt-16">
                  <EmptyBox
                    IconSize={60}
                    gap={16}
                    textSize={16}
                    fontWeight={500}
                    msg="No SPLITS Found"
                    textColor="#d6d3d1"
                  />
                </div>
              ) : (
                <>
                  {data.map((i) => {
                    return <SavedSplit data={i} />;
                  })}
                  {Array(no)
                    .fill(0)
                    .map((i, ind) => {
                      return (
                        <div className="w-[300px] h-[190px] bg-slate-50   rounded-lg "></div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

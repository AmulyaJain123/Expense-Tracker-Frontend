import Friends from "./Friends";
import { useSelector } from "react-redux";
import { splitAlgo } from "../../util/algo";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { useRef, useState, useEffect } from "react";
import { createSplitHeirachy } from "../../util/componentNavigation";
import { Button } from "../../UIComponents/NextButton";
import DiscardButton from "../../UIComponents/DiscardButton";
import styles from "./CreateSplitStage.module.css";

export default function CreateSplitStage() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.splitCreate.friends);
  const descRef = useRef();
  const nameRef = useRef();
  const splitInfo = useSelector((state) => state.splitCreate.splitInfo);

  const currentStatus = useSelector(
    (state) => state.splitCreate.topNavSplitStatus
  );

  useEffect(() => {
    document
      .getElementById("Top")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, []);

  function nameChange(event) {
    const str = event.target.value;
    dispatch(splitCreateActions.changeSplitName(str));
  }

  function descChange(event) {
    const str = event.target.value;
    dispatch(splitCreateActions.changeSplitDesc(str));
  }

  return (
    <div className={`${styles.main} `}>
      <header
        style={{}}
        className=" text-[18px] sm:text-[20px] lg:text-[24px] font-extrabold uppercase justify-center mb-2 sm:mb-3 flex items-center rounded-lg bg-slate-100 py-2 sm:py-3 lg:py-[14px] px-5"
      >
        Create a Split
      </header>
      <div className=" text-xs lg:text-sm mb-2 sm:mb-3 flex flex-col space-y-[10px] sm:space-y-0  items-stretch  sm:flex-row text-stone-500 sm:items-center rounded-lg bg-slate-100 p-2">
        <span className="flex space-x-2">
          <span className="rounded-md flex-grow bg-[#000] text-white text-center sm:text-start  sm:mr-2 p-[6px] font-semibold px-[16px]">
            <span>Split Name</span>
          </span>
          <span className="bg-white flex sm:hidden items-center text-stone-500 font-semibold text-xs lg:text-sm py-[4px] lg:py-[6px] px-[10px] sm:ml-2 text-center sm:text-start rounded-md">
            REQ
          </span>
        </span>
        <input
          type="text"
          ref={nameRef}
          maxLength={25}
          value={splitInfo.splitName}
          placeholder="Name"
          onChange={(event) => nameChange(event)}
          className="rounded-md text-xs lg:text-sm text-center sm:text-start px-4 flex-grow p-[6px] bg-white "
        />
        <span className="bg-white hidden sm:flex text-stone-500 font-semibold text-xs lg:text-sm py-[4px] sm:py-[6px] lg:py-[6px] px-3 sm:ml-2 text-center sm:text-start rounded-md">
          REQ
        </span>
      </div>
      <div className="text-xs lg:text-sm mb-2 sm:mb-3 flex flex-col space-y-[10px] sm:space-y-0  items-stretch  sm:flex-row text-stone-500 sm:items-center rounded-lg bg-slate-100 p-2">
        <span className="rounded-md bg-[#000] text-white text-center sm:text-start sm:mr-2  p-[6px] font-semibold px-[16px]">
          Description
        </span>
        <input
          ref={descRef}
          type="text"
          maxLength={70}
          value={splitInfo.description}
          onChange={(event) => descChange(event)}
          placeholder="Description"
          className="text-center sm:text-start rounded-md text-xs lg:text-sm px-4 flex-grow p-[6px] bg-white "
        />
      </div>
      <Friends />
    </div>
  );
}

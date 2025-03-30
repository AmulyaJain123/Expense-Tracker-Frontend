import search from "../../assets/search.png";
import { useState, useEffect, useRef } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import cross from "../../assets/cancel.png";
import exclamation from "../../assets/exclamation.png";
import TagsWindow from "./TagsWindow";
import reqImg from "../../assets/rec.png";
import warImg from "../../assets/war.png";
import docImg from "../../assets/doc.png";

export default function ManageTags() {
  return (
    <div className="w-[90%] mt-12 flex flex-col mx-auto bg-white rounded-2xl p-3">
      <div className="w-full bg-slate-100 py-3 uppercase text-2xl text-center rounded-lg font-bold text-stone-700">
        Manage Tags
      </div>
      <div className="flex flex-grow flex-col rounded-lg bg-slate-100 gap-y-8 mt-3 p-4">
        <div className="flex flex-col flex-grow">
          <div className="flex gap-x-4 border-b-[1.5px] pb-1 border-neutral-400  items-center">
            <img src={reqImg} className="w-[40px] h-[40px]" alt="" />
            <span className="uppercase text-xl font-bold">Reciept</span>
          </div>
          <div className="flex  bg-slate-100 flex-grow">
            <TagsWindow type={"rec"} />
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex gap-x-4 border-b-[1.5px] pb-1 border-neutral-400  items-center">
            <img src={warImg} className="w-[40px] h-[40px]" alt="" />
            <span className="uppercase text-xl font-bold">Warranty</span>
          </div>
          <div className="flex  bg-slate-100 flex-grow">
            <TagsWindow type={"war"} />
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex gap-x-4 border-b-[1.5px] pb-1 border-neutral-400  items-center">
            <img src={docImg} className="w-[40px] h-[40px]" alt="" />
            <span className="uppercase text-xl font-bold">Doc</span>
          </div>
          <div className="flex  bg-slate-100 flex-grow">
            <TagsWindow type={"doc"} />
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from "./Receipt.module.css";
import numeral from "numeral";

export default function Doc({ data }) {
  console.log(data);
  return (
    <div className="bg-white zigzag  w-[280px] pb-[60px]">
      <div className="bg-slate-100 m-[10px] rounded-md flex text-black justify-center items-center h-[40px] text-xl uppercase font-bold">
        Doc
      </div>

      <div className="flex h-[15px]">
        <div className="bg-stone-200 h-[15px] w-[15px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-[10px] w-full  border-b-[2.5px] border-dashed border-stone-200"></div>
          <div className=" w-full "></div>
        </div>
        <div className="bg-stone-200 h-[15px] w-[15px] rounded-l-full"></div>
      </div>

      <div className={`${styles.main}`}>
        <div className="flex flex-col">
          <div className="text-base font-semibold flex justify-center">
            Doc Name
          </div>
          <div className="flex  px-3 justify-center text-stone-500 rounded-md text-xs mx-4 mt-[6px] bg-slate-100">
            {data.details.docName}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base font-semibold flex justify-center">
            Created On
          </div>
          <div className="flex px-3 justify-center text-stone-500 rounded-md text-xs mx-4 mt-[6px] bg-slate-100">
            {data.details.createdOn}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base font-semibold flex justify-center">
            Doc Date
          </div>
          <div className="  px-4 text-xs text-center text-stone-500 rounded-md mx-4 mt-[6px] bg-slate-100">
            {data.details.docDate}
          </div>
        </div>
        <div className="flex flex-col mb-[25px]">
          <div className="text-base font-semibold flex justify-center">
            Description
          </div>
          <div className="  px-4 text-center overflow-auto customScrollThin resize-none text-stone-500 rounded-md h-[120px] text-xs mx-4 mt-[6px] bg-slate-100">
            {data.details.docDesc}
          </div>
        </div>
      </div>
    </div>
  );
}

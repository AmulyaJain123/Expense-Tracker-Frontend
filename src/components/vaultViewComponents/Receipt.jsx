import styles from "./Receipt.module.css";
import numeral from "numeral";

export default function Receipt({ data }) {
  console.log(data);
  return (
    <div className="bg-white zigzag  w-[280px] pb-[60px]">
      <div className="bg-slate-100 m-[10px] rounded-md flex text-black justify-center items-center h-[40px] text-xl uppercase font-bold">
        Receipt
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
            Receipt Name
          </div>
          <div className="flex  px-3 justify-center text-stone-500 rounded-md text-xs mx-4 mt-[6px] bg-slate-100">
            {data.details.recName}
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
            Receipt Date
          </div>
          <div className="  px-4 text-xs text-center text-stone-500 rounded-md mx-4 mt-[6px] bg-slate-100">
            {data.details.recDate}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base font-semibold flex justify-center">
            Receipt Total
          </div>
          <div className="relative px-4 text-center text-xs text-stone-500 rounded-md mx-4 mt-[6px] bg-slate-100">
            {data.details.recTotal === null ? (
              <p className="text-neutral-500 font-medium">NOT ENTERED</p>
            ) : (
              <>
                <span>{numeral(data.details.recTotal).format("0.00")}</span>
                <span className="ml-2 text-sm font-semibold ">₹</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-[25px]">
          <div className="text-base font-semibold flex justify-center">
            Description
          </div>
          <div className="  px-4 text-center overflow-auto customScrollThin resize-none text-stone-500 rounded-md h-[120px] text-xs mx-4 mt-[6px] bg-slate-100">
            {data.details.recDesc}
          </div>
        </div>
      </div>
    </div>
  );
}

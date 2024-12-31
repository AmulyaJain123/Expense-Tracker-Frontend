import styles from "./Receipt.module.css";
import numeral from "numeral";

export default function Receipt({ data }) {
  console.log(data);
  return (
    <div className="bg-white zigzag  w-[290px] sm:w-[358px] pb-[100px]">
      <div className="bg-slate-100 m-4 rounded-lg flex text-black justify-center items-center h-[50px] text-xl sm:h-[60px] sm:text-2xl uppercase font-bold">
        Receipt
      </div>

      <div className="flex h-[20px]">
        <div className="billCuts-stone h-[20px] w-[20px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-1/2 w-full  border-b-[3px] border-dashed border-stone-200"></div>
          <div className="h-1/2 w-full  border-stone-300"></div>
        </div>
        <div className="billCuts-stone h-[20px] w-[20px] rounded-l-full"></div>
      </div>

      <div className={`${styles.main}`}>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Receipt Name
          </div>
          <div className="flex   px-4 justify-center text-stone-500 rounded-md text-lg mx-4 mt-2 bg-slate-100">
            {data.details.recName}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Created On
          </div>
          <div className="flex   px-4 justify-center text-stone-500 rounded-md text-lg mx-4 mt-2 bg-slate-100">
            {data.details.createdOn}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Receipt Date
          </div>
          <div className="  px-4 text-lg text-center text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
            {data.details.recDate}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Receipt Total
          </div>
          <div className="relative px-4 text-center text-lg text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
            {data.details.recTotal === null ? (
              <p className="text-neutral-500 font-medium">NOT ENTERED</p>
            ) : (
              <>
                <span>{numeral(data.details.recTotal).format("0.00")}</span>
                <span className="ml-4 text-xl font-semibold ">₹</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-[20px] sm:mb-[30px]">
          <div className="text-xl font-semibold flex justify-center">
            Description
          </div>
          <div className="  px-4 text-center overflow-auto customScrollThin resize-none text-stone-500 rounded-md h-[150px] text-lg mx-4 mt-2 bg-slate-100">
            {data.details.recDesc}
          </div>
        </div>
      </div>
    </div>
  );
}

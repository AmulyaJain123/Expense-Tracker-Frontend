import styles from "./Warranty.module.css";
import numeral from "numeral";

export default function Warranty({ data }) {
  console.log(data);
  return (
    <div className="bg-white zigzag  w-[280px] pb-[60px]">
      <div className="bg-slate-100 m-[10px] rounded-md flex text-black justify-center items-center h-[40px] text-xl uppercase font-bold">
        Warranty
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
            Warranty Name
          </div>
          <div className="flex px-3 justify-center text-stone-500 rounded-md text-xs mx-4 mt-[6px] bg-slate-100">
            {data.details.warName}
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
            Warranty Date
          </div>
          <div className="  px-4 text-xs text-center text-stone-500 rounded-md mx-4 mt-[6px] bg-slate-100">
            {data.details.warDate}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base font-semibold flex justify-center">
            Warranty Total
          </div>
          <div className="relative px-4 text-center text-xs text-stone-500 rounded-md mx-4 mt-[6px] bg-slate-100">
            {data.details.warTotal === null ? (
              <p className="text-neutral-500 font-medium">NOT ENTERED</p>
            ) : (
              <>
                <span>{numeral(data.details.warTotal).format("0.00")}</span>
                <span className="ml-2 text-sm font-semibold ">₹</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-base font-semibold flex justify-center">
            Description
          </div>
          <div className="  px-4 text-center overflow-auto customScrollThin resize-none text-stone-500 rounded-md h-[120px] text-xs mx-4 mt-[6px] bg-slate-100">
            {data.details.warDesc}
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="text-base font-semibold flex justify-center">
            Warranty Mode
          </div>
          <div className="bg-black rounded-lg mt-3 text-white text-base py-[6px] px-4 font-semibold mx-auto">
            {data.details.expiry.mode === "0" ? "Duration" : "Date"}
          </div>
        </div>

        {data.details.expiry.mode === "0" ? (
          <div className="flex flex-col ">
            <div className="text-base mb-[6px] font-semibold flex justify-center">
              Expiration Duration
            </div>
            <div className="flex justify-center text-xs space-x-4">
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Years</span>
                <span className="py-1 px-3 rounded-md bg-slate-100 w-[60px] text-center ">
                  {data.details.expiry.duration.years}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Months</span>
                <span className="py-1 px-3 rounded-md bg-slate-100 w-[60px] text-center ">
                  {data.details.expiry.duration.months}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Days</span>
                <span className="py-1 px-3 rounded-md bg-slate-100 w-[60px] text-center ">
                  {data.details.expiry.duration.days}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col">
          <div className="text-base font-semibold flex justify-center">
            Expiration Date
          </div>
          {data.details.expiry.renewedOn ? (
            <span className=" mx-auto text-xs">
              <span className="font-semibold mr-2">Renewed On </span>{" "}
              <span className=" font-normal">
                {data.details.expiry.renewedOn}
              </span>
            </span>
          ) : null}
          <div className="  px-4 text-xs text-center text-stone-500 rounded-md mx-4 mt-[6px] bg-slate-100">
            {data.details.expiry.date}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-base font-semibold flex justify-center">
            Expiration In
          </div>
          {data.details.expiry.till === null ? (
            <div className="  px-4 text-xs text-center text-red-500 rounded-md mx-4 mt-[6px] bg-red-100">
              Expired
            </div>
          ) : data.details.expiry.till.years >= 1 ||
            data.details.expiry.till.months >= 1 ? (
            <div className="flex text-xs justify-center space-x-4">
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Years</span>
                <span className="py-1 px-3 rounded-md bg-green-100 text-green-500 w-[60px] text-center ">
                  {data.details.expiry.till.years}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Months</span>
                <span className="py-1 px-3 rounded-md bg-green-100 text-green-500 w-[60px] text-center ">
                  {data.details.expiry.till.months}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Days</span>
                <span className="py-1 px-3 rounded-md bg-green-100 text-green-500 w-[60px] text-center ">
                  {data.details.expiry.till.days}
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex text-xs justify-center space-x-4">
                <div className="flex flex-col items-center space-y-1 ">
                  <span className="font-medium">Years</span>
                  <span className="py-1 px-3 rounded-md bg-green-100 text-green-500 w-[60px] text-center ">
                    {data.details.expiry.till.years}
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-1 ">
                  <span className="font-medium">Months</span>
                  <span className="py-1 px-3 rounded-md bg-green-100 text-green-500 w-[60px] text-center ">
                    {data.details.expiry.till.months}
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-1 ">
                  <span className="font-medium">Days</span>
                  <span className="py-1 px-3 rounded-md bg-green-100 text-green-500 w-[60px] text-center ">
                    {data.details.expiry.till.days}
                  </span>
                </div>
              </div>
              <p className="text-center mt-3 ">Expiring Soon !!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

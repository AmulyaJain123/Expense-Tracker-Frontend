import styles from "./Warranty.module.css";
import numeral from "numeral";

export default function Warranty({ data }) {
  console.log(data);
  return (
    <div className="bg-white zigzag  w-[290px] sm:w-[358px] pb-[100px]">
      <div className="bg-slate-100 m-4 rounded-lg flex text-black justify-center items-center h-[50px] text-xl sm:h-[60px] sm:text-2xl uppercase font-bold">
        Warranty
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
            Warranty Name
          </div>
          <div className="flex   px-4 justify-center text-stone-500 rounded-md text-lg mx-4 mt-2 bg-slate-100">
            {data.details.warName}
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
            Warranty Date
          </div>
          <div className="  px-4 text-lg text-center text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
            {data.details.warDate}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Warranty Total
          </div>
          <div className="relative px-4 text-center text-lg text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
            {data.details.warTotal === null ? (
              <p className="text-neutral-500 font-medium">NOT ENTERED</p>
            ) : (
              <>
                <span>{numeral(data.details.warTotal).format("0.00")}</span>
                <span className="ml-4 text-xl font-semibold ">₹</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-xl font-semibold flex justify-center">
            Description
          </div>
          <div className="  px-4 text-center overflow-auto customScrollThin resize-none text-stone-500 rounded-md h-[150px] text-lg mx-4 mt-2 bg-slate-100">
            {data.details.warDesc}
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="text-xl font-semibold flex justify-center">
            Warranty Mode
          </div>
          <div className="bg-black rounded-xl mt-4 text-white text-xl py-2 px-6 font-semibold mx-auto">
            {data.details.expiry.mode === "0" ? "Duration" : "Date"}
          </div>
        </div>

        {data.details.expiry.mode === "0" ? (
          <div className="flex flex-col ">
            <div className="text-xl mb-2 font-semibold flex justify-center">
              Expiration Duration
            </div>
            <div className="flex justify-center space-x-6">
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Years</span>
                <span className="py-2 px-4 rounded-lg bg-slate-100 w-[80px] text-center ">
                  {data.details.expiry.duration.years}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Months</span>
                <span className="py-2 px-4 rounded-lg bg-slate-100 w-[80px] text-center ">
                  {data.details.expiry.duration.months}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Days</span>
                <span className="py-2 px-4 rounded-lg bg-slate-100 w-[80px] text-center ">
                  {data.details.expiry.duration.days}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Expiration Date
          </div>
          {data.details.expiry.renewedOn ? (
            <span className=" mx-auto ">
              <span className="font-semibold mr-2">Renewed On </span>{" "}
              <span className="text-base font-normal">
                {data.details.expiry.renewedOn}
              </span>
            </span>
          ) : null}
          <div className="  px-4 text-lg text-center text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
            {data.details.expiry.date}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Expiration In
          </div>
          {data.details.expiry.till === null ? (
            <div className="  px-4 text-lg text-center text-red-500 rounded-md mx-4 mt-2 bg-red-100">
              Expired
            </div>
          ) : data.details.expiry.till.years >= 1 ||
            data.details.expiry.till.months >= 1 ? (
            <div className="flex justify-center space-x-6">
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Years</span>
                <span className="py-2 px-4 rounded-lg bg-green-100 text-green-500 w-[80px] text-center ">
                  {data.details.expiry.till.years}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Months</span>
                <span className="py-2 px-4 rounded-lg bg-green-100 text-green-500 w-[80px] text-center ">
                  {data.details.expiry.till.months}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1 ">
                <span className="font-medium">Days</span>
                <span className="py-2 px-4 rounded-lg bg-green-100 text-green-500 w-[80px] text-center ">
                  {data.details.expiry.till.days}
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center space-x-6">
                <div className="flex flex-col items-center space-y-1 ">
                  <span className="font-medium">Years</span>
                  <span className="py-2 px-4 rounded-lg bg-yellow-100 text-yellow-500 w-[80px] text-center ">
                    {data.details.expiry.till.years}
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-1 ">
                  <span className="font-medium">Months</span>
                  <span className="py-2 px-4 rounded-lg bg-yellow-100 text-yellow-500 w-[80px] text-center ">
                    {data.details.expiry.till.months}
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-1 ">
                  <span className="font-medium">Days</span>
                  <span className="py-2 px-4 rounded-lg bg-yellow-100 text-yellow-500 w-[80px] text-center ">
                    {data.details.expiry.till.days}
                  </span>
                </div>
              </div>
              <p className="text-center mt-4 ">Expiring Soon !!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

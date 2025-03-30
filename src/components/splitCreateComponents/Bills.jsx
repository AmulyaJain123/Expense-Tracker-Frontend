import { Thumb } from "../splitHomeComponents/SplitViewModal";
import { useState } from "react";
import SingleBill from "../splitHomeComponents/SingleBill";

export default function Bills({ data }) {
  const [selectedBill, setSelectedBill] = useState(null);
  console.log(data);

  return (
    <>
      <div className="flex flex-col flex-grow">
        <h1 className="py-[6px] sm:py-2 text-center uppercase font-bold text-[18px] sm:text-[22px] bg-white rounded-lg sm:rounded-xl">
          Bills
        </h1>
        <div className="flex flex-grow bg-white mt-[6px] sm:mt-[10px] rounded-lg sm:rounded-xl">
          <div className="flex-grow rounded-[4px] sm:rounded-md text-xs sm:text-sm py-2 sm:py-3 flex font-medium flex-col text-stone-400">
            <div className="text-xs sm:text-sm flex flex-col text-stone-500  rounded-[4px] sm:rounded-md  ">
              <div className="border-b-[2px] border-slate-100 gap-y-[6px] sm:gap-y-2 gap-x-[6px] sm:gap-x-2 p-2 sm:p-4 flex flex-wrap flex-grow ">
                {data.map((bill) => {
                  return (
                    <Thumb
                      key={bill.id}
                      onClick={() => setSelectedBill(bill.id)}
                      $status={selectedBill === bill.id ? "true" : "false"}
                    >
                      {bill.billName}
                    </Thumb>
                  );
                })}
              </div>

              <div className="p-2 sm:p-3 text-[12px] sm:text-[13px] min-h-[300px] sm:min-h-[400px] w-full ">
                {selectedBill === null ? (
                  <div className="flex w-full text-slate-300 flex-col h-full justify-center items-center">
                    <i class="fi fi-sr-choose flex items-center text-[60px]"></i>
                    <span className="mt-4 text-base font-normal">
                      No Bill Selected
                    </span>
                  </div>
                ) : (
                  <SingleBill data={data.find((i) => i.id === selectedBill)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

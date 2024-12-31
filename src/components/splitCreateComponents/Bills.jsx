import { Thumb } from "../splitHomeComponents/SplitViewModal";
import { useState } from "react";
import SingleBill from "../splitHomeComponents/SingleBill";

export default function Bills({ data }) {
  const [selectedBill, setSelectedBill] = useState(null);
  console.log(data);

  return (
    <>
      <div className="flex flex-col flex-grow">
        <h1 className="py-3 text-center uppercase font-bold text-3xl bg-white rounded-2xl">
          Bills
        </h1>
        <div className="flex flex-grow bg-white p-4 mt-4 rounded-2xl">
          <div className="flex-grow rounded-lg  text-sm md:text-base lg:text-lg py-2 flex font-medium flex-col text-stone-400">
            <div className="text-sm md:text-base lg:text-lg flex flex-col text-stone-500  rounded-lg  ">
              <div className="border-b-2 border-slate gap-y-2 gap-x-2 p-4 flex flex-wrap flex-grow ">
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

              <div className="p-2 sm:p-4 w-full ">
                {selectedBill === null ? (
                  <p className="text-center mt-24 text-base text-stone-500 font-normal">
                    No Bill Selected
                  </p>
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

import { formatVal } from "../../util/algo";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { format } from "date-fns";

export default function SingleBill({ data }) {
  console.log(data);
  const { billName, billDate, description, payedBy, totalAmt, shares } = data;
  return (
    <div className="px-2 text-start sm:px-3 pt-2 sm:pt-3  flex flex-col space-y-2 sm:space-y-3 flex-grow">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0  justify-between">
        <div className="p-1 px-2 bg-stone-100 h-fit rounded-[4px] sm:rounded-md">
          <span className="text-black mr-2 sm:mr-3 text-md font-semibold">
            Bill Name :
          </span>
          <span className="p-1 text-stone-400 px-[6px] sm:px-2 h-fit ">
            {billName}
          </span>
        </div>
        <div className="p-1 px-2 bg-stone-100 h-fit rounded-[4px] sm:rounded-md">
          <span className="text-black mr-2 sm:mr-3 text-md font-semibold">
            Bill Date :
          </span>
          <span className="p-1 px-[6px] sm:px-2 text-stone-400 h-fit ">
            {format(new Date(billDate), "EEE, dd MMM yyyy")}
          </span>
        </div>
      </div>

      <div className="flex">
        <div className="p-1 px-2 bg-stone-100 flex-grow sm:flex-row flex-col  space-y-[6px] sm:space-y-0 items-start flex rounded-md">
          <span className="text-black mr-2 sm:mr-3 text-md text-nowrap font-semibold">
            Description :
          </span>
          <span className="px-[6px] sm:px-2 text-stone-400 text-center sm:text-start min-h-[60px]">
            <OnlyXChars x={100} text={description} />
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
        <div className="p-1 px-2 bg-stone-100 h-fit rounded-[4px] sm:rounded-md">
          <span className="text-black mr-2 sm:mr-3 text-md font-semibold">
            Paid By :
          </span>
          <span className="p-1 text-stone-400 px-[6px] sm:px-2 h-fit ">
            {payedBy}
          </span>
        </div>
        <div className="p-1 px-2 bg-stone-100 h-fit rounded-[4px] sm:rounded-md">
          <span className="text-black mr-2 sm:mr-3 text-md font-semibold">
            Total Amount :
          </span>
          <span className="p-1 px-[6px] sm:px-2 text-stone-400 h-fit ">
            {formatVal(totalAmt)}
          </span>
        </div>
      </div>

      <div className="p-1 px-2 bg-stone-100 h-fit rounded-[4px] sm:rounded-md">
        <div className="flex flex-col text-left pb-3 space-y-1">
          <span className="text-black text-md p-[6px] sm:p-2 px-3 sm:px-4 font-semibold">
            Shares :
          </span>
          <div className="pb-0 sm:pb-0 p-3 sm:p-5 pt-[0px] sm:pt-2  pl-4 sm:pl-12 pr-2 sm:pr-8 h-[160px] sm:h-[180px] overflow-auto text-stone-400 specialScrollStone">
            {shares.map((share) => {
              return (
                <div key={share.name} className="flex justify-between">
                  <span>{share.name}</span>
                  <span>{formatVal(share.share)}</span>
                </div>
              );
            })}
            <div className="flex mt-3 sm:mt-4 justify-between">
              <span className="text-black">Total</span>
              <span>{formatVal(totalAmt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

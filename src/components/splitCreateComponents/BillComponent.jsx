import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { useSelector } from "react-redux";
import { formatVal } from "../../util/algo";

export default function BillComponent({ id }) {
  const bills = useSelector((state) => state.splitCreate.bills);
  // console.log(bills);
  const reqBill = bills.find((bill) => {
    return bill.id === id ? true : false;
  });
  const dispatch = useDispatch();
  if (reqBill === undefined) {
    return <p className="text-center mt-24">No Bill Selected</p>;
  }

  return (
    <div className="px-2 pt-2 text-[13px] flex flex-col space-y-3 w-full h-full">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between">
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Bill Name :
          </span>
          <span className="p-1 text-stone-400 px-2 h-fit ">
            {reqBill.billName}
          </span>
        </div>
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Bill Date :
          </span>
          <span className="p-1 px-2 text-stone-400 h-fit ">
            {new Date(reqBill.billDate).toDateString()}
          </span>
        </div>
      </div>

      <div className="sm:flex ">
        <div className="p-1 px-2 bg-white flex-grow flex rounded-lg">
          <span className="text-black mr-3 min-w-[90px] text-md font-semibold">
            Description :
          </span>
          <span className="px-2 text-stone-400  h-[60px]">
            {reqBill.description}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0  sm:space-x-6">
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Paid By :
          </span>
          <span className="p-1 text-stone-400 px-2 h-fit ">
            {reqBill.payedBy}
          </span>
        </div>
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Total Amount :
          </span>
          <span className="p-1 px-2 text-stone-400 h-fit ">
            {formatVal(reqBill.totalAmt)}
          </span>
        </div>
      </div>

      <div className="p-1 px-2 bg-white h-fit   rounded-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-black text-md p-2 px-3 font-semibold">
            Shares :
          </span>
          <div className="p-5 pt-2 px-4 sm:px-12 h-[170px] overflow-auto text-stone-400 customScrollThin">
            {reqBill.shares.map((share) => {
              return (
                <div key={share.name} className="flex justify-between">
                  <span>{share.name}</span>
                  <span>{formatVal(share.share)}</span>
                </div>
              );
            })}
            <div className="flex mt-4 justify-between">
              <span className="text-black">Total</span>
              <span>{formatVal(reqBill.totalAmt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

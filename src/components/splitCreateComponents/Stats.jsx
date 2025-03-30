import OnlyXChars from "../../UIComponents/OnlyXChars";
import { formatVal } from "../../util/algo";

export default function Stats({ data }) {
  console.log(data);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="py-[6px] sm:py-2 text-center uppercase font-bold text-[18px] sm:text-[22px] bg-white rounded-lg sm:rounded-xl">
        Stats
      </h1>
      <div className="flex flex-col flex-grow mt-[6px] sm:mt-[10px] ">
        <div className="flex flex-grow flex-col tab:flex-row">
          <div className="flex flex-col flex-grow border-b-[3px] tab:border-b-[0px] tab:border-r-[3px] border-white">
            <div className="flex flex-grow bg-slate-100  flex-col rounded-lg sm:rounded-xl p-[8px] sm:p-3 ">
              <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white rounded-md sm:rounded-lg">
                Money Paid
              </h1>
              <div className="flex flex-grow bg-white p-[8px] sm:p-[10px] mt-2 sm:mt-3 rounded-md sm:rounded-lg">
                <div className="flex flex-col text-[11px] sm:text-xs font-normal flex-grow space-y-2 sm:space-y-3 ">
                  {data[4].map((i, index) => {
                    return (
                      <div className="flex space-x-2 sm:space-x-3 text-start">
                        <span className="w-[22px] sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100 h-[22px] sm:h-[27px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-[4px] sm:rounded-md bg-stone-100 flex-grow items-center pl-[6px] sm:pl-3">
                          <span className="flex-grow">
                            <OnlyXChars x={15} text={i.name} />
                          </span>
                          <span className="px-[6px] sm:px-3">
                            {formatVal(i.val)}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow ">
            <div className="flex flex-grow bg-slate-100  flex-col rounded-lg sm:rounded-xl p-2 sm:p-3 ">
              <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white rounded-md sm:rounded-lg">
                Expenses
              </h1>
              <div className="flex flex-grow bg-white p-[8px] sm:p-[10px] mt-2 sm:mt-3 rounded-md sm:rounded-lg">
                <div className="flex flex-col text-[11px] sm:text-xs font-normal flex-grow space-y-2 sm:space-y-3 ">
                  {data[5].map((i, index) => {
                    return (
                      <div className="flex space-x-2 sm:space-x-3 text-start">
                        <span className="w-[22px] sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100 h-[22px] sm:h-[27px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-[4px] sm:rounded-md bg-stone-100 flex-grow items-center pl-[6px] sm:pl-3">
                          <span className="flex-grow">
                            <OnlyXChars x={15} text={i.name} />
                          </span>
                          <span className="px-[6px] sm:px-3">
                            {formatVal(i.val)}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-grow border-t-[3px] border-white">
          <div className="flex flex-col flex-grow ">
            <div className="flex flex-grow bg-slate-100  flex-col rounded-xl sm:rounded-2xl p-2 sm:p-3 ">
              <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white rounded-md sm:rounded-lg">
                Debitors & Creditors
              </h1>
              <div className="flex flex-grow bg-white p-2 sm:p-3 mt-2 sm:mt-3 rounded-lg sm:rounded-xl">
                <div className="flex flex-col text-[11px] sm:text-xs font-normal flex-grow space-y-2 sm:space-y-3 ">
                  {data[2].map((i, index) => {
                    return (
                      <div className="flex space-x-2 sm:space-x-3 text-start">
                        <span className="w-[22px] sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100 h-[22px] sm:h-[27px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-[4px] sm:rounded-md justify-between  bg-stone-100 flex-grow items-center px-[6px] sm:px-3">
                          <span className="sm:w-[33%]">
                            <OnlyXChars x={15} text={i.name} />
                          </span>
                          <span
                            style={{
                              color:
                                i.val < 0
                                  ? "green"
                                  : i.val > 0
                                  ? "red"
                                  : "black",
                            }}
                            className="hidden sm:inline flex-grow  text-center uppercase font-semibold text-stone-500"
                          >
                            {i.val < 0
                              ? "Debitor"
                              : i.val > 0
                              ? "Creditor"
                              : ""}
                          </span>
                          <span
                            style={{
                              color:
                                i.val < 0
                                  ? "green"
                                  : i.val > 0
                                  ? "red"
                                  : "black",
                            }}
                            className=" sm:w-[33%] text-right font-medium"
                          >
                            {formatVal(Math.abs(i.val))}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

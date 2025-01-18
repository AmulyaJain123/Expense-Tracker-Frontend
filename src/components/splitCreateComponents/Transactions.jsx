import OnlyXChars from "../../UIComponents/OnlyXChars";
import { formatVal } from "../../util/algo";
import noEntries from "../../assets/noEntries.png";

export default function Transactions({ data }) {
  console.log(data);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="py-[6px] sm:py-2 text-center uppercase font-bold text-[18px] sm:text-[22px] bg-white rounded-lg sm:rounded-xl">
        Transactions
      </h1>
      <div className="flex flex-grow mt-[6px] sm:mt-[10px]">
        <div className="flex flex-col flex-grow  ">
          <div className="flex flex-grow bg-slate-100  flex-col rounded-lg sm:rounded-xl p-[8px] sm:p-3  ">
            <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white text-md rounded-md sm:rounded-lg">
              Reduced Transactions
            </h1>
            <div className="flex flex-grow bg-white  p-[6px] sm:p-3 mt-2 sm:mt-3 rounded-md sm:rounded-lg">
              <div className="flex flex-col text-[11px] sm:text-xs font-normal flex-grow space-y-2 sm:space-y-3 ">
                {data[3].length != 0 ? (
                  <div className="flex space-x-2 sm:space-x-3 text-start">
                    <span className="w-[22px] sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100  tab:h-[27px] flex justify-center items-center"></span>
                    <span className="flex flex-col tab:flex-row py-1 tab:py-0  rounded-[4px] sm:rounded-md font-semibold text-stone-500  bg-stone-100 flex-grow tab:items-center pl-2 sm:pl-3">
                      <span className="hidden tab:inline tab:w-[30%] max-tab:self-start">
                        FROM
                      </span>
                      <span className="hidden tab:inline tab:w-[30%] max-tab:self-start tab:text-center uppercase ">
                        TO
                      </span>
                      <div className="flex tab:hidden pr-2 justify-between">
                        <span className="tab:w-[30%] max-tab:self-start">
                          FROM
                        </span>
                        <span className="tab:w-[30%] max-tab:self-start tab:text-center uppercase ">
                          TO
                        </span>
                      </div>
                      <span className="px-2 tab:px-3 pt-0 sm:pt-1 tab:pt-0 max-tab:block flex-grow text-right ">
                        VALUE
                      </span>
                    </span>
                  </div>
                ) : null}
                {data[3].length != 0 ? (
                  data[3].map((i, index) => {
                    return (
                      <>
                        <div className="flex  space-x-2 tab:space-x-3 text-start">
                          <span className="w-[22px] py-[4px] tab:py-0 sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100 tab:h-[27px] flex justify-center tab:items-center">
                            {index + 1}
                          </span>
                          <span className="flex flex-col py-1 tab:py-0 tab:flex-row rounded-[4px] sm:rounded-md  bg-stone-100 flex-grow tab:items-center pl-2 sm:pl-3">
                            <span className="hidden tab:inline sm:w-[30%] max-tab:self-start">
                              <OnlyXChars x={15} text={i.from} />
                            </span>
                            <span className="hidden tab:inline sm:w-[30%] max-tab:self-start tab:text-center ">
                              <OnlyXChars x={15} text={i.to} />
                            </span>
                            <div className="flex tab:hidden pr-2 justify-between">
                              <span className="tab:w-[30%] max-tab:self-start">
                                <OnlyXChars x={15} text={i.from} />
                              </span>
                              <span className="tab:w-[30%] max-tab:self-start tab:text-center">
                                <OnlyXChars x={15} text={i.to} />
                              </span>
                            </div>
                            <span className=" px-2 tab:px-3 pt-0 sm:pt-1 tab:pt-0 max-tab:block flex-grow text-right ">
                              {formatVal(Math.abs(i.val))}
                            </span>
                          </span>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="flex flex-grow text-xs sm:text-sm text-slate-400 flex-col items-center space-y-2 sm:space-y-3 py-6 sm:py-8 ">
                    <img
                      src={noEntries}
                      className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex justify-center items-center"
                      alt=""
                    />
                    <span>No Transactions</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-grow border-t-[3px] border-white ">
        <div className="flex flex-col flex-grow  ">
          <div className="flex flex-grow bg-slate-100  flex-col rounded-lg sm:rounded-xl p-[8px] sm:p-3  ">
            <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white text-md rounded-md sm:rounded-lg">
              Original Transactions
            </h1>
            <div className="flex flex-grow bg-white  p-[6px] sm:p-3 mt-2 sm:mt-3 rounded-md sm:rounded-lg">
              <div className="flex flex-col text-[11px] sm:text-xs font-normal flex-grow space-y-2 sm:space-y-3 ">
                {data[0].length != 0 ? (
                  <div className="flex space-x-2 sm:space-x-3 text-start">
                    <span className="w-[22px] sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100  tab:h-[27px] flex justify-center items-center"></span>
                    <span className="flex flex-col tab:flex-row py-1 tab:py-0  rounded-[4px] sm:rounded-md font-semibold text-stone-500  bg-stone-100 flex-grow tab:items-center pl-2 sm:pl-3">
                      <span className="hidden tab:inline tab:w-[30%] max-tab:self-start">
                        FROM
                      </span>
                      <span className="hidden tab:inline tab:w-[30%] max-tab:self-start tab:text-center uppercase ">
                        TO
                      </span>
                      <div className="flex tab:hidden pr-2 justify-between">
                        <span className="tab:w-[30%] max-tab:self-start">
                          FROM
                        </span>
                        <span className="tab:w-[30%] max-tab:self-start tab:text-center uppercase ">
                          TO
                        </span>
                      </div>
                      <span className="px-2 tab:px-3 pt-0 sm:pt-1 tab:pt-0 max-tab:block flex-grow text-right ">
                        VALUE
                      </span>
                    </span>
                  </div>
                ) : null}
                {data[0].length != 0 ? (
                  data[0].map((i, index) => {
                    return (
                      <>
                        <div className="flex  space-x-2 tab:space-x-3 text-start">
                          <span className="w-[22px] py-[4px] tab:py-0 sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100 tab:h-[27px] flex justify-center tab:items-center">
                            {index + 1}
                          </span>
                          <span className="flex flex-col py-1 tab:py-0 tab:flex-row rounded-[4px] sm:rounded-md  bg-stone-100 flex-grow tab:items-center pl-2 sm:pl-3">
                            <span className="hidden tab:inline sm:w-[30%] max-tab:self-start">
                              <OnlyXChars x={15} text={i.from} />
                            </span>
                            <span className="hidden tab:inline sm:w-[30%] max-tab:self-start tab:text-center ">
                              <OnlyXChars x={15} text={i.to} />
                            </span>
                            <div className="flex tab:hidden pr-2 justify-between">
                              <span className="tab:w-[30%] max-tab:self-start">
                                <OnlyXChars x={15} text={i.from} />
                              </span>
                              <span className="tab:w-[30%] max-tab:self-start tab:text-center">
                                <OnlyXChars x={15} text={i.to} />
                              </span>
                            </div>
                            <span className=" px-2 tab:px-3 pt-0 sm:pt-1 tab:pt-0 max-tab:block flex-grow text-right ">
                              {formatVal(Math.abs(i.val))}
                            </span>
                          </span>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="flex flex-grow text-xs sm:text-sm text-slate-400 flex-col items-center space-y-2 sm:space-y-3 py-6 sm:py-8 ">
                    <img
                      src={noEntries}
                      className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex justify-center items-center"
                      alt=""
                    />
                    <span>No Transactions</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

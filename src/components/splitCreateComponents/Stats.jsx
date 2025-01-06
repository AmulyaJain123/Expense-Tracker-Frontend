import OnlyXChars from "../../UIComponents/OnlyXChars";
import { formatVal } from "../../util/algo";

export default function Stats({ data }) {
  console.log(data);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="py-2 text-center uppercase font-bold text-[22px] bg-white rounded-xl">
        Stats
      </h1>
      <div className="flex flex-col flex-grow  mt-[10px] ">
        <div className="flex flex-grow ">
          <div className="flex flex-col flex-grow border-r-[3px] border-white">
            <div className="flex flex-grow bg-slate-100  flex-col rounded-xl p-3 ">
              <h1 className="font-semibold uppercase text-base text-center py-[6px] bg-white rounded-lg">
                Money Paid
              </h1>
              <div className="flex flex-grow bg-white p-[10px] mt-3 rounded-lg">
                <div className="flex flex-col text-xs font-normal flex-grow space-y-3 ">
                  {data[4].map((i, index) => {
                    return (
                      <div className="flex space-x-3 text-start">
                        <span className="w-[27px] rounded-md bg-stone-100 h-[27px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-md bg-stone-100 flex-grow items-center pl-3">
                          <span className="flex-grow">
                            <OnlyXChars x={15} text={i.name} />
                          </span>
                          <span className="px-3">{formatVal(i.val)}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow ">
            <div className="flex flex-grow bg-slate-100  flex-col rounded-xl p-3 ">
              <h1 className="font-semibold uppercase text-base text-center py-[6px] bg-white rounded-lg">
                Expenses
              </h1>
              <div className="flex flex-grow bg-white p-[10px] mt-3 rounded-lg">
                <div className="flex flex-col text-xs font-normal flex-grow space-y-3 ">
                  {data[5].map((i, index) => {
                    return (
                      <div className="flex space-x-3 text-start">
                        <span className="w-[27px] rounded-md bg-stone-100 h-[27px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-md bg-stone-100 flex-grow items-center pl-3">
                          <span className="flex-grow">
                            <OnlyXChars x={15} text={i.name} />
                          </span>
                          <span className="px-3">{formatVal(i.val)}</span>
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
            <div className="flex flex-grow bg-slate-100  flex-col rounded-2xl p-3 ">
              <h1 className="font-semibold uppercase text-base text-center py-[6px] bg-white rounded-lg">
                Debitors & Creditors
              </h1>
              <div className="flex flex-grow bg-white p-3 mt-3 rounded-xl">
                <div className="flex flex-col text-xs font-normal flex-grow space-y-3 ">
                  {data[2].map((i, index) => {
                    return (
                      <div className="flex space-x-3 text-start">
                        <span className="w-[27px] rounded-md bg-stone-100 h-[27px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-md  bg-stone-100 flex-grow items-center pl-3">
                          <span className="w-[30%]">
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
                            className="flex-grow w-[75px] text-center uppercase font-semibold text-stone-500"
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
                            className="px-3 flex-grow text-right font-medium"
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

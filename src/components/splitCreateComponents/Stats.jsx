import OnlyXChars from "../../UIComponents/OnlyXChars";
import { formatVal } from "../../util/algo";

export default function Stats({ data }) {
  console.log(data);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="py-3 text-center uppercase font-bold text-3xl bg-white rounded-2xl">
        Stats
      </h1>
      <div className="flex flex-col flex-grow  mt-4 ">
        <div className="flex flex-grow ">
          <div className="flex flex-col flex-grow border-r-4 border-white">
            <div className="flex flex-grow bg-slate-100  flex-col rounded-2xl p-4 ">
              <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
                Money Paid
              </h1>
              <div className="flex flex-grow bg-white p-4 mt-4 rounded-xl">
                <div className="flex flex-col text-base font-normal flex-grow space-y-4 ">
                  {data[4].map((i, index) => {
                    return (
                      <div className="flex space-x-4 text-start">
                        <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-lg bg-stone-100 flex-grow items-center pl-4">
                          <span className="flex-grow">
                            <OnlyXChars x={15} text={i.name} />
                          </span>
                          <span className="px-4">{formatVal(i.val)}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex  bg-slate-100 flex-grow flex-col rounded-2xl p-4 ">
            <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
              Expenses
            </h1>
            <div className="flex flex-grow bg-white p-4 mt-4 rounded-xl">
              <div className="flex flex-col text-base font-normal flex-grow space-y-4 ">
                {data[5].map((i, index) => {
                  return (
                    <div className="flex space-x-4 text-start">
                      <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center">
                        {index + 1}
                      </span>
                      <span className="flex rounded-lg bg-stone-100 flex-grow items-center pl-4">
                        <span className="flex-grow">
                          <OnlyXChars x={15} text={i.name} />
                        </span>
                        <span className="px-4">{formatVal(i.val)}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-grow border-t-4 border-white">
          <div className="flex flex-col flex-grow ">
            <div className="flex flex-grow bg-slate-100  flex-col rounded-2xl p-4 ">
              <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
                Debitors & Creditors
              </h1>
              <div className="flex flex-grow bg-white p-4 mt-4 rounded-xl">
                <div className="flex flex-col text-base font-normal flex-grow space-y-4 ">
                  {data[2].map((i, index) => {
                    return (
                      <div className="flex space-x-4 text-start">
                        <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center">
                          {index + 1}
                        </span>
                        <span className="flex rounded-lg  bg-stone-100 flex-grow items-center pl-4">
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
                            className="flex-grow w-[100px] text-center uppercase font-semibold text-stone-500"
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
                            className="px-4 flex-grow text-right font-medium"
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

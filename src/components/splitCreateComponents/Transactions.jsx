import OnlyXChars from "../../UIComponents/OnlyXChars";
import { formatVal } from "../../util/algo";
import noEntries from "../../assets/noEntries.png";

export default function Transactions({ data }) {
  console.log(data);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="py-3 text-center uppercase font-bold text-3xl bg-white rounded-2xl">
        Transactions
      </h1>
      <div className="flex flex-grow mt-4">
        <div className="flex flex-col flex-grow  ">
          <div className="flex flex-grow bg-slate-100  flex-col rounded-2xl p-4  ">
            <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
              Reduced Transactions
            </h1>
            <div className="flex flex-grow bg-white p-4 mt-4 rounded-xl">
              <div className="flex flex-col text-base font-normal flex-grow space-y-4 ">
                {data[3].length != 0 ? (
                  <div className="flex space-x-4 text-start">
                    <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center"></span>
                    <span className="flex rounded-lg font-semibold text-stone-500  bg-stone-100 flex-grow items-center pl-4">
                      <span className="w-[30%]">FROM</span>
                      <span className="w-[30%] text-center uppercase ">TO</span>
                      <span className="px-4 flex-grow text-right ">VALUE</span>
                    </span>
                  </div>
                ) : null}
                {data[3].length != 0 ? (
                  data[3].map((i, index) => {
                    return (
                      <>
                        <div className="flex space-x-4 text-start">
                          <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center">
                            {index + 1}
                          </span>
                          <span className="flex rounded-lg  bg-stone-100 flex-grow items-center pl-4">
                            <span className="w-[30%]">
                              <OnlyXChars x={15} text={i.from} />
                            </span>
                            <span className="w-[30%]  text-center ">
                              <OnlyXChars x={15} text={i.to} />
                            </span>
                            <span className="px-4 flex-grow text-right">
                              {formatVal(Math.abs(i.val))}
                            </span>
                          </span>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="flex flex-grow text-slate-400 flex-col items-center space-y-4 py-12 ">
                    <img
                      src={noEntries}
                      className="w-[100px] h-[100px] flex justify-center items-center"
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

      <div className="flex flex-grow border-t-4 border-white ">
        <div className="flex flex-col flex-grow ">
          <div className="flex flex-grow bg-slate-100  flex-col rounded-2xl p-4 ">
            <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
              Original Transactions
            </h1>
            <div className="flex flex-grow bg-white p-4 mt-4 rounded-xl">
              <div className="flex flex-col text-base font-normal flex-grow space-y-4 ">
                {data[3].length != 0 ? (
                  <div className="flex space-x-4 text-start">
                    <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center"></span>
                    <span className="flex rounded-lg font-semibold text-stone-500  bg-stone-100 flex-grow items-center pl-4">
                      <span className="w-[30%]">FROM</span>
                      <span className="w-[30%] text-center uppercase ">TO</span>
                      <span className="px-4 flex-grow text-right ">VALUE</span>
                    </span>
                  </div>
                ) : null}
                {data[0].length != 0 ? (
                  data[0].map((i, index) => {
                    return (
                      <>
                        <div className="flex space-x-4 text-start">
                          <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center">
                            {index + 1}
                          </span>
                          <span className="flex rounded-lg  bg-stone-100 flex-grow items-center pl-4">
                            <span className="w-[30%]">
                              <OnlyXChars x={15} text={i.from} />
                            </span>
                            <span className="w-[30%]  text-center ">
                              <OnlyXChars x={15} text={i.to} />
                            </span>
                            <span className="px-4 flex-grow text-right">
                              {formatVal(Math.abs(i.val))}
                            </span>
                          </span>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="flex flex-grow text-slate-400 flex-col items-center space-y-4 py-12 ">
                    <img
                      src={noEntries}
                      className="w-[100px] h-[100px] flex justify-center items-center"
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

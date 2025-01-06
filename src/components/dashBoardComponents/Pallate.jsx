import { useLoaderData } from "react-router-dom";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function Pallate() {
  const { colors } = useLoaderData();
  return (
    <>
      <div className="flex  flex-grow px-6 py-3">
        <div className="flex flex-col w-[50%] pr-4  flex-grow">
          <span className="mb-2 text-sm bg-black text-white rounded-md p-1 px-3 font-medium">
            Outgoing Expenses
          </span>
          <div className="flex flex-col pl-4 capitalize h-fit space-y-[10px]">
            {colors
              .filter((i) => i.list.length === 2 && i.list[0] === "outgoing")
              .map((j) => {
                return (
                  <div className="flex flex-col  flex-grow space-y-1">
                    <div className="flex items-center text-xs bg-[#f8f9fa] py-1 px-2 rounded-t-md border-b border-stone-500">
                      <div
                        style={{ backgroundColor: j.color }}
                        className="w-[12px] h-[12px] mr-[6px] rounded-full border border-stone-500"
                      ></div>
                      <span>{j.list[1]}</span>
                    </div>
                    <div className="flex pl-6 flex-wrap gap-x-3 gap-y-1">
                      {colors
                        .filter(
                          (m) =>
                            m.list.length === 3 &&
                            m.list[0] === "outgoing" &&
                            m.list[1] === j.list[1]
                        )
                        .map((k) => {
                          return (
                            <>
                              <div className="flex items-center ">
                                <div
                                  style={{ backgroundColor: k.color }}
                                  className="w-[12px] h-[12px] mr-[6px] rounded-full border border-stone-500"
                                ></div>
                                <span className="text-[11px] capitalize">
                                  <OnlyXChars x={25} text={k.list[2]} />
                                </span>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col w-[50%] pl-4  flex-grow">
          <span className="mb-2 text-sm bg-black text-white rounded-md p-1 px-3 font-medium">
            Incoming Expenses
          </span>
          <div className="flex flex-col h-fit pl-4 capitalize space-y-[10px]">
            {colors
              .filter((i) => i.list.length === 2 && i.list[0] === "incoming")
              .map((j) => {
                return (
                  <div className="flex flex-col  flex-grow space-y-1">
                    <div className="flex items-center text-xs bg-[#f8f9fa] py-1 px-2 rounded-t-md border-b border-stone-500">
                      <div
                        style={{ backgroundColor: j.color }}
                        className="w-[12px] h-[12px] mr-[6px] rounded-full border border-stone-500"
                      ></div>
                      <span>{j.list[1]}</span>
                    </div>
                    <div className="flex pl-6 flex-wrap gap-x-3 gap-y-1">
                      {colors
                        .filter(
                          (m) =>
                            m.list.length === 3 &&
                            m.list[0] === "incoming" &&
                            m.list[1] === j.list[1]
                        )
                        .map((k) => {
                          return (
                            <>
                              <div className="flex items-center ">
                                <div
                                  style={{ backgroundColor: k.color }}
                                  className="w-[12px] h-[12px] mr-[6px] rounded-full border border-stone-500"
                                ></div>
                                <span className="text-[11px] capitalize">
                                  <OnlyXChars x={25} text={k.list[2]} />
                                </span>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

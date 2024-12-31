import { useLoaderData } from "react-router-dom";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function Pallate() {
  const { colors } = useLoaderData();
  return (
    <>
      <div className="flex  flex-grow px-10 py-4">
        <div className="flex flex-col w-[50%] pr-6  flex-grow">
          <span className="mb-3 text-lg bg-black text-white rounded-lg p-1 px-4 font-medium">
            Outgoing Expenses
          </span>
          <div className="flex flex-col pl-6 capitalize h-fit space-y-4">
            {colors
              .filter((i) => i.list.length === 2 && i.list[0] === "outgoing")
              .map((j) => {
                return (
                  <div className="flex flex-col  flex-grow space-y-2">
                    <div className="flex items-center bg-[#f8f9fa] py-1 px-2 rounded-t-lg border-b border-stone-500">
                      <div
                        style={{ backgroundColor: j.color }}
                        className="w-[15px] h-[15px] mr-2 rounded-full border border-stone-500"
                      ></div>
                      <span>{j.list[1]}</span>
                    </div>
                    <div className="flex pl-8 flex-wrap gap-x-4 gap-y-1">
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
                                  className="w-[15px] h-[15px] mr-2 rounded-full border border-stone-500"
                                ></div>
                                <span className="text-sm capitalize">
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

        <div className="flex flex-col w-[50%] pl-6  flex-grow">
          <span className="mb-3 text-lg bg-black text-white rounded-lg p-1 px-4 font-medium">
            Incoming Expenses
          </span>
          <div className="flex flex-col h-fit pl-6 capitalize space-y-4">
            {colors
              .filter((i) => i.list.length === 2 && i.list[0] === "incoming")
              .map((j) => {
                return (
                  <div className="flex flex-col  flex-grow space-y-2">
                    <div className="flex items-center bg-[#f8f9fa] py-1 px-2 rounded-t-lg border-b border-stone-500">
                      <div
                        style={{ backgroundColor: j.color }}
                        className="w-[15px] h-[15px] mr-2 rounded-full border border-stone-500"
                      ></div>
                      <span>{j.list[1]}</span>
                    </div>
                    <div className="flex pl-8 flex-wrap gap-x-4 gap-y-1">
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
                                  className="w-[15px] h-[15px] mr-2 rounded-full border border-stone-500"
                                ></div>
                                <span className="text-sm capitalize">
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

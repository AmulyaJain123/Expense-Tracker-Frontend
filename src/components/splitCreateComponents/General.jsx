import OnlyXChars from "../../UIComponents/OnlyXChars";
export default function General({ data }) {
  console.log(data);
  return (
    <>
      <div className="flex flex-col flex-grow">
        <h1 className="py-[6px] sm:py-2 text-center uppercase font-bold text-[18px] sm:text-[22px] bg-white rounded-lg sm:rounded-xl">
          General
        </h1>
        <div className="flex flex-col tab:flex-row flex-grow  mt-[6px] sm:mt-[10px] rounded-xl sm:rounded-2xl">
          <div className="flex flex-col tab:w-1/2 tab:max-w-[550px]">
            <div className="flex flex-grow bg-slate-100 border-b-[3px] tab:border-b-0 tab:border-r-[3px] border-white flex-col  p-[8px] sm:p-3 ">
              <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white rounded-md sm:rounded-lg">
                SPLIT Info
              </h1>
              <div className="bg-white rounded-md sm:rounded-lg flex flex-col mt-2 sm:mt-3 p-[6px] sm:p-3 space-y-2 sm:space-y-3 flex-grow">
                <div className="flex text-[11px] sm:text-xs text-start p-[6px] flex-col font-normal">
                  <span className="font-medium text-xs sm:text-sm mb-1">
                    SPLIT Name
                  </span>
                  <span className="bg-stone-100 p-[3px] sm:p-1 rounded-[5px] pl-2 sm:pl-3">
                    <OnlyXChars x={20} text={data.splitInfo.splitName} />
                  </span>
                </div>
                <div className="flex text-[11px] sm:text-xs text-start p-[6px] flex-col font-normal">
                  <span className="font-medium text-xs sm:text-sm mb-1">
                    SPLIT Created on
                  </span>
                  <span className="bg-stone-100 p-[3px] sm:p-1 rounded-[5px] pl-2 sm:pl-3">
                    <OnlyXChars
                      x={30}
                      text={
                        data.splitInfo.splitDate === ""
                          ? new Date().toDateString()
                          : new Date(data.splitInfo.splitDate).toDateString()
                      }
                    />
                  </span>
                </div>
                <div className="flex text-[11px] sm:text-xs text-start p-[6px] flex-col font-normal">
                  <span className="font-medium text-xs sm:text-sm mb-1">
                    SPLIT Description
                  </span>
                  <span className="bg-stone-100  p-[3px] sm:p-1 rounded-[5px] pl-2 sm:pl-3">
                    <span className="flex h-[80px] sm:h-[100px] break-words p-1 sm:p-[6px]">
                      <OnlyXChars
                        x={200}
                        text={data.splitInfo.description || "None"}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  bg-slate-100 flex-grow flex-col rounded-xl sm:rounded-2xl p-2 sm:p-3 ">
            <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white rounded-md sm:rounded-lg">
              Participants
            </h1>
            <div className="flex flex-grow bg-white p-2 sm:p-3 mt-2 sm:mt-3 rounded-md sm:rounded-lg">
              <div className="flex flex-col text-[11px] sm:text-xs font-normal flex-grow space-y-2 sm:space-y-3 ">
                {data.friends.map((i, index) => {
                  return (
                    <div className="flex space-x-2 sm:space-x-3">
                      <span className="w-[22px] sm:w-[27px] rounded-[4px] sm:rounded-md bg-stone-100 h-[22px] sm:h-[27px] flex justify-center items-center">
                        {index + 1}
                      </span>
                      <span className="flex rounded-[4px] sm:rounded-md bg-stone-100 flex-grow items-center pl-2 sm:pl-3">
                        {i.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

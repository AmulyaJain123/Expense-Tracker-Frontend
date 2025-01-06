import OnlyXChars from "../../UIComponents/OnlyXChars";
export default function General({ data }) {
  console.log(data);
  return (
    <>
      <div className="flex flex-col flex-grow">
        <h1 className="py-2 text-center uppercase font-bold text-[22px] bg-white rounded-xl">
          General
        </h1>
        <div className="flex flex-grow  mt-[10px] rounded-2xl">
          <div className="flex flex-col w-1/2 max-w-[550px]">
            <div className="flex flex-grow bg-slate-100 border-r-[3px] border-white flex-col  p-3 ">
              <h1 className="font-semibold uppercase text-base text-center py-[6px] bg-white rounded-lg">
                SPLIT Info
              </h1>
              <div className="bg-white rounded-lg flex flex-col mt-3 p-3 space-y-3 flex-grow">
                <div className="flex text-xs text-start p-[6px] flex-col font-normal">
                  <span className="font-medium text-sm mb-1">SPLIT Name</span>
                  <span className="bg-stone-100 p-1 rounded-[5px] pl-3">
                    <OnlyXChars x={20} text={data.splitInfo.splitName} />
                  </span>
                </div>
                <div className="flex text-xs text-start p-[6px] flex-col font-normal">
                  <span className="font-medium text-sm mb-1">
                    SPLIT Created on
                  </span>
                  <span className="bg-stone-100 p-1 rounded-[5px] pl-3">
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
                <div className="flex text-xs text-start p-[6px] flex-col font-normal">
                  <span className="font-medium text-sm mb-1">
                    SPLIT Description
                  </span>
                  <span className="bg-stone-100  p-1 rounded-md pl-2">
                    <span className="flex h-[100px] break-words p-[6px]">
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
          <div className="flex  bg-slate-100 flex-grow flex-col rounded-2xl p-3 ">
            <h1 className="font-semibold uppercase text-base text-center py-[6px] bg-white rounded-lg">
              Participants
            </h1>
            <div className="flex flex-grow bg-white p-3 mt-3 rounded-lg">
              <div className="flex flex-col text-xs font-normal flex-grow space-y-3 ">
                {data.friends.map((i, index) => {
                  return (
                    <div className="flex space-x-3">
                      <span className="w-[27px] rounded-md bg-stone-100 h-[27px] flex justify-center items-center">
                        {index + 1}
                      </span>
                      <span className="flex rounded-md bg-stone-100 flex-grow items-center pl-3">
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

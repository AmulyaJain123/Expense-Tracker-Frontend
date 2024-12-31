import OnlyXChars from "../../UIComponents/OnlyXChars";
export default function General({ data }) {
  console.log(data);
  return (
    <>
      <div className="flex flex-col flex-grow">
        <h1 className="py-3 text-center uppercase font-bold text-3xl bg-white rounded-2xl">
          General
        </h1>
        <div className="flex flex-grow  mt-4 rounded-2xl">
          <div className="flex flex-col flex-grow max-w-[550px]">
            <div className="flex flex-grow bg-slate-100 border-r-4 border-white flex-col  p-4 ">
              <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
                SPLIT Info
              </h1>
              <div className="bg-white rounded-xl flex flex-col mt-4 p-4 space-y-4 flex-grow">
                <div className="flex text-base text-start p-2 flex-col font-normal">
                  <span className="font-medium text-lg mb-1">SPLIT Name</span>
                  <span className="bg-stone-100 p-1 rounded-md pl-4">
                    <OnlyXChars x={20} text={data.splitInfo.splitName} />
                  </span>
                </div>
                <div className="flex text-base text-start p-2 flex-col font-normal">
                  <span className="font-medium text-lg mb-1">
                    SPLIT Created on
                  </span>
                  <span className="bg-stone-100 p-1 rounded-md pl-4">
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
                <div className="flex text-base text-start p-2 flex-col font-normal">
                  <span className="font-medium text-lg mb-1">
                    SPLIT Description
                  </span>
                  <span className="bg-stone-100  p-1 rounded-md pl-2">
                    <span className="flex h-[150px] break-words p-2">
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
          <div className="flex  bg-slate-100 flex-grow flex-col rounded-2xl p-4 ">
            <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
              Participants
            </h1>
            <div className="flex flex-grow bg-white p-4 mt-4 rounded-xl">
              <div className="flex flex-col text-base font-normal flex-grow space-y-4 ">
                {data.friends.map((i, index) => {
                  return (
                    <div className="flex space-x-4">
                      <span className="w-[35px] rounded-lg bg-stone-100 h-[35px] flex justify-center items-center">
                        {index + 1}
                      </span>
                      <span className="flex rounded-lg bg-stone-100 flex-grow items-center pl-4">
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

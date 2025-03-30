import { useLoaderData } from "react-router-dom";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function TagPallate() {
  const { tagColors } = useLoaderData();
  return (
    <>
      <div className="flex  flex-grow px-6 py-3">
        <div className="flex flex-col w-[50%] pr-4  flex-grow">
          <span className="mb-2 text-sm bg-black text-center text-white rounded-md p-1 px-3 font-medium">
            Tags
          </span>
          <div className="flex flex-wrap gap-2 justify-center capitalize h-fit pb-8 pt-2">
            {tagColors.length === 0 ? (
              <span className="rounded-[5px]  flex">
                <span className="rounded-[5px] text-black min-w-[40px] p-[3px] px-2 bg-white  text-xs">
                  No Tags
                </span>
              </span>
            ) : (
              tagColors.map((j) => {
                return (
                  <span className="rounded-[5px]  flex">
                    <span
                      style={{ backgroundColor: j.color }}
                      className="w-[15px] rounded-l-[5px]"
                    ></span>
                    <span className="rounded-r-[5px] text-black min-w-[40px] p-[3px] pl-1 pr-2 bg-white  text-xs">
                      {j.tag}
                    </span>
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

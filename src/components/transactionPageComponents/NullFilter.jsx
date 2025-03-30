import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { transactionActions } from "../../store/main";

export default function NullFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.transactions.filtersAdded);

  function removeClick(ind) {
    dispatch(transactionActions.popFilter(ind));
  }

  return (
    <>
      {filters.length === 0 ? (
        <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4 justify-center rounded-r-xl p-4 px-16">
          <div className="text-lg tracking-widest font-semibold mx-auto mb-[10px] uppercase">
            No filter selected
          </div>
          <div className="text-md font-medium tracking-tight mx-auto mb-[20px] captalize">
            Select a filter to continue
          </div>
        </div>
      ) : (
        <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4  rounded-r-xl p-4 px-12">
          <div className="text-lg mt-[6px] tracking-wide font-bold mx-auto mb-[10px] uppercase">
            Filters Added
          </div>
          <div className="flex mt-3 overflow-auto pt-[15px] customScroll pr-3 flex-wrap gap-[10px]">
            {filters.map((i, index) => {
              // console.log(i);
              return (
                <div
                  key={Math.random()}
                  className="w-[32%] max-w-[200px] max-h-[200px] group relative aspect-square flex flex-col border-[1.5px] border-[#ccd5ae] rounded-lg bg-[#e9edc9]"
                >
                  <button
                    onClick={() => removeClick(index)}
                    className="absolute opacity-0 duration-500 group-hover:opacity-100 flex justify-center items-center bottom-[10px] right-[50%] translate-x-[50%]"
                  >
                    <i className="fi fi-ss-cross-circle text-xl flex  justify-center items-center"></i>
                  </button>
                  <div className="flex mt-[6px] justify-center items-center">
                    <span className="p-1 px-4 flex flex-grow mx-[6px] justify-center rounded-md bg-[#606c38] text-[#ccd5ae] text-sm font-bold">
                      {i.name}
                    </span>
                  </div>
                  <div className="flex flex-col customScrollThin items-center gap-y-[4px] overflow-auto h-[130px] m-1 pt-2 pl-1 p-2">
                    {i.options.map((option) => {
                      return (
                        <span
                          key={Math.random()}
                          style={{
                            textTransform:
                              i.name === "Category" ? "capitalize" : "",
                          }}
                          className="rounded-md text-center p-1 px-2 text-xs bg-[#ccd5ae] text-[#606c38] font-medium"
                        >
                          {i.name === "Category"
                            ? option.length === 2
                              ? "Null"
                              : `${
                                  option[1].length > 10
                                    ? option[1].substr(0, 10) + "..."
                                    : option[1]
                                } > ${
                                  option[2].length > 10
                                    ? option[2].substr(0, 10) + "..."
                                    : option[2]
                                }`
                            : option}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

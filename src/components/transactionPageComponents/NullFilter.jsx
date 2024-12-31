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
          <div className="text-2xl tracking-widest font-semibold mx-auto mb-[20px] uppercase">
            No filter selected
          </div>
          <div className="text-xl font-medium mx-auto mb-[20px] captalize">
            Select a filter to continue
          </div>
        </div>
      ) : (
        <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4  rounded-r-xl p-4 px-12">
          <div className="text-2xl mt-4 tracking-wide font-bold mx-auto mb-[20px] uppercase">
            Filters Added:
          </div>
          <div className="flex mt-4 overflow-auto pt-[20px] customScroll pr-4 flex-wrap gap-3">
            {filters.map((i, index) => {
              // console.log(i);
              return (
                <div
                  key={Math.random()}
                  className="w-[32%] max-w-[300px] max-h-[300px] group relative aspect-square flex flex-col border-2 border-[#ccd5ae] rounded-xl bg-[#e9edc9]"
                >
                  <button
                    onClick={() => removeClick(index)}
                    className="absolute opacity-0 duration-500 group-hover:opacity-100 flex justify-center items-center bottom-[20px] right-[50%] translate-x-[50%]"
                  >
                    <i className="fi fi-ss-cross-circle text-3xl flex h-[35px] justify-center items-center"></i>
                  </button>
                  <div className="flex mt-2 justify-center items-center">
                    <span className="p-1 px-4 flex flex-grow mx-2 justify-center rounded-lg bg-[#606c38] text-[#ccd5ae] text-lg font-bold">
                      {i.name}
                    </span>
                  </div>
                  <div className="flex flex-col customScrollThin items-center gap-y-2 overflow-auto h-[200px] m-2 pt-4 pl-3 p-2">
                    {i.options.map((option) => {
                      return (
                        <span
                          key={Math.random()}
                          className="rounded-lg text-center capitalize p-1 px-3 text-base bg-[#ccd5ae] text-[#606c38] font-medium"
                        >
                          {i.name === "Category"
                            ? option.length === 2
                              ? "Null"
                              : `${
                                  option[1].length > 6
                                    ? option[1].substr(0, 6) + "..."
                                    : option[1]
                                } > ${
                                  option[2].length > 6
                                    ? option[2].substr(0, 6) + "..."
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

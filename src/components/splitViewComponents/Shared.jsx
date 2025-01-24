import OnlyXChars from "../../UIComponents/OnlyXChars";
import { formatVal } from "../../util/algo";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import noEntries from "../../assets/noEntries.png";
import { format } from "date-fns";

export default function Shared({ data }) {
  console.log(data);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="py-[6px] sm:py-2 text-center uppercase font-bold text-[18px] sm:text-[22px] bg-white rounded-lg sm:rounded-xl">
        Shared
      </h1>
      <div className="flex flex-grow mt-[6px]">
        <div className="flex flex-col flex-grow  ">
          <div className="flex flex-grow bg-slate-100  flex-col rounded-lg sm:rounded-xl p-[8px] sm:p-3  ">
            <h1 className="font-semibold uppercase text-sm sm:text-base text-center py-1 sm:py-[6px] bg-white rounded-md sm:rounded-lg">
              Friends
            </h1>
            <div className="flex flex-grow bg-white p-3 mt-3 rounded-lg">
              <div className="flex flex-col text-sm font-normal min-h-[400px] flex-grow space-y-3 ">
                {data.length === 0 ? (
                  <div className="flex text-xs sm:text-sm flex-grow flex-col text-slate-400 items-center space-y-3 sm:space-y-4 mt-16 sm:mt-24 ">
                    <img
                      src={noEntries}
                      className="w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] flex justify-center items-center"
                      alt=""
                    />
                    <span>Shared to None</span>
                  </div>
                ) : (
                  <>
                    {data.reverse().map((i) => {
                      return (
                        <div className="flex group  justify-between rounded-2xl tab:rounded-full p-1 lg:p-[6px] space-x-3 bg-slate-200">
                          <div className="space-x-3 tab:space-x-4  lg:space-x-6 flex ">
                            <Link to={`/profile/public/${i.userId}`}>
                              <img
                                src={i.profilePic || user}
                                className="w-[35px] h-[35px] ml-[2px] mt-[2px] tab:ml-0 tab:mt-0 lg:w-[40px] lg:h-[40px] rounded-full"
                                alt=""
                              />
                            </Link>
                            <div className="flex flex-wrap flex-col  h-[125px] sm:h-[80px]  tab:h-[36px] lg:h-[41px] gap-y-2 gap-x-2 tab:gap-x-4  lg:gap-x-6">
                              <div className="flex flex-col justify-center">
                                <span className="italic text-start text-xs lg:text-sm">
                                  Name
                                </span>
                                <span className="w-[150px] h-[18px] lg:h-[20px] lg:w-[180px] bg-slate-100 px-1 lg:px-[6px] rounded-[4px] lg:rounded-md flex items-center">
                                  <span className="flex max-w-[300px] text-[11px] lg:text-xs overflow-clip py-[2px] flex-grow font-medium items-center">
                                    <OnlyXChars x={20} text={i.username} />
                                  </span>
                                </span>
                              </div>

                              <div className="flex flex-col w-[100px] lg:w-[115px] justify-center">
                                <span className="italic text-start text-xs lg:text-sm">
                                  User ID
                                </span>
                                <span className="flex h-[18px] lg:h-[20px] bg-slate-100 px-1 lg:px-[6px] rounded-[4px] lg:rounded-md py-[2px] items-center font-medium text-[11px] lg:text-xs">
                                  <span className="font-semibold mr-1 lg:mr-[6px]">
                                    #
                                  </span>{" "}
                                  <span>{i.userId}</span>
                                </span>
                              </div>

                              <div className="flex flex-col w-[120px] lg:w-[130px] justify-center">
                                <span className="italic text-start text-xs lg:text-sm">
                                  Shared On
                                </span>
                                <span className="w-[160px] h-[18px] lg:h-[20px] lg:w-[200px] bg-slate-100 px-1 lg:px-[6px] py-[2px] rounded-[4px] lg:rounded-md flex items-center">
                                  <span className="flex max-w-[300px] text-[11px] lg:text-xs overflow-clip flex-grow font-medium items-center">
                                    <span className="mr-2 lg:mr-3">{`${format(
                                      new Date(i.sharedOn),
                                      "hh:mm a"
                                    )}`}</span>{" "}
                                    <span>{`${new Date(
                                      i.sharedOn
                                    ).toDateString()}`}</span>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

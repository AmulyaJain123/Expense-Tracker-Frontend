import OnlyXChars from "../../UIComponents/OnlyXChars";
import { formatVal } from "../../util/algo";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import noEntries from "../../assets/noEntries.png";
import { format } from "date-fns";
import { EmptyBox } from "../../UIComponents/NoneFound";

export default function Shared({ data }) {
  console.log("Hello", data);

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
                  <EmptyBox
                    IconSize={60}
                    gap={12}
                    textSize={15}
                    textColor="#cbd5e1"
                    msg="No User Found"
                  />
                ) : (
                  <>
                    {data.map((i) => {
                      return (
                        <>
                          <div className="flex group  justify-between rounded-lg p-1 lg:p-[6px] space-x-3 bg-slate-200">
                            <div className="space-x-3 tab:space-x-3  lg:space-x-4 flex ">
                              <Link to={`/profile/public/${i.userInfo.userId}`}>
                                <img
                                  src={i.userInfo.profilePic || user}
                                  className="w-[35px] h-[35px] ml-[2px] mt-[2px] tab:ml-0 tab:mt-0 lg:w-[40px] lg:h-[40px] rounded-full"
                                  alt=""
                                />
                              </Link>
                              <div className="flex flex-wrap flex-col  h-[125px] sm:h-[80px]  tab:h-[36px] lg:h-[41px] gap-y-2 gap-x-2 tab:gap-x-3  lg:gap-x-4">
                                <div className="flex flex-col justify-center">
                                  <span className="text-[11px] text-start bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                                    Full Name
                                  </span>
                                  <span className="w-[130px] italic mob:w-[150px] xl:w-[180px]  px-[6px] xl:px-[6px] rounded-[4px] flex items-center">
                                    <span className="flex font-['Open Sans'] text-[11px] mob:text-xs xl:text-[13px] overflow-clip flex-grow font-medium items-center">
                                      <OnlyXChars
                                        x={20}
                                        text={i.userInfo.fullname}
                                      />
                                    </span>
                                  </span>
                                </div>

                                <div className="flex flex-col w-[165px] xl:w-[180px] justify-center">
                                  <span className=" text-[11px] text-start bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                                    Username
                                  </span>
                                  <span className="flex italic px-[6px] xl:px-[6px] rounded-[4px] items-center font-medium text-[11px] mob:text-xs xl:text-[13px]">
                                    <span>{`@${i.userInfo.username}`}</span>
                                  </span>
                                </div>

                                <div className="flex flex-col w-[185px] xl:w-[220px] justify-center">
                                  <span className="text-start text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                                    Shared On
                                  </span>
                                  <span className="flex italic px-[6px] xl:px-[6px] rounded-[4px] items-center font-medium text-[11px] mob:text-xs xl:text-[13px]">
                                    {format(
                                      new Date(i.sharedOn),
                                      "hh:mm a | EEE, dd MMM yyyy"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
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

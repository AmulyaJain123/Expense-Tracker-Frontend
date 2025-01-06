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
      <h1 className="py-2 text-center uppercase font-bold text-2xl bg-white rounded-xl">
        Shared
      </h1>
      <div className="flex flex-grow mt-[6px]">
        <div className="flex flex-col flex-grow  ">
          <div className="flex flex-grow bg-slate-100  flex-col rounded-xl p-3  ">
            <h1 className="font-semibold uppercase text-base text-center py-[6px] bg-white rounded-lg">
              Friends
            </h1>
            <div className="flex flex-grow bg-white p-3 mt-3 rounded-lg">
              <div className="flex flex-col text-sm font-normal min-h-[400px] flex-grow space-y-3 ">
                {data.length === 0 ? (
                  <div className="flex flex-grow flex-col text-slate-400 items-center space-y-4 mt-24 ">
                    <img
                      src={noEntries}
                      className="w-[80px] h-[80px] flex justify-center items-center"
                      alt=""
                    />
                    <span>Shared to None</span>
                  </div>
                ) : (
                  <>
                    {data.reverse().map((i) => {
                      return (
                        <div className="flex group  justify-between rounded-full p-[6px] space-x-3 bg-slate-200">
                          <div className="space-x-6 flex ">
                            <Link to={`/profile/public/${i.userId}`}>
                              <img
                                src={i.profilePic || user}
                                className="w-[40px] h-[40px] rounded-full"
                                alt=""
                              />
                            </Link>
                            <div className="flex flex-col justify-center">
                              <span className="italic text-start">Name</span>
                              <span className="w-[180px] bg-slate-100 px-[6px] rounded-md flex items-center">
                                <span className="flex max-w-[300px] text-xs overflow-clip py-[2px] flex-grow font-medium items-center">
                                  <OnlyXChars x={20} text={i.username} />
                                </span>
                              </span>
                            </div>

                            <div className="flex flex-col w-[115px] justify-center">
                              <span className="italic text-start">User ID</span>
                              <span className="flex bg-slate-100 px-[6px] rounded-md py-[2px] items-center font-medium text-xs">
                                <span className="font-semibold mr-[6px]">
                                  #
                                </span>{" "}
                                <span>{i.userId}</span>
                              </span>
                            </div>

                            <div className="flex flex-col w-[130px] justify-center">
                              <span className="italic text-start">
                                Shared On
                              </span>
                              <span className="w-[200px] bg-slate-100 px-[6px] py-[2px] rounded-md flex items-center">
                                <span className="flex max-w-[300px] text-xs overflow-clip flex-grow font-medium items-center">
                                  <span className="mr-3">{`${format(
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

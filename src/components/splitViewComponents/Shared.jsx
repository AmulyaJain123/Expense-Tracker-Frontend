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
      <h1 className="py-3 text-center uppercase font-bold text-3xl bg-white rounded-2xl">
        Shared
      </h1>
      <div className="flex flex-grow mt-4">
        <div className="flex flex-col flex-grow  ">
          <div className="flex flex-grow bg-slate-100  flex-col rounded-2xl p-4  ">
            <h1 className="font-semibold uppercase text-xl text-center py-2 bg-white rounded-xl">
              Friends
            </h1>
            <div className="flex flex-grow bg-white p-4 mt-4 rounded-xl">
              <div className="flex flex-col text-base font-normal flex-grow space-y-4 ">
                {data.length === 0 ? (
                  <div className="flex flex-grow flex-col items-center space-y-4 mt-24 ">
                    <img
                      src={noEntries}
                      className="w-[100px] h-[100px] flex justify-center items-center"
                      alt=""
                    />
                    <span>Shared to None</span>
                  </div>
                ) : (
                  <>
                    {data.reverse().map((i) => {
                      return (
                        <div className="flex group  justify-between rounded-full p-2 space-x-4 bg-slate-200">
                          <div className="space-x-12 flex ">
                            <Link to={`/profile/public/${i.userId}`}>
                              <img
                                src={i.profilePic || user}
                                className="w-[55px] h-[55px] rounded-full"
                                alt=""
                              />
                            </Link>
                            <div className="flex flex-col justify-center">
                              <span className="italic text-start">Name</span>
                              <span className="w-[200px] bg-slate-100 px-2 rounded-md flex items-center">
                                <span className="flex max-w-[300px] text-base overflow-clip flex-grow font-medium items-center">
                                  <OnlyXChars x={20} text={i.username} />
                                </span>
                              </span>
                            </div>

                            <div className="flex flex-col w-[180px] justify-center">
                              <span className="italic text-start">User ID</span>
                              <span className="flex bg-slate-100 px-2 rounded-md items-center font-medium text-base">
                                <span className="font-semibold mr-2">#</span>{" "}
                                <span>{i.userId}</span>
                              </span>
                            </div>

                            <div className="flex flex-col w-[180px] justify-center">
                              <span className="italic text-start">
                                Shared On
                              </span>
                              <span className="w-[250px] bg-slate-100 px-2 rounded-md flex items-center">
                                <span className="flex max-w-[300px] text-base overflow-clip flex-grow font-medium items-center">
                                  <span className="mr-4">{`${format(
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

import user from "../../assets/user.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import { Link } from "react-router-dom";
import noEntries from "../../assets/noEntries.png";
import reload from "../../assets/reload.png";
import { format } from "date-fns";
import { ErrorBox, EmptyBox } from "../../UIComponents/NoneFound";

export default function SendRequests() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);

  async function fetchRequests() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/getsentrequests",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      setRequests(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div
      style={{ height: "calc(100% - 8px)" }}
      className="flex flex-col  gap-y-2  relative p-1 mob:p-3 rounded-lg bg-white mt-2 "
    >
      {/* <div className="flex justify-center"> */}
      <button
        onClick={fetchRequests}
        disabled={loading}
        className="disabled:pointer-events-none disabled:opacity-50 absolute top-[-42px] mob:top-[-44px] lg:top-[-48px] p-2 bg-white rounded-full hover:bg-slate-100 duration-500 z-[1] left-[110px] mob:left-[145px] translate-x-[50%]"
      >
        <img
          src={reload}
          className="w-[15px] h-[15px] flex justify-center items-center"
          alt=""
        />
      </button>
      {/* </div> */}
      <div
        style={{ height: "calc( 100% )" }}
        className=" flex  flex-col p-2 mob:p-3  sm:py-0 overflow-auto specialScrollLight  space-y-4  "
      >
        {loading ? (
          <div className="flex justify-center items-center flex-grow ">
            <img
              src={load}
              className="w-[40px] h-[40px] flex justify-center items-center"
              alt=""
            />
          </div>
        ) : error ? (
          <ErrorBox IconSize={50} fontWeight={500} />
        ) : (
          <>
            {requests.length != 0 ? (
              <>
                {requests.map((i) => {
                  console.log(i);

                  return (
                    <div className="flex flex-col  group duration-500 justify-between rounded-md tab:rounded-lg  sm:gap-x-3 bg-slate-200">
                      <div className="space-x-2 mob:space-x-4 xl:space-x-6 flex items-center p-[6px]">
                        <div className="flex flex-col gap-y-3 ml-1 tab:ml-0 self-start tab:self-center mt-2 tab:mt-0 items-center">
                          <Link to={`/profile/public/${i.userId}`}>
                            <img
                              src={i.profilePic || user}
                              className="w-[45px] h-[45px] mob:w-[55px] mob:h-[55px] tab:ml-2 xl:ml-0 xl:w-[45px] xl:h-[45px] rounded-full"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="flex flex-col xl:flex-row flex-wrap xl:flex-nowrap  h-[120px] smMob:h-[80px] sm:h-[120px] tab:h-[80px] gap-x-4 gap-y-2 xl:space-x-6  xl:h-auto">
                          <div className="flex flex-col justify-center">
                            <span className="text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                              Full Name
                            </span>
                            <span className="w-[140px] italic mob:w-[160px] xl:w-[200px]  px-[6px] xl:px-[6px] rounded-[4px] flex items-center">
                              <span className="flex font-['Open Sans'] text-[11px] mob:text-xs xl:text-[13px] overflow-clip flex-grow font-medium items-center">
                                <OnlyXChars x={20} text={i.fullname} />
                              </span>
                            </span>
                          </div>

                          <div className="flex flex-col w-[165px] xl:w-[180px] justify-center">
                            <span className=" text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                              Username
                            </span>
                            <span className="flex italic px-[6px] xl:px-[6px] rounded-[4px] items-center font-medium text-[11px] mob:text-xs xl:text-[13px]">
                              <span>{`@${i.username}`}</span>
                            </span>
                          </div>

                          <div className="flex flex-col w-[115px] xl:w-[140px] justify-center">
                            <span className=" text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                              Request Status
                            </span>
                            <span
                              style={{
                                color:
                                  i.status === "sent"
                                    ? "blue"
                                    : i.status === "rejected"
                                    ? "red"
                                    : "green",
                              }}
                              className="flex italic px-[6px] xl:px-[6px] rounded-[4px] items-center font-medium text-[11px] mob:text-xs xl:text-[13px]"
                            >
                              {i.status === "sent"
                                ? "Sent"
                                : i.status === "rejected"
                                ? "Rejected"
                                : "Accepted"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="flex text-[11px] p-[6px] pr-2 border-t-[1.5px] border-white justify-end ">
                        <span className="">
                          <span className="font-semibold mr-1 mob:mr-2">
                            Sent On
                          </span>{" "}
                          <span>{`${format(
                            new Date(i.sendDate),
                            "hh:mm a | dd MMM yyyy"
                          )}`}</span>
                        </span>
                        {i.resolvedDate ? (
                          <span className="sm:ml-6">
                            <span className="font-semibold capitalize mr-1 mob:mr-2">
                              {i.status} On
                            </span>{" "}
                            <span>{`${format(
                              new Date(i.resolvedDate),
                              "hh:mm a | dd MMM yyyy"
                            )}`}</span>
                          </span>
                        ) : null}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <EmptyBox
                textColor="#cbd5e1"
                IconSize={60}
                gap={12}
                textSize={15}
                msg="No Requests Found"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

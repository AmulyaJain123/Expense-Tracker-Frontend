import user from "../../assets/user.png";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import exclamation from "../../assets/exclamation.png";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function RequestTile({ i }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stat, setStat] = useState(i.status != "sent" ? i.status : "buttons");

  async function closeRequest(val) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/closerequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            val: val,
            email: i.email,
            userId: i.userId,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      if (val) {
        setStat("accepted");
      } else {
        setStat("rejected");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex relative flex-col">
        <div className="w-[14px] h-[14px] sm:w-[12px] sm:h-[12px] tab:w-[15px] tab:h-[15px] bg-slate-200 rotate-45 absolute top-[80px] sm:top-[50px] tab:top-[25px] left-[1px] translate-x-[-50%] translate-y-[50%]"></div>

        <div className="flex flex-col tab:flex-row group duration-500 justify-between rounded-xl p-2 pl-[10px] tab:pl-4 sm:space-x-3 bg-slate-200">
          <div className="space-x-4 tab:space-x-8 text-xs flex ">
            <Link to={`/profile/public/${i.userId}`}>
              <img
                src={i.profilePic || user}
                className="w-[45px] h-[45px] tab:w-[50px] tab:h-[50px] rounded-full"
                alt=""
              />
            </Link>
            <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap h-[80px] sm:h-auto gap-y-2 gap-x-4  tab:space-x-4">
              <div className="flex flex-col justify-center">
                <span className="italic">Name</span>
                <span className="w-[160px] tab:w-[200px] bg-slate-100 px-[6px] tab:px-2 rounded-[4px] flex items-center">
                  <span className="flex  text-xs tab:text-sm overflow-clip flex-grow font-medium items-center">
                    <OnlyXChars x={20} text={i.username} />
                  </span>
                </span>
              </div>

              <div className="flex flex-col w-[120px] tab:w-[140px] justify-center">
                <span className="italic">User ID</span>
                <span className="flex items-center bg-slate-100 px-[6px] tab:px-2  rounded-[4px] font-medium text-xs tab:text-sm">
                  <span className="font-semibold mr-[6px] mob:mr-2">#</span>{" "}
                  <span>{i.userId}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 tab:mt-0 h-[30px] tab:h-auto justify-end tab:justify-start  tab:mb-0 flex items-center pr-2 tab:pr-3 space-x-2">
            <div className="flex items-center ">
              {error ? (
                <div className="text-red-500 mr-4 tab:mr-1 font-medium flex space-x-1 text-xs items-center">
                  <img src={exclamation} className="w-[14px] h-[14px]" alt="" />
                  <span className="mt-[1px]">Failed</span>
                </div>
              ) : null}

              {loading ? (
                <div className="p-[6px] lg:p-2">
                  <img
                    src={load}
                    className="flex justify-center items-center w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]"
                    alt=""
                  />
                </div>
              ) : null}
            </div>

            {stat === "buttons" ? (
              <>
                <button
                  onClick={() => closeRequest(true)}
                  disabled={loading}
                  className="p-[6px] tab:p-2 disabled:pointer-events-none disabled:opacity-50 rounded-full hover:bg-slate-100 duration-500"
                >
                  <img
                    src={tick}
                    className="w-[17px] h-[17px] tab:w-[20px] tab:h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
                <button
                  onClick={() => closeRequest(false)}
                  disabled={loading}
                  className="p-[6px] tab:p-2 disabled:pointer-events-none disabled:opacity-50 rounded-full hover:bg-slate-100 duration-500"
                >
                  <img
                    src={cross}
                    className="w-[17px] h-[17px] tab:w-[20px] tab:h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </>
            ) : (
              <span
                style={{ color: stat === "accepted" ? "green" : "red" }}
                className="capitalize font-medium text-xs tab:text-sm"
              >
                {"You " + stat}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mt-1 flex-grow justify-start pl-1 mob:pl-4 text-[10px] tab:text-[11px] pr-1 mob:pr-4 text-neutral-500">
          <span className="w-[200px] tab:w-[220px]">
            <span className="font-semibold mr-2">Sent On</span>{" "}
            <span>{`${format(new Date(i.sendDate), "hh:mm a")} | ${new Date(
              i.sendDate
            ).toDateString()}`}</span>
          </span>
          {i.resolvedDate ? (
            <span className="sm:ml-6">
              <span className="font-semibold capitalize mr-1 mob:mr-2">
                {i.status} On
              </span>{" "}
              <span>
                {`${format(new Date(i.resolvedDate), "hh:mm a")} | ${new Date(
                  i.resolvedDate
                ).toDateString()}`}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

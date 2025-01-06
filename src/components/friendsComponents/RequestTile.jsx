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
        <div className="w-[15px] h-[15px] bg-slate-200 rotate-45 absolute bottom-[45px] left-[1px] translate-x-[-50%] translate-y-[50%]"></div>

        <div className="flex group duration-500 justify-between rounded-xl p-2 pl-4 space-x-3 bg-slate-200">
          <div className="space-x-8 text-xs flex ">
            <Link to={`/profile/public/${i.userId}`}>
              <img
                src={i.profilePic || user}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
            </Link>
            <div className="flex flex-col justify-center">
              <span className="italic">Name</span>
              <span className="w-[200px] bg-slate-100 px-2 rounded-[4px] flex items-center">
                <span className="flex  text-sm overflow-clip flex-grow font-medium items-center">
                  <OnlyXChars x={20} text={i.username} />
                </span>
              </span>
            </div>

            <div className="flex flex-col w-[140px] justify-center">
              <span className="italic">User ID</span>
              <span className="flex items-center bg-slate-100 px-2 rounded-[4px] font-medium text-sm">
                <span className="font-semibold mr-2">#</span>{" "}
                <span>{i.userId}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center pr-3 space-x-2">
            <div className="flex items-center mr-4">
              {error ? (
                <div className="text-red-500 font-medium flex space-x-1 text-xs items-center">
                  <img src={exclamation} className="w-[14px] h-[14px]" alt="" />
                  <span>Failed</span>
                </div>
              ) : null}

              {loading ? (
                <div className="p-2">
                  <img
                    src={load}
                    className="flex justify-center items-center w-[25px] h-[25px]"
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
                  className="p-2 disabled:pointer-events-none disabled:opacity-50 rounded-full hover:bg-slate-100 duration-500"
                >
                  <img
                    src={tick}
                    className="w-[20px] h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
                <button
                  onClick={() => closeRequest(false)}
                  disabled={loading}
                  className="p-2 disabled:pointer-events-none disabled:opacity-50 rounded-full hover:bg-slate-100 duration-500"
                >
                  <img
                    src={cross}
                    className="w-[20px] h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </>
            ) : (
              <span
                style={{ color: stat === "accepted" ? "green" : "red" }}
                className="capitalize font-medium text-sm"
              >
                {"You " + stat}
              </span>
            )}
          </div>
        </div>

        <div className="flex mt-1 flex-grow justify-start pl-4 text-[11px] pr-4 text-neutral-500">
          <span className="w-[220px]">
            <span className="font-semibold mr-2">Sent On</span>{" "}
            <span>{`${format(new Date(i.sendDate), "hh:mm a")} | ${new Date(
              i.sendDate
            ).toDateString()}`}</span>
          </span>
          {i.resolvedDate ? (
            <span className="ml-6">
              <span className="font-semibold capitalize mr-2">
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

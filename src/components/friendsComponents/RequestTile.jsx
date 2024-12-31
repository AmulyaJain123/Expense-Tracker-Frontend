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
        <div className="w-[20px] h-[20px] bg-slate-200 rotate-45 absolute bottom-[50px] left-1 translate-x-[-50%] translate-y-[50%]"></div>

        <div className="flex group duration-500 justify-between rounded-2xl p-3 pl-4 space-x-4 bg-slate-200">
          <div className="space-x-12 flex ">
            <Link to={`/profile/public/${i.userId}`}>
              <img
                src={i.profilePic || user}
                className="w-[60px] h-[60px] rounded-full"
                alt=""
              />
            </Link>
            <div className="flex flex-col justify-center">
              <span className="italic">Name</span>
              <span className="w-[250px] bg-slate-100 px-2 rounded-md flex items-center">
                <span className="flex max-w-[300px] text-lg overflow-clip flex-grow font-medium items-center">
                  <OnlyXChars x={30} text={i.username} />
                </span>
              </span>
            </div>

            <div className="flex flex-col w-[170px] justify-center">
              <span className="italic">User ID</span>
              <span className="flex items-center bg-slate-100 px-2 rounded-md font-medium text-lg">
                <span className="font-semibold mr-2">#</span>{" "}
                <span>{i.userId}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center pr-4 space-x-2">
            <div className="flex items-center mr-4">
              {error ? (
                <div className="text-red-500 font-medium flex space-x-2 items-center">
                  <img src={exclamation} className="w-[19px] h-[19px]" alt="" />
                  <span>Failed</span>
                </div>
              ) : null}

              {loading ? (
                <div className="p-3">
                  <img
                    src={load}
                    className="flex justify-center items-center w-[30px] h-[30px]"
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
                  className="p-3 disabled:pointer-events-none disabled:opacity-50 rounded-full hover:bg-slate-100 duration-500"
                >
                  <img
                    src={tick}
                    className="w-[30px] h-[30px] flex justify-center items-center"
                    alt=""
                  />
                </button>
                <button
                  onClick={() => closeRequest(false)}
                  disabled={loading}
                  className="p-3 disabled:pointer-events-none disabled:opacity-50 rounded-full hover:bg-slate-100 duration-500"
                >
                  <img
                    src={cross}
                    className="w-[30px] h-[30px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </>
            ) : (
              <span
                style={{ color: stat === "accepted" ? "green" : "red" }}
                className="capitalize font-medium text-lg"
              >
                {"You " + stat}
              </span>
            )}
          </div>
        </div>

        <div className="flex mt-1 flex-grow justify-start pl-4 text-sm pr-4 text-neutral-500">
          <span className="w-[270px]">
            <span className="font-semibold mr-2">Sent On</span>{" "}
            <span>{`${format(new Date(i.sendDate), "hh:mm a")} | ${new Date(
              i.sendDate
            ).toDateString()}`}</span>
          </span>
          {i.resolvedDate ? (
            <span className="ml-8">
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

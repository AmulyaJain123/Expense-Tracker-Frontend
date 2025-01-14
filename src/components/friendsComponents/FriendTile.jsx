import user from "../../assets/user.png";
import remove from "../../assets/removeFriend.png";
import eye from "../../assets/eye.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import { Link } from "react-router-dom";
import exclamation from "../../assets/exclamation.png";

export default function FriendTile({ i, removeFriend }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showStage, setShowStage] = useState(0);

  async function removeClick() {
    setShowStage(0);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/removeFriend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: i.email,
            userId: i.userId,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      removeFriend(i.email, i.userId);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row group duration-500 justify-between rounded-2xl tab:rounded-full p-1 sm:space-x-3 bg-slate-200">
        <div className="space-x-2 mob:space-x-4 xl:space-x-6 flex items-center">
          <div className="flex flex-col gap-y-3 ml-1 tab:ml-0 self-start tab:self-center mt-2 tab:mt-0 items-center">
            <Link to={`/profile/public/${i.userId}`}>
              <img
                src={i.profilePic || user}
                className="w-[45px] h-[45px] mob:w-[55px] mob:h-[55px] tab:ml-2 xl:ml-0 xl:w-[45px] xl:h-[45px] rounded-full"
                alt=""
              />
            </Link>
            <Link
              className="flex smMob:hidden"
              to={`/profile/public/${i.userId}`}
            >
              <button className="h-fit m p-[6px] rounded-lg duration-500 hover:bg-slate-100">
                <img
                  src={eye}
                  className="w-[20px] h-[20px] flex justify-center items-center"
                  alt=""
                />
              </button>
            </Link>
          </div>
          <div className="flex flex-col xl:flex-row flex-wrap xl:flex-nowrap  h-[120px] smMob:h-[80px] sm:h-[120px] tab:h-[80px] gap-x-4 gap-y-2 xl:space-x-6  xl:h-auto">
            <div className="flex flex-col justify-center">
              <span className="italic text-[11px] mob:text-xs">Name</span>
              <span className="w-[140px] mob:w-[160px] xl:w-[200px] bg-slate-100 px-[6px] xl:px-2 rounded-[4px] flex items-center">
                <span className="flex  text-[11px] mob:text-xs xl:text-sm overflow-clip flex-grow font-medium items-center">
                  <OnlyXChars x={20} text={i.username} />
                </span>
              </span>
            </div>

            <div className="flex flex-col w-[115px] xl:w-[130px] justify-center">
              <span className="italic text-xs">User ID</span>
              <span className="flex bg-slate-100 px-[6px] xl:px-2 rounded-[4px] items-center font-medium text-xs xl:text-sm">
                <span className="font-semibold mr-1 sm:mr-2">#</span>{" "}
                <span>{i.userId}</span>
              </span>
            </div>

            <div className="flex flex-col w-[125px] xl:w-[150px] justify-center">
              <span className="italic text-xs">Became Friends On</span>
              <span className="flex bg-slate-100 px-[6px] xl:px-2 rounded-[4px] items-center font-medium text-xs xl:text-sm">
                {new Date(i.friendsAt).toDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end h-[35px]  sm:h-auto sm:justify-start items-center pr-1 sm:pr-2">
          {error ? (
            <div className="text-red-500 text-[11px] mob:text-xs font-medium flex space-x-[6px] mob:space-x-2 items-center">
              <img
                src={exclamation}
                className="w-[13px] h-[13px] mob:w-[14px] mob:h-[14px]"
                alt=""
              />
              <span>{error}</span>
            </div>
          ) : null}
          {loading ? (
            <div className="p-[6px] mob:p-2">
              <img
                src={load}
                className="flex justify-center items-center w-[17px] h-[17px] mob:w-[20px] mob:h-[20px]"
                alt=""
              />
            </div>
          ) : null}
          <div className=" ml-2 smTab:ml-3 ">
            {showStage === 0 ? (
              <div className="flex flex-row sm:flex-col tab:flex-row tab:items-center gap-2 duration-500  pr-1 xl:pr-2 ">
                <Link
                  className="hidden sm:flex tab:hidden xl:flex"
                  to={`/profile/public/${i.userId}`}
                >
                  <button className="h-fit m p-[6px] rounded-lg duration-500 hover:bg-slate-100">
                    <img
                      src={eye}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                </Link>
                <button
                  onClick={() => setShowStage(1)}
                  disabled={loading}
                  className="h-fit disabled:pointer-events-none disabled:opacity-50 p-[6px] rounded-lg duration-500 hover:bg-slate-100"
                >
                  <img
                    src={remove}
                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[20px] xl:h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </div>
            ) : (
              <div className="flex text-[11px] mob:text-xs items-center space-x-[6px] mob:space-x-2 xl:space-x-4 pr-1 mob:pr-2 ">
                <span className="text-nowrap ">Are You Sure?</span>
                <div className="flex space-x-1 mob:space-x-2 items-center">
                  <button
                    onClick={removeClick}
                    className="rounded-md bg-red-500 px-[6px] text-white border-[1.5px] border-red-500 duration-500 hover:text-red-500 hover:bg-white"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowStage(0)}
                    className="rounded-md bg-blue-500 px-[6px] text-white border-[1.5px] border-blue-500 duration-500 hover:text-blue-500 hover:bg-white"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

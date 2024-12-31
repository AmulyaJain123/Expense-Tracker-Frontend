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
      <div className="flex group duration-500 justify-between rounded-full p-2 space-x-4 bg-slate-200">
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

          <div className="flex flex-col w-[180px] justify-center">
            <span className="italic">User ID</span>
            <span className="flex bg-slate-100 px-2 rounded-md items-center font-medium text-lg">
              <span className="font-semibold mr-2">#</span>{" "}
              <span>{i.userId}</span>
            </span>
          </div>

          <div className="flex flex-col w-[200px] justify-center">
            <span className="italic">Became Friends On</span>
            <span className="flex bg-slate-100 px-2 rounded-md items-center font-medium text-lg">
              {new Date(i.friendsAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center pr-4">
          {error ? (
            <div className="text-red-500 font-medium flex space-x-2 items-center">
              <img src={exclamation} className="w-[19px] h-[19px]" alt="" />
              <span>{error}</span>
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
          <div className=" ml-4">
            {showStage === 0 ? (
              <div className="flex items-center  duration-500 space-x-6 pr-2 ">
                <Link to={`/profile/public/${i.userId}`}>
                  <button className="h-fit m p-2 rounded-xl duration-500 hover:bg-slate-100">
                    <img
                      src={eye}
                      className="w-[25px] h-[25px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                </Link>
                <button
                  onClick={() => setShowStage(1)}
                  disabled={loading}
                  className="h-fit disabled:pointer-events-none disabled:opacity-50 p-2 rounded-xl duration-500 hover:bg-slate-100"
                >
                  <img
                    src={remove}
                    className="w-[25px] h-[25px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 pr-2 ">
                <span>Are You Sure?</span>
                <div className="flex space-x-3 items-center">
                  <button
                    onClick={removeClick}
                    className="rounded-md bg-red-500 px-2 text-white border-2 border-red-500 duration-500 hover:text-red-500 hover:bg-white"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowStage(0)}
                    className="rounded-md bg-blue-500 px-2 text-white border-2 border-blue-500 duration-500 hover:text-blue-500 hover:bg-white"
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

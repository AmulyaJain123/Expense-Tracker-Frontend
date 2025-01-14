import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import FriendTile from "./FriendTile";
import noEntries from "../../assets/noEntries.png";
import reload from "../../assets/reload.png";

export default function Friends() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState([]);

  async function fetchFriends() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/getdetails",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      setFriends(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  function removeFriend(email, userId) {
    let newFriends = JSON.parse(JSON.stringify(friends));
    newFriends = newFriends.filter((i) => i.userId != userId);
    setFriends(newFriends);
  }

  return (
    <div className="sm:w-[450px] bg-slate-100 flex flex-col rounded-xl flex-grow">
      <div className="text-xl mob:text-2xl font-bold uppercase p-[6px] lg:p-2 py-2 lg:py-3 rounded-xl bg-white text-center">
        <span>Friends</span>
      </div>
      <div className="relative flex flex-col p-1 sm:p-3 space-y-2 rounded-xl mt-3 bg-white flex-grow">
        {/* <div className="flex justify-end"> */}
        <button
          onClick={fetchFriends}
          disabled={loading}
          className="disabled:pointer-events-none disabled:opacity-50 absolute top-[-48px] mob:top-[-52px] lg:top-[-56px] p-2 bg-white rounded-full hover:bg-slate-100 duration-500 z-[1]  right-0 translate-x-[-50%] "
        >
          <img
            src={reload}
            className="w-[15px] h-[15px] flex justify-center items-center"
            alt=""
          />
        </button>
        {/* </div> */}
        <div className="p-2 sm:p-4 py-3 sm:py-6 pt-0 sm:pt-2 flex max-tab:min-h-[500px] tab:h-[500px] overflow-auto customScrollThin flex-col space-y-[10px] sm:space-y-4  mt-2 sm:mt-3 ">
          {loading ? (
            <div className="flex justify-center items-center mt-20 ">
              <img
                src={load}
                className="w-[30px] h-[30px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center text-sm items-center mt-24 ">
              <img
                src={errorIcon}
                className="w-[40px] h-[40px] mb-4 flex justify-center items-center"
                alt=""
              />
              <span>Something went wrong.</span>
            </div>
          ) : (
            <>
              {friends.length != 0 ? (
                <>
                  {friends.map((i) => {
                    console.log(i);
                    return (
                      <>
                        <FriendTile i={i} removeFriend={removeFriend} />
                      </>
                    );
                  })}
                </>
              ) : (
                <div className="flex justify-center text-xs sm:text-sm flex-col text-slate-500 space-y-3 sm:space-y-4 items-center mt-24 sm:mt-32">
                  <img
                    src={noEntries}
                    className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex justify-center items-center"
                    alt=""
                  />
                  <span>No Friends Found</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

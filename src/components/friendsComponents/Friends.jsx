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
    <div className="w-[450px] bg-slate-100 flex flex-col rounded-xl flex-grow">
      <div className="text-3xl font-bold uppercase p-2 py-4 rounded-xl bg-white text-center">
        <span>Friends</span>
      </div>
      <div className="relative flex-grow">
        <button
          onClick={fetchFriends}
          disabled={loading}
          className="disabled:pointer-events-none disabled:opacity-50 absolute top-5 p-2 rounded-full hover:bg-slate-100 duration-500  right-2"
        >
          <img
            src={reload}
            className="w-[20px] h-[20px] flex justify-center items-center"
            alt=""
          />
        </button>
        <div className="p-6 py-10 flex h-[845px] overflow-auto customScrollThin flex-col space-y-6 rounded-xl bg-white mt-4 ">
          {loading ? (
            <div className="flex justify-center items-center mt-20 ">
              <img
                src={load}
                className="w-[40px] h-[40px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center mt-24 ">
              <img
                src={errorIcon}
                className="w-[50px] h-[50px] mb-4 flex justify-center items-center"
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
                    return <FriendTile i={i} removeFriend={removeFriend} />;
                  })}
                </>
              ) : (
                <div className="flex justify-center flex-col text-slate-500 space-y-6 items-center mt-32">
                  <img
                    src={noEntries}
                    className="w-[100px] h-[100px] flex justify-center items-center"
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

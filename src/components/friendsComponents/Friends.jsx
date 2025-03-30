import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import cross2 from "../../assets/cross2.png";
import errorIcon from "../../assets/error.png";
import FriendTile from "./FriendTile";
import noEntries from "../../assets/noEntries.png";
import reload from "../../assets/reload.png";
import { EmptyBox, ErrorBox, ErrorText } from "../../UIComponents/NoneFound";

export default function Friends() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState([]);

  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  function OpenModal(obj) {
    setError2(null);
    setLoading2(false);
    setShowModal(obj);
  }

  async function removeClick() {
    setError2(null);
    setLoading2(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/removeFriend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: showModal.email,
            userId: showModal.userId,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      removeFriend(showModal.email, showModal.userId);
      setShowModal(false);
      setLoading2(false);
    } catch (err) {
      console.log(err);
      setError2("Failed");
      setLoading2(false);
    }
  }

  return (
    <div
      style={{ height: "calc( 100%  )" }}
      className="sm:w-[450px] bg-slate-100 flex overflow-clip flex-col h-full rounded-lg flex-grow"
    >
      <div className="text-xl mob:text-2xl font-bold uppercase p-[6px] lg:p-2 py-1 lg:py-2 rounded-lg bg-white text-center">
        <span>Friends</span>
      </div>
      <div
        style={{ height: "calc( 100% - 50px )" }}
        className="relative flex flex-col   p-1 sm:p-2 px-2 sm:px-3 space-y-2  rounded-lg mt-2 bg-white  "
      >
        <button
          onClick={fetchFriends}
          disabled={loading}
          className="disabled:pointer-events-none disabled:opacity-50 absolute top-[-40px] mob:top-[-44px] lg:top-[-48px] p-2 bg-white rounded-full hover:bg-slate-100 duration-500 z-[1]  right-0 translate-x-[-50%] "
        >
          <img
            src={reload}
            className="w-[15px] h-[15px] flex justify-center items-center"
            alt=""
          />
        </button>
        {showModal ? (
          <div className="w-full h-full absolute top-0 left-0 backdrop-blur rounded-lg flex justify-center items-center">
            <div className="bg-white relative shadow-md rounded-lg p-4 flex flex-col items-center">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-1 right-1"
              >
                <img src={cross2} className="w-[20px] h-[20px]" alt="" />
              </button>
              <span className="text-sm font-semibold ">Remove Friend?</span>
              <span className="text-xs text-center my-2 max-w-[250px]">
                Do you really want to remove{" "}
                <span className="font-medium">{`@${showModal.username}`}</span>{" "}
                from your friends list?
              </span>
              <div className="flex h-[40px] items-center gap-x-4">
                {loading2 ? (
                  <div className="">
                    <img src={load} className="w-[20px] h-[20px]" alt="" />
                  </div>
                ) : error2 ? (
                  <ErrorText textSize={12} gap={6} msg={error2} />
                ) : (
                  <>
                    <button
                      onClick={() => setShowModal(false)}
                      className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                    >
                      <img src={cross} className="w-[16px] h-[16px]" alt="" />
                    </button>
                    <button
                      onClick={() => removeClick()}
                      className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                    >
                      <img src={tick} className="w-[16px] h-[16px]" alt="" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
        <div
          style={{ height: "calc( 100% - 20px )" }}
          className="px-2 py-0 flex  overflow-auto specialScrollLight flex-col space-y-[10px] sm:space-y-4  my-2 sm:my-3 "
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
              {friends.length != 0 ? (
                <>
                  {friends.map((i) => {
                    console.log(i);
                    return (
                      <>
                        <FriendTile i={i} setShowModal={OpenModal} />
                      </>
                    );
                  })}
                </>
              ) : (
                <EmptyBox
                  textColor="#cbd5e1"
                  IconSize={60}
                  gap={12}
                  textSize={15}
                  msg="No Friends Found"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

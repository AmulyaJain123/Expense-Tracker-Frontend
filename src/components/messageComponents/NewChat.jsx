import searchIcon from "../../assets/search.png";
import load from "../../assets/loader.gif";
import back from "../../assets/continue.png";
import user from "../../assets/user.png";
import errorIcon2 from "../../assets/error2.png";
import selectedIcon from "../../assets/tick2.png";
import cross2 from "../../assets/cross2.png";
import error3 from "../../assets/error3.png";
import noEntries from "../../assets/noEntries.png";
import newChatIcon from "../../assets/chat.png";
import people from "../../assets/people.png";
import { useSelector, useDispatch } from "react-redux";
import { messagesActions } from "../../store/main";

import { useEffect, useState } from "react";

export default function NewChat() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [friends, setFriends] = useState(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const chats = useSelector((state) => state.messages.chats);

  function goBack() {
    dispatch(messagesActions.setSidebarScreen(1));
  }

  async function continueClick() {
    setLoading2(true);
    setError2(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/message/newchat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: selected,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const data = await res.json();
      dispatch(messagesActions.unshiftChats(data));
      dispatch(messagesActions.setSelectedChat(data.chatId));
      goBack();
      setLoading2(false);
    } catch (err) {
      console.log(err);
      setLoading2(false);
      setError2(true);
    }
  }

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
      const finalRes = result.filter(
        (i) =>
          !chats.some(
            (j) =>
              !j.groupChat && j.members.some((k) => k.user.userId === i.userId)
          )
      );
      setFriends(finalRes);
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

  console.log(friends);

  return (
    <>
      <div className="flex flex-col relative flex-grow gap-y-2">
        <div className="flex p-[6px] px-2 items-center rounded-lg gap-x-2 bg-white">
          <button
            onClick={goBack}
            className="p-1 rounded-md bg-slate-100 duration-700"
          >
            <img src={cross2} className="w-[20px] h-[20px]" alt="" />
          </button>
          <div className="pb-1 flex-grow flex">
            <div className="flex-grow  border-b-[1.5px] border-slate-400">
              <input
                type="text"
                onChange={(event) => setQuery(event.target.value)}
                className="text-slate-600 p-[2px] focus:outline-none pl-[6px] bg-inherit text-xs"
                placeholder="Find Friends"
              />
            </div>
          </div>
        </div>

        <div
          style={{ height: "calc( 100% - 50px)" }}
          className="flex rounded-lg relative bg-white p-2 py-4"
        >
          {error ? (
            <div className="flex flex-grow flex-col gap-y-2 text-sm text-slate-300 items-center justify-center">
              <img src={error3} className="w-[40px] h-[40px]" alt="" />
              <span>Something Went Wrong</span>
            </div>
          ) : loading ? (
            <div className="flex flex-grow flex-col gap-y-2  items-center justify-center">
              <img src={load} className="w-[40px] h-[40px]" alt="" />
            </div>
          ) : friends != null && friends.length === 0 ? (
            <div className="flex flex-col text-sm text-slate-300 gap-y-2 flex-grow justify-center items-center">
              <img src={noEntries} className="w-[40px] h-[40px]" alt="" />
              <span>No Friends Found</span>
            </div>
          ) : (
            <div
              style={{ height: "calc( 100%  )" }}
              className="flex-grow flex flex-col overflow-auto specialScrollLight px-2 gap-y-2"
            >
              {friends != null &&
                friends.map((friend) => {
                  if (
                    friend.username
                      .toLowerCase()
                      .trim()
                      .includes(query.toLowerCase().trim()) ||
                    friend.fullname
                      .toLowerCase()
                      .trim()
                      .includes(query.toLowerCase().trim())
                  ) {
                    return (
                      <>
                        <button
                          onClick={() =>
                            setSelected((preval) =>
                              preval === null ? friend.userId : null
                            )
                          }
                          style={{
                            backgroundColor:
                              selected === friend.userId
                                ? "#e9d5ff"
                                : "#f1f5f9",
                          }}
                          disabled={selected && selected != friend.userId}
                          className="rounded-lg relative disabled:pointer-events-none disabled:opacity-50 bg-slate-100 hover:shadow-md transition-shadow p-[6px] gap-x-2 flex"
                        >
                          <img
                            src={friend.profilePic || user}
                            className="w-[30px] h-[30px] rounded-full"
                            alt=""
                          />
                          <div className="flex flex-col items-start text-xs ">
                            <span>{friend.fullname}</span>
                            <span className="text-[10px] text-slate-500">
                              {"@" + friend.username}
                            </span>
                          </div>
                        </button>
                      </>
                    );
                  }
                })}
            </div>
          )}

          {selected ? (
            <button
              onClick={continueClick}
              className="absolute bottom-4 hover:scale-110 duration-700 right-4 p-[6px] rounded-lg shadow-lg bg-[#DC93F6]"
            >
              <img src={back} className="w-[20px] h-[20px] " alt="" />
            </button>
          ) : null}
        </div>

        {error2 ? (
          <div
            style={{ width: "calc( 100% - 14px )" }}
            className="absolute bg-red-300 font-medium shadow flex gap-1 px-1 pl-2 p-[2px] items-center justify-between rounded-md text-xs bottom-2 right-[50%] translate-x-[50%] "
          >
            <div className="gap-x-1 flex">
              <img src={errorIcon2} className="w-[15px] h-[15px]" alt="" />
              <span>Something Went Wrong</span>
            </div>

            <button onClick={() => setError2(null)}>
              <img src={cross2} className="w-[20px] h-[20px]" alt="" />
            </button>
          </div>
        ) : null}

        {loading2 ? (
          <div className="backdrop-blur rounded-lg absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <div className="p-1  rounded-full">
              <img src={load} className="w-[40px] h-[40px]" alt="" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

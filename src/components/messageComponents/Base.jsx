import searchIcon from "../../assets/search.png";
import noEntries from "../../assets/noEntries.png";
import newChatIcon from "../../assets/chat.png";
import user from "../../assets/user.png";
import cross2 from "../../assets/cross2.png";

import { useSelector, useDispatch } from "react-redux";
import { messagesActions } from "../../store/main";
import { formatDistanceToNowStrict } from "date-fns";

import { useState } from "react";

const SHORT_UNITS = {
  second: "s",
  seconds: "s",
  minute: "m",
  minutes: "m",
  hour: "h",
  hours: "h",
  day: "d",
  days: "d",
  month: "mo",
  months: "mo",
  year: "y",
  years: "y",
};

export default function Base() {
  const chats = useSelector((state) => state.messages.chats);
  const userInfo = useSelector((state) => state.universal.userInfo);
  const selectedChat = useSelector((state) => state.messages.selectedChat);
  const messages = useSelector((state) => state.messages.messages);

  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  console.log(chats, messages);

  function addNewChat() {
    dispatch(messagesActions.setSidebarScreen(2));
  }

  function selectChat(chat) {
    dispatch(messagesActions.setSelectedChat(chat.chatId));
  }

  function calcLastActivity(time) {
    const ans = formatDistanceToNowStrict(new Date(time), { addSuffix: false });
    return ans.replace(
      /\b(\d+)\s(second|seconds|minute|minutes|hour|hours|day|days|month|months|year|years)\b/g,
      (_, num, unit) => `${num}${SHORT_UNITS[unit]}`
    );
  }

  return (
    <>
      <div className="flex flex-col flex-grow gap-y-2">
        <div className="flex p-[6px] px-2 items-center rounded-lg gap-x-2 bg-white">
          <img src={searchIcon} className="w-[20px] h-[20px]" alt="" />
          <div className="pb-1 flex-grow flex ">
            <div className="flex-grow flex pt-[3px] pb-[1px] border-b-[1.5px] border-slate-400">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="text-slate-600 p-[2px] flex-grow focus:outline-none pl-[6px] bg-inherit text-xs"
                placeholder="Search"
              />
              {query != "" ? (
                <button className="ml-auto" onClick={() => setQuery("")}>
                  <img src={cross2} className="w-[18px] h-[18px]" alt="" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div
          style={{ height: "calc( 100% - 47px)" }}
          className="flex rounded-lg bg-white p-2 py-4 "
        >
          {chats != null && chats.length === 0 ? (
            <div className="flex flex-col text-sm text-slate-300 gap-y-2 flex-grow justify-center items-center">
              <img src={noEntries} className="w-[40px] h-[40px]" alt="" />
              <span>No Chats Found</span>
            </div>
          ) : (
            <div
              style={{ height: "calc( 100%  )" }}
              className="flex-grow flex flex-col overflow-auto specialScrollLight p-2 gap-y-2 py-0"
            >
              {chats != null &&
                chats.map((chat) => {
                  if (chat.groupChat === false) {
                    const reqUser = chat.members.find(
                      (mem) => (mem = mem.user.userId != userInfo.userId)
                    );
                    if (
                      reqUser.user.username
                        .toLowerCase()
                        .trim()
                        .includes(query.toLowerCase().trim()) ||
                      reqUser.user.fullname
                        .toLowerCase()
                        .trim()
                        .includes(query.toLowerCase().trim())
                    ) {
                      return (
                        <>
                          <button
                            onClick={() => selectChat(chat)}
                            style={{
                              backgroundColor:
                                selectedChat === chat.chatId
                                  ? "#e9d5ff"
                                  : "#f1f5f9",
                            }}
                            className="rounded-lg relative disabled:pointer-events-none hover:shadow-md transition-shadow items-center p-[6px] gap-x-2 flex justify-between"
                          >
                            <div className="flex gap-x-2">
                              <img
                                src={reqUser.user.profilePic || user}
                                className="w-[30px] h-[30px] rounded-full"
                                alt=""
                              />
                              <div className="flex flex-col items-start text-xs ">
                                <span>{reqUser.user.fullname}</span>
                                <span className="text-[10px] text-slate-500">
                                  {"@" + reqUser.user.username}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center pr-1 gap-x-2">
                              {chat.chatHistory.length > 0 ? (
                                <span className="text-[11px] flex text-neutral-500 items-center">
                                  {!messages[chat.chatId] ? (
                                    calcLastActivity(
                                      chat.chatHistory.at(-1).msgDate ||
                                        new Date().toUTCString()
                                    )
                                  ) : (
                                    <div className="w-[20px] h-[20px] bg-[#7fffd4] rounded-full flex justify-center items-center pt-[2px] text-[11px] font-medium">
                                      {messages[chat.chatId]}
                                    </div>
                                  )}
                                </span>
                              ) : null}
                            </div>
                          </button>
                        </>
                      );
                    }
                  }
                })}
            </div>
          )}
        </div>

        <button
          onClick={addNewChat}
          className="absolute bottom-4 hover:scale-110 duration-700 right-4 p-[6px] rounded-full shadow-lg bg-[#DC93F6]"
        >
          <img src={newChatIcon} className="w-[25px] h-[25px]" alt="" />
        </button>
      </div>
    </>
  );
}

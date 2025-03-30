import { useSelector, useDispatch } from "react-redux";
import { messagesActions, realtimeActions } from "../../store/main";
import userIcon from "../../assets/user.png";
import sendIcon from "../../assets/extras/send-bold.png";
import blockedIcon from "../../assets/extras/block.png";
import emojiIcon from "../../assets/happy.gif";
import cancel from "../../assets/cancel.png";
import load from "../../assets/loader.gif";
import menu from "../../assets/extras/menu.png";
import deleteIcon from "../../assets/extras/delete.png";
import cross2 from "../../assets/cross2.png";
import right from "../../assets/right.png";
import { v4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import { createConnection } from "../../util/socket";
import Message from "./Message";
import { useForm } from "react-hook-form";
import { format, formatDistanceToNowStrict } from "date-fns";
import Menu from "./Menu";
import { EmptyBox } from "../../UIComponents/NoneFound";
import MsgInfoModal from "./MsgInfoModal";
import EmojiPicker, { Emoji } from "emoji-picker-react";

export default function ChatScreen() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.messages.chats);
  const bottomRef = useRef(null);
  const unreadHeadingRef = useRef(null);
  const screenRef = useRef(null);
  const textRef = useRef(null);
  const selectedChatId = useSelector((state) => state.messages.selectedChat);
  const currMessages = useSelector((state) => state.messages.currMessages);
  const newMessages = useSelector((state) => state.messages.messages);
  const [selectedChat, setSelectedChat] = useState(
    chats.find((i) => i.chatId === selectedChatId)
  );
  const [paginatedMessages, setPaginatedMessages] = useState(
    Math.max(
      selectedChat.chatHistory.length -
        (isNaN(newMessages[selectedChatId]) ? 0 : newMessages[selectedChatId]) -
        50,
      0
    )
  );

  const userInfo = useSelector((state) => state.universal.userInfo);
  const [scroll, setScroll] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [scrollToHeader, setScrollToHeader] = useState(true);
  const [unreadHeading, setUnreadHeading] = useState(
    newMessages[selectedChatId]
      ? selectedChat.chatHistory.at(-newMessages[selectedChatId])?.msgId
      : null
  );
  const [newMissedMessages, setNewMissedMessages] = useState(0);
  const [openMsgInfo, setOpenMsgInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { register, handleSubmit, setValue, getValues } = useForm();

  const chatImage = !selectedChat.groupChat
    ? selectedChat.members.find((i) => i.user.userId != userInfo.userId).user
        .profilePic || userIcon
    : null;

  const userDetails = !selectedChat.groupChat
    ? selectedChat.members.find((i) => i.user.userId != userInfo.userId).user
    : null;

  console.log(
    selectedChat.members.find((i) => i.user.userId != userInfo.userId)
  );

  useEffect(() => {
    setSelectedChat(chats.find((i) => i.chatId === selectedChatId));
  }, [chats, selectedChatId]);

  useEffect(() => {
    console.log(selectedChat);
    if (
      selectedChat.chatHistory.at(-1)?.sender.details.userId !=
        userInfo.userId &&
      !selectedChat.chatHistory
        .at(-1)
        ?.seen.some((i) => i.user.userId === userInfo.userId) &&
      selectedChat.members.some(
        (i) => i.user.userId === userInfo.userId && i.blocked === false
      )
    ) {
      const socket = createConnection();
      socket.emit("message-seen", { chatId: selectedChat.chatId });
    }
  }, [selectedChat]);

  function submitHandle(data) {
    console.log(data);

    if (data.msg.trim() != "") {
      sendMsg(data.msg.trim());
      setValue("msg", "");
    }
  }
  console.log(unreadHeading);

  useEffect(() => {
    if (scroll && (!unreadHeading || !scrollToHeader)) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (scroll && unreadHeading && scrollToHeader) {
      const container = screenRef.current;
      const heading = unreadHeadingRef.current;
      if (container && heading) {
        console.log(container, heading);
        const targetPosition = heading.offsetTop - container.offsetTop;
        console.log(targetPosition - 50);
        container.scrollTo({
          top: targetPosition - 50,
          behavior: "smooth",
        });
      }
      setScrollToHeader(false);
    }
  }, [selectedChat, scroll]);

  useEffect(() => {
    const selectedChat = chats.find((i) => i.chatId === selectedChatId);
    if (newMessages[selectedChatId]) {
      setUnreadHeading(
        selectedChat.chatHistory.at(-newMessages[selectedChatId])?.msgId
      );
      dispatch(messagesActions.removeMessage(selectedChatId));
    }

    setPaginatedMessages(
      Math.max(
        selectedChat.chatHistory.length -
          (isNaN(newMessages[selectedChatId])
            ? 0
            : newMessages[selectedChatId]) -
          50,
        0
      )
    );
    setMenuOpen(false);
    setOpenMsgInfo(null);
    setScroll(true);
    setOpenEmoji(false);

    return () => {
      setUnreadHeading(null);
      dispatch(messagesActions.removeCurrMessages());
    };
  }, [selectedChatId]);

  useEffect(() => {
    console.log(currMessages);
    if (scroll && currMessages > 0) {
      dispatch(messagesActions.removeCurrMessages());
      setNewMissedMessages(0);
    } else {
      setNewMissedMessages(currMessages);
    }
  }, [currMessages, scroll]);

  function sendMsg(msg) {
    const id = v4();
    const message = {
      message: msg,
      msgType: "msg-text",
      sender: {
        userType: "user",
        details: {
          username: userInfo.username,
          userId: userInfo.userId,
          profilePic: userInfo.profilePic,
        },
      },
      seen: [],
      deleted: [],
      msgDate: null,
      msgId: id,
    };
    dispatch(
      messagesActions.addMessageInChat({
        chatId: selectedChat.chatId,
        message: message,
      })
    );
    const socket = createConnection();
    socket.emit(
      "send-msg",
      { chatId: selectedChat.chatId, msgId: id, msg: msg },
      (val) => {
        if (val === false) {
          dispatch(
            messagesActions.msgSentUnsuccessfully({
              chatId: selectedChat.chatId,
              msgId: id,
            })
          );
        } else {
          dispatch(
            messagesActions.msgSentSuccessfully({
              chatId: selectedChat.chatId,
              msgId: id,
              time: val,
            })
          );
        }
      }
    );
    setUnreadHeading(null);
    setScroll(true);
  }

  function goBack() {
    dispatch(messagesActions.setSelectedChat(null));
  }

  function screenScroll(event) {
    const div = event.target;
    const { scrollTop, scrollHeight, clientHeight } = div;
    // console.log(scrollTop, scrollHeight, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  function loadMoreMessages() {
    const container = screenRef.current;
    const distanceFromBottom = container.scrollHeight - container.scrollTop;
    setPaginatedMessages((p) => {
      if (p < 50) {
        return 0;
      } else {
        return p - 50;
      }
    });
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight - distanceFromBottom;
    });
  }
  console.log(paginatedMessages);

  function unblockChat() {
    const socket = createConnection();
    setLoading(true);
    socket.emit("unblock-chat", { chatId: selectedChat.chatId }, (val) => {
      setLoading(false);
      if (val) {
        if (val.count > 0) {
          setUnreadHeading(val.chat.chatHistory.at(-val.count)?.msgId);
          dispatch(messagesActions.removeMessage(val.chat.chatId));
        }
        dispatch(messagesActions.overwriteChat(val.chat));
      } else {
        setError("Something Went Wrong");
      }
    });
  }

  function deleteChat() {
    setLoading(true);
    const socket = createConnection();
    socket.emit(
      "delete-chat",
      { userId: userInfo.userId, chatId: selectedChat.chatId },
      (val) => {
        setLoading(false);
        if (val) {
          dispatch(messagesActions.removeChat(selectedChat.chatId));
          dispatch(messagesActions.setSelectedChat(null));
        } else {
          setError("Something Went Wrong");
        }
      }
    );
  }

  function emojiClick(event) {
    console.log(event);
    setValue("msg", getValues("msg") + event.emoji);
    setOpenEmoji(false);
  }

  return (
    <>
      <div className="flex flex-col flex-grow gap-y-2">
        <div className="flex p-[6px] px-2 justify-between items-center rounded-lg gap-x-2 bg-white">
          <div className="flex gap-x-2">
            <img
              src={chatImage}
              className="w-[30px] h-[30px] rounded-full"
              alt=""
            />
            {!selectedChat.groupChat ? (
              <div className="flex flex-col text-xs">
                <span>{userDetails.fullname}</span>
                <span className="text-[10px] text-slate-500">
                  {"@" + userDetails.username}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex gap-x-2">
            {selectedChat.members.find((i) => i.user.userId === userInfo.userId)
              .blocked === false ? (
              <>
                <button
                  onClick={() => setMenuOpen((p) => !p)}
                  className="p-[4px] hover:scale-110 duration-700 hover:shadow-md rounded-md hover:bg-[#dc93f6]"
                >
                  <img src={menu} className="w-[20px] h-[20px]" alt="" />
                </button>
              </>
            ) : null}

            <button
              onClick={goBack}
              className="p-1 rounded-md bg-slate-100 duration-700"
            >
              <img src={cross2} className="w-[20px] h-[20px]" alt="" />
            </button>
          </div>
        </div>

        <div
          style={{
            height: "calc( 100% - 53px)",
          }}
          className="flex rounded-lg flex-col bg-white gap-y-2 p-2 py-2"
        >
          {selectedChat.members.find((i) => i.user.userId === userInfo.userId)
            .blocked === false ? (
            <>
              <div
                style={{
                  height: "calc( 100% - 42px )",
                  maxWidth: "calc( 100% )",
                }}
                className="w-full relative h-full"
              >
                {openEmoji ? (
                  <div className="absolute bottom-0 scale-75 origin-bottom-left overflow-clip z-[2]  left-0 ">
                    <EmojiPicker
                      className="emoji-pick"
                      emojiStyle="native"
                      onEmojiClick={(event) => emojiClick(event)}
                      searchDisabled={true}
                      height={350}
                      skinTonesDisabled={true}
                    />
                  </div>
                ) : null}
                {newMissedMessages ? (
                  <button
                    onClick={() => setScroll(true)}
                    className="absolute hover:scale-105 duration-700 bottom-0 text-black z-[1] left-0 text-xs"
                  >
                    <span className="flex gap-x-2 p-[6px] pr-[10px] rounded-lg bg-[#7fffd4]">
                      <div className=" ">
                        <img
                          src={right}
                          className="w-[16px] h-[16px] rotate-90"
                          alt=""
                        />
                      </div>
                      <span>
                        {newMissedMessages} New{" "}
                        {newMissedMessages > 1 ? "Messages" : "Message"}
                      </span>
                    </span>
                  </button>
                ) : null}
                {menuOpen ? (
                  <Menu chat={selectedChat} setMenuOpen={setMenuOpen} />
                ) : null}
                {openMsgInfo ? (
                  <MsgInfoModal
                    openMsgInfo={openMsgInfo}
                    setOpenMsgInfo={setOpenMsgInfo}
                  />
                ) : null}
                <div
                  style={{
                    height: "calc( 100% )",
                    maxWidth: "calc( 100% )",
                  }}
                  ref={screenRef}
                  onScroll={(event) => screenScroll(event)}
                  className="flex group flex-col overflow-auto p-2 chatScroll bg-inherit "
                >
                  {paginatedMessages != 0 ? (
                    <span className="flex justify-center pb-4">
                      <button
                        onClick={loadMoreMessages}
                        className="text-[11px]  border-b border-black hover:border-blue-500 hover:text-blue-500"
                      >
                        Load More Messages
                      </button>
                    </span>
                  ) : null}
                  {selectedChat.chatHistory
                    .slice(paginatedMessages)
                    .map((his, ind) => {
                      // console.log(ind, paginatedMessages);
                      let msgDate = his.msgDate
                        ? new Date(his.msgDate)
                        : new Date();
                      msgDate = format(msgDate, "EEE, dd MMM yyyy");
                      let prevMsgDate =
                        (paginatedMessages > 0 || ind > 0) &&
                        selectedChat.chatHistory[ind - 1 + paginatedMessages]
                          .msgDate
                          ? new Date(
                              selectedChat.chatHistory[
                                ind - 1 + paginatedMessages
                              ].msgDate
                            )
                          : new Date();
                      prevMsgDate = format(prevMsgDate, "EEE, dd MMM yyyy");
                      return (
                        <>
                          {ind === 0 || msgDate != prevMsgDate ? (
                            <span className="text-[11px] sticky z-[1] top-0 flex justify-center">
                              <span className="bg-white flex rounded-md w-[110px] p-[2px]">
                                <span className="rounded-md  bg-purple-200 w-full py-[2px] font-medium text-center ">
                                  {msgDate}
                                </span>
                              </span>
                            </span>
                          ) : null}
                          {his.msgId === unreadHeading ? (
                            <span
                              ref={unreadHeadingRef}
                              className="text-xs flex py-2 items-center"
                            >
                              <div className="flex flex-grow flex-col">
                                <div className="border-b-[0.5px] border-slate-200"></div>
                                <div className="border-t-[0.5px] border-slate-200"></div>
                              </div>

                              <div className="px-3 text-slate-400 font-medium">
                                Unread Messages
                              </div>

                              <div className="flex flex-grow flex-col">
                                <div className="border-b-[0.5px] border-slate-200"></div>
                                <div className="border-t-[0.5px] border-slate-200"></div>
                              </div>
                            </span>
                          ) : null}

                          <Message
                            msg={his}
                            chat={selectedChat}
                            setOpenMsgInfo={setOpenMsgInfo}
                          />
                        </>
                      );
                    })}
                  <div className="" ref={bottomRef}></div>
                </div>
              </div>

              <div className="flex h-[36px] rounded-lg  ">
                <button
                  onClick={() => setOpenEmoji((p) => !p)}
                  className="flex items-center p-[6px] px-[4px] rounded-md bg-slate-100 hover:shadow-md disabled:pointer-events-none  disabled:opacity-50 duration-700 mr-[6px] "
                >
                  <img src={emojiIcon} className="w-[28px] h-[28px]" alt="" />
                </button>
                <form
                  onSubmit={handleSubmit(submitHandle)}
                  className="flex flex-grow"
                >
                  <input
                    type="text"
                    className="bg-slate-100 focus:outline-none rounded-md mr-[6px] text-xs px-2 pl-3 flex-grow"
                    placeholder="Type Your Message"
                    autoComplete="off"
                    {...register("msg")}
                  />
                  <button
                    type="submit"
                    className="flex items-center hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 duration-700 bg-[#dc93f6] justify-center p-[6px]  rounded-md"
                  >
                    <img src={sendIcon} className="w-[20px] h-[20px]" alt="" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col items-center">
                <img src={blockedIcon} className="w-[80px] h-[80px]" alt="" />
                <span className="text-sm mt-3 font-medium capitalize">
                  Chat Blocked by you
                </span>
                <span className="text-xs ">
                  Unblock the chat to view and send messages
                </span>
                <div className="h-[40px] mt-6 justify-center flex items-center">
                  {loading ? (
                    <img src={load} className="w-[25px] h-[25px]" alt="" />
                  ) : (
                    <div className="flex space-x-4">
                      <button
                        onClick={unblockChat}
                        className="p-1 rounded-md px-2 hover:scale-110 hover:shadow-md duration-700 text-xs font-semibold  bg-[#DC93F6] border-[1.5px] border-[#DC93F6] "
                      >
                        Unblock
                      </button>
                      <button
                        onClick={() => deleteChat()}
                        className="p-[4px] hover:scale-110 duration-700 text-xs font-semibold px-2 hover:shadow-md rounded-md bg-[#dc93f6]"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="h-[20px] flex items-center">
                  {error ? (
                    <div className="text-xs  text-red-500 capitalize font-medium">
                      {error}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

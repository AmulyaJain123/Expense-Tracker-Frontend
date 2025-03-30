import { useDispatch, useSelector } from "react-redux";
import cross2 from "../../assets/cross2.png";
import deleteIcon from "../../assets/extras/delete.png";
import clear from "../../assets/extras/clear.png";
import exportIcon from "../../assets/extras/download.png";
import block from "../../assets/extras/block.png";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import user from "../../assets/user.png";

import { format } from "date-fns";
import { useState } from "react";
import { createConnection } from "../../util/socket";
import { messagesActions } from "../../store/main";

export default function Menu({ chat, setMenuOpen }) {
  const userInfo = useSelector((state) => state.universal.userInfo);
  const [confirmModal, setConfirmModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  function actionClick(action) {
    if (action === "download") {
      handleDownload();
    } else {
      setConfirmModal(action);
    }
  }

  function handleDownload() {
    let content = "";
    chat.chatHistory.forEach((i) => {
      content += `@${i.sender.details.username}  ${i.msgDate}  ${i.message}\n`;
    });
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Chat${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  function confirmClick(action) {
    setLoading(true);
    if (action === "delete") {
      const socket = createConnection();
      socket.emit(
        "delete-chat",
        { userId: userInfo.userId, chatId: chat.chatId },
        (val) => {
          setLoading(false);
          if (val) {
            dispatch(messagesActions.removeChat(chat.chatId));
            dispatch(messagesActions.setSelectedChat(null));
          } else {
            setError("Something Went Wrong");
          }
        }
      );
    } else if (action === "clear") {
      const socket = createConnection();
      socket.emit("clear-chat", { chatId: chat.chatId }, (val) => {
        setLoading(false);
        if (val) {
          dispatch(messagesActions.clearChat(chat.chatId));
          setMenuOpen(false);
        } else {
          setError("Something Went Wrong");
        }
      });
    } else if (action === "block") {
      const socket = createConnection();
      socket.emit("block-chat", { chatId: chat.chatId }, (val) => {
        setLoading(false);
        if (val) {
          dispatch(
            messagesActions.blockChat({
              chatId: chat.chatId,
              userId: userInfo.userId,
            })
          );
          setMenuOpen(false);
        } else {
          setError("Something Went Wrong");
        }
      });
    }
  }

  if (!chat.groupChat) {
    const chatImage =
      chat.members.find((i) => i.user.userId != userInfo.userId).user
        .profilePic || user;
    const userDetails = chat.members.find(
      (i) => i.user.userId != userInfo.userId
    ).user;
    let lastActivity = null;
    for (let i = chat.chatHistory.length - 1; i > -1; --i) {
      if (chat.chatHistory[i].msgDate) {
        lastActivity = chat.chatHistory[i].msgDate;
        break;
      }
    }
    console.log(chat);

    return (
      <>
        <div
          style={{
            height: "calc( 100% )",
            width: "calc( 70% + 50px)",
          }}
          className="bg-neutral-100 max-w-[350px]  shadow-md p-2 py-3 rounded-lg flex absolute top-0 z-[2] right-0"
        >
          {confirmModal ? (
            <div className="w-full h-full z-[3] backdrop-blur absolute rounded-lg top-0 left-0 flex justify-center items-center">
              <div className="bg-white relative shadow w-[160px] rounded-lg p-3 flex justify-center items-center flex-col">
                <span className="text-xs">
                  {confirmModal === "delete" ? (
                    <span className="flex font-medium mt-2 gap-x-[6px]">
                      Delete Chat?
                    </span>
                  ) : confirmModal === "clear" ? (
                    <span className="flex font-medium mt-2 gap-x-[6px]">
                      Clear Chat?
                    </span>
                  ) : confirmModal === "block" ? (
                    <span className="flex font-medium mt-2 gap-x-[6px]">
                      Block Chat?
                    </span>
                  ) : null}
                </span>
                <div className="flex gap-x-3 h-[24px] mt-2">
                  {error ? (
                    <span className="flex items-center text-[10px] font-medium text-red-500">
                      {error}
                    </span>
                  ) : loading ? (
                    <div className="flex items-center">
                      <img src={load} className="w-[16px] h-[16px]" alt="" />
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setConfirmModal(null)}
                        className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                      >
                        <img src={cross} className="w-[16px] h-[16px]" alt="" />
                      </button>
                      <button
                        onClick={() => confirmClick(confirmModal)}
                        className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                      >
                        <img src={tick} className="w-[16px] h-[16px]" alt="" />
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setConfirmModal(null)}
                  className="absolute top-1 right-1"
                >
                  <img src={cross2} className="w-[20px] h-[20px]" alt="" />
                </button>
              </div>
            </div>
          ) : null}
          <div className="flex flex-grow flex-col p-2 pb-[50px] py-0 overflow-auto specialScrollStone">
            <div className="flex flex-col items-center pt-4">
              <img
                src={chatImage}
                className="w-[120px] h-[120px] rounded-full"
                alt=""
              />
              <div className="flex flex-col items-center mt-4 ">
                <span>{userDetails.fullname}</span>
                <span className="text-xs text-stone-500">{`@${userDetails.username}`}</span>
              </div>
            </div>
            <div className="flex flex-col items-center mt-6">
              <span className="font-semibold w-full text-sm text-center border-y-[1px] border-neutral-300 ">
                ACTIONS
              </span>
              <div className="gap-x-3 flex mt-4 justify-center">
                <button
                  onClick={() => actionClick("delete")}
                  className="p-[6px] hover:scale-110 duration-700 hover:shadow-md rounded-md bg-purple-200"
                >
                  <img src={deleteIcon} className="w-[20px] h-[20px]" alt="" />
                </button>
                <button
                  onClick={() => actionClick("clear")}
                  className="p-[6px] hover:scale-110 duration-700 hover:shadow-md rounded-md bg-purple-200"
                >
                  <img src={clear} className="w-[20px] h-[20px]" alt="" />
                </button>
                <button
                  onClick={() => actionClick("block")}
                  className="p-[6px] hover:scale-110 duration-700 hover:shadow-md rounded-md bg-purple-200"
                >
                  <img src={block} className="w-[20px] h-[20px]" alt="" />
                </button>
                <button
                  onClick={() => actionClick("download")}
                  className="p-[6px] hover:scale-110 duration-700 hover:shadow-md rounded-md bg-purple-200"
                >
                  <img src={exportIcon} className="w-[20px] h-[20px]" alt="" />
                </button>
              </div>
            </div>
            <div className="flex flex-col   items-center mt-6">
              <span className="font-semibold w-full text-sm text-center border-y-[1px] border-neutral-300">
                MEMBERS
              </span>
              <div className="gap-y-2 flex flex-col  mt-4 items-center">
                {chat.members.map((i) => {
                  console.log(i);
                  return (
                    <div className="rounded-lg relative min-w-[250px] bg-white justify-center  flex-col flex items-between">
                      <div className="flex p-[6px] pb-1 gap-x-2">
                        <img
                          src={i.user.profilePic || user}
                          className="w-[30px] h-[30px] rounded-full"
                          alt=""
                        />
                        <div className="flex flex-col items-start text-[11px] ">
                          <span>{i.user.fullname}</span>
                          <span className="text-[10px] text-slate-500">
                            {"@" + i.user.username}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col p-[2px] pr-2 border-t-neutral-100 border-t-[1.5px] text-[10px] text-right items-end justify-center ">
                        {format(new Date(i.joinedOn), "dd MMM yyyy")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col   items-center mt-6">
              <span className="font-semibold w-full text-sm text-center border-y-[1px] border-neutral-300">
                INFO
              </span>
              <div className="gap-y-2 flex flex-col  mt-4 items-center">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium uppercase">
                    Created On
                  </span>
                  <span className="text-stone-500 text-[11px]">
                    {format(new Date(chat.createdOn), "dd MMM yyyy")}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium uppercase">
                    Last Activity
                  </span>
                  <span className="text-stone-500 text-[11px]">
                    {lastActivity
                      ? format(new Date(lastActivity), "HH:mm | dd MMM yyyy")
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute  top-0  left-0 ">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-[30px] h-[30px] flex items-center justify-center  rounded-lg"
            >
              <img
                src={cross2}
                className="w-[20px] h-[20px] flex items-center justify-center"
                alt=""
              />
            </button>
          </div>
        </div>
      </>
    );
  }
}

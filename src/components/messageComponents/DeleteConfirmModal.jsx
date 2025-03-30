import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import triangle from "../../assets/extras/msgTri.png";
import { useEffect, useState } from "react";
import { messagesActions } from "../../store/main";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import { createConnection } from "../../util/socket";

export default function DeleteConfirmModal({
  msg,
  setDeleteConfirm,
  chat,
  align,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  function confirmClick() {
    setLoading(true);
    const socket = createConnection();
    socket.emit(
      "delete-msg",
      { msgId: msg.msgId, chatId: chat.chatId },
      (val) => {
        setLoading(false);
        if (val) {
          dispatch(
            messagesActions.removeMsg({
              msgId: msg.msgId,
              chatId: chat.chatId,
            })
          );
          setDeleteConfirm(null);
        } else {
          setError("Something Went Wrong");
        }
      }
    );
  }
  return (
    <>
      <div className="w-full h-full z-[3] backdrop-blur absolute rounded-lg top-0 left-0 flex justify-center items-center">
        <div className="bg-white shadow w-[300px] rounded-lg p-3 flex justify-center items-center flex-col">
          {align === "r" ? (
            <div className="flex w-full justify-end bg-white border-[1.5px] border-slate-100 rounded-lg">
              <div className="h-[70px]">
                <div className="w-full flex bg-white pr-4 pt-3 h-[70px] overflow-clip p-2 rounded-lg justify-end">
                  <div className="px-3 py-1  origin-top-right scale-90 h-fit relative rounded-md rounded-tr-none flex flex-col text-[11px] bg-slate-100">
                    <span className="flex justify-end">{msg.message}</span>

                    <div className="absolute right-[4px] top-[-1px] translate-x-[100%] rotate-90 ">
                      <img
                        src={triangle}
                        className="w-[13px] h-[13px] "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-start bg-white border-[1.5px] border-slate-100 rounded-lg">
              <div className="h-[70px]">
                <div className="w-full flex bg-white pl-4 pt-3 h-[70px] overflow-clip p-2 rounded-lg justify-start">
                  <div className="px-3 py-1  origin-top-left scale-90 h-fit relative rounded-md rounded-tl-none flex flex-col text-[11px] bg-slate-100">
                    <span className="flex justify-start">{msg.message}</span>

                    <div className="absolute left-[4px] top-[-1px] translate-x-[-100%] rotate-180 ">
                      <img
                        src={triangle}
                        className="w-[13px] h-[13px] "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <span className="text-xs">
            <span className="flex font-medium mt-2 gap-x-[6px]">
              Delete Message?
            </span>
          </span>
          <div className="flex gap-x-4 h-[24px]  mt-2">
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
                  onClick={() => setDeleteConfirm(null)}
                  className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                >
                  <img src={cross} className="w-[16px] h-[16px]" alt="" />
                </button>
                <button
                  onClick={() => confirmClick()}
                  className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                >
                  <img src={tick} className="w-[16px] h-[16px]" alt="" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

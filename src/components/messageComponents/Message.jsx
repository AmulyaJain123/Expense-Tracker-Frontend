import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import triangle from "../../assets/extras/msgTri.png";
import { useEffect, useState } from "react";
import { messagesActions } from "../../store/main";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function Message({ msg, chat, setOpenMsgInfo }) {
  const userInfo = useSelector((state) => state.universal.userInfo);
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // console.log(deleteConfirm);

  if (msg.sender.details.userId === userInfo.userId) {
    return (
      <>
        {deleteConfirm ? (
          <DeleteConfirmModal
            msg={msg}
            chat={chat}
            align={"r"}
            setDeleteConfirm={setDeleteConfirm}
          />
        ) : null}
        <div className="flex p-[6px]  justify-end">
          <div className="px-3 py-1  max-w-[50%] relative rounded-md rounded-tr-none flex flex-col text-xs bg-slate-100">
            <span className="flex justify-end">{msg.message}</span>
            <span className="flex justify-end mt-[2px] text-slate-400 text-[10px] ">
              <span>
                {msg.msgDate != null
                  ? format(new Date(msg.msgDate), "HH:mm")
                  : null}
              </span>
              <span className="ml-[6px] flex items-center">
                {msg.msgDate === null ? (
                  <i className="fi fi-rr-clock-three "></i>
                ) : msg.msgDate === false ? (
                  <i className="fi fi-br-cross text-red-500"></i>
                ) : msg.seen.length === chat.members.length - 1 ? (
                  <i className="fi fi-br-check-double text-blue-500"></i>
                ) : (
                  <i className="fi fi-br-check-double "></i>
                )}
              </span>
            </span>
            <div className="absolute right-[4px] top-[-1px] translate-x-[100%] rotate-90 ">
              <img src={triangle} className="w-[13px] h-[13px] " alt="" />
            </div>
            <div className="absolute h-full top-0 left-0 translate-x-[-100%] opacity-0 hover:opacity-100">
              <div className="flex  gap-x-2 px-2 py-[2px]">
                <button onClick={() => setDeleteConfirm(true)}>
                  <i className="fi fi-bs-trash text-sm"></i>
                </button>
                <button onClick={() => setOpenMsgInfo(msg)}>
                  <i className="fi fi-sr-comment-info text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (msg.sender.details.userId != userInfo.userId) {
    return (
      <>
        {deleteConfirm ? (
          <DeleteConfirmModal
            msg={msg}
            align={"l"}
            chat={chat}
            setDeleteConfirm={setDeleteConfirm}
          />
        ) : null}
        <div className="flex p-[6px] justify-start">
          <div className="px-3 py-1 max-w-[50%] relative rounded-md rounded-tl-none flex flex-col text-xs bg-slate-100">
            <span className="flex justify-start">{msg.message}</span>
            <span className="flex justify-start mt-[2px] text-slate-400 text-[10px] ">
              <span>
                {msg.msgDate != null
                  ? format(new Date(msg.msgDate), "HH:mm")
                  : null}
              </span>
            </span>
            <div className="absolute left-[4px] top-[-1px] translate-x-[-100%] rotate-[180deg] ">
              <img src={triangle} className="w-[13px] h-[13px] " alt="" />
            </div>
            <div className="absolute h-full top-0 right-0 translate-x-[100%] opacity-0 hover:opacity-100">
              <div className="flex  gap-x-2 px-2 py-[2px]">
                <button onClick={() => setDeleteConfirm(true)}>
                  <i className="fi fi-bs-trash text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

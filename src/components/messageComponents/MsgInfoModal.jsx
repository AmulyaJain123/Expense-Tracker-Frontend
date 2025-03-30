import triangle from "../../assets/extras/msgTri.png";
import cross2 from "../../assets/cross2.png";
import user from "../../assets/user.png";
import { format, formatDistanceToNowStrict } from "date-fns";
import { EmptyBox } from "../../UIComponents/NoneFound";

export default function MsgInfoModal({ openMsgInfo, setOpenMsgInfo }) {
  console.log(openMsgInfo);
  return (
    <>
      <div
        style={{
          height: "calc( 100% )",
          width: "calc( 70% + 50px)",
        }}
        className="bg-neutral-100 max-w-[300px] shadow-md p-2 rounded-lg flex absolute top-0 z-[2] right-0"
      >
        <div className=" flex-grow flex flex-col">
          <div className="h-[70px]">
            <div className="w-full flex bg-white pr-4 pt-3 h-[70px] overflow-clip p-2 rounded-lg justify-end">
              <div className="px-3 py-1  origin-top-right scale-90 h-fit relative rounded-md rounded-tr-none flex flex-col text-[11px] bg-slate-100">
                <span className="flex justify-end">{openMsgInfo.message}</span>

                <div className="absolute right-[4px] top-[-1px] translate-x-[100%] rotate-90 ">
                  <img src={triangle} className="w-[13px] h-[13px] " alt="" />
                </div>
              </div>
            </div>
          </div>
          <span className="flex py-1 text-xs px-1 mt-2 justify-between">
            <span>Seen By</span>
            <span>
              <i className="fi fi-br-check-double text-blue-500"></i>
            </span>
          </span>
          <div
            style={{
              height: "calc( 100% - 104px)",
            }}
            className="flex flex-col w-full mt-2 px-2 overflow-auto gap-y-2 specialScrollStone "
          >
            {openMsgInfo.seen.length > 0 ? (
              openMsgInfo.seen.map((i) => {
                return (
                  <>
                    <div className="rounded-lg relative bg-white items-center p-[6px] gap-x-2 flex justify-between">
                      <div className="flex gap-x-2">
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
                      <div className="flex flex-col text-[10px] text-right items-end justify-center pr-1 gap-x-2">
                        <span className="text-right text-slate-500">
                          {formatDistanceToNowStrict(new Date(i.seenOn), {
                            addSuffix: false,
                          })}
                        </span>
                        <span className="text-[10px] text-right ">
                          {format(new Date(i.seenOn), "HH:mm | dd MMM yyyy")}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="flex flex-grow justify-center items-center">
                <EmptyBox
                  IconSize={40}
                  textSize={14}
                  gap={8}
                  msg={"No User Found"}
                  textColor={"#d4d4d4"}
                />
              </div>
            )}
          </div>
        </div>
        <div className="absolute  top-0  left-0 ">
          <button
            onClick={() => setOpenMsgInfo(null)}
            className="w-[30px] h-[30px] flex items-center justify-center bg-neutral-100 rounded-lg"
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

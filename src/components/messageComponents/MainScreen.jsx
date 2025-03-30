import { useSelector, useDispatch } from "react-redux";
import { messagesActions } from "../../store/main";
import ChatScreen from "./ChatScreen";

{
  /* <i className="fi fi-rr-clock-three "></i>
) : msg.msgDate === false ? (
  <i className="fi fi-br-cross text-red-500"></i>
) : msg.seen.length === chat.members.length - 1 ? (
  <i className="fi fi-br-check-double text-blue-500"></i>
) : (
  <i className="fi fi-br-check-double "></i> */
}

export default function MainScreen() {
  const selectedChat = useSelector((state) => state.messages.selectedChat);
  return (
    <>
      <div
        style={{ width: "calc( 100% - 290px )" }}
        className="flex relative p-2 bg-slate-100 rounded-xl flex-grow"
      >
        {selectedChat ? (
          <ChatScreen />
        ) : (
          <div className="flex flex-grow overflow-clip flex-col text-sm p-4 text-stone-500">
            <h1 className="font-bold text-3xl mt-3 text-center">Messages</h1>
            <p className=" text-center mt-2">
              Use Messages to chat with Friends, create Groups, add Members and
              connect in Realtime.
            </p>
            <div className="flex flex-grow flex-col mt-8 ">
              <h2 className="font-semibold text-center">
                Enjoy following features with Messages
              </h2>
              <div
                style={{ maxHeight: "calc( 100% - 120px )" }}
                className="flex flex-wrap justify-center items-start h-fit overflow-auto specialScrollStone gap-3 px-2 text-[13px] mt-4"
              >
                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    3 Message States
                  </span>
                  <div className="text-xs flex  flex-grow justify-center mt-2">
                    <div className="flex flex-col items-center justify-center h-fit  gap-y-1 ">
                      <span className="inline-flex items-center">
                        <span>Loading</span>{" "}
                        <i className="fi fi-rr-clock-three ml-1 text-black inline-flex items-center"></i>
                      </span>{" "}
                      <span className="inline-flex items-center">
                        <span>Send</span>{" "}
                        <i className="fi fi-br-check-double ml-1 text-black inline-flex items-center"></i>
                      </span>{" "}
                      <span className="inline-flex items-center">
                        <span>Seen</span>{" "}
                        <i className="fi fi-br-check-double text-blue-500 ml-1 inline-flex items-center"></i>
                      </span>{" "}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Realtime Updates
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start ">
                        Get realtime updates for every message and chat.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    User Experience
                  </span>
                  <div className="text-xs flex flex-grow justify-center mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start ">
                        Refined and Clean UI for smooth UX.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Message Info
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start ">
                        View who has seen your messages and when.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Emoji Support 🤩
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start">
                        Integrated Emoji Picker for expressing yourself better.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Pagination
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start">
                        Paginated message history improves performance and UX.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Delete Messages
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start">
                        Delete messages from your chat.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Chat Actions
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start">
                        Chat Actions like Clear, Delete, Export & Block for
                        better control.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Block Chat
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start">
                        Stop recieving messages from a chat.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center p-2 px-4 w-[160px] h-[110px] bg-white rounded-lg">
                  <span className="text-sm text-center text-[#9f21e3]  font-medium">
                    Export Chat
                  </span>
                  <div className="text-xs flex flex-grow justify-center  mt-[6px]">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 ">
                      <p className=" text-start">
                        Download full Chat as a .txt file in just a click.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

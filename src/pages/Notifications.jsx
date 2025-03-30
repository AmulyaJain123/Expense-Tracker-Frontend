import { Helmet } from "react-helmet-async";
import NotificationBox from "../components/notificationComponents/NotificationBox";
import friendsIcon from "../assets/sideNavImages/friends-solid.png";
import splitIcon from "../assets/sideNavImages/split-solid.png";
import loginIcon from "../assets/logIn.png";
import { useState } from "react";

const template = {
  friends: [
    "New Friend Request Recieved",
    "Removed From Friends",
    "Friend Request Accepted",
    "Friend Request Rejected",
  ],
  splits: ["SPLIT Shared"],
  login: ["Sign In Attempt Detected"],
};

export default function Notifications() {
  const [selected, setSelected] = useState("friends");

  return (
    <>
      <Helmet>
        <title>Notifications | BILLBUD</title>
        <meta name="description" content="Notifications" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <div className="max-w-[1060px]  flex-grow flex  h-full  mx-auto">
          <div className="flex gap-x-3 w-full h-full p-3">
            <div className="flex h-full w-[435px] bg-slate-100 p-2 rounded-xl">
              <NotificationBox />
            </div>
            <div className="flex flex-grow bg-slate-100 rounded-xl p-2">
              <div className="bg-white flex-col p-3 flex-grow rounded-lg">
                <div className="flex py-2 pt-0 px-1 gap-x-4 overflow-x-auto border-b-[1.5px] border-neutral-400 specialScrollLight">
                  <button
                    onClick={() => setSelected("friends")}
                    style={{
                      backgroundColor:
                        selected == "friends" ? "#dc93f6" : "#f1f5f9",
                    }}
                    className="w-[38px] h-[38px]  group rounded-md flex justify-center items-center"
                  >
                    <img
                      src={friendsIcon}
                      className="w-[22px] group-hover:scale-110 duration-700 h-[22px]"
                      alt=""
                    />
                  </button>
                  <button
                    onClick={() => setSelected("splits")}
                    style={{
                      backgroundColor:
                        selected == "splits" ? "#dc93f6" : "#f1f5f9",
                    }}
                    className="w-[38px] h-[38px] group rounded-md flex justify-center items-center"
                  >
                    <img
                      src={splitIcon}
                      className="w-[22px] group-hover:scale-110 duration-700 h-[22px]"
                      alt=""
                    />
                  </button>
                  <button
                    onClick={() => setSelected("login")}
                    style={{
                      backgroundColor:
                        selected == "login" ? "#dc93f6" : "#f1f5f9",
                    }}
                    className="w-[38px] h-[38px] group rounded-md flex justify-center items-center"
                  >
                    <img
                      src={loginIcon}
                      className="w-[22px] group-hover:scale-110 duration-700 h-[22px]"
                      alt=""
                    />
                  </button>
                </div>
                <div
                  style={{ height: "calc( 100% - 65px )" }}
                  className="mt-4 text-sm overflow-auto specialScrollStone pr-3 flex flex-col gap-y-2"
                >
                  {template[selected].map((i, ind) => {
                    return (
                      <>
                        <div className="flex gap-x-2 font-medium">
                          <div className="bg-stone-100 flex items-center justify-center rounded-md w-[30px] h-[30px]">
                            {ind + 1}
                          </div>
                          <div className="bg-stone-100 items-center pl-3 rounded-md flex flex-grow h-[30px]">
                            {i}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

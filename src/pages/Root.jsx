import { Outlet } from "react-router-dom";
import { styling } from "../util/styling";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  universalActions,
  realtimeActions,
  messagesActions,
} from "../store/main";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Root.module.css";
import load from "../assets/loader.gif";
import notificationSound from "../assets/sounds/notification.wav";
import messageSound from "../assets/sounds/message.mp3";

import { createConnection } from "../util/socket";

export default function Root() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.universal.userInfo);
  const [userFetch, setUserFetch] = useState(true);
  const socketConnected = useSelector(
    (state) => state.realtime.socketConnected
  );

  function playSound(sound) {
    new Audio(sound).play();
  }

  useEffect(() => {
    const socket = createConnection();
    if (!socketConnected) {
      socket.connect();
    }
    socket.on("connect", () => {
      socket.emit("test", "Hello Connect Formed ");
      console.log(socket.id);
      dispatch(realtimeActions.setSocketConnected(true));
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      dispatch(realtimeActions.setSocketConnected(false));
    });

    socket.on("new-notification", (notification) => {
      console.log(notification);
      playSound(notificationSound);
      dispatch(realtimeActions.pushNotification(notification));
    });

    socket.on("new-chat-message", (chat) => {
      console.log(chat);
      playSound(messageSound);
      dispatch(messagesActions.unshiftChats(chat));
      dispatch(messagesActions.addMessage({ chatId: chat.chatId, no: 1 }));
    });

    socket.on("new-message", ({ chatId, msg }) => {
      playSound(messageSound);
      dispatch(messagesActions.addMessageInChat({ chatId, message: msg }));
      dispatch(messagesActions.addMessage({ chatId, no: 1 }));
    });

    socket.on("message-seen", (chat) => {
      console.log(chat);
      dispatch(messagesActions.overwriteChat(chat));
    });

    socket.on("socket-activity", (val) => {
      dispatch(realtimeActions.setSocketActive(val));
      dispatch(messagesActions.clearMessageFeature());
      if (!val) {
        socket.removeAllListeners([
          "new-chat-message",
          "new-message",
          "message-seen",
        ]);
      }
    });

    console.log("Hello", socket.listeners);

    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/auth/getdetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: new Date().toDateString(),
              now: Date.now(),
              offset: new Date().getTimezoneOffset() * 60 * 1000,
            }),
            credentials: "include",
          }
        );
        if (res.ok) {
          const result = await res.json();
          console.log(result);
          if (result == "notfound") {
            throw "notfound";
          }
          console.log(result);
          dispatch(universalActions.setUserInfo(result[0]));
          dispatch(realtimeActions.setNotifications(result[1]));
          dispatch(messagesActions.setMessages(result[2]));
          setUserFetch(false);
        } else {
          throw "error";
        }
      } catch (err) {
        console.log(err);
        setUserFetch(false);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <>
      <>
        {userFetch ? (
          <>
            <div className="flex h-screen  justify-center items-center">
              <img
                src={load}
                className="w-[50px] h-[50px] flex justify-center items-center"
                alt=""
              />
            </div>
          </>
        ) : (
          <div
            style={{ backgroundColor: styling.backColor }}
            className="flex h-screen relative max-w-screen overflow-auto"
          >
            {navigate.state === "loading" ? (
              <div className="w-[100vw] h-[30px] z-[100] uppercase absolute flex top-0 left-0 justify-center text-sm font-semibold items-center bg-[#dc93f6]">
                Loading
              </div>
            ) : null}
            <SideNav />
            <div
              style={{ marginLeft: `${styling.spacing}px` }}
              className="flex w-full flex-col mr-[8px] lg:mr-[0px]"
            >
              <TopNav />
              <div className={`${styles.main}`}>
                <Outlet />
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

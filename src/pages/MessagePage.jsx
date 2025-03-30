import { Helmet } from "react-helmet-async";
import FullScreen from "../components/messageComponents/FullScreen";
import { useState, useEffect } from "react";
import loadingIcon from "../assets/loader.gif";
import errorIcon from "../assets/extras/fail.png";
import { useDispatch, useSelector } from "react-redux";
import { messagesActions } from "../store/main";
import { createConnection } from "../util/socket";
import Messages from "./Messages";

export default function MessagePage() {
  const [socket, setSocket] = useState(createConnection());
  const socketActive = useSelector((state) => state.realtime.socketActive);
  const socketConnected = useSelector(
    (state) => state.realtime.socketConnected
  );

  return (
    <>
      <Helmet>
        <title>Messages | BILLBUD</title>
        <meta name="description" content="Notifications" />
      </Helmet>
      <div className="h-full relative w-full flex bg-white overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        {!socketConnected ? (
          <div className="w-full h-full backdrop-blur flex justify-center items-center absolute top-0 left-0">
            <div className="flex flex-col items-center">
              <i className="fi fi-bs-signal-stream-slash text-[50px]"></i>
              <span className="text-sm font-medium">Socket Disconnected</span>
              <span className="text-xs text-center mt-2 capitalize">
                Realtime Connection between you and server was disconnected !{" "}
                <br />
                Check your Internet Connection and Reload page
              </span>
            </div>
          </div>
        ) : socketActive ? (
          <Messages />
        ) : (
          <div className="w-full h-full backdrop-blur flex justify-center items-center absolute top-0 left-0">
            <div className="flex flex-col items-center">
              <i className="fi fi-ss-plug-connection text-[50px]"></i>
              <span className="text-sm font-medium">
                Socket Activity Detected
              </span>
              <span className="text-xs text-center mt-2 ">
                Seems like the Application is open elsewhere. Some features are
                available only on one Socket Connection. <br />
                Reload page to use all features here.
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

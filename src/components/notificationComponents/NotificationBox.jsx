import { useEffect, useRef, useState } from "react";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import errorIcon from "../../assets/error.png";
// import FriendTile from "./FriendTile";
import cross2 from "../../assets/cross2.png";
import noEntries from "../../assets/noEntries.png";
import reload from "../../assets/reload.png";
import FriendsNotification from "./FriendsNotification";
import { useSelector, useDispatch } from "react-redux";
import { realtimeActions } from "../../store/main";
import { createConnection } from "../../util/socket";
import { EmptyBox, ErrorBox } from "../../UIComponents/NoneFound";
import errorIcon2 from "../../assets/error2-red.png";

export default function NotificationBox() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const contentRef = useRef();
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const [newNotifications, setNewNotifications] = useState([]);
  const recentNotifications = useSelector(
    (state) => state.realtime.notifications
  );
  const [liveLoad, setLiveLoad] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(false);

  async function fetchNotifications() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/notifications/getAllNotifications",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      setNotifications(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    if (!liveLoad) {
      setLiveLoad(true);
    }
    if (recentNotifications.length != 0) {
      setNewNotifications((preval) => {
        return [...recentNotifications, ...preval];
      });
      if (liveLoad) {
        setNotifications((preval) => {
          return [...[...recentNotifications].reverse(), ...preval];
        });
      }
      dispatch(realtimeActions.removeNotifications());
    }
    if (recentNotifications.length != 0) {
      const socket = createConnection();
      socket.emit("read-notifications", true);
    }
  }, [recentNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  function removeNotification(id) {
    setNewNotifications((preval) => preval.filter((i) => i._id != id));
    setNotifications((preval) => preval.filter((i) => i._id != id));
  }

  async function delNotification(notification) {
    setLoading2(true);
    const socket = createConnection();
    socket.emit("delete-notification", { id: notification._id }, (val) => {
      setLoading2(false);
      if (val) {
        removeNotification(notification._id);
        setOpenModal(false);
      } else {
        setError2("Something Went Wrong");
      }
    });
  }

  function openDelModal(notification) {
    setLoading2(false);
    setError2(null);
    setOpenModal(notification);
  }

  return (
    <div className="flex flex-col flex-grow ">
      <div className="p-2 text-3xl text-center font-extrabold bg-white rounded-lg">
        Notifications
      </div>
      <div
        style={{ height: "calc( 100% - 70px )" }}
        className="bg-white mt-2 relative flex-grow rounded-lg p-2 py-3 "
      >
        {openModal ? (
          <div className="w-full z-[3] rounded-lg h-full absolute top-0 left-0 backdrop-blur flex justify-center items-center">
            <div className="bg-white relative rounded-lg flex flex-col shadow-md p-4 px-8 justify-center">
              <button onClick={() => setOpenModal(false)}>
                <img
                  src={cross2}
                  className="w-[20px] h-[20px] absolute top-1 right-1"
                  alt=""
                />
              </button>
              <div className="h-[120px] w-[290px] overflow-clip">
                <div className="scale-75  origin-top-left">
                  <FriendsNotification
                    notification={openModal}
                    onlyDisplay={true}
                    newStatus={false}
                    setOpenModal={() => {}}
                  />
                </div>
              </div>
              <span className="text-center mt-1 font-medium text-sm">
                Delete Notification?
              </span>
              <div className="h-[24px] mt-2 flex justify-center gap-x-4">
                {error2 ? (
                  <span className="flex items-center gap-x-1 text-xs font-medium text-red-500">
                    <img
                      src={errorIcon2}
                      className="w-[15px] h-[15px]"
                      alt=""
                    />
                    <span>{error2}</span>
                  </span>
                ) : loading2 ? (
                  <div className="flex items-center">
                    <img src={load} className="w-[16px] h-[16px]" alt="" />
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                    >
                      <img src={cross} className="w-[16px] h-[16px]" alt="" />
                    </button>
                    <button
                      onClick={() => delNotification(openModal)}
                      className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                    >
                      <img src={tick} className="w-[16px] h-[16px]" alt="" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
        <div
          style={{ height: "100%" }}
          ref={contentRef}
          className="overflow-auto flex flex-wrap justify-center overflow-x-hidden gap-3 specialScrollLight p-2 py-0"
        >
          {loading ? (
            <div className="flex justify-center items-center flex-grow ">
              <img
                src={load}
                className="w-[40px] h-[40px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : error ? (
            <ErrorBox IconSize={55} textSize={15} gap={10} fontWeight={500} />
          ) : (
            <>
              {notifications.length != 0 ? (
                <div className="flex flex-col justify-center gap-3 h-fit">
                  {notifications.map((i, ind) => {
                    const status = ind + 1 <= newNotifications.length;

                    return (
                      <FriendsNotification
                        notification={i}
                        newStatus={status}
                        setOpenModal={openDelModal}
                        removeNotification={removeNotification}
                      />
                    );
                  })}
                  {Array(
                    Math.floor(contentRef.current.clientWidth / 250) -
                      (notifications.length %
                        Math.floor(contentRef.current.clientWidth / 250) ||
                        Math.floor(contentRef.current.clientWidth / 250))
                  )
                    .fill(0)
                    .map((i, ind) => {
                      return (
                        <div className="w-[235px] h-[150px] bg-slate-50   rounded-lg "></div>
                      );
                    })}
                </div>
              ) : (
                <EmptyBox
                  textColor={"#cbd5e1"}
                  textSize={16}
                  fontWeight={500}
                  gap={16}
                  IconSize={60}
                  msg={"No Notifications Found"}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

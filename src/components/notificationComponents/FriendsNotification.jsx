import { format } from "date-fns";
import friendsIcon from "../../assets/sideNavImages/friends-solid.png";
import splitIcon from "../../assets/sideNavImages/split-solid.png";
import logoutIcon from "../../assets/login.png";
import userIcon from "../../assets/user.png";
import { Link } from "react-router-dom";
import cross2 from "../../assets/cross2.png";
import { useState } from "react";

export default function FriendsNotification({
  notification,
  newStatus,
  setOpenModal,
  onlyDisplay = false,
}) {
  return (
    <>
      <div className="rounded-lg relative bg-slate-200 p-2 flex flex-col w-[380px] h-[130px]">
        <div className="flex   gap-x-2">
          {[
            "friendRequestRecieved",
            "friendRemoved",
            "friendRequestAccepted",
            "friendRequestRejected",
          ].includes(notification.topic) ? (
            <Link to={"/friends"}>
              <div className="w-[38px] h-[38px]  bg-[#dc93f6] group rounded-md flex justify-center items-center">
                <img
                  src={friendsIcon}
                  className="w-[22px] group-hover:scale-110 duration-700 h-[22px]"
                  alt=""
                />
              </div>
            </Link>
          ) : ["splitShared"].includes(notification.topic) ? (
            <Link to={"/split/protected/view/shared"}>
              <div className="w-[38px] h-[38px]  bg-[#dc93f6] group rounded-md flex justify-center items-center">
                <img
                  src={splitIcon}
                  className="w-[22px] group-hover:scale-110 duration-700 h-[22px]"
                  alt=""
                />
              </div>
            </Link>
          ) : ["loginActivityDetected"].includes(notification.topic) ? (
            <div>
              <div className="w-[38px] h-[38px]  bg-[#dc93f6] group rounded-md flex justify-center items-center">
                <img
                  src={logoutIcon}
                  className="w-[22px] group-hover:scale-110 duration-700 h-[22px]"
                  alt=""
                />
              </div>
            </div>
          ) : null}

          <span className="font-semibold text-sm text-[#000]">
            {notification.topic === "friendRequestRecieved"
              ? "New Friend Request Recieved"
              : notification.topic === "friendRemoved"
              ? "Removed From Friends"
              : notification.topic === "friendRequestAccepted"
              ? "Friend Request Accepted"
              : notification.topic === "friendRequestRejected"
              ? "Friend Request Rejected"
              : notification.topic === "splitShared"
              ? "SPLIT Shared"
              : notification.topic === "loginActivityDetected"
              ? "Sign In Attempt Detected"
              : null}
          </span>
        </div>
        <div className="flex flex-grow my-2 text-xs rounded-md ">
          <div>
            {notification.topic === "friendRequestRecieved" ? (
              <>
                <span className=" font-semibold">{`@${notification.data.username}`}</span>{" "}
                <span>
                  sent you a friend request. Go to Friends to accept or deny.
                </span>
              </>
            ) : notification.topic === "friendRemoved" ? (
              <>
                <span className=" font-semibold">{`@${notification.data.username}`}</span>{" "}
                <span>removed you from his friends list.</span>
              </>
            ) : notification.topic === "friendRequestAccepted" ? (
              <>
                <span className=" font-semibold">{`@${notification.data.username}`}</span>{" "}
                <span>just accepted your friend request.</span>
              </>
            ) : notification.topic === "friendRequestRejected" ? (
              <>
                <span className=" font-semibold">{`@${notification.data.username}`}</span>{" "}
                <span>rejected your friend request.</span>
              </>
            ) : notification.topic === "splitShared" ? (
              <>
                <span className=" font-semibold">{`@${notification.data.username}`}</span>{" "}
                <span>shared a new SPLIT with you titled as</span>{" "}
                <span className=" font-semibold">{`${notification.data.splitName}`}</span>
              </>
            ) : notification.topic === "loginActivityDetected" ? (
              <>
                <span>A Login Attempt with your email was made at </span>{" "}
                <span className=" font-semibold">{`${notification.data.timestamp}`}</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex  text-[11px] items-center pr-1 justify-between">
          {newStatus ? (
            <div className="p-1 px-[6px] rounded-md font-semibold text-[9px] bg-[#7fffd4] ">
              NEW
            </div>
          ) : (
            <button onClick={() => !onlyDisplay && setOpenModal(notification)}>
              <img src={cross2} className="w-[20px] h-[20px]" alt="" />{" "}
            </button>
          )}
          <span>
            {format(
              new Date(notification.recieveDate),
              "hh:mm a | EEE, dd MMM yyyy"
            )}
          </span>
        </div>
      </div>
    </>
  );
}

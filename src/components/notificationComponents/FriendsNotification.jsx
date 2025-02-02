import { format } from "date-fns";
import friendsIcon from "../../assets/sideNavImages/friends-solid.png";
import userIcon from "../../assets/user.png";
import { Link } from "react-router-dom";

export default function FriendsNotification({ notification, newStatus }) {
  return (
    <div className="flex flex-col">
      <div className="flex relative gap-x-3 bg-slate-200 rounded-xl justify-between p-2">
        {newStatus ? (
          <div className="p-1 rounded-md font-semibold text-[9px] bg-[#7fffd4] z-[20] absolute -right-[6px] -top-2">
            NEW
          </div>
        ) : null}
        <div className="flex space-x-8 ">
          <Link to={"/friends"}>
            <div className="p-2 bg-slate-100 group rounded-xl flex justify-center items-center">
              <img
                src={friendsIcon}
                className="w-[25px] group-hover:scale-110 duration-700 h-[25px]"
                alt=""
              />
            </div>
          </Link>
          <div className="flex gap-x-3">
            {/* <div className="font-semibold flex mr-4 items-center">
              {notification.topic === "friendRequestRecieved"
                ? "Friend Request Recieved"
                : notification.topic === "friendRemoved"
                ? "Removed From Friends"
                : notification.topic === "friendRequestAccepted"
                ? "Friend Request Accepted"
                : notification.topic === "friendRequestRejected"
                ? "Friend Request Rejected"
                : null}
            </div> */}
            <div className="flex  bg-white rounded-md pr-2">
              <div className="p-[6px] flex justify-center items-center">
                <img
                  src={notification.data.profilePic || userIcon}
                  className="w-[22px] h-[22px] rounded-full"
                  alt=""
                />
              </div>
              <div className="flex text-[10px] flex-col justify-center">
                <span>{notification.data.username}</span>
                <span>{notification.data.userId}</span>
              </div>
            </div>
            <div className="font-medium text-sm flex items-center">
              {notification.topic === "friendRequestRecieved"
                ? "Sent you a Friend Request."
                : notification.topic === "friendRemoved"
                ? "Removed you from his Friends List."
                : notification.topic === "friendRequestAccepted"
                ? "Accepted your Friend Request."
                : notification.topic === "friendRequestRejected"
                ? "Rejected your Friend Request."
                : null}
            </div>
          </div>
        </div>
      </div>
      <span className="text-[11px] pr-2 mt-[2px] ml-auto">
        {format(
          new Date(notification.recieveDate),
          "hh:mm a | EEE MMM dd yyyy"
        )}
      </span>
    </div>
  );
}

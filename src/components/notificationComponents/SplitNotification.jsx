import { format } from "date-fns";
import splitIcon from "../../assets/sideNavImages/split-solid.png";
import userIcon from "../../assets/user.png";
import { Link } from "react-router-dom";

export default function SplitNotification({ notification, newStatus }) {
  return (
    <div className="flex flex-col">
      <div className="flex relative gap-x-3 bg-slate-200 rounded-xl justify-between p-2">
        {newStatus ? (
          <div className="p-1 rounded-md font-semibold text-[9px] bg-[#7fffd4] z-[20] absolute -right-[6px] -top-2">
            NEW
          </div>
        ) : null}
        <div className="flex space-x-8 ">
          <Link to={"/split/protected/view/shared"}>
            <div className="p-2 bg-slate-100 group rounded-xl flex justify-center items-center">
              <img
                src={splitIcon}
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
              Shared a SPLIT
            </div>
            <div className="flex h-fit my-auto flex-col bg-white min-w-[80px] rounded-[4px]">
              <div className="splitBox flex-[1] rounded-t-[4px] min-h-[12px]"></div>
              <div className="flex-[2] flex justify-center py-1 items-center font-medium px-2 text-[10px]">
                {notification.data.splitName}
              </div>
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

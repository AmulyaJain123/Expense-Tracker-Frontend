import user from "../../assets/user.png";
import remove from "../../assets/extras/delete.png";
import eye from "../../assets/eye.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import { Link } from "react-router-dom";
import exclamation from "../../assets/exclamation.png";
import { format } from "date-fns";

export default function FriendTile({ i, setShowModal }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row group duration-500 justify-between rounded-md tab:rounded-lg p-[6px] sm:space-x-3 bg-slate-200">
        <div className="space-x-2 mob:space-x-4 xl:space-x-6 flex items-center">
          <div className="flex flex-col gap-y-3 ml-1 tab:ml-0 self-start tab:self-center mt-2 tab:mt-0 items-center">
            <Link to={`/profile/public/${i.userId}`}>
              <img
                src={i.profilePic || user}
                className="w-[45px] h-[45px] mob:w-[55px] mob:h-[55px] tab:ml-2 xl:ml-0 xl:w-[45px] xl:h-[45px] rounded-full"
                alt=""
              />
            </Link>
            <Link
              className="flex smMob:hidden"
              to={`/profile/public/${i.userId}`}
            >
              <button className="h-fit m p-[6px] rounded-lg duration-500 hover:bg-slate-100">
                <img
                  src={eye}
                  className="w-[20px] h-[20px] flex justify-center items-center"
                  alt=""
                />
              </button>
            </Link>
          </div>
          <div className="flex flex-col xl:flex-row flex-wrap xl:flex-nowrap  h-[120px] smMob:h-[80px] sm:h-[120px] tab:h-[80px] gap-x-4 gap-y-2 xl:space-x-6  xl:h-auto">
            <div className="flex flex-col justify-center">
              <span className="text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                Full Name
              </span>
              <span className="w-[140px] italic mob:w-[160px] xl:w-[200px]  px-[6px] xl:px-[6px] rounded-[4px] flex items-center">
                <span className="flex font-['Open Sans'] text-[11px] mob:text-xs xl:text-[13px] overflow-clip flex-grow font-medium items-center">
                  <OnlyXChars x={20} text={i.fullname} />
                </span>
              </span>
            </div>

            <div className="flex flex-col w-[165px] xl:w-[180px] justify-center">
              <span className=" text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                Username
              </span>
              <span className="flex italic px-[6px] xl:px-[6px] rounded-[4px] items-center font-medium text-[11px] mob:text-xs xl:text-[13px]">
                <span>{`@${i.username}`}</span>
              </span>
            </div>

            <div className="flex flex-col w-[135px] xl:w-[160px] justify-center">
              <span className=" text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                Became Friends On
              </span>
              <span className="flex italic px-[6px] xl:px-[6px] rounded-[4px] items-center font-medium text-[11px] mob:text-xs xl:text-[13px]">
                {format(new Date(i.friendsAt), "EEE, dd MMM yyyy")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end h-[35px]  sm:h-auto sm:justify-start items-center pr-1 sm:pr-2">
          <button
            onClick={() => setShowModal(i)}
            className="p-[6px] rounded-md hover:bg-white bg-slate-100 duration-700"
          >
            <img src={remove} className="w-[20px] h-[20px]" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

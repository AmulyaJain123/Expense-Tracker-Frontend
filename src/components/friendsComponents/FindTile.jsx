import { useState } from "react";
import addFriend from "../../assets/extras/addFriend.png";
import user from "../../assets/user.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { Link } from "react-router-dom";
import waiting from "../../assets/waiting.png";
import load from "../../assets/loader.gif";
import exclamation from "../../assets/exclamation.png";

export default function FindTile({ i, setShowModal }) {
  const [sent, setSent] = useState(i.waiting);

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

            <div className="flex flex-col w-[95px] xl:w-[120px] justify-center">
              <span className=" text-[11px] bg-slate-100 pl-[6px] rounded-[4px] mb-[2px] mob:text-xs">
                Status
              </span>
              <span
                style={{
                  color: i.status === "User" ? "blue" : "green",
                }}
                className="flex italic px-[6px] xl:px-[6px] rounded-[4px] items-center font-medium text-[11px] mob:text-xs xl:text-[13px]"
              >
                {i.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end h-[35px]  sm:h-auto sm:justify-start items-center pr-1 sm:pr-2">
          {i.status === "User" && i.waiting ? (
            <>
              <span className="capitalize flex items-center text-xs mob:text-sm mr-1 mob:mr-[6px] lap:mr-2 font-medium">
                {i.waiting}
              </span>
              <div className="p-2">
                <img
                  src={waiting}
                  className="flex justify-center items-center w-[17px] h-[17px] mob:w-[20px] mob:h-[20px]"
                  alt=""
                />
              </div>
            </>
          ) : i.status === "User" && !i.waiting ? (
            <button
              onClick={() => setShowModal(i)}
              className="p-[6px] rounded-md hover:bg-white bg-slate-100 duration-700"
            >
              <img src={addFriend} className="w-[20px] h-[20px]" alt="" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="flex flex-col mob:flex-row group duration-500 rounded-2xl lg:rounded-full justify-between mob:items-center p-1 mob:space-x-6 bg-slate-200">
        <div className="space-x-4 lg:space-x-8 flex text-xs ">
          <Link className="p-[3px] pr-0" to={`/profile/public/${i.userId}`}>
            <img
              src={i.profilePic || user}
              className="mob:w-[50px] mob:h-[50px] w-[45px] h-[45px] rounded-full"
              alt=""
            />
          </Link>
          <div className="flex flex-col lg:flex-row flex-wrap h-[120px] sm:h-[80px] lg:h-auto gap-y-2 gap-x-4 lap:space-x-4">
            <div className="flex flex-col justify-center">
              <span className="italic">Name</span>
              <span className="w-[150px] lap:w-[200px] bg-slate-100 px-[6px] lap:px-2 rounded-[4px] flex items-center">
                <span className="flex text-xs lap:text-sm overflow-clip flex-grow font-medium items-center">
                  <OnlyXChars x={20} text={i.username} />
                </span>
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <span className="italic">User ID</span>
              <span className="flex bg-slate-100 px-[6px] lap:px-2 rounded-[4px]  w-[120px] lap:w-[140px] items-center font-medium text-xs lap:text-sm">
                <span className="font-semibold mr-[6px] lap:mr-2">#</span>{" "}
                <span>{i.userId}</span>
              </span>
            </div>

            <div className="flex flex-col w-[80px] lap:w-[110px] justify-center">
              <span className="italic">Status</span>
              <span
                style={{
                  color: i.status === "User" ? "blue" : "green",
                }}
                className="flex bg-slate-100 px-[6px] lap:px-2 rounded-[4px] items-center font-medium text-xs lap:text-sm"
              >
                {i.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end h-[35px]  mob:justify-start items-center space-x-3">
          {error ? (
            <div className="text-red-500 font-medium flex space-x-[6px] text-xs items-center">
              <img src={exclamation} className="w-[13px] h-[13px]" alt="" />
              <span className="mt-[1px]">{error}</span>
            </div>
          ) : null}
          <div className="flex items-center pr-1 mob:pr-2">
            {loading ? (
              <div className="p-2">
                <img
                  src={load}
                  className="flex justify-center items-center w-[20px] h-[20px] mob:w-[25px] mob:h-[25px]"
                  alt=""
                />
              </div>
            ) : i.status === "User" && i.waiting ? (
              <>
                <span className="capitalize flex items-center text-xs mob:text-sm mr-1 mob:mr-2 lap:mr-3 font-medium">
                  {i.waiting}
                </span>
                <div className="p-2">
                  <img
                    src={waiting}
                    className="flex justify-center items-center w-[17px] h-[17px] mob:w-[20px] mob:h-[20px]"
                    alt=""
                  />
                </div>
              </>
            ) : i.status === "User" && !i.waiting ? (
              <button
                onClick={sendRequest}
                className="rounded-xl p-2 hover:bg-slate-100 duration-500"
              >
                <img
                  src={addFriend}
                  className="flex justify-center items-center w-[17px] h-[17px] mob:w-[20px] mob:h-[20px]"
                  alt=""
                />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

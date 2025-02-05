import { styling } from "../util/styling";
import { Link, redirect, useLocation, useParams } from "react-router-dom";
import TopNavThumbs from "../UIComponents/TopNavThumbs";
import { createSplitHeirachy } from "../util/componentNavigation";
import logIn from "../assets/logIn.png";
import logOut from "../assets/logOut.png";
import userIcon from "../assets/user.png";
import notifyIcon from "../assets/sideNavImages/notify-solid.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import { useNavigate } from "react-router-dom";
import TopNavButton from "../UIComponents/TopNavButton";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector } from "react-redux";
import OnlyXChars from "../UIComponents/OnlyXChars";
import Cookies from "js-cookie";
import load from "../assets/loader.gif";

export default function TopNav() {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.universal.userInfo);
  const menuStatus = useSelector((state) => state.universal.hamMenu);
  const notifications = useSelector((state) => state.realtime.notifications);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef();

  const dom =
    import.meta.env.VITE_ENV === "dev"
      ? "localhost"
      : import.meta.env.VITE_BACKEND_DOMAIN;

  async function logOutClick() {
    try {
      setLoading(true);
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/auth/logout",
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      navigate("/auth");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function menuClick() {
    dispatch(universalActions.openMenu());
  }

  return (
    <div
      style={{
        marginTop: `${styling.spacing}px`,
        backgroundColor: styling.navColor,
      }}
      className="flex rounded-r-xl lg:rounded-r-none items-center p-1 rounded-l-xl"
    >
      {menuStatus ? (
        <>
          <HamburgerMenu />
        </>
      ) : null}

      <button
        onClick={menuClick}
        className="flex p-2 mr-4 ml-[2px] rounded-lg lg:hidden hover:bg-slate-200"
      >
        <div>
          <i className="fi fi-rs-burger-menu flex justify-center items-center text-lg "></i>
        </div>
      </button>

      <div className="ml-auto flex">
        {userDetails ? (
          <div className="flex items-center space-x-3 mr-[6px] sm:mr-[10px] ">
            <Link
              to={"/notifications"}
              className="rounded-lg relative hidden sm:flex hover:bg-slate-200  p-2 duration-500"
            >
              <img
                src={notifyIcon}
                className="w-[20px] h-[20px] sm:h-[20px] sm:w-[20px]"
                alt=""
              />
              {notifications.length != 0 ? (
                <div className="absolute top-[6px] right-[6px] rounded-full h-[10px] w-[10px] bg-[#7fffd4]"></div>
              ) : null}
            </Link>
            <Link to={"/profile"}>
              <div className="flex  rounded-full p-1 items-center space-x-2 sm:space-x-4 bg-slate-200 pr-4 sm:pr-4">
                <img
                  src={userDetails.profilePic || userIcon}
                  className="rounded-full w-[25px] h-[25px] sm:h-[25px] sm:w-[25px] bg-white"
                  alt=""
                />
                <span className=" text-xs sm:text-xs font-medium">
                  <OnlyXChars x={25} text={userDetails.username} />
                </span>
              </div>
            </Link>
            {loading ? (
              <div className="flex justify-center p-2 items-center">
                <img src={load} className="w-[20px] h-[20px]" alt="" />
              </div>
            ) : (
              <button
                onClick={logOutClick}
                className="rounded-lg hover:bg-slate-200 p-2 duration-500"
              >
                <img
                  src={logOut}
                  className="w-[20px] h-[20px] sm:h-[20px] sm:w-[20px]"
                  alt=""
                />
              </button>
            )}
          </div>
        ) : (
          <div className="flex space-x-4 mr-[6px] sm:mr-[10px] ">
            <Link
              to={"/auth"}
              className="rounded-lg hover:bg-slate-200 p-2 duration-500"
            >
              <img
                src={logIn}
                className=" w-[20px] h-[20px] sm:h-[20px] sm:w-[20px]"
                alt=""
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

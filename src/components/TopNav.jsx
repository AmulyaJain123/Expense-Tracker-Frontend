import { styling } from "../util/styling";
import { Link, redirect, useLocation, useParams } from "react-router-dom";
import TopNavThumbs from "../UIComponents/TopNavThumbs";
import { createSplitHeirachy } from "../util/componentNavigation";
import logIn from "../assets/logIn.png";
import logOut from "../assets/logOut.png";
import userIcon from "../assets/user.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import { useNavigate } from "react-router-dom";
import TopNavButton from "../UIComponents/TopNavButton";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector } from "react-redux";
import responsive from "../assets/responsive-website.png";

export default function TopNav() {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.universal.userInfo);
  const menuStatus = useSelector((state) => state.universal.hamMenu);
  const dialogRef = useRef();

  function logOutClick() {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/auth");
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
      className="flex rounded-r-xl lg:rounded-r-none items-center p-2 h-11 sm:h-14 rounded-l-xl"
    >
      {menuStatus ? (
        <>
          <HamburgerMenu />
        </>
      ) : null}

      <button
        onClick={menuClick}
        className="flex p-2 mr-4 ml-2 rounded-lg lg:hidden hover:bg-slate-200"
      >
        <div>
          <i className="fi fi-rs-burger-menu flex justify-center items-center text-xl sm:text-2xl"></i>
        </div>
      </button>

      {/* <button
        onClick={notify}
        className="p-2 relative rounded-xl hover:bg-slate-200 ml-auto mr-6 duration-700"
      >
        <i className="fi fi-ss-megaphone flex items-center text-lg sm:text-2xl justify-center"></i>
        <div className="absolute  bg-[aquamarine] rounded-full flex items-center justify-center w-[15px] h-[15px] sm:w-[20px] sm:h-[20px] top-0 left-0 sm:top-[-2px] sm:left-[-2px] text-sm sm:text-base font-medium">
          1
        </div>
      </button> */}

      {/* <dialog
        className="w-[90vw] max-h-[90vh]  scrollbar-hidden max-w-[350px] sm:max-w-[500px] lg:max-w-[700px] bg-white p-6 rounded-3xl"
        ref={dialogRef}
      >
        <div className="flex flex-grow flex-col">
          <div className="flex flex-grow p-2 text-center sm:p-3 rounded-xl sm:rounded-2xl bg-[#dc93f6] justify-center font-bold text-lg sm:text-xl xl:text-2xl">
            Introducing Responsiveness
          </div>
          <div className="w-full  h-[150px] sm:h-[200px] lg:h-[250px] rounded-2xl mt-4 bg-slate-100 flex justify-center items-center">
            <img
              className="w-[100px] sm:w-[150px] lg:w-[220px]"
              src={responsive}
              alt=""
            />
          </div>
          <div className="flex flex-col mt-6 items-center">
            <p className="text-center border-b-2 border-neutral-500 font-semibold text-sm sm:text-base lg:text-lg mb-4">
              🎉 Exciting Update: Enhanced Responsiveness on BillBud! 🚀
            </p>
            <p className="text-center font-medium text-xs sm:text-sm lg:text-base">
              We're thrilled to announce that BillBud is now even more
              user-friendly with our latest responsiveness enhancements! You can
              now enjoy a seamless experience on both mobile and desktop devices
              for our popular BillSplit and BillVault features. Whether you're
              managing your bills or keeping track of warranties on the go,
              these features are optimized for a smooth and intuitive
              experience. Stay tuned as we continue to work on bringing the same
              responsiveness to BillTrack!
            </p>
          </div>
        </div>
        <form className="flex justify-end mt-4" method="dialog">
          <button className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-red-500 text-white px-2 sm:px-4 sm:text-base text-sm font-bold ">
            Close
          </button>
        </form>
      </dialog> */}

      <div className="ml-auto flex">
        {userDetails ? (
          <div className="flex space-x-4 mr-[6px] sm:mr-[20px] ">
            <Link to={"/profile"}>
              <div className="flex rounded-full p-1 items-center space-x-2 sm:space-x-6 bg-slate-200 pr-4 sm:pr-6">
                <img
                  src={userDetails.profilePic || userIcon}
                  className="rounded-full w-[17px] h-[17px] sm:h-[35px] sm:w-[35px] bg-white"
                  alt=""
                />
                <span className=" text-xs sm:text-base font-medium">
                  {userDetails.username}
                </span>
              </div>
            </Link>
            <button
              onClick={logOutClick}
              className="rounded-xl hover:bg-slate-200 p-2 duration-500"
            >
              <img
                src={logOut}
                className="w-[17px] h-[17px] sm:h-[25px] sm:w-[25px]"
                alt=""
              />
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 mr-[6px] sm:mr-[20px] ">
            <Link
              to={"/auth"}
              className="rounded-xl hover:bg-slate-200 p-2 duration-500"
            >
              <img
                src={logIn}
                className=" w-[17px] h-[17px] sm:h-[25px] sm:w-[25px]"
                alt=""
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

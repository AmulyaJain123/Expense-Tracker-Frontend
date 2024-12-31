import { Outlet } from "react-router-dom";
import { styling } from "../util/styling";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { useNavigation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Root.module.css";
import load from "../assets/loader.gif";

export default function Root() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  // const toastMsg = useSelector((state) => state.universal.toastMsg);
  const userInfo = useSelector((state) => state.universal.userInfo);
  const [userFetch, setUserFetch] = useState(true);

  // useEffect(() => {
  //   if (toastMsg != null) {
  //     if (toastMsg.mood === "success") {
  //       toast.success(toastMsg.msg);
  //     } else if (toastMsg.mood === "error") {
  //       toast.error(toastMsg.msg);
  //     }
  //   }
  // }, [toastMsg]);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/auth/getdetails",
          {
            method: "GET",
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
          dispatch(universalActions.setUserInfo(result));
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

  function close() {
    dispatch(universalActions.clearToastMsg());
  }

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
              <div className="w-[100vw] h-[40px] z-[100] uppercase absolute flex top-0 left-0 justify-center text-lg font-semibold items-center bg-[#dc93f6]">
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

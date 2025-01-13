import Footer from "../components/Footer";
import styles from "./HomePage.module.css";
import track from "../assets/labels/track.png";
import split from "../assets/labels/split.png";
import vault from "../assets/labels/vault.png";
import track2 from "../assets/labels/track2.png";
import split2 from "../assets/labels/split2.png";
import vault2 from "../assets/labels/vault2.png";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import email from "../assets/email.png";
import SwipeAnimation from "../UIComponents/SwipeAnimation";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  const [copyStatus, setCopyStatus] = useState(false);
  const copyRef = useRef();

  function copyEmail(str) {
    navigator.clipboard.writeText(str);
    setCopyStatus(true);
  }

  useEffect(() => {
    if (copyStatus) {
      setTimeout(() => {
        setCopyStatus(false);
      }, 5000);
      setTimeout(() => {
        copyRef.current.style.opacity = 100;
      }, 0);
    }
  }, [copyStatus]);
  return (
    <>
      <Helmet>
        <title>Home | BILLBUD</title>
        <meta name="description" content="Home" />
      </Helmet>
      <div className="h-full w-full pb-[150px] bg-white overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <header className="flex flex-col pt-[40px] mob:pt-[45px] tab:pt-[60px] lap:pt-[80px]  justify-center items-center space-y-[3px] mob:space-y-[4px] tab:space-y-[6px] lap:space-y-[10px]">
          <h2 className="text-[32px] mob:text-[35px] tab:text-[45px] lap:text-[55px] mx-[20px] text-center font-bold text-stone-700">
            Welcome to{" "}
            <span style={{ fontFamily: "fredoka" }} className="uppercase">
              BillBud
            </span>
          </h2>
          <p className="font-medium text-[12px] mob:text-[12px] tab:text-[13px] lap:text-[14px]  text-center mx-[20px]">
            The{" "}
            <span className="text-[#9d4edd] font-medium">Expense Tracker</span>,{" "}
            <span className="text-[#9d4edd] font-medium">Digital Storage</span>,{" "}
            <span className="text-[#9d4edd] font-medium">Bill Splitter</span> -
            ALL IN ONE
          </p>
        </header>

        <div className="hidden smTab:flex flex-grow mob:mt-[7px] tab:mt-[15px] lap:mt-[20px] justify-center items-center">
          <SwipeAnimation />
        </div>

        <div className={`${styles.wrapper}`}>
          <div className="flex flex-col mt-12 mob:mt-16 smTab:mt-0 px-[40px] smTab:mx-[50px] tab:mx-[100px] lap:mx-[150px] ">
            <p className="text-center flex flex-col space-y-2 font-medium text-[12px] mob:text-xs tab:text-sm">
              <p>
                Managing finances can often be a daunting task, but with{" "}
                <span
                  style={{ fontFamily: "fredoka" }}
                  className="uppercase font-semibold"
                >
                  BillBud
                </span>
                , it’s easier than ever.{" "}
                <span
                  style={{ fontFamily: "fredoka" }}
                  className="uppercase font-semibold"
                >
                  BillBud
                </span>{" "}
                is designed to simplify your financial life, offering a suite of
                powerful features that help you stay organized, informed, and in
                control.
              </p>
              <p>
                Explore our three main features, each tailored to meet your
                unique financial needs:
              </p>
            </p>

            <menu className="flex flex-col mob:flex-row  mx-auto mt-[60px] sm:mt-[80px] gap-y-4 mob:gap-x-5 justify-between">
              <div className="flex flex-col relative">
                <div className="rounded-2xl bg-slate-100 w-[90px] tab:w-[110px]  aspect-square mob:p-3 tab:p-4 flex justify-center items-center">
                  <i className="fi fi-ss-vault flex justify-center items-center text-[50px] tab:text-[60px]  text-neutral-600"></i>
                </div>
                <div className="absolute hidden mob:flex bottom-[10px] mob:bottom-[-10px] scale-110 left-[-10px] mob:left-[-20px] tab:left-[-50px] translate-x-[-100%] mob:translate-x-[-50%] translate-y-[100%]">
                  <img src={vault} className="" alt="" />
                </div>
                <div className="absolute flex mob:hidden top-[-5px] scale-[125%] right-[-15px] translate-x-[100%] translate-y-[-100%]">
                  <img src={vault2} className="" alt="" />
                </div>
              </div>
              <div className="flex flex-col relative">
                <div className="rounded-2xl bg-slate-100 w-[90px] tab:w-[110px]  aspect-square mob:p-3 tab:p-4 flex justify-center items-center">
                  <i className="fi fi-ss-calculator-bill flex justify-center items-center text-[50px] tab:text-[60px]  text-neutral-600"></i>
                </div>
                <div className="absolute mob:flex hidden bottom-[-10px]  mob:left-[-20px] tab:left-[-30px]  translate-y-[100%]">
                  <img src={track} className="" alt="" />
                </div>
                <div className="absolute flex mob:hidden top-[20%] scale-110 left-[-20px] translate-x-[-100%] translate-y-[50%]">
                  <img src={track2} className="" alt="" />
                </div>
              </div>
              <div className="flex flex-col relative">
                <div className="rounded-2xl bg-slate-100 w-[90px] tab:w-[110px]  aspect-square mob:p-3 tab:p-4 flex justify-center items-center">
                  <i className="fi fi-ss-hexagon-divide flex justify-center items-center  text-[50px] tab:text-[60px]  text-neutral-600"></i>
                </div>
                <div className="absolute hidden mob:flex bottom-[-5px]  mob:right-[-30px] tab:right-[-50px] translate-x-[40%] translate-y-[100%]">
                  <img src={split} className="" alt="" />
                </div>
                <div className="absolute flex mob:hidden top-[0%] scale-110 right-[-20px] translate-x-[100%] translate-y-[-50%]">
                  <img src={split2} className="" alt="" />
                </div>
              </div>
            </menu>
          </div>
        </div>

        <div className="flex flex-col mt-[80px] mob:mt-[160px] tab:mt-[200px] lap:mt-[240px]">
          <h1 className="font-bold capitalize underline underline-offset-4 text-[18px] mob:text-[20px] tab:text-[24px] lap:text-[28px] text-center">
            Find me here
          </h1>

          <div className="flex flex-col mob:flex-row justify-center  w-[80%] rounded-3xl mx-auto pt-[30px] pb-[70px] items-center mt-2 mob:mt-3 tab:mt-4 lap:mt-6 gap-[30px] mob:gap-[50px] tab:gap-[70px] lap:gap-20">
            <div className="text-lg relative flex justify-center items-center ">
              <img
                src={email}
                className="w-[30px] mob:w-[35px] tab:w-[45px] "
                alt=""
              />
              <span className="items-center  absolute bottom-[-5px] translate-y-[100%] right-[50%] translate-x-[50%] min-w-[110px] justify-center bg-white rounded-xl px-2  h-fit flex w-fit tab:py-1">
                {copyStatus ? (
                  <span className="mob:rounded-md tab:rounded-lg rounded-md px-[4px] mob:px-[6px] tab:px-2 flex items-center py-1">
                    <span
                      ref={copyRef}
                      className="opacity-[0.1] text-[9px] mob:text-[11px] tab:text-xs font-medium text-green-600 duration-[2500ms]"
                    >
                      Copied
                    </span>
                  </span>
                ) : (
                  <button
                    onClick={() => copyEmail("amulyajain123@gmail.com")}
                    className=" hover:bg-stone-100 rounded-md mob:rounded-md tab:rounded-lg mob:px-[6px] px-[5px] tab:px-2 flex items-center mob:py-[1px] tab:py-1"
                  >
                    <span className="text-[9px] mob:text-[11px] tab:text-xs text-nowrap font-medium ">
                      Copy Email
                    </span>
                  </button>
                )}
              </span>
            </div>
            <a
              target="_blank"
              className="hover:scale-110 duration-500 pt-3 mob:pt-0"
              href="https://www.linkedin.com/in/amulya-jain-a31180255/"
            >
              <img
                src={linkedin}
                className="w-[30px] mob:w-[32px] tab:w-[40px]"
                alt=""
              />
            </a>
            <a
              className="hover:scale-110 duration-500"
              target="_blank"
              href="https://github.com/AmulyaJain123"
            >
              <img
                src={github}
                className="w-[30px] mob:w-[32px] tab:w-[40px]"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

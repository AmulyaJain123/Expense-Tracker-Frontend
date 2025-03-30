import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import user from "../assets/user.png";
import qr from "../assets/qr.png";
import pencil from "../assets/edit-pencil.png";
import tick from "../assets/tick.png";
import cross from "../assets/cross.png";
import load from "../assets/loader.gif";
import exclamation from "../assets/exclamation.png";
import bill from "../assets/sideNavImages/bill-solid.png";
import vault from "../assets/sideNavImages/vault-solid.png";
import split from "../assets/sideNavImages/split-solid.png";
import profile from "../assets/sideNavImages/profile-solid.png";
import { Helmet } from "react-helmet-async";

import { useRef, useState } from "react";
import ProfilePic from "../components/profileComponents/ProfilePic";
import Activity from "../components/profileComponents/Activity";
import { dateFormat } from "../util/algo";

const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ProfileViewPage() {
  const data = useLoaderData();

  function formatDate(str) {
    return new Date(str).toDateString();
  }

  return (
    <>
      <Helmet>
        <title>{data.username}'s Profile | BILLBUD</title>
        <meta name="description" content="Public Profile" />
      </Helmet>
      <div className="h-full w-full bg-white pb-[100px] overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <div className="flex flex-col max-w-[1200px] mx-auto">
          <h1 className="text-[24px] sm:text-[28px] tab:text-[35px] text-stone-700 text-center sm:flex items-center justify-center mt-6 mob:mt-8 font-extrabold">
            <span className="py-1 px-3 tab:px-4 rounded-xl tab:rounded-2xl bg-stone-100 text-stone-500 text-[22px] sm:text-[25px] tab:text-[30px]">
              {data.username}
            </span>{" "}
            <span className="sm:mr-4 tab:mr-6  sm:ml-1">'s</span>
            <span className="block mt-2 sm:mt-0">Public Profile</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center sm:justify-center text-sm sm:space-x-8 tab:space-x-16 mt-6 mob:mt-12 tab:mt-16  ">
            <div className="flex flex-col gap-y-[40px] sm:gap-y-[60px] items-center mb-12 sm:mb-16">
              <div className="mt-4 sm:mt-8">
                <p className="font-semibold mb-3 text-center">Profile Pic</p>
                <>
                  <div className="bg-neutral-100 relative p-6 rounded-full">
                    <img
                      src={data.profilePic || user}
                      className="w-[190px] h-[190px] rounded-full"
                      alt=""
                    />
                  </div>
                </>
              </div>
              <div className="flex text-[11px] tab:text-xs flex-col">
                <span className="font-bold mb-2 text-base mx-auto">STATS</span>
                <div className="flex flex-col">
                  <div className="flex text-neutral-500 flex-col space-y-4 tab:space-y-6 bg-neutral-100 px-4 tab:px-6 rounded-lg py-3 tab:py-4 w-[250px] tab:w-[300px]">
                    <div className="flex justify-between rounded-md ">
                      <span className="font-semibold flex items-center uppercase">
                        <img
                          src={split}
                          className="w-[15px] h-[15px] mr-3 flex justify-center items-center"
                          alt=""
                        />
                        <span>Splits</span>
                      </span>
                      <span>{data.splits.byMe + data.splits.sharedToMe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold flex items-center uppercase">
                        <img
                          src={vault}
                          className="w-[15px] h-[15px] mr-3 flex justify-center items-center"
                          alt=""
                        />
                        <span>Vault</span>
                      </span>
                      <span>
                        {data.vault.rec + data.vault.war + data.vault.doc}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold flex items-center uppercase">
                        <img
                          src={bill}
                          className="w-[15px] h-[15px] mr-3 flex justify-center items-center"
                          alt=""
                        />
                        <span>Transactions</span>
                      </span>
                      <span>{data.transactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold flex items-center uppercase">
                        <img
                          src={profile}
                          className="w-[15px] h-[15px] mr-3 flex justify-center items-center"
                          alt=""
                        />
                        <span>Friends</span>
                      </span>
                      <span>{data.friends}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex text-[11px] tab:text-[11px] tab:text-xs flex-col gap-y-6 sm:gap-y-8 max-w-[900px]">
              <div className="flex flex-col space-y-1 w-[280px] tab:w-[350px]">
                <span className="font-semibold ">Full Name</span>
                <div className="px-4 tab:px-6 py-1 tab:py-[6px] text-neutral-500 text-[11px] tab:text-xs font-medium rounded-sm bg-neutral-100 ">
                  {data.fullname}
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[280px] tab:w-[350px]">
                <span className="font-semibold ">Username</span>
                <div className="relative ">
                  <span className="px-4 tab:px-6 text-neutral-500 py-1 text items-center tab:py-[6px] flex disabled:text-neutral-500 text-[11px] tab:text-xs font-medium rounded-sm bg-neutral-100 ">
                    <span className="text-neutral-400 mr-[6px] text-sm tab:mr-4">
                      @
                    </span>
                    <span>{data.username}</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[280px] tab:w-[350px]">
                <span className="font-semibold ">User ID</span>
                <div className="px-4 tab:px-6 py-1 tab:py-[6px] text-[11px] tab:text-xs font-medium rounded-sm bg-neutral-100 ">
                  <span className="text-neutral-400 mr-4 text-sm">#</span>
                  <span className="text-[11px] tab:text-xs text-neutral-500">
                    {data.userId}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[280px] tab:w-[350px]">
                <span className="font-semibold ">Joined On</span>
                <div className="px-4 tab:px-6 py-1 tab:py-[6px] text-neutral-500 text-[11px] tab:text-xs font-medium rounded-sm bg-neutral-100 ">
                  {dateFormat(data.joinedOn)}
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[280px] tab:w-[350px]">
                <span className="font-semibold ">UPI ID</span>
                <div className="pl-4 tab:pl-6 items-center text-[13px] tab:text-sm font-medium rounded-sm flex bg-neutral-100 ">
                  <span className="text-neutral-400 mr-[6px] tab:mr-2">
                    UPI
                  </span>

                  <div className="relative flex flex-grow">
                    <span className="px-4 py-[8px] w-full text-neutral-500 focus:outline-none disabled:text-neutral-500 text-[11px] tab:text-xs font-medium rounded-sm bg-neutral-100 ">
                      {data.upiId || "NOT ENTERED"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[180px] tab:w-[200px]">
                <span className="font-semibold ">QR Code</span>
                <div className="px-3 tab:px-4 py-[12px] tab:py-4 text-sm aspect-square flex justify-center items-center font-medium rounded-md bg-neutral-100 ">
                  {data.qrCode ? (
                    <div className="w-[150px] h-[150px] tab:w-[170px] tab:h-[170px] relative flex justify-center items-center text-neutral-500 ">
                      <img
                        src={data.qrCode}
                        className="w-full h-full "
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="w-[150px] h-[150px] tab:w-[170px] tab:h-[170px] relative flex justify-center items-center text-neutral-500 ">
                      <img src={qr} className="w-full h-full blur-sm" alt="" />
                      <div className="absolute text-sm top-[50%] text-nowrap bg-neutral-100 px-4 h-[30px] flex justify-center items-center  rounded-full  right-[50%] translate-x-[50%] translate-y-[-50%]">
                        NOT ENTERED
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-12">
            <p className="uppercase font-bold text-base mb-2 ">Activity</p>
            <Activity data={data.pActivity} />
          </div>
        </div>
      </div>
    </>
  );
}

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
          <h1 className="text-[35px] text-stone-700 text-center flex items-center justify-center mt-8 font-extrabold">
            <span className="py-1 px-4 rounded-2xl bg-stone-100 text-stone-500 text-[30px]">
              {data.username}
            </span>{" "}
            <span className="mr-6 ml-1">'s</span>
            <span>Public Profile</span>
          </h1>
          <div className="flex justify-center text-sm space-x-16 mt-16 ">
            <div className="flex flex-col gap-y-[60px] items-center mb-16">
              <div className="mt-8">
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
              <div className="flex text-xs flex-col">
                <span className="font-bold mb-2 text-base mx-auto">STATS</span>
                <div className="flex flex-col">
                  <div className="flex text-neutral-500 flex-col space-y-6 bg-neutral-100 px-6 rounded-lg  py-4 w-[300px]">
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
                      <span>{data.vault.rec + data.vault.war}</span>
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
            <div className="flex flex-col gap-y-8 max-w-[900px]">
              <div className="flex flex-col space-y-1 w-[350px]">
                <span className="font-semibold ">Username</span>
                <div className="relative ">
                  <span className="px-6 py-[6px] flex disabled:text-neutral-500 text-xs font-medium rounded-sm bg-neutral-100 ">
                    {data.username}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[350px]">
                <span className="font-semibold ">User ID</span>
                <div className="px-6 py-[6px] text-xs font-medium rounded-sm bg-neutral-100 ">
                  <span className="text-neutral-400 mr-2">#</span>
                  <span className="text-xs">{data.userId}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[350px]">
                <span className="font-semibold ">Joined On</span>
                <div className="px-6 py-[6px]  text-xs font-medium rounded-sm bg-neutral-100 ">
                  {formatDate(data.joinedOn)}
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-[350px]">
                <span className="font-semibold ">UPI ID</span>
                <div className="pl-6 items-center text-sm font-medium rounded-sm flex bg-neutral-100 ">
                  <span className="text-neutral-400 mr-2">UPI</span>

                  <div className="relative flex flex-grow">
                    <span className="px-4 py-[8px] w-full focus:outline-none disabled:text-neutral-500 text-xs font-medium rounded-sm bg-neutral-100 ">
                      {data.upiId || "NOT ENTERED"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 w-[220px]">
                <span className="font-semibold ">QR Code</span>
                <div className="px-4 py-2 text-sm aspect-square flex justify-center items-center font-medium rounded-md bg-neutral-100 ">
                  {data.qrCode ? (
                    <div className="w-[190px] relative h-[190px] flex justify-center items-center text-neutral-500 ">
                      <img
                        src={data.qrCode}
                        className="w-full h-full "
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="w-[190px] relative h-[190px] flex justify-center items-center text-neutral-500 ">
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

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

import { useRef, useState } from "react";
import ProfilePic from "../components/profileComponents/ProfilePic";
import Activity from "../components/profileComponents/Activity";
import QRPic from "../components/profileComponents/QRPic";
import { Helmet } from "react-helmet-async";

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

export default function ProfilePage() {
  const data = useLoaderData();
  const upiRef = useRef();
  const [editUpi, setEditUpi] = useState(false);
  const [upiEditLoading, setUpiEditLoading] = useState(false);

  const dispatch = useDispatch();

  function formatDate(str) {
    return new Date(str).toDateString();
  }

  function cancelEditUpi() {
    upiRef.current.value = data.upiId || "NOT ENTERED";
    setEditUpi(false);
    setUpiEditLoading(false);
  }

  function upiPencilClick() {
    setEditUpi(true);
    if (data.upiId === null) {
      upiRef.current.value = "";
    }
  }

  async function confirmEditUpi() {
    const newUpiId = upiRef.current.value.trim();
    let regex = new RegExp(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/);
    console.log(newUpiId, regex.test(newUpiId));
    if (regex.test(newUpiId) != true) {
      setUpiEditLoading("Invalid UPI ID");
      return;
    }
    setUpiEditLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/profile/changeupi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            upiId: newUpiId,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      if (newUpiId != "") {
        data.upiId = newUpiId;
      } else {
        data.upiId = null;
      }
      if (newUpiId === "") {
        upiRef.current.value = "NOT ENTERED";
      }
      setUpiEditLoading(false);
      setEditUpi(false);
    } catch (err) {
      console.log(err);
      setUpiEditLoading("Failed");
    }
  }

  return (
    <>
      <Helmet>
        <title>My Profile | BILLBUD</title>
        <meta name="description" content="My Profile" />
      </Helmet>
      <div className="h-full w-full bg-white pb-[100px] overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <h1 className="text-[40px] py-1 text-white text-center bg-[#9d4edd] rounded-xl mx-16 mt-12 font-bold uppercase">
          My Profile
        </h1>
        <div className="flex justify-center space-x-32 mt-24 ">
          <div className="flex flex-col gap-y-[80px] items-center mb-24">
            <div className="mt-12">
              <p className="font-semibold mb-4 text-center">Profile Pic</p>
              <ProfilePic data={data} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold mb-2 text-lg mx-auto">STATS</span>
              <div className="flex flex-col">
                <div className="flex text-neutral-500 flex-col space-y-8 bg-neutral-100 px-8 rounded-lg  py-6 w-[400px]">
                  <div className="flex justify-between rounded-md ">
                    <span className="font-semibold flex items-center uppercase">
                      <img
                        src={split}
                        className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
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
                        className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
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
                        className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
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
                        className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
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
            <div className="flex flex-col space-y-2 w-[500px]">
              <span className="font-semibold ">Username</span>
              <div className="relative ">
                <div className="px-8 py-[10px] w-full text-neutral-500 text-base font-medium rounded-md bg-neutral-100 ">
                  {data.username}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-[500px]">
              <span className="font-semibold ">Email</span>
              <div className="px-8 py-2 text-neutral-500 text-base font-medium rounded-md bg-neutral-100 ">
                {data.email}
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-[500px]">
              <span className="font-semibold ">User ID</span>
              <div className="px-8 py-2 text-neutral-500 text-lg font-medium rounded-md bg-neutral-100 ">
                <span className="text-neutral-400 mr-3">#</span>
                <span className="text-base">{data.userId}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-[500px]">
              <span className="font-semibold ">Joined On</span>
              <div className="px-8 py-2 text-neutral-500 text-base font-medium rounded-md bg-neutral-100 ">
                {formatDate(data.joinedOn)}
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-[500px]">
              <span className="font-semibold ">UPI ID</span>
              <div
                style={{ outline: !editUpi ? "none" : "2px solid black" }}
                className="pl-8 items-center text-lg font-medium rounded-md flex bg-neutral-100 "
              >
                <span className="text-neutral-400 mr-4">UPI</span>

                <div className="relative flex flex-grow">
                  <input
                    defaultValue={data.upiId || "NOT ENTERED"}
                    disabled={!editUpi || upiEditLoading === true}
                    ref={upiRef}
                    style={{
                      cursor: !editUpi ? "default" : "auto",
                    }}
                    type="text"
                    className="px-8 py-[10px] w-full focus:outline-none disabled:text-neutral-500 text-base font-medium rounded-md bg-neutral-100 "
                  />

                  {!editUpi ? (
                    <button
                      onClick={upiPencilClick}
                      className="absolute right-1 duration-500 rounded-md hover:bg-neutral-200 p-2 top-[50%] translate-y-[-50%]"
                    >
                      <img
                        src={pencil}
                        className="w-[20px] h-[20px] flex justify-center items-center"
                        alt=""
                      />
                    </button>
                  ) : (
                    <div className="absolute top-[-10px] flex space-x-4 right-2 translate-y-[-100%]">
                      <button
                        disabled={upiEditLoading === true}
                        className="disabled:pointer-events-none disabled:opacity-50"
                        onClick={cancelEditUpi}
                      >
                        <img
                          src={cross}
                          className="w-[20px] hover:opacity-50 opacity-100 h-[20px] flex justify-center items-center"
                          alt=""
                        />
                      </button>
                      <button
                        disabled={upiEditLoading === true}
                        className="disabled:pointer-events-none disabled:opacity-50"
                        onClick={confirmEditUpi}
                      >
                        <img
                          src={tick}
                          className="w-[20px] hover:opacity-50 opacity-100 h-[20px] flex justify-center items-center"
                          alt=""
                        />
                      </button>
                      {upiEditLoading === true ? (
                        <div className="absolute left-[-35px] translate-x-[-100%]">
                          <img
                            src={load}
                            className="w-[20px] h-[20px] flex justify-center items-center"
                            alt=""
                          />
                        </div>
                      ) : upiEditLoading != true && upiEditLoading != false ? (
                        <div className="absolute flex text-nowrap text-red-500 text-base font-normal items-center left-[-55px] translate-x-[-100%]">
                          <img
                            src={exclamation}
                            className="w-[16px] h-[16px] mr-2 flex justify-center items-center"
                            alt=""
                          />
                          {upiEditLoading}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-[300px]">
              <span className="font-semibold ">QR Code</span>
              <div className="py-4 text-lg aspect-square flex justify-center items-center font-medium">
                <QRPic data={data} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-12">
          <p className="uppercase font-bold text-lg mb-2 ">Activity</p>
          <Activity data={data.pActivity} />
        </div>
      </div>
    </>
  );
}

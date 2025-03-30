import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import RequestTile from "./RequestTile";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import cross2 from "../../assets/cross2.png";
import noEntries from "../../assets/noEntries.png";
import reload from "../../assets/reload.png";
import { ErrorBox, EmptyBox, ErrorText } from "../../UIComponents/NoneFound";

export default function RecievedRequests() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);

  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchRequests() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/getrecievedrequests",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      setRequests(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  function openModal(obj) {
    setError2(null);
    setLoading2(false);
    setShowModal(obj);
  }

  async function closeRequest(val, request) {
    setError2(null);
    setLoading2(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/closerequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            val: val,
            email: request.email,
            userId: request.userId,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      if (val) {
        setRequests((p) => {
          let requests = JSON.parse(JSON.stringify(p));
          const req = requests.find((i) => i._id === request._id);
          req.status = "accepted";
          req.resolvedDate = new Date().toUTCString();
          return requests;
        });
      } else {
        setRequests((p) => {
          let requests = JSON.parse(JSON.stringify(p));
          const req = requests.find((i) => i._id === request._id);
          req.status = "rejected";
          req.resolvedDate = new Date().toUTCString();
          return requests;
        });
      }
      setLoading2(false);
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setError2(true);
      setLoading2(false);
    }
  }

  return (
    <div
      style={{ height: "calc(100% - 8px)" }}
      className="flex flex-col gap-y-2 relative flex-grow p-1 mob:p-3 rounded-lg bg-white mt-2 "
    >
      <button
        onClick={fetchRequests}
        disabled={loading}
        className="disabled:pointer-events-none disabled:opacity-50 absolute top-[-42px] mob:top-[-44px] lg:top-[-48px] p-2 bg-white rounded-full hover:bg-slate-100 duration-500 z-[1]  left-[110px] mob:left-[145px] translate-x-[50%]"
      >
        <img
          src={reload}
          className="w-[15px] h-[15px] flex justify-center items-center"
          alt=""
        />
      </button>
      {showModal ? (
        <div className="w-full h-full absolute top-0 left-0 backdrop-blur rounded-lg flex justify-center items-center">
          <div className="bg-white relative shadow-md rounded-lg p-4 flex flex-col items-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-1 right-1"
            >
              <img src={cross2} className="w-[20px] h-[20px]" alt="" />
            </button>
            <span className="text-sm font-semibold ">
              {showModal.justClicked
                ? "Accept Friend Request?"
                : "Reject Friend Request?"}
            </span>
            <span className="text-xs text-center my-2 max-w-[250px]">
              Do you really want to{" "}
              {showModal.justClicked ? "accept" : "reject"} friend request sent
              from{" "}
              <span className="font-medium">{`@${showModal.username}`}</span>
            </span>
            <div className="flex h-[40px] items-center gap-x-4">
              {loading2 ? (
                <div className="">
                  <img src={load} className="w-[20px] h-[20px]" alt="" />
                </div>
              ) : error2 ? (
                <ErrorText textSize={12} gap={6} msg={error2} />
              ) : (
                <>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                  >
                    <img src={cross} className="w-[16px] h-[16px]" alt="" />
                  </button>
                  <button
                    onClick={() =>
                      closeRequest(showModal.justClicked, { ...showModal })
                    }
                    className="rounded-md p-[4px] hover:bg-slate-100 duration-500"
                  >
                    <img src={tick} className="w-[16px] h-[16px]" alt="" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div
        style={{ height: "calc( 100% )" }}
        className=" flex  flex-col p-2 mob:p-3  sm:py-0 overflow-auto specialScrollLight space-y-4 "
      >
        {loading ? (
          <div className="flex justify-center items-center flex-grow ">
            <img
              src={load}
              className="w-[40px] h-[40px] flex justify-center items-center"
              alt=""
            />
          </div>
        ) : error ? (
          <ErrorBox IconSize={50} fontWeight={500} />
        ) : (
          <>
            {requests.length != 0 ? (
              <>
                {requests.map((i) => {
                  console.log(i);
                  return (
                    <RequestTile i={i} stat={i.status} openModal={openModal} />
                  );
                })}
              </>
            ) : (
              <EmptyBox
                textColor="#cbd5e1"
                IconSize={60}
                gap={12}
                textSize={15}
                msg="No Requests Found"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

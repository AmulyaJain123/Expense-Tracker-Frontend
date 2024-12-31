import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import RequestTile from "./RequestTile";
import noEntries from "../../assets/noEntries.png";
import reload from "../../assets/reload.png";

export default function RecievedRequests() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);

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

  return (
    <div className="flex relative flex-grow p-3 rounded-xl bg-white mt-4 ">
      <button
        onClick={fetchRequests}
        disabled={loading}
        className="disabled:pointer-events-none disabled:opacity-50 absolute top-1 p-2 rounded-full hover:bg-slate-100 duration-500  right-2"
      >
        <img
          src={reload}
          className="w-[20px] h-[20px] flex justify-center items-center"
          alt=""
        />
      </button>
      <div className=" flex flex-grow flex-col p-4 py-8 overflow-auto customScrollThin h-[830px] space-y-6 ">
        {loading ? (
          <div className="flex justify-center items-center mt-20 ">
            <img
              src={load}
              className="w-[40px] h-[40px] flex justify-center items-center"
              alt=""
            />
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center mt-24 ">
            <img
              src={errorIcon}
              className="w-[50px] h-[50px] mb-4 flex justify-center items-center"
              alt=""
            />
            <span>Something went wrong.</span>
          </div>
        ) : (
          <>
            {requests.length != 0 ? (
              <>
                {requests.map((i) => {
                  console.log(i);
                  return <RequestTile i={i} />;
                })}
              </>
            ) : (
              <div className="flex justify-center flex-col text-slate-500 space-y-6 items-center mt-32">
                <img
                  src={noEntries}
                  className="w-[100px] h-[100px] flex justify-center items-center"
                  alt=""
                />
                <span>No Requests Found</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

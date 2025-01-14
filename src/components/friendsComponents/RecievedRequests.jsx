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
    <div className="flex flex-col space-y-2 relative flex-grow p-1 mob:p-3 rounded-xl bg-white mt-3 ">
      {/* <div className="flex justify-end"> */}
      <button
        onClick={fetchRequests}
        disabled={loading}
        className="disabled:pointer-events-none disabled:opacity-50 absolute top-[-50px] mob:top-[-52px] lg:top-[-56px] p-2 bg-white rounded-full hover:bg-slate-100 duration-500 z-[1]  left-[110px] mob:left-[145px] translate-x-[50%]"
      >
        <img
          src={reload}
          className="w-[15px] h-[15px] flex justify-center items-center"
          alt=""
        />
      </button>
      {/* </div> */}
      <div className=" flex flex-grow flex-col p-2 mob:p-4 py-8 pt-0 overflow-auto customScrollThin max-tab:min-h-[500px] tab:h-[500px] space-y-4 ">
        {loading ? (
          <div className="flex justify-center items-center mt-20 ">
            <img
              src={load}
              className="w-[30px] h-[30px] flex justify-center items-center"
              alt=""
            />
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center text-sm items-center mt-24 ">
            <img
              src={errorIcon}
              className="w-[40px] h-[40px] mb-4 flex justify-center items-center"
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
              <div className="flex justify-center text-xs sm:text-sm flex-col text-slate-500 space-y-3 sm:space-y-4 items-center mt-24 sm:mt-32">
                <img
                  src={noEntries}
                  className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex justify-center items-center"
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

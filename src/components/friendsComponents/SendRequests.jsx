import user from "../../assets/user.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import { Link } from "react-router-dom";
import noEntries from "../../assets/noEntries.png";
import reload from "../../assets/reload.png";
import { format } from "date-fns";

export default function SendRequests() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);

  async function fetchRequests() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/getsentrequests",
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
    <div className="flex flex-grow relative p-3 rounded-xl bg-white mt-4 ">
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
      <div className=" flex flex-grow flex-col p-4 py-8 overflow-auto customScrollThin h-[830px] space-y-6  ">
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
                  return (
                    <>
                      <div className="flex relative flex-col">
                        <div className="w-[20px] h-[20px] bg-slate-200 rotate-45 absolute bottom-[50px] left-1 translate-x-[-50%] translate-y-[50%]"></div>

                        <div className="flex group duration-500 justify-between rounded-2xl p-3 pl-4 space-x-4 bg-slate-200">
                          <div className="space-x-12 flex ">
                            <Link to={`/profile/public/${i.userId}`}>
                              <img
                                src={i.profilePic || user}
                                className="w-[60px] h-[60px] rounded-full"
                                alt=""
                              />
                            </Link>
                            <div className="flex flex-col justify-center">
                              <span className="italic ">Name</span>
                              <span className="w-[250px] bg-slate-100 px-2 rounded-md flex items-center">
                                <span className="flex max-w-[300px] text-lg overflow-clip flex-grow font-medium items-center">
                                  <OnlyXChars x={30} text={i.username} />
                                </span>
                              </span>
                            </div>

                            <div className="flex flex-col w-[170px] justify-center">
                              <span className="italic">User ID</span>
                              <span className="flex bg-slate-100 px-2 rounded-md items-center font-medium text-lg">
                                <span className="font-semibold mr-2">#</span>{" "}
                                <span>{i.userId}</span>
                              </span>
                            </div>

                            <div className="flex flex-col w-[150px] justify-center">
                              <span className="italic">Request Status</span>
                              <span
                                style={{
                                  color:
                                    i.status === "sent"
                                      ? "blue"
                                      : i.status === "rejected"
                                      ? "red"
                                      : "green",
                                }}
                                className="bg-slate-100 px-2 rounded-md flex items-center font-medium text-lg"
                              >
                                {i.status === "sent"
                                  ? "Sent"
                                  : i.status === "rejected"
                                  ? "Rejected"
                                  : "Accepted"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex mt-1 flex-grow justify-start pl-4 text-sm pr-4 text-neutral-500">
                          <span className="w-[270px]">
                            <span className="font-semibold mr-2">Sent On</span>{" "}
                            <span>{`${format(
                              new Date(i.sendDate),
                              "hh:mm a"
                            )} | ${new Date(i.sendDate).toDateString()}`}</span>
                          </span>
                          {i.resolvedDate ? (
                            <span className="ml-8">
                              <span className="font-semibold capitalize mr-2">
                                {i.status} On
                              </span>{" "}
                              <span>
                                {`${format(
                                  new Date(i.resolvedDate),
                                  "hh:mm a"
                                )} | ${new Date(
                                  i.resolvedDate
                                ).toDateString()}`}
                              </span>
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </>
                  );
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

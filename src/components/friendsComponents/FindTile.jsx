import { useState } from "react";
import addFriend from "../../assets/addFriend.png";
import user from "../../assets/user.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { Link } from "react-router-dom";
import waiting from "../../assets/waiting.png";
import load from "../../assets/loader.gif";
import exclamation from "../../assets/exclamation.png";

export default function FindTile({ i }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(i.waiting);

  async function sendRequest() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/sendrequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: i.email,
            userId: i.userId,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      setSent(result);
      if (result === "recieved") {
        setError("Request Already Recieved");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex group duration-500 rounded-full justify-between p-1 space-x-6 bg-slate-200">
        <div className="space-x-8 flex text-xs ">
          <Link to={`/profile/public/${i.userId}`}>
            <img
              src={i.profilePic || user}
              className="w-[50px] h-[50px] rounded-full"
              alt=""
            />
          </Link>
          <div className="flex flex-col justify-center">
            <span className="italic">Name</span>
            <span className="w-[200px] bg-slate-100 px-2 rounded-[4px] flex items-center">
              <span className="flex text-sm overflow-clip flex-grow font-medium items-center">
                <OnlyXChars x={20} text={i.username} />
              </span>
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="italic">User ID</span>
            <span className="flex bg-slate-100 px-2 rounded-[4px] w-[140px] items-center font-medium text-sm">
              <span className="font-semibold mr-2">#</span>{" "}
              <span>{i.userId}</span>
            </span>
          </div>

          <div className="flex flex-col w-[120px] justify-center">
            <span className="italic">Status</span>
            <span
              style={{
                color: i.status === "User" ? "blue" : "green",
              }}
              className="flex bg-slate-100 px-2 rounded-[4px] items-center font-medium text-sm"
            >
              {i.status}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {error ? (
            <div className="text-red-500 font-medium flex space-x-[6px] text-xs items-center">
              <img src={exclamation} className="w-[13px] h-[13px]" alt="" />
              <span className="">{error}</span>
            </div>
          ) : null}
          <div className="flex items-center pr-2">
            {loading ? (
              <div className="p-2">
                <img
                  src={load}
                  className="flex justify-center items-center w-[25px] h-[25px]"
                  alt=""
                />
              </div>
            ) : i.status === "User" && sent ? (
              <>
                <span className="capitalize flex items-center text-sm mr-3 font-medium">
                  {sent}
                </span>
                <div className="p-2">
                  <img
                    src={waiting}
                    className="flex justify-center items-center w-[20px] h-[20px]"
                    alt=""
                  />
                </div>
              </>
            ) : i.status === "User" && !sent ? (
              <button
                onClick={sendRequest}
                className="rounded-xl p-2 hover:bg-slate-100 duration-500"
              >
                <img
                  src={addFriend}
                  className="flex justify-center items-center w-[20px] h-[20px]"
                  alt=""
                />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

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
      <div className="flex group duration-500 rounded-full justify-between p-2 space-x-6 bg-slate-200">
        <div className="space-x-12 flex ">
          <Link to={`/profile/public/${i.userId}`}>
            <img
              src={i.profilePic || user}
              className="w-[60px] h-[60px] rounded-full"
              alt=""
            />
          </Link>
          <div className="flex flex-col justify-center">
            <span className="italic">Name</span>
            <span className="w-[250px] bg-slate-100 px-2 rounded-md flex items-center">
              <span className="flex max-w-[300px] text-lg overflow-clip flex-grow font-medium items-center">
                <OnlyXChars x={30} text={i.username} />
              </span>
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="italic">User ID</span>
            <span className="flex bg-slate-100 px-2 rounded-md w-[150px] items-center font-medium text-lg">
              <span className="font-semibold mr-2">#</span>{" "}
              <span>{i.userId}</span>
            </span>
          </div>

          <div className="flex flex-col w-[140px] justify-center">
            <span className="italic">Status</span>
            <span
              style={{
                color: i.status === "User" ? "blue" : "green",
              }}
              className="flex bg-slate-100 px-2 rounded-md items-center font-medium text-lg"
            >
              {i.status}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {error ? (
            <div className="text-red-500 font-medium flex space-x-2 items-center">
              <img src={exclamation} className="w-[17px] h-[17px]" alt="" />
              <span className="">{error}</span>
            </div>
          ) : null}
          <div className="flex items-center pr-2">
            {loading ? (
              <div className="p-3">
                <img
                  src={load}
                  className="flex justify-center items-center w-[30px] h-[30px]"
                  alt=""
                />
              </div>
            ) : i.status === "User" && sent ? (
              <>
                <span className="capitalize flex items-center text-lg mr-4 font-medium">
                  {sent}
                </span>
                <div className="p-3">
                  <img
                    src={waiting}
                    className="flex justify-center items-center w-[25px] h-[25px]"
                    alt=""
                  />
                </div>
              </>
            ) : i.status === "User" && !sent ? (
              <button
                onClick={sendRequest}
                className="rounded-2xl p-3 hover:bg-slate-100 duration-500"
              >
                <img
                  src={addFriend}
                  className="flex justify-center items-center w-[25px] h-[25px]"
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

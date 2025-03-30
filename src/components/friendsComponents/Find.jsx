import search from "../../assets/search.png";
import people from "../../assets/people.png";
import { useState } from "react";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import cross2 from "../../assets/cross2.png";
import errorIcon from "../../assets/error.png";
import FindTile from "./FindTile";
import { ErrorBox, EmptyBox, ErrorText } from "../../UIComponents/NoneFound";

export default function Find() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [func, setFunc] = useState(null);

  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchPeople(value) {
    setError(null);
    setLoading(true);
    if (value === "") {
      setResults(null);
      setLoading(false);
    } else {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/friends/getpeople",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              value: value,
            }),
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw "failed";
        }
        const result = await res.json();
        console.log(result);
        setResults(result);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
  }

  function searchChange(event) {
    setLoading(true);
    if (func) {
      clearTimeout(func);
    }
    const newFunc = setTimeout(() => {
      console.log("fetching");
      fetchPeople(event.target.value.toLowerCase().trim());
    }, 2000);
    setFunc(newFunc);
  }

  async function sendRequest(i) {
    setLoading2(true);
    setError2(null);
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
      changeWaitingStatus(i.userId, result);
      if (result === "recieved") {
        setError2("Request Already Recieved");
      }
      setLoading2(false);
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setError2("Failed");
      setLoading2(false);
    }
  }

  function changeWaitingStatus(id, val) {
    console.log(id, val);
    setResults((preval) => {
      const newRes = JSON.parse(JSON.stringify(preval));
      const ind = newRes.findIndex((i) => i.userId === id);
      const obj = newRes.find((i) => i.userId === id);
      newRes[ind] = { ...obj, waiting: val };
      console.log(newRes);
      return newRes;
    });
  }

  function openModal(obj) {
    setError2(null);
    setLoading2(false);
    setShowModal(obj);
  }

  return (
    <div
      style={{ height: "calc( 100%  )" }}
      className="flex flex-grow flex-col"
    >
      <div className="bg-white p-2 sm:p-3 rounded-lg px-2 sm:px-3 flex items-center">
        <img
          src={search}
          className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] mr-3 sm:mr-4 flex justify-center items-center"
          alt=""
        />
        <input
          type="text"
          placeholder="Search Username or UserID"
          onChange={(event) => searchChange(event)}
          className="py-1 px-[6px] sm:px-2 text-xs sm:text-sm border-b border-neutral-400 focus:outline-none flex-grow"
        />
      </div>
      <div
        style={{ height: "calc( 100% - 60px )" }}
        className="mt-2 bg-white  px-2 mob:px-2 py-0 relative rounded-lg flex flex-col"
      >
        {showModal ? (
          <div className="w-full h-full absolute top-0 left-0 backdrop-blur rounded-lg flex justify-center items-center">
            <div className="bg-white relative shadow-md rounded-lg p-4 px-6 flex flex-col items-center">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-1 right-1"
              >
                <img src={cross2} className="w-[20px] h-[20px]" alt="" />
              </button>
              <span className="text-sm font-semibold ">
                Send Friend Request?
              </span>
              <span className="text-xs text-center my-2 min-w-[200px] max-w-[250px]">
                Do you really want to send <br />
                <span className="font-medium">{`@${showModal.username}`}</span>{" "}
                friend request?
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
                      onClick={() => sendRequest(showModal)}
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
          style={{ height: "calc( 100% - 20px )" }}
          className="px-2 py-0 flex  overflow-auto specialScrollLight flex-col space-y-[10px] sm:space-y-4  my-2 sm:my-3 "
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
              {results === null ? (
                <div className="flex justify-center gap-y-3 sm:gap-y-4 text-xs sm:text-sm flex-col text-slate-300  items-center flex-grow">
                  <img
                    src={people}
                    className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] flex justify-center items-center"
                    alt=""
                  />
                  <span className="text-center">
                    Search People by Full Name or Username
                  </span>
                </div>
              ) : results.length != 0 ? (
                <>
                  {results.map((i) => {
                    return <FindTile i={i} setShowModal={openModal} />;
                  })}
                </>
              ) : (
                <EmptyBox
                  textColor="#cbd5e1"
                  IconSize={60}
                  gap={12}
                  textSize={15}
                  msg="No User Found"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

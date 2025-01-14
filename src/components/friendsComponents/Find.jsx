import search from "../../assets/search.png";
import people from "../../assets/people.png";
import { useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import FindTile from "./FindTile";
import noEntries from "../../assets/noEntries.png";

export default function Find() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [func, setFunc] = useState(null);

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

  return (
    <div className="flex flex-grow flex-col">
      <div className="bg-white p-2 sm:p-3 rounded-xl px-3 sm:px-4 flex items-center">
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
      <div className="mt-3 bg-white  p-2 mob:p-4  rounded-xl flex flex-col">
        <div className="overflow-auto space-y-3 customScrollThin p-1 mob:p-4 max-tab:min-h-[500px] tab:h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center mt-20 ">
              <img
                src={load}
                className="w-[30px] h-[30px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center text-sm items-center mt-28 ">
              <img
                src={errorIcon}
                className="w-[40px] h-[40px] mb-3 flex justify-center items-center"
                alt=""
              />
              <span>Something went wrong.</span>
            </div>
          ) : (
            <>
              {results === null ? (
                <div className="flex justify-center space-y-3 sm:space-y-4 text-xs sm:text-sm flex-col text-slate-400  items-center mt-24 sm:mt-32">
                  <img
                    src={people}
                    className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex justify-center items-center"
                    alt=""
                  />
                  <span className="text-center">
                    Search People by Username or UserID
                  </span>
                </div>
              ) : results.length != 0 ? (
                <>
                  {results.map((i) => {
                    return <FindTile i={i} />;
                  })}
                </>
              ) : (
                <div className="flex justify-center text-xs sm:text-sm flex-col text-slate-500 space-y-3 sm:space-y-4 items-center mt-24 sm:mt-32">
                  <img
                    src={noEntries}
                    className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex justify-center items-center"
                    alt=""
                  />
                  <span>No Users Found</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

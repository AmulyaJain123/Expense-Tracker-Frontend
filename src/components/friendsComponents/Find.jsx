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
      <div className="bg-white p-4 rounded-xl px-6 flex items-center">
        <img
          src={search}
          className="w-[30px] h-[30px] mr-6 flex justify-center items-center"
          alt=""
        />
        <input
          type="text"
          placeholder="Search Username or UserID"
          onChange={(event) => searchChange(event)}
          className="py-1 px-2 text-lg border-b border-neutral-400 focus:outline-none flex-grow"
        />
      </div>
      <div className="mt-4 bg-white  p-4  rounded-xl flex flex-col">
        <div className="overflow-auto space-y-4 customScrollThin p-4 h-[800px]">
          {loading ? (
            <div className="flex justify-center items-center mt-48 ">
              <img
                src={load}
                className="w-[40px] h-[40px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center mt-44 ">
              <img
                src={errorIcon}
                className="w-[50px] h-[50px] mb-4 flex justify-center items-center"
                alt=""
              />
              <span>Something went wrong.</span>
            </div>
          ) : (
            <>
              {results === null ? (
                <div className="flex justify-center space-y-6 flex-col text-slate-400  items-center mt-32">
                  <img
                    src={people}
                    className="w-[100px] h-[100px] flex justify-center items-center"
                    alt=""
                  />
                  <span>Search People by Username or UserID</span>
                </div>
              ) : results.length != 0 ? (
                <>
                  {results.map((i) => {
                    return <FindTile i={i} />;
                  })}
                </>
              ) : (
                <div className="flex justify-center flex-col text-slate-500 space-y-6 items-center mt-32">
                  <img
                    src={noEntries}
                    className="w-[100px] h-[100px] flex justify-center items-center"
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

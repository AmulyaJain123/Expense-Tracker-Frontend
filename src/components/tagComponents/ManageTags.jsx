import search from "../../assets/search.png";
import { useState, useEffect, useRef } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import cross from "../../assets/cancel.png";
import exclamation from "../../assets/exclamation.png";

export default function ManageTags() {
  const [fetchedData, setFetchedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [addInput, setAddInput] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const addTagRef = useRef();

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      inputRef.current.value = "";
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/vault/gettags",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      } else {
        const data = await res.json();
        setFilteredData(data);
        setFetchedData(data);
      }
    } catch (err) {
      console.log(err);
      setFetchedData(false);
    }
  }

  function loadTags() {
    setFetchedData(null);
    fetchTags();
  }

  function calcFilteredData(str) {
    if (str === "") {
      setFilteredData(fetchedData);
    } else {
      const ans = [];
      for (let i of fetchedData) {
        const word = i.toLowerCase().trim();
        if (word.includes(str)) {
          ans.push(i);
        }
      }
      setFilteredData(ans);
    }
  }

  function searchChange(event) {
    const str = event.target.value.toLowerCase().trim();
    calcFilteredData(str);
  }

  function deleteTag(i) {
    setMsg(null);
    setError(null);
    setConfirmation(i);
  }

  async function deleteConfirm() {
    const val = confirmation;
    setConfirmation(null);
    setLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/vault/deletetag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: val }),
          credentials: "include",
        }
      );
      setLoading(false);
      if (!res.ok) {
        throw "failed";
      } else {
        setMsg(`Successfully Deleted '${val}' Tag!!`);
        const newArr = filteredData.filter((i) => i != val);
        setFilteredData(newArr);
        const newArray = fetchedData.filter((i) => i != val);
        setFetchedData(newArray);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong.");
    }
  }

  async function addConfirm() {
    setConfirmation(null);
    setError(null);
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/vault/addtag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: addInput }),
          credentials: "include",
        }
      );
      setLoading(false);
      if (!res.ok) {
        const error = await res.json();
        setError(error.error);
      } else {
        setMsg(`'${addInput}' Added Successfully!!`);
        addTagRef.current.value = "";
        const preval = addInput.trim();
        setAddInput("");
        setFetchedData((p) => [preval, ...p]);
        if (
          preval
            .toLowerCase()
            .includes(inputRef.current.value.trim().toLowerCase())
        ) {
          setFilteredData((p) => [preval, ...p]);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong.");
    }
  }

  return (
    <div className="w-[90%] mt-12 flex flex-col mx-auto bg-white rounded-2xl p-3">
      <div className="w-full bg-slate-100 py-3 uppercase text-2xl text-center rounded-lg font-bold text-stone-700">
        Manage Tags
      </div>

      <div className="flex w-full flex-col flex-grow bg-slate-100 rounded-xl mt-3">
        <div className="flex m-3 space-x-3">
          <div className="flex space-x-4 px-3 items-center">
            <span className="font-semibold text-base ">SEARCH TAGS</span>
            <div className="rounded-full border-[1.5px] border-neutral-200 flex items-center pl-3 p-1 bg-[#fff]">
              <img src={search} className="w-[20px] h-[20px] mr-2" alt="" />
              <input
                type="text"
                ref={inputRef}
                disabled={loading}
                onChange={(event) => searchChange(event)}
                className=" focus:outline-none disabled:opacity-50  mr-4 font-medium bg-inherit py-1 px-2 text-xs"
              />
            </div>
          </div>
          <div className="flex space-x-4 px-3 items-center">
            <span className="font-semibold text-base ">ADD A TAG</span>
            <div className="rounded-full border-[1.5px] border-neutral-200 flex items-center pl-4 p-1 bg-[#fff]">
              <input
                type="text"
                ref={addTagRef}
                disabled={loading}
                onChange={(event) => setAddInput(event.target.value)}
                className=" focus:outline-none disabled:opacity-50  mr-4 font-medium bg-inherit py-1 px-2 text-xs"
              />
            </div>
            <button
              disabled={!addInput || loading}
              onClick={addConfirm}
              className="rounded-md border-[1.5px] disabled:pointer-events-none disabled:opacity-50 border-[#9d4edd] duration-500 hover:scale-105 hover:bg-white hover:text-[#9d4edd] py-[2px] px-3 font-medium text-[14px] bg-[#9d4edd] text-white "
            >
              ADD
            </button>
          </div>
        </div>

        <div className="h-[50px] text-xs border-y-2 border-white flex items-center">
          {confirmation != null ? (
            <div className="ml-4 text-xs">
              <span>
                Deleting a Tag will result in deletion of that Tag from all the
                documents as well. Are you sure you want to continue?
              </span>
              <button
                onClick={() => deleteConfirm()}
                className="rounded-md uppercase border-[1.5px] mx-2 border-[#9d4edd] duration-500 hover:scale-105 hover:bg-white hover:text-[#9d4edd] py-[0.5px] px-1 font-medium text-xs bg-[#9d4edd] text-white"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmation(null)}
                className="rounded-md uppercase border-[1.5px]  border-[#9d4edd] duration-500 hover:scale-105 hover:bg-white hover:text-[#9d4edd] py-[0.5px] px-1 font-medium text-xs bg-[#9d4edd] text-white"
              >
                No
              </button>
            </div>
          ) : loading ? (
            <div className="ml-6 flex">
              <div className="flex mr-6 items-center">
                <img
                  src={load}
                  className="w-[20px] h-[20px] flex justify-center items-center"
                  alt=""
                />
              </div>
              <span>Please wait.</span>
            </div>
          ) : error ? (
            <div className="ml-6 flex">
              <div className="flex mr-3 items-center">
                <img
                  src={exclamation}
                  className="w-[15px] h-[15px] flex justify-center items-center"
                  alt=""
                />
              </div>
              <span className="text-red-500">{error}</span>
            </div>
          ) : msg ? (
            <div className="ml-6 flex">
              <span className="text-green-500 capitalize">{msg}</span>
            </div>
          ) : null}
        </div>

        <div className="mx-4 mt-4 h-[400px] overflow-auto customScrollThin">
          {fetchedData === null ? (
            <div className="mt-32 flex justify-center">
              <img src={load} className="w-[40px] h-[40px]" alt="" />
            </div>
          ) : null}

          {fetchedData === false ? (
            <div className="flex flex-col mt-16 items-center">
              <img src={errorIcon} className="w-[50px] h-[50px] mb-3" alt="" />
              <p className="text-center text-sm">Failed to load resources.</p>
              <div className="mt-4">
                <button
                  onClick={loadTags}
                  className="px-3 py-[6px] w-[100px] text-xs rounded-md bg-blue-500 text-white border-[1.5px] border-blue-500 hover:scale-105 hover:text-blue-500 hover:bg-white hover hover:shadow-lg duration-500"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : null}

          {fetchedData != null &&
          fetchedData != false &&
          filteredData != null &&
          filteredData.length > 0 ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {filteredData.map((i) => {
                return (
                  <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                    <span>{i}</span>
                    <button
                      disabled={loading}
                      className="ml-2 hover:scale-110 duration-500"
                    >
                      <img
                        src={cross}
                        onClick={() => deleteTag(i)}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : fetchedData != null &&
            fetchedData != false &&
            filteredData != null &&
            filteredData.length === 0 ? (
            <div className="flex justify-center mt-16 text-sm">
              No Tags Found
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

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
    <div className="w-[90%] mt-16 flex flex-col mx-auto bg-white rounded-3xl p-4">
      <div className="w-full bg-slate-100 py-4 uppercase text-3xl text-center rounded-xl font-bold text-stone-700">
        Manage Tags
      </div>

      <div className="flex w-full flex-col flex-grow bg-slate-100 rounded-xl mt-4">
        <div className="flex m-4 space-x-4">
          <div className="flex space-x-6 px-4 items-center">
            <span className="font-semibold text-xl ">SEARCH TAGS</span>
            <div className="rounded-full border-2 border-neutral-200 flex items-center pl-4 p-1 bg-[#fff]">
              <img src={search} className="w-[25px] h-[25px] mr-2" alt="" />
              <input
                type="text"
                ref={inputRef}
                disabled={loading}
                onChange={(event) => searchChange(event)}
                className=" focus:outline-none disabled:opacity-50  mr-6 font-medium bg-inherit py-1 px-2 text-lg"
              />
            </div>
          </div>
          <div className="flex space-x-6 px-4 items-center">
            <span className="font-semibold text-xl ">ADD A TAG</span>
            <div className="rounded-full border-2 border-neutral-200 flex items-center pl-4 p-1 bg-[#fff]">
              <input
                type="text"
                ref={addTagRef}
                disabled={loading}
                onChange={(event) => setAddInput(event.target.value)}
                className=" focus:outline-none disabled:opacity-50  mr-6 font-medium bg-inherit py-1 px-2 text-lg"
              />
            </div>
            <button
              disabled={!addInput || loading}
              onClick={addConfirm}
              className="rounded-lg border-2 disabled:pointer-events-none disabled:opacity-50 border-[#9d4edd] duration-500 hover:scale-105 hover:bg-white hover:text-[#9d4edd] py-1 px-4 font-medium text-lg bg-[#9d4edd] text-white "
            >
              ADD
            </button>
          </div>
        </div>

        <div className="h-[70px] border-y-4 border-white flex items-center">
          {confirmation != null ? (
            <div className="ml-6">
              <span>
                Deleting a Tag will result in deletion of that Tag from all the
                documents as well. Are you sure you want to continue?
              </span>
              <button
                onClick={() => deleteConfirm()}
                className="rounded-lg uppercase border-2 mx-4 border-[#9d4edd] duration-500 hover:scale-105 hover:bg-white hover:text-[#9d4edd] py-[0.5px] px-2 font-medium text-base bg-[#9d4edd] text-white"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmation(null)}
                className="rounded-lg uppercase border-2  border-[#9d4edd] duration-500 hover:scale-105 hover:bg-white hover:text-[#9d4edd] py-[0.5px] px-2 font-medium text-base bg-[#9d4edd] text-white"
              >
                No
              </button>
            </div>
          ) : loading ? (
            <div className="ml-8 flex">
              <div className="flex mr-8 items-center">
                <img
                  src={load}
                  className="w-[25px] h-[25px] flex justify-center items-center"
                  alt=""
                />
              </div>
              <span>Please wait.</span>
            </div>
          ) : error ? (
            <div className="ml-8 flex">
              <div className="flex mr-4 items-center">
                <img
                  src={exclamation}
                  className="w-[20px] h-[20px] flex justify-center items-center"
                  alt=""
                />
              </div>
              <span className="text-red-500">{error}</span>
            </div>
          ) : msg ? (
            <div className="ml-8 flex">
              <span className="text-green-500 capitalize">{msg}</span>
            </div>
          ) : null}
        </div>

        <div className="mx-6 mt-6 h-[500px] overflow-auto customScrollThin">
          {fetchedData === null ? (
            <div className="mt-44 flex justify-center">
              <img src={load} className="w-[50px] h-[50px]" alt="" />
            </div>
          ) : null}

          {fetchedData === false ? (
            <div className="flex flex-col mt-20 items-center">
              <img src={errorIcon} className="w-[80px] h-[80px] mb-4" alt="" />
              <p className="text-center">Failed to load resources.</p>
              <div className="mt-8">
                <button
                  onClick={loadTags}
                  className="px-4 py-2 w-[120px] rounded-lg bg-blue-500 text-white border-2 border-blue-500 hover:scale-105 hover:text-blue-500 hover:bg-white hover hover:shadow-lg duration-500"
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
            <div className="flex flex-wrap gap-4 justify-center">
              {filteredData.map((i) => {
                return (
                  <div className="py-1 px-4 rounded-lg h-fit flex items-center text-lg capitalize bg-[#dc93f6] text-black">
                    <span>{i}</span>
                    <button
                      disabled={loading}
                      className="ml-2 hover:scale-110 duration-500"
                    >
                      <img
                        src={cross}
                        onClick={() => deleteTag(i)}
                        className="w-[20px] h-[20px] flex justify-center items-center"
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
            <div className="flex justify-center mt-20">No Tags Found</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

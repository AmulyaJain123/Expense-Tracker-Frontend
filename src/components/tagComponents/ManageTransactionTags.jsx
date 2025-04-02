import search from "../../assets/search.png";
import { useState, useEffect, useRef } from "react";
import load from "../../assets/loader.gif";
import cross from "../../assets/cancel.png";
import pencil from "../../assets/pencil.png";
import exclamation from "../../assets/exclamation.png";
import { ErrorBox } from "../../UIComponents/NoneFound";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function ManageTransactionTags() {
  const [fetchedData, setFetchedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [addInput, setAddInput] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [renaming, setRenaming] = useState(false);

  const [renameModal, setRenameModal] = useState(null);
  const [newName, setNewName] = useState("");
  const inputRef = useRef();
  const addTagRef = useRef();

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      inputRef.current.value = "";
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/gettags",
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
        import.meta.env.VITE_BACKEND_API + "/track/deletetag",
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
        import.meta.env.VITE_BACKEND_API + "/track/addtag",
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

  function closeHandle() {
    setNewName("");
    setRenameModal(null);
    setError2(null);
    setRenaming(false);
  }

  useEffect(() => {
    calcFilteredData(inputRef.current.value.trim().toLowerCase());
  }, [fetchedData]);

  async function renameConfirm() {
    setError2(null);
    setRenaming(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/edittag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preVal: renameModal, newVal: newName.trim() }),
          credentials: "include",
        }
      );
      setRenaming(false);
      if (!res.ok) {
        const error = await res.json();
        setError2(error.error);
      } else {
        setFetchedData((p) => {
          return p.map((i) => {
            if (i == renameModal) {
              return newName;
            }
            return i;
          });
        });
        closeHandle();
      }
    } catch (err) {
      console.log(err);
      setRenaming(false);
      setError2("Something went wrong.");
    }
  }

  return (
    <div className="w-[90%] mt-12 flex flex-col mx-auto bg-white rounded-2xl p-3">
      <div className="w-full bg-slate-100 py-3 uppercase text-2xl text-center rounded-lg font-bold text-stone-700">
        Manage Tags
      </div>
      {renameModal == null ? null : (
        <div className="bg-black/30 z-[9999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="bg-white rounded-xl w-[550px] p-3 flex flex-col">
            <div className="p-2 rounded-lg bg-slate-100 flex justify-center font-bold uppercase text-xl">
              Rename Tag
            </div>
            <div className="bg-slate-100 px-4 mt-3 rounded-lg p-2 flex flex-col">
              <div className="flex ">
                <div className="flex flex-col flex-1 items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    Old tag
                  </span>
                  <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                    <span>
                      <OnlyXChars text={renameModal} x={15} />
                    </span>
                    <div className="ml-2 hover:scale-110 duration-500">
                      <img
                        src={pencil}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="ml-1 hover:scale-110 duration-500">
                      <img
                        src={cross}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    new tag
                  </span>
                  <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                    <span>
                      <OnlyXChars
                        text={newName === "" ? "NULL" : newName}
                        x={15}
                      />
                    </span>
                    <div className="ml-2 hover:scale-110 duration-500">
                      <img
                        src={pencil}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="ml-1 hover:scale-110 duration-500">
                      <img
                        src={cross}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-2 flex  gap-x-4 items-center">
                <span className="text-sm uppercase font-medium">
                  Enter Tag Name
                </span>
                <input
                  type="text"
                  onChange={(event) => setNewName(event.target.value)}
                  className="rounded-md flex-grow text-xs p-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex mt-3 justify-center sm:justify-between gap-4">
              <div className="pl-3 flex items-center">
                {renaming ? (
                  <div className="sm:flex hidden items-center">
                    <img
                      src={load}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                ) : null}
                {error2 ? (
                  <div className="hidden sm:flex items-center space-x-[6px]">
                    <img
                      src={exclamation}
                      className="w-[14px] h-[14px] flex justify-center items-center"
                      alt=""
                    />{" "}
                    <span className="text-red-500 text-xs ">{error2}</span>
                  </div>
                ) : null}
              </div>
              <div className="flex text-sm gap-x-[10px]">
                <button
                  onClick={closeHandle}
                  className="p-1 px-3 mr-6 sm:mr-0 rounded-md bg-blue-500 text-white"
                >
                  Cancel
                </button>
                <button
                  className="p-1 px-3 rounded-md bg-red-500 text-white"
                  onClick={renameConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-grow flex-col rounded-lg bg-slate-100 gap-y-8 mt-3 ">
        <div className="flex flex-col flex-grow">
          <div className="flex   flex-grow">
            <div className="flex w-full flex-col flex-grow bg-inherit rounded-xl">
              <div className="flex m-3 space-x-3">
                <div className="flex space-x-4 px-3 items-center">
                  <span className="font-semibold text-base ">SEARCH TAGS</span>
                  <div className="rounded-full border-[1.5px] border-neutral-200 flex items-center pl-3 p-1 bg-[#fff]">
                    <img
                      src={search}
                      className="w-[20px] h-[20px] mr-2"
                      alt=""
                    />
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
                      Deleting a Tag will result in deletion of that tag from
                      all the transactions as well. Are you sure you want to
                      continue?
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

              <div className="mx-4 mt-4 h-[400px] flex overflow-auto customScrollThin">
                {fetchedData === null ? (
                  <div className="items-center flex-grow flex justify-center">
                    <img src={load} className="w-[40px] h-[40px]" alt="" />
                  </div>
                ) : null}

                {fetchedData === false ? (
                  <div className="flex flex-grow ">
                    <ErrorBox fontWeight={500} textSize={14} IconSize={45}>
                      <button
                        onClick={loadTags}
                        className="px-3 py-[6px] w-[100px] text-xs rounded-md bg-blue-500 text-white border-[1.5px] border-blue-500 hover:scale-105 hover:text-blue-500 hover:bg-white hover hover:shadow-lg duration-500"
                      >
                        Retry
                      </button>
                    </ErrorBox>
                  </div>
                ) : null}

                {fetchedData != null &&
                fetchedData != false &&
                filteredData != null &&
                filteredData.length > 0 ? (
                  <div className="flex flex-wrap h-fit flex-grow gap-3 justify-center">
                    {filteredData.map((i) => {
                      return (
                        <>
                          <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                            <span>{i}</span>
                            <button
                              disabled={loading}
                              onClick={() => setRenameModal(i)}
                              className="ml-2 hover:scale-110 duration-500"
                            >
                              <img
                                src={pencil}
                                className="w-[15px] h-[15px] flex justify-center items-center"
                                alt=""
                              />
                            </button>
                            <button
                              disabled={loading}
                              onClick={() => deleteTag(i)}
                              className="ml-1 hover:scale-110 duration-500"
                            >
                              <img
                                src={cross}
                                className="w-[15px] h-[15px] flex justify-center items-center"
                                alt=""
                              />
                            </button>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : fetchedData != null &&
                  fetchedData != false &&
                  filteredData != null &&
                  filteredData.length === 0 ? (
                  <div className="flex justify-center flex-grow mt-12 text-sm">
                    No Tags Found
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

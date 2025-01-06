import styles from "./Tags.module.css";
import { useState, useEffect, useRef } from "react";
import search from "../../assets/search.png";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import exclamation from "../../assets/exclamation.png";
import tick from "../../assets/selected.png";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const Tags = forwardRef(function Tags({ ...props }, ref) {
  const [fetchedData, setFetchedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

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
        const newArr = data.map((p) => {
          return {
            val: p,
            included: false,
          };
        });
        setFilteredData(newArr);
        setFetchedData(newArr);
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
        const word = i.val.toLowerCase().trim();
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

  async function addConfirm() {
    setError(null);
    setMsg(null);
    setLoading(true);
    const word = inputRef.current.value.trim();
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/vault/addtag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: word }),
          credentials: "include",
        }
      );
      setLoading(false);
      if (!res.ok) {
        const error = await res.json();
        setError(error.error);
      } else {
        setMsg(`'${word}' Added Successfully!!`);
        setFetchedData((p) => [{ val: word, included: false }, ...p]);
        if (
          word
            .toLowerCase()
            .includes(inputRef.current.value.trim().toLowerCase())
        ) {
          setFilteredData((p) => [{ val: word, included: false }, ...p]);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong.");
    }
  }

  function selectTag(tag) {
    setFetchedData((preval) => {
      const newArr = preval.map((i) => {
        if (i.val === tag) {
          i.included = !i.included;
        }
        return i;
      });
      return newArr;
    });
    calcFilteredData(inputRef.current.value.toLowerCase().trim());
  }

  useImperativeHandle(ref, () => {
    return {
      getData() {
        const arr = [];
        for (let i of fetchedData) {
          if (i.included) {
            arr.push(i.val);
          }
        }
        return arr;
      },
    };
  });

  return (
    <div className={`zigzag ${styles.main} pt-1 mx-auto`}>
      <div className="bg-slate-100 m-[10px] rounded-lg flex text-black justify-center items-center uppercase font-bold">
        Add Tags
      </div>

      <div className="flex h-[15px]">
        <div className="billCuts h-[15px] w-[15px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-[8px] w-full  border-b-[2.5px] border-dashed border-stone-200"></div>
          <div className=" w-full "></div>
        </div>
        <div className="billCuts h-[15px] w-[15px] rounded-l-full"></div>
      </div>

      <div className="flex justify-between ">
        {" "}
        <div className="p-4 text-xs w-full">
          <div className="mx-2 border-b-2 border-stone-300 text-stone-500 py-2 mt-4  bg-stone-100 text-center">
            To Apply a Tag, simply click on it and you will see the Applied Tags
            on the right. <br /> To Remove an Applied Tag, click on it again.
          </div>

          <div className="mx-2 border-b-2 border-stone-300 text-stone-500 py-2 mt-2 bg-stone-100 text-center">
            You can use the Search Bar for finding the desired Tag.
          </div>

          <div className="mx-2 border-b-2 border-stone-300 text-stone-500 py-2 mt-2 mb-8  bg-stone-100 text-center">
            If you want to Apply a Tag that is not in the Tag List, you can add
            the Tag to the list here itself, just click the ADD button.
          </div>

          <div className="flex space-x-4 w-full">
            <div className="p-1 rounded-lg mx-2 w-[70%] pb-0 bg-slate-100">
              <div className="font-bold rounded-md bg-white py-1 m-1 mb-2  text-lg uppercase text-center">
                Search Tags
              </div>
              <div className="bg-white pb-2 rounded-md mx-1">
                <div className="flex w-full pt-3 mx-4">
                  <div className="rounded-full border-[1.5px] border-neutral-200 flex items-center pl-3 p-1 bg-[#fff]">
                    <img
                      src={search}
                      className="w-[15px] h-[15px] mr-1"
                      alt=""
                    />
                    <input
                      type="text"
                      ref={inputRef}
                      disabled={loading}
                      onChange={(event) => searchChange(event)}
                      className=" focus:outline-none disabled:opacity-50 text-xs  mr-4 font-medium bg-inherit py-1 px-2 "
                    />
                  </div>

                  {true ? (
                    <button
                      onClick={addConfirm}
                      disabled={loading}
                      className=" h-fit py-[3px] px-2 my-auto disabled:pointer-events-none disabled:opacity-50 rounded-[8px] hover:text-[#9d4edd] hover:bg-white border-[1.5px] hover:scale-105 duration-500 border-[#9d4edd] bg-[#9d4edd] text-white font-medium ml-4 text-sm"
                    >
                      ADD
                    </button>
                  ) : null}
                </div>

                <div className="h-[40px] border-y-[1.5px] border-slate-100 items-center flex w-full my-3 flex-grow px-4">
                  {loading ? (
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
                    <div className="ml-6 flex items-center">
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
                    <div className="ml-6 text-xs flex">
                      <span className="text-green-500 capitalize">{msg}</span>
                    </div>
                  ) : null}
                </div>

                <div className="mx-2 my-2 mt-2 mb-2 h-[335px] px-3 py-3  overflow-auto customScrollThin">
                  {fetchedData === null ? (
                    <div className="mt-32 flex justify-center">
                      <img src={load} className="w-[40px] h-[40px]" alt="" />
                    </div>
                  ) : null}

                  {fetchedData === false ? (
                    <div className="flex flex-col mx-auto mt-24 items-center">
                      <img
                        src={errorIcon}
                        className="w-[50px] h-[50px] mb-3"
                        alt=""
                      />
                      <p className="text-center text-sm">
                        Failed to load resources.
                      </p>
                      <div className="mt-4">
                        <button
                          onClick={loadTags}
                          className="px-3 py-1 w-[80px] rounded-md bg-blue-500 text-white border-[1.5px] border-blue-500 hover:scale-105 hover:text-blue-500 hover:bg-white hover hover:shadow-lg duration-500"
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
                    <div className="flex flex-wrap  gap-3 justify-center">
                      {filteredData.map((i) => {
                        return (
                          <button
                            onClick={() => selectTag(i.val)}
                            className="py-1 relative px-3 rounded-md h-fit hover:scale-105 duration-500 flex items-center text-[14px] capitalize bg-[#dc93f6] text-black"
                          >
                            <span>{i.val}</span>
                            {i.included ? (
                              <div className="absolute -top-1 -right-1">
                                <img
                                  src={tick}
                                  className="w-[15px] h-[15px] flex justify-center items-center"
                                  alt=""
                                />
                              </div>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  ) : fetchedData != null &&
                    fetchedData != false &&
                    filteredData != null &&
                    filteredData.length === 0 ? (
                    <div className="flex justify-center text-sm">
                      No Tags Found
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className=" flex-grow flex flex-col bg-slate-100 py-2 rounded-md">
              <h1 className="font-bold rounded-md bg-white py-1 mx-2 text-lg uppercase text-center">
                Tags Applied
              </h1>
              <div className="bg-white flex  m-2 mb-0 rounded-md">
                <div className="flex-col overflow-auto py-4 items-center customScrollThin h-[430px] space-y-3 my-4 flex-grow flex mx-2">
                  {fetchedData &&
                    fetchedData.map((i) => {
                      if (i.included) {
                        return (
                          <button
                            onClick={() => selectTag(i.val)}
                            className="py-1 relative px-4 w-fit rounded-md h-fit hover:scale-105 duration-500 flex items-center text-[14px] capitalize bg-[#dc93f6] text-black"
                          >
                            <span>{i.val}</span>
                            {i.included ? (
                              <div className="absolute -top-1 -right-1">
                                <img
                                  src={tick}
                                  className="w-[15px] h-[15px] flex justify-center items-center"
                                  alt=""
                                />
                              </div>
                            ) : null}
                          </button>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Tags;

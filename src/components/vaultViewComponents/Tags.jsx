import styles from "./Tags.module.css";
import { useState, useEffect, useRef } from "react";
import search from "../../assets/search.png";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import selectIcon from "../../assets/selected.png";
import exclamation from "../../assets/exclamation.png";
import tick from "../../assets/selected.png";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const Tags = forwardRef(function Tags({ closeClick, applyFilter }, ref) {
  const [fetchedData, setFetchedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [active, setActive] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (fetchedData) {
      console.log(fetchedData);
      for (let i of fetchedData) {
        if (i.included) {
          setActive(true);
          return;
        }
      }
      setActive(false);
    }
  }, [fetchedData]);

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
    <div className={` pt-1 mx-auto`}>
      <div className="flex justify-between ">
        {" "}
        <div className="p-4 w-full">
          <div className="flex space-x-6 w-full">
            <div className="p-2 rounded-lg mx-2 w-[900px] pb-4 bg-slate-100">
              <div className="font-bold rounded-xl bg-white py-2 m-2 mb-4  text-2xl uppercase text-center">
                Search Tags
              </div>
              <div className="bg-white  rounded-lg mx-2">
                <div className="flex w-full pt-4 mx-4">
                  <div className="rounded-full border-2 border-neutral-200 flex items-center pl-4 p-1 bg-[#fff]">
                    <img
                      src={search}
                      className="w-[20px] h-[20px] mr-2"
                      alt=""
                    />
                    <input
                      type="text"
                      ref={inputRef}
                      onChange={(event) => searchChange(event)}
                      className=" focus:outline-none disabled:opacity-50  mr-6 font-medium bg-inherit py-1 px-2 text-base"
                    />
                  </div>
                </div>

                <div className="mx-2 my-8 mt-2 mb-2 h-[300px] px-4 py-4  overflow-auto customScrollThin">
                  {fetchedData === null ? (
                    <div className="mt-24 flex justify-center">
                      <img src={load} className="w-[50px] h-[50px]" alt="" />
                    </div>
                  ) : null}

                  {fetchedData === false ? (
                    <div className="flex flex-col mx-auto mt-12 items-center">
                      <img
                        src={errorIcon}
                        className="w-[70px] h-[70px] mb-4"
                        alt=""
                      />
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
                    <div className="flex flex-wrap  gap-4 justify-center">
                      {filteredData.map((i) => {
                        return (
                          <button
                            onClick={() => selectTag(i.val)}
                            className="py-1 relative px-4 rounded-lg h-fit hover:scale-105 duration-500 flex items-center text-lg capitalize bg-[#dc93f6] text-black"
                          >
                            <span>{i.val}</span>
                            {i.included ? (
                              <div className="absolute -top-2 -right-2">
                                <img
                                  src={tick}
                                  className="w-[20px] h-[20px] flex justify-center items-center"
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
                    <div className="flex justify-center">No Tags Found</div>
                  ) : null}
                </div>

                <div className="flex h-[15px]"></div>
              </div>
            </div>
            <div className=" flex-grow flex flex-col bg-slate-100 w-[300px] py-4 rounded-md">
              <h1 className="font-bold rounded-xl bg-white py-2 mx-4 text-2xl uppercase text-center">
                Tags Applied
              </h1>
              <div className="bg-white flex  m-4 mb-0 rounded-lg">
                <div className="flex-col overflow-auto py-4 items-center customScrollThin h-[340px] space-y-4 my-6 flex-grow flex mx-4">
                  {fetchedData &&
                    fetchedData.map((i) => {
                      if (i.included) {
                        return (
                          <button
                            onClick={() => selectTag(i.val)}
                            className="py-1 relative px-4 w-fit rounded-lg h-fit hover:scale-105 duration-500 flex items-center text-lg capitalize bg-[#dc93f6] text-black"
                          >
                            <span>{i.val}</span>
                            {i.included ? (
                              <div className="absolute -top-2 -right-2">
                                <img
                                  src={tick}
                                  className="w-[20px] h-[20px] flex justify-center items-center"
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
          <div className="flex mt-4 justify-end space-x-4">
            <button
              onClick={closeClick}
              className="flex rounded-lg w-[200px] px-4 border-2 border-red-500 hover:bg-white hover:text-red-500 duration-500 bg-red-500 text-white font-semibold text-xl justify-center py-2 "
            >
              Cancel
            </button>
            <button
              disabled={!active}
              onClick={applyFilter}
              className="flex px-4 w-[200px] disabled:pointer-events-none disabled:opacity-40 rounded-lg border-2 border-green-500 hover:bg-white hover:text-green-500 duration-500 bg-green-500 text-white font-semibold text-xl justify-center py-2 "
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Tags;

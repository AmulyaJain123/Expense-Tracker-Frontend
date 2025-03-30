import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { universalActions } from "../../store/main";
import styles from "./InOut.module.css";
import { compareAsc, format, isAfter } from "date-fns";
import RedButton from "../../UIComponents/RedButton";
import NiceButton from "../../UIComponents/NiceButton";
import Loading from "./Loading";
import { Switch } from "@mui/material";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { ErrorBox, ErrorText } from "../../UIComponents/NoneFound";
import search from "../../assets/search.png";
import tick from "../../assets/selected.png";
import load from "../../assets/loader.gif";

const Input = styled.input``;

const typeArr = ["outgoing", "incoming"];

export default function InOut({ type, data }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState(["null"]);
  const [nameError, setNameError] = useState(null);
  const [amountError, setAmountError] = useState(null);
  const [toNameError, setToNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const date2Ref = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const nameRef = useRef();
  const amountRef = useRef();
  const toNameRef = useRef();
  const [name, setName] = useState("");
  const [amt, setAmt] = useState("");
  const [toName, setToName] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeChecked, setTimeChecked] = useState(true);
  const descRef = useRef();
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const [fetchedTags, setFetchedTags] = useState(data.tags);

  function nameChange(event) {
    const name = event.target.value.trim();
    setName(name);
    if (name === "") {
      setNameError("Transaction name cannot be empty");
    } else {
      setNameError(null);
    }
  }

  useEffect(() => {
    const inputs = document.querySelectorAll(".disableScroll");
    inputs.forEach((i) => {
      i.addEventListener(
        "wheel",
        (event) => {
          event.preventDefault();
          return;
        },
        { passive: false }
      );
    });
  }, []);

  useEffect(() => {
    setCategory(["null"]);
  }, [type]);

  function amountChange(event) {
    const amt = parseFloat(event.target.value);
    setAmt(amt);
    if (amt === "" || !amt || amt === 0 || amt < 0) {
      setAmountError("Transaction amount has to be positive");
    } else if (amt >= Number.MAX_VALUE) {
      setAmountError(
        `Transaction amount too large. Must lie in range (0,${Number.MAX_VALUE})`
      );
    } else {
      setAmountError(null);
    }
  }

  function descChange(event) {
    setDesc(event.target.value);
  }

  function toNameChange(event) {
    const name = event.target.value.trim();
    setToName(name);
    if (name === "") {
      setToNameError("Reciever/Sender Name cannot be empty");
    } else {
      setToNameError(null);
    }
  }

  function dateChange(event) {
    const enteredDate = event.target.value;
    console.log(enteredDate);
    console.log(
      new Date(enteredDate),
      new Date(),
      isAfter(new Date(enteredDate), new Date())
    );
    setDate(enteredDate ? new Date(enteredDate) : "");
    if (enteredDate === "") {
      setDateError("Date & Time Field cannot be empty");
    } else if (
      enteredDate &&
      compareAsc(new Date(enteredDate), new Date()) > 0
    ) {
      setDateError("Transaction cannot be in future");
    } else {
      setDateError(null);
    }
  }

  function discardHandle() {
    navigate("/track");
  }

  function disableCheck() {
    if (
      nameError != null ||
      amountError != null ||
      toNameError != null ||
      dateError != null ||
      nameRef.current?.value === "" ||
      amountRef.current?.value === "" ||
      toNameRef.current?.value === "" ||
      dateRef.current?.value === ""
    ) {
      return true;
    }
    return false;
  }

  async function clickHandle() {
    setLoading("load");
    const obj = {
      transactionName: nameRef.current.value.trim(),
      transactionAmount: parseFloat(amountRef.current.value),
      from: type === 0 ? "Me" : toNameRef.current.value.trim(),
      to: type === 1 ? "Me" : toNameRef.current.value.trim(),
      dateTime: timeChecked
        ? new Date(date).toUTCString()
        : new Date(new Date(date).setHours(0, 0, 0, 0)).toUTCString(),
      createdOn: new Date().toUTCString(),
      transactionType: type === 0 ? "outgoing" : "incoming",
      category: [type === 0 ? "outgoing" : "incoming", ...category],
      desc: descRef.current.value.trim(),
      tags: fetchedTags.filter((i) => i.included).map((j) => j.val),
    };
    console.log(obj);
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/createtransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw "failed";
      } else {
        setLoading("success");
      }
    } catch (err) {
      console.log(err);
      setLoading("error");
    }
  }

  function retry() {
    clickHandle();
  }

  function changeMode(str) {
    setLoading(str);
  }

  function dateNTimeModeChange(event) {
    setTimeChecked(event.target.checked);
  }

  async function addConfirm() {
    setError(null);
    setMsg(null);
    setLoading2(true);
    const word = inputRef.current.value.trim();
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/addtag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: word }),
          credentials: "include",
        }
      );
      setLoading2(false);
      if (!res.ok) {
        const error = await res.json();
        setError(error.error);
      } else {
        setMsg(`'${word}' Added Successfully!!`);
        setFetchedTags((p) => [{ val: word, included: false }, ...p]);
      }
    } catch (err) {
      console.log(err);
      setLoading2(false);
      setError("Something went wrong.");
    }
  }

  function selectTag(tag) {
    setFetchedTags((preval) => {
      const newArr = preval.map((i) => {
        if (i.val === tag) {
          i.included = !i.included;
        }
        return i;
      });
      return newArr;
    });
  }

  return (
    <>
      <div className={`${styles.main} flex-col xl:flex-row flex-grow w-full`}>
        <div className="p-3 bg-white w-[50%] flex flex-col space-y-3  rounded-xl">
          {loading != false ? (
            <Loading retry={retry} changeMode={changeMode} mode={loading} />
          ) : null}
          <div
            id={styles.largeTitle}
            className="rounded-lg font-bold text-center bg-slate-100 p-2 uppercase"
          >
            Transaction Info
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-3 p-3 rounded-lg bg-slate-100">
              <span
                id={styles.mediumTitle}
                className="p-[6px] px-4 font-semibold text-white bg-black rounded-md"
              >
                Transaction Name
              </span>
              <Input
                id={styles.inputBox}
                className="flex-grow p-[6px] px-3  bg-white  text-stone-600 rounded-md"
                placeholder="Name"
                onChange={(event) => nameChange(event)}
                type="text"
                ref={nameRef}
              />
            </div>
            <div className="flex-grow  flex items-center my-[6px] h-[20px]">
              {nameError != null ? (
                <div className="min-h-[20px] mx-[4px] my-[6px] py-1 flex-grow flex text-xs text-center items-center px-2 rounded-md bg-red-200 text-black ">
                  <i className="fi fi-rs-exclamation mr-3 text-sm flex justify-center items-center"></i>
                  <span className={`${styles.error}`}>{nameError}</span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-3 p-3 rounded-lg bg-slate-100">
              <span
                id={styles.mediumTitle}
                className="p-[6px] px-4 font-semibold text-white bg-black rounded-md"
              >
                Transaction Amount
              </span>
              <div className="flex space-x-4">
                <Input
                  id={styles.inputBox}
                  className="flex-grow disableScroll p-[6px] pl-3 bg-white  text-stone-600 rounded-md"
                  type="number"
                  onChange={(event) => amountChange(event)}
                  placeholder="Amount"
                  min={"0"}
                  ref={amountRef}
                />
              </div>
              <div className="flex bg-slate-200 rounded-md text-xs justify-between py-1 px-3 text-slate-400 font-medium">
                <span>Value Entered</span>
                <span>{isNaN(amt) || amt === "" ? "NULL" : amt}</span>
              </div>
            </div>
            <div className="flex-grow  flex items-center my-[6px] h-[20px]">
              {amountError != null ? (
                <div className="min-h-[20px] mx-[4px] my-[6px] py-1 flex-grow flex text-xs text-center items-center px-2 rounded-md bg-red-200 text-black  ">
                  <i className="fi fi-rs-exclamation mr-3 text-sm flex justify-center items-center"></i>
                  <span>{amountError}</span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-3">
              {type === 1 ? (
                <div className="flex  space-x-3">
                  <div className="flex flex-col flex-auto space-y-3 p-3 rounded-lg bg-slate-100">
                    <span
                      id={styles.mediumTitle}
                      className="p-[6px] px-4 font-semibold text-[15px] text-white bg-black  rounded-md"
                    >
                      From
                    </span>
                    <Input
                      id={styles.inputBox}
                      className="flex-grow p-[6px] pl-3 bg-white rounded-md text-xs"
                      onChange={(event) => toNameChange(event)}
                      ref={toNameRef}
                      placeholder="Name"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col flex-auto space-y-3 p-3 rounded-lg bg-slate-100">
                    <span
                      id={styles.mediumTitle}
                      className="p-[6px] px-3 font-semibold text-[15px] text-white bg-black text-center rounded-md"
                    >
                      To
                    </span>
                    <span className="flex-grow p-[6px] text-xs text-center pl-4 bg-white  text-stone-600 rounded-md">
                      Me
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex  space-x-3 ">
                  <div className="flex flex-col  flex-auto space-y-3 p-3 rounded-lg bg-slate-100">
                    <span
                      id={styles.mediumTitle}
                      className="p-[6px] px-3 text-[15px] font-semibold text-white bg-black text-center rounded-md"
                    >
                      From
                    </span>
                    <span className="flex-grow p-[6px] text-xs text-center pl-3 bg-white  text-stone-600 rounded-md">
                      Me
                    </span>
                  </div>
                  <div className="flex flex-col flex-auto space-y-3 p-3 rounded-lg bg-slate-100">
                    <span
                      id={styles.mediumTitle}
                      className="p-[6px] px-4 font-semibold text-white bg-black rounded-md"
                    >
                      To
                    </span>
                    <Input
                      id={styles.inputBox}
                      className="flex-grow p-[6px] pl-3 bg-white  text-stone-600 rounded-md"
                      $error={toNameError != null ? "true" : "false"}
                      onChange={(event) => toNameChange(event)}
                      type="text"
                      placeholder="Name"
                      ref={toNameRef}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex-grow  flex items-center my-[6px] h-[20px]">
              {toNameError != null ? (
                <div className="min-h-[20px] mx-[4px] my-[6px] py-1 flex-grow flex text-xs text-center items-center px-2 rounded-md bg-red-200 text-black  ">
                  <i className="fi fi-rs-exclamation mr-3 text-sm flex justify-center items-center"></i>
                  <span>{toNameError}</span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-3">
                <div className="flex flex-col flex-1 space-y-3 p-3 rounded-lg bg-slate-100">
                  <span
                    id={styles.mediumTitle}
                    className="p-[6px] px-3 relative font-semibold text-white bg-black pl-4 rounded-md"
                  >
                    Date & Time
                    <div className="absolute bg-white text-black font-medium text-sm rounded-md gap-x-1 flex items-center pl-3 top-[50%] right-2 translate-y-[-50%]">
                      <span>Time</span>
                      <Switch
                        size="small"
                        onChange={(event) => dateNTimeModeChange(event)}
                        defaultChecked
                      />
                    </div>
                  </span>
                  <div className="flex text-xs relative">
                    <Input
                      id={styles.inputBox}
                      ref={dateRef}
                      className="flex-grow focus:outline-none p-[6px] pl-3 bg-white text-stone-600 rounded-lg"
                      value={
                        date === ""
                          ? ""
                          : timeChecked
                          ? `${format(date, "yyyy-MM-dd")}T${format(
                              date,
                              "HH:mm"
                            )}`
                          : `${format(date, "yyyy-MM-dd")}`
                      }
                      onChange={(event) => dateChange(event)}
                      type={timeChecked ? "datetime-local" : "date"}
                    />

                    <span
                      onClick={() => dateRef.current.showPicker()}
                      className="w-[80%] hover:cursor-pointer h-full bg-white rounded-lg flex items-center pl-4 absolute left-0"
                    >
                      {timeChecked
                        ? date
                          ? format(date, "HH:mm | EEE, dd MMM yyyy")
                          : "NOT ENTERED"
                        : date
                        ? format(date, "EEE, dd MMM yyyy")
                        : "NOT ENTERED"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow  flex items-center my-[6px] h-[20px]">
              {dateError != null ? (
                <div className="min-h-[20px] mx-[4px] my-[6px] py-1 flex-grow flex text-xs text-center items-center px-2 rounded-md bg-red-200 text-black ">
                  <i className="fi fi-rs-exclamation mr-3 text-sm flex justify-center items-center"></i>
                  <span>{dateError}</span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-3 p-3 rounded-lg bg-slate-100">
              <span
                id={styles.mediumTitle}
                className="p-[6px] px-4 font-semibold text-white bg-black rounded-md"
              >
                Description
              </span>
              <textarea
                onChange={(event) => descChange(event)}
                id={styles.inputBox}
                name=""
                ref={descRef}
                placeholder="Description"
                rows={5}
                className="flex-grow resize-none p-[6px] px-3  bg-white  text-stone-600 rounded-md"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="p-3 h-fit bg-white w-1/2 flex flex-col space-y-3 rounded-xl ">
          <div
            id={styles.largeTitle}
            className="rounded-lg  font-bold text-center bg-slate-100 p-2 uppercase"
          >
            Category
          </div>
          <div className="bg-slate-100 rounded-lg gap-x-2 items-center flex p-2 px-3">
            <span className="text-sm font-semibold uppercase">
              Selected Category
            </span>
            <div className="text-xs font-medium flex items-center gap-x-2 pl-1">
              {category.length == 1 ? (
                <span className="bg-[#9d4edd] text-white p-1 px-[6px] rounded-md">
                  NULL
                </span>
              ) : category.length == 2 ? (
                <>
                  <span className="bg-[#000] text-white p-1 px-2 rounded-md">
                    <OnlyXChars text={category[0]} x={10} />
                  </span>
                  <span className="bg-[#9d4edd] text-white p-1 px-2 rounded-md">
                    <OnlyXChars text={category[1]} x={10} />
                  </span>
                </>
              ) : null}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-100">
            <div
              style={{ height: "calc( 670px )" }}
              className="flex flex-col overflow-auto specialScrollLight  text-xs space-y-3 p-1 pr-3"
            >
              <div>
                <button
                  style={{
                    backgroundColor:
                      category.length === 1 ? "#9d4edd" : "#dc93f6",
                    color: category.length === 1 ? "#fff" : "#000",
                  }}
                  disabled={category.length === 1}
                  onClick={() => setCategory(["null"])}
                  className="capitalize hover:scale-105 disabled:pointer-events-none duration-500 rounded-md py-[3px] px-[8px] font-medium"
                >
                  NULL
                </button>
              </div>
              {data[typeArr[type]].map((i) => {
                return (
                  <div className="flex flex-col ">
                    <span className="rounded-md py-1 text-sm font-medium bg-black text-white px-3 text-center">
                      {i.name}
                    </span>
                    <div className="mt-2 p-1 flex flex-wrap gap-[6px]">
                      {i.categories.map((j) => {
                        return (
                          <button
                            style={{
                              backgroundColor:
                                category.length === 2 &&
                                category[0] === i.name &&
                                category[1] === j
                                  ? "#9d4edd"
                                  : "#dc93f6",
                              color:
                                category.length === 2 &&
                                category[0] === i.name &&
                                category[1] === j
                                  ? "#fff"
                                  : "#000",
                            }}
                            onClick={() => setCategory([i.name, j])}
                            disabled={
                              category.length === 2 &&
                              category[0] === i.name &&
                              category[1] === j
                            }
                            className="capitalize hover:scale-105 disabled:pointer-events-none duration-500 rounded-md py-[3px] px-[8px] font-medium"
                          >
                            {j}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 h-fit w-full bg-white flex flex-col space-y-3 rounded-xl ">
        <div
          id={styles.largeTitle}
          className="rounded-lg text-xl font-bold text-center bg-slate-100 p-2 uppercase"
        >
          Tags
        </div>

        <div className="rounded-lg flex-col bg-slate-100">
          <div className=" pb-2 rounded-md ">
            <div className="flex w-full pt-3 mx-4">
              <div className="rounded-full border-[1.5px] border-white flex items-center pl-3 p-1 bg-[#fff]">
                <input
                  type="text"
                  ref={inputRef}
                  disabled={loading2}
                  className=" focus:outline-none disabled:opacity-50 text-xs  mr-4 font-medium bg-inherit py-1 px-2 "
                />
              </div>

              {true ? (
                <button
                  onClick={addConfirm}
                  disabled={loading2}
                  className=" h-fit py-[3px] px-2 my-auto disabled:pointer-events-none disabled:opacity-50 rounded-[8px] hover:text-[#9d4edd] hover:bg-white border-[1.5px] hover:scale-105 duration-500 border-[#9d4edd] bg-[#9d4edd] text-white font-medium ml-4 text-sm"
                >
                  ADD
                </button>
              ) : null}
            </div>

            <div className="h-[40px] border-y-[1.5px] border-white items-center flex w-full my-3 flex-grow px-4">
              {loading2 ? (
                <div className="ml-6 flex items-center">
                  <div className="flex mr-6 items-center">
                    <img
                      src={load}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                  <span className="text-[12px]">Please Wait</span>
                </div>
              ) : error ? (
                <div className="ml-6 flex items-center">
                  <ErrorText msg={error} textSize={12} gap={6} />
                </div>
              ) : msg ? (
                <div className="ml-6 text-xs flex">
                  <span className="text-green-500 capitalize">{msg}</span>
                </div>
              ) : null}
            </div>

            <div className="mx-2 my-2 mt-2 mb-2 flex h-[235px] px-3 py-3 justify-center overflow-auto specialScrollLight">
              {fetchedTags.length > 0 ? (
                <div className="flex flex-wrap h-fit gap-2 justify-center">
                  {fetchedTags.map((i) => {
                    return (
                      <button
                        onClick={() => selectTag(i.val)}
                        className="py-[2px] relative px-2 rounded-md h-fit hover:scale-105 duration-500 flex items-center text-[13px] capitalize bg-[#dc93f6] text-black"
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
              ) : fetchedTags.length === 0 ? (
                <EmptyBox
                  textColor="#cbd5e1"
                  IconSize={50}
                  textSize={15}
                  gap={12}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-grow w-full justify-between">
        <button onClick={discardHandle}>
          <RedButton text={"Discard"} />
        </button>
        <button
          className={disableCheck() ? "disabled" : ""}
          disabled={disableCheck()}
          onClick={clickHandle}
        >
          <NiceButton text={"Save"} />
        </button>
      </div>
    </>
  );
}

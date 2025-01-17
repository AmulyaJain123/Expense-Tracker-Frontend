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
  const dateRef = useRef();
  const timeRef = useRef();
  const nameRef = useRef();
  const amountRef = useRef();
  const toNameRef = useRef();
  const [name, setName] = useState("");
  const [amt, setAmt] = useState("");
  const [toName, setToName] = useState("");
  const [date, setDate] = useState(new Date());

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
      dateTime: new Date(date).toUTCString(),
      createdOn: new Date().toUTCString(),
      transactionType: type === 0 ? "outgoing" : "incoming",
      category: [type === 0 ? "outgoing" : "incoming", ...category],
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

  return (
    <>
      <div className={`${styles.main} flex-col xl:flex-row flex-grow w-full`}>
        <div className="p-3 h-fit bg-white w-[50%] flex flex-col space-y-3  rounded-xl">
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
                    className="p-[6px] px-3 font-semibold text-white bg-black text-center rounded-md"
                  >
                    Date & Time
                  </span>
                  <div className="flex text-xs relative">
                    <Input
                      id={styles.inputBox}
                      ref={dateRef}
                      className="flex-grow focus:outline-none p-[6px] pl-3 bg-white text-stone-600 rounded-lg"
                      value={
                        date === ""
                          ? ""
                          : `${format(date, "yyyy-MM-dd")}T${format(
                              date,
                              "HH:mm"
                            )}`
                      }
                      onChange={(event) => dateChange(event)}
                      type="datetime-local"
                    />
                    <span className="w-[80%] h-full bg-white rounded-lg flex items-center pl-4 absolute left-0">
                      {date
                        ? `${format(date, "HH:mm a")} | ${date.toDateString()}`
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
          </div>
        </div>
        <div className="p-3 h-fit bg-white w-1/2 flex flex-col space-y-3 rounded-xl ">
          <div
            id={styles.largeTitle}
            className="rounded-lg  font-bold text-center bg-slate-100 p-2 uppercase"
          >
            Category
          </div>
          <div className="flex flex-col text-xs space-y-3 p-3 rounded-lg bg-slate-100">
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

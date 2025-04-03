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
import { EmptyBox } from "../../UIComponents/NoneFound";
import exclamation from "../../assets/exclamation.png";

const Input = styled.input``;

const typeArr = ["outgoing", "incoming"];

export default function EditInOut({ type, data }) {
  const navigate = useNavigate();
  const [fetchedCategories, setFetchedCategories] = useState(data.categories);
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
  const [name, setName] = useState(data.transaction.transactionName);
  const [amt, setAmt] = useState(
    parseFloat(data.transaction.transactionAmount)
  );
  const [toName, setToName] = useState(
    type === 1 ? data.transaction.from : data.transaction.to
  );
  const [date, setDate] = useState(new Date(data.transaction.dateTime));
  const [timeChecked, setTimeChecked] = useState(true);
  const descRef = useRef();
  const [desc, setDesc] = useState(data.transaction.desc);
  const [msg, setMsg] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [fetchedTags, setFetchedTags] = useState(data.tags);
  const [filteredData, setFilteredData] = useState(data.tags);
  const [openModal, setOpenModal] = useState(null);
  const [error2, setError2] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [cat, setCat] = useState("");
  const [firstTime, setFirstTime] = useState(true);

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
    if (!firstTime) {
      setCategory(["null"]);
    } else {
      setCategory(data.transaction.category.slice(1));
      setFirstTime(false);
    }
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
    navigate(
      `/track/protected/transactions/view/${data.transaction.transactionId}`
    );
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
      transactionId: data.transaction.transactionId,
      transactionName: nameRef.current.value.trim(),
      transactionAmount: parseFloat(amountRef.current.value),
      from: type === 0 ? "Me" : toNameRef.current.value.trim(),
      to: type === 1 ? "Me" : toNameRef.current.value.trim(),
      dateTime: timeChecked
        ? new Date(date).toUTCString()
        : new Date(new Date(date).setHours(0, 0, 0, 0)).toUTCString(),
      editedOn: new Date().toUTCString(),
      transactionType: type === 0 ? "outgoing" : "incoming",
      category: [type === 0 ? "outgoing" : "incoming", ...category],
      desc: descRef.current.value.trim(),
      tags: fetchedTags.filter((i) => i.included).map((j) => j.val),
    };
    console.log(obj);
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/edittransaction",
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

  useEffect(() => {
    calcFilteredData(inputRef2.current.value.trim().toLowerCase());
  }, [fetchedTags]);

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

  function searchChange(event) {
    const str = event.target.value.toLowerCase().trim();
    calcFilteredData(str);
  }

  function calcFilteredData(str) {
    if (str === "") {
      setFilteredData(fetchedTags);
    } else {
      const ans = [];
      for (let i of fetchedTags) {
        const word = i.val.toLowerCase().trim();
        if (word.includes(str)) {
          ans.push(i);
        }
      }
      setFilteredData(ans);
    }
  }

  function closeHandle() {
    setNewName("");
    setOpenModal(null);
    setError2(null);
    setAdding(false);
    setCat("");
  }

  async function addGroup(stat) {
    setError2(null);
    setAdding(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/addcategoryonspot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value:
              stat == 1
                ? [type === 0 ? "outgoing" : "incoming", newName.trim()]
                : [
                    type === 0 ? "outgoing" : "incoming",
                    cat.trim(),
                    newName.trim(),
                  ],
          }),
          credentials: "include",
        }
      );
      setAdding(false);
      if (!res.ok) {
        const error = await res.json();
        setError2(error.error);
      } else {
        setFetchedCategories((p) => {
          let newP = JSON.parse(JSON.stringify(p));
          if (stat === 1) {
            newP[typeArr[type]].unshift({
              name: newName.trim(),
              categories: [],
            });
          } else {
            newP[typeArr[type]]
              .find(
                (i) => i.name.trim().toLowerCase() === cat.trim().toLowerCase()
              )
              ?.categories.unshift(newName.trim());
          }
          return newP;
        });
        closeHandle();
      }
    } catch (err) {
      console.log(err);
      setAdding(false);
      setError2("Something went wrong.");
    }
  }

  return (
    <>
      {openModal === 1 ? (
        <div className="bg-black/30 z-[9999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="bg-white rounded-xl w-[500px] p-3 flex flex-col">
            <div className="p-2 rounded-lg bg-slate-100 flex justify-center font-bold uppercase text-xl">
              Add group
            </div>
            <div className="bg-slate-100 px-4 mt-3 rounded-lg p-2 flex flex-col">
              <div className="mt-2 mb-2 flex  gap-x-4 items-center">
                <span className="text-sm uppercase font-medium">
                  Enter group Name
                </span>
                <input
                  type="text"
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Name"
                  className="rounded-md flex-grow text-xs p-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex mt-3 justify-center sm:justify-between gap-4">
              <div className="pl-3 flex items-center">
                {adding ? (
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
                  onClick={() => addGroup(1)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : openModal === 0 ? (
        <div className="bg-black/30 z-[9999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="bg-white rounded-xl w-[500px] p-3 flex flex-col">
            <div className="p-2 rounded-lg bg-slate-100 flex justify-center font-bold uppercase text-xl">
              Add Category
            </div>
            <div className="bg-slate-100 px-4 mt-3 rounded-lg p-2 flex flex-col">
              <div className="mt-2 mb-2 flex  gap-x-4 items-center">
                <span className="text-sm uppercase font-medium">
                  Enter group Name
                </span>
                <select
                  onChange={(event) => setCat(event.target.value)}
                  defaultValue={fetchedCategories[typeArr[type]][0].name}
                  name=""
                  id=""
                  className="text-xs p-1 px-2 rounded-md flex-grow"
                >
                  {fetchedCategories[typeArr[type]].map((k) => {
                    return (
                      <option value={k.name} className="capitalize">
                        {k.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mt-2 mb-2 flex  gap-x-4 items-center">
                <span className="text-sm uppercase font-medium">
                  Enter Category Name
                </span>
                <input
                  type="text"
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Name"
                  className="rounded-md flex-grow text-xs p-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex mt-3 justify-center sm:justify-between gap-3">
              <div className="pl-3 flex items-center">
                {adding ? (
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
                  onClick={() => addGroup(0)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={`${styles.main} flex-col xl:flex-row flex-grow w-full`}>
        <div className="p-3 bg-white w-[50%] flex flex-col space-y-3  rounded-xl">
          {loading != false ? (
            <Loading
              retry={retry}
              changeMode={changeMode}
              mode={loading}
              dest={`/track/protected/transactions/view/${data.transaction.transactionId}`}
              msg="Continue to Transactions"
            />
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
                defaultValue={data.transaction.transactionName}
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
                  defaultValue={parseFloat(data.transaction.transactionAmount)}
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
                      defaultValue={
                        data.transaction.transactionType === "outgoing"
                          ? ""
                          : data.transaction.from
                      }
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
                      defaultValue={
                        data.transaction.transactionType === "outgoing"
                          ? data.transaction.to
                          : ""
                      }
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
                defaultValue={data.transaction.desc}
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
          <div className=" gap-x-2 items-center flex ">
            <button
              onClick={() => {
                setCat(fetchedCategories[typeArr[type]][0].name);
                return setOpenModal(0);
              }}
              className="uppercase border-[1.5px] border-[#9d4edd] hover:text-[#9d4edd] hover:bg-white duration-500 font-medium text-xs p-1 px-3 rounded-md text-white bg-[#9d4edd]"
            >
              Add category
            </button>
            <button
              onClick={() => setOpenModal(1)}
              className="uppercase border-[1.5px] border-[#9d4edd] hover:text-[#9d4edd] hover:bg-white duration-500 font-medium text-xs p-1 px-3 rounded-md text-white bg-[#9d4edd]"
            >
              Add group
            </button>
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
              style={{ height: "calc( 635px )" }}
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
              {fetchedCategories[typeArr[type]].map((i) => {
                return (
                  <div className="flex flex-col ">
                    <span className="rounded-md py-1 text-sm font-medium bg-black text-white px-3 text-center">
                      {i.name}
                    </span>
                    <div className="mt-2 p-1 flex flex-wrap gap-[6px]">
                      {i.categories.length > 0 ? (
                        i.categories.map((j) => {
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
                        })
                      ) : (
                        <span className="bg-white px-2 text-neutral-500 font-medium text-xs p-1 rounded-md">
                          No Categories
                        </span>
                      )}
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
            <div className="flex ">
              <div className="flex items-center  pt-3 ml-4">
                <span className="uppercase font-semibold mr-2">
                  search tags
                </span>
                <div className="rounded-full border-[1.5px] border-white flex items-center pl-3 p-1 bg-[#fff]">
                  <img src={search} className="w-[20px] h-[20px] mr-1" alt="" />
                  <input
                    type="text"
                    ref={inputRef2}
                    disabled={loading2}
                    onChange={(event) => searchChange(event)}
                    className=" focus:outline-none disabled:opacity-50 text-xs  mr-4 font-medium bg-inherit py-1 px-2 "
                  />
                </div>
              </div>
              <div className="flex items-center  pt-3 mx-4">
                <span className="uppercase font-semibold mr-2">Add tags</span>
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
              {filteredData.length > 0 ? (
                <div className="flex flex-wrap h-fit gap-2 justify-center">
                  {filteredData.map((i) => {
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
              ) : filteredData.length === 0 ? (
                <EmptyBox
                  textColor="#cbd5e1"
                  IconSize={50}
                  textSize={15}
                  gap={12}
                  msg="No Tags Found"
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

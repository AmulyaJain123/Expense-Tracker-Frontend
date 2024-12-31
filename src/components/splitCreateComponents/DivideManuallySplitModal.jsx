import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { formatVal } from "../../util/algo";
import { amountInRange } from "../../util/algo";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import styled from "styled-components";
import styles from "./DivideManuallySplitModal.module.css";
import CommonModalPart from "./CommonModalPart";
import { v4 } from "uuid";

const Textarea = styled.textarea`
  resize: none;
`;

const Button = styled.button`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  font-weight: 600;
  text-transform: uppercase;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #38a169; /* bg-green-500 */
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  border: 2px solid #38a169; /* border-2 border-green-500 */
  transition: all 0.5s; /* duration-500 */

  &:hover {
    background-color: white;
    color: #38a169; /* text-green-500 */
    transform: translateY(-5px); /* translate-y-[-5px] */
  }
`;

const Div = styled.div`
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 30px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 30px;
  }
`;

export default function DivideManuallySplitModal() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.splitCreate.friends);
  const [error, setError] = useState(null);
  const [checkedNo, setCheckedNo] = useState(friends.length);
  const [lockedNo, setLockedNo] = useState(friends.length);
  const checkboxRef = useRef();
  const selectRef = useRef();
  const amountRef = useRef();
  const cancelRef = useRef();
  const tempInfo = useSelector((state) => state.splitCreate.addBillTempStore);

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

  const obj = {};
  for (let i of friends) {
    obj[i.name] = true;
  }
  const [lockedStates, setLockedStates] = useState(obj);

  function resetPreview(Name = "") {
    if (
      amountRef.current.value === "" ||
      parseFloat(amountRef.current.value) === 0 ||
      amountInRange(amountRef.current.value) === false
    ) {
      for (let i of checkboxRef.current.children) {
        i.children[0].children[2].value = "";
        i.children[0].children[2].placeholder = "";
        let NAme = i.children[0].children[0].innerText;
        setLockedStates((preval) => {
          return {
            ...preval,
            [NAme]: true,
          };
        });
      }
      return;
    }
    let totalVal = parseFloat(amountRef.current.value);
    let totalCount = 0;
    for (let i of checkboxRef.current.children) {
      const name = i.children[0].children[0].innerText;
      if (
        (lockedStates[name] === false || name === Name) &&
        i.children[0].children[2].value != "" &&
        amountInRange(i.children[0].children[2].value) === true
      ) {
        totalVal -= parseFloat(i.children[0].children[2].value);
        ++totalCount;
      } else if (i.children[1].children[0].checked === false) {
        ++totalCount;
      }
    }
    let eachVal = totalVal / (friends.length - totalCount);
    let finalVal = formatVal(eachVal);
    finalVal = finalVal.split(" ")[0];
    for (let i of checkboxRef.current.children) {
      const name = i.children[0].children[0].innerText;
      if (
        (lockedStates[name] === true || name === Name) &&
        i.children[1].children[0].checked
      ) {
        i.children[0].children[2].placeholder = parseFloat(finalVal);
      } else {
        i.children[0].children[2].placeholder = "";
      }
    }
    checkValidShareInput();
  }

  function addClick() {
    if (amountRef.current.value === "") {
      setError("Total Amount is mandatory.");
    } else if (amountRef.current.value === 0) {
      setError("Total Amount cannot be zero.");
    } else if (selectRef.current.value === "") {
      setError("Payer not Selected.");
    } else {
      const billName = tempInfo.billName;
      const billDate = tempInfo.billDate;
      const desc = tempInfo.description;
      const totalAmt = amountRef.current.value;
      const payedBy = selectRef.current.value;
      const shares = [];
      let totalEnteredAmount = 0;
      let totalCount = 0;
      for (let i of checkboxRef.current.children) {
        if (
          i.children[0].children[2].value === "" &&
          i.children[0].children[2].placeholder != "" &&
          parseFloat(i.children[0].children[2].placeholder) != 0
        ) {
          totalCount++;
        } else if (
          i.children[1].children[0].checked &&
          i.children[0].children[2].value != ""
        ) {
          totalEnteredAmount += parseFloat(i.children[0].children[2].value);
        }
      }
      const singleVal =
        (parseFloat(amountRef.current.value) - totalEnteredAmount) / totalCount;
      for (let i of checkboxRef.current.children) {
        const name = i.children[0].children[0].innerText;
        if (lockedStates[name] === false) {
          shares.push({
            name: name,
            share: parseFloat(i.children[0].children[2].value),
          });
        } else if (
          i.children[0].children[2].placeholder != "" &&
          parseFloat(i.children[0].children[2].placeholder) != 0
        ) {
          shares.push({ name: name, share: singleVal });
        }
      }
      const obj = {
        id: v4(),
        billName,
        billDate,
        desc,
        totalAmt,
        payedBy,
        shares,
      };
      // console.log(obj);
      dispatch(splitCreateActions.addBill(obj));
      cancelRef.current.click();
    }
  }

  function toggleCheckbox(event) {
    const name = event.target.value;
    if (event.target.checked) {
      event.target.parentElement.parentElement.children[0].children[2].disabled = false;
      resetPreview();
      setCheckedNo((preval) => {
        if (preval === 0) {
          setError(null);
        }
        return preval + 1;
      });
    } else {
      event.target.parentElement.parentElement.children[0].children[2].value =
        "";
      event.target.parentElement.parentElement.children[0].children[2].placeholder =
        "";
      event.target.parentElement.parentElement.children[0].children[2].disabled = true;
      event.target.parentElement.parentElement.children[0].children[1].disabled = true;
      resetPreview(name);
      setLockedStates((preval) => {
        return {
          ...preval,
          [name]: true,
        };
      });

      if (checkedNo === 1) {
        setError("No Shares Selected");
      }
      setCheckedNo((preval) => preval - 1);
    }
  }

  function amountChange(event) {
    resetPreview();
    if (event.target.value === "") {
      setError("Total Amount is mandatory.");
    } else if (parseFloat(event.target.value) === 0) {
      setError("Total Amount cannot be zero.");
    } else if (amountInRange(event.target.value) === false) {
      setError("Total Amount value out of range.");
    } else if (
      error === "Total Amount is mandatory." ||
      error === "Total Amount cannot be zero." ||
      error === "Total Amount value out of range." ||
      error === "First set the Total Amount value."
    ) {
      setError(null);
    }
  }
  function validAmountVal() {
    if (
      amountRef.current.value === "" ||
      parseFloat(amountRef.current.value) === 0 ||
      amountInRange(amountRef.current.value) === false
    ) {
      return false;
    }
    return true;
  }
  function checkValidShareInput() {
    let flag = false;
    for (let i of checkboxRef.current.children) {
      if (i.children[0].children[2].placeholder[0] === "-") {
        setError("Invalid Share Input");
        flag = true;
        break;
      }
    }
    if (!flag && error === "Invalid Share Input") {
      setError(null);
    }
  }
  function weightChange(event) {
    if (amountRef.current.value === "") {
      setError("First set the Total Amount value.");
    }

    const name = event.target.parentElement.children[0].innerText;
    if (lockedStates[name] && validAmountVal()) {
      setLockedStates((preval) => {
        return {
          ...preval,
          [name]: false,
        };
      });
    } else if (event.target.value == "") {
      setLockedStates((preval) => {
        return {
          ...preval,
          [name]: true,
        };
      });
    }
    resetPreview(name);
    if (
      amountInRange(event.target.value) === false ||
      parseFloat(event.target.value) === 0
    ) {
      setError(`Share Input value of '${name}' is out of range`);
    } else if (error === `Share Input value of '${name}' is out of range`) {
      setError(null);
    }
  }

  function selectChange(event) {
    if (event.target.value === "") {
      setError("Payer not Selected.");
    } else if (error === "Payer not Selected.") {
      setError(null);
    }
  }

  function reset() {
    for (let i of checkboxRef.current.children) {
      i.children[1].children[0].checked = true;
      i.children[0].children[2].value = "";
      i.children[0].children[2].placeholder = "";
      i.children[0].children[2].disabled = false;
    }
    dispatch(
      splitCreateActions.editBillTempStore({
        billName: "",
        billDate: "",
        description: "",
      })
    );
    amountRef.current.value = "";
    selectRef.current.value = "";
    setCheckedNo(friends.length);
    setLockedNo(friends.length);
    const obj = {};
    for (let i of friends) {
      obj[i.name] = true;
    }
    setLockedStates({ ...obj });
    setError(null);
  }

  function lockClick(event, name) {
    if (lockedStates[name]) {
      setLockedNo((preval) => preval - 1);
    } else {
      setLockedNo((preval) => preval + 1);
    }
    event.target.parentElement.parentElement.children[2].value = "";
    resetPreview(name);
    setLockedStates((preval) => {
      const newVal = {
        ...preval,
        [name]: !preval[name],
      };
      return newVal;
    });
  }

  function disableInput(name) {
    if (checkboxRef.current === undefined) {
      return false;
    }
    let element = null;
    for (let i of checkboxRef.current.children) {
      if (i.children[0].children[0].innerText === name) {
        element = i;
        break;
      }
    }
    if (
      element.children[1].children[0].checked === false ||
      lockedStates[name] === false
    ) {
      return false;
    }
    let count = 0;
    for (let i of checkboxRef.current.children) {
      const Name = i.children[0].children[0].innerText;
      if (Name === name) {
        continue;
      }

      if (
        lockedStates[Name] === false ||
        i.children[1].children[0].checked === false
      ) {
        ++count;
      }
    }
    if (count === friends.length - 1) {
      return true;
    }
    return false;
  }

  function cancelClick() {
    reset();
  }

  return (
    <div className={`${styles.main}`}>
      <div className=" p-4  lg:pr-2 flex flex-col lg:w-1/2 h-fit">
        <CommonModalPart />
        <div className="flex flex-col space-y-3 sm:space-y-0 text-center sm:text-start sm:flex-row mt-4 rounded-xl bg-white p-3">
          <div className="text-sm sm:text-base text-center xl:text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
            Total Amount
          </div>
          <input
            type="number"
            min={0}
            ref={amountRef}
            onChange={(event) => amountChange(event)}
            placeholder="Total Amount"
            className="rounded-md text-center sm:text-start sm:ml-4 bg-slate-100 flex-grow p-2 pl-6 text-md"
          />
        </div>
        <div className="flex flex-col space-y-3 sm:space-y-0 text-center sm:text-start sm:flex-row mt-4 rounded-xl bg-white p-3">
          <div className="text-sm sm:text-base xl:text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
            Paid by
          </div>
          <select
            ref={selectRef}
            onChange={selectChange}
            className="rounded-md text-center sm:text-start sm:ml-4 bg-slate-100 flex-grow p-2 pl-6 text-md"
          >
            <option value="">Select Payer</option>
            {friends.map((friend) => {
              return (
                <option key={friend.name} value={friend.name}>
                  {friend.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className=" lg:pl-2 p-4 flex flex-col lg:w-1/2 flex-grow">
        <div className="flex flex-col rounded-xl bg-white h-[400px] p-3">
          <div className="text-sm sm:text-base xl:text-lg bg-black flex justify-center items-center font-semibold text-white py-2 px-6 rounded-lg">
            Shares
          </div>
          <Div
            ref={checkboxRef}
            className="rounded-md mt-4 bg-slate-100 h-[500px] p-4 overflow-auto text-xs sm:text-base"
          >
            {friends.map((friend) => {
              return (
                <div
                  key={friend.name}
                  className="flex mb-3 space-x-2 flex-grow"
                >
                  <label
                    htmlFor={friend.name}
                    className="p-1 sm:p-2 pl-2 items-center sm:pl-4 bg-white border-2 flex border-stone-200 rounded-md flex-grow"
                  >
                    <span className="flex-grow flex items-center">
                      {friend.name}
                    </span>
                    <button
                      onClick={(event) => lockClick(event, friend.name)}
                      disabled={lockedStates[friend.name] === true}
                      className="w-auto text-right flex ml-2 items-center mr-2 text-stone-400"
                    >
                      {lockedStates[friend.name] === true ? (
                        <i className="fi fi-ss-lock-open-alt flex justify-center items-center"></i>
                      ) : (
                        <i className="fi fi-ss-lock flex justify-center items-center"></i>
                      )}
                    </button>
                    <input
                      type="number"
                      min={0}
                      disabled={disableInput(friend.name)}
                      onChange={(event) => weightChange(event)}
                      className="rounded-md bg-slate-100 disableScroll p-1 w-[70px] sm:w-[100px]"
                    />
                  </label>
                  <div className="p-1 sm:p-2 rounded-md px-2 sm:px-3 flex justify-center items-center bg-white border-2 border-stone-200">
                    <input
                      className="w-[15px] sm:w-[20px] h-[15px] sm:h-[20px]"
                      type="checkbox"
                      value={friend.name}
                      disabled={disableInput(friend.name)}
                      onClick={(event) => toggleCheckbox(event)}
                      defaultChecked
                      name={friend.name}
                      id=""
                    />
                  </div>
                </div>
              );
            })}
          </Div>
        </div>
        <div
          style={{
            display: `${error === null ? "none" : "flex"}`,
          }}
          className="bg-red-300 text-xs sm:text-sm mt-4 lg:mt-auto items-center rounded-lg p-2 px-4"
        >
          <i className="fi fi-rs-exclamation mr-2 text-sm sm:text-base xl:text-lg flex justify-center items-center"></i>
          <p>{error}</p>
        </div>
        <form
          method="dialog"
          className="flex space-y-2 sm:space-y-0 sm:space-x-3 sm:text-base text-sm mt-4 flex-col sm:flex-row lg:mt-auto"
        >
          <button
            onClick={cancelClick}
            ref={cancelRef}
            className="flex-grow p-2 sm:p-3 font-semibold uppercase flex justify-center items-center rounded-lg bg-red-500 text-white shadow-md hover:bg-white hover:text-red-500 border-2 border-red-500 hover:translate-y-[-5px] duration-500 "
          >
            Cancel
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="flex-grow p-2 sm:p-3 font-semibold uppercase flex justify-center items-center rounded-lg bg-blue-500 text-white shadow-md hover:bg-white hover:text-blue-500 border-2 border-blue-500 hover:translate-y-[-5px] duration-500 "
          >
            Reset
          </button>
          <Button
            disabled={error != null ? true : false}
            className={error != null ? "disabled p-2 sm:p-3" : "p-2 sm:p-3"}
            type="button"
            onClick={addClick}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

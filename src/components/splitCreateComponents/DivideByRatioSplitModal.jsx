import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { formatVal } from "../../util/algo";
import { amountInRange } from "../../util/algo";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import styles from "./DivideByRatioSplitModal.module.css";
import CommonModalPart from "./CommonModalPart";
import { v4 } from "uuid";

const Textarea = styled.textarea`
  resize: none;
`;

const Button = styled.button`
  flex-grow: 1;
  display: flex;
  font-weight: 600;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #38a169; /* bg-green-500 */
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  border: 1.5px solid #38a169; /* border-2 border-green-500 */
  transition: all 0.5s; /* duration-500 */

  &:hover {
    background-color: white;
    color: #38a169; /* text-green-500 */
    transform: translateY(-5px); /* translate-y-[-5px] */
  }
`;

const Div = styled.div``;

export default function DivideByRatioSplitModal() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.splitCreate.friends);
  const [error, setError] = useState(null);
  const [checkedNo, setCheckedNo] = useState(friends.length);
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

  function resetPreview() {
    if (
      amountRef.current.value === "" ||
      parseFloat(amountRef.current.value) === 0 ||
      amountInRange(amountRef.current.value) === false
    ) {
      for (let i of checkboxRef.current.children) {
        i.children[0].children[1].innerText = "";
      }
      return;
    }
    let totalWeight = 0;
    for (let i of checkboxRef.current.children) {
      if (
        i.children[1].children[0].checked &&
        i.children[0].children[0].children[1].value != "" &&
        amountInRange(i.children[0].children[0].children[1].value) === true
      ) {
        totalWeight += parseFloat(i.children[0].children[0].children[1].value);
      }
    }
    for (let i of checkboxRef.current.children) {
      if (
        i.children[1].children[0].checked &&
        i.children[0].children[0].children[1].value != "" &&
        amountInRange(i.children[0].children[0].children[1].value) === true &&
        parseFloat(i.children[0].children[0].children[1].value) != 0
      ) {
        const currWeight = i.children[0].children[0].children[1].value;
        const val = (amountRef.current.value / totalWeight) * currWeight;
        const finalVal = formatVal(val);
        i.children[0].children[1].innerText = finalVal;
      } else {
        i.children[0].children[1].innerText = "";
      }
    }
  }

  function addClick() {
    if (amountRef.current.value === "") {
      setError("Total Amount is mandatory.");
    } else if (amountRef.current.value === 0) {
      setError("Total Amount cannot be zero.");
    } else if (selectRef.current.value === "") {
      setError("Payer not Selected.");
    } else {
      let count = 0;
      for (let i of checkboxRef.current.children) {
        if (i.children[0].children[0].children[1].value === "") {
          ++count;
        }
      }
      if (count === friends.length) {
        setError("No Weights assigned.");
        return;
      }
      const billName = tempInfo.billName;
      const billDate = tempInfo.billDate;
      const desc = tempInfo.description;
      const totalAmt = amountRef.current.value;
      const payedBy = selectRef.current.value;
      const shares = [];
      let totalWeight = 0;
      for (let i of checkboxRef.current.children) {
        if (
          i.children[1].children[0].checked &&
          i.children[0].children[0].children[1].value != "" &&
          amountInRange(i.children[0].children[0].children[1].value) === true
        ) {
          totalWeight += parseFloat(
            i.children[0].children[0].children[1].value
          );
        }
      }
      for (let i of checkboxRef.current.children) {
        if (
          i.children[1].children[0].checked &&
          i.children[0].children[1].innerText != ""
        ) {
          const ans =
            (amountRef.current.value / totalWeight) *
            parseFloat(i.children[0].children[0].children[1].value);
          shares.push({
            name: i.children[1].children[0].value,
            share: ans,
          });
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
    resetPreview();
    if (event.target.checked) {
      event.target.parentElement.parentElement.children[0].children[0].children[1].disabled = false;
      setCheckedNo((preval) => {
        if (preval === 0) {
          setError(null);
        }
        return preval + 1;
      });
    } else {
      event.target.parentElement.parentElement.children[0].children[1].innerText =
        "";
      event.target.parentElement.parentElement.children[0].children[0].children[1].value =
        "";
      event.target.parentElement.parentElement.children[0].children[0].children[1].disabled = true;
      if (checkedNo === 1) {
        setError("No Shares Selected");
      }
      setCheckedNo((preval) => preval - 1);
    }
  }

  function amountChange(event) {
    resetPreview(checkedNo);
    if (event.target.value === "") {
      setError("Total Amount is mandatory.");
    } else if (parseFloat(event.target.value) === 0) {
      setError("Total Amount cannot be zero.");
    } else if (amountInRange(event.target.value) === false) {
      setError("Total Amount value out of range.");
    } else if (
      error === "Total Amount is mandatory." ||
      error === "Total Amount cannot be zero." ||
      error === "Total Amount value out of range."
    ) {
      setError(null);
    }
  }

  function weightChange(event) {
    if (event.target.value != "" && error === "No Weights assigned.") {
      setError(null);
    }
    const name = event.target.parentElement.children[0].innerText;
    resetPreview();
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
      i.children[0].children[1].innerText = "";
      i.children[0].children[0].children[1].value = "";
      i.children[0].children[0].children[1].disabled = false;
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
    setError(null);
  }

  function cancelClick() {
    reset();
  }

  return (
    <div
      className={`${styles.main} ${styles.scrollDiv} scrollbar-hidden pb-[36px] lg:pb-0`}
    >
      <span className="flex sm:hidden bg-white rounded-[4px] sm:rounded-md mx-2 py-1 justify-center font-semibold my-2 mb-1 mt-2">
        Divide By Ratio
      </span>

      <div
        className={` pt-1 sm:pt-3 px-2 sm:px-3 p-3 pb-0 lg:pb-3 lg:pr-2 flex flex-col lg:w-1/2  `}
      >
        <CommonModalPart />
        <div className="flex mt-2 sm:mt-3 flex-col sm:flex-row space-y-2 sm:space-y-0 rounded-lg bg-white p-2">
          <div className="text-xs text-center sm:text-sm bg-black  font-semibold text-white py-1 sm:py-[6px] px-4 rounded-[4px] sm:rounded-md">
            Total Amount
          </div>
          <input
            type="number"
            min={0}
            ref={amountRef}
            onChange={(event) => amountChange(event)}
            placeholder="Total Amount"
            className="rounded-[4px] sm:rounded-md disableScroll text-center sm:text-start sm:ml-2 bg-slate-100 flex-grow p-1 sm:p-[6px] sm:pl-4 text-md"
          />
        </div>
        <div className="flex mt-2 sm:mt-3 flex-col  sm:flex-row space-y-2 sm:space-y-0 rounded-lg bg-white p-2">
          <div className=" text-xs  text-center sm:text-sm bg-black  font-semibold text-white py-1 sm:py-[6px] px-4 rounded-[4px] sm:rounded-md">
            Paid by
          </div>
          <select
            ref={selectRef}
            onChange={selectChange}
            className="rounded-[4px] sm:rounded-md sm:ml-2 bg-slate-100 flex-grow p-1 sm:p-[6px] pl-2 sm:pl-4 text-md"
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
      <div className="lg:pl-1 p-2 sm:p-3 flex flex-col lg:w-1/2 flex-grow">
        <div className="flex  flex-col rounded-lg bg-white h-auto lg:h-[290px] p-2">
          <div className="text-xs sm:text-sm  bg-black flex justify-center items-center font-semibold text-white py-1 sm:py-[6px] px-6 rounded-[4px] sm:rounded-md">
            Shares
          </div>
          <Div
            ref={checkboxRef}
            className="rounded-md mt-2 bg-slate-100 flex-grow p-2 overflow-auto customScrollThin text-xs"
          >
            {friends.map((friend) => {
              return (
                <div
                  key={friend.name}
                  className="flex mb-2 space-x-2 flex-grow items-center pr-3 bg-white border-[1.5px] border-stone-200 rounded-md"
                >
                  <label
                    htmlFor={friend.name}
                    className="p-1 sm:p-[6px] pl-2 justify-center sm:pl-2 flex flex-col text-[11px] flex-grow"
                  >
                    <div className="flex justify-between border-b-[0.5px] pb-1 border-stone-200">
                      <span className="flex-grow ml-1 flex items-center">
                        {friend.name}
                      </span>
                      <input
                        type="number"
                        min={0}
                        onChange={(event) => weightChange(event)}
                        className="rounded-[3px] p-[2px] px-[6px] mr-2 text-[11px] sm:text-xs focus:outline-none bg-slate-100 disableScroll  w-[40px] sm:w-[50px]"
                      />
                    </div>
                    <span className="w-auto h-[15px] self-end pt-1 flex items-center mr-2  text-stone-400"></span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-[20px] h-[20px] flex items-center"
                      type="checkbox"
                      value={friend.name}
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
          className="bg-red-300 shadow-xl lg:shadow-none absolute w-[268px] sm:w-[470px]  lg:static lg:w-auto bottom-[62px] sm:bottom-[72px] text-[11px] sm:text-xs mt-3 lg:mt-auto items-center rounded-md p-1 pt-[5px] sm:pt-[6px]  sm:p-[6px] px-3"
        >
          <i className="fi fi-rs-exclamation mr-2  text-xs sm:text-sm flex justify-center items-center"></i>
          <p>{error}</p>
        </div>
        <form
          method="dialog"
          className="flex space-x-2 sm:space-x-3 absolute lg:static bottom-2 sm:bottom-3 w-[284px] sm:w-[495px] left-2 sm:left-3 lg:w-auto text-xs sm:text-sm mt-2 sm:mt-3 lg:mt-auto"
        >
          <button
            onClick={cancelClick}
            ref={cancelRef}
            className="flex-grow p-2 sm:p-2 font-semibold uppercase flex justify-center items-center rounded-md sm:rounded-lg bg-red-500 text-white shadow-md hover:bg-white hover:text-red-500 border-[1.5px] border-red-500 hover:translate-y-[-5px] duration-500 "
          >
            Cancel
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="flex-grow p-2 sm:p-2 font-semibold uppercase flex justify-center items-center rounded-md sm:rounded-lg bg-blue-500 text-white shadow-md hover:bg-white hover:text-blue-500 border-[1.5px] border-blue-500 hover:translate-y-[-5px] duration-500"
          >
            Reset
          </button>
          <Button
            disabled={error != null ? true : false}
            className={error != null ? "disabled p-2 sm:p-2" : "p-2 sm:p-2"}
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

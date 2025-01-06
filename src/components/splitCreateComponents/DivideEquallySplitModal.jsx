import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { formatVal } from "../../util/algo";
import { amountInRange } from "../../util/algo";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import styles from "./DivideEquallySplitModal.module.css";
import CommonModalPart from "./CommonModalPart";
import { v4 } from "uuid";

const Textarea = styled.textarea`
  resize: none;
`;

const Button = styled.button`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
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

export default function DivideEquallySplitModal() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.splitCreate.friends);
  const [error, setError] = useState(null);
  const [checkedNo, setCheckedNo] = useState(friends.length);
  const checkboxRef = useRef();
  const selectRef = useRef();
  const amountRef = useRef();
  const cancelRef = useRef();
  const tempInfo = useSelector((state) => state.splitCreate.addBillTempStore);

  function resetPreview(no) {
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
    const val = amountRef.current.value / no;
    const finalVal = formatVal(val);
    for (let i of checkboxRef.current.children) {
      if (i.children[1].children[0].checked === false) {
        continue;
      }
      i.children[0].children[1].innerText = finalVal;
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
      const billName = tempInfo.billName;
      const billDate = tempInfo.billDate;
      const desc = tempInfo.description;
      const totalAmt = amountRef.current.value;
      const payedBy = selectRef.current.value;
      const shares = [];
      for (let i of checkboxRef.current.children) {
        if (i.children[1].children[0].checked) {
          shares.push({
            name: i.children[1].children[0].value,
            share: totalAmt / checkedNo,
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
    if (event.target.checked) {
      resetPreview(checkedNo + 1);
      setCheckedNo((preval) => {
        if (preval === 0) {
          setError(null);
        }
        return preval + 1;
      });
    } else {
      event.target.parentElement.parentElement.children[0].children[1].innerText =
        "";
      if (checkedNo === 1) {
        setError("No Shares Selected");
      }
      resetPreview(checkedNo - 1);
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
    <div className={`${styles.main}`}>
      <div className=" p-3 lg:pr-2 flex flex-col lg:w-1/2 h-fit">
        <CommonModalPart />

        <div className="flex mt-3 flex-col sm:flex-row space-y-3 sm:space-y-0 rounded-lg bg-white p-2">
          <div className="text-sm sm:text-base text-center xl:text-sm bg-black  font-semibold text-white py-[6px] px-4 rounded-md">
            Total Amount
          </div>
          <input
            type="number"
            min={0}
            ref={amountRef}
            onChange={(event) => amountChange(event)}
            placeholder="Total Amount"
            className="rounded-md text-center sm:text-start sm:ml-2 bg-slate-100 flex-grow p-[6px] pl-3 text-md"
          />
        </div>
        <div className="flex mt-3 flex-col  sm:flex-row space-y-3 sm:space-y-0 rounded-lg bg-white p-2">
          <div className=" text-sm sm:text-base text-center xl:text-sm bg-black  font-semibold text-white py-[6px] px-4 rounded-md">
            Paid by
          </div>
          <select
            ref={selectRef}
            onChange={selectChange}
            className="rounded-md sm:ml-2 bg-slate-100 flex-grow p-[6px] pl-4 text-md"
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
      <div className=" lg:pl-1 p-3 flex flex-col lg:w-1/2 flex-grow">
        <div className="flex flex-col rounded-lg bg-white h-[290px] p-2">
          <div className=" text-sm  bg-black flex justify-center items-center font-semibold text-white py-[6px] px-6 rounded-md">
            Shares
          </div>
          <Div
            ref={checkboxRef}
            className="rounded-md mt-2 bg-slate-100  p-2 overflow-auto customScrollThin text-xs "
          >
            {friends.map((friend) => {
              return (
                <div
                  key={friend.name}
                  className="flex mb-2 space-x-2 flex-grow"
                >
                  <label
                    htmlFor={friend.name}
                    className="p-1 sm:p-[9px] pl-2 items-center sm:pl-3 bg-white border-[1.5px] flex border-stone-200 rounded-md flex-grow"
                  >
                    <span className="flex-grow">{friend.name}</span>
                    <span className="w-auto text-right text-stone-400"></span>
                  </label>
                  <div className="p-2 sm:p-2 rounded-md px-2 sm:px-[10px] flex justify-center items-center bg-white border-[1.5px] border-stone-200">
                    <input
                      className="w-[15px] h-[15px] "
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
          className="bg-red-300 text-xs mt-3 lg:mt-auto items-center rounded-md p-[6px] px-3"
        >
          <i className="fi fi-rs-exclamation mr-2  text-sm flex justify-center items-center"></i>
          <p>{error}</p>
        </div>
        <form
          method="dialog"
          className="flex space-y-2 sm:space-y-0 sm:space-x-3 text-sm mt-3 flex-col sm:flex-row lg:mt-auto"
        >
          <button
            onClick={cancelClick}
            ref={cancelRef}
            className="flex-grow p-2 sm:p-2 font-semibold uppercase flex justify-center items-center rounded-lg bg-red-500 text-white shadow-md hover:bg-white hover:text-red-500 border-[1.5px] border-red-500 hover:translate-y-[-5px] duration-500 "
          >
            Cancel
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="flex-grow p-2 sm:p-2 font-semibold uppercase flex justify-center items-center rounded-lg bg-blue-500 text-white shadow-md hover:bg-white hover:text-blue-500 border-[1.5px] border-blue-500 hover:translate-y-[-5px] duration-500 "
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

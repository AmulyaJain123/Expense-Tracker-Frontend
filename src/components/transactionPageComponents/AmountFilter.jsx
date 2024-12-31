import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../store/main";
import { useSelector } from "react-redux";

const Button = styled.button`
  position: absolute;
  bottom: 2rem; /* bottom-8 */
  right: 2rem; /* right-8 */
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem; /* px-4 */
  padding-top: 0.5rem; /* py-2 */
  padding-bottom: 0.5rem; /* py-2 */
  border-radius: 0.75rem; /* rounded-xl */
  font-size: 1.125rem; /* text-lg */
  font-weight: 800; /* font-semibold */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-xl */
  border-width: 2px; /* border-[3px] */
  border-color: #38a3a5; /* border-[#2dc653] */
  background-color: #38a3a5; /* bg-[#2dc653] */
  color: #fff; /* text-[#f0fff1] */
  transition-property: background-color, color, transform; /* hover:bg-[#f0fff1] hover:text-[#2dc653] hover:scale-110 */
  transition-duration: 700ms; /* duration-700 */

  &:hover {
    background-color: #fff; /* hover:bg-[#f0fff1] */
    color: #38a3a5; /* hover:text-[#2dc653] */
    transform: scale(1.1); /* hover:scale-110 */
  }
`;

function formatVal(num) {
  const val = parseFloat(num);
  const ans = val + " ₹";
  return ans;
}

export default function AmountFilter() {
  const dispatch = useDispatch();
  const filterParam = useSelector((state) => state.transactions.filterParam);
  const addRef = useRef();
  const selectRef = useRef();
  const inputRef = useRef();
  const [amountError, setAmountError] = useState(null);
  const [constraints, setConstraints] = useState([]);

  function applyClick() {
    const obj = { name: filterParam, options: [...constraints] };
    // console.log(obj);
    dispatch(transactionActions.pushFilter(obj));
    dispatch(transactionActions.closeOpen());
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

  function addClick() {
    const num = parseFloat(inputRef.current.value);
    const constraint = selectRef.current.value;
    // console.log(num, constraint);
    inputRef.current.value = "";
    if (num && num > 0) {
      setConstraints((preval) => {
        const str = `${constraint} ${formatVal(num)}`;
        return [...preval, str];
      });
    }
  }

  function amountChange(event) {
    const num = parseFloat(event.target.value);
    if (!num || num <= 0) {
      setAmountError("Amount must be positive");
    } else {
      setAmountError(null);
    }
  }

  function keyHandle(event) {
    if (event.key === "Enter") {
      addRef.current.click();
    }
  }

  function removeClick(ind) {
    let arr = [...constraints];
    arr.splice(ind, 1);
    setConstraints([...arr]);
  }

  return (
    <>
      <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4 rounded-r-xl p-4 px-16">
        <div className="font-semibold flex flex-col mt-[8px] mb-[40px] text-xl text-black text-center"></div>
        <div className="text-xl font-semibold mx-auto mb-[20px] uppercase">
          add a constraint
        </div>
        <div className="flex space-x-6 my-[30px] justify-center">
          <select
            className=" px-3 rounded-md  bg-white text-base"
            name="constraint"
            defaultValue={"=="}
            id=""
            ref={selectRef}
          >
            <option value="==">Equal</option>
            <option value="<">Less than</option>
            <option value=">">More than</option>
            <option value="<=">Less than or Equal to</option>
            <option value=">=">More than or Equal to</option>
          </select>
          <input
            className="  disableScroll px-4  rounded-md bg-white "
            min={"0"}
            ref={inputRef}
            type="number"
            onKeyDown={(event) => keyHandle(event)}
            onChange={(event) => amountChange(event)}
            placeholder="Amount"
          />
          <button
            onClick={addClick}
            ref={addRef}
            className="rounded-lg p-2 py-1 px-4 text-center bg-black font-semibold text-lg text-white duration-500 border-2 border-black hover:bg-white hover:text-black"
          >
            ADD
          </button>
        </div>

        <div className="flex h-[30px] mx-[70px] ">
          {amountError != null ? (
            <div className="min-h-[30px] my-2 py-1 flex flex-grow text-sm items-center px-3 rounded-md mx-4 bg-red-300 text-black font-medium">
              <i className="fi fi-rs-exclamation mr-4 text-lg flex justify-center items-center"></i>
              <span>{amountError}</span>
            </div>
          ) : null}
        </div>

        <div className="flex  mt-8 border-t-2 p-4 border-black mx-16">
          <div className="flex flex-grow flex-wrap max-h-[250px] justify-center overflow-auto customScrollThin px-6 gap-2 mt-4">
            {constraints.length != 0 ? (
              constraints.map((name, index) => {
                return (
                  <span
                    key={Math.random()}
                    className=" px-4 pr-2 h-fit flex items-center space-x-3 rounded-lg text-white bg-[#9d4edd]"
                  >
                    <span>{name}</span>
                    <button onClick={() => removeClick(index)}>
                      <i className="fi fi-ss-cross-circle text-xl flex h-[35px] justify-center items-center"></i>
                    </button>
                  </span>
                );
              })
            ) : (
              <p className="mx-auto">No Constraints Added</p>
            )}
          </div>
        </div>

        <Button
          disabled={constraints.length === 0}
          className={constraints.length > 0 ? "" : "disabled"}
          onClick={applyClick}
        >
          Apply
        </Button>
      </div>
    </>
  );
}

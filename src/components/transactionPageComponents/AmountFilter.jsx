import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../store/main";
import { useSelector } from "react-redux";

const Button = styled.button`
  position: absolute;
  bottom: 2rem; /* bottom-8 */
  right: 2rem; /* right-8 */
  padding-left: 0.8rem; /* px-4 */
  padding-right: 0.8rem; /* px-4 */
  padding-top: 0.4rem; /* py-2 */
  padding-bottom: 0.4rem; /* py-2 */
  border-radius: 0.6rem; /* rounded-xl */
  font-size: 0.9rem; /* text-lg */
  font-weight: 800; /* font-semibold */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-xl */
  border-width: 1.5px; /* border-[3px] */
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
      <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-3 rounded-r-lg p-4 px-16">
        <div className="font-semibold flex flex-col mt-[8px] mb-[25px] text-xl text-black text-center"></div>
        <div className="text-md font-semibold mx-auto mb-[10px] uppercase">
          add a constraint
        </div>
        <div className="flex space-x-4  text-xs my-[20px] mb-[20px] justify-center">
          <select
            className=" px-2 rounded-md  bg-white text-xs"
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
            className="focus:outline-none  disableScroll px-4 pr-2 rounded-md bg-white "
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
            className="rounded-md p-[6px] py-1 px-3 text-center bg-black font-semibold text-sm text-white duration-500 border-[1.5px] border-black hover:bg-white hover:text-black"
          >
            ADD
          </button>
        </div>

        <div className="flex h-[20px] mx-[50px]">
          {amountError != null ? (
            <div className="min-h-[25px] my-[6px] py-1 flex flex-grow text-[11px] items-center px-2 rounded-md mx-3 bg-red-300 text-black font-medium">
              <i className="fi fi-rs-exclamation mr-3 text-[14px] flex justify-center items-center"></i>
              <span>{amountError}</span>
            </div>
          ) : null}
        </div>

        <div className="flex mt-6 border-t-[1.5px] p-4 border-black mx-8">
          <div className="flex text-xs flex-grow flex-wrap max-h-[200px] justify-center overflow-auto customScrollThin px-4 gap-[6px] mt-3">
            {constraints.length != 0 ? (
              constraints.map((name, index) => {
                return (
                  <span
                    key={Math.random()}
                    className=" px-3 pr-[6px] py-[5px] h-fit flex items-center space-x-2 rounded-md text-white bg-[#9d4edd]"
                  >
                    <span>{name}</span>
                    <button onClick={() => removeClick(index)}>
                      <i className="fi fi-ss-cross-circle text-[16px] flex  justify-center items-center"></i>
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

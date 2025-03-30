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

export default function DescFilter() {
  const [name, setName] = useState(null);
  const [names, setNames] = useState([]);
  const addRef = useRef();
  const nameRef = useRef();
  const dispatch = useDispatch();
  const filterParam = useSelector((state) => state.transactions.filterParam);

  function nameChange(event) {
    const name = event.target.value.trim();
    setName(name);
  }

  useEffect(() => {
    nameRef.current.value = "";
    setName(null);
    setNames([]);
  }, [filterParam]);

  function addClick() {
    const name = nameRef.current.value.trim();
    if (name != "") {
      setNames((preval) => {
        return [...preval, name];
      });
    }
    nameRef.current.value = "";
  }

  function removeClick(ind) {
    let arr = [...names];
    arr.splice(ind, 1);
    setNames([...arr]);
  }

  function keyHandle(event) {
    if (event.key === "Enter") {
      addRef.current.click();
    }
  }

  function applyClick() {
    const obj = { name: filterParam, options: [...names] };
    // console.log(obj);
    dispatch(transactionActions.pushFilter(obj));
    dispatch(transactionActions.closeOpen());
  }

  return (
    <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-3 rounded-r-lg p-4 px-16">
      <div className="font-semibold flex flex-col mt-[8px] mb-[25px] text-xl text-black text-center"></div>
      <div className="text-md font-semibold mx-auto mb-[10px] uppercase">
        add a query
      </div>
      <div className="flex space-x-3 text-xs my-[20px] justify-center">
        <input
          className="rounded-md p-[6px] px-3 w-[300px] focus:outline-none bg-white  text-stone-600"
          placeholder="Query"
          type="text"
          onChange={(event) => nameChange(event)}
          onKeyDown={(event) => keyHandle(event)}
          ref={nameRef}
        />
        <button
          onClick={addClick}
          ref={addRef}
          className="rounded-md p-2 py-1 px-3 text-center bg-black font-semibold  text-white duration-500 border-[1.5px] border-black hover:bg-white hover:text-black"
        >
          ADD
        </button>
      </div>

      <div className="flex  mt-6 border-t-[1.5px] p-4 border-black mx-8">
        <div className="flex text-xs flex-grow flex-wrap max-h-[200px] justify-center overflow-auto customScrollThin px-4 gap-[6px] mt-3">
          {names.length != 0 ? (
            names.map((name, index) => {
              return (
                <span
                  key={Math.random()}
                  className=" px-3 pr-[6px] py-[6px] h-fit flex items-center space-x-2 rounded-md text-white bg-[#9d4edd]"
                >
                  <span>{name}</span>
                  <button onClick={() => removeClick(index)}>
                    <i className="fi fi-ss-cross-circle text-[16px] flex  justify-center items-center"></i>
                  </button>
                </span>
              );
            })
          ) : (
            <p className="mx-auto">No Query Added</p>
          )}
        </div>
      </div>

      <Button
        disabled={names.length === 0}
        className={names.length > 0 ? "" : "disabled"}
        onClick={applyClick}
      >
        Apply
      </Button>
    </div>
  );
}

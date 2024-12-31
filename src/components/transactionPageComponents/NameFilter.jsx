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

export default function NameFilter() {
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
    <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4 rounded-r-xl p-4 px-16">
      <div className="font-semibold flex flex-col mt-[8px] mb-[40px] text-xl text-black text-center"></div>
      <div className="text-xl font-semibold mx-auto mb-[20px] uppercase">
        add a name
      </div>
      <div className="flex space-x-6 my-[30px] justify-center">
        <input
          className="rounded-lg p-2 px-4 w-[400px]  bg-white  text-stone-600"
          placeholder="Name"
          type="text"
          onChange={(event) => nameChange(event)}
          onKeyDown={(event) => keyHandle(event)}
          ref={nameRef}
        />
        <button
          onClick={addClick}
          ref={addRef}
          className="rounded-lg p-2 py-1 px-4 text-center bg-black font-semibold  text-white duration-500 border-2 border-black hover:bg-white hover:text-black"
        >
          ADD
        </button>
      </div>

      <div className="flex  mt-8 border-t-2 p-4 border-black mx-16">
        <div className="flex flex-grow flex-wrap max-h-[300px] justify-center overflow-auto customScrollThin px-6 gap-2 mt-4">
          {names.length != 0 ? (
            names.map((name, index) => {
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
            <p className="mx-auto">No Names Added</p>
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

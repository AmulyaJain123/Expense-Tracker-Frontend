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

export default function TypeFilter() {
  const dispatch = useDispatch();
  const filterParam = useSelector((state) => state.transactions.filterParam);
  const [selectedType, setSelectedType] = useState("Outgoing");

  function clickHandle(event) {
    setSelectedType(event.target.innerText);
  }

  function applyClick() {
    let options = null;
    if (selectedType === "Incoming") {
      options = ["incoming"];
    } else if (selectedType === "Outgoing") {
      options = ["outgoing"];
    } else {
      options = ["incoming", "outgoing"];
    }
    const obj = { name: filterParam, options: options };
    // console.log(obj);
    dispatch(transactionActions.pushFilter(obj));
    dispatch(transactionActions.closeOpen());
  }

  return (
    <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4 rounded-r-lg p-4 px-16">
      <div className="font-semibold flex flex-col mt-[8px] mb-[20px] text-xl text-black text-center"></div>

      <div className="text-base font-semibold mx-auto mb-[10px] uppercase">
        Select a Type
      </div>
      <div className="flex mt-6 space-x-2 scale-90 justify-center">
        <button
          onClick={(event) => clickHandle(event)}
          style={{
            backgroundColor: selectedType === "Outgoing" ? "#9d4edd" : "#fff",
            color: selectedType === "Outgoing" ? "#fff" : "#78716c",
            border: selectedType === "Outgoing" ? "0px" : "1.5px solid #a8a29e",
          }}
          className="p-1 px-2 rounded-md text-sm font-medium "
        >
          Outgoing
        </button>
        <button
          onClick={(event) => clickHandle(event)}
          style={{
            backgroundColor: selectedType === "Incoming" ? "#9d4edd" : "#fff",
            color: selectedType === "Incoming" ? "#fff" : "#78716c",
            border: selectedType === "Incoming" ? "0px" : "1.5px solid #a8a29e",
          }}
          className="p-1 px-2 rounded-md text-sm font-medium "
        >
          Incoming
        </button>
        <button
          onClick={(event) => clickHandle(event)}
          style={{
            backgroundColor: selectedType === "Both" ? "#9d4edd" : "#fff",
            color: selectedType === "Both" ? "#fff" : "#78716c",
            border: selectedType === "Both" ? "0px" : "1.5px solid #a8a29e",
          }}
          className="p-1 px-2 rounded-md text-sm font-medium "
        >
          Both
        </button>
      </div>

      <Button onClick={applyClick}>Apply</Button>
    </div>
  );
}

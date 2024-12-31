import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../store/main";
import { format } from "date-fns";

const day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysInMonth = [
  { name: "January", days: 31 },
  { name: "February", days: 28 }, // 29 in a leap year
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];

const Thumb = styled.button`
  aspect-ratio: 1 / 1; /* aspect-square */
  position: relative;
  width: 35px; /* w-[35px] */
  font-size: 1.125rem; /* text-lg */
  border-radius: 0.375rem; /* rounded-md */
  font-weight: 500; /* font-medium */
  display: flex; /* flex */
  align-items: center; /* items-center */
  justify-content: center; /* justify-center */
  transition: background-color 0.2s; /* Add a transition for hover effect */

  &:hover {
    background-color: #d6d3d1; /* hover:bg-stone-300 */
    color: black;
  }
`;

//bg-[#e3f2fd] text-[#2196f3]

const Pin = styled.button`
  display: flex; /* flex */
  border-radius: 0.5rem; /* rounded-lg */
  height: 75px;
  width: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$status === 0
      ? "#e3f2fd"
      : props.$status === 1
      ? "#e7e5e4"
      : "#f0fff1"}; /* bg-red-300 */
  color: ${(props) =>
    props.$status === 0
      ? "#2196f3"
      : props.$status === 1
      ? "#78716c"
      : "#2dc653"};
  border: ${(props) =>
    props.$status === 0
      ? "2px solid #2196f3"
      : props.$status === 1
      ? "2px dashed #78716c"
      : "2px solid #2dc753"};
  font-size: ${(props) =>
    props.$status === 0
      ? "1.25rem"
      : props.$status === 1
      ? "0.9rem"
      : "0.9rem"};
  font-weight: 600; /* font-semibold */
  justify-content: center; /* justify-center */
  padding-top: 0.5rem; /* py-2 */
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 0.5rem; /* py-2 */
  transition: border 500ms, color 500ms, background-color 500ms, transform 500ms;

  &:hover {
    transform: ${(props) =>
      props.$status === 0
        ? "translateY(-6px)"
        : props.$status === 1
        ? ""
        : "translateY(-6px)"};
  }
`;

const Submit = styled.button`
  display: flex; /* flex */
  width: 100%; /* w-full */
  border-width: 2px; /* border-2 */
  border-color: black; /* border-black */
  background-color: black; /* bg-black */
  color: white; /* text-white */
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
  letter-spacing: 0.05em; /* tracking-wider */
  padding-top: 0.5rem; /* py-2 */
  padding-bottom: 0.5rem; /* py-2 */
  justify-content: center; /* justify-center */
  margin-top: 1rem; /* mt-4 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: background-color 500ms, color 500ms; /* duration-500 */

  &:hover {
    background-color: white; /* hover:bg-white */
    color: black; /* hover:text-black */
  }
`;

export default function DatePicker() {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currDate, setCurrDate] = useState(new Date().getDate());
  const [calander, setCalander] = useState([]);
  const [pin1, setPin1] = useState(0);
  const [pin2, setPin2] = useState(0);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedMonth = new Date();
    // console.log("erferf");
    selectedMonth.setMonth(currMonth - 1);
    selectedMonth.setFullYear(currYear);
    let totalDays = getNoOfDays();
    // console.log(totalDays);
    let DOW = 0;
    let dayCounter = 0;
    const arr = [];
    while (totalDays != 0) {
      // console.log("HEHEHE");
      const weekDay = DOW % 7;
      const thatDate = new Date();
      thatDate.setMonth(currMonth - 1);
      thatDate.setFullYear(currYear);
      thatDate.setDate(dayCounter + 1);
      const thatDatekaDOW = (thatDate.getDay() + 6) % 7;
      if (thatDatekaDOW === weekDay) {
        arr.push(dayCounter + 1);
        --totalDays;
        ++dayCounter;
      } else {
        arr.push(null);
      }
      ++DOW;
    }
    // console.log(arr);
    const ans = [];
    for (let i = 0; i <= 6; ++i) {
      const week = [null, null, null, null, null, null, null];
      let counter = 0;
      for (let j = i * 7; j < (i + 1) * 7 && j < arr.length; ++j) {
        week[counter] = arr[j];
        ++counter;
      }
      if (week[0] === null && week[6] === null) {
        break;
      }
      if (week[6] === null) {
        ans.push(week);
        break;
      } else {
        ans.push(week);
      }
    }
    // console.log(ans);
    setCalander(ans);
  }, [currYear, currMonth]);

  function getNoOfDays() {
    if (currMonth != 2) {
      return daysInMonth[currMonth - 1].days;
    } else if (
      (currYear % 100 != 0 && currYear % 4 === 0) ||
      currYear % 400 === 0
    ) {
      return 29;
    } else {
      return 28;
    }
  }

  function changeCal(order) {
    let curry = currYear;
    let currm = currMonth;
    if (order === "-1y") {
      --curry;
    } else if (order === "+1y") {
      ++curry;
    } else if (order === "-1m") {
      --currm;
      if (currm === 0) {
        currm = 12;
        --curry;
      }
    } else {
      ++currm;
      if (currm === 13) {
        currm = 1;
        ++curry;
      }
    }
    const realm = new Date().getMonth() + 1;
    const realy = new Date().getFullYear();
    if (currm === realm && curry === realy) {
      setCurrDate(new Date().getDate());
    }
    setCurrMonth(currm);
    setCurrYear(curry);
  }

  const todayM = new Date().getMonth() + 1;
  const todayY = new Date().getFullYear();

  function clickPin(pin) {
    if (pin === "first") {
      if (pin1 === 0) {
        setPin1(1);
      } else if (pin1 === 2) {
        setPin1(0);
        setDate1(null);
      } else {
        setPin1(0);
      }
    } else {
      if (pin2 === 0) {
        setPin2(1);
      } else if (pin2 === 2) {
        setPin2(0);
        setDate2(null);
      } else {
        setPin2(0);
      }
    }
  }

  function dateClick(num) {
    if (pin1 === 1) {
      const date = new Date();
      date.setFullYear(currYear);
      date.setMonth(currMonth - 1);
      date.setDate(num);
      date.setHours(0, 0, 0, 0);
      setDate1(date);
      setPin1(2);
    } else if (pin2 === 1) {
      const date = new Date();
      date.setFullYear(currYear);
      date.setMonth(currMonth - 1);
      date.setDate(num);
      date.setHours(0, 0, 0, 0);
      setDate2(date);
      setPin2(2);
    }
  }

  function submitClick() {
    const first = date1 < date2 ? date1 : date2;
    const second = date1 < date2 ? date2 : date1;
    const f = first.toString();
    const s = second.toString();
    dispatch(transactionActions.pushDuration({ first: f, second: s }));
    setPin1(0);
    setPin2(0);
    setDate1(null);
    setDate2(null);
  }

  return (
    <>
      <div className="p-8 rounded-xl scale-90  bg-[white] shadow-lg">
        <header className="flex space-x-2">
          <div className="flex space-x-3">
            <button
              onClick={() => changeCal("-1y")}
              className="hover:scale-105 rounded-lg duration-500 shadow-sm bg-white border-2 border-stone-300 w-[35px] aspect-square flex justify-center items-center"
            >
              <i className="fi fi-sr-angle-double-left text-xs flex justify-center items-center"></i>
            </button>
            <button
              onClick={() => changeCal("-1m")}
              className="hover:scale-105 rounded-lg duration-500 shadow-sm bg-white border-2 border-stone-300 w-[35px] aspect-square flex justify-center items-center"
            >
              <i className="fi fi-br-angle-left text-xs flex justify-center items-center"></i>
            </button>
          </div>
          <div className="flex px-1 w-[180px] font-semibold text-[20px] flex-grow items-center justify-center">
            {`${month[currMonth - 1]} ${currYear}`}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => changeCal("+1m")}
              className="hover:scale-105 rounded-lg duration-500 shadow-sm bg-white border-2 border-stone-300 w-[35px] aspect-square flex justify-center items-center"
            >
              <i className="fi fi-sr-angle-right text-xs flex justify-center items-center"></i>
            </button>
            <button
              onClick={() => changeCal("+1y")}
              className="hover:scale-105 rounded-lg duration-500 shadow-sm bg-white border-2 border-stone-300 w-[35px] aspect-square flex justify-center items-center"
            >
              <i className="fi fi-br-angle-double-right text-xs flex justify-center items-center"></i>
            </button>
          </div>
        </header>

        <main className="mt-4 flex px-1 min-h-[315px] flex-col">
          <header className="flex items-center gap-x-1 justify-between">
            {day.map((i) => {
              return (
                <div
                  key={i}
                  className="aspect-square w-[35px] text-lg font-medium text-stone-400 flex items-center justify-center "
                >
                  {i[0] + i[1]}
                </div>
              );
            })}
          </header>

          <div className="flex flex-col gap-y-3 mt-2">
            {calander.length != 0
              ? calander.map((i) => {
                  return (
                    <header
                      key={Math.random()}
                      className="flex flex-grow items-center gap-x-1 justify-between"
                    >
                      {i.map((j) => {
                        let endpoint1 = false;
                        let isInRange = false;
                        if (date1 && date2) {
                          const thumbDate = new Date();
                          thumbDate.setMonth(currMonth - 1);
                          thumbDate.setFullYear(currYear);
                          thumbDate.setDate(j);
                          thumbDate.setHours(0, 0, 0, 0);
                          // console.log(thumbDate, date1, date2);
                          if (
                            thumbDate.getTime() == date1.getTime() ||
                            thumbDate.getTime() == date2.getTime() ||
                            (thumbDate > date1 && thumbDate < date2) ||
                            (thumbDate < date1 && thumbDate > date2)
                          ) {
                            isInRange = true;
                          }
                        }
                        if (date1 != null) {
                          endpoint1 =
                            currYear === date1.getFullYear() &&
                            currMonth === date1.getMonth() + 1 &&
                            j === date1.getDate();
                        }
                        let endpoint2 = false;
                        if (date2 != null) {
                          endpoint2 =
                            currYear === date2.getFullYear() &&
                            currMonth === date2.getMonth() + 1 &&
                            j === date2.getDate();
                        }
                        let str =
                          currYear === todayY &&
                          currMonth === todayM &&
                          j === currDate
                            ? "presentDay"
                            : "";
                        if (isInRange) {
                          str += " isInRange";
                        }
                        // console.log(str);
                        return (
                          <div key={Math.random()}>
                            {j != null ? (
                              <Thumb
                                onClick={() => dateClick(j)}
                                key={Math.random()}
                                className={str}
                              >
                                <span>{j}</span>
                                {date1 != null && endpoint1 ? (
                                  <i className="fi fi-sr-circle-1 flex justify-center items-center text-lg absolute top-[-5px] left-[-5px]"></i>
                                ) : null}
                                {date2 != null && endpoint2 ? (
                                  <i className="fi fi-sr-circle-2 flex justify-center items-center text-lg absolute top-[-5px] right-[-5px]"></i>
                                ) : null}
                              </Thumb>
                            ) : (
                              <div
                                key={Math.random()}
                                className="aspect-square w-[35px]  font-medium flex items-center justify-center"
                              ></div>
                            )}
                          </div>
                        );
                      })}
                    </header>
                  );
                })
              : null}
          </div>
        </main>

        <div className="flex w-[400px] space-x-4 mt-3">
          <Pin
            $status={pin1}
            disabled={pin2 === 1 && pin1 === 0}
            className={pin2 === 1 && pin1 === 0 ? "disabled" : ""}
            onClick={() => clickPin("first")}
          >
            {pin1 === 0 ? (
              <span className="flex space-x-3">
                <span>Pick</span>{" "}
                <i className="fi fi-sr-circle-1 flex  justify-center items-center text-xl "></i>
              </span>
            ) : pin1 === 1 ? (
              "Place on Calander or Click Here to Cancel"
            ) : (
              <span className="flex flex-col">
                <span>{format(new Date(date1), "dd/MM/yyyy")}</span>
                <span>Click to Remove</span>
              </span>
            )}
          </Pin>
          <Pin
            $status={pin2}
            disabled={pin1 === 1 && pin2 === 0}
            className={pin1 === 1 && pin2 === 0 ? "disabled" : ""}
            onClick={() => clickPin("second")}
          >
            {pin2 === 0 ? (
              <span className="flex space-x-3">
                <span>Pick</span>{" "}
                <i className="fi fi-sr-circle-2 flex  justify-center items-center text-xl "></i>
              </span>
            ) : pin2 === 1 ? (
              "Place on Calander or Click Here to Cancel"
            ) : (
              <span className="flex flex-col">
                <span>{format(new Date(date2), "dd/MM/yyyy")}</span>
                <span>Click to Remove</span>
              </span>
            )}
          </Pin>
        </div>

        <Submit
          disabled={!(date1 && date2)}
          className={date1 && date2 ? "" : "disabled"}
          onClick={submitClick}
        >
          ADD
        </Submit>
      </div>
    </>
  );
}

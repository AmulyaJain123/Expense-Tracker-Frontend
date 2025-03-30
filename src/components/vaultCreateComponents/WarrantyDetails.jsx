import { useState, useRef, useEffect } from "react";
import ErrorElement from "./ErrorElement";
import { billAmountValidate, dateFormat } from "../../util/algo";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";
import styles from "./WarrantyDetails.module.css";
import right from "../../assets/right.png";
import left from "../../assets/left.png";
import { calcExpiry } from "../../util/algo";

const WarrantyDetails = forwardRef(function WarrantyDetails({ ...prop }, ref) {
  const warDateRef = useRef();
  const warNameRef = useRef();
  const warTotalRef = useRef();
  const warDescRef = useRef();
  const expDateRef = useRef();
  const durationRef = useRef(null);
  const [name, setName] = useState("");
  const [wardate, setWarDate] = useState("");
  const [total, setTotal] = useState("");
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [AmountError, setAmountError] = useState(null);
  const [expDate, setExpDate] = useState("");
  const [expDuration, setExpDuration] = useState("");
  const [expDateError, setExpDateError] = useState(null);
  const [expDurationError, setExpDurationError] = useState(null);
  const [currDate, setCurrDate] = useState(new Date().toDateString());
  const [warrantyMode, setWarrantyMode] = useState(0);
  const [warrantyStatus, setWarrantyStatus] = useState(true);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      getData() {
        const warName = name.trim();
        const warDate = new Date(wardate).toUTCString();
        let warDesc = warDescRef.current.value.trim();
        if (warDesc === "") {
          warDesc = "None";
        }
        const warTotal = total != "" ? total : null;
        const createdOn = new Date(currDate).toUTCString();
        const mode = warrantyMode;
        const duration = {
          years: expDuration === "" ? 0 : expDuration.split(" ")[0],
          months: expDuration === "" ? 0 : expDuration.split(" ")[1],
          days: expDuration === "" ? 0 : expDuration.split(" ")[2],
        };
        const date =
          expDate === ""
            ? calcExpiry(
                {
                  years: parseInt(duration.years),
                  months: parseInt(duration.months),
                  days: parseInt(duration.days),
                },
                new Date(warDate)
              ).toUTCString()
            : new Date(expDate).toUTCString();
        console.log(date);
        const obj = {
          warName,
          warDate,
          warDesc,
          warTotal,
          createdOn,
          expiry: {
            mode,
            duration,
            date,
          },
        };
        return obj;
      },
    };
  });

  useEffect(() => {
    if (
      nameError != null ||
      dateError != null ||
      AmountError != null ||
      name === "" ||
      wardate === "" ||
      (warrantyMode === 1 && (expDateError != null || expDate === "")) ||
      (warrantyMode === 0 &&
        (expDurationError != null ||
          expDuration === "" ||
          expDuration === "0 0 0"))
    ) {
      dispatch(vaultActions.setDetailValidation(false));
    } else {
      dispatch(vaultActions.setDetailValidation(true));
    }
  }, [nameError, dateError, AmountError, name, wardate, total, warrantyMode, expDateError, expDate, expDurationError, expDuration]);

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
    const inputs = document.querySelectorAll(".disableScroll2");
    console.log(inputs);
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
  }, [warrantyMode, warrantyStatus]);

  useEffect(() => {
    setExpDateError(null);
    setExpDate("");
    setExpDurationError(null);
    setExpDuration("");
    if (durationRef.current) {
      durationRef.current.children[0].children[1].value = "";
      durationRef.current.children[1].children[1].value = "";
      durationRef.current.children[2].children[1].value = "";
    }
  }, [warrantyMode]);

  function warNameChange(event) {
    setName(event.target.value);
    if (event.target.value.trim() === "") {
      setNameError("Warranty Name cannot be empty.");
    } else {
      setNameError(null);
    }
  }
  function warDateChange(event) {
    let resetExpiry = false;
    setWarDate(event.target.value);
    if (event.target.value === "") {
      resetExpiry = true;
      setDateError("Warranty Date cannot be empty.");
    } else {
      const dateEntered = new Date(event.target.value).setHours(0, 0, 0, 0);
      if (dateEntered > new Date(currDate)) {
        resetExpiry = true;
        setDateError("Warranty Date cannot follow after Created-On Date.");
      } else {
        if (warrantyMode === 1 && expDate != "") {
          const expirationDate = new Date(expDate).setHours(0, 0, 0, 0);
          if (dateEntered > expirationDate) {
            setExpDateError(
              "Expiration Date cannot be earlier than Warranty Date."
            );
          } else if (
            expDateError ===
            "Expiration Date cannot be earlier than Warranty Date."
          ) {
            setExpDateError(null);
          }
        }
        setDateError(null);
      }
    }

    if (resetExpiry) {
      setWarrantyStatus(true);
      setExpDate("");
      setExpDateError(null);
      setExpDuration("");
      setExpDurationError(null);
    } else {
      setWarrantyStatus(false);
    }
  }

  function warTotalChange(event) {
    console.log(event.target.value);
    setTotal(event.target.value);
    console.log(event.target.value);
    if (!billAmountValidate(event.target.value)) {
      setAmountError("Total Amount is out of bounds.");
    } else {
      setAmountError(null);
    }
  }

  function warDurationValidate(val) {
    console.log(val);
    if (val != "" && (val < 0 || Math.floor(val) != val)) {
      return false;
    }
    return true;
  }

  function durationChange() {
    const year = durationRef.current.children[0].children[1];
    const month = durationRef.current.children[1].children[1];
    const day = durationRef.current.children[2].children[1];
    const duration = `${year.value === "" ? 0 : year.value} ${
      month.value === "" ? 0 : month.value
    } ${day.value === "" ? 0 : day.value}`;
    console.log("s", duration, "e");
    setExpDuration(duration);
    if (duration === "0 0 0") {
      setExpDurationError("Expiry Duration cannot be empty");
    } else {
      if (
        warDurationValidate(year.value) &&
        warDurationValidate(month.value) &&
        warDurationValidate(day.value)
      ) {
        setExpDurationError(null);
      } else {
        setExpDurationError("Invalid Value Entered");
      }
    }
  }

  function expDateChange() {
    const newDate = expDateRef.current.value;
    setExpDate(newDate);
    if (newDate === "") {
      setExpDateError("Expiration Date cannot be empty.");
    } else {
      const expirationDate = new Date(newDate).setHours(0, 0, 0, 0);
      const warrantyDate = new Date(wardate).setHours(0, 0, 0, 0);
      if (expirationDate < warrantyDate) {
        setExpDateError(
          "Expiration Date cannot be earlier than Warranty Date."
        );
      } else {
        setExpDateError(null);
      }
    }
  }

  return (
    <div className={`zigzag ${styles.main}`}>
      <div className="bg-slate-100  m-[10px] rounded-md flex text-black justify-center items-center uppercase font-bold">
        Create Warranty
      </div>

      <div className="flex h-[15px]">
        <div className="billCuts h-[15px] w-[15px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-[10px] w-full  border-b-[2.5px] border-dashed border-stone-200"></div>
          <div className=" w-full "></div>
        </div>
        <div className="billCuts h-[15px] w-[15px] rounded-l-full"></div>
      </div>

      <div className="flex flex-col mt-[60px]">
        <div className="flex flex-col">
          <div className="text-base relative font-semibold flex justify-center">
            Warranty Name
            <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
              REQ
            </span>
          </div>
          <input
            type="text"
            placeholder="Warranty Name"
            maxLength={"40"}
            ref={warNameRef}
            value={name}
            onChange={(event) => warNameChange(event)}
            className="flex p-2 px-3 text-center mx-3 mt-[6px] bg-slate-100"
          />
          <ErrorElement error={nameError} />
        </div>
        <div className="flex flex-col mb-[35px]">
          <div className="text-base relative font-semibold flex justify-center">
            Created On
            <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
              REQ
            </span>
          </div>
          <div className="flex p-2 px-3 text-xs justify-center text-center mx-3 mt-[6px] bg-slate-100">
            {dateFormat(currDate)}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base relative font-semibold flex justify-center">
            Warranty Date
            <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
              REQ
            </span>
          </div>
          <div className="p-2 px-3 relative flex text-xs flex-grow justify-between mx-3 mt-[6px] bg-slate-100">
            <input
              ref={warDateRef}
              value={wardate}
              onChange={warDateChange}
              type="date"
              className="bg-inherit focus:outline-none w-full"
            />
            <span
              style={{ color: wardate ? "#000" : "#737373" }}
              onClick={() => warDateRef.current.showPicker()}
              className="absolute hover:cursor-pointer left-0 h-auto p-2 px-4 pl-6 flex items-center top-0 w-[70%] bg-slate-100"
            >
              {wardate ? dateFormat(wardate) : "NOT ENTERED"}
            </span>
          </div>

          <ErrorElement error={dateError} />
        </div>
        <div className="flex flex-col">
          <div className="text-base relative font-semibold flex justify-center">
            Warranty Total
          </div>
          <input
            type="number"
            placeholder="Warranty Total"
            ref={warTotalRef}
            value={total}
            onChange={warTotalChange}
            className="p-2 px-3 text-center disableScroll overflow-hidden mx-3 mt-[6px] bg-slate-100"
          />
          <div className="flex justify-between px-3 text-xs py-1 bg-stone-100 rounded-md mx-3 mt-[6px]">
            <span className="font-medium text-neutral-500">Value Entered:</span>
            <span className="text-neutral-500">
              {total === "" ? "NULL" : total}
            </span>
          </div>
          <ErrorElement error={AmountError} />
        </div>
        <div className="flex flex-col mb-[20px]">
          <div className="text-base font-semibold flex justify-center">
            Description
          </div>
          <textarea
            placeholder="Description"
            ref={warDescRef}
            className="p-2 px-3 text-center text-xs resize-none h-[110px] mx-3 mt-[6px] bg-slate-100"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <span className="text-base relative font-semibold flex justify-center">
            Warranty Mode
          </span>
          <div className="flex mt-3 justify-center">
            <button
              disabled={warrantyStatus}
              onClick={() => setWarrantyMode((p) => (p - 1 + 2) % 2)}
              className=" disabled:pointer-events-none hover:scale-105 duration-500 disabled:opacity-50"
            >
              <img
                src={left}
                className="w-[20px] h-[20px] flex justify-center items-center"
                alt=""
              />
            </button>
            <span
              style={{ opacity: !warrantyStatus ? "100%" : "40%" }}
              className="py-[6px] px-4 rounded-md uppercase bg-black text-center text-sm text-white font-semibold w-[120px] mx-2"
            >
              {warrantyMode === 0 ? "Duration" : "Date"}
            </span>
            <button
              disabled={warrantyStatus}
              onClick={() => setWarrantyMode((p) => (p + 1) % 2)}
              className=" disabled:pointer-events-none hover:scale-105 duration-500 disabled:opacity-50"
            >
              <img
                src={right}
                className="w-[20px] h-[20px] flex justify-center items-center"
                alt=""
              />
            </button>
          </div>

          {!warrantyStatus ? (
            <div className="pt-6 flex flex-col">
              {warrantyMode === 1 ? (
                <div className="flex flex-col">
                  <div className="text-base relative font-semibold flex justify-center">
                    Expiration Date
                    <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
                      REQ
                    </span>
                  </div>
                  <div className="p-2 px-3 relative flex text-xs flex-grow justify-between mx-3 mt-[6px] bg-slate-100">
                    <input
                      ref={expDateRef}
                      value={expDate}
                      onChange={expDateChange}
                      type="date"
                      className="bg-inherit focus:outline-none w-full"
                    />
                    <span
                      style={{ color: expDate ? "#000" : "#737373" }}
                      onClick={() => expDateRef.current.showPicker()}
                      className="absolute hover:cursor-pointer left-0 h-auto p-2 px-3 pl-6 flex items-center top-0 w-[70%] bg-slate-100"
                    >
                      {expDate ? dateFormat(expDate) : "NOT ENTERED"}
                    </span>
                  </div>

                  <ErrorElement error={expDateError} />
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="text-base relative font-semibold flex justify-center">
                    Expiration Duration
                    <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
                      REQ
                    </span>
                  </div>
                  <div
                    ref={durationRef}
                    className="flex justify-between text-xs mt-3 mx-4"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="font-medium">Years</span>
                      <input
                        type="number"
                        onChange={(event) => durationChange(event)}
                        className="rounded-[5px]  disableScroll2 bg-slate-100 py-1 px-2  w-[65px]"
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <span className="font-medium">Months</span>
                      <input
                        type="number"
                        onChange={(event) => durationChange(event)}
                        className="rounded-[5px]  disableScroll2 bg-slate-100 py-1 px-2  w-[65px]"
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <span className="font-medium">Days</span>
                      <input
                        type="number"
                        onChange={(event) => durationChange(event)}
                        className="rounded-[5px]  disableScroll2 bg-slate-100 py-1 px-2  w-[65px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col text-xs px-4 py-1 bg-stone-100 rounded-md mx-4 mt-2">
                    <span className="font-medium text-center text-neutral-500">
                      Value Entered
                    </span>
                    <div className="flex mt-1 space-x-3 justify-center">
                      <span>
                        {expDuration === ""
                          ? "0 Y"
                          : `${expDuration.split(" ")[0]} Y`}
                      </span>
                      <span>
                        {expDuration === ""
                          ? "0 M"
                          : `${expDuration.split(" ")[1]} M`}
                      </span>
                      <span>
                        {expDuration === ""
                          ? "0 D"
                          : `${expDuration.split(" ")[2]} D`}
                      </span>
                    </div>
                  </div>

                  <ErrorElement error={expDurationError} />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <p className="px-3 text-xs mt-8 text-center">
        *Fields marked with{" "}
        <span className="px-2 py-1 font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
          REQ
        </span>{" "}
        are Required
      </p>
    </div>
  );
});

export default WarrantyDetails;

import { useState, useRef, useEffect } from "react";
import ErrorElement from "./ErrorElement";
import { billAmountValidate } from "../../util/algo";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";
import styles from "./ReceiptDetails.module.css";
import { format } from "date-fns";

const ReceiptDetails = forwardRef(function ReceiptDetails({ ...prop }, ref) {
  const recDateRef = useRef();
  const recNameRef = useRef();
  const recTotalRef = useRef();
  const recDescRef = useRef();
  const [name, setName] = useState("");
  const [recdate, setRecDate] = useState("");
  const [total, setTotal] = useState("");
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [AmountError, setAmountError] = useState(null);
  const [currDate, setCurrDate] = useState(new Date().toDateString());
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      getData() {
        const recName = name.trim();
        const recDate = new Date(recdate).toUTCString();
        let recDesc = recDescRef.current.value.trim();
        if (recDesc === "") {
          recDesc = "None";
        }
        const recTotal = total != "" ? total : null;
        const createdOn = new Date(currDate).toUTCString();
        const obj = {
          recName,
          recDate,
          recDesc,
          recTotal,
          createdOn,
        };
        return obj;
      },
    };
  });

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
    if (
      nameError != null ||
      dateError != null ||
      AmountError != null ||
      name === "" ||
      recdate === ""
    ) {
      dispatch(vaultActions.setDetailValidation(false));
    } else {
      dispatch(vaultActions.setDetailValidation(true));
    }
  }, [nameError, dateError, AmountError, name, recdate, total]);

  function recNameChange(event) {
    setName(event.target.value);
    if (event.target.value.trim() === "") {
      setNameError("Receipt Name cannot be empty.");
    } else {
      setNameError(null);
    }
  }
  function recDateChange(event) {
    setRecDate(event.target.value);
    if (event.target.value === "") {
      setDateError("Receipt Date cannot be empty.");
      return;
    }
    const dateEntered = new Date(event.target.value);
    if (dateEntered > new Date()) {
      setDateError("Receipt Date cannot follow after Created-On Date.");
    } else {
      setDateError(null);
    }
  }
  function recTotalChange(event) {
    setTotal(event.target.value);
    console.log(event.target.value);
    if (!billAmountValidate(event.target.value)) {
      setAmountError("Total Amount is out of bounds.");
    } else {
      setAmountError(null);
    }
  }

  return (
    <div className={`zigzag ${styles.main}`}>
      <div className="bg-slate-100 m-[10px] rounded-md flex text-black justify-center items-center uppercase font-bold">
        Create Receipt
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
            Receipt Name
            <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
              REQ
            </span>
          </div>
          <input
            type="text"
            placeholder="Receipt Name"
            maxLength={"40"}
            ref={recNameRef}
            value={name}
            onChange={(event) => recNameChange(event)}
            className="flex p-2 px-3 text-center mx-3 mt-[6px] text-xs bg-slate-100"
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
          <div className="flex p-2 px-3 text-xs text-center justify-center font-medium mx-3 mt-[6px] bg-slate-100">
            {format(new Date(currDate), "EEE, dd MMM yyyy")}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base relative font-semibold flex justify-center">
            Receipt Date
            <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
              REQ
            </span>
          </div>
          <div className="p-2 px-3 relative text-xs flex flex-grow justify-between mx-3 mt-[6px] bg-slate-100">
            <input
              ref={recDateRef}
              value={recdate}
              onChange={recDateChange}
              type="date"
              className="bg-inherit focus:outline-none w-full"
            />
            <span
              style={{ color: recdate ? "#000" : "#737373" }}
              onClick={() => recDateRef.current.showPicker()}
              className="absolute hover:cursor-pointer left-0 h-auto p-2 px-4 pl-6 flex items-center top-0 w-[70%] bg-slate-100"
            >
              {recdate
                ? format(new Date(recdate), "EEE, dd MMM yyyy")
                : "NOT ENTERED"}
            </span>
          </div>

          <ErrorElement error={dateError} />
        </div>
        <div className="flex flex-col">
          <div className="text-base relative font-semibold flex justify-center">
            Receipt Total
          </div>
          <input
            type="number"
            placeholder="Receipt Total"
            ref={recTotalRef}
            value={total}
            onChange={recTotalChange}
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
            ref={recDescRef}
            className="p-2 px-3 text-center text-xs resize-none h-[110px] mx-3 mt-[6px] bg-slate-100"
          />
        </div>
      </div>
      <p className="px-4 mt-6 text-xs text-center">
        *Fields marked with{" "}
        <span className="px-2 py-1 font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
          REQ
        </span>{" "}
        are Required
      </p>
    </div>
  );
});

export default ReceiptDetails;

import { useState, useRef, useEffect } from "react";
import ErrorElement from "./ErrorElement";
import { billAmountValidate } from "../../util/algo";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";
import styles from "./DocDetails.module.css";
import { format } from "date-fns";

const DocDetails = forwardRef(function DocDetails({ ...prop }, ref) {
  const recDateRef = useRef();
  const recNameRef = useRef();
  const recDescRef = useRef();
  const [name, setName] = useState("");
  const [recdate, setRecDate] = useState("");
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [currDate, setCurrDate] = useState(new Date().toDateString());
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      getData() {
        const docName = name.trim();
        const docDate = recdate != "" ? new Date(recdate).toUTCString() : null;
        let docDesc = recDescRef.current.value.trim();
        if (docDesc === "") {
          docDesc = "None";
        }
        const createdOn = new Date(currDate).toUTCString();
        const obj = {
          docName,
          docDate,
          docDesc,
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
    if (nameError != null || dateError != null || name === "") {
      dispatch(vaultActions.setDetailValidation(false));
    } else {
      dispatch(vaultActions.setDetailValidation(true));
    }
  }, [nameError, dateError, name, recdate]);

  function recNameChange(event) {
    setName(event.target.value);
    if (event.target.value.trim() === "") {
      setNameError("Doc Name cannot be empty.");
    } else {
      setNameError(null);
    }
  }
  function recDateChange(event) {
    setRecDate(event.target.value);
    if (event.target.value === "") {
      setDateError(null);
      return;
    }
    const dateEntered = new Date(event.target.value);
    if (dateEntered > new Date()) {
      setDateError("Doc Date cannot follow after Created-On Date.");
    } else {
      setDateError(null);
    }
  }

  return (
    <div className={`zigzag ${styles.main}`}>
      <div className="bg-slate-100 m-[10px] rounded-md flex text-black justify-center items-center uppercase font-bold">
        Create Doc
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
            Doc Name
            <span className="px-2 py-1 text-xs absolute left-[7px] font-medium text-neutral-500 bg-neutral-100 rounded-md mx-1">
              REQ
            </span>
          </div>
          <input
            type="text"
            placeholder="Doc Name"
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
            Doc Date
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

export default DocDetails;

import { BackButton, Button } from "../../UIComponents/NextButton";
import AddBillNavThumbs from "../../UIComponents/AddBillNavThumbs";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { styling } from "../../util/styling";
import BillModal from "./BillModal";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import {
  addBillHeirarchy,
  createSplitHeirachy,
} from "../../util/componentNavigation";
import BillComponent from "./BillComponent";
import { splitAlgo } from "../../util/algo";
import DiscardButton from "../../UIComponents/DiscardButton";

export default function AddBillStage() {
  const modalRef = useRef();
  const bills = useSelector((state) => state.splitCreate.bills);
  const selectBillNavStatus = useSelector(
    (state) => state.splitCreate.selectBillNavStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document
      .getElementById("Top")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, []);

  function addBillClick() {
    dispatch(splitCreateActions.changeAddBillNavStatus(addBillHeirarchy[0]));
    modalRef.current.open();
  }

  return (
    <>
      <div className="max-w-[400px] sm:max-w-[700px] sm:w-[600px] xl:w-[700px] bg-[#fff] flex flex-col p-3 rounded-xl mt-8  mx-auto">
        <BillModal ref={modalRef} />
        <header
          id="title"
          style={{}}
          className="sm:text-[25px] text-[20px] xl:text-[22px] font-extrabold uppercase justify-center mb-3 flex items-center rounded-lg bg-slate-100 py-3 px-5"
        >
          Add Bills
        </header>
        <div className="text-sm flex flex-col text-stone-500  rounded-lg bg-slate-100 ">
          {bills.length === 0 ? (
            <p className="flex flex-grow justify-center pt-8">
              {" "}
              No Bills Added
            </p>
          ) : (
            <div className="border-b-2 border-white gap-[6px] p-3 flex flex-wrap flex-grow ">
              {bills.map((bill) => {
                return (
                  <AddBillNavThumbs
                    key={bill.id}
                    viewOnly="false"
                    status={bill.id === selectBillNavStatus ? "true" : "false"}
                    identity={bill.id}
                  >
                    {bill.billName}
                  </AddBillNavThumbs>
                );
              })}
            </div>
          )}
          <div className="p-3 w-full  h-[620px] sm:h-[420px] overflow-auto">
            {bills.length === 0 ? null : selectBillNavStatus === null ? (
              <p className="text-center mt-24">No Bill Selected</p>
            ) : (
              <BillComponent id={selectBillNavStatus} />
            )}
          </div>
        </div>
        <button
          onClick={addBillClick}
          className="rounded-lg hover:bg-white text-sm border-[1.5px] border-black hover:text-black duration-500 bg-black text-white uppercase font-semibold flex flex-grow p-2 sm:p-2 justify-center items-center mt-3 "
        >
          Add a Bill
        </button>
      </div>
    </>
  );
}

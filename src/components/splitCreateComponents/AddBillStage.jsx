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
import { EmptyBox } from "../../UIComponents/NoneFound";

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
      <div className="max-w-[400px] sm:max-w-[700px]  w-[90%] sm:w-[600px] lg:w-[700px] bg-[#fff] flex flex-col p-2 sm:p-3 rounded-xl mt-4 sm:mt-8  mx-auto">
        <BillModal ref={modalRef} />
        <header
          id="title"
          style={{}}
          className="text-[18px] sm:text-[20px] lg:text-[24px] font-extrabold uppercase justify-center mb-2 sm:mb-3 flex items-center rounded-lg bg-slate-100 py-2 sm:py-3 lg:py-[14px] px-5"
        >
          Add Bills
        </header>
        <div className="text-sm flex flex-col text-stone-500  rounded-lg bg-slate-100 ">
          {bills.length === 0 ? (
            <div className="p-[6px] sm:p-3 mb-2 sm:mb-3 w-full flex min-h-[460px] sm:min-h-[410px] ">
              <EmptyBox
                IconSize={60}
                gap={14}
                textColor="#cbd5e1"
                textSize={15}
                msg="No Bills Added"
              />
            </div>
          ) : (
            <>
              <div className="border-b-2 border-white gap-[6px] p-2 sm:p-3 flex flex-wrap flex-grow ">
                {bills.map((bill) => {
                  return (
                    <AddBillNavThumbs
                      key={bill.id}
                      viewOnly="false"
                      status={
                        bill.id === selectBillNavStatus ? "true" : "false"
                      }
                      identity={bill.id}
                    >
                      {bill.billName}
                    </AddBillNavThumbs>
                  );
                })}
              </div>
              <div className="p-[6px] flex sm:p-3 mb-2 sm:mb-3 w-full min-h-[460px] sm:min-h-[410px]">
                {bills.length === 0 ? null : selectBillNavStatus === null ? (
                  <div className="flex w-full text-slate-300 flex-col flex-grow justify-center items-center">
                    <i class="fi fi-sr-choose flex items-center text-[60px]"></i>
                    <span className="mt-4 text-base font-normal">
                      No Bill Selected
                    </span>
                  </div>
                ) : (
                  <BillComponent id={selectBillNavStatus} />
                )}
              </div>
            </>
          )}
        </div>
        <button
          onClick={addBillClick}
          className="rounded-md sm:rounded-lg hover:bg-white text-xs sm:text-sm border-[1.5px] border-black hover:text-black duration-500 bg-black text-white uppercase font-semibold flex flex-grow p-[6px] sm:p-2 justify-center items-center mt-2 sm:mt-3 "
        >
          Add a Bill
        </button>
      </div>
    </>
  );
}

import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { formatVal } from "../../util/algo";
import { amountInRange } from "../../util/algo";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import styles from "./DivideEquallySplitModal.module.css";

const Textarea = styled.textarea`
  resize: none;
`;

export default function CommonModalPart() {
  const dispatch = useDispatch();
  const tempInfo = useSelector((state) => state.splitCreate.addBillTempStore);

  return (
    <>
      <div className="flex flex-col space-y-3 sm:space-y-0 text-center sm:text-start sm:flex-row rounded-xl bg-white p-3">
        <div className=" text-sm sm:text-base xl:text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
          Bill Name
        </div>
        <input
          type="text"
          maxLength={20}
          value={tempInfo.billName}
          onChange={(event) =>
            dispatch(
              splitCreateActions.editBillTempStore({
                billName: event.target.value,
              })
            )
          }
          placeholder="Name"
          className="rounded-md sm:ml-4 bg-slate-100 text-center sm:text-start flex-grow p-2 pl-6 text-md"
        />
      </div>
      <div className="flex mt-4 flex-col space-y-4 rounded-xl bg-white p-3">
        <div className=" text-sm sm:text-base xl:text-lg bg-black flex justify-center items-center font-semibold text-white py-2 px-6 rounded-lg">
          Description
        </div>
        <Textarea
          //   type="text"
          maxLength={70}
          value={tempInfo.description}
          onChange={(event) =>
            dispatch(
              splitCreateActions.editBillTempStore({
                description: event.target.value,
              })
            )
          }
          placeholder="Description"
          className="text-md rounded-md h-[105px] bg-slate-100 flex-grow p-2 pl-4 text-md"
        ></Textarea>
      </div>
      <div className="flex space-y-3 sm:space-y-0 text-center sm:text-start flex-col sm:flex-row mt-4 rounded-xl bg-white p-3">
        <div className=" text-sm sm:text-base xl:text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
          Bill Date
        </div>
        <div className="flex-grow flex relative">
          <input
            type="date"
            value={tempInfo.billDate}
            onChange={(event) =>
              dispatch(
                splitCreateActions.editBillTempStore({
                  billDate: event.target.value,
                })
              )
            }
            className="rounded-md sm:ml-4 bg-slate-100 flex-grow p-2 pl-6 text-md"
          />
          <span
            style={{
              color: !tempInfo.billDate ? "#78716C" : "",
            }}
            className="rounded-md absolute font-medium left-4 pl-6 bg-slate-100 w-[80%] flex items-center h-[44px]  text-md "
          >
            {!tempInfo.billDate
              ? "NOT ENTERED"
              : new Date(tempInfo.billDate).toDateString()}
          </span>
        </div>
      </div>
    </>
  );
}

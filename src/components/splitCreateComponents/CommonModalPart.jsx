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
      <div className="flex flex-col space-y-3 sm:space-y-0 text-center sm:text-start sm:flex-row rounded-lg bg-white p-[8px]">
        <div className=" text-sm  bg-black  font-semibold text-white py-[6px] px-3 rounded-md">
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
          className="rounded-md sm:ml-[8px] bg-slate-100 text-center sm:text-start flex-grow p-[6px] pl-4 text-xs"
        />
      </div>
      <div className="flex mt-3 flex-col space-y-2 rounded-lg bg-white p-2">
        <div className="text-sm bg-black flex justify-center items-center font-semibold text-white py-[6px] px-6 rounded-md">
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
          className="text-md rounded-md h-[75px] bg-slate-100 flex-grow p-[6px] pl-3 text-md"
        ></Textarea>
      </div>
      <div className="flex space-y-3 sm:space-y-0 text-center sm:text-start flex-col sm:flex-row mt-3 rounded-lg bg-white p-2">
        <div className="text-sm bg-black  font-semibold text-white py-[6px] px-6 rounded-md">
          Bill Date
        </div>
        <div className="flex-grow flex text-xs relative">
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
            className="rounded-md focus:outline-none sm:ml-2 bg-slate-100 flex-grow p-2 pl-6 text-xs"
          />
          <span
            style={{
              color: !tempInfo.billDate ? "#78716C" : "",
            }}
            className="rounded-md absolute font-medium left-4 pl-2 bg-slate-100 w-[80%] flex items-center h-[34px]  text-md "
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

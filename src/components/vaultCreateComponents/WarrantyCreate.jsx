import { useState, useRef, useEffect } from "react";
import WarrantyDetails from "./WarrantyDetails";
import InputFile from "./InputFile";
import Tags from "./Tags";
import { DiscardBillButton } from "../../UIComponents/DiscardButton";
import { Button } from "../../UIComponents/NextButton";
import { useSelector } from "react-redux";
import Loading from "./Loading";

export default function WarrantyCreate() {
  const detailRef = useRef();
  const inputRef = useRef();
  const tagRef = useRef();
  const [loading, setLoading] = useState(false);
  const detailValidation = useSelector((state) => state.vault.detailValidation);
  const fileValidation = useSelector((state) => state.vault.fileValidation);

  // function getExpiryDate(initialDate, expireDuration) {
  //   let currDate = new Date(initialDate);
  //   let { days, months, years } = expireDuration;

  //   while (years != 0) {
  //     let year = 365;
  //     let currY = currDate.getFullYear();
  //     if (
  //       (((currY % 100 != 0 && currY % 4 === 0) || currY % 400 === 0) &&
  //         (currDate.getMonth() + 1 < 3 ||
  //           (currDate.getMonth() + 1 === 2 && currDate.getDate() < 29))) ||
  //       ((((currY + 1) % 100 != 0 && (currY + 1) % 4 === 0) ||
  //         (currY + 1) % 400 === 0) &&
  //         currDate.getMonth() + 1 > 2)
  //     ) {
  //       year = 366;
  //     }
  //     const res = currDate.setDate(currDate.getDate() + year);
  //     currDate = new Date(res);
  //     // console.log(currDate);
  //     years--;
  //   }
  //   while (months != 0) {
  //     let month = 30;
  //     const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //     let currY = currDate.getFullYear();
  //     let currM = currDate.getMonth();
  //     if ((currY % 100 != 0 && currY % 4 === 0) || currY % 400 === 0) {
  //       daysInMonths[1] = 29;
  //     }
  //     month = daysInMonths[currM];
  //     const res = currDate.setDate(currDate.getDate() + month);
  //     currDate = new Date(res);
  //     // console.log(currDate);
  //     months--;
  //   }
  //   const res = currDate.setDate(currDate.getDate() + days);
  //   currDate = new Date(res);
  //   // console.log(currDate);
  //   currDate.setHours(23, 59, 59, 0);
  //   return currDate;
  // }

  async function saveHandle() {
    setLoading("load");
    const res = detailRef.current.getData();
    const res1 = inputRef.current.getData();
    const res2 = tagRef.current.getData();
    console.log(res, res1, res2);
    const data = {
      details: res,
      files: res1,
      tags: res2,
    };
    console.log(data);
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_API + "/vault/createwarranty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw "failed";
      } else {
        setLoading("success");
      }
    } catch (err) {
      console.log(err);
      setLoading("error");
    }
  }

  function changeMode(str) {
    setLoading(str);
  }

  function retry() {
    saveHandle();
  }

  return (
    <>
      <div className="flex flex-col w-fit mx-auto">
        <div className="flex-col xl:flex-row items-center xl:items-stretch justify-center space-y-[100px] xl:space-y-0 xl:space-x-[50px] mt-[50px] p-2 sm:p-4 text-stone-600 flex">
          <WarrantyDetails ref={detailRef} />
          <InputFile ref={inputRef} />
        </div>
        <div className="mx-auto mt-8 w-full px-4">
          <Tags ref={tagRef}></Tags>
        </div>
      </div>
      {loading != false ? (
        <Loading retry={retry} changeMode={changeMode} mode={loading} />
      ) : null}

      <div className="flex flex-col items-center sm:items-start scale-90 sm:scale-100 sm:flex-row justify-between mx-auto mt-6 sm:pr-8 mb-6">
        <DiscardBillButton>Discard</DiscardBillButton>
        <Button
          disabled={!(detailValidation && fileValidation) || loading === "load"}
          onClick={saveHandle}
          className={
            (detailValidation && fileValidation) === false ? "disabled" : ""
          }
        >
          Save
        </Button>
      </div>
    </>
  );
}

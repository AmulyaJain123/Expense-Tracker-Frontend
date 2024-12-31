import { useState, useRef, useEffect } from "react";
import InputFile from "./InputFile";
import Tags from "./Tags";
import { DiscardBillButton } from "../../UIComponents/DiscardButton";
import { Button } from "../../UIComponents/NextButton";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import ReceiptDetails from "./ReceiptDetails";

export default function ReceiptCreate() {
  const detailRef = useRef();
  const inputRef = useRef();
  const tagRef = useRef();
  const [loading, setLoading] = useState(false);
  const detailValidation = useSelector((state) => state.vault.detailValidation);
  const fileValidation = useSelector((state) => state.vault.fileValidation);

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
        import.meta.env.VITE_BACKEND_API + "/vault/createreceipt",
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
          <ReceiptDetails ref={detailRef} />
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

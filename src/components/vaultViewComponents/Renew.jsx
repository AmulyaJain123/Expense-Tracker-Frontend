import NiceButton from "../../UIComponents/NiceButton";
import { useRef, useState } from "react";
import ErrorElement from "../vaultCreateComponents/ErrorElement";
import exclamation from "../../assets/exclamation.png";
import successIcon from "../../assets/success.png";
import load from "../../assets/loader.gif";
import RedirectingWindow from "../../UIComponents/RedirectingWindow";

export default function Renew({ earlyExpDate, warId }) {
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const expDateRef = useRef();
  const [expDate, setExpDate] = useState();
  const [expDateError, setExpDateError] = useState();

  function expDateChange() {
    const newDate = expDateRef.current.value;
    setExpDate(newDate);
    if (newDate === "") {
      setExpDateError("Expiration Date cannot be empty.");
    } else {
      const expirationDate = new Date(newDate).setHours(0, 0, 0, 0);
      const earlyDate = new Date(earlyExpDate).setHours(0, 0, 0, 0);
      console.log(expirationDate, earlyDate);
      if (expirationDate <= earlyDate) {
        setExpDateError(
          "Expiration Date cannot be earlier than the Previous Expiration Date."
        );
      } else {
        setExpDateError(null);
      }
    }
  }

  function renewHandle() {
    setModalOpen(1);
    setEditing(false);
    setError(null);
  }

  async function deleteConfirmed() {
    setEditing(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/vault/renewwarranty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            warId: warId,
            renewedOn: new Date().toUTCString(),
            newExpDate: new Date(expDate).toUTCString(),
          }),
          credentials: "include",
        }
      );
      setEditing(false);
      if (!res.ok) {
        throw "failed";
      } else {
        setModalOpen(2);
      }
    } catch (err) {
      setEditing(false);
      setError("Something went wrong");
      console.log(err);
    }
  }

  function closeHandle() {
    setModalOpen(false);
  }

  return (
    <>
      {modalOpen ? (
        <>
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10"></div>
          <div className="rounded-2xl fixed top-[50%] translate-y-[-50%] right-[50%] z-10 translate-x-[50%] translate scale-[70%] md:scale-[80%] xl:scale-100">
            {modalOpen === 1 ? (
              <div className="rounded-xl sm:w-[500px] bg-stone-100">
                <h1 className="p-8  text-center text-lg sm:text-xl font-medium">
                  Enter a new Valid Expiration Date
                </h1>
                <div className="flex justify-center mb-8 mt-2">
                  <div className="flex flex-col">
                    <div className="text-xl relative font-semibold flex justify-center">
                      Expiration Date
                    </div>
                    <div className="p-2 px-4 relative flex flex-grow w-[320px] justify-between mx-4 mt-3 bg-slate-200">
                      <input
                        ref={expDateRef}
                        value={expDate}
                        onChange={(event) => expDateChange(event)}
                        type="date"
                        className="bg-inherit focus:outline-none w-full"
                      />
                      <span
                        style={{ color: expDate ? "#000" : "#737373" }}
                        className="absolute left-0 h-auto p-2 px-4 pl-8 flex items-center top-0 w-[70%] bg-slate-200"
                      >
                        {expDate
                          ? new Date(expDate).toDateString()
                          : "NOT ENTERED"}
                      </span>
                    </div>

                    <div className="max-w-[350px] h-[50px]">
                      <ErrorElement error={expDateError} />
                    </div>
                  </div>
                </div>
                <form
                  method="dialog"
                  className="flex pb-4 sm:pr-4 justify-center sm:justify-end space-x-6"
                >
                  {editing ? (
                    <div className="flex items-center">
                      <img
                        src={load}
                        className="w-[25px] h-[25px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  ) : null}
                  {error ? (
                    <div className="flex items-center space-x-4">
                      <img
                        src={exclamation}
                        className="w-[20px] h-[20px] flex justify-center items-center"
                        alt=""
                      />{" "}
                      <span className="text-red-500 tetx-lg ">{error}</span>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={closeHandle}
                    className="p-2 px-4 rounded-lg bg-blue-500 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    className="p-2 px-4 rounded-lg disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white"
                    type="button"
                    disabled={!expDate || expDateError != null}
                    onClick={deleteConfirmed}
                  >
                    Confirm
                  </button>
                </form>
              </div>
            ) : modalOpen === 2 ? (
              <div className="rounded-xl sm:w-[500px] bg-stone-100">
                <h1 className="p-8  text-center text-lg sm:text-xl font-medium">
                  Successfully Renewed the Warranty!!
                </h1>
                <div className="flex justify-center mt-6 ">
                  <img
                    src={successIcon}
                    className="w-[100px] h-[100px] flex justify-center items-center"
                    alt=""
                  />
                </div>
                <div className="mt-8 pb-12 flex justify-center">
                  <RedirectingWindow add={"/vault/protected/view/warranty"}>
                    <span>Redirecting to VAULT in </span>
                  </RedirectingWindow>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
      <button onClick={renewHandle}>
        <NiceButton text={"Renew Warranty"}></NiceButton>
      </button>
    </>
  );
}

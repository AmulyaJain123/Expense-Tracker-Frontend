import { useEffect, useState, useRef } from "react";
import { formatVal, splitAlgo } from "../util/algo";
import { useSelector } from "react-redux";
import load from "../assets/loader.gif";
import { useLoaderData } from "react-router-dom";
import NiceButton from "../UIComponents/NiceButton";
import { Link } from "react-router-dom";
import RedButton from "../UIComponents/RedButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OnlyXChars from "../UIComponents/OnlyXChars";
import exclamation from "../assets/exclamation.png";
import deleted from "../assets/delete.png";
import RedirectingWindow from "../UIComponents/RedirectingWindow";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

export default function SingleTransactionPage() {
  const data = useLoaderData();
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const modalRef = useRef();

  function deleteHandle() {
    setModalOpen(1);
    setDeleting(false);
    setError(null);
  }

  async function deleteConfirmed() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/deletetransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionId: data.transactionId,
          }),
          credentials: "include",
        }
      );
      setDeleting(false);
      if (!res.ok) {
        throw "failed";
      } else {
        setModalOpen(2);
      }
    } catch (err) {
      setDeleting(false);
      setError("Something went wrong");
      console.log(err);
    }
  }

  function closeHandle() {
    setModalOpen(false);
  }

  return (
    <>
      <Helmet>
        <title> {data.transactionName} | Transaction | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full interlaced overflow-auto pb-[150px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        {modalOpen ? (
          <>
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10"></div>
            <div className="rounded-2xl  fixed top-[50%] translate-y-[-50%] right-[50%] z-10 translate-x-[50%] translate scale-[60%] sm:scale-75">
              {modalOpen === 1 ? (
                <div className="rounded-xl w-[400px] sm:w-[500px] bg-stone-100">
                  <h1 className="p-8 pb-0  text-center text-lg sm:text-xl font-medium">
                    Are you sure you want to delete the Transaction?
                  </h1>
                  <div className="flex flex-col text-center justify-center mb-[10px] mt-6  px-[50px]">
                    <span className="text-black font-semibold text-lg">
                      Transaction Name
                    </span>
                    <div className="p-2 px-6 rounded-lg bg-stone-200 flex-grow  text-center sm:mb-8 font-medium ">
                      <span>{data.transactionName}</span>
                    </div>
                  </div>
                  <div className="h-[50px] flex-grow justify-center mb-3 flex sm:hidden">
                    {deleting ? (
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
                  </div>
                  <form
                    method="dialog"
                    className="flex pb-4 sm:pr-4 justify-center sm:justify-end sm:space-x-6"
                  >
                    {deleting ? (
                      <div className="sm:flex hidden items-center">
                        <img
                          src={load}
                          className="w-[25px] h-[25px] flex justify-center items-center"
                          alt=""
                        />
                      </div>
                    ) : null}
                    {error ? (
                      <div className="hidden sm:flex items-center space-x-4">
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
                      className="p-2 px-4 mr-6 sm:mr-0 rounded-lg bg-blue-500 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      className="p-2 px-4 rounded-lg bg-red-500 text-white"
                      type="button"
                      onClick={deleteConfirmed}
                    >
                      Confirm
                    </button>
                  </form>
                </div>
              ) : modalOpen === 2 ? (
                <div className="rounded-xl w-[400px] sm:w-[500px] bg-stone-100">
                  <h1 className="p-8  text-center text-lg sm:text-xl font-medium">
                    Successfully deleted the Transaction!!
                  </h1>
                  <div className="flex justify-center mt-6 ">
                    <img
                      src={deleted}
                      className="w-[100px] h-[100px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                  <div className="mt-8 pb-12 flex justify-center">
                    <RedirectingWindow add={"/track/protected/transactions"}>
                      <span>Redirecting to Transactions in </span>
                    </RedirectingWindow>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : null}

        <div className="max-w-[780px] mx-auto flex flex-col">
          <div className="flex-grow flex mt-4 sm:mt-6 justify-center">
            <div className="flex p-2 sm:p-3 rounded-lg sm:rounded-xl max-w-[1000px] mx-3 sm:mx-4 flex-grow flex-col">
              <h1 className="py-[6px] text-[16px] sm:text-[23px] uppercase font-bold text-center rounded-lg sm:rounded-xl bg-[#9d4edd] text-white ">
                Transaction details
              </h1>
              <div className=" font-bold capitalize flex text-center bg-white rounded-lg sm:rounded-xl p-4 sm:p-8 mt-3 sm:mt-4 flex-grow">
                <div className="flex flex-col space-y-2 sm:space-y-4 text-[11px] sm:text-xs flex-grow ">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      Transaction Name
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 px-2 sm:px-4 normal-case bg-stone-50 text-stone-400 font-medium">
                      {data.transactionName}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      From
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 px-2 sm:px-4 normal-case text-stone-400 bg-stone-50 font-medium">
                      {data.from}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      To
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 normal-case px-4 text-stone-400 bg-stone-50 font-medium">
                      {data.to}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      Transaction Amount
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 px-2 sm:px-4 text-stone-400 bg-stone-50 font-medium">
                      {formatVal(data.transactionAmount)}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      Transaction Date
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 px-2 sm:px-4 text-stone-400 bg-stone-50 font-medium">
                      {format(new Date(data.dateTime), "HH:mm a ")} |{" "}
                      {new Date(data.dateTime).toDateString()}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      Created On
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 px-2 sm:px-4 text-stone-400 bg-stone-50 font-medium">
                      {format(new Date(data.createdOn), "HH:mm a ")} |{" "}
                      {new Date(data.createdOn).toDateString()}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      Category
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 px-2 sm:px-4 text-stone-400 bg-stone-50 font-medium">
                      {`${data.category[0]} > ${data.category[1]} > ${data.category[2]}`}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">
                      Transaction Type
                    </span>
                    <span className="rounded-md sm:rounded-lg py-1 sm:py-2 px-2 sm:px-4 text-stone-400 bg-stone-50 font-medium">
                      {data.transactionType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-8 sm:mt-12 justify-between mx-8 sm:mx-12">
            <Link to={"/track/protected/transactions"}>
              <NiceButton text={"Go Back"} />
            </Link>
            <button onClick={deleteHandle}>
              <RedButton text={"Delete"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

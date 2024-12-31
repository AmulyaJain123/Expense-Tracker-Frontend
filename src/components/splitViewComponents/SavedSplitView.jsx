import { useEffect, useState, useRef } from "react";
import { formatVal, splitAlgo } from "../../util/algo";
import { useSelector } from "react-redux";
import load from "../../assets/loader.gif";
import General from "../splitCreateComponents/General";
import Stats from "../splitCreateComponents/Stats";
import Bills from "../splitCreateComponents/Bills";
import Transactions from "../splitCreateComponents/Transactions";
import { useLoaderData } from "react-router-dom";
import NiceButton from "../../UIComponents/NiceButton";
import { Link } from "react-router-dom";
import RedButton from "../../UIComponents/RedButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SavedSplit from "./SavedSplit";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import exclamation from "../../assets/exclamation.png";
import deleted from "../../assets/delete.png";
import RedirectingWindow from "../../UIComponents/RedirectingWindow";
import ShareModal from "./ShareModal";
import Shared from "./Shared";
import { Helmet } from "react-helmet-async";

export default function SavedSplitView() {
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
        import.meta.env.VITE_BACKEND_API + "/split/deletesavedsplit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            splitId: data.splitId,
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

  function shareClick() {
    modalRef.current.open();
  }

  return (
    <>
      <Helmet>
        <title>{data.splitInfo.splitName} | Saved SPLIT | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full interlaced overflow-auto pb-[200px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        {modalOpen ? (
          <>
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10"></div>
            <div className="rounded-2xl fixed top-[50%] translate-y-[-50%] right-[50%] z-10 translate-x-[50%] translate scale-[70%] md:scale-[80%] xl:scale-100">
              {modalOpen === 1 ? (
                <div className="rounded-xl sm:w-[500px] bg-stone-100">
                  <h1 className="p-8  text-center text-lg sm:text-xl font-medium">
                    Are you sure you want to delete the following SPLIT?
                  </h1>
                  <div className="flex  justify-center mb-[10px] mt-2 sm:mb-0 sm:space-x-[120px] px-[50px]">
                    <div className="origin-top scale-75 shadow-xl">
                      <div className="flex h-[200px] rounded-xl bg-slate-100 ">
                        <div className="rounded-l-xl w-[100px] striped"></div>
                        <div className="flex flex-col space-y-2 pl-4">
                          <div className="flex space-x-4">
                            <div className="flex flex-col p-2 w-[200px] py-4 space-y-2">
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  SPLIT Name
                                </span>{" "}
                                <span className="pl-1">
                                  <OnlyXChars
                                    x={15}
                                    text={data.splitInfo.splitName}
                                  />
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  Created On
                                </span>{" "}
                                <span className="pl-1">
                                  {new Date(
                                    data.splitInfo.splitDate
                                  ).toDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col p-2 w-[200px] py-4 space-y-2">
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  Description
                                </span>{" "}
                                <span className="pl-1">
                                  <OnlyXChars
                                    x={30}
                                    text={data.splitInfo.description}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex p-2 w-[220px] py-4 space-x-8">
                            <div className="flex space-x-2">
                              <span className="font-semibold">
                                PARTICIPANTS
                              </span>{" "}
                              <span className="pl-1">
                                <OnlyXChars x={15} text={data.friends.length} />
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <span className="font-semibold">BILLS</span>{" "}
                              <span className="pl-1">
                                <OnlyXChars x={15} text={data.bills.length} />
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <span className="font-semibold text-nowrap">
                                SHARED TO{" "}
                              </span>{" "}
                              <span className="pl-1">
                                <OnlyXChars
                                  x={15}
                                  text={data.sharedTo.length}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form
                    method="dialog"
                    className="flex pb-4 sm:pr-4 justify-center sm:justify-end space-x-6"
                  >
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
                    <button
                      type="button"
                      onClick={closeHandle}
                      className="p-2 px-4 rounded-lg bg-blue-500 text-white"
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
                <div className="rounded-xl sm:w-[500px] bg-stone-100">
                  <h1 className="p-8  text-center text-lg sm:text-xl font-medium">
                    Successfully deleted the SPLIT!!
                  </h1>
                  <div className="flex justify-center mt-6 ">
                    <img
                      src={deleted}
                      className="w-[100px] h-[100px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                  <div className="mt-8 pb-12 flex justify-center">
                    <RedirectingWindow add={"/split/protected/view/saved"}>
                      <span>Redirecting to Saved SPLITS in </span>
                    </RedirectingWindow>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : null}

        <ShareModal data={data} ref={modalRef} />

        <div className="flex-grow flex mt-8 justify-center">
          <div className="flex p-4  rounded-2xl max-w-[1200px] mx-8 flex-grow flex-col">
            <h1 className="py-[8px] text-[35px] font-bold text-center rounded-2xl bg-[#9d4edd] text-white ">
              SPLIT Result
            </h1>
            <div className="text-3xl font-bold min-h-[800px] flex text-center bg-white rounded-2xl p-4 mt-6 flex-grow">
              <div className="flex flex-col flex-grow">
                <div className="flex space-x-4 p-4">
                  <button
                    style={{
                      color: status === 0 ? "white" : "black",
                      backgroundColor: status === 0 ? "#9d4edd" : "#d393f6",
                    }}
                    disabled={status === 0}
                    onClick={() => setStatus(0)}
                    className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
                  >
                    General
                  </button>
                  <button
                    style={{
                      color: status === 1 ? "white" : "black",
                      backgroundColor: status === 1 ? "#9d4edd" : "#d393f6",
                    }}
                    disabled={status === 1}
                    onClick={() => setStatus(1)}
                    className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
                  >
                    Transactions
                  </button>
                  <button
                    style={{
                      color: status === 2 ? "white" : "black",
                      backgroundColor: status === 2 ? "#9d4edd" : "#d393f6",
                    }}
                    disabled={status === 2}
                    onClick={() => setStatus(2)}
                    className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
                  >
                    Stats
                  </button>
                  <button
                    style={{
                      color: status === 3 ? "white" : "black",
                      backgroundColor: status === 3 ? "#9d4edd" : "#d393f6",
                    }}
                    disabled={status === 3}
                    onClick={() => setStatus(3)}
                    className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
                  >
                    Bills
                  </button>
                  <button
                    style={{
                      color: status === 4 ? "white" : "black",
                      backgroundColor: status === 4 ? "#9d4edd" : "#d393f6",
                    }}
                    disabled={status === 4}
                    onClick={() => setStatus(4)}
                    className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-base rounded-lg px-4"
                  >
                    Shared
                  </button>
                </div>

                <div className="flex bg-slate-100 p-4 mt-2 rounded-3xl flex-grow flex-col">
                  {status === 0 ? (
                    <General
                      data={{
                        splitInfo: data.splitInfo,
                        friends: data.friends,
                      }}
                    />
                  ) : null}
                  {status === 3 ? <Bills data={data.bills} /> : null}
                  {status === 2 ? <Stats data={data.split} /> : null}
                  {status === 1 ? <Transactions data={data.split} /> : null}
                  {status === 4 ? <Shared data={data.sharedTo} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-16 justify-between mx-16">
          <Link to={"/split/protected/view/saved"}>
            <NiceButton text={"Go Back"} />
          </Link>
          <button onClick={shareClick}>
            <NiceButton text={"Share"} />
          </button>
          <button onClick={deleteHandle}>
            <RedButton text={"Delete"} />
          </button>
        </div>
      </div>
    </>
  );
}

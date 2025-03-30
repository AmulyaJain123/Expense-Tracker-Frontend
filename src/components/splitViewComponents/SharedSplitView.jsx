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
import SharedGeneral from "./SharedGeneral";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import user from "../../assets/user.png";
import { utils, writeFile } from "xlsx";
import { ErrorText } from "../../UIComponents/NoneFound";

export default function SharedSplitView() {
  const data = useLoaderData();
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);

  function downloadFile() {
    const originalTransactions = data.split[0].map((i) => ({
      From: i.from,
      To: i.to,
      Value: i.val,
    }));
    const reducedTransactions = data.split[3].map((i) => ({
      From: i.from,
      To: i.to,
      Value: i.val,
    }));
    let participants = "";
    data.friends.forEach((i) => (participants += `${i.name}, \n`));
    const metadata = [
      {
        "SPLIT Name": data.splitInfo.splitName,
        "SPLIT Date": data.splitInfo.splitDate,
        Description: data.splitInfo.description,
        Participants: participants,
      },
    ];
    const stats = data.split[2].map((i) => {
      return {
        Name: i.name,
        Paid: data.split[4].find((j) => j.name == i.name).val,
        Expense: data.split[5].find((j) => j.name == i.name).val,
        "Debitor/Creditor":
          data.split[2].find((j) => j.name == i.name).val > 0
            ? "Debitor"
            : data.split[2].find((j) => j.name == i.name).val === 0
            ? "None"
            : "Creditor",
        Net: data.split[2].find((j) => j.name == i.name).val,
      };
    });
    const bills = data.bills.map((i) => {
      let str = "";
      i.shares.forEach((j) => {
        str += `${j.name}  ${j.share}, \n`;
      });
      return {
        "Bill Name": i.billName,
        "Bill Date": i.billDate ? new Date(i.billDate).toUTCString() : "NULL",
        Description: i.description,
        "Total Amount": i.totalAmt,
        "Paid By": i.payedBy,
        Shares: str,
      };
    });

    const wb = utils.book_new();
    const metadataWs = utils.json_to_sheet(metadata);
    const statsWs = utils.json_to_sheet(stats);
    const originalTransactionsWs = utils.json_to_sheet(originalTransactions);
    const reducedTransactionsWs = utils.json_to_sheet(reducedTransactions);
    const billsWs = utils.json_to_sheet(bills);

    utils.book_append_sheet(wb, metadataWs, "Metadata");
    utils.book_append_sheet(
      wb,
      originalTransactionsWs,
      "Original Transactions"
    );
    utils.book_append_sheet(wb, reducedTransactionsWs, "Reduced Transactions");
    utils.book_append_sheet(wb, statsWs, "Stats");
    utils.book_append_sheet(wb, billsWs, "Bills");

    writeFile(wb, `Split${new Date().getTime()}.xlsx`);
  }

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
        import.meta.env.VITE_BACKEND_API + "/split/deletesharedsplit",
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

  return (
    <>
      <Helmet>
        <title>{data.splitInfo.splitName} | Shared SPLIT | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full interlaced overflow-auto pb-[150px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        {modalOpen ? (
          <>
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10"></div>
            <div className="rounded-2xl fixed top-[50%] translate-y-[-50%] right-[50%] z-10 translate-x-[50%] translate scale-[60%] sm:scale-75">
              {modalOpen === 1 ? (
                <div className="rounded-xl w-[500px] bg-stone-100">
                  <h1 className="p-8  text-center text-xl font-medium">
                    Are you sure you want to delete the SPLIT?
                  </h1>
                  <div className="flex  justify-center mt-2 mb-0 space-x-[120px] px-[50px]">
                    {/* <div className="origin-top scale-75 rounded-xl shadow-xl">
                      <div className="flex h-[200px] rounded-xl bg-slate-100 ">
                        <div className="rounded-l-xl w-[100px] striped"></div>
                        <div className="flex flex-col space-y-2 pl-4 w-[400px]">
                          <div className="p-2 pb-0 pt-4">
                            <div className="flex space-x-4">
                              <span className="font-semibold">SPLIT Name</span>{" "}
                              <span className="pl-1">
                                <OnlyXChars
                                  x={20}
                                  text={data.splitInfo.splitName}
                                />
                              </span>
                            </div>
                          </div>
                          <div className="p-2 py-0">
                            <div className="flex space-x-4">
                              <span className="font-semibold">Description</span>{" "}
                              <span className="pl-1">
                                <OnlyXChars
                                  x={20}
                                  text={data.splitInfo.description}
                                />
                              </span>
                            </div>
                          </div>

                          <div className="p-2 py-0">
                            <div className="flex space-x-4 items-center">
                              <span className="font-semibold">Shared By</span>{" "}
                              <div className="pl-1">
                                <div className="bg-slate-200 p-1 rounded-full items-center flex space-x-2">
                                  <img
                                    src={
                                      data.splitInfo.sharedBy.profilePic || user
                                    }
                                    className="w-[30px] h-[30px] rounded-full"
                                    alt=""
                                  />
                                  <span className="pr-2 text-sm">
                                    {
                                      <OnlyXChars
                                        x={20}
                                        text={data.splitInfo.sharedBy.username}
                                      />
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-2 py-0">
                            <div className="flex space-x-4">
                              <span className="font-semibold">Shared On</span>{" "}
                              <span className="pl-1">
                                {`${format(
                                  new Date(data.splitInfo.sharedOn),
                                  "hh:mm a"
                                )} | ${new Date(
                                  data.splitInfo.sharedOn
                                ).toDateString()}`}
                              </span>
                            </div>
                          </div>

                          <div className="flex p-2 pt-0 w-[220px]  space-x-8">
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
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="flex sm:hidden h-[25px] justify-center mb-6 space-x-2">
                    {deleting ? (
                      <div className="flex items-center">
                        <img
                          src={load}
                          className="w-[25px] h-[25px] flex justify-center items-center"
                          alt=""
                        />
                      </div>
                    ) : null}
                    {error ? <ErrorText IconSize={20} textSize={15} /> : null}
                  </div>
                  <form
                    method="dialog"
                    className="flex pb-4 sm:pr-4 justify-center sm:justify-end sm:space-x-6"
                  >
                    {deleting ? (
                      <div className="hidden sm:flex items-center">
                        <img
                          src={load}
                          className="w-[25px] h-[25px] flex justify-center items-center"
                          alt=""
                        />
                      </div>
                    ) : null}
                    {error ? (
                      <div className="hidden sm:flex items-center ">
                        <ErrorText IconSize={20} textSize={15} />
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={closeHandle}
                      className="p-2 px-4 rounded-lg mr-6 sm:mr-0 bg-blue-500 text-white"
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
                  <h1 className="p-8 pb-0 text-center text-lg sm:text-xl font-medium">
                    Successfully deleted the SPLIT!!
                  </h1>

                  <div className="mt-8 pb-6 flex justify-center">
                    <Link
                      to={"/split/protected/view/shared"}
                      className="p-2 px-4 rounded-lg mr-6 sm:mr-0 bg-blue-500 text-white"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : null}

        <div className="flex flex-col max-w-[1200px] mx-auto">
          <div className="flex-grow flex mt-6 justify-center">
            <div className="flex p-2 sm:p-3  rounded-2xl max-w-[900px] mx-1 sm:mx-8 flex-grow flex-col">
              <h1 className="py-1 relative sm:py-[6px] text-[20px] sm:text-[25px] font-bold text-center rounded-lg sm:rounded-xl bg-[#9d4edd] text-white ">
                SPLIT Result
                <button
                  onClick={downloadFile}
                  className="absolute group hover:scale-110 duration-700 right-3 top-[50%] p-[4px] border-white border-2 rounded-md bg-white translate-y-[-50%]"
                >
                  <i className="fi fi-sr-down-to-line text-base flex justify-center items-center text-[#000]"></i>
                </button>
              </h1>
              <div className=" font-bold min-h-[400px] flex text-center bg-white rounded-xl p-3 mt-4 flex-grow">
                <div className="flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-x-[6px] gap-y-[6px] sm:gap-x-[10px] p-2 sm:p-[10px]">
                    <button
                      style={{
                        color: status === 0 ? "white" : "black",
                        backgroundColor: status === 0 ? "#9d4edd" : "#d393f6",
                      }}
                      disabled={status === 0}
                      onClick={() => setStatus(0)}
                      className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
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
                      className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
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
                      className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
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
                      className="uppercase py-1 disabled:pointer-events-none hover:scale-110 duration-700 font-medium text-[11px] sm:text-[12px] rounded-[5px] sm:rounded-md px-2 sm:px-3"
                    >
                      Bills
                    </button>
                  </div>

                  <div className="flex bg-slate-100 p-2 sm:p-3 mt-[6px] sm:mt-2  rounded-xl sm:rounded-2xl flex-grow flex-col">
                    {status === 0 ? (
                      <SharedGeneral
                        data={{
                          splitInfo: data.splitInfo,
                          friends: data.friends,
                        }}
                      />
                    ) : null}
                    {status === 3 ? <Bills data={data.bills} /> : null}
                    {status === 2 ? <Stats data={data.split} /> : null}
                    {status === 1 ? <Transactions data={data.split} /> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-6 sm:mt-16 justify-between mx-6 sm:mx-16">
            <Link to={"/split/protected/view/shared"}>
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

import { useState, useRef, useEffect } from "react";
import { formatVal } from "../../util/algo";
import { format, isAfter } from "date-fns";
import numeral from "numeral";
import empty from "../../assets/empty.png";
import { useNavigate } from "react-router-dom";

export default function DataDisplay({ data }) {
  const [sorter, setSorter] = useState({ field: "date", order: "decreasing" });
  const [sortedData, setSortedData] = useState(
    JSON.parse(JSON.stringify(data))
  );
  const [selectedField, setSelectedField] = useState("date");
  const navigate = useNavigate();
  const dialogRef = useRef();
  const fieldRef = useRef();
  const orderRef = useRef();

  useEffect(() => {
    const arr = JSON.parse(JSON.stringify(data));
    arr.sort((a, b) => {
      if (sorter.field === "name") {
        if (sorter.order === "decreasing") {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "to") {
        if (sorter.order === "decreasing") {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "from") {
        if (sorter.order === "decreasing") {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "amount") {
        if (sorter.order === "decreasing") {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "date") {
        const ad = new Date(a.dateTime);
        const bd = new Date(b.dateTime);
        if (sorter.order === "decreasing") {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "created") {
        const ad = new Date(a.createdOn);
        const bd = new Date(b.createdOn);
        if (sorter.order === "decreasing") {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    });
    setSortedData(JSON.parse(JSON.stringify(arr)));
  }, [data]);

  useEffect(() => {
    const arr = JSON.parse(JSON.stringify(data));
    arr.sort((a, b) => {
      if (sorter.field === "name") {
        if (sorter.order === "decreasing") {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "to") {
        if (sorter.order === "decreasing") {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "from") {
        if (sorter.order === "decreasing") {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "amount") {
        if (sorter.order === "decreasing") {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "date") {
        const ad = new Date(a.dateTime);
        const bd = new Date(b.dateTime);
        if (sorter.order === "decreasing") {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "created") {
        const ad = new Date(a.createdOn);
        const bd = new Date(b.createdOn);
        if (sorter.order === "decreasing") {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (ad === bd) {
            return 0;
          } else if (isAfter(ad, bd)) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    });
    // console.log(arr);
    setSortedData(arr);
  }, [sorter]);

  return (
    <>
      <header className="flex border-b-[2px] border-stone-500 pb-2 mr-4 space-x-3 flex-grow text-md font-semibold text-stone-500 p-1 px-4">
        <div className="flex-[0.14] flex space-x-3  ">
          <span className="flex justify-center items-center">Name</span>
          <div className="flex flex-col pl-1">
            <button
              onClick={() => setSorter({ field: "name", order: "increasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "name" && sorter.order === "increasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                } rotate-180 text-base flex justify-center items-center`}
              ></i>
            </button>
            <button
              onClick={() => setSorter({ field: "name", order: "decreasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "name" && sorter.order === "decreasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                }  text-base flex justify-center items-center`}
              ></i>
            </button>
          </div>
        </div>
        <div className="flex-[0.14]  flex space-x-3 ">
          <span className="flex justify-center items-center">From</span>
          <div className="flex flex-col pl-1">
            <button
              onClick={() => setSorter({ field: "from", order: "increasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "from" && sorter.order === "increasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                } rotate-180 text-base flex justify-center items-center`}
              ></i>
            </button>
            <button
              onClick={() => setSorter({ field: "from", order: "decreasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "from" && sorter.order === "decreasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                }  text-base flex justify-center items-center`}
              ></i>
            </button>
          </div>
        </div>
        <div className="flex-[0.12]  flex space-x-3 ">
          <span className="flex justify-center items-center">Amt</span>
          <div className="flex flex-col pl-1">
            <button
              onClick={() =>
                setSorter({ field: "amount", order: "increasing" })
              }
              className=""
            >
              <i
                className={`${
                  sorter.field === "amount" && sorter.order === "increasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                } rotate-180 text-base flex justify-center items-center`}
              ></i>
            </button>
            <button
              onClick={() =>
                setSorter({ field: "amount", order: "decreasing" })
              }
              className=""
            >
              <i
                className={`${
                  sorter.field === "amount" && sorter.order === "decreasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                }  text-base flex justify-center items-center`}
              ></i>
            </button>
          </div>
        </div>
        <div className=" flex-[0.14] flex space-x-3 ">
          <span className="flex justify-center items-center">To</span>
          <div className="flex flex-col pl-1">
            <button
              onClick={() => setSorter({ field: "to", order: "increasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "to" && sorter.order === "increasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                } rotate-180 text-base flex justify-center items-center`}
              ></i>
            </button>
            <button
              onClick={() => setSorter({ field: "to", order: "decreasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "to" && sorter.order === "decreasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                }  text-base flex justify-center items-center`}
              ></i>
            </button>
          </div>
        </div>
        <div className=" flex-[0.13] flex space-x-3 ">
          <span className="flex justify-center items-center">Date</span>
          <div className="flex flex-col pl-1">
            <button
              onClick={() => setSorter({ field: "date", order: "increasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "date" && sorter.order === "increasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                } rotate-180 text-base flex justify-center items-center`}
              ></i>
            </button>
            <button
              onClick={() => setSorter({ field: "date", order: "decreasing" })}
              className=""
            >
              <i
                className={`${
                  sorter.field === "date" && sorter.order === "decreasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                }  text-base flex justify-center items-center`}
              ></i>
            </button>
          </div>
        </div>
        <div className=" flex-[0.13] flex space-x-3 ">
          <span className="flex justify-center items-center">Created</span>
          <div className="flex flex-col pl-1">
            <button
              onClick={() =>
                setSorter({ field: "created", order: "increasing" })
              }
              className=""
            >
              <i
                className={`${
                  sorter.field === "created" && sorter.order === "increasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                } rotate-180 text-base flex justify-center items-center`}
              ></i>
            </button>
            <button
              onClick={() =>
                setSorter({ field: "created", order: "decreasing" })
              }
              className=""
            >
              <i
                className={`${
                  sorter.field === "created" && sorter.order === "decreasing"
                    ? "fi fi-sr-sort-down"
                    : "fi fi-rr-sort-down"
                }  text-base flex justify-center items-center`}
              ></i>
            </button>
          </div>
        </div>
        <div className="flex-[0.22]  flex space-x-3 ">
          <span className="flex justify-center items-center">Category</span>
        </div>
        <div className="w-[30px] flex space-x-3">Type</div>
      </header>
      <div className="flex flex-col pt-4 space-y-3 h-[700px] overflow-auto customScrollThin pr-2">
        {sortedData.length === 0 ? (
          <div className="flex flex-col mt-24 items-center space-y-4">
            <img
              src={empty}
              className="h-[150px] w-[150px] flex justify-center items-center"
              alt=""
            />
            <p className="text-center text-stone-500 mt-16 text-lg font-medium">
              No Transactions Found
            </p>
          </div>
        ) : (
          <>
            {sortedData.map((i, ind) => {
              const {
                category,
                dateTime,
                createdOn,
                from,
                to,
                transactionAmount,
                transactionName,
                transactionType,
              } = i;

              const date = format(new Date(dateTime), "hh:mm dd-MM-yy");
              const createdOnDate = format(
                new Date(createdOn),
                "hh:mm dd-MM-yy"
              );

              return (
                <div
                  key={ind}
                  onClick={() => navigate(`view/${i.transactionId}`)}
                  className="flex hover:opacity-60 cursor-pointer rounded-sm text-sm border-b-2 border-[#adb5bd] bg-[#f8f9fa] text-black space-x-3 p-1 py-2 px-4"
                >
                  <span className="flex-[0.14]  ">
                    {transactionName.length > 15
                      ? transactionName.substr(0, 15) + "..."
                      : transactionName}
                  </span>
                  <span className="flex-[0.14]   ">
                    {from.length > 15 ? from.substr(0, 15) + "..." : from}
                  </span>
                  <span className="flex-[0.12]   ">
                    {`${numeral(transactionAmount).format("0")}`.length > 8
                      ? formatVal(transactionAmount).substr(0, 8) + "..."
                      : formatVal(transactionAmount)}
                  </span>
                  <span className=" flex-[0.14]  ">
                    {to.length > 15 ? to.substr(0, 15) + "..." : to}
                  </span>
                  <span className=" flex-[0.13]  ">{date}</span>
                  <span className=" flex-[0.13]  ">{createdOnDate}</span>
                  <span className="flex-[0.22] capitalize">
                    {category.length === 3
                      ? `${
                          category[1].length > 11
                            ? category[1].substr(0, 11) + "..."
                            : category[1]
                        } > ${
                          category[2].length > 11
                            ? category[2].substr(0, 11) + "..."
                            : category[2]
                        }
                  `
                      : `${
                          category[1].length > 11
                            ? category[1].substr(0, 11) + "..."
                            : category[1]
                        }`}
                  </span>
                  <span
                    style={{
                      color: transactionType != "outgoing" ? "blue" : "#55a630",
                    }}
                    className="w-[30px] font-semibold "
                  >
                    {transactionType === "outgoing" ? "OUT" : "IN"}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import recIcon from "../../assets/rec.png";
import empty from "../../assets/empty.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function Sorted({ filteredData, sorting }) {
  const [sortedData, setSortedData] = useState(null);

  useEffect(() => {
    sortData();
  }, [filteredData, sorting]);

  function sortData() {
    if (!sorting) {
      setSortedData(filteredData);
    } else {
      console.log(filteredData, sorting);
      const newArr = JSON.parse(JSON.stringify(filteredData));
      const selectedOrder = sorting[1];
      const selectedSorter = sorting[0];
      console.log(selectedOrder, selectedSorter);
      newArr.sort((a, b) => {
        if (selectedSorter == 1 && selectedOrder == 1) {
          if (
            new Date(a.details.createdOn).getTime() >
            new Date(b.details.createdOn).getTime()
          ) {
            return 1;
          } else if (
            new Date(a.details.createdOn).getTime() ===
            new Date(b.details.createdOn).getTime()
          ) {
            console.log("Yayy");
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 1 && selectedOrder == 2) {
          if (
            new Date(a.details.createdOn).getTime() >
            new Date(b.details.createdOn).getTime()
          ) {
            return -1;
          } else if (
            new Date(a.details.createdOn).getTime() ===
            new Date(b.details.createdOn).getTime()
          ) {
            return 0;
          } else {
            return 1;
          }
        } else if (selectedSorter == 2 && selectedOrder == 2) {
          if (a.details.recName > b.details.recName) {
            return -1;
          } else if (a.details.recName === b.details.recName) {
            return 0;
          } else {
            return 1;
          }
        } else if (selectedSorter == 2 && selectedOrder == 1) {
          if (a.details.recName > b.details.recName) {
            return 1;
          } else if (a.details.recName === b.details.recName) {
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 3 && selectedOrder == 1) {
          if (
            new Date(a.details.recDate).getTime() >
            new Date(b.details.recDate).getTime()
          ) {
            return 1;
          } else if (
            new Date(a.details.recDate).getTime() ===
            new Date(b.details.recDate).getTime()
          ) {
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 3 && selectedOrder == 2) {
          if (
            new Date(a.details.recDate).getTime() >
            new Date(b.details.recDate).getTime()
          ) {
            return -1;
          } else if (
            new Date(a.details.recDate).getTime() ===
            new Date(b.details.recDate).getTime()
          ) {
            return 0;
          } else {
            return 1;
          }
        }
        // else if (selectedSorter == 4 && selectedOrder == 2) {
        //   if (a.details.recTotal === null && b.details.recTotal != null) {
        //     return 1;
        //   } else if (
        //     a.details.recTotal === null &&
        //     b.details.recTotal === null
        //   ) {
        //     return 0;
        //   } else if (
        //     a.details.recTotal != null &&
        //     b.details.recTotal === null
        //   ) {
        //     return -1;
        //   } else if (a.details.recTotal > b.details.recTotal) {
        //     return 1;
        //   } else if (a.details.recTotal === b.details.recTotal) {
        //     return 0;
        //   } else {
        //     return -1;
        //   }
        // } else if (selectedSorter == 4 && selectedOrder == 1) {
        //   if (a.details.recTotal === null && b.details.recTotal != null) {
        //     return 1;
        //   } else if (
        //     a.details.recTotal === null &&
        //     b.details.recTotal === null
        //   ) {
        //     return 0;
        //   } else if (
        //     a.details.recTotal != null &&
        //     b.details.recTotal === null
        //   ) {
        //     return -1;
        //   } else if (a.details.recTotal > b.details.recTotal) {
        //     return -1;
        //   } else if (a.details.recTotal === b.details.recTotal) {
        //     return 0;
        //   } else {
        //     return 1;
        //   }
        // }
      });
      setSortedData(newArr);
    }
  }

  return (
    <>
      {sortedData != null ? (
        <>
          {sortedData.length != 0 ? (
            sortedData.map((i) => {
              console.log(i.details.recDesc, i.details.recDesc.length);
              return (
                <Link
                  to={`${i.recId}`}
                  className="flex hover:scale-105 hover:shadow-lg duration-500 flex-col rounded-xl bg-slate-100 "
                >
                  <div className="p-4  flex space-x-4 ">
                    <div className="p-3 rounded-2xl bg-slate-200">
                      <img
                        src={recIcon}
                        className="w-[150px] h-[150px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col w-[150px] justify-center space-y-2">
                      <div className="flex flex-col">
                        <span className="font-semibold">Receipt Name</span>{" "}
                        <span className="pl-1">
                          <OnlyXChars x={15} text={i.details.recName} />
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-semibold">Created On</span>{" "}
                        <span className="pl-1">
                          <OnlyXChars x={15} text={i.details.createdOn} />
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-semibold text-nowrap">
                          Receipt Date
                        </span>{" "}
                        <span className="pl-1">
                          <OnlyXChars x={15} text={i.details.recDate} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col p-4 pt-0 space-y-2">
                    <div className="flex space-x-4 ">
                      <span className="font-semibold">Description</span>{" "}
                      <span className="pl-1">
                        <OnlyXChars x={20} text={i.details.recDesc} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="flex flex-col mt-12 space-y-4">
              <img
                src={empty}
                className="h-[150px] w-[150px] flex justify-center items-center"
                alt=""
              />
              <p className="text-center text-stone-500 mt-16 text-lg font-medium">
                No Receipts Found
              </p>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}

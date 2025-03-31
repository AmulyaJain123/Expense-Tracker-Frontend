import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import docIcon from "../../assets/doc.png";
import empty from "../../assets/empty.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import { EmptyBox } from "../../UIComponents/NoneFound";
import { dateFormat } from "../../util/algo";

export default function SortedDocs({ filteredData, sorting }) {
  const [sortedData, setSortedData] = useState(null);

  useEffect(() => {
    sortData();
  }, [filteredData, sorting]);

  console.log(sorting, filteredData);

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
          if (a.details.docName > b.details.docName) {
            return -1;
          } else if (a.details.docName === b.details.docName) {
            return 0;
          } else {
            return 1;
          }
        } else if (selectedSorter == 2 && selectedOrder == 1) {
          if (a.details.docName > b.details.docName) {
            return 1;
          } else if (a.details.docName === b.details.docName) {
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 3 && selectedOrder == 1) {
          if (a.details.docDate == "NOT ENTERED") {
            return 1;
          } else if (b.details.docDate == "NOT ENTERED") {
            return -1;
          }
          if (
            new Date(a.details.docDate).getTime() >
            new Date(b.details.docDate).getTime()
          ) {
            return 1;
          } else if (
            new Date(a.details.docDate).getTime() ===
            new Date(b.details.docDate).getTime()
          ) {
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 3 && selectedOrder == 2) {
          if (a.details.docDate == "NOT ENTERED") {
            return 1;
          } else if (b.details.docDate == "NOT ENTERED") {
            return -1;
          }
          if (
            new Date(a.details.docDate).getTime() >
            new Date(b.details.docDate).getTime()
          ) {
            return -1;
          } else if (
            new Date(a.details.docDate).getTime() ===
            new Date(b.details.docDate).getTime()
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
              console.log(i);
              return (
                <Link
                  to={`${i.docId}`}
                  className="flex hover:scale-105 w-[270px] h-[160px] hover:shadow-lg duration-500 flex-col rounded-xl bg-slate-100 "
                >
                  <div className="p-3  flex space-x-3 ">
                    <div className="p-2 rounded-xl flex items-center bg-slate-200">
                      <img
                        src={docIcon}
                        className="w-[80px] h-[80px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col w-[120px] text-xs justify-center space-y-[6px]">
                      <div className="flex flex-col">
                        <span className="font-semibold">Doc Name</span>{" "}
                        <span className="">
                          <OnlyXChars x={15} text={i.details.docName} />
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-semibold">Created On</span>{" "}
                        <span className="">
                          <OnlyXChars
                            x={20}
                            text={dateFormat(i.details.createdOn)}
                          />
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-semibold text-nowrap">
                          Doc Date
                        </span>{" "}
                        <span className="">
                          <OnlyXChars
                            x={20}
                            text={dateFormat(i.details.docDate)}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col p-3 pt-0 text-xs space-y-[6px]">
                    <div className="flex space-x-3 ">
                      <span className="font-semibold">Description</span>{" "}
                      <span className="pl-1">
                        <OnlyXChars x={20} text={i.details.docDesc} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="flex flex-col mt-8 items-center space-y-2">
              <EmptyBox
                IconSize={60}
                textColor="#cbd5e1"
                textSize={16}
                msg="No Doc Found"
                gap={12}
              />
            </div>
          )}
        </>
      ) : null}
    </>
  );
}

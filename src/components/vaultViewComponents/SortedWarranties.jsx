import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import warIcon from "../../assets/war.png";
import empty from "../../assets/empty.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function SortedWarranties({ filteredData, sorting }) {
  const [sortedData, setSortedData] = useState(null);

  console.log(sortedData);

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
          if (a.details.warName > b.details.warName) {
            return -1;
          } else if (a.details.warName === b.details.warName) {
            return 0;
          } else {
            return 1;
          }
        } else if (selectedSorter == 2 && selectedOrder == 1) {
          if (a.details.warName > b.details.warName) {
            return 1;
          } else if (a.details.warName === b.details.warName) {
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 3 && selectedOrder == 1) {
          if (
            new Date(a.details.warDate).getTime() >
            new Date(b.details.warDate).getTime()
          ) {
            return 1;
          } else if (
            new Date(a.details.warDate).getTime() ===
            new Date(b.details.warDate).getTime()
          ) {
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 3 && selectedOrder == 2) {
          if (
            new Date(a.details.warDate).getTime() >
            new Date(b.details.warDate).getTime()
          ) {
            return -1;
          } else if (
            new Date(a.details.warDate).getTime() ===
            new Date(b.details.warDate).getTime()
          ) {
            return 0;
          } else {
            return 1;
          }
        } else if (selectedSorter == 4 && selectedOrder == 1) {
          if (
            new Date(a.details.expiry.date).getTime() >
            new Date(b.details.expiry.date).getTime()
          ) {
            return 1;
          } else if (
            new Date(a.details.expiry.date).getTime() ===
            new Date(b.details.expiry.date).getTime()
          ) {
            return 0;
          } else {
            return -1;
          }
        } else if (selectedSorter == 4 && selectedOrder == 2) {
          if (
            new Date(a.details.expiry.date).getTime() >
            new Date(b.details.expiry.date).getTime()
          ) {
            return -1;
          } else if (
            new Date(a.details.expiry.date).getTime() ===
            new Date(b.details.expiry.date).getTime()
          ) {
            return 0;
          } else {
            return 1;
          }
        }
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
              console.log(i.details.warDesc, i.details.warDesc.length);
              return (
                <Link
                  to={`${i.warId}`}
                  className="flex relative hover:scale-105 hover:shadow-lg duration-500 flex-col rounded-xl bg-slate-100 "
                >
                  <div className="p-3  flex space-x-3 ">
                    <div className="p-2 flex justify-center items-center w-[130px] h-[130px] rounded-xl bg-slate-200">
                      <img
                        src={warIcon}
                        className="w-[105px] h-[105px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col w-[120px] justify-center space-y-[6px] text-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold">Warranty Name</span>{" "}
                        <span className="pl-1">
                          <OnlyXChars x={15} text={i.details.warName} />
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
                          Warranty Date
                        </span>{" "}
                        <span className="pl-1">
                          <OnlyXChars x={15} text={i.details.warDate} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col p-3 pt-0 text-xs space-y-[6px]">
                    <div className="flex space-x-3 ">
                      <span className="font-semibold">Description</span>{" "}
                      <span className="pl-1">
                        <OnlyXChars x={20} text={i.details.warDesc} />
                      </span>
                    </div>
                    <div className="flex space-x-6 ">
                      <div className="flex flex-col ">
                        <span className="font-semibold">Expiry Date</span>{" "}
                        <span className="">
                          <OnlyXChars x={20} text={i.details.expiry.date} />
                        </span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="font-semibold">Time Till Expiry</span>{" "}
                        <span
                          style={{
                            color: i.details.expiry.till === null ? "red" : "",
                          }}
                          className=""
                        >
                          {i.details.expiry.till === null
                            ? "Expired"
                            : `${i.details.expiry.till.years} Y - ${i.details.expiry.till.months} M - ${i.details.expiry.till.days} D`}
                        </span>
                      </div>
                    </div>
                  </div>
                  {i.details.expiry.till &&
                  i.details.expiry.till.months === 0 &&
                  i.details.expiry.till.years === 0 &&
                  i.details.expiry.till.days > 0 ? (
                    <span className="absolute rotate-[-15deg] shadow-sm py-1 px-3 rounded-md bg-yellow-100 text-xs font-semibold text-yellow-500 top-0 -left-2">
                      Expiring Soon !!
                    </span>
                  ) : null}
                  {i.details.expiry.till === null ? (
                    <span className="absolute rotate-[-15deg] shadow-sm py-1 px-3 rounded-md bg-red-100 text-xs font-semibold text-red-500 top-0 -left-2">
                      Expired
                    </span>
                  ) : null}
                  {i.details.expiry.renewedOn ? (
                    <span className="absolute rotate-[90deg] py-1 px-3 pb-0 rounded-md rounded-b-none bg-blue-100 text-xs font-semibold text-blue-500 top-[50%] -right-[8px] scale-90 translate-y-[-50%] translate-x-[50%]">
                      <span className="font-semibold mr-[6px]">
                        Renewed On{" "}
                      </span>{" "}
                      <span className="text-xs font-normal">
                        {i.details.expiry.renewedOn}
                      </span>
                    </span>
                  ) : null}
                </Link>
              );
            })
          ) : (
            <div className="flex flex-col mt-8 items-center space-y-2">
              <img
                src={empty}
                className="h-[90px] w-[90px] flex justify-center items-center"
                alt=""
              />
              <p className="text-center text-stone-500 mt-12 text-sm font-medium">
                No Warranty Found
              </p>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}

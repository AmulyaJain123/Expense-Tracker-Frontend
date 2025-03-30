import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Sort from "../components/vaultViewComponents/Sort";
import Filter from "../components/vaultViewComponents/Filter";
import close from "../assets/cancel.png";
import SortedWarranties from "../components/vaultViewComponents/SortedWarranties";
import { useDispatch, useSelector } from "react-redux";
import { vaultActions } from "../store/main";
import SortWarranty from "../components/vaultViewComponents/SortWarranty";
import warIcon from "../assets/war.png";
import { Helmet } from "react-helmet-async";

export default function VaultWarrantyView() {
  const data = useLoaderData();
  const [filteredData, setFilteredData] = useState(data);
  const sorting = useSelector((state) => state.vault.recSorting);
  const filter = useSelector((state) => state.vault.recFilter);
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const [no, setNo] = useState(0);

  useEffect(() => {
    console.log(contentRef.current.clientWidth);
    setNo(
      Math.floor((contentRef.current.clientWidth - 64) / 290) -
        (data.length %
          Math.floor((contentRef.current.clientWidth - 64) / 290) ||
          Math.floor((contentRef.current.clientWidth - 64) / 290))
    );
  }, [contentRef]);

  console.log(data);

  function changeSorting(sortby, order) {
    dispatch(vaultActions.setRecSorting([sortby, order]));
  }

  function changeFiltering(filter) {
    dispatch(vaultActions.setRecFilter(filter));
  }

  useEffect(() => {
    if (filter) {
      const newArr = data.filter((i) => {
        for (let j of filter) {
          if (i.tags.includes(j)) {
            return true;
          }
        }
        return false;
      });
      setFilteredData(newArr);
    } else {
      setFilteredData(data);
    }
  }, [filter]);

  function removeFilter() {
    dispatch(vaultActions.setRecFilter(null));
  }

  function removeSort() {
    dispatch(vaultActions.setRecSorting(null));
  }

  return (
    <>
      <Helmet>
        <title> Saved Warranties | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[150px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        <div className="flex flex-col max-w-[1200px] mx-auto">
          <div className="flex border-b-[1.5px] border-stone-400 justify-between my-8 pb-2 mx-8 px-4">
            <div className="flex space-x-6 items-center">
              <img
                src={warIcon}
                className="w-[40px] h-[40px] flex justify-center items-center"
                alt=""
              />
              <span className="text-[30px] font-bold text-stone-600">
                Saved Warranties
              </span>
            </div>
            <div className="flex items-center ">
              <Filter
                type={"war"}
                data={data}
                changeFilter={changeFiltering}
              ></Filter>
              <SortWarranty
                data={filteredData}
                changeSorting={changeSorting}
              ></SortWarranty>
            </div>
          </div>
          <div className="flex max-w-[750px] mb-4 mx-auto flex-col">
            {filter ? (
              <div className="flex relative text-xs mx-4 p-[4px] rounded-lg bg-slate-100 items-center px-6">
                <span className="text-nowrap">Filtered Tags</span>
                <div
                  // style={{ width: "calc( 100% - 200px )" }}
                  className="flex space-x-3 ml-6 pb-1 max-w-[850px] pt-2 pr-4 overflow-y-auto customScrollThin"
                >
                  {filter.map((i) => {
                    return (
                      <div className="font-medium text-nowrap rounded-md py-1 px-3 bg-[#dc93f6]">
                        {i}
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={removeFilter}
                  className="absolute hover:scale-110 duration-500 -top-1 -right-1"
                >
                  <img
                    src={close}
                    className="w-[20px] h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </div>
            ) : null}

            {sorting ? (
              <div className="flex relative mx-4 p-2 py-[2px] mt-2 text-xs rounded-lg bg-slate-100  px-6">
                <div className="flex  items-center py-2">
                  <span className="text-nowrap mr-6">Sort By</span>
                  <span className="font-medium text-nowrap rounded-md py-1 px-3 bg-[#dc93f6]">
                    {sorting[0] === 1
                      ? "Created On"
                      : sorting[0] === 2
                      ? "Warranty Name"
                      : sorting[0] === 3
                      ? "Warranty Date"
                      : "Expiry Date"}
                  </span>
                  <span className="font-medium text-nowrap ml-3  rounded-md py-1 px-3 bg-[#dc93f6]">
                    {sorting[1] === 1 ? "Ascending" : "Descending"}
                  </span>
                </div>
                <button
                  onClick={removeSort}
                  className="absolute hover:scale-110 duration-500 -top-1 -right-1"
                >
                  <img
                    src={close}
                    className="w-[20px] h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </div>
            ) : null}
          </div>
          <div
            ref={contentRef}
            className="mt-2 px-16 flex flex-wrap justify-center gap-6"
          >
            <SortedWarranties
              filteredData={filteredData}
              sorting={sorting}
            ></SortedWarranties>
            {Array(no)
              .fill(0)
              .map((i, ind) => {
                return (
                  <div className="w-[260px] h-[200px] bg-slate-50   rounded-lg "></div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

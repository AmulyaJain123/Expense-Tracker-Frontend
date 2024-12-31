import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Sort from "../components/vaultViewComponents/Sort";
import Filter from "../components/vaultViewComponents/Filter";
import close from "../assets/cancel.png";
import Sorted from "../components/vaultViewComponents/Sorted";
import { useDispatch, useSelector } from "react-redux";
import { vaultActions } from "../store/main";
import recIcon from "../assets/rec.png";
import { Helmet } from "react-helmet-async";

export default function VaultRecieptsView() {
  const data = useLoaderData();
  const [filteredData, setFilteredData] = useState(data);
  const sorting = useSelector((state) => state.vault.warSorting);
  const filter = useSelector((state) => state.vault.warFilter);
  const dispatch = useDispatch();

  console.log(data);

  function changeSorting(sortby, order) {
    dispatch(vaultActions.setWarSorting([sortby, order]));
  }

  function changeFiltering(filter) {
    dispatch(vaultActions.setWarFilter(filter));
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
    dispatch(vaultActions.setWarFilter(null));
  }

  function removeSort() {
    dispatch(vaultActions.setWarSorting(null));
  }

  return (
    <>
      <Helmet>
        <title> Saved Receipts | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
        <div className="flex justify-between my-12 px-16">
          <div className="flex space-x-8 items-center">
            <img
              src={recIcon}
              className="w-[50px] h-[50px] flex justify-center items-center"
              alt=""
            />
            <span className="text-[40px] font-bold text-stone-600">
              Saved Receipts
            </span>
          </div>
          <div className="flex items-center ">
            <Filter data={data} changeFilter={changeFiltering}></Filter>
            <Sort data={filteredData} changeSorting={changeSorting}></Sort>
          </div>
        </div>
        <div className="flex flex-col">
          {filter ? (
            <div className="flex relative mx-8 p-2 rounded-xl bg-slate-100 items-center px-8">
              <span className="text-nowrap">Filtered Tags</span>
              <div className="flex space-x-4 ml-8 pb-2 pt-4 pr-4 w-[1150px] overflow-y-auto customScrollThin">
                {filter.map((i) => {
                  return (
                    <div className="font-medium text-nowrap rounded-lg py-1 px-4 bg-[#dc93f6]">
                      {i}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={removeFilter}
                className="absolute hover:scale-110 duration-500 -top-2 -right-2"
              >
                <img
                  src={close}
                  className="w-[25px] h-[25px] flex justify-center items-center"
                  alt=""
                />
              </button>
            </div>
          ) : null}

          {sorting ? (
            <div className="flex relative mx-8 p-2 mt-4 rounded-xl bg-slate-100  px-8">
              <div className="flex  items-center py-3">
                <span className="text-nowrap mr-8">Sort By</span>
                <span className="font-medium text-nowrap rounded-lg py-1 px-4 bg-[#dc93f6]">
                  {sorting[0] === 1
                    ? "Created On"
                    : sorting[0] === 2
                    ? "Receipt Name"
                    : "Receipt Date"}
                </span>
                <span className="font-medium text-nowrap ml-4  rounded-lg py-1 px-4 bg-[#dc93f6]">
                  {sorting[1] === 1 ? "Ascending" : "Descending"}
                </span>
              </div>
              <button
                onClick={removeSort}
                className="absolute hover:scale-110 duration-500 -top-2 -right-2"
              >
                <img
                  src={close}
                  className="w-[25px] h-[25px] flex justify-center items-center"
                  alt=""
                />
              </button>
            </div>
          ) : null}
        </div>
        <div className="mt-12 px-16 flex flex-wrap justify-center gap-8">
          <Sorted filteredData={filteredData} sorting={sorting}></Sorted>
        </div>
      </div>
    </>
  );
}

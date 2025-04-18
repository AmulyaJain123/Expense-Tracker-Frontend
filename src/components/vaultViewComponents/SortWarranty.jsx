import { useState } from "react";
import selected from "../../assets/selected.png";
import decIcon from "../../assets/decreasing.png";
import incIcon from "../../assets/increasing.png";

export default function SortWarranty({ data, changeSorting }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSorter, setSelectedSorter] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  console.log(data);

  function sortClick() {
    setModalOpen(true);
  }

  function changeSorter(num) {
    setSelectedSorter(num);
  }

  function changeOrder(num) {
    setSelectedOrder(num);
  }

  function closeClick() {
    setModalOpen(false);
    setSelectedOrder(null);
    setSelectedSorter(null);
  }

  function applySort() {
    changeSorting(selectedSorter, selectedOrder);
    closeClick();
  }

  return (
    <>
      {modalOpen ? (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 z-10"></div>
      ) : null}
      {modalOpen ? (
        <div className="fixed scale-75 flex z-10 space-x-6 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-2xl p-6">
          <div className="flex rounded-xl bg-slate-100 p-3 flex-col w-[230px]">
            <p className="text-xl font-semibold mx-auto p-2 bg-white w-full rounded-lg text-center">
              Sort By{" "}
            </p>
            <div className="p-2 bg-white py-4 flex flex-col space-y-4 items-center justify-center w-full rounded-lg flex-grow mt-3">
              <button
                onClick={() => changeSorter(1)}
                className="rounded-lg relative w-fit font-medium  text-lg bg-[#dc93f6] text-black py-1 px-4 "
              >
                Created On
                {1 === selectedSorter ? (
                  <div className="absolute -right-2 -top-2 ">
                    <img
                      src={selected}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                ) : null}
              </button>
              <button
                onClick={() => changeSorter(2)}
                className="rounded-lg relative w-fit font-medium  text-lg bg-[#dc93f6] text-black py-1 px-4 "
              >
                Warranty Name
                {2 === selectedSorter ? (
                  <div className="absolute -right-2 -top-2 ">
                    <img
                      src={selected}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                ) : null}
              </button>
              <button
                onClick={() => changeSorter(3)}
                className="rounded-lg relative w-fit font-medium  text-lg bg-[#dc93f6] text-black py-1 px-4 "
              >
                Warranty Date
                {3 === selectedSorter ? (
                  <div className="absolute -right-2 -top-2 ">
                    <img
                      src={selected}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                ) : null}
              </button>
              <button
                onClick={() => changeSorter(4)}
                className="rounded-lg relative w-fit font-medium  text-lg bg-[#dc93f6] text-black py-1 px-4 "
              >
                Expiry Date
                {4 === selectedSorter ? (
                  <div className="absolute -right-2 -top-2 ">
                    <img
                      src={selected}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                ) : null}
              </button>
            </div>
          </div>
          <div className="flex flex-col  justify-between space-y-4">
            <div className="flex rounded-xl bg-slate-100 p-3 flex-col w-[180px] ">
              <p className="text-xl font-semibold mx-auto p-2 bg-white w-full rounded-lg text-center">
                Order
              </p>
              <div className="p-2 bg-white flex py-4 space-x-4 items-center justify-center w-full rounded-lg  mt-3">
                <button
                  onClick={() => changeOrder(1)}
                  className="rounded-lg relative w-fit font-medium  text-lg bg-[#dc93f6] text-black py-2 px-3 "
                >
                  <img src={incIcon} className="w-[25px] h-[25px] " alt="" />
                  {1 === selectedOrder ? (
                    <div className="absolute -right-2 -top-2 ">
                      <img
                        src={selected}
                        className="w-[20px] h-[20px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  ) : null}
                </button>
                <button
                  onClick={() => changeOrder(2)}
                  className="rounded-lg relative w-fit font-medium  text-lg bg-[#dc93f6] text-black py-2 px-3 "
                >
                  <img src={decIcon} className="w-[25px] h-[25px] " alt="" />
                  {2 === selectedOrder ? (
                    <div className="absolute -right-2 -top-2 ">
                      <img
                        src={selected}
                        className="w-[20px] h-[20px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  ) : null}
                </button>
              </div>
            </div>
            <div className="flex flex-col  space-y-3">
              <button
                onClick={closeClick}
                className="flex rounded-lg border-2 border-red-500 hover:bg-white hover:text-red-500 duration-500 bg-red-500 text-white font-semibold text-xl justify-center py-2 "
              >
                Cancel
              </button>
              <button
                disabled={!selectedOrder || !selectedSorter}
                onClick={applySort}
                className="flex disabled:pointer-events-none disabled:opacity-40 rounded-lg border-2 border-green-500 hover:bg-white hover:text-green-500 duration-500 bg-green-500 text-white font-semibold text-xl justify-center py-2 "
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={sortClick}
        className="py-1 px-3 h-fit text-sm font-semibold bg-[#9d4edd] rounded-lg text-white border-[1.5px] border-[#9d4edd] hover:text-[#9d4edd] hover:scale-105 hover:bg-white duration-500"
      >
        Sort
      </button>
    </>
  );
}

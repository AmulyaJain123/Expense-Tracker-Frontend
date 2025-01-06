import { useEffect, useRef, useState } from "react";
import selected from "../../assets/selected.png";
import Tags from "./Tags";

export default function Filter({ data, changeFilter }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const tagsRef = useRef();

  console.log(data);

  function filterClick() {
    setModalOpen(true);
  }

  function closeClick() {
    setModalOpen(false);
    setSelectedOrder(null);
    setSelectedFilter(null);
  }

  function applyFilter() {
    const arr = tagsRef.current.getData();
    changeFilter(arr);
    closeClick();
  }

  return (
    <>
      {modalOpen ? (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 z-10"></div>
      ) : null}
      {modalOpen ? (
        <div className="fixed flex z-10 scale-75 flex-col space-x-8 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-2xl p-2 pb-2">
          <Tags
            applyFilter={applyFilter}
            closeClick={closeClick}
            ref={tagsRef}
          ></Tags>
        </div>
      ) : null}
      <button
        onClick={filterClick}
        className="py-1 px-3 mr-3 h-fit text-sm font-semibold bg-[#9d4edd] rounded-lg text-white border-[1.5px] border-[#9d4edd] hover:text-[#9d4edd] hover:scale-105 hover:bg-white duration-500"
      >
        Filter By Tags
      </button>
    </>
  );
}

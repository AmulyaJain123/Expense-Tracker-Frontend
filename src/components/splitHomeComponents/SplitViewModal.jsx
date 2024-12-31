import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { styling } from "../../util/styling";
import SingleBill from "./SingleBill";
import styles from "./SplitViewModal.module.css";
import AddBillNavThumbs from "../../UIComponents/AddBillNavThumbs";

export const Thumb = styled.button`
  transition: all 500ms;
  font-weight: 400;
  font-size: medium;
  border-radius: 6px;
  padding: 2px 12px;
  justify-content: center;
  border: ${(props) =>
    props.$status === "true"
      ? `2px solid ${"#9d4edd"}`
      : `2px solid ${styling.backColor}`};
  display: flex;
  align-items: center;
  color: ${(props) => (props.$status === "true" ? "#f5f5f4" : "black")};
  background-color: ${(props) =>
    props.$status === "true" ? "#9d4edd" : "#f5f5f4"};
  &:hover {
    scale: ${(props) => {
      return props.$status === "true" ? "100%" : "105%";
    }};
    transition: all 500ms;
  }
`;

const SplitViewModal = forwardRef(function SplitViewModal({ ...props }, ref) {
  const modalRef = useRef();
  const [selectedBill, setSelectedBill] = useState(null);

  const {
    createdAt,
    splitInfo,
    registeredFriends,
    transactionToLiquidate,
    expenditure,
    bills,
  } = props.data;

  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.showModal();
        modalRef.current.scroll({
          top: 0,
          behaviour: "smooth",
        });
      },
    };
  });

  useEffect(() => {
    // console.log("sdfsfef");
  }, []);

  function changeSelectedBill(id) {
    setSelectedBill(id);
  }

  function getBill() {
    const reqBill = bills.find((bill) => {
      return bill.billId === selectedBill ? true : false;
    });
    return reqBill;
  }

  return (
    <dialog
      className="rounded-3xl scrollbar-hidden splitViewBg py-4 relative"
      ref={modalRef}
    >
      <form className="sticky left-[0px] top-[0px]" method="dialog">
        <div className="flex justify-center">
          <button className="">
            <i className="fi fi-ss-circle-xmark flex text-[25px] sm:text-[40px] justify-center items-center"></i>
          </button>
        </div>
      </form>

      <div className={`${styles.main}`}>
        <div className="flex flex-col space-y-4 pb-6 lg:px-12">
          <div className="text-xl lg:text-3xl font-bold text-white flex flex-grow rounded-xl bg-[#9F21E3] py-3 lg:py-4 mb-4 uppercase justify-center">
            Split Summary
          </div>

          <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="rounded-xl sm:min-w-[300px] bg-white p-3 ">
              <div className="rounded-xl border-dashed border-2 border-stone-300 bg-[#F7EBFD] flex p-3 flex-grow flex-col">
                <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold  text-sm lg:text-xl sm:text-lg py-2 flex justify-center items-center">
                  Split Name
                </div>
                <div className="rounded-lg h-[60px] lg:h-[80px] font-medium flex-auto text-sm md:text-base lg:text-lg py-2 mt-2 flex justify-center items-center text-stone-400">
                  {splitInfo.splitName}
                </div>
              </div>
            </div>
            <div className="rounded-xl sm:min-w-[300px] bg-white p-3 ">
              <div className="rounded-xl border-dashed border-2 border-stone-300 bg-[#F7EBFD] flex p-3 flex-grow flex-col">
                <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold  text-sm lg:text-xl sm:text-lg py-2 flex justify-center items-center">
                  Split Created On
                </div>
                <div className="rounded-lg h-[60px] lg:h-[80px] font-medium text-sm md:text-base lg:text-lg py-2 mt-2 flex justify-center items-center text-stone-400">
                  {splitInfo.splitDate}
                </div>
              </div>
            </div>
            <div className="rounded-xl flex-grow bg-white p-3 ">
              <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] flex p-3 flex-grow flex-col">
                <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold  text-sm lg:text-xl sm:text-lg py-2 flex justify-center items-center">
                  Split Description
                </div>
                <div className="rounded-lg h-[60px] lg:h-[80px] p-4 font-medium flex text-center justify-center items-center text-sm md:text-base lg:text-lg mt-2  text-stone-400">
                  {splitInfo.splitDesc}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="rounded-xl bg-white flex-col space-y-3 p-3 2xl:w-[350px] h-[400px] sm:h-[500px]">
              <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] h-full flex p-3 flex-grow flex-col">
                <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold  text-sm lg:text-xl sm:text-lg py-2 flex justify-center items-center">
                  Registered Friends
                </div>
                <div className="customScroll rounded-lg overflow-auto text-sm md:text-base lg:text-lg py-2 pt-4 mt-4 flex font-medium flex-col text-stone-400">
                  {registeredFriends.map((friend, index) => {
                    return (
                      <li
                        key={friend}
                        className="mb-4 px-4 flex w-full text-sm md:text-base lg:text-lg"
                      >
                        <div className="min-w-[40px] sm:min-w-[50px]">
                          <span className="bg-[#fff] flex justify-center items-center w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-lg ">
                            {index + 1}
                          </span>
                        </div>

                        <span className="bg-[#fff] flex-grow  flex px-4 items-center h-[30px] sm:h-[35px] rounded-lg ">
                          <span>{friend}</span>
                        </span>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-xl flex-grow bg-white flex-col space-y-3 p-3 2xl:w-[400px] h-[600px] sm:h-[500px]">
              <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] h-full flex p-3 flex-grow flex-col">
                <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold  text-sm lg:text-xl sm:text-lg py-2 flex justify-center items-center">
                  Transactions to Liquidate
                </div>
                <div className="customScroll rounded-lg  overflow-auto font-medium text-sm md:text-base lg:text-lg py-2 pt-4 mt-4 flex flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-0 sm:flex-col text-stone-400">
                  {transactionToLiquidate.map((ele) => {
                    return (
                      <li
                        key={Math.random()}
                        className="mb-4 px-3 sm:px-2 flex flex-col items-center sm:flex-row w-fit mx-auto  border-2 border-stone-300 py-2 rounded-lg border-dashed text-sm lg:text-lg"
                      >
                        <div className="sm:mr-4">
                          <span className="bg-[#fff] flex w-fit px-2 justify-center items-center h-[35px] rounded-lg ">
                            {ele.sender}
                          </span>
                        </div>
                        <div className="sm:mr-4">
                          <span className="flex w-fit px-2 sm:mx-auto items-center h-[35px]">
                            Pays
                          </span>
                        </div>
                        <div className="sm:mr-4">
                          <span className="bg-[#fff] sm:ml-auto flex w-fit px-2 justify-center items-center h-[35px] rounded-lg ">
                            {ele.reciever}
                          </span>
                        </div>
                        <div className="sm:mr-4">
                          <span className="flex w-fit px-2 sm:mx-auto items-center h-[35px]">
                            Total of
                          </span>
                        </div>
                        <div className="">
                          <span className="bg-[#fff] px-2 sm:ml-auto flex w-fit justify-center items-center h-[35px] rounded-lg ">
                            {ele.amt}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="rounded-xl bg-white flex-col space-y-3 p-3 2xl:w-[400px] h-[400px] sm:h-[740px]">
              <div className="rounded-xl border-dashed border-2 border-stone-300 h-full bg-[#F7EBFD] flex p-3 flex-grow flex-col">
                <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold  text-sm lg:text-xl sm:text-lg py-2 flex justify-center items-center">
                  Expenditure
                </div>
                <div className="customScroll rounded-lg overflow-auto text-sm md:text-base lg:text-lg py-2 pt-4 mt-4 flex font-medium flex-col text-stone-400">
                  {expenditure.map((ele) => {
                    return (
                      <li
                        key={ele.name}
                        className="mb-4 flex w-full justify-between text-sm md:text-base lg:text-lg"
                      >
                        <div className="">
                          <span className="bg-[#fff] flex justify-center items-center px-2 w-fit h-[35px] rounded-lg ">
                            {ele.name}
                          </span>
                        </div>

                        <span className="bg-[#fff] flex px-2 items-center h-[35px] rounded-lg ">
                          {ele.amt}
                        </span>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-grow bg-[#fff] flex flex-col p-3 rounded-xl ">
              <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] flex p-3 flex-grow flex-col">
                <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold  text-sm lg:text-xl sm:text-lg py-2 flex justify-center items-center">
                  Registered Bills
                </div>
                <div className=" rounded-lg  text-sm md:text-base lg:text-lg py-2 flex font-medium flex-col text-stone-400">
                  <div className="text-sm md:text-base lg:text-lg flex flex-col text-stone-500  rounded-lg  ">
                    <div className="border-b-2 border-white gap-y-2 gap-x-2 p-4 flex flex-wrap flex-grow ">
                      {bills.map((bill) => {
                        return (
                          <Thumb
                            key={bill.billId}
                            onClick={() => changeSelectedBill(bill.billId)}
                            $status={
                              selectedBill === bill.billId ? "true" : "false"
                            }
                          >
                            {bill.billName}
                          </Thumb>
                        );
                      })}
                    </div>

                    <div className="p-2 sm:p-4 w-full ">
                      {selectedBill === null ? (
                        <p className="text-center">No Bill Selected</p>
                      ) : (
                        <SingleBill data={getBill()} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
});

export default SplitViewModal;

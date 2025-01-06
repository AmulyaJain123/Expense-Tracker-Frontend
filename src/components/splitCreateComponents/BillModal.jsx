import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { useState } from "react";
import styled from "styled-components";
import { styling } from "../../util/styling";
import { addBillHeirarchy } from "../../util/componentNavigation";
import DivideEquallySplitModal from "./DivideEquallySplitModal";
import DivideByRatioSplitModal from "./DivideByRatioSplitModal";
import DivideManuallySplitModal from "./DivideManuallySplitModal";

const Main = styled.dialog`
  background-color: ${styling.billModalBgCol};
`;

const Error = styled.div`
  background-color: ${styling.errorBoxBgCol};

  & h2 {
    color: ${styling.errorBoxTitleCol};
    font-weight: 600;
  }
  & p {
    color: ${styling.errorBoxTextCol};
  }
`;

const NavButton = styled.button`
  background-color: ${(props) => {
    return props.$status === "true" ? styling.topNavThumbsBgCol : "white";
  }};
  color: ${(props) => {
    return props.$status === "true" ? "black" : "#78716c";
  }};
  border: 1.5px solid
    ${(props) => {
      return props.$status === "true"
        ? styling.topNavThumbsBgCol
        : styling.backColor;
    }};
  transition: all 500ms;

  &:hover {
    scale: ${(props) => {
      return props.$status === "true" ? "100%" : "105%";
    }};
    transition: all 500ms;
  }
`;

const BillModal = forwardRef(function BillModal({ ...rest }, ref) {
  const friends = useSelector((state) => state.splitCreate.friends);
  const dispatch = useDispatch();
  const dialog = useRef();
  const [error, setError] = useState(null);
  const navStatus = useSelector((state) => state.splitCreate.addBillNavStatus);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function evalBool(a, b) {
    if (a === b) {
      return true;
    }
    return false;
  }

  function navClick(event) {
    if (event.target.value === navStatus) {
      return;
    } else {
      dispatch(
        splitCreateActions.changeAddBillNavStatus(event.target.innerText)
      );
    }
  }

  return (
    <Main
      ref={dialog}
      className="sm:max-w-[90vw] bg-white  scrollbar-hidden min-w-[300px] xl:w-[750px] max-h-[90vh] p-3 rounded-xl "
    >
      <div className="w-full h-fit flex flex-col">
        <div className="rounded-xl mb-3 flex-col sm:flex-row space-y-[6px] sm:space-y-0 flex sm:space-x-[10px]">
          {addBillHeirarchy.map((text) => {
            return (
              <NavButton
                key={text}
                onClick={(event) => navClick(event)}
                $status={`${evalBool(navStatus, text)}`}
                className="rounded-lg font-bold xl:text-md py-1 sm:py-2 xl:py-[6px] px-4 flex-auto border-[1.5px] border-stone-300 "
              >
                {text}
              </NavButton>
            );
          })}
        </div>
        <div className=" overflow-auto">
          {navStatus === addBillHeirarchy[0] ? (
            <DivideEquallySplitModal />
          ) : null}
          {navStatus === addBillHeirarchy[2] ? (
            <DivideByRatioSplitModal />
          ) : null}
          {navStatus === addBillHeirarchy[1] ? (
            <DivideManuallySplitModal />
          ) : null}
        </div>
      </div>
    </Main>
  );
});

export default BillModal;

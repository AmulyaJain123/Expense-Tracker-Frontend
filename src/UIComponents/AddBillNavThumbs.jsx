import { styling } from "../util/styling";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../store/main";

const Button = styled.button`
  transition: all 500ms;
  &:hover {
    scale: ${(props) => {
      return props.$status === "true" ? "100%" : "105%";
    }};
    transition: all 500ms;
  }
`;

export default function AddBillNavThumbs({
  status,
  viewOnly,
  identity,
  children,
}) {
  const dispatch = useDispatch();
  function clickHandle() {
    dispatch(splitCreateActions.changeSelectBillNavStatus(identity));
  }
  function removeClick() {
    dispatch(splitCreateActions.removeBill(identity));
  }

  return (
    <Button $status={status} onClick={clickHandle} className="min-w-[50px]">
      <div
        style={{
          backgroundColor: status === "true" ? "#9d4edd" : "white",
          border:
            status != "true"
              ? `1.5px solid ${styling.backColor}`
              : `1.5px solid ${"#9d4edd"}`,
          color: status != "true" ? "black" : "#f7ebfd",
        }}
        className="rounded-[5px] p-[2px] justify-center flex-grow text-black px-[6px] flex items-center"
      >
        <span>{children}</span>
        {viewOnly == "false" && status === "true" ? (
          <button
            onClick={removeClick}
            className="ml-2 hover:scale-125 duration-500"
          >
            <i className="fi fi-ss-cross-circle flex justify-center items-center text-md"></i>
          </button>
        ) : null}
      </div>
    </Button>
  );
}

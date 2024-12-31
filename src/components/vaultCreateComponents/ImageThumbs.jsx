import styled from "styled-components";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";
import { useSelector } from "react-redux";
import { validateFileUpload } from "../../util/algo";

const Button = styled.div`
  background-color: ${(props) =>
    props.$status === "true" ? "#9d4edd" : "#e7e5e4"};
  border: ${(props) =>
    props.$status === "true" ? "solid 2px #9d4edd" : "solid 2px #a8a29e"};
  color: ${(props) => (props.$status === "true" ? "white" : "#57534e")};

  &:hover {
    scale: ${(props) => (props.$status === "true" ? "100%" : "105%")};
  }
`;

export default function ImageThumbs({ ind, removeFileObj }) {
  const fileInd = useSelector((state) => state.vault.fileInd);
  const dispatch = useDispatch();
  const fileError = useSelector((state) => state.vault.fileError);
  const files = useSelector((state) => state.vault.files);

  function clickHandle() {
    dispatch(vaultActions.setFileInd(ind));
  }
  function remove() {
    removeFileObj(fileInd);
    if (fileError.file === files[fileInd].name) {
      let nextError = null;
      let arr = [...files];
      arr.reverse();
      let newFile = null;
      for (let i of arr) {
        if (i.name != fileError.file && validateFileUpload(i) != null) {
          newFile = i.name;
          nextError = `ERROR: FileName "${i.name}" - ${validateFileUpload(i)}`;
          break;
        }
      }
      if (nextError != null) {
        dispatch(
          vaultActions.setFileError({ file: newFile, error: nextError })
        );
      } else {
        dispatch(vaultActions.removeFileError());
      }
    }
    dispatch(vaultActions.deleteImg(ind));
  }

  return (
    <Button
      $status={ind === fileInd ? "true" : "false"}
      className="p-[5px] sm:p-[6px] px-2 duration-500 items-center flex rounded-md sm:rounded-lg "
    >
      <button onClick={clickHandle}>
        <span className="">{`Image ${ind + 1}`}</span>
      </button>

      {ind === fileInd ? (
        <button className="ml-2" onClick={remove}>
          <i className="fi fi-ss-cross-circle flex justify-center items-center text-lg sm:text-xl"></i>
        </button>
      ) : null}
    </Button>
  );
}

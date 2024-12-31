import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";
import Preview from "./Preview";
import { validateFileUpload } from "../../util/algo";
import { forwardRef, useImperativeHandle } from "react";
import styles from "./InputFile.module.css";
import load from "../../assets/loader.gif";
import exclamation from "../../assets/exclamation.png";
import cancel from "../../assets/cancel.png";

const InputFile = forwardRef(function InputFile({ ...props }, ref) {
  const dispatch = useDispatch();
  const [fileURLs, setFileURLs] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [imageArr, setImageArr] = useState([false, false, false, false]);
  const formRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      getData() {
        console.log(fileURLs);
        const fileObjects = JSON.parse(JSON.stringify(fileURLs));
        return fileObjects;
      },
    };
  });

  useEffect(() => {
    if (fileURLs.length === 0) {
      dispatch(vaultActions.setFileValidation(false));
    } else {
      dispatch(vaultActions.setFileValidation(true));
    }
  }, [fileURLs]);

  async function fileUpload(event) {
    setFileError(null);
    const file = event.target.files[0];
    const metaData = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    const validate = validateFileUpload(file);
    if (validate != null) {
      setFileError(validate);
    } else {
      let num = 0;
      for (let i = 1; i <= 4; ++i) {
        if (imageArr[i - 1] === false) {
          num = i;
          break;
        }
      }
      const name = `image${num}`;
      const formdata = new FormData(formRef.current);
      const fileType = file.type;
      try {
        setFileLoading(true);
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/vault/imagepreview/" + name,
          {
            method: "POST",
            body: formdata,
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw "failed";
        }
        const result = await res.json();
        setFileError(null);
        setFileURLs((preval) => [
          ...preval,
          {
            name: name,
            url: result.previewUrl,
            uploadUrl: result.uploadUrl,
            type: fileType,
            metaData: metaData,
          },
        ]);
        setImageArr((preval) => {
          const newArr = [...preval];
          newArr[num - 1] = true;
          return newArr;
        });
        setFileLoading(false);
        setActiveFile({
          name: name,
          url: result.previewUrl,
          uploadUrl: result.uploadUrl,
          type: fileType,
          metaData: metaData,
        });
      } catch (err) {
        console.log(err);
        setFileLoading(false);
        setFileError("Something Went Wrong");
      }
    }
    event.target.value = "";
  }

  function buttonClick({ ...file }) {
    console.log("Hello");
    setFileError(null);
    setActiveFile({ ...file });
  }

  function stopLoading() {
    setFileLoading(false);
  }

  function removeClick(file) {
    console.log("Bye");
    let newFileUrls = [];
    for (let i = 0; i < fileURLs.length; ++i) {
      if (fileURLs[i].name != file.name) {
        newFileUrls.push({ ...fileURLs[i] });
      }
    }
    setFileURLs(newFileUrls);
    const num = parseInt(file.name[file.name.length - 1]) - 1;
    const newArr = [...imageArr];
    newArr[num] = false;
    setImageArr(newArr);
    setActiveFile(null);
    setFileError(null);
  }

  return (
    <>
      <div className={`${styles.main} zigzag`}>
        <div className="bg-slate-100 m-4  rounded-lg flex text-black justify-center items-center  h-[50px] sm:h-[60px] text-xl sm:text-2xl uppercase font-bold">
          Add Files
        </div>
        <div className="flex h-[20px] mb-[20px]">
          <div className="billCuts h-[20px] w-[20px] rounded-r-full"></div>
          <div className="flex flex-col h-full flex-grow">
            <div className="h-1/2 w-full  border-b-[3px] border-dashed border-stone-200"></div>
            <div className="h-1/2 w-full  border-stone-300"></div>
          </div>
          <div className="billCuts h-[20px] w-[20px] rounded-l-full"></div>
        </div>
        {fileError != null ? (
          <div className="flex ml-6 text-red-500 items-center">
            <img src={exclamation} className="w-[18px] h-[18px] mr-4" alt="" />
            <p>{fileError}</p>
          </div>
        ) : (
          <div className="h-[20px] flex"></div>
        )}
        <div className="flex mt-4 mx-3 items-center flex-wrap text-xs sm:text-base gap-y-2 gap-x-2 sm:gap-x-4 p-2">
          {fileURLs.map((file, index) => {
            return (
              <div className="relative">
                <button
                  onClick={() => buttonClick({ ...file })}
                  style={{
                    backgroundColor:
                      activeFile?.name === file.name ? "#9d4edd" : "#dc93f6",
                    color: activeFile?.name === file.name ? "#fff" : "#000",
                  }}
                  className="py-[5px] relative text-black flex items-center font-medium capitalize   rounded-md bg-[#dc93f6]"
                >
                  <span className="px-4">{"File " + file.name.at(-1)}</span>
                </button>
                {activeFile?.name === file.name ? (
                  <button
                    className="absolute bottom-[-10px] right-[50%] translate-y-[100%] translate-x-[50%]"
                    onClick={() => removeClick(file)}
                  >
                    <img
                      src={cancel}
                      className="w-[20px]  h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                ) : null}
              </div>
            );
          })}
          {fileURLs.length < 4 ? (
            <form ref={formRef}>
              <input
                className=""
                type="file"
                multiple={false}
                accept="image/png, image/jpg, image/jpeg, application/pdf"
                name="billImg"
                onChange={(event) => fileUpload(event)}
                id="billImg1"
              />
              <label
                className="p-[6px] px-2 border-dashed cursor-pointer border-2 border-stone-300 rounded-lg bg-stone-100"
                htmlFor="billImg1"
              >
                + Add
              </label>
            </form>
          ) : null}
        </div>
        <div className="flex justify-center items-center mt-8">
          {fileLoading ? (
            <div className="flex justify-center mt-60">
              <img
                src={load}
                className="w-[60px] h-[60px] flex justify-center items-center"
                alt=""
              />
            </div>
          ) : null}
          <Preview
            hide={fileLoading}
            stopLoading={stopLoading}
            file={activeFile}
          />
        </div>
      </div>
    </>
  );
});

export default InputFile;

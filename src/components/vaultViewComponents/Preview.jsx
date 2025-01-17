import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import image from "../../assets/img.png";
import pdf from "../../assets/pdf.png";

export default function Preview({ file }) {
  const dialogRef = useRef();
  console.log(file);

  function previewClick() {
    dialogRef.current.showModal();
  }
  function errorLoading(event) {
    console.log(event);
  }

  return (
    <div>
      {file != null ? (
        <div className="flex justify-center mt-16">
          {file.metaData.type != "application/pdf" ? (
            <div className="flex space-x-12">
              <div className="flex flex-col">
                <button onClick={previewClick}>
                  <img
                    src={image}
                    className="w-[150px] hover:opacity-75 h-[150px] flex justify-center items-center"
                    alt=""
                  />
                </button>
                <p className="text-center mt-3 text-xs">Click to Preview</p>
              </div>
              <div className="flex flex-col text-xs gap-y-3 py-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs">Name</span>
                  <p className="">
                    {file.metaData.name.length > 30
                      ? `${file.metaData.name.substr(0, 30)}......`
                      : file.metaData.name}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs">Size</span>
                  <p>{Number(file.metaData.size / 1024).toFixed(2)} KB</p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs">Type</span>
                  <p>{file.metaData.type}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex space-x-12">
                <div className="flex flex-col">
                  <button onClick={previewClick}>
                    <img
                      src={pdf}
                      className="w-[150px] hover:opacity-75 h-[150px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                  <p className="text-center mt-3 ml-6 text-xs">
                    Click to Preview
                  </p>
                </div>
                <div className="flex text-xs flex-col gap-y-3 py-2">
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Name</span>
                    <p className="">
                      {file.metaData.name.length > 30
                        ? `${file.metaData.name.substr(0, 30)}......`
                        : file.metaData.name}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Size</span>
                    <p>{Number(file.metaData.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">Type</span>
                    <p>{file.metaData.type}</p>
                  </div>
                </div>
              </div>
              <p className="mt-16 text-xs text-center">
                For PDF's only the first page is available for preview
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-[100px] text-xs">
          <p className="text-center">No File Selected</p>
          <p className="text-center mt-2 px-3">
            NOTE: Browser Extensions might delay or cancel Upload{" "}
          </p>
        </div>
      )}
      <dialog className="relative scrollbar-hidden" ref={dialogRef}>
        <div className="">
          {file && file.metaData.type === "application/pdf" ? (
            <img
              src={file ? file.previewUrl : ""}
              className="max-w-[80vw]"
              alt=""
            />
          ) : (
            <img
              src={file ? file.previewUrl : ""}
              className="max-w-[80vw]"
              alt=""
            />
          )}
        </div>
        <button
          className="fixed top-6 right-6 rounded-md px-3 py-[6px] text-base text-white font-semibold bg-[#9d4edd]"
          onClick={() => dialogRef.current.close()}
        >
          Close
        </button>
      </dialog>
    </div>
  );
}

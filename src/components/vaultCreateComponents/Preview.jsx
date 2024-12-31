import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import image from "../../assets/img.png";
import pdf from "../../assets/pdf.png";

export default function Preview({ file, stopLoading, hide }) {
  const dialogRef = useRef();
  console.log(file);

  function loadComplete() {
    stopLoading();
  }
  function previewClick() {
    dialogRef.current.showModal();
  }
  function errorLoading(event) {
    console.log(event);
  }

  return (
    <div style={{ display: hide ? "none" : "" }}>
      {file != null ? (
        <div className="flex justify-center mt-24">
          {file.type != "application/pdf" ? (
            <div className="flex space-x-16">
              <div className="flex flex-col">
                <button onClick={previewClick}>
                  <img
                    src={image}
                    onLoad={loadComplete}
                    className="w-[200px] hover:opacity-75 h-[200px] flex justify-center items-center"
                    alt=""
                  />
                </button>
                <p className="text-center mt-4">Click to Preview</p>
              </div>
              <div className="flex flex-col gap-y-4 py-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Name</span>
                  <p className="">
                    {file.metaData.name.length > 30
                      ? `${file.metaData.name.substr(0, 30)}......`
                      : file.metaData.name}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Size</span>
                  <p>{Number(file.metaData.size / 1024).toFixed(2)} KB</p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Type</span>
                  <p>{file.metaData.type}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex space-x-16">
                <div className="flex flex-col">
                  <button onClick={previewClick}>
                    <img
                      src={pdf}
                      onLoad={loadComplete}
                      className="w-[200px] hover:opacity-75 h-[200px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                  <p className="text-center mt-4 ml-8">Click to Preview</p>
                </div>
                <div className="flex flex-col gap-y-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">Name</span>
                    <p className="">
                      {file.metaData.name.length > 30
                        ? `${file.metaData.name.substr(0, 30)}......`
                        : file.metaData.name}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">Size</span>
                    <p>{Number(file.metaData.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">Type</span>
                    <p>{file.metaData.type}</p>
                  </div>
                </div>
              </div>
              <p className="mt-24 text-center">
                For PDF's only the first page is available for preview
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-[150px]">
          <p className="text-center p-3 pb-2">You can add upto 4 files</p>
          <p className="text-center px-3 pb-2">
            <span className="sm:mr-3">Supported Extensions:</span>
            <div className="mt-[10px] sm:mt-0 sm:inline">
              <span className="rounded-md bg-stone-200 p-1 px-2 mr-3">
                . jpg
              </span>
              <span className="rounded-md bg-stone-200 p-1 px-2 mr-3">
                . png
              </span>
              <span className="rounded-md bg-stone-200 p-1 px-2 mr-3">
                . jpeg
              </span>
              <span className="rounded-md bg-stone-200 p-1 px-2">. pdf</span>
            </div>
          </p>
          <p className="text-center px-3">Maximum Supported File Size: 2 MB</p>
          <p className="text-center mt-8 px-3">
            NOTE: Browser Extensions might delay or cancel Upload{" "}
          </p>
        </div>
      )}
      <dialog className="relative scrollbar-hidden" ref={dialogRef}>
        <div className="">
          {file && file.type === "application/pdf" ? (
            <img src={file ? file.url : ""} className="max-w-[80vw]" alt="" />
          ) : (
            <img src={file ? file.url : ""} className="max-w-[80vw]" alt="" />
          )}
        </div>
        <button
          className="fixed top-8 right-8 rounded-lg px-4 py-2 text-xl text-white font-semibold bg-[#9d4edd]"
          onClick={() => dialogRef.current.close()}
        >
          Close
        </button>
      </dialog>
    </div>
  );
}

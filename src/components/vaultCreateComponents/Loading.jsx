import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/failed.png";
import successIcon from "../../assets/success.png";
import { useNavigate } from "react-router-dom";

export default function Loading({ retry, changeMode, mode }) {
  const navigate = useNavigate();
  function cancelClick() {
    changeMode(false);
  }

  function retryClick() {
    retry();
  }

  function redirect() {
    navigate("/vault");
  }

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 z-50 w-[100vw] h-[100vh] bg-black/50">
      <div className="flex flex-col scale-75 h-screen items-center justify-center">
        <div className="w-[400px] text-xl sm:text-2xl text-center p-3 bg-white flex flex-col space-y-5 px-[50px] py-[40px] rounded-xl text-black font-semibold">
          {mode === "load" ? (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-neutral-700">Saving</h1>
              <img src={load} className="w-[50px] h-[50px] my-8 mt-10" alt="" />

              <p className="text-center font-medium text-lg mt-2">
                Please Wait
              </p>
            </div>
          ) : null}

          {mode === "success" ? (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-neutral-700">Saved</h1>
              <img
                src={successIcon}
                className="w-[80px] h-[80px] my-8 mt-10"
                alt=""
              />

              <button
                onClick={redirect}
                className="p-2 px-4 font-semibold rounded-lg text-[18px]  mr-6 sm:mr-0 bg-[#9d4edd] text-white"
              >
                Continue To VAULT
              </button>
            </div>
          ) : null}

          {mode === "error" ? (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-neutral-700">
                Save Unsuccessful
              </h1>
              <img
                src={errorIcon}
                className="w-[80px] h-[80px] my-6 mt-10"
                alt=""
              />

              <p className="text-center font-medium text-lg mt-2">
                Something Went Wrong
              </p>

              <div className="flex text-xl w-full mt-8 justify-evenly">
                <button
                  onClick={cancelClick}
                  className="px-4 py-2 w-[120px] rounded-lg bg-red-500 text-white border-2 border-red-500 hover:scale-105 hover:text-red-500 hover:bg-white hover hover:shadow-lg duration-500"
                >
                  Cancel
                </button>
                <button
                  onClick={retryClick}
                  className="px-4 py-2 w-[120px] rounded-lg bg-blue-500 text-white border-2 border-blue-500 hover:scale-105 hover:text-blue-500 hover:bg-white hover hover:shadow-lg duration-500"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

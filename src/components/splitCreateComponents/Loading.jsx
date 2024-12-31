import { useEffect, useState } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/failed.png";
import successIcon from "../../assets/success.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";

export default function Loading({ retry, changeMode, mode }) {
  const [time, setTime] = useState(null);
  const [timeFunc, setTimeFunc] = useState(null);
  const [timer, setTimer] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function cancelClick() {
    changeMode(false);
  }

  console.log(timeFunc);

  useEffect(() => {
    if (mode === "success" && timer === true) {
      console.log("wfwe");
      setTime(3);
      const func = setInterval(() => {
        console.log("entry", time);
        setTime((preval) => {
          if (preval > 1) {
            console.log("dec");
            return preval - 1;
          } else {
            console.log("end");
            setTimer(false);
            return preval;
          }
        });
      }, 1000);
      setTimeFunc(func);
    } else if (timer === false && mode === "success") {
      if (timeFunc) {
        clearInterval(timeFunc);
        setTimeFunc(null);
        redirect();
      }
    }
  }, [mode, timer]);

  function retryClick() {
    retry();
  }

  function redirect() {
    dispatch(splitCreateActions.clearAll());
    navigate("/split");
  }

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 z-50 w-[100vw] h-[100vh] bg-black/50">
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="w-[400px] text-xl sm:text-2xl text-center p-3 bg-white flex flex-col space-y-5 px-[50px] py-[40px] rounded-xl text-black font-semibold">
          {mode === "load" ? (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-neutral-700">Saving</h1>
              <img src={load} className="w-[50px] h-[50px] my-8 mt-10" alt="" />

              <p className="text-center font-medium text-base mt-2">
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

              <p className="text-center font-medium text-base mt-2">
                Save Successful!! <br /> Redirecting to SPLIT in{" "}
                <span className="font-medium text-[#9d4edd]">{time}</span>
              </p>
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

              <p className="text-center font-medium text-base mt-2">
                Something went wrong.
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

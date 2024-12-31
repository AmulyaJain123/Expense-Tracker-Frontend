import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectingWindow({ add, children }) {
  const [time, setTime] = useState(3);
  const [timeFunc, setTimeFunc] = useState(null);
  const [timer, setTimer] = useState(true);
  const navigate = useNavigate();

  console.log(timeFunc);

  useEffect(() => {
    if (timer === true) {
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
    } else if (timer === false) {
      if (timeFunc) {
        clearInterval(timeFunc);
        setTimeFunc(null);
        redirect();
      }
    }
  }, [timer]);

  function redirect() {
    navigate(add);
  }

  return (
    <p className="text-center font-medium text-base mt-2">
      {children}
      <span className="font-medium text-[#9d4edd]">{time}</span>
    </p>
  );
}

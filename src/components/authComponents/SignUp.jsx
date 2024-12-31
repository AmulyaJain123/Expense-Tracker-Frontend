import { useEffect, useRef, useState } from "react";
import eye from "../../assets/eye.png";
import noEye from "../../assets/noEye.png";
import load from "../../assets/loader.gif";
import exclamation from "../../assets/exclamation.png";
import check from "../../assets/check-double.png";
import welcome from "../../assets/success.gif";

export default function SignUp({ login, disableButton, enableButton }) {
  const [stage, setStage] = useState(1);
  const usernameRef = useRef();
  const confirmPassRef = useRef(null);
  const signUpEmailRef = useRef(null);
  const otpRef = useRef(null);
  const signUpPasswordRef = useRef(null);
  const [signUpError, setSignUpError] = useState(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seePass1, setSeePass1] = useState(false);
  const [seePass2, setSeePass2] = useState(false);
  const [seePass3, setSeePass3] = useState(false);
  const [email, setEmail] = useState(null);
  const [resendTime, setResendTime] = useState(null);
  const [resendActive, setResendActive] = useState(true);
  const [intervalFunc, setIntervalFunc] = useState(null);

  useEffect(() => {
    setSeePass1(false);
    setSeePass2(false);
    setSignUpError(null);
    setSignUpLoading(false);
    if (confirmPassRef.current) {
      confirmPassRef.current.value = "";
    }
    if (signUpEmailRef.current) {
      signUpEmailRef.current.value = "";
    }
    if (signUpPasswordRef.current) {
      signUpPasswordRef.current.value = "";
    }
    if (otpRef.current) {
      otpRef.current.value = "";
    }
    if (stage == 1) {
      enableButton(1);
    } else {
      disableButton(1);
    }
  }, [stage]);

  function reset() {
    setSeePass1(false);
    setSeePass2(false);
    setSeePass3(false);
    setSignUpError(null);
    setSignUpLoading(false);
    setResendLoading(false);
    setResendActive(true);
    setIntervalFunc(null);
    setResendTime(null);
    setEmail(null);
  }

  useEffect(() => {
    if (!resendActive) {
      setResendTime(30);
      const func = setInterval(() => {
        setResendTime((preval) => {
          if (preval == 1) {
            setResendActive(true);
            return null;
          } else {
            return preval - 1;
          }
        });
      }, 1000);
      setIntervalFunc(func);
    } else {
      if (intervalFunc) {
        clearInterval(intervalFunc);
      }
      setIntervalFunc(null);
    }
  }, [resendActive]);

  const validateEmail = (email) => {
    // console.log(email);
    const res = email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);
    // console.log(res);
    return res;
  };

  function validatePassword(pass) {
    if (pass.includes(" ")) {
      return "space";
    } else if (pass.length < 7) {
      return "short";
    } else if (pass.length > 15) {
      return "long";
    }
    return "ok";
  }

  function cancel() {}

  async function resendOtp() {
    setResendLoading(true);
    const res = await fetch(
      import.meta.env.VITE_BACKEND_API + "/auth/signup/resendotp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const result = await res.json();
    setResendLoading(false);
    console.log(result);
    if (result == "failed") {
      setSignUpError("Something went wrong.");
    } else if (result == "email exists") {
      setSignUpError("Email already taken.");
    } else if (result == "email invalid") {
      setSignUpError("Email invalid.");
    } else {
      setResendActive(false);
    }
  }

  async function signUp() {
    if (stage === 1) {
      if (signUpEmailRef.current.value.trim() === "") {
        setSignUpError("Email cannot be empty.");
      } else if (validateEmail(signUpEmailRef.current.value.trim()) === null) {
        setSignUpError("Email invalid.");
      } else {
        setSignUpError(null);
        setSignUpLoading(true);
        const email = signUpEmailRef.current.value;
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/auth/signup/getotp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );
        const result = await res.json();
        console.log(result);
        if (result == "email exists") {
          setSignUpError("Email already taken.");
        } else if (result == "email invalid") {
          setSignUpError("Email doesnot exists.");
        } else if (result == "failed") {
          setSignUpError("Something went wrong.");
        } else {
          setEmail(result.email);
          setResendActive(false);
          setStage(2);
        }
        setSignUpLoading(false);
      }
    } else if (stage === 2) {
      setSignUpLoading(true);
      const enteredOtp = otpRef.current.value;
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/auth/signup/verifyotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: enteredOtp,
          }),
        }
      );
      const result = await res.json();
      if (result == "incorrect") {
        setSignUpError("OTP did not match.");
      } else if (result == "failed") {
        setSignUpError("Something went wrong.");
      } else {
        setStage(3);
      }
      setSignUpLoading(false);
    } else if (stage == 3) {
      if (usernameRef.current.value.trim() === "") {
        setSignUpError("Username cannot be empty");
      } else if (usernameRef.current.value.trim().length > 20) {
        setSignUpError("Username must be less than 20 characters.");
      } else if (validatePassword(signUpPasswordRef.current.value) != "ok") {
        const err = validatePassword(signUpPasswordRef.current.value);
        if (err === "space") {
          setSignUpError("Password cannot contain spaces");
        } else if (err === "short" || err === "long") {
          setSignUpError("Password must between 7 and 15 characters long");
        }
      } else if (
        signUpPasswordRef.current.value != confirmPassRef.current.value
      ) {
        setSignUpError("Passwords do not match");
      } else {
        setSignUpError(null);
        setSignUpLoading(true);
        const password = signUpPasswordRef.current.value;
        const username = usernameRef.current.value;
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/auth/signup/createaccount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              username: username,
            }),
          }
        );
        const result = await res.json();
        console.log(result);
        setSignUpLoading(false);
        if (result == "success") {
          setStage(4);
        } else {
          setSignUpError("Something went wrong.");
        }
      }
    } else if (stage === 4) {
      login();
    }
  }

  function cancel() {
    setStage(1);
    reset();
  }

  return (
    <div className="flex flex-col sm:mx-4 p-2 sm:p-4 flex-grow justify-between">
      <div className="flex flex-col flex-grow">
        <div className="flex relative justify-center mb-8 ">
          <div className="space-x-4 flex ">
            {stage > 1 && stage < 4 ? (
              <button
                onClick={() => cancel()}
                className="absolute text-red-500 left-0 top-[50%] translate-y-[-50%]"
              >
                Cancel
              </button>
            ) : null}
            <div
              style={{ backgroundColor: stage === 1 ? "#9f21e3" : "white" }}
              className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
            ></div>
            <div
              style={{ backgroundColor: stage === 2 ? "#9f21e3" : "white" }}
              className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
            ></div>
            <div
              style={{ backgroundColor: stage === 3 ? "#9f21e3" : "white" }}
              className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
            ></div>
            <div
              style={{ backgroundColor: stage === 4 ? "#9f21e3" : "white" }}
              className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
            ></div>
          </div>
        </div>

        {stage === 1 ? (
          <>
            <p>Enter Email to Continue</p>
            <div className="flex flex-col space-y-2 mt-8 rounded-xl">
              <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                Email
              </span>
              <input
                className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                placeholder="JohnDoe123@gmail.com"
                type="text"
                ref={signUpEmailRef}
                onChange={() => setSignUpError(null)}
              />
            </div>
          </>
        ) : null}

        {stage === 2 ? (
          <>
            <p>
              OTP is sent to{" "}
              <span className="bg-neutral-200 px-2 py-1 rounded-md ml-2">
                {email}
              </span>
            </p>
            <div className="flex relative flex-col mt-8 rounded-xl">
              <span className="text-sm sm:text-lg mb-2 text-black rounded-lg font-semibold p-1 px-2 w-fit">
                Enter OTP
              </span>
              <div className="relative flex">
                <input
                  className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                  placeholder="OTP"
                  type={seePass3 ? "text" : "password"}
                  ref={otpRef}
                  onChange={() => setSignUpError(null)}
                />
                <button
                  onClick={() => setSeePass3((preval) => !preval)}
                  className="absolute right-4 top-[50%] translate-y-[-50%]"
                >
                  <img
                    src={seePass3 ? noEye : eye}
                    className="w-[25px] h-[25px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div className="flex relative select-none justify-end mt-4">
              <div className="relative flex">
                <button
                  disabled={!resendActive || resendLoading}
                  onClick={resendOtp}
                  className=" disabled:pointer-events-none disabled:opacity-50 font-medium hover:text-blue-600  mr-4"
                >
                  Resend OTP
                </button>
                <span className="min-w-[30px] text-neutral-400">
                  {resendTime}
                </span>
                {resendLoading ? (
                  <div className="absolute left-[-10px] top-[50%] translate-y-[-50%] translate-x-[-100%]">
                    <img
                      src={load}
                      className="flex justify-center items-center w-[15px] h-[15px]"
                      alt=""
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </>
        ) : null}

        {stage === 3 ? (
          <div className="flex-grow flex flex-col">
            <div className="flex flex-col">
              <p className="flex items-center">
                Email{" "}
                <span className="text-green-500 ml-1 font-medium">Verfied</span>
                . Enter Details to Create Account
              </p>
            </div>
            <div className="overflow-auto mt-8 customScrollThinLight  pr-4 loginHeight">
              <div className="flex flex-col space-y-3  rounded-xl">
                <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                  Username{" "}
                  <span className="text-base ml-8 font-normal">
                    *Cannot be changed afterwards
                  </span>
                </span>
                <input
                  className="p-2 px-3 bg-stone-100  duration-700 focus:outline-none mx-1 flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                  placeholder="John Doe"
                  type="text"
                  ref={usernameRef}
                  onChange={() => setSignUpError(null)}
                />
              </div>
              <div className="flex flex-col mt-4 space-y-2 rounded-xl">
                <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                  Email
                </span>
                <input
                  disabled={true}
                  className="p-2 px-3 bg-stone-100 disabled:opacity-50 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                  value={email}
                  type="text"
                />
              </div>
              <div className="flex relative flex-col mt-4 rounded-xl">
                <span className="text-sm sm:text-lg mb-2 text-black rounded-lg font-semibold p-1 px-2 w-fit">
                  Password
                </span>
                <div className="relative flex">
                  <input
                    className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                    placeholder="Password"
                    type={seePass1 ? "text" : "password"}
                    ref={signUpPasswordRef}
                    onChange={() => setSignUpError(null)}
                  />
                  <button
                    onClick={() => setSeePass1((preval) => !preval)}
                    className="absolute right-4 top-[50%] translate-y-[-50%]"
                  >
                    <img
                      src={seePass1 ? noEye : eye}
                      className="w-[25px] h-[25px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-4 mb-4 space-y-2 rounded-xl">
                <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                  Confirm Password
                </span>
                <div className="relative flex">
                  <input
                    className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                    placeholder="Password"
                    type={seePass2 ? "text" : "password"}
                    ref={confirmPassRef}
                    onChange={() => setSignUpError(null)}
                  />
                  <button
                    onClick={() => setSeePass2((preval) => !preval)}
                    className="absolute right-4 top-[50%] translate-y-[-50%]"
                  >
                    <img
                      src={seePass2 ? noEye : eye}
                      className="w-[25px] h-[25px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {stage === 4 ? (
          <>
            <div className="flex flex-col mt-16">
              <h1 className="text-3xl font-semibold text-[#9f21e3] text-center">
                Welcome to BillBud!!
              </h1>
              <img
                src={welcome}
                className="w-[80px] my-4 h-[80px] flex justify-center items-center mx-auto"
                alt=""
              />
              <p className="mt-4 text-center text-lg">
                Congraturations!! You have{" "}
                <span className="text-green-500 font-medium">successfully</span>{" "}
                SignedUp! <br />
                <span className="text-[#9f21e3] font-medium">Log in</span> and
                start managing you expenses now!
              </p>
            </div>
          </>
        ) : null}
      </div>

      <div className="pt-[20px] mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between">
        <p className="text-red-500 flex items-center justify-center text-center sm:text-start text-xs sm:text-base p-1 h-[60px] px-4">
          {signUpError ? (
            <img
              src={exclamation}
              className="w-[20px] h-[20px] flex justify-center items-center mr-4"
              alt=""
            />
          ) : null}{" "}
          {signUpError}
        </p>
        <div className="relative h-fit">
          <button
            onClick={signUp}
            disabled={signUpLoading}
            className="p-2 px-6 bg-[#9f21e3] disabled:pointer-events-none disabled:opacity-50 border-2 border-[#9f21e3] min-w-[130px] text-white sm:text-xl font-bold rounded-lg duration-500 hover:shadow-xl hover:scale-110 hover:bg-white hover:text-[#9f21e3]"
          >
            {stage === 1
              ? "Continue"
              : stage === 2
              ? "Verify OTP"
              : stage === 3
              ? "Sign Up"
              : "Continue to Login"}
          </button>
          {signUpLoading ? (
            <div className="absolute left-[-30px] top-[50%] translate-x-[-100%] translate-y-[-50%]">
              <img src={load} className="w-[25px] h-[25px]" alt="" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

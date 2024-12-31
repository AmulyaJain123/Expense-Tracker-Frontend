import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { universalActions } from "../../store/main";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import eye from "../../assets/eye.png";
import noEye from "../../assets/noEye.png";
import load from "../../assets/loader.gif";
import exclamation from "../../assets/exclamation.png";
import loggedin from "../../assets/shield.gif";
import passwordIcon from "../../assets/password.gif";

export default function SignIn({ signup, disableButton, enableButton }) {
  const logInEmailRef = useRef();
  const logInPasswordRef = useRef();
  const resetPasswordRef = useRef();
  const resetConfirmPassRef = useRef();

  const [logInError, setLogInError] = useState(null);
  const [stage, setStage] = useState(1);
  const [seePass1, setSeePass1] = useState(false);
  const [seePass2, setSeePass2] = useState(false);
  const [seePass3, setSeePass3] = useState(false);
  const [seePass4, setSeePass4] = useState(false);

  const [redirectTime, setRedirectTime] = useState(false);
  const [resendActive, setResendActive] = useState(true);
  const [resendTime, setResendTime] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);

  const [time, setTime] = useState(null);
  const [intervalFunc, setIntervalFunc] = useState(null);
  const [resendIntervalFunc, setResendIntervalFunc] = useState(null);
  const resetEmailRef = useRef();
  const [email, setEmail] = useState(null);
  const otpRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logInLoading, setLogInLoading] = useState(false);

  function reset() {
    setSeePass1(false);
    setSeePass2(false);
    setSeePass3(false);
    setSeePass4(false);
    setLogInError(null);
    setRedirectTime(false);
    setResendActive(true);
    setResendTime(null);
    setResendLoading(false);
    setTime(null);
    setIntervalFunc(null);
    setResendIntervalFunc(null);
    setEmail(null);
    setLogInLoading(false);
  }

  useEffect(() => {
    if (redirectTime) {
      setTime(3);
      const func = setInterval(() => {
        setTime((preval) => {
          if (preval == 1) {
            setRedirectTime(false);
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
        setIntervalFunc(null);
        navigate("/");
      }
    }
  }, [redirectTime]);

  useEffect(() => {
    if (stage == 1) {
      enableButton(2);
    } else {
      disableButton(2);
    }
  }, [stage]);

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
      setResendIntervalFunc(func);
    } else {
      if (resendIntervalFunc) {
        clearInterval(resendIntervalFunc);
      }
      setResendIntervalFunc(null);
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

  async function logIn() {
    if (stage == 1) {
      if (logInEmailRef.current.value.trim() === "") {
        setLogInError("Email cannot be empty");
      } else if (validateEmail(logInEmailRef.current.value.trim()) === null) {
        setLogInError("Email Invalid  ");
      } else if (logInPasswordRef.current.value.trim() === "") {
        setLogInError("Password cannot be empty");
      } else {
        setLogInError(null);
        setLogInLoading(true);
        const email = logInEmailRef.current.value;
        const password = logInPasswordRef.current.value;
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/auth/signin/verifydetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            credentials: "include",
          }
        );

        const result = await res.json();
        if (result == "notfound") {
          setLogInError("Email not found.");
        } else if (result == "password wrong") {
          setLogInError("Wrong Password.");
        } else if (result == "failed") {
          setLogInError("Something went wrong.");
        } else {
          console.log("Yayy");
          setStage(2);
          setRedirectTime(true);
        }

        setLogInLoading(false);
      }
    } else if (stage == 3) {
      if (resetEmailRef.current.value.trim() === "") {
        setLogInError("Email cannot be empty");
      } else if (validateEmail(resetEmailRef.current.value.trim()) === null) {
        setLogInError("Email Invalid  ");
      } else {
        setLogInError(null);
        setLogInLoading(true);
        const email = resetEmailRef.current.value;
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/auth/reset/getotp",
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
        if (result == "notfound") {
          setLogInError("User not found.");
        } else if (result == "email invalid") {
          setLogInError("Email doesnot exists.");
        } else if (result == "failed") {
          setLogInError("Something went wrong.");
        } else {
          setEmail(result.email);
          setResendActive(false);
          setStage(4);
        }
        setLogInLoading(false);
      }
    } else if (stage == 4) {
      setLogInLoading(true);
      const enteredOtp = otpRef.current.value;
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/auth/reset/verifyotp",
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
        setLogInError("OTP did not match.");
      } else if (result == "failed") {
        setLogInError("Something went wrong.");
      } else {
        setStage(5);
      }
      setLogInLoading(false);
    } else if (stage == 5) {
      if (validatePassword(resetPasswordRef.current.value) != "ok") {
        const err = validatePassword(resetPasswordRef.current.value);
        if (err === "space") {
          setLogInError("Password cannot contain spaces");
        } else if (err === "short" || err === "long") {
          setLogInError("Password must between 7 and 15 characters long");
        }
      } else if (
        resetPasswordRef.current.value != resetConfirmPassRef.current.value
      ) {
        setLogInError("Passwords do not match");
      } else {
        setLogInError(null);
        setLogInLoading(true);
        const password = resetPasswordRef.current.value;
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/auth/reset/changepassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );
        const result = await res.json();
        console.log(result);
        setLogInLoading(false);
        if (result == "success") {
          setStage(6);
        } else {
          setLogInError("Something went wrong.");
        }
      }
    } else if (stage == 6) {
      setStage(1);
    }
  }

  async function resendOtp() {
    setResendLoading(true);
    const res = await fetch(
      import.meta.env.VITE_BACKEND_API + "/auth/reset/resendotp",
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
      setLogInError("Something went wrong.");
    } else if (result == "notfound") {
      setLogInError("User not found.");
    } else if (result == "email invalid") {
      setLogInError("Email invalid.");
    } else {
      setResendActive(false);
    }
  }

  function cancel() {
    setStage(1);
    reset();
  }

  return (
    <>
      <div className="flex flex-col justify-between flex-grow sm:mx-4 p-2 sm:p-4 ">
        <div>
          {stage == 1 ? (
            <>
              <div className="mb-8">
                <span>Dont have an Account yet?</span> Sign Up{" "}
                <button
                  onClick={() => signup()}
                  className="text-[#9f21e3] hover:text-blue-500"
                >
                  Here
                </button>
              </div>
              <div className="flex flex-col space-y-2 mb-4 rounded-xl">
                <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                  Email
                </span>
                <input
                  className="p-2 px-3 bg-stone-100 flex mx-1 duration-700 focus:outline-none rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                  placeholder="JohnDoe123@gmail.com"
                  type="text"
                  ref={logInEmailRef}
                  onChange={() => setLogInError(null)}
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
                    ref={logInPasswordRef}
                    onChange={() => setLogInError(null)}
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
              <div className="flex ">
                <button
                  onClick={() => setStage(3)}
                  className="text-[#9f21e3] hover:text-blue-500 mt-4 ml-auto"
                >
                  Reset Password
                </button>
              </div>
            </>
          ) : null}
          {stage == 2 ? (
            <>
              <div className="flex flex-col mt-16">
                <h1 className="text-3xl font-semibold text-[#9f21e3] text-center">
                  Hooray!! You are Logged In!
                </h1>
                <img
                  src={loggedin}
                  className="w-[80px] my-4 h-[80px] flex justify-center items-center mx-auto"
                  alt=""
                />
                <p className="mt-4 text-center text-lg">
                  Congraturations!! You have{" "}
                  <span className="text-green-500 font-medium">
                    successfully
                  </span>{" "}
                  Logged In!
                </p>
                <p className="mt-4 text-center text-lg">
                  Redirecting to{" "}
                  <span className="text-[#9f21e3]">BillBud Home</span> in{" "}
                  <span className="mx-2 text-neutral-500">{time}</span>{" "}
                </p>
              </div>
            </>
          ) : null}
          {stage > 2 ? (
            <>
              <div className="flex flex-col">
                <h1 className="text-2xl text-center font-semibold">
                  Password Reset
                </h1>
                <div className="flex relative justify-center my-6">
                  {stage > 2 && stage < 6 ? (
                    <button
                      onClick={() => cancel()}
                      className="absolute text-red-500 left-0 top-[50%] translate-y-[-50%]"
                    >
                      Cancel
                    </button>
                  ) : null}
                  <div className="flex   space-x-4">
                    <div
                      style={{
                        backgroundColor: stage === 3 ? "#9f21e3" : "white",
                      }}
                      className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
                    ></div>
                    <div
                      style={{
                        backgroundColor: stage === 4 ? "#9f21e3" : "white",
                      }}
                      className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
                    ></div>
                    <div
                      style={{
                        backgroundColor: stage === 5 ? "#9f21e3" : "white",
                      }}
                      className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
                    ></div>
                    <div
                      style={{
                        backgroundColor: stage === 6 ? "#9f21e3" : "white",
                      }}
                      className="w-[10px] h-[10px] duration-700 border-2 border-[#9f21e3] rounded-full"
                    ></div>
                  </div>
                </div>
                <div className="">
                  <p>
                    {stage == 3 ? (
                      "Enter Registered Email"
                    ) : stage == 4 ? (
                      <p className="mt-2">
                        OTP is sent to{" "}
                        <span className="bg-neutral-200 px-2 py-1 rounded-md ml-2">
                          {email}
                        </span>
                      </p>
                    ) : stage == 5 ? (
                      <p className="mt-2">
                        Email{" "}
                        <span className="bg-neutral-200 px-2 py-1 rounded-md mx-1">
                          {email}
                        </span>{" "}
                        <span className="text-green-500">Verified</span>.
                      </p>
                    ) : null}
                  </p>
                </div>

                <div className="flex flex-col">
                  {stage == 3 ? (
                    <>
                      <div className="flex flex-col space-y-2 mt-8 rounded-xl">
                        <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                          Email
                        </span>
                        <input
                          className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                          placeholder="JohnDoe123@gmail.com"
                          type="text"
                          ref={resetEmailRef}
                          onChange={() => setLogInError(null)}
                        />
                      </div>
                    </>
                  ) : null}

                  {stage == 4 ? (
                    <>
                      <div className="flex relative flex-col mt-8 rounded-xl">
                        <span className="text-sm sm:text-lg mb-2 text-black rounded-lg font-semibold p-1 px-2 w-fit">
                          Enter OTP
                        </span>
                        <div className="relative flex">
                          <input
                            className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                            placeholder="OTP"
                            type={seePass2 ? "text" : "password"}
                            ref={otpRef}
                            onChange={() => setLogInError(null)}
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

                  {stage == 5 ? (
                    <>
                      <div className="flex relative flex-col mt-8 rounded-xl">
                        <span className="text-sm sm:text-lg mb-2 text-black rounded-lg font-semibold p-1 px-2 w-fit">
                          New Password
                        </span>
                        <div className="relative flex">
                          <input
                            className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                            placeholder="Password"
                            type={seePass3 ? "text" : "password"}
                            ref={resetPasswordRef}
                            onChange={() => setLogInError(null)}
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
                      <div className="flex flex-col mt-4 mb-4 space-y-2 rounded-xl">
                        <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                          Confirm Password
                        </span>
                        <div className="relative flex">
                          <input
                            className="p-2 px-3 bg-stone-100 mx-1 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                            placeholder="Password"
                            type={seePass4 ? "text" : "password"}
                            ref={resetConfirmPassRef}
                            onChange={() => setLogInError(null)}
                          />
                          <button
                            onClick={() => setSeePass4((preval) => !preval)}
                            className="absolute right-4 top-[50%] translate-y-[-50%]"
                          >
                            <img
                              src={seePass4 ? noEye : eye}
                              className="w-[25px] h-[25px] flex justify-center items-center"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {stage == 6 ? (
                    <div className="flex flex-col mt-8">
                      <h1 className="text-[26px] font-semibold text-[#9f21e3] text-center">
                        Password Changed Successfully!!
                      </h1>
                      <img
                        src={passwordIcon}
                        className="w-[80px] my-4 h-[80px] flex justify-center items-center mx-auto"
                        alt=""
                      />
                      <p className="mt-4 text-center text-lg">
                        Congraturations!! You have{" "}
                        <span className="text-green-500 font-medium">
                          successfully
                        </span>{" "}
                        changed password. <br />
                        <span className="text-[#9f21e3] font-medium">
                          Log in
                        </span>{" "}
                        and start managing you expenses now!
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </div>
        {stage != 2 ? (
          <div className="pt-[20px] mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between">
            <p className="text-red-500 flex items-center justify-center text-center sm:text-start text-xs sm:text-base p-1 h-[60px] px-4">
              {logInError ? (
                <img
                  src={exclamation}
                  className="w-[20px] h-[20px] flex justify-center items-center mr-4"
                  alt=""
                />
              ) : null}{" "}
              {logInError}
            </p>
            <div className="relative h-fit">
              <button
                onClick={logIn}
                disabled={logInLoading}
                className="p-2 text-nowrap px-6 bg-[#9f21e3] disabled:pointer-events-none disabled:opacity-50 border-2 border-[#9f21e3] min-w-[130px] text-white sm:text-xl font-bold rounded-lg duration-500 hover:shadow-xl hover:scale-110 hover:bg-white hover:text-[#9f21e3]"
              >
                {stage === 1
                  ? "Log In"
                  : stage === 2
                  ? "Verify OTP"
                  : stage === 3
                  ? "Continue"
                  : stage === 4
                  ? "Verify OTP"
                  : stage === 5
                  ? "Reset Password"
                  : "Continue to Login"}
              </button>
              {logInLoading ? (
                <div className="absolute left-[-30px] top-[50%] translate-x-[-100%] translate-y-[-50%]">
                  <img src={load} className="w-[25px] h-[25px]" alt="" />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

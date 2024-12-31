import { useRef, useState } from "react";
import styled from "styled-components";
import { styling } from "../util/styling";

import { Helmet } from "react-helmet-async";

import SignUp from "../components/authComponents/SignUp";
import SignIn from "../components/authComponents/SignIn";

const Button = styled.button`
  background-color: ${(props) =>
    props.$status === "false" ? "white" : "#9f21e3"};
  color: ${(props) => (props.$status === "true" ? "white" : "#9f21e3")};
  flex-grow: ${(props) => (props.$status === "true" ? "1" : "0")};
  transition: all 500ms;

  &:hover {
    background-color: #9f21e3;
    color: white;
  }
`;

export default function AuthPage() {
  const [selected, setSelected] = useState(1);
  const [disable1, setDisable1] = useState(false);
  const [disable2, setDisable2] = useState(false);

  function clickHandle(num) {
    setSelected(num);
  }

  function switchToLogin() {
    setSelected(1);
  }

  function switchToSignUp() {
    setSelected(2);
  }

  function disableButton(num) {
    if (num == 1) {
      setDisable1(true);
      setDisable2(false);
    } else {
      setDisable2(true);
      setDisable1(false);
    }
  }

  function cancel() {
    setDisable1(false);
    setDisable2(false);
    setSelected(1);
  }

  function enableButton(num) {
    if (num == 1) {
      setDisable1(false);
    } else {
      setDisable2(false);
    }
  }

  return (
    <>
      <Helmet>
        <title> LogIn | SignUp | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="flex gradient  h-screen w-screen p-8">
        <div className="flex w-full justify-center h-full space-x-8">
          <div className="flex w-full max-w-600px sm:w-[500px] lg:w-[600px] xl:w-[40%] h-full overflow-auto scrollbar-hidden bg-white sm:scale-90 rounded-2xl items-center justify-center">
            <div className="rounded-3xl flex flex-col space-y-2 sm:space-y-4  py-2 sm:py-4 p-4   h-full w-full">
              <div className="flex justify-center m-4 mx-2 sm:mx-8 space-x-4 sm:space-x-8">
                <Button
                  disabled={selected === 1 || disable1}
                  style={{
                    pointerEvents: disable1 ? "none" : "all",
                    opacity: disable1 ? "70%" : "",
                  }}
                  $status={selected === 1 ? "true" : "false"}
                  onClick={() => clickHandle(1)}
                  className="p-1 sm:p-2 px-4 flex sm:min-w-[170px] justify-center rounded-lg bg-[#9f21e3] border-2 border-[#9f21e3] text-white text-base sm:text-2xl font-semibold"
                >
                  Log In
                </Button>
                <Button
                  disabled={selected === 2 || disable2}
                  $status={selected === 2 ? "true" : "false"}
                  style={{
                    pointerEvents: disable2 ? "none" : "all",
                    opacity: disable2 ? "70%" : "",
                  }}
                  onClick={() => clickHandle(2)}
                  className="p-1 sm:p-2 px-4 flex sm:min-w-[170px] justify-center rounded-lg bg-[#9f21e3] border-2 border-[#9f21e3] text-white  text-base sm:text-2xl font-semibold"
                >
                  Sign Up
                </Button>
              </div>

              {selected === 2 ? (
                <SignUp
                  login={switchToLogin}
                  disableButton={disableButton}
                  enableButton={enableButton}
                ></SignUp>
              ) : (
                <SignIn
                  signup={switchToSignUp}
                  disableButton={disableButton}
                  enableButton={enableButton}
                ></SignIn>
              )}
            </div>
          </div>
          <div className="w-[60%] hidden xl:flex relative h-full rounded-3xl bgLogin">
            <div
              style={{ fontFamily: styling.logoFont }}
              className="text-[50px] font-bold text-black font p-4 pt-2 px-6 bg-white rounded-b-3xl absolute top-p right-[100px]"
            >
              BILLBUD
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

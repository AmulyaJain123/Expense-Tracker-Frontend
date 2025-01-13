import styled from "styled-components";
import billTrackIcon from "../assets/billTrack-Icon.webp";
import { Link } from "react-router-dom";
import TrackHomeMenu from "../components/trackHomeComponents/TrackHomeMenu";
import add from "../assets/add.png";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const Span = styled.span`
  font-size: large;
  font-weight: 600;
  border-bottom: solid black 4px;
  transition: all 200ms;
  padding: 0 1px;
`;

export default function TrackHome() {
  const userDetails = useSelector((state) => state.universal.userInfo);

  return (
    <>
      <Helmet>
        <title> TRACK Home | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <div className="flex flex-col max-w-[1200px] mx-auto">
          <h2
            style={{ fontFamily: "Fredoka" }}
            className="flex justify-center text-[35px] sm:text-[40px] xl:text-[40px] mt-8 p-4 font-bold capitalize "
          >
            TRACK
          </h2>
          <div className=" mt-4 flex smTab:flex-row flex-col space-y-4 justify-center md:space-y-0 mx-[30px] tab:mx-[100px] items-center md:space-x-[20px]">
            <div className="flex flex-col max-w-[900px] text-center sm:text-start text-xs lg:text-sm space-y-4 my-auto">
              <p className=" font-medium justify-center items-center ">
                With <span className="font-medium text-[#9d4edd]">TRACK</span>,
                you can seamlessly monitor and manage your expenses in one
                convenient place. Whether it's daily spending, monthly bills, or
                unexpected costs,{" "}
                <span className="font-medium text-[#9d4edd]">TRACK</span> helps
                you stay on top of your finances with ease.
              </p>
              <p className=" font-medium flex justify-center items-center ">
                Track your expenses, analyze spending patterns, and gain
                insights into your financial habits to make informed decisions!!
              </p>
            </div>
            <img
              className="w-[250px] sm:w-[250px] h-fit lg:w-[300px] xl:w-[320px]"
              src={billTrackIcon}
              alt=""
            />
          </div>
          <TrackHomeMenu />

          <div className="flex flex-col mt-[80px] sm:mt-[100px]">
            <div className="flex justify-between items-center p-2 px-4 rounded-xl bg-slate-100 mx-[30px] sm:mx-[80px]">
              <span className="text-[25px] sm:text-[30px] ml-[15px] font-bold">
                TRACK
              </span>
            </div>
            <div className="flex mt-[15px] p-6 rounded-xl pb-12 space-x-6 bg-slate-100 mx-[30px] sm:mx-[80px]">
              {!userDetails ? (
                <div className="flex flex-col flex-grow justify-center items-center">
                  <img
                    src={
                      "https://res.cloudinary.com/dbittrdjs/image/upload/v1733135870/loginRequired_qglenr.gif"
                    }
                    className="w-[100px] h-[100px] flex mb-2  justify-center items-center"
                    alt=""
                  />
                  <h1 className="text-xl font-bold mb-3">Login Required</h1>
                  <p className="text-center text-xs">
                    You must Login in order to view this content. <br />
                    Click{" "}
                    <Link
                      to="/auth"
                      className="mx-1 text-[#9d4edd] hover:text-blue-500 font-medium"
                    >
                      HERE
                    </Link>{" "}
                    to Login
                  </p>
                </div>
              ) : (
                <div className="flex flex-grow flex-wrap gap-6 justify-center sm:justify-start">
                  <Link
                    className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]  group rounded-lg sm:rounded-xl text-sm sm:text-lg  text-[#fff] hover:text-[#9d4edd] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#9d4edd] duration-500 font-semibold bg-[#9d4edd]"
                    to={"protected/dashboard"}
                  >
                    <p className="pb-[6px] border-b-[1.5px] leading-tight border-white group-hover:border-[#9d4edd] ">
                      Go To Dashboard
                    </p>
                  </Link>
                  <Link
                    className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]  group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                    to={"protected/create"}
                  >
                    <p className="pb-[6px] border-b-[1.5px] leading-tight border-white group-hover:border-[#000] ">
                      <span className="flex items-center mr-3">
                        <i className="fi fi-br-plus flex justify-center mr-[6px] sm:mr-2 text-xs sm:text-base items-center"></i>
                        <span>Create</span>
                      </span>
                      <span className="flex items-center">Transaction</span>
                    </p>
                  </Link>
                  <Link
                    className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] leading-tight group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                    to={"protected/transactions"}
                  >
                    <p className="pb-[6px] border-b-[1.5px] border-white group-hover:border-[#000] ">
                      Go To Transactions
                    </p>
                  </Link>
                  <Link
                    className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] leading-tight group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                    to={"protected/categories"}
                  >
                    <p className="pb-[6px] border-b-[1.5px] border-white group-hover:border-[#000] ">
                      Manage Categories
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

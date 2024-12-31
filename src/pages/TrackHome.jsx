import styled from "styled-components";
import billTrackIcon from "../assets/billTrack-Icon.png";
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
        <h2
          style={{ fontFamily: "Fredoka" }}
          className="flex justify-center text-[35px] sm:text-[40px] xl:text-[50px] mt-12 p-4 font-bold capitalize "
        >
          TRACK
        </h2>
        <div className=" mt-8 flex md:flex-row flex-col space-y-4 justify-center md:space-y-0 mx-[50px] sm:mx-[100px] items-center md:space-x-[20px]">
          <div className="flex flex-col max-w-[900px] lg:text-base text-sm xl:text-lg space-y-6 my-auto">
            <p className=" font-medium justify-center items-center text-center ">
              With <span className="font-medium text-[#9d4edd]">TRACK</span>,
              you can seamlessly monitor and manage your expenses in one
              convenient place. Whether it's daily spending, monthly bills, or
              unexpected costs,{" "}
              <span className="font-medium text-[#9d4edd]">TRACK</span> helps
              you stay on top of your finances with ease.
            </p>
            <p className=" font-medium flex justify-center items-center text-center ">
              Track your expenses, analyze spending patterns, and gain insights
              into your financial habits to make informed decisions!!
            </p>
          </div>
          <img
            className="w-[250px] sm:w-[250px] h-fit lg:w-[300px] xl:w-[450px]"
            src={billTrackIcon}
            alt=""
          />
        </div>
        <TrackHomeMenu />

        <div className="flex flex-col mt-[150px]">
          <div className="flex justify-between items-center p-3 px-6 rounded-xl bg-slate-100 mx-[50px] sm:mx-[100px]">
            <span className="text-[25px] sm:text-[30px] lg:text-[40px] ml-[10px] sm:ml-[20px] font-bold">
              TRACK
            </span>
          </div>
          <div className="flex mt-[20px] p-8 rounded-xl pb-16 space-x-8 bg-slate-100 mx-[50px] sm:mx-[100px]">
            {!userDetails ? (
              <div className="flex flex-col flex-grow justify-center items-center">
                <img
                  src={
                    "https://res.cloudinary.com/dbittrdjs/image/upload/v1733135870/loginRequired_qglenr.gif"
                  }
                  className="w-[150px] h-[150px] flex mb-4  justify-center items-center"
                  alt=""
                />
                <h1 className="text-3xl font-bold mb-4">Login Required</h1>
                <p className="text-center">
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
              <>
                <Link
                  className="py-2 px-4 w-[150px] h-[150px] md:w-[200px] md:h-[200px] group rounded-2xl text-lg md:text-2xl text-[#fff] hover:text-[#9d4edd] hover:scale-110 hover:bg-[#fff] border-2 border-[#9d4edd] duration-500 font-semibold bg-[#9d4edd]"
                  to={"protected/dashboard"}
                >
                  <p className="pb-2 border-b-2 border-white group-hover:border-[#9d4edd] ">
                    Go To Dashboard
                  </p>
                </Link>
                <Link
                  className="py-2 px-4 w-[150px] h-[150px] md:w-[200px] md:h-[200px] group justify-center items-center rounded-2xl text-lg md:text-2xl text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-2 border-[#000] duration-500 font-semibold bg-[#000]"
                  to={"protected/create"}
                >
                  <p className="pb-2 border-b-2 border-white group-hover:border-[#000] ">
                    <span className="flex items-center mr-3">
                      <i className="fi fi-br-plus flex justify-center mr-3 text-xl items-center"></i>
                      <span>Create</span>
                    </span>
                    <span className="flex items-center">Transaction</span>
                  </p>
                </Link>
                <Link
                  className="py-2 px-4 w-[150px] h-[150px] md:w-[200px] md:h-[200px] group justify-center items-center rounded-2xl text-lg md:text-2xl text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-2 border-[#000] duration-500 font-semibold bg-[#000]"
                  to={"protected/transactions"}
                >
                  <p className="pb-2 border-b-2 border-white group-hover:border-[#000] ">
                    Go To Transactions
                  </p>
                </Link>
                <Link
                  className="py-2 px-4 w-[150px] h-[150px] md:w-[200px] md:h-[200px] group justify-center items-center rounded-2xl text-lg md:text-2xl text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-2 border-[#000] duration-500 font-semibold bg-[#000]"
                  to={"protected/categories"}
                >
                  <p className="pb-2 border-b-2 border-white group-hover:border-[#000] ">
                    Manage Categories
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

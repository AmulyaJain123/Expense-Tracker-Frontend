import split from "../assets/split.webp";
import SplitHomeMenu from "../components/splitHomeComponents/SplitHomeMenu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logInIcon from "../assets/logIn.png";
import { useSelector } from "react-redux";
import add from "../assets/add.png";
import { Helmet } from "react-helmet-async";

export default function SplitHome() {
  const userDetails = useSelector((state) => state.universal.userInfo);

  return (
    <>
      <Helmet>
        <title> SPLIT Home | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[150px] text-stone-700 rounded-l-xl">
        <div className="flex flex-col mx-auto max-w-[1200px]">
          <h2
            style={{ fontFamily: "Fredoka" }}
            className="flex justify-center text-[35px] sm:text-[40px] xl:text-[40px] mt-8 p-4 font-bold capitalize"
          >
            SPLIT
          </h2>
          <div className=" mt-4 flex flex-col justify-center  items-center  flex-grow sm:flex-row space-y-4 sm:space-y-0 mx-[30px] md:mx-[100px] sm:space-x-[20px]">
            <img
              className="w-[250px] sm:w-[250px] h-fit lg:w-[300px] xl:w-[320px] self-center "
              src={split}
              alt=""
            />
            <div className="flex max-w-[900px] self-center text-xs lg:text-sm flex-col space-y-4 my-auto">
              <p className=" font-medium text-center sm:text-start ">
                Introducing{" "}
                <span className="text-[#9d4edd] font-medium">SPLIT</span>, the
                ultimate solution for managing shared expenses effortlessly.
                With <span className="text-[#9d4edd] font-medium">SPLIT</span>,
                you can create expense splits by adding bills and assigning
                participant shares. Our intelligent algorithm minimizes the
                number of transactions required, ensuring an optimal settlement
                process.{" "}
              </p>
              <p className=" font-medium flex justify-center items-center text-center sm:text-start ">
                Save your splits to retain all details, including bills,
                expenditures, and transactions, and revisit them anytime. Share
                saved splits seamlessly with your friends on the platform to
                collaborate on expenses and achieve hassle-free settlements.
              </p>
            </div>
          </div>
          <SplitHomeMenu />

          <div className="flex flex-col mt-[80px] sm:mt-[100px]">
            <div className="flex justify-between items-center p-2 px-4 rounded-xl bg-slate-100 mx-[30px] sm:mx-[80px]">
              <span className="text-[25px] sm:text-[30px] ml-[10px] sm:ml-[20px] font-bold">
                SPLITS
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
                <div className="flex flex-grow gap-6 flex-wrap justify-center sm:justify-start">
                  <Link
                    to={"create"}
                    className="rounded-lg sm:rounded-xl  border-[1.5px] group border-[white] hover:border-stone-600  w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] hover:shadow-xl duration-500  hover:scale-105  flex justify-center text-center items-center p-4 striped"
                  >
                    <div className="w-[30px] rounded-full h-[30px]  bg-white flex items-center justify-center">
                      <img src={add} className="w-[30px] h-[30px]" alt="" />
                    </div>
                  </Link>
                  <Link
                    to={"protected/view/saved"}
                    className="bg-black p-2 sm:p-3 rounded-lg text-sm sm:text-lg sm:rounded-xl w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] text-white group hover:text-black hover:bg-white border-[1.5px] border-black hover:scale-110 duration-500 hover:shadow-lg"
                  >
                    <span className=" font-semibold  leading-tight">
                      Go To
                      <br /> Saved SPLITS
                    </span>
                    <div className="mt-2 border border-white group-hover:border-black duration-500 rounded-full"></div>
                  </Link>
                  <Link
                    to={"protected/view/shared"}
                    className="bg-black p-2 sm:p-3 px-2 rounded-lg text-sm sm:text-lg sm:rounded-xl w-[125px] h-[120px] sm:w-[155px] sm:h-[150px] text-white group hover:text-black hover:bg-white border-[1.5px] border-black hover:scale-110 duration-500 hover:shadow-lg"
                  >
                    <span className=" font-semibold leading-tight">
                      Go To
                      <br /> Shared SPLITS
                    </span>
                    <div className="mt-2 border border-white group-hover:border-black duration-500 rounded-full"></div>
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

import split from "../assets/split.png";
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
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <h2
          style={{ fontFamily: "Fredoka" }}
          className="flex justify-center text-[35px] sm:text-[40px] xl:text-[50px] mt-12 p-4 font-bold capitalize "
        >
          SPLIT
        </h2>
        <div className=" mt-8 flex flex-col justify-center  items-center  flex-grow sm:flex-row space-y-8 sm:space-y-0 mx-[50px] md:mx-[100px] sm:space-x-[20px]">
          <img
            className="w-[350px] sm:w-[300px] h-fit self-center xl:w-[450px]"
            src={split}
            alt=""
          />
          <div className="flex text-sm max-w-[900px] self-center md:text-base xl:text-lg flex-col space-y-6 my-auto">
            <p className=" font-medium text-center ">
              Introducing{" "}
              <span className="text-green-500 font-medium">SPLIT</span>, the
              ultimate solution for managing shared expenses effortlessly. With{" "}
              <span className="text-green-500 font-medium">SPLIT</span>, you can
              create expense splits by adding bills and assigning participant
              shares. Our intelligent algorithm minimizes the number of
              transactions required, ensuring an optimal settlement process.{" "}
            </p>
            <p className=" font-medium flex justify-center items-center text-center ">
              Save your splits to retain all details, including bills,
              expenditures, and transactions, and revisit them anytime. Share
              saved splits seamlessly with your friends on the platform to
              collaborate on expenses and achieve hassle-free settlements.
            </p>
          </div>
        </div>
        <SplitHomeMenu />

        <div className="flex flex-col mt-[150px]">
          <div className="flex justify-between items-center p-3 px-6 rounded-xl bg-slate-100 mx-[50px] sm:mx-[100px]">
            <span className="text-[25px] sm:text-[30px] lg:text-[40px] ml-[10px] sm:ml-[20px] font-bold">
              SPLITS
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
                  to={"create"}
                  className="rounded-2xl sm:rounded-3xl border-2 group border-[white] hover:border-stone-600  w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] hover:shadow-xl duration-500  hover:scale-105  flex justify-center text-center items-center p-4 striped"
                >
                  <div className="w-[30px] sm:w-[40px] rounded-full h-[30px] sm:h-[40px] bg-white flex items-center justify-center">
                    <img
                      src={add}
                      className="w-[30px] sm:w-[40px] h-[30px] sm:h-[40px]"
                      alt=""
                    />
                  </div>
                </Link>
                <Link
                  to={"protected/view/saved"}
                  className="bg-black w-[200px] p-4 rounded-xl h-[200px] text-white group hover:text-black hover:bg-white border-2 border-black hover:scale-110 duration-500 hover:shadow-lg"
                >
                  <span className=" font-semibold text-2xl ">
                    Go To
                    <br /> Saved SPLITS
                  </span>
                  <div className="mt-3 border border-white group-hover:border-black duration-500 rounded-full"></div>
                </Link>
                <Link
                  to={"protected/view/shared"}
                  className="bg-black w-[205px] p-4 rounded-xl h-[200px] text-white group hover:text-black hover:bg-white border-2 border-black hover:scale-110 duration-500 hover:shadow-lg"
                >
                  <span className=" font-semibold text-2xl ">
                    Go To
                    <br /> Shared SPLITS
                  </span>
                  <div className="mt-3 border border-white group-hover:border-black duration-500 rounded-full"></div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

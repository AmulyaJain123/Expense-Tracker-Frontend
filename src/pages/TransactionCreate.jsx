import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import LoginRequired from "../components/authComponents/LoginRequired";
import right from "../assets/right.png";
import InOut from "../components/transactionCreateComponents/InOut";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const typeArr = ["outgoing", "incoming"];

export default function TransactionCreate() {
  const data = useLoaderData();
  const [type, setType] = useState(0);
  const userDetails = useSelector((state) => state.universal.userInfo);

  return (
    <>
      <Helmet>
        <title>Create Transaction | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full flex-grow whiteScr  overflow-auto sm:px-16 pt-8 pb-[200px] text-stone-700 rounded-l-xl">
        <div className="flex flex-grow mx-auto max-w-[1200px]">
          {userDetails ? (
            <div className="flex flex-grow flex-col">
              <div className="flex flex-col text-center sm:text-start xl:flex-row space-y-6 xl:space-y-0 justify-between bg-white rounded-xl m-4 mx-0 items-center flex-grow p-3">
                <div className="text-xl sm:text-2xl 2xl:text-3xl font-bold xl:ml-4">
                  <span>Create</span>{" "}
                  <span className="mx-[10px] rounded-xl capitalize bg-purple-500 px-4 pb-1 text-white">
                    {typeArr[type]}
                  </span>{" "}
                  <span>Transaction</span>
                </div>
                <div className="flex space-x-3 pr-4 text-sm xl:text-base items-center">
                  <button
                    onClick={() => setType((p) => (p + 1) % 2)}
                    className="hover:scale-110 duration-500"
                  >
                    <img
                      src={right}
                      className="w-[20px] rotate-180 h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                  <div className="py-1 px-3 capitalize rounded-lg bg-slate-200 font-medium">
                    {typeArr[type]}
                  </div>
                  <button
                    onClick={() => setType((p) => (p + 1) % 2)}
                    className="hover:scale-110 duration-500"
                  >
                    <img
                      src={right}
                      className="w-[20px]  h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="mt-[10px] flex flex-col flex-grow items-center">
                <InOut data={data} type={type} />
              </div>
            </div>
          ) : (
            <LoginRequired />
          )}
        </div>
      </div>
    </>
  );
}

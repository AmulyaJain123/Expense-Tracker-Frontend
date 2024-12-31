import { useSelector } from "react-redux";
import CreateSplitStage from "../components/splitCreateComponents/CreateSplitStage";
import AddBillStage from "../components/splitCreateComponents/AddBillStage";
import SplitResultStage from "../components/splitCreateComponents/SplitResultStage";
import LoginRequired from "../components/authComponents/LoginRequired";
import { useState } from "react";
import TopButtons from "../components/splitCreateComponents/TopButtons";
import BottomButtons from "../components/splitCreateComponents/BottomButtons";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../store/main";
import { Helmet } from "react-helmet-async";

export default function SplitCreate() {
  const stage = useSelector((state) => state.splitCreate.stage);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.universal.userInfo);

  return (
    <>
      <Helmet>
        <title> Create SPLIT | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full  bg-white whiteScr overflow-auto pb-[80px] rounded-l-xl">
        {userDetails ? (
          <>
            <span id="Top"></span>
            <div className="flex space-x-4 justify-center items-center mt-12">
              <div
                style={{
                  backgroundColor: stage === 0 ? "#9d4edd" : "",
                  border: stage === 0 ? "2px solid #9d4edd" : "2px solid black",
                }}
                className=" w-[10px] h-[10px] rounded-full"
              ></div>
              <div
                style={{
                  backgroundColor: stage === 1 ? "#9d4edd" : "",
                  border: stage === 1 ? "2px solid #9d4edd" : "2px solid black",
                }}
                className="border-2 border-black w-[10px] h-[10px] rounded-full"
              ></div>
              <div
                style={{
                  backgroundColor: stage === 2 ? "#9d4edd" : "",
                  border: stage === 2 ? "2px solid #9d4edd" : "2px solid black",
                }}
                className="border-2 border-black w-[10px] h-[10px] rounded-full"
              ></div>
            </div>
            <div className="pt-12 flex flex-col flex-grow">
              <div className="flex flex-grow px-16">
                <TopButtons num={stage} />
              </div>
              <div>
                {stage === 0 ? <CreateSplitStage /> : null}
                {stage === 1 ? <AddBillStage /> : null}
                {stage === 2 ? <SplitResultStage /> : null}
              </div>
              <div className="flex flex-grow mt-12 px-16">
                <BottomButtons num={stage} />
              </div>
            </div>
          </>
        ) : (
          <LoginRequired />
        )}
      </div>
    </>
  );
}

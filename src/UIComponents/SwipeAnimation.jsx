import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import activity from "../assets/gallery/activity.png";
import bargraph from "../assets/gallery/bargraph.png";
import categories from "../assets/gallery/categories.png";
import filter from "../assets/gallery/filter.png";
import friends from "../assets/gallery/friends.png";
import piechart from "../assets/gallery/piechart.png";
import profile from "../assets/gallery/profile.png";
import scatterplot from "../assets/gallery/scatterplot.png";
import splitModal from "../assets/gallery/splitModal.png";
import splitRes from "../assets/gallery/splitRes.png";
import splitResult from "../assets/gallery/splitResult.png";
import splitView from "../assets/gallery/splitView.png";
import tag from "../assets/gallery/tag.png";
import tags from "../assets/gallery/tags.png";
import trackCreate from "../assets/gallery/trackCreate.png";
import transaction from "../assets/gallery/transaction.png";
import transactions from "../assets/gallery/transactions.png";
import warranty from "../assets/gallery/warranty.png";
import warrantyView from "../assets/gallery/warrantyView.png";
import bills from "../assets/gallery/bills.png";

const config = [
  { image: activity, name: "Activity | Profile", width: 700 },
  { image: bargraph, name: "Expense Pattern | Track > Dashboard", width: 700 },
  {
    image: categories,
    name: "Manage Categories | Track > Categories",
    width: 700,
  },
  { image: filter, name: "Filter | Track > Transactions", width: 700 },
  { image: friends, name: "Find People | Friends", width: 700 },
  {
    image: piechart,
    name: "Categorical Distribution | Track > Dashboard",
    width: 700,
  },
  { image: profile, name: "Profile", width: 700 },
  {
    image: scatterplot,
    name: "Expense Distribution | Track > Dashboard",
    width: 700,
  },
  { image: splitModal, name: "Adding Bills | Split > Create", width: 700 },
  { image: splitRes, name: "Split Result | Split > Create", width: 700 },
  {
    image: splitResult,
    name: "Split Result | Split > View > Shared",
    width: 700,
  },
  { image: splitView, name: "Saved Splits | Split > View > Saved", width: 700 },
  {
    image: tag,
    name: "Create Warranty | Vault > Create > Warranty",
    width: 700,
  },
  { image: tags, name: "Manage Tags | Vault > Tags", width: 700 },
  {
    image: trackCreate,
    name: "Create Transaction | Track > Create",
    width: 700,
  },
  {
    image: transaction,
    name: "Transaction Details | Track > Transactions > View",
    width: 700,
  },
  {
    image: transactions,
    name: "Transaction History | Track > Transactions",
    width: 700,
  },
  {
    image: warranty,
    name: "Create Warranty | Vault > Create > Warranty",
    width: 700,
  },
  {
    image: warrantyView,
    name: "Saved Warranties | Vault > View > Warranty",
    width: 700,
  },
  { image: bills, name: "Adding Bills | Split > Create", width: 700 },
];

export default function SwipeAnimation() {
  const [ind, setInd] = useState(0);
  const [test, setTest] = useState(0);

  useEffect(() => {
    const temp = setInterval(() => {
      setInd((ind) => {
        return (ind + 1) % config.length;
      });
    }, [4000]);

    return () => {
      clearInterval(temp);
    };
  }, []);
  return (
    <div className="my-24 mt-4 pb-[80px] rounded-xl mx-auto w-full">
      <div className=" relative p-4   w-full flex flex-col justify-center items-center">
        <div className="h-[600px] flex justify-center items-center">
          <motion.img
            src={config[ind].image}
            style={{
              height: "500px",
            }}
            key={ind}
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-fit shadow-lg border-2 border-stone-200 rounded-2xl"
            alt=""
          />
        </div>
        <span className="absolute bottom-[-10px] right-[50%] translate-x-[50%] text-xl font-bold">
          {config[ind].name}
        </span>
        <div className="absolute bottom-[-40px] flex space-x-4 right-[50%] translate-x-[50%]">
          {new Array(config.length).fill(0).map((i, index) => {
            return (
              <div
                style={{ backgroundColor: index === ind ? "black" : "" }}
                className="w-[10px] h-[10px] rounded-full duration-700 border-2 border-black"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

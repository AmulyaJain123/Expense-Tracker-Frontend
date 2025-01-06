import { useState, useEffect } from "react";
import activity from "../assets/gallery/activity.webp";
import bargraph from "../assets/gallery/bargraph.webp";
import categories from "../assets/gallery/categories.webp";
import filter from "../assets/gallery/filter.webp";
import friends from "../assets/gallery/friends.webp";
import piechart from "../assets/gallery/piechart.webp";
import profile from "../assets/gallery/profile.webp";
import scatterplot from "../assets/gallery/scatterplot.webp";
import splitModal from "../assets/gallery/splitModal.webp";
import splitRes from "../assets/gallery/splitRes.webp";
import splitResult from "../assets/gallery/splitResult.webp";
import splitView from "../assets/gallery/splitView.webp";
import tag from "../assets/gallery/tag.webp";
import tags from "../assets/gallery/tags.webp";
import trackCreate from "../assets/gallery/trackCreate.webp";
import transaction from "../assets/gallery/transaction.webp";
import transactions from "../assets/gallery/transactions.webp";
import warranty from "../assets/gallery/warranty.webp";
import warrantyView from "../assets/gallery/warrantyView.webp";
import bills from "../assets/gallery/bills.webp";

const config = [
  {
    image: transaction,
    name: "Transaction Details | TRACK > Transactions > View",
    width: 700,
  },
  {
    image: transactions,
    name: "Transaction History | TRACK > Transactions",
    width: 700,
  },
  { image: activity, name: "Activity | Profile", width: 700 },
  { image: bargraph, name: "Expense Pattern | TRACK > Dashboard", width: 700 },
  {
    image: categories,
    name: "Manage Categories | TRACK > Categories",
    width: 700,
  },
  { image: filter, name: "Filter | TRACK > Transactions", width: 700 },
  { image: friends, name: "Find People | Friends", width: 700 },
  {
    image: piechart,
    name: "Categorical Distribution | TRACK > Dashboard",
    width: 700,
  },
  { image: profile, name: "Profile", width: 700 },
  {
    image: scatterplot,
    name: "Expense Distribution | TRACK > Dashboard",
    width: 700,
  },
  { image: splitModal, name: "Adding Bills | SPLIT > Create", width: 700 },
  { image: splitRes, name: "SPLIT Result | SPLIT > Create", width: 700 },
  {
    image: splitResult,
    name: "SPLIT Result | SPLIT > View > Shared",
    width: 700,
  },
  { image: splitView, name: "Saved SPLITS | SPLIT > View > Saved", width: 700 },
  {
    image: tag,
    name: "Create Warranty | VAULT > Create > Warranty",
    width: 700,
  },
  { image: tags, name: "Manage Tags | VAULT > Tags", width: 700 },
  {
    image: trackCreate,
    name: "Create Transaction | TRACK > Create",
    width: 700,
  },

  {
    image: warranty,
    name: "Create Warranty | VAULT > Create > Warranty",
    width: 700,
  },
  {
    image: warrantyView,
    name: "Saved Warranties | VAULT > View > Warranty",
    width: 700,
  },
  { image: bills, name: "Adding Bills | SPLIT > Create", width: 700 },
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
    <div className="my-20 mb-10 mt-2 pb-[80px] rounded-lg mx-auto w-full">
      <div className=" relative p-4   w-full flex flex-col justify-center items-center">
        <div className="h-[450px] w-[800px] relative flex justify-center items-center">
          {config.map((i, index) => {
            return (
              <img
                src={i.image}
                style={{ opacity: ind === index ? "1" : "0" }}
                className="absolute max-w-[800px] rounded-xl duration-700 border-2 border-stone-200 max-h-[400px] right-[50%] translate-x-[50%] top-[50%] translate-y-[-50%]"
                alt=""
              />
            );
          })}
        </div>
        <span className="absolute bottom-[-5px] right-[50%] translate-x-[50%] text-base font-bold">
          {config[ind].name}
        </span>
        <div className="absolute bottom-[-25px] flex space-x-3 right-[50%] translate-x-[50%]">
          {new Array(config.length).fill(0).map((i, index) => {
            return (
              <div
                style={{ backgroundColor: index === ind ? "black" : "" }}
                className="w-[7px] h-[7px] rounded-full duration-700 border border-black"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

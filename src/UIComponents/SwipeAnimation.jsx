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
import docView from "../assets/gallery/docView.webp";
import bills from "../assets/gallery/bills.webp";
import chat from "../assets/gallery/chat.webp";
import notification from "../assets/gallery/notification.webp";
import tagDis from "../assets/gallery/tagDis.webp";

import pauseIcon from "../assets/extras/pause.png";
import playIcon from "../assets/extras/play.png";

const config = [
  {
    image: transaction,
    name: "Transaction Details | TRACK > Transactions > View",
    width: 700,
  },
  { image: notification, name: "Notifications", width: 700 },

  {
    image: transactions,
    name: "Transaction History | TRACK > Transactions",
    width: 700,
  },
  { image: activity, name: "Activity | Profile", width: 700 },
  { image: chat, name: "Messages", width: 700 },

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
  { image: tagDis, name: "Tag Distribution | TRACK > Dashboard", width: 700 },

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
    image: docView,
    name: "Saved Docs | VAULT > View > Doc",
    width: 700,
  },
  { image: bills, name: "Adding Bills | SPLIT > Create", width: 700 },
];

let temp;

export default function SwipeAnimation() {
  const [ind, setInd] = useState(0);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    if (play) {
      temp = setInterval(() => {
        setInd((ind) => {
          return (ind + 1) % config.length;
        });
      }, [4000]);
    } else {
      clearInterval(temp);
    }

    return () => {
      clearInterval(temp);
    };
  }, [play]);

  function imageSelect(index) {
    setInd(index);
    setPlay(false);
  }

  return (
    <div className="mob:mb-6 tab:mb-8 lap:mb-10 mt-2 mob:pb-[45px] tab:pb-[60px] lap:pb-[80px] rounded-lg mx-auto w-full">
      <div className=" relative p-4   w-full flex flex-col justify-center items-center">
        <div className="mob:h-[350px] tab:h-[400px] lap:h-[450px] mob:w-[600px] tab:w-[700px] lap:w-[800px] relative flex justify-center items-center">
          {config.map((i, index) => {
            return (
              <img
                src={i.image}
                style={{ opacity: ind === index ? "1" : "0" }}
                className="absolute mob:max-w-[600px] tab:max-w-[700px] lap:max-w-[800px] rounded-xl duration-700 border-2 border-stone-200 mob:max-h-[300px] tab:max-h-[350px] lap:max-h-[400px] right-[50%] translate-x-[50%] top-[50%] translate-y-[-50%]"
                alt=""
              />
            );
          })}
        </div>
        <span className="absolute mob:bottom-[5px] tab:bottom-[5px] lap:bottom-[-5px text-nowrap right-[50%] translate-x-[50%] mob:text-sm tab:text-base font-bold">
          {config[ind].name}
        </span>
        <button
          onClick={() => setPlay((p) => !p)}
          className="absolute p-[6px] rounded-md hover:bg-slate-200 duration-700 mob:bottom-[-37px] tab:bottom-[-40px] lap:bottom-[-50px] right-[50%] translate-y-[100%] translate-x-[50%]"
        >
          <img
            src={play ? pauseIcon : playIcon}
            className="w-[14px] h-[14px] tab:w-[16px] tab:h-[16px]"
            alt=""
          />
        </button>
        <div className="absolute mob:bottom-[-22px] tab:bottom-[-25px] lap:bottom-[-35px] flex mob:space-x-[10px] tab:space-x-3 right-[50%] translate-x-[50%]">
          {new Array(config.length).fill(0).map((i, index) => {
            return (
              <button
                onClick={() => imageSelect(index)}
                style={{ backgroundColor: index === ind ? "black" : "" }}
                className="w-[6px] h-[6px] hover:bg-[#dc93f6] tab:w-[7px] tab:h-[7px] rounded-full duration-700 border border-black"
              ></button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

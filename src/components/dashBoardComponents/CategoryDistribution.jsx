import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PieCharts from "./PieCharts";
import { useLoaderData } from "react-router-dom";
import Pallate from "./Pallate";
import right from "../../assets/right.png";

export default function CategoryDistribution() {
  const { categories } = useLoaderData();
  const data = useSelector((state) => state.dashboard.data);
  const [val, setVal] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data != null) {
      const expenseObj = [
        { label: "Outgoing", value: 0 },
        { label: "Incoming", value: 0 },
      ];
      for (let i of data) {
        if (i.transactionType === "outgoing") {
          expenseObj[0].value += i.transactionAmount;
        } else {
          expenseObj[1].value += i.transactionAmount;
        }
      }
      const outgoingObj = categories.outgoing.map((i) => ({
        label: i.name,
        value: 0,
      }));
      outgoingObj.push({ label: "null", value: 0 });

      console.log(outgoingObj);

      for (let i of data) {
        if (i.transactionType === "outgoing" && i.category.length === 3) {
          outgoingObj.find((j) => j.label === i.category[1]).value +=
            i.transactionAmount;
        } else if (i.transactionType === "outgoing") {
          outgoingObj.find((j) => j.label === "null").value +=
            i.transactionAmount;
        }
      }

      const incomingObj = categories.incoming.map((i) => ({
        label: i.name,
        value: 0,
      }));
      incomingObj.push({ label: "null", value: 0 });

      console.log(incomingObj);

      for (let i of data) {
        if (i.transactionType === "incoming" && i.category.length === 3) {
          incomingObj.find((j) => j.label === i.category[1]).value +=
            i.transactionAmount;
        } else if (i.transactionType === "incoming") {
          incomingObj.find((j) => j.label === "null").value +=
            i.transactionAmount;
        }
      }

      const fullOutgoing = [];
      for (let i of categories.outgoing) {
        const name = i.name;
        const arr = i.categories.map((j) => ({ label: j, value: 0 }));
        for (let j of data) {
          if (
            j.transactionType === "outgoing" &&
            j.category.length === 3 &&
            j.category[1] === name
          ) {
            arr.find((k) => k.label === j.category[2]).value +=
              j.transactionAmount;
          }
        }
        fullOutgoing.push(arr);
      }
      const fullIncoming = [];
      for (let i of categories.incoming) {
        const name = i.name;
        const arr = i.categories.map((j) => ({ label: j, value: 0 }));
        for (let j of data) {
          if (
            j.transactionType === "incoming" &&
            j.category.length === 3 &&
            j.category[1] === name
          ) {
            arr.find((k) => k.label === j.category[2]).value +=
              j.transactionAmount;
          }
        }
        fullIncoming.push(arr);
      }
      setVal({
        pc1: expenseObj,
        pc2: outgoingObj,
        pc3: incomingObj,
        fullIncoming,
        fullOutgoing,
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-grow flex-col mx-4 space-y-4">
        <div className="flex flex-col space-y-4 flex-grow rounded-xl p-4 bg-[#f7ebfd]">
          <header className="flex p-2 px-4 pr-2 h-fit justify-center rounded-xl bg-[#9f21e3] text-white">
            <span className="text-2xl font-semibold ">
              Categorical Distribution
            </span>
          </header>
          <div className="flex flex-grow py-4 pb-0">
            {val != null ? <PieCharts data={val} /> : null}
          </div>
          <div className="flex flex-col  flex-grow">
            {open ? <Pallate /> : null}
            <div className="flex flex-grow flex-col items-center">
              <span className="uppercase text-lg font-medium mb-1">
                {open ? "close legend" : "Open Legend"}
              </span>
              <button
                onClick={() => setOpen((p) => !p)}
                className=" duration-500 hover:scale-110"
              >
                <img
                  src={right}
                  style={{
                    transform: !open ? "rotate(90deg)" : "rotate(-90deg)",
                  }}
                  className="w-[25px] h-[25px] "
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

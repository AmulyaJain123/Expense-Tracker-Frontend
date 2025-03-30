import Filter from "../components/transactionPageComponents/Filter";
import TransactionRows from "../components/dashBoardComponents/TransactionRows";
import { useLoaderData } from "react-router-dom";
import DataDisplay from "../components/transactionPageComponents/DataDisplay";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { transactionActions } from "../store/main";
import { useEffect } from "react";
import { Button } from "../UIComponents/NextButton";
import { Link } from "react-router-dom";
import responsive from "../assets/responsive-website.png";
import prohibition from "../assets/prohibition.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NiceButton from "../UIComponents/NiceButton";

export default function TransactionPage() {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const filteredData = useSelector((state) => state.transactions.filteredData);
  const filters = useSelector((state) => state.transactions.filtersAdded);
  const navigate = useNavigate();
  // console.log(data);
  useEffect(() => {
    if (filters.length != 0) {
      let arr = JSON.parse(JSON.stringify(data.transactions));
      for (let i of filters) {
        // console.log(i);
        const { name, options } = i;
        arr = JSON.parse(JSON.stringify(filterarr(arr, name, options)));
      }
      // console.log(data);
      // console.log("Filtered", arr);
      dispatch(
        transactionActions.setFilteredData(JSON.parse(JSON.stringify(arr)))
      );
    } else {
      dispatch(transactionActions.clearFilteredData());
    }
  }, [filters]);

  useEffect(() => {
    dispatch(transactionActions.clearFilter());
    dispatch(transactionActions.clearFilteredData());
  }, []);

  function getName(i, name) {
    if (name === "Category") {
      return i.category;
    }
    if (name === "Tags") {
      return i.tags;
    }
    if (name === "Date") {
      return new Date(i.dateTime);
    }
    if (name === "From") {
      return i.from;
    }
    if (name === "To") {
      return i.to;
    }
    if (name === "Description") {
      return i.desc;
    }
    if (name === "Amount") {
      return i.transactionAmount;
    }
    if (name === "Name") {
      return i.transactionName;
    }
    if (name === "Type") {
      return i.transactionType;
    }
  }

  function filterarr(arr, name, options) {
    // console.log(arr, name, options);
    const newArr = [];
    for (let i of arr) {
      let bool = false;
      //   // console.log(i, i[name]);
      for (let j of options) {
        const val = getVal(name, j);
        // console.log("val", val);
        const arrVal = getName(i, name);
        // console.log("arrVal", i, arrVal);
        const compareRes = compareVal(name, val, arrVal);
        if (compareRes) {
          bool = true;
          break;
        }
      }
      if (bool) {
        newArr.push(i);
      }
    }
    return newArr;
  }

  function compareVal(name, val, arrVal) {
    if (name === "Amount") {
      const [relation, value] = val;
      // console.log("comparison", relation, value, arrVal);
      if (relation === "==") {
        return value === arrVal;
      }
      if (relation === "<") {
        return value > arrVal;
      }
      if (relation === ">") {
        // console.log(value > arrVal);
        return value < arrVal;
      }
      if (relation === ">=") {
        return value <= arrVal;
      }
      if (relation === "<=") {
        return value >= arrVal;
      }
      // console.log("wekwfuef");
    }
    if (
      name != "Date" &&
      name != "Category" &&
      name != "Type" &&
      name != "Tags"
    ) {
      return arrVal.toLowerCase().includes(val.toLowerCase());
    } else if (name === "Category") {
      return (
        (val.length === 3 &&
          val[0] === arrVal[0] &&
          val[1] === arrVal[1] &&
          val[2] === arrVal[2]) ||
        (val.length === 2 && val[0] === arrVal[0] && val[1] === arrVal[1])
      );
    } else if (name === "Tags") {
      console.log(val, arrVal);
      return arrVal.some((i) => i === val);
    } else if (name === "Type") {
      return val === arrVal;
    } else {
      return (
        (arrVal < val[1] && arrVal > val[0]) ||
        (arrVal.getFullYear() === val[0].getFullYear() &&
          arrVal.getMonth() === val[0].getMonth() &&
          arrVal.getDate() === val[0].getDate()) ||
        (arrVal.getFullYear() === val[1].getFullYear() &&
          arrVal.getMonth() === val[1].getMonth() &&
          arrVal.getDate() === val[1].getDate())
      );
    }
  }

  function getVal(name, option) {
    if (
      name === "Name" ||
      name === "To" ||
      name === "From" ||
      name === "Category" ||
      name === "Type" ||
      name === "Description" ||
      name === "Tags"
    ) {
      return option;
    }
    if (name === "Amount") {
      // console.log("option", option);
      const val = parseFloat(option.split(" ")[1]);
      const relation = option.split(" ")[0];
      // console.log(val, relation);
      return [relation, val];
    }
    if (name === "Date") {
      const date1 = option.split(" ")[1];
      const date2 = option.split(" ")[4];
      const d1 = new Date();
      d1.setDate(parseInt(date1.split("/")[0]));
      d1.setMonth(parseInt(date1.split("/")[1]) - 1);
      d1.setFullYear(parseInt(date1.split("/")[2]));
      d1.setHours(0, 0, 0, 0);
      const d2 = new Date();
      d2.setDate(parseInt(date2.split("/")[0]));
      d2.setMonth(parseInt(date2.split("/")[1]) - 1);
      d2.setFullYear(parseInt(date2.split("/")[2]));
      d2.setHours(23, 59, 59, 0);
      return [d1, d2];
    }
  }

  function clearAll() {
    dispatch(transactionActions.clearFilter());
    dispatch(transactionActions.clearFilteredData());
  }

  return (
    <>
      <Helmet>
        <title>Transactions | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[150px] text-stone-700 rounded-l-xl">
        <div className="bg-[#f7ebfd]  rounded-xl  pb-[40px] m-2 sm:m-3 mt-[16px] sm:mt-[20px] p-2 sm:p-3">
          <div className="relative flex flex-col overflow-hidden  h-fit ">
            <Filter />

            <div className="flex flex-col">
              <div className=" flex justify-center sm:justify-between mb-3 sm:mb-4 lap:mb-12 z-20 rounded-lg  p-[6px] sm:p-[10px] px-4 sm:px-6 pr-3 sm:pr-4 bg-[#9f21e3] ">
                <span className="text-[20px]  sm:text-[22px] text-white font-semibold">
                  Transaction History
                </span>
                {filters.length != 0 ? (
                  <div className="flex space-x-3 items-center text-xs">
                    <span className="rounded-md p-[6px] px-2 bg-white text-[#9f21e3] flex items-center font-semibold">
                      Filters Applied !!
                    </span>
                    <button
                      onClick={clearAll}
                      className="rounded-md p-[6px] hover:scale-110 duration-500 px-2 bg-white text-[#9f21e3]  font-semibold"
                    >
                      Clear All
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="relative p-2 sm:p-4 px-3 sm:px-6 rounded-t-sm  space-y-2 rounded-b-xl bg-[#f7ebfd] flex-grow">
                {filteredData === null ? (
                  <DataDisplay
                    data={JSON.parse(JSON.stringify(data.transactions))}
                  />
                ) : (
                  <DataDisplay
                    data={JSON.parse(JSON.stringify(filteredData))}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col smMob:flex-row gap-y-2 text-center mt-12 sm:mt-6 tab:mt-8 px-8 sm:px-12 tab:px-16 justify-between">
          <button onClick={() => navigate("/track/protected/dashboard")}>
            <NiceButton text={"Back to Dashboard"}></NiceButton>
          </button>

          <button onClick={() => navigate("/track")}>
            <NiceButton text={"Back to TRACK"}></NiceButton>
          </button>
        </div>
      </div>
    </>
  );
}

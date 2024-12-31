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
import { Helmet } from "react-helmet-async";

export default function TransactionPage() {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const filteredData = useSelector((state) => state.transactions.filteredData);
  const filters = useSelector((state) => state.transactions.filtersAdded);
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
    if (name === "Date") {
      return new Date(i.dateTime);
    }
    if (name === "From") {
      return i.from;
    }
    if (name === "To") {
      return i.to;
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
    if (name != "Date" && name != "Category" && name != "Type") {
      return arrVal.toLowerCase().includes(val.toLowerCase());
    } else if (name === "Category") {
      return (
        (val.length === 3 &&
          val[0] === arrVal[0] &&
          val[1] === arrVal[1] &&
          val[2] === arrVal[2]) ||
        (val.length === 2 && val[0] === arrVal[0] && val[1] === arrVal[1])
      );
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
      name === "Type"
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
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <div className="bg-[#f7ebfd] hidden 2xl:block rounded-xl  pb-[40px] m-4 mt-[30px] p-4">
          <div className="relative flex flex-col overflow-hidden  h-fit ">
            <Filter />

            <div className="flex flex-col">
              <div className=" flex justify-between mb-16 z-20 rounded-xl  p-4 px-8 bg-[#9f21e3] ">
                <span className="text-3xl text-white font-semibold">
                  Transaction History
                </span>
                {filters.length != 0 ? (
                  <div className="flex space-x-4">
                    <span className="rounded-lg p-1 px-3 bg-white text-[#9f21e3] flex items-center font-semibold">
                      Filters Applied !!
                    </span>
                    <button
                      onClick={clearAll}
                      className="rounded-lg p-1 hover:scale-110 duration-500 px-3 bg-white text-[#9f21e3]  font-semibold"
                    >
                      Clear All
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="p-4 px-8 rounded-t-sm space-y-2 rounded-b-xl bg-[#f7ebfd] flex-grow">
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
        <div className="hidden 2xl:flex justify-between">
          <Link to="/track/protected/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>

          <Link to="/track">
            <Button>Back to TRACK</Button>
          </Link>
        </div>

        <div className="flex flex-col mt-[200px] items-center 2xl:hidden">
          <div className="relative">
            <img className="w-[200px] opacity-75" src={responsive} alt="" />
            <img
              src={prohibition}
              className="absolute top-[50%] right-[50%] translate-x-[50%] opacity-85 translate-y-[-50%] w-[130px]"
              alt=""
            />
          </div>
          <p className="mx-auto px-16 mt-8 text-center text-sm sm:text-base">
            Please switch to a screen size bigger than 1500px
          </p>
        </div>
      </div>
    </>
  );
}

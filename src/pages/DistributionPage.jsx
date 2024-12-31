import { useLoaderData } from "react-router-dom";
import DateSelector from "../components/distributionPageComponents/DateSelector";
import DurationPreview from "../components/distributionPageComponents/DurationPreview";
import { useDispatch } from "react-redux";
import { distributionActions } from "../store/main";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getData } from "../util/distribution";
import PieChart1 from "../components/distributionPageComponents/PieChart1";
import Heirarchy from "../components/distributionPageComponents/Heirarchy";
import PieChart2 from "../components/distributionPageComponents/PieChart2";
import PieChart3 from "../components/distributionPageComponents/PieChart3";
import { Link } from "react-router-dom";
import { Button } from "../UIComponents/NextButton";
import responsive from "../assets/responsive-website.png";
import prohibition from "../assets/prohibition.png";

export default function DistributionPage() {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const filteredData = useSelector((state) => state.distribution.filteredData);
  const durations = useSelector((state) => state.distribution.durations);
  // console.log(data);
  // console.log(data);

  useEffect(() => {
    // console.log("duration", durations);
    if (durations.length != 0) {
      let arr = JSON.parse(JSON.stringify(data));
      arr = JSON.parse(JSON.stringify(filterarr(arr, "Date", durations)));
      // console.log(data);
      // console.log("Filtered", arr);
      const newData = getData(JSON.parse(JSON.stringify(arr)));
      dispatch(
        distributionActions.setFilteredData(JSON.parse(JSON.stringify(newData)))
      );
    } else {
      dispatch(distributionActions.clearFilteredData());
    }
  }, [durations]);

  useEffect(() => {
    const date2 = new Date();
    date2.setHours(23, 59, 59, 0);
    const date1 = new Date();
    date1.setHours(0, 0, 0, 0);
    date1.setMonth(0);
    date1.setDate(1);
    dispatch(
      distributionActions.resetDuration({
        first: date1.toString(),
        second: date2.toString(),
      })
    );
    dispatch(distributionActions.clearFilteredData());
  }, []);

  function getName(i, name) {
    if (name === "Date") {
      return new Date(i.dateTime);
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
        const arrVal = getName(i, name);
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

  function getVal(name, option) {
    if (name === "Date") {
      const date1 = new Date(option.first);
      date1.setHours(0, 0, 0, 0);
      const date2 = new Date(option.second);
      date2.setHours(0, 0, 0, 0);
      return [date1, date2];
    }
  }

  // console.log(filteredData);

  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
      <div className="hidden 2xl:flex flex-col space-y-4 m-4">
        <div className="flex flex-grow font-semibold uppercase text-white bg-[#9f21e3] rounded-xl text-3xl p-4 px-8 justify-center ">
          Distributions
        </div>
        <div className="flex flex-col flex-grow space-y-6 p-4 bg-[#f7ebfd] rounded-xl">
          <div className="flex bg-[#9f21e3] rounded-xl text-white text-2xl p-2 justify-center pl-4 font-semibold">
            Select Time Duration
          </div>
          <div className="flex flex-grow space-x-6 px-8 p-4">
            <DateSelector />
            <DurationPreview />
          </div>
        </div>
        <div className="flex flex-grow  space-x-4 ">
          <div className="flex flex-1 flex-col bg-[#f7ebfd] p-4 rounded-xl">
            <div className="flex flex-grow text-stone-600 font-semibold text-xl justify-center">
              Overall Financial Distribution
            </div>
            <div className="flex ">
              <PieChart1 />
            </div>
          </div>
          <div className="flex flex-1 flex-col px-6 bg-[#f7ebfd] p-4 rounded-xl">
            <div className="flex mb-12 text-xl font-semibold text-stone-600 justify-center">
              Category Heirarchy
            </div>
            <div className="flex flex-grow">
              <Heirarchy />
            </div>
          </div>
        </div>

        <div className="flex flex-grow  space-x-4 ">
          <div className="flex flex-1 flex-col bg-[#f7ebfd] p-4 rounded-xl">
            <div className="flex flex-grow text-stone-600 font-semibold text-xl justify-center">
              Outgoing Distribution
            </div>
            <div className="flex ">
              <PieChart2 />
            </div>
          </div>
          <div className="flex flex-1 flex-col bg-[#f7ebfd] p-4 rounded-xl">
            <div className="flex text-stone-600 font-semibold text-xl justify-center">
              Incoming Distribution
            </div>
            <div className="flex ">
              <PieChart3 />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/track/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
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
  );
}

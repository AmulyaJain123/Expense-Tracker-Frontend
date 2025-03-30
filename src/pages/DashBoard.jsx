import { Link } from "react-router-dom";
import Transactions from "../components/dashBoardComponents/Transactions";
import WidgetSquare from "../components/dashBoardComponents/WidgetSquare";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboardActions } from "../store/main";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import responsive from "../assets/responsive-website.png";
import prohibition from "../assets/prohibition.png";
import {
  differenceInCalendarDays,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
} from "date-fns";
import ExpensePattern from "../components/dashBoardComponents/ExpensePattern";
import CategoryDistribution from "../components/dashBoardComponents/CategoryDistribution";
import ScatterGraph from "../components/dashBoardComponents/ScatterGraph";
import CategoricalHeirarchy from "../components/dashBoardComponents/CategoricalHeirarchy";
import { Helmet } from "react-helmet-async";
import TagDistribution from "../components/dashBoardComponents/TagDistribution";

export default function DashBoard() {
  const loadedData = useLoaderData();
  const [count, setCount] = useState("4");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);

  function selectChange(event) {
    setCount(event.target.value);
  }
  // console.log(loadedData);
  useEffect(() => {
    if (count === "1" || count === "7" || count === "30") {
      const ans = [];
      const duration = parseInt(count);
      const today = new Date();
      for (let i of loadedData.transactions) {
        const date = new Date(i.dateTime);
        console.log(duration, differenceInCalendarDays(today, date));
        if (duration === 1 && differenceInCalendarDays(today, date) === 0) {
          ans.push(i);
        } else if (
          duration === 7 &&
          differenceInCalendarDays(today, date) < 7
        ) {
          ans.push(i);
        } else if (
          duration === 30 &&
          differenceInCalendarDays(today, date) < 30
        ) {
          ans.push(i);
        }
      }
      dispatch(dashboardActions.setData(ans));
    } else if (count === "2") {
      const ans = [];
      const today = new Date();
      for (let i of loadedData.transactions) {
        const date = new Date(i.dateTime);
        if (isSameISOWeek(today, date)) {
          ans.push(i);
        }
      }
      dispatch(dashboardActions.setData(ans));
    } else if (count === "3") {
      const ans = [];
      const today = new Date();
      for (let i of loadedData.transactions) {
        const date = new Date(i.dateTime);
        if (isSameMonth(today, date)) {
          ans.push(i);
        }
      }
      dispatch(dashboardActions.setData(ans));
    } else if (count === "4") {
      const ans = [];
      const today = new Date();
      for (let i of loadedData.transactions) {
        const date = new Date(i.dateTime);
        if (isSameYear(today, date)) {
          ans.push(i);
        }
      }
      dispatch(dashboardActions.setData(ans));
    } else if (count === "5") {
      dispatch(dashboardActions.setData(loadedData.transactions));
    }
  }, [count]);
  // console.log(data);

  return (
    <>
      <Helmet>
        <title> Dashboard | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[150px]  text-stone-700 rounded-l-xl">
        <div className=" flex max-w-[1100px] mx-auto flex-col space-y-3">
          <div className="flex mx-3 relative mt-3 p-2 px-4 justify-center items-center uppercase text-[27px] font-bold rounded-xl bg-[#9f21e3] text-white">
            <span>Dashboard</span>
            <select
              value={count}
              onChange={(event) => selectChange(event)}
              className="bg-white absolute top-[50%] -translate-y-[50%] right-[15px] rounded-lg p-1 px-2 text-sm text-stone-500 font-normal"
              name=""
              id=""
            >
              <option value="1">Today</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="2">This Week</option>
              <option value="3">This Month</option>
              <option value="4">This Year</option>
              <option value="5">All Time</option>
            </select>
          </div>
          <div className="flex space-x-3 mx-3 mt-3">
            <WidgetSquare />
            <ExpensePattern />
          </div>
          <CategoryDistribution />
          <ScatterGraph />
          <div className="flex gap-x-3 mx-3 mt-3">
            <TagDistribution />
          </div>
          <Transactions />
          <CategoricalHeirarchy />
        </div>

        {/* <div className="flex flex-col mt-[200px] items-center 2xl:hidden">
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
        </div> */}
      </div>
    </>
  );
}

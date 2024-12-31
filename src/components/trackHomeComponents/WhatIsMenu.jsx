import styles from "./WhatIsMenu.module.css";

export default function WhatIsMenu() {
  return (
    <div className={`${styles.main}`}>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300  md:space-x-[50px] ">
        <div className="font-medium md:w-1/3">Purpose </div>
        <div className="mx-[10px] md:w-2/3">
          TRACK is designed to help you manage your Finances by keeping a
          detailed record of all your Transactions, both Incoming and Outgoing.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] mx-[100px]">
        <div className="font-medium  md:w-1/3">Expense Tracking </div>
        <div className="mx-[10px] md:w-2/3">
          Monitor and Record every Expense and Income, ensuring you have a clear
          view of your Financial Activities.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] mx-[100px]">
        <div className="font-medium  md:w-1/3">
          Organized Financial Management
        </div>
        <div className="mx-[10px] md:w-2/3">
          Simplifies managing your finances by Categorizing Transactions and
          providing tools to Filter and Sort them effectively.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] mx-[100px]">
        <div className="font-medium  md:w-1/3">Comprehensive Overview</div>
        <div className="mx-[10px] md:w-2/3">
          Comprehensive Overview: Provides an overall picture of your Financial
          status, including Expense Distribution, Trends and Categorical
          Distributions, aiding in better Financial Planning and
          decision-making.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] mx-[100px]">
        <div className="font-medium  md:w-1/3">Financial Analysis</div>
        <div className="mx-[10px] md:w-2/3">
          Helps you understand your Spending Habits and Income Patterns over
          time, offering Insights for improved Budgeting and Financial
          Management.
        </div>
      </div>
    </div>
  );
}

import styles from "./DashboardMenu.module.css";

export default function DashboardMenu() {
  return (
    <div className={`${styles.main}`}>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] ">
        <div className="font-medium text-lg md:w-1/3">Expense Summary </div>
        <div className="md:w-2/3">
          View a summary of your Financial Activities, including Totals for
          Incoming and Outgoing transactions.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] ">
        <div className="font-medium text-lg md:w-1/3">
          Expense Trend Analysis
        </div>
        <div className="md:w-2/3">
          Analyze the Trend of your Outgoing and Incoming Expenses over the
          months in a year using a{" "}
          <span className="font-medium text-green-500">Bar Graph</span>, helping
          you understand your Financial Patterns.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] ">
        <div className="font-medium text-lg md:w-1/3">
          Categorical Distribution
        </div>
        <div className="md:w-2/3">
          See a Brief Overview in form of{" "}
          <span className="font-medium text-green-500">Pie Charts</span> of your
          Expense Distribution across Categories .
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] ">
        <div className="font-medium text-lg md:w-1/3">
          {" "}
          Expense Distribution
        </div>
        <div className="md:w-2/3">
          See the Expense Distrbution of Incoming and Outgoing Expenses with
          respect to the amount and time along the years using a{" "}
          <span className="font-medium text-green-500">Scatter Plot</span>
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px] ">
        <div className="font-medium text-lg md:w-1/3">Recent Transactions</div>
        <div className="md:w-2/3">
          Quickly glance at your most recent Transactions.
        </div>
      </div>
    </div>
  );
}

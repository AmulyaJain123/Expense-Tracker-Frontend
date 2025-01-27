import ManageCategories from "../components/categoriesComponents/ManageCategories";
import ManageTags from "../components/tagComponents/ManageTags";
import RedButton from "../UIComponents/RedButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Categories() {
  return (
    <>
      <Helmet>
        <title>Manage Categories | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-r-xl lg:rounded-r-none rounded-l-xl">
        <div className="flex flex-col mx-auto max-w-[1200px]">
          <div className="flex my-6 tab:my-12 mb-0 mx-8 sm:mx-16">
            <Link to={"/track"}>
              <RedButton text={"Go Back To TRACK"} />
            </Link>
          </div>
          <div className="flex flex-col mt-6 tab:mt-8 items-center space-y-3 sm:space-y-4">
            <p className="p-[6px] px-2 sm:px-3 text-center bg-stone-100 mx-4 w-fit border-b-[1px] sm:border-b-[1.5px] text-[11px] sm:text-xs border-stone-600">
              On Deleting a Category, the Categories of all the Transactions
              having the same Category will be changed to NULL
            </p>
          </div>
          <ManageCategories />
        </div>
      </div>
    </>
  );
}

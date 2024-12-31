import ManageTags from "../components/tagComponents/ManageTags";
import RedButton from "../UIComponents/RedButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Tags() {
  return (
    <>
      <Helmet>
        <title> Manage Tags | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-r-xl lg:rounded-r-none rounded-l-xl">
        <div className="flex my-12 mx-16">
          <Link to={"/vault"}>
            <RedButton text={"Go Back To VAULT"} />
          </Link>
        </div>
        <ManageTags />
      </div>
    </>
  );
}

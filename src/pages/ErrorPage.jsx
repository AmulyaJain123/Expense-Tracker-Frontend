import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import noData from "../assets/no-data.gif";

export default function ErrorPage() {
  const error = useRouteError();
  // console.log(error);

  return (
    <div className="h-full w-full whiteScr overflow-auto text-stone-400 rounded-l-xl">
      <div className="flex mt-32 flex-col text-black justify-center items-center">
        <img
          src={noData}
          className="w-[150px] h-[150px] flex mb-4  justify-center items-center"
          alt=""
        />
        <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
        <p className="text-center">An Unknown Error Occured.</p>
      </div>
    </div>
  );
}

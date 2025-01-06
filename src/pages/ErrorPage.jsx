import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import noData from "../assets/no-data.gif";

export default function ErrorPage() {
  const error = useRouteError();
  // console.log(error);

  return (
    <div className="h-full w-full whiteScr overflow-auto text-stone-400 rounded-l-xl">
      <div className="flex mt-28 flex-col text-black justify-center items-center">
        <img
          src={noData}
          className="w-[110px] h-[110px] flex mb-3  justify-center items-center"
          alt=""
        />
        <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
        <p className="text-center text-sm">An Unknown Error Occured.</p>
      </div>
    </div>
  );
}

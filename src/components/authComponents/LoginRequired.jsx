import { Link } from "react-router-dom";

export default function LoginRequired() {
  return (
    <div className="flex mt-28 flex-col justify-center items-center">
      <img
        src={
          "https://res.cloudinary.com/dbittrdjs/image/upload/v1733135870/loginRequired_qglenr.gif"
        }
        className="w-[110px] h-[110px] flex mb-3  justify-center items-center"
        alt=""
      />
      <h1 className="text-2xl font-bold mb-3">Login Required</h1>
      <p className="text-center text-sm">
        This is a Protected Route. You must Login in order to view this content.{" "}
        <br />
        Click{" "}
        <Link
          to="/auth"
          className="mx-1 text-[#9d4edd] hover:text-blue-500 font-medium"
        >
          HERE
        </Link>{" "}
        to Login
      </p>
    </div>
  );
}

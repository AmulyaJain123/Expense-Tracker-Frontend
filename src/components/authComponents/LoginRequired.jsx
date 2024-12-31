import { Link } from "react-router-dom";

export default function LoginRequired() {
  return (
    <div className="flex mt-32 flex-col justify-center items-center">
      <img
        src={
          "https://res.cloudinary.com/dbittrdjs/image/upload/v1733135870/loginRequired_qglenr.gif"
        }
        className="w-[150px] h-[150px] flex mb-4  justify-center items-center"
        alt=""
      />
      <h1 className="text-3xl font-bold mb-4">Login Required</h1>
      <p className="text-center">
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

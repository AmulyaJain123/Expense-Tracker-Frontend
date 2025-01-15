import { Link } from "react-router-dom";

export default function RedButton({ text }) {
  return (
    <div className=" py-[6px] sm:py-2 px-3 sm:px-[14px] lg:px-4 rounded-md sm:rounded-lg bg-[#ff4d6d] border-[1.5px] border-[#ff4d6d] shadow-lg text-white font-bold text-xs sm:text-sm lg:text-base hover:bg-white hover:text-[#ff4d6d] hover:scale-110 hover:shadow-xl duration-700">
      {text}
    </div>
  );
}

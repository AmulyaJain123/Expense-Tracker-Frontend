import { Link } from "react-router-dom";

export default function NiceButton({ text }) {
  return (
    <div className=" py-[6px] sm:py-2 px-3 sm:px-4 shadow-lg rounded-md sm:rounded-lg bg-[#9d4edd] border-[1.5px] border-[#9d4edd] text-white font-bold text-xs sm:text-base hover:bg-white hover:text-[#9d4edd] hover:scale-110 hover:shadow-xl duration-700">
      {text}
    </div>
  );
}

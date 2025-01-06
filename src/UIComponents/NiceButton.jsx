import { Link } from "react-router-dom";

export default function NiceButton({ text }) {
  return (
    <div className=" py-2 px-4 shadow-lg rounded-lg bg-[#9d4edd] border-[1.5px] border-[#9d4edd] text-white font-bold text-base hover:bg-white hover:text-[#9d4edd] hover:scale-110 hover:shadow-xl duration-700">
      {text}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function RedButton({ text }) {
  return (
    <div className=" py-2 px-4 rounded-lg bg-[#ff4d6d] border-[1.5px] border-[#ff4d6d] shadow-lg text-white font-bold text-base hover:bg-white hover:text-[#ff4d6d] hover:scale-110 hover:shadow-xl duration-700">
      {text}
    </div>
  );
}

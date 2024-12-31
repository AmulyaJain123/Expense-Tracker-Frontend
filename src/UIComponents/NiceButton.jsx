import { Link } from "react-router-dom";

export default function NiceButton({ text }) {
  return (
    <div className=" py-3 px-6 shadow-lg rounded-xl bg-[#9d4edd] border-2 border-[#9d4edd] text-white font-bold text-xl hover:bg-white hover:text-[#9d4edd] hover:scale-110 hover:shadow-xl duration-700">
      {text}
    </div>
  );
}

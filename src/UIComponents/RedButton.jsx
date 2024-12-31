import { Link } from "react-router-dom";

export default function RedButton({ text }) {
  return (
    <div className=" py-3 px-6 rounded-xl bg-[#ff4d6d] border-2 border-[#ff4d6d] shadow-lg text-white font-bold text-xl hover:bg-white hover:text-[#ff4d6d] hover:scale-110 hover:shadow-xl duration-700">
      {text}
    </div>
  );
}

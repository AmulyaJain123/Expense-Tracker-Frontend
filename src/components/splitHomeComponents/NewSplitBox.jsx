import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import add from "../../assets/add.png";

const options = [
  { name: "striped" },
  { name: "lemon" },
  { name: "akatsuki" },
  { name: "autumn" },
  { name: "skulls" },
  { name: "liquid" },
  { name: "waves" },
];

export default function NewSplitBox() {
  const dispatch = useDispatch();

  function setBack(name) {
    dispatch(splitCreateActions.setBgPattern(name));
  }

  return (
    <div className="mx-[20px] flex flex-wrap gap-x-3 gap-y-3 sm:gap-x-5  sm:gap-y-5">
      {options.map((option) => {
        const str =
          "rounded-2xl sm:rounded-3xl border-2 group border-[white] hover:border-stone-600  w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] hover:shadow-xl duration-500  hover:scale-105  flex justify-center text-center items-center p-4 " +
          option.name;
        return (
          <Link
            to={"create"}
            key={Math.random()}
            onClick={() => setBack(option.name)}
            className={str}
          >
            <div className="w-[30px] sm:w-[40px] rounded-full h-[30px] sm:h-[40px] bg-white flex items-center justify-center">
              <img
                src={add}
                className="w-[30px] sm:w-[40px] h-[30px] sm:h-[40px]"
                alt=""
              />
              {/* <i className="fi fi-ss-add text-[50px] text-[#fff] group-hover:text-[black] duration-500 flex justify-center items-center"></i> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

import { styling } from "../util/styling";
import { useSelector } from "react-redux";

export default function TopNavThumbs({ children }) {
  const status = useSelector((state) => state.splitCreate.topNavSplitStatus);
  return (
    <div className="hidden sm:block  p-1">
      <div
        style={{
          backgroundColor:
            children === status ? styling.topNavThumbsBgCol : "white",
          border:
            status != children
              ? `2px solid ${styling.backColor}`
              : `2px solid ${styling.topNavThumbsBgCol}`,
        }}
        className="p-[2px] lg:p-1  text-sm lg:text-base rounded-md lg:rounded-lg px-1 lg:px-2 flex items-center"
      >
        {children}
      </div>
    </div>
  );
}

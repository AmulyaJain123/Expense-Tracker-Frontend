import { styling } from "../util/styling";

export default function TopNavButton({ children }) {
  return (
    <div className="p-1 hidden sm:block">
      <div
        style={{
          backgroundColor: styling.topNavThumbsBgCol,
          border: `2px solid ${styling.topNavThumbsBgCol}`,
        }}
        className="p-1 rounded-lg px-2 text-sm sm:text-base  flex items-center"
      >
        {children}
      </div>
    </div>
  );
}

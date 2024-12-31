import { useSelector } from "react-redux";
import LoginRequired from "./LoginRequired";

export default function Protection({ children }) {
  const userDetails = useSelector((state) => state.universal.userInfo);
  if (userDetails) {
    return <>{children}</>;
  } else {
    return (
      <>
        <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-r-xl lg:rounded-r-none rounded-l-xl">
          <div className="flex justify-center items-center">
            <LoginRequired />
          </div>
        </div>
      </>
    );
  }
}

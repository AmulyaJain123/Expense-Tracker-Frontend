import errorImg from "../assets/notfound.gif";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { styling } from "../util/styling";

export default function PageNotFound() {
  const msg = "Page Not Found";

  return (
    <>
      <div
        style={{ backgroundColor: styling.backColor }}
        className="flex h-screen relative overflow-auto"
      >
        <SideNav />
        <div
          style={{ marginLeft: `${styling.spacing}px` }}
          className="flex w-full mr-2 lg:mr-0 flex-col"
        >
          <TopNav />
          <div className="w-full whiteScr rounded-l-xl rounded-r-xl mr-2 lg:mr-0 lg:rounded-r-none h-screen my-2 overflow-auto">
            <div className="flex mt-32 flex-col justify-center items-center">
              <img
                src={errorImg}
                className="w-[150px] h-[150px] flex mb-4  justify-center items-center"
                alt=""
              />
              <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
              <p className="text-center">The Requested Page does not exists.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

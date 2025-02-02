import { Helmet } from "react-helmet-async";
import NotificationBox from "../components/notificationComponents/NotificationBox";

export default function Notifications() {
  return (
    <>
      <Helmet>
        <title>Notifications | BILLBUD</title>
        <meta name="description" content="Notifications" />
      </Helmet>
      <div className="h-full w-full bg-white pb-[100px] overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-center text-[30px] lg:text-[35px] font-extrabold mt-10">
            Notifications
          </h1>
          <div className="flex flex-col mt-8 lg:mt-12 mx-3 sm:mx-6 lg:mx-12">
            <div className="flex min-h">
              <div className="flex flex-grow bg-slate-100 p-3 rounded-xl">
                <NotificationBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

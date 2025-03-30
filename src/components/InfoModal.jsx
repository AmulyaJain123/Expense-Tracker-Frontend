import cross2 from "../assets/cross2.png";

export default function InfoModal({ type, setType }) {
  function closeModal() {
    setType(null);
  }

  if (type === "socket-disconnected") {
    return (
      <>
        <div className="fixed z-[9999] w-screen h-screen bg-black/40 top-0 left-0 flex justify-center items-center">
          <div className="flex relative flex-col bg-white rounded-2xl p-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <i className="fi fi-bs-signal-stream-slash text-[50px]"></i>
              <span className="text-sm font-medium">Socket Disconnected</span>
              <span className="text-xs text-center mt-2 capitalize">
                Realtime Connection between you and server was disconnected! Due
                to this realtime features are down.
                <br />
                Check your Internet Connection and Reload page.
              </span>
            </div>
            <button onClick={closeModal} className="absolute right-2 top-2 ">
              <img src={cross2} className="w-[25px] h-[25px]" alt="" />
            </button>
          </div>
        </div>
      </>
    );
  } else if (type === "socket-inactive") {
    return (
      <>
        <div className="fixed z-[9999] w-screen h-screen bg-black/40 top-0 left-0 flex justify-center items-center">
          <div className="flex relative flex-col bg-white rounded-2xl p-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <i className="fi fi-ss-plug-connection text-[50px]"></i>
              <span className="text-sm font-medium">
                Socket Activity Detected
              </span>
              <span className="text-xs text-center mt-2 max-w-[550px]">
                Seems like the Application is open elsewhere. Some Realtime
                features are available only on one socket connection and hence
                will be down here. <br />
              </span>
              <span className="mt-2 text-xs capitalize">
                Reload page to use all features here.
              </span>
            </div>
            <button onClick={closeModal} className="absolute right-2 top-2 ">
              <img src={cross2} className="w-[25px] h-[25px]" alt="" />
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

import exclamation from "../../assets/exclamation.png";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import noEntries from "../../assets/noEntries.png";
import user from "../../assets/user.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";
import selectedIcon from "../../assets/extras/tick.png";
import add from "../../assets/extras/send.png";
import { useNavigate } from "react-router-dom";

const ShareModal = forwardRef(function ShareModal({ data }, ref) {
  const dialog = useRef();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState(null);
  const [selected, setSelected] = useState([]);
  const [success, setSuccess] = useState(false);
  const closeButton = useRef();
  const navigate = useNavigate();

  useImperativeHandle(ref, () => {
    return {
      open() {
        console.log("ref");
        setError(null);
        setFriends(null);
        setSelected([]);
        setLoading(false);
        setLoading2(false);
        setSuccess(false);
        fetchFriends();
        dialog.current.showModal();
      },
    };
  });

  async function fetchFriends() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/friends/getdetails",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      setFriends(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  console.log(friends);

  function selectClick(userId) {
    setSelected((preval) => {
      if (preval.includes(userId)) {
        return preval.filter((i) => i != userId);
      } else {
        return [...preval, userId];
      }
    });
  }

  async function shareClick() {
    setLoading2(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/split/share",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            splitId: data.splitId,
            friends: selected,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      setLoading2(false);
      afterSuccess();
    } catch (err) {
      console.log(err);
      setLoading2(false);
      setError(true);
    }
  }

  function afterSuccess() {
    setSuccess(true);
    navigate(`/split/protected/view/saved/${data.splitId}`);
    dialog.current.close();
  }

  return (
    <>
      <dialog className="rounded-xl sm:rounded-2xl max-h-[80%]" ref={dialog}>
        <div className="bg-white flex rounded-xl sm:rounded-2xl w-[300px]  sm:w-[450px] h-full  max-h-[450px]">
          <div className="p-2 sm:p-3 flex flex-col flex-grow">
            <h1 className="py-1 sm:py-[6px] bg-slate-100 rounded-lg sm:rounded-xl text-center text-xl sm:text-2xl font-bold">
              Share To Friends
            </h1>
            <div className="flex flex-col flex-grow bg-slate-100 rounded-lg sm:rounded-xl p-2 sm:p-3 pr-[6px] sm:pr-2 mt-2 sm:mt-3">
              <div className="flex flex-col  h-[200px] sm:h-[250px]  space-y-[6px] sm:space-y-2 pr-[6px] sm:pr-2 overflow-auto customScrollThin">
                {loading ? (
                  <div className="flex flex-grow justify-center items-center">
                    <img
                      src={load}
                      className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]"
                      alt=""
                    />
                  </div>
                ) : friends === null ? (
                  <div className="flex flex-grow text-xs sm:text-sm flex-col justify-center space-y-2 sm:space-y-3  items-center">
                    <img
                      src={errorIcon}
                      className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] flex justify-center items-center"
                      alt=""
                    />
                    <span>Something went wrong</span>
                  </div>
                ) : friends.length === 0 ? (
                  <div className="flex justify-center text-xs sm:text-sm flex-col text-slate-500 space-y-3 sm:space-y-4 items-center mt-16 sm:mt-28">
                    <img
                      src={noEntries}
                      className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex justify-center items-center"
                      alt=""
                    />
                    <span>No Friends Found</span>
                  </div>
                ) : (
                  <>
                    {friends.map((i) => {
                      return (
                        <>
                          <div className="flex group  justify-between rounded-full p-1 sm:p-[6px] space-x-2 sm:space-x-3 bg-slate-200">
                            <div className="space-x-3 sm:space-x-4 flex items-center">
                              <div>
                                <img
                                  src={i.profilePic || user}
                                  className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full"
                                  alt=""
                                />
                              </div>
                              <span className="justify-center w-[150px] sm:w-[200px] px-1 sm:px-[6px] flex-col rounded-md flex ">
                                <span className="flex max-w-[300px] text-[11px] sm:text-xs overflow-clip flex-grow font-medium items-center">
                                  <OnlyXChars x={20} text={i.username} />
                                </span>
                                <div className="flex flex-grow border border-slate-400"></div>
                                <span className="flex px-1 sm:px-[6px]  rounded-md items-center font-medium text-[11px] sm:text-xs">
                                  <span className="font-semibold mr-1 sm:mr-[6px]">
                                    #
                                  </span>{" "}
                                  <span>{i.userId}</span>
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() => selectClick(i.userId)}
                                className="p-[6px] sm:p-[8px] rounded-full hover:bg-slate-100 duration-700"
                              >
                                <img
                                  src={
                                    selected.includes(i.userId)
                                      ? selectedIcon
                                      : add
                                  }
                                  className="flex justify-center items-center w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] "
                                  alt=""
                                />
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-1 pr-[6px] sm:pr-2 h-[12px] sm:h-[15px] text-[11px] sm:text-xs">
              {friends && selected.length > 0
                ? `${selected.length} Friends Selected`
                : null}
            </div>
            <div className="flex justify-between mt-2 sm:mt-3">
              <div className="flex space-x-[6px] sm:space-x-2 text-[11px] sm:text-xs items-center pl-[6px] sm:pl-3">
                {loading2 ? (
                  <div>
                    <img
                      src={load}
                      className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]"
                      alt=""
                    />
                  </div>
                ) : error ? (
                  <>
                    <img
                      src={exclamation}
                      className="w-[12px] sm:w-[15px] h-[12px] sm:h-[15px] flex justify-center items-center"
                      alt=""
                    />
                    <span className="text-red-500 mt-[2px]">
                      Something went wrong
                    </span>
                  </>
                ) : success ? (
                  <span className="text-green-500 font-medium">Shared</span>
                ) : null}
              </div>
              <div className="flex space-x-2 sm:space-x-3 items-center">
                <form method="dialog">
                  <button
                    disabled={loading2}
                    ref={closeButton}
                    className="text-xs sm:text-sm disabled:pointer-events-none disabled:opacity-50 font-medium text-white bg-red-500 border-[1.5px] border-red-500 hover:text-red-500 hover:bg-white duration-500 rounded-md py-1 px-2 sm:px-3"
                  >
                    Cancel
                  </button>
                </form>
                <button
                  onClick={shareClick}
                  disabled={loading2 || selected.length === 0}
                  className="text-xs sm:text-sm disabled:pointer-events-none disabled:opacity-50 font-medium text-white bg-green-500 border-[1.5px] border-green-500 hover:text-green-500 hover:bg-white duration-500 rounded-md py-1 px-2 sm:px-3"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default ShareModal;

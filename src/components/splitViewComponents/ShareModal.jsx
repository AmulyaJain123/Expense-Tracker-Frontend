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
import { ErrorBox, EmptyBox, ErrorText } from "../../UIComponents/NoneFound";

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
      <dialog className="rounded-lg sm:rounded-xl max-h-[80%]" ref={dialog}>
        <div className="bg-white flex rounded-xl sm:rounded-2xl w-[300px]  sm:w-[400px] h-full  max-h-[450px]">
          <div className="p-2 flex flex-col flex-grow">
            <h1 className="py-1 sm:py-[6px] bg-slate-100 rounded-lg text-center text-xl sm:text-2xl font-bold">
              Share To Friends
            </h1>
            <div className="flex flex-col flex-grow bg-slate-100 rounded-lg  p-2 sm:p-3 pl-3 sm:pl-4 pr-[6px] sm:pr-2 mt-2 ">
              <div className="flex flex-col  h-[200px] sm:h-[250px]  space-y-[6px] sm:space-y-2 pr-[6px] sm:pr-2 overflow-auto specialScroll">
                {loading ? (
                  <div className="flex flex-grow justify-center items-center">
                    <img
                      src={load}
                      className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]"
                      alt=""
                    />
                  </div>
                ) : friends === null ? (
                  <ErrorBox IconSize={50} textSize={14} />
                ) : friends.length === 0 ? (
                  <EmptyBox
                    textColor="#cbd5e1"
                    IconSize={50}
                    textSize={15}
                    gap={12}
                  />
                ) : (
                  <>
                    {friends.map((i) => {
                      return (
                        <>
                          <div className="flex group  justify-between rounded-lg p-1 pr-[6px] sm:p-[6px]  space-x-2 sm:space-x-3 bg-slate-200">
                            <div className="gap-x-2 sm:gap-x-2 flex items-center">
                              <div>
                                <img
                                  src={i.profilePic || user}
                                  className="w-[35px] h-[35px] sm:w-[35px] sm:h-[35px] rounded-full"
                                  alt=""
                                />
                              </div>
                              <span className="justify-center w-[150px] sm:w-[200px] px-1 sm:px-[6px] flex-col rounded-md flex ">
                                <span className="flex max-w-[300px] text-xs sm:text-[13px] overflow-clip flex-grow font-medium items-center">
                                  <OnlyXChars x={20} text={i.fullname} />
                                </span>
                                <span className="flex text-slate-500 rounded-md items-center font-medium text-[10px] sm:text-[11px]">
                                  <span>{`@${i.username}`}</span>
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() => selectClick(i.userId)}
                                className="p-[6px] sm:p-[8px] rounded-md sm:rounded-lg hover:bg-slate-100 duration-700"
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
            <div className="flex justify-between mt-[6px] sm:mt-2">
              <div className="flex space-x-[6px] sm:space-x-2 text-[10px] sm:text-xs items-center pl-[6px] sm:pl-3">
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
                    <ErrorText textSize={12} msg="Something Went Wrong" />
                  </>
                ) : success ? (
                  <span className="text-green-500 font-medium">Shared</span>
                ) : null}
              </div>
              <div className="flex gap-x-2 sm:gap-x-3 items-center">
                <form method="dialog">
                  <button
                    disabled={loading2}
                    ref={closeButton}
                    className="text-xs sm:text-[13px] disabled:pointer-events-none disabled:opacity-50 font-medium text-white bg-red-500 border-[1.5px] border-red-500 hover:text-red-500 hover:bg-white duration-500 rounded-md py-1 px-2 sm:px-[10px]"
                  >
                    Cancel
                  </button>
                </form>
                <button
                  onClick={shareClick}
                  disabled={loading2 || selected.length === 0}
                  className="text-xs sm:text-[13px] disabled:pointer-events-none disabled:opacity-50 font-medium text-white bg-green-500 border-[1.5px] border-green-500 hover:text-green-500 hover:bg-white duration-500 rounded-md py-1 px-2 sm:px-[10px]"
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

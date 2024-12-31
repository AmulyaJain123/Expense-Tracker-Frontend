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
import selectedIcon from "../../assets/selected.png";
import add from "../../assets/add.png";
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
      <dialog className="rounded-3xl h-[80%]" ref={dialog}>
        <div className="bg-white flex rounded-3xl w-[600px] h-full  max-h-[600px]">
          <div className="p-6 flex flex-col flex-grow">
            <h1 className="py-2 bg-slate-100 rounded-2xl text-center text-3xl font-bold">
              Share To Friends
            </h1>
            <div className="flex flex-col flex-grow bg-slate-100 rounded-2xl p-4 pr-2 mt-6">
              <div className="flex flex-col  h-[350px]  space-y-4 pr-2 overflow-auto customScrollThin">
                {loading ? (
                  <div className="flex flex-grow justify-center items-center">
                    <img src={load} className="w-[50px] h-[50px]" alt="" />
                  </div>
                ) : friends === null ? (
                  <div className="flex flex-grow flex-col justify-center space-y-4  items-center">
                    <img
                      src={errorIcon}
                      className="w-[50px] h-[50px] flex justify-center items-center"
                      alt=""
                    />
                    <span>Something went wrong</span>
                  </div>
                ) : friends.length === 0 ? (
                  <div className="flex justify-center flex-col text-slate-500 space-y-6 items-center mt-32">
                    <img
                      src={noEntries}
                      className="w-[80px] h-[80px] flex justify-center items-center"
                      alt=""
                    />
                    <span>No Friends Found</span>
                  </div>
                ) : (
                  <>
                    {friends.map((i) => {
                      return (
                        <>
                          <div className="flex group  justify-between rounded-full p-2 space-x-4 bg-slate-200">
                            <div className="space-x-6 flex items-center">
                              <div>
                                <img
                                  src={i.profilePic || user}
                                  className="w-[50px] h-[50px] rounded-full"
                                  alt=""
                                />
                              </div>
                              <span className="justify-center w-[250px] px-2 flex-col rounded-md flex ">
                                <span className="flex max-w-[300px] text-lg overflow-clip flex-grow font-medium items-center">
                                  <OnlyXChars x={20} text={i.username} />
                                </span>
                                <div className="flex flex-grow border border-slate-400"></div>
                                <span className="flex  px-2 rounded-md items-center font-medium text-base">
                                  <span className="font-semibold mr-2">#</span>{" "}
                                  <span>{i.userId}</span>
                                </span>
                              </span>
                            </div>
                            <div className="flex">
                              <button
                                onClick={() => selectClick(i.userId)}
                                className="p-3 rounded-full hover:bg-slate-100 duration-700"
                              >
                                <img
                                  src={
                                    selected.includes(i.userId)
                                      ? selectedIcon
                                      : add
                                  }
                                  className="flex justify-center items-center w-[30px] h-[30px] "
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
            <div className="flex justify-end mt-1 h-[15px]">
              {friends && selected.length > 0
                ? `${selected.length} Friends Selected`
                : null}
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-3 items-center pl-4">
                {loading2 ? (
                  <div>
                    <img src={load} className="w-[25px] h-[25px]" alt="" />
                  </div>
                ) : error ? (
                  <>
                    <img
                      src={exclamation}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                    <span className="text-red-500">Something went wrong</span>
                  </>
                ) : success ? (
                  <span className="text-green-500 font-medium">Shared</span>
                ) : null}
              </div>
              <div className="flex space-x-4 items-center">
                <form method="dialog">
                  <button
                    disabled={loading2}
                    ref={closeButton}
                    className="text-lg disabled:pointer-events-none disabled:opacity-50 font-medium text-white bg-red-500 border-2 border-red-500 hover:text-red-500 hover:bg-white duration-500 rounded-lg py-1 px-4"
                  >
                    Cancel
                  </button>
                </form>
                <button
                  onClick={shareClick}
                  disabled={loading2 || selected.length === 0}
                  className="text-lg disabled:pointer-events-none disabled:opacity-50 font-medium text-white bg-green-500 border-2 border-green-500 hover:text-green-500 hover:bg-white duration-500 rounded-lg py-1 px-4"
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

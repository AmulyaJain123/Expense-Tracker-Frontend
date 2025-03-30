import { Helmet } from "react-helmet-async";
import FullScreen from "../components/messageComponents/FullScreen";
import { useState, useEffect } from "react";
import loadingIcon from "../assets/loader.gif";
import noData from "../assets/no-data.gif";
import { useDispatch, useSelector } from "react-redux";
import { messagesActions } from "../store/main";

export default function Messages() {
  const chats = useSelector((state) => state.messages.chats);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();

  async function fetchMessages() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/message/getchats",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      result.sort((a, b) => {
        const aLast = a.chatHistory.at(-1)?.msgDate || new Date().toUTCString();
        const bLast = b.chatHistory.at(-1)?.msgDate || new Date().toUTCString();
        return new Date(bLast).getTime() - new Date(aLast).getTime();
      });
      dispatch(messagesActions.setChats(result));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchMessages();
    return () => {
      dispatch(messagesActions.clearAll());
    };
  }, []);
  return (
    <>
      {loading === true ? (
        <div className="flex-grow flex justify-center items-center">
          <img src={loadingIcon} className="w-[50px] h-[50px]" alt="" />
        </div>
      ) : error === null && chats != null ? (
        <FullScreen />
      ) : error != null ? (
        <div className="h-full w-full whiteScr overflow-auto text-stone-400 rounded-l-xl">
          <div className="flex mt-28 flex-col text-black justify-center items-center">
            <img
              src={noData}
              className="w-[110px] h-[110px] flex mb-3  justify-center items-center"
              alt=""
            />
            <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
            <p className="text-center text-sm">An Unknown Error Occured.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

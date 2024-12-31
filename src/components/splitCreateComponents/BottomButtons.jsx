import RedButton from "../../UIComponents/RedButton";
import NiceButton from "../../UIComponents/NiceButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { splitAlgo } from "../../util/algo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "./Loading";

export default function BottomButtons({ num }) {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.splitCreate.friends);
  const splitInfo = useSelector((state) => state.splitCreate.splitInfo);
  const bills = useSelector((state) => state.splitCreate.bills);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function splitClick() {
    splitAlgo(bills);
    dispatch(splitCreateActions.changeStage(2));
  }

  function discardClick() {
    dispatch(splitCreateActions.clearAll());
    navigate("/split");
  }

  function changeMode(str) {
    setLoading(str);
  }

  function retry() {
    saveClick();
  }

  async function saveClick() {
    setLoading("load");
    const split = splitAlgo(bills);
    const newSplitInfo = {
      splitName: splitInfo.splitName,
      splitDate: new Date().toUTCString(),
      description:
        splitInfo.description === "" ? "None" : splitInfo.description,
    };
    const obj = { friends, splitInfo: newSplitInfo, bills, split };
    console.log(obj);
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_API + "/split/createsplit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw "failed";
      } else {
        setLoading("success");
      }
    } catch (err) {
      console.log(err);
      setLoading("error");
    }
  }

  if (num === 0) {
    return (
      <div className="flex flex-grow justify-end">
        <button
          onClick={() => dispatch(splitCreateActions.changeStage(1))}
          className="disabled:pointer-events-none disabled:opacity-50"
          disabled={friends.length < 2 || splitInfo.splitName === ""}
        >
          <NiceButton text={"Continue"} />
        </button>
      </div>
    );
  } else if (num === 1) {
    return (
      <div className="flex flex-grow justify-between">
        <button
          onClick={() => dispatch(splitCreateActions.changeStage(0))}
          className="disabled:pointer-events-none disabled:opacity-50"
        >
          <NiceButton text={"Back"} />
        </button>
        <button
          onClick={() => splitClick()}
          className="disabled:pointer-events-none disabled:opacity-50"
          disabled={!bills || bills.length === 0}
        >
          <NiceButton text={"SPLIT"} />
        </button>
      </div>
    );
  } else if (num === 2) {
    return (
      <>
        {loading != false ? (
          <Loading retry={retry} changeMode={changeMode} mode={loading} />
        ) : null}
        <div className="flex flex-grow justify-between">
          <button
            onClick={() => dispatch(splitCreateActions.changeStage(1))}
            className="disabled:pointer-events-none disabled:opacity-50"
          >
            <NiceButton text={"Back"} />
          </button>
          <button
            onClick={discardClick}
            className="disabled:pointer-events-none disabled:opacity-50"
          >
            <RedButton text={"Discard"} />
          </button>
          <button
            onClick={saveClick}
            className="disabled:pointer-events-none disabled:opacity-50"
            // disabled={!bills || bills.length === 0}
          >
            <NiceButton text={"Save"} />
          </button>
        </div>
      </>
    );
  }
}

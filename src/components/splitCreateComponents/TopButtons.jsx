import RedButton from "../../UIComponents/RedButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";

export default function TopButtons({ num }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function discardClick() {
    dispatch(splitCreateActions.clearAll());
    navigate("/split");
  }

  if (num === 0 || num === 1) {
    return (
      <div className="flex">
        <button onClick={discardClick}>
          <RedButton text={"Discard"} />
        </button>
      </div>
    );
  }
}

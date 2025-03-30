import { styling } from "../util/styling";
import styled from "styled-components";
import { NavLink, useLocation, Link } from "react-router-dom";
import { universalActions } from "../store/main";
import { useDispatch, useSelector } from "react-redux";

const Main = styled.div`
  background-color: ${styling.navColor};

  &:hover {
    background-color: ${styling.pageTileHover};
  }
`;

const Iframe = styled.i`
  margin-right: 30px;
`;

function setActive(location, name, path) {
  if (name === "Home") {
    if (location.pathname === "/") {
      return true;
    }
    return false;
  } else if (location.pathname.includes("/" + path)) {
    return true;
  }
  return false;
}

export default function PageTile({ details }) {
  const { name, path, iconClass, iconClassBold } = details;
  const location = useLocation();
  const active = setActive(location, name, path);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.realtime.notifications);
  const messages = useSelector((state) => state.messages.messages);

  return (
    <div className="">
      <NavLink
        to={path}
        onClick={() => dispatch(universalActions.closeMenu())}
        className={active ? "active" : ""}
      >
        <Main className="py-2 mb-2 pl-3 w-[170px] relative flex items-center rounded-r-lg">
          <img
            src={!active ? iconClass : iconClassBold}
            className="flex justify-center items-center w-[19px] mr-3 h-[19px]"
            alt=""
          />
          <span
            style={{
              fontWeight: details.hard ? "600" : "",
              textTransform: details.hard ? "uppercase" : "",
              fontFamily: details.hard ? "Fredoka" : "",
              fontSize: details.hard ? "13px" : "",
            }}
            className="text-sm  lg:text-xs"
          >
            {name}
          </span>
          {name === "Notifications" && notifications.length != 0 ? (
            <span className="w-[20px] h-[20px] absolute right-4 rounded-full bg-[#7fffd4]  text-[11px] font-medium flex justify-center items-center">
              <span className="h-fit pt-[2px]">{notifications.length}</span>
            </span>
          ) : null}
          {name === "Messages" && Object.keys(messages).length != 0 ? (
            <span className="w-[20px] h-[20px] absolute right-4 rounded-full bg-[#7fffd4]  text-[11px] font-medium flex justify-center items-center">
              <span className="h-fit pt-[2px]">
                {Object.keys(messages).length}
              </span>
            </span>
          ) : null}
        </Main>
      </NavLink>
    </div>
  );
}

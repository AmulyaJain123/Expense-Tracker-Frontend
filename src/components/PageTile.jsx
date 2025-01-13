import { styling } from "../util/styling";
import styled from "styled-components";
import { NavLink, useLocation, Link } from "react-router-dom";
import { universalActions } from "../store/main";
import { useDispatch } from "react-redux";

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

  return (
    <div className="">
      <NavLink
        to={path}
        onClick={() => dispatch(universalActions.closeMenu())}
        className={({ isActive }) => {
          return isActive ? "active" : undefined;
        }}
      >
        <Main className="py-2 mb-2 pl-3 w-[170px] flex items-center rounded-r-lg">
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
              fontSize: details.hard ? "12px" : "",
            }}
            className="text-sm  lg:text-xs"
          >
            {name}
          </span>
        </Main>
      </NavLink>
    </div>
  );
}

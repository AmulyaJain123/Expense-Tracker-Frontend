import { styling } from "../util/styling";
import styled from "styled-components";
import PageTile from "./PageTile";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logIn from "../assets/logIn.png";
import logOut from "../assets/logOut.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { universalActions } from "../store/main";
import billoutline from "../assets/sideNavImages/bill-outline.png";
import billsolid from "../assets/sideNavImages/bill-solid.png";
import homeoutline from "../assets/sideNavImages/home-outline.png";
import homesolid from "../assets/sideNavImages/home-solid.png";
import profileoutline from "../assets/sideNavImages/profile-outline.png";
import profilesolid from "../assets/sideNavImages/profile-solid.png";
import splitoutline from "../assets/sideNavImages/split-outline.png";
import splitsolid from "../assets/sideNavImages/split-solid.png";
import vaultoutline from "../assets/sideNavImages/vault-outline.png";
import vaultsolid from "../assets/sideNavImages/vault-solid.png";
import friendsoutline from "../assets/sideNavImages/friends-outline.png";
import friendssolid from "../assets/sideNavImages/friends-solid.png";
import notifyoutline from "../assets/sideNavImages/notify-outline.png";
import notifysolid from "../assets/sideNavImages/notify-solid.png";
import load from "../assets/loader.gif";

const Main = styled.div`
  height: calc(100vh - ${styling.spacing * 2}px);
  margin-top: ${styling.spacing}px;
  background-color: ${styling.navColor};
`;
const Logo = styled.div`
  padding: 10px;
  font-size: 30px;
  font-weight: 900;
  font-family: ${styling.logoFont};
  text-align: center;
`;
const Tiles = styled.div`
  margin-top: 40px;
`;

const pages = [
  {
    name: "Home",
    path: "",
    iconClass: homeoutline,
    iconClassBold: homesolid,
    children: [],
  },
  {
    name: "Notifications",
    path: "notifications",
    protected: true,
    realtime: true,
    iconClass: notifyoutline,
    iconClassBold: notifysolid,
  },
  {
    name: "Vault",
    path: "vault",
    iconClass: vaultoutline,
    iconClassBold: vaultsolid,
    hard: true,
    children: [
      {
        name: "Bill Upload",
        path: "vault/create",
      },
      {
        name: "Vault",
        path: "vault/view",
      },
    ],
  },
  {
    name: "Track",
    path: "track",
    hard: true,
    iconClass: billoutline,
    iconClassBold: billsolid,
    children: [
      {
        name: "Dashboard",
        path: "track/dashboard",
      },
      {
        name: "Transaction Create",
        path: "track/create",
      },
      {
        name: "Transactions",
        path: "track/transactions",
      },
      {
        name: "Distributions",
        path: "track/distributions",
      },
    ],
  },
  {
    name: "Split",
    path: "split",
    hard: true,
    iconClass: splitoutline,
    iconClassBold: splitsolid,
    children: [
      {
        name: "Split Create",
        path: "split/create",
      },
    ],
  },
  {
    name: "Friends",
    path: "friends",
    protected: true,
    iconClass: friendsoutline,
    iconClassBold: friendssolid,
  },
  {
    name: "Profile",
    path: "profile",
    protected: true,
    iconClass: profileoutline,
    iconClassBold: profilesolid,
  },
];

export default function SideNav() {
  const location = useLocation();
  const [jump, setJump] = useState([]);
  const userDetails = useSelector((state) => state.universal.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dom =
    import.meta.env.VITE_ENV === "dev"
      ? "localhost"
      : import.meta.env.VITE_BACKEND_DOMAIN;

  async function logOutClick() {
    try {
      setLoading(true);
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/auth/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      navigate("/auth");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Main className="min-w-[190px] rounded-r-xl overflow-y-auto hidden lg:flex flex-col">
      <Logo>
        <Link to={""}>BILLBUD</Link>
      </Logo>
      <Tiles>
        {pages.map((page) => {
          if (!page.protected || (page.protected && userDetails)) {
            return <PageTile key={page.name} details={{ ...page }} />;
          } else {
            return null;
          }
        })}
      </Tiles>

      <div className="flex flex-grow justify-end flex-col">
        {userDetails ? (
          <div className="flex flex-col space-y-4 mb-[10px]  ">
            {loading ? (
              <div className="mx-3  p-2">
                <img src={load} className="w-[20px] h-[20px]" alt="" />
              </div>
            ) : (
              <button
                onClick={logOutClick}
                className="rounded-lg hover:bg-slate-200 flex items-center space-x-4 mx-3  p-2 duration-500"
              >
                <img src={logOut} className=" w-[19px]" alt="" />
                <span className="font-medium text-xs">Logout</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-4  mb-[10px] mt-auto">
            <Link
              to={"/auth"}
              className="rounded-lg space-x-4 flex items-center mx-3 hover:bg-slate-200 p-2 duration-500"
            >
              <img src={logIn} className=" w-[19px]" alt="" />
              <span className="font-medium text-xs">Login</span>
            </Link>
          </div>
        )}
      </div>
    </Main>
  );
}

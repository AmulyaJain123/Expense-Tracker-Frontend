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

const Main = styled.div`
  height: calc(100vh - ${styling.spacing * 2}px);
  margin-top: ${styling.spacing}px;
  background-color: ${styling.navColor};
`;
const Logo = styled.div`
  padding: 10px;
  font-size: 40px;
  font-weight: 900;
  font-family: ${styling.logoFont};
  text-align: center;
`;
const Tiles = styled.div`
  margin-top: 50px;
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

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     const arr = pages.find((i) => {
  //       return i.name === "Home";
  //     }).children;
  //     setJump([...arr]);
  //   } else if (location.pathname.includes("/split")) {
  //     const arr = pages.find((i) => {
  //       return i.name === "BillSplit";
  //     }).children;
  //     setJump([...arr]);
  //   } else if (location.pathname.includes("/vault")) {
  //     const arr = pages.find((i) => {
  //       return i.name === "BillVault";
  //     }).children;
  //     setJump([...arr]);
  //   } else if (location.pathname.includes("/track")) {
  //     const arr = pages.find((i) => {
  //       return i.name === "BillTrack";
  //     }).children;
  //     setJump([...arr]);
  //   }
  // }, [location]);

  // console.log(jump);

  function logOutClick() {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/auth");
  }

  return (
    <Main className="min-w-[250px] rounded-r-xl overflow-y-auto hidden lg:flex flex-col">
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
      {/* <div
        style={{
          right: jump.length != 0 ? "0px" : "250px",
          transition: "right ease-in-out 1000ms",
          opacity: jump.length != 0 ? "1" : "0",
        }}
        className="flex flex-col relative mt-[50px] mb-[20px] px-6 text-black bg-slate-200 mr-6 py-3 rounded-r-lg"
      >
        <div className="text-xl font-semibold mb-3">Jump to</div>
        <div className="flex flex-col pl-2 space-y-2">
          {jump.map((link) => {
            return (
              <Link key={link.name} to={link.path}>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div> */}

      <div className="flex flex-grow justify-end flex-col">
        {userDetails ? (
          <div className="flex flex-col space-y-4 mb-[20px]  ">
            <button
              onClick={logOutClick}
              className="rounded-lg hover:bg-slate-200 flex space-x-6 mx-4  p-2 duration-500"
            >
              <img src={logOut} className=" w-[25px]" alt="" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4  mb-[20px] mt-auto">
            <Link
              to={"/auth"}
              className="rounded-lg space-x-6 flex mx-4 hover:bg-slate-200 p-2 duration-500"
            >
              <img src={logIn} className=" w-[25px]" alt="" />
              <span className="font-medium">Login</span>
            </Link>
          </div>
        )}
      </div>
    </Main>
  );
}

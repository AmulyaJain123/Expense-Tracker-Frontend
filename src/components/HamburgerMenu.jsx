import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import styled from "styled-components";
import { styling } from "../util/styling";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTile from "./PageTile";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logIn from "../assets/logIn.png";
import logOut from "../assets/logOut.png";
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

const Logo = styled.div`
  padding: 10px;
  font-size: 30px;
  font-weight: 900;
  font-family: ${styling.logoFont};
  color: black;
  text-align: left;
  text-align: center;
`;

const Tiles = styled.div`
  margin-top: 30px;
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

export default function HamburgerMenu() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.universal.userInfo);

  function backClick() {
    dispatch(universalActions.closeMenu());
  }

  function logOutClick() {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/auth");
  }

  return (
    <>
      <div
        onClick={backClick}
        className="absolute w-[100vw] z-[100] h-[100vh] top-0 bg-black/30 left-0 "
      ></div>
      <div className="absolute z-[110] flex flex-col top-0 left-0 bg-white w-[200px] h-screen">
        <div className="">
          <Logo>BILLBUD</Logo>
        </div>
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
              <button
                onClick={logOutClick}
                className="rounded-lg hover:bg-slate-200 flex space-x-4 mx-3  p-2 duration-500"
              >
                <img src={logOut} className=" w-[19px]" alt="" />
                <span className="font-medium text-xs">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4  mb-[10px] mt-auto">
              <Link
                to={"/auth"}
                className="rounded-lg space-x-4 flex mx-3 hover:bg-slate-200 p-2 duration-500"
              >
                <img src={logIn} className=" w-[19px]" alt="" />
                <span className="font-medium text-xs">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

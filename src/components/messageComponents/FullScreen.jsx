import searchIcon from "../../assets/search.png";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import MainScreen from "./MainScreen";
import { useEffect, useState } from "react";

export default function FullScreen() {
  return (
    <div className="flex-grow relative m-auto max-w-[1300px] h-full max-h-[800px] flex gap-x-3 p-3">
      <SideBar />
      <MainScreen />
    </div>
  );
}

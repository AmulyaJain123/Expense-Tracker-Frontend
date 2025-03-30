import searchIcon from "../../assets/search.png";
import noEntries from "../../assets/noEntries.png";
import newChatIcon from "../../assets/chat.png";

import { useSelector } from "react-redux";
import { useState } from "react";
import Base from "./Base";
import NewChat from "./NewChat";

export default function SideBar() {
  const sidebarScreen = useSelector((state) => state.messages.sidebarScreen);

  return (
    <>
      <div className="flex relative p-2 bg-slate-100 rounded-xl w-[270px]">
        {sidebarScreen === 1 ? <Base /> : <NewChat />}
      </div>
    </>
  );
}

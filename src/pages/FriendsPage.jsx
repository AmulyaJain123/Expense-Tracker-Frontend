import { useState, useEffect } from "react";
import Friends from "../components/friendsComponents/Friends";
import Inbox from "../components/friendsComponents/Inbox";
import { Helmet } from "react-helmet-async";

export default function FriendsPage() {
  return (
    <>
      <Helmet>
        <title> My Friends | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <div className="max-w-[1200px] h-full mx-auto">
          <div className="flex flex-col h-full p-4 ">
            <div className="flex h-full">
              <Inbox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

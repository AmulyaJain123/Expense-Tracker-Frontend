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
      <div className="h-full w-full bg-white pb-[100px] overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <div className="max-w-[1500px] mx-auto">
          <h1 className="text-center text-[50px] font-extrabold mt-12">
            My Friends
          </h1>
          <div className="flex flex-col mt-24 mx-16">
            <div className="flex min-h-[1000px]">
              <Inbox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import styled from "styled-components";
import WhatIsMenu from "./WhatIsMenu";
import AddingTransactions from "./AddingTransactions";
import DashboardMenu from "./DashboardMenu";
import TransactionMenu from "./TransactionMenu";

const Button = styled.button`
  font-weight: 600;
  border-bottom: ${(props) => {
    return props.$status === true ? "solid black 4px" : "solid white 4px";
  }};
  transition: all 200ms;
  padding: 0 1px;
`;

const menu = [];

export default function TrackHomeMenu() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  function menuClick(event) {
    const num = parseInt(event.target.id);
    setSelectedMenu(num);
  }

  return (
    <div id="menu">
      <div className="flex justify-center items-center text-base md:text-lg  sm:items-start mx-[50px] flex-col sm:flex-row sm:flex-wrap gap-x-10 gap-y-4 mt-[100px] md:mt-[175px]">
        <Button
          $status={selectedMenu === 0}
          onClick={(event) => menuClick(event)}
          id="0"
          className="w-fit "
        >
          What is TRACK?
        </Button>
        <Button
          $status={selectedMenu === 1}
          onClick={(event) => menuClick(event)}
          id="1"
          className="w-fit"
        >
          Adding Transactions
        </Button>
        <Button
          $status={selectedMenu === 2}
          onClick={(event) => menuClick(event)}
          id="2"
          className="w-fit"
        >
          Dashboard
        </Button>
        <Button
          $status={selectedMenu === 3}
          onClick={(event) => menuClick(event)}
          id="3"
          className="w-fit"
        >
          Transaction Page
        </Button>
      </div>
      <div
        id="menuContent"
        className="mt-8 min-h-[500px] mx-[20px] lg:mx-[100px]"
      >
        {selectedMenu === 0 ? <WhatIsMenu /> : null}
        {selectedMenu === 1 ? <AddingTransactions /> : null}
        {selectedMenu === 2 ? <DashboardMenu /> : null}
        {selectedMenu === 3 ? <TransactionMenu /> : null}
      </div>
    </div>
  );
}

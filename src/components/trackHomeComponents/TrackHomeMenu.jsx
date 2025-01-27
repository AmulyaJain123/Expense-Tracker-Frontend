import { useState } from "react";
import styled from "styled-components";
import WhatIsMenu from "./WhatIsMenu";
import AddingTransactions from "./AddingTransactions";
import DashboardMenu from "./DashboardMenu";
import TransactionMenu from "./TransactionMenu";

const Button = styled.button`
  font-weight: 600;
  border-bottom: ${(props) => {
    return props.$status === true ? "solid black 2px" : "solid white 2px";
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
    <div id="menu" className="max-w-[900px] mx-auto">
      <div className="flex justify-center items-center  text-sm flex-col sm:flex-row  mx-[50px] sm:flex-wrap gap-x-10 gap-y-3 smTab:gap-y-4 mt-[90px] tab:mt-[125px]">
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
      <div id="menuContent" className="mt-6 min-h-[300px] mx-auto ">
        {selectedMenu === 0 ? <WhatIsMenu /> : null}
        {selectedMenu === 1 ? <AddingTransactions /> : null}
        {selectedMenu === 2 ? <DashboardMenu /> : null}
        {selectedMenu === 3 ? <TransactionMenu /> : null}
      </div>
    </div>
  );
}

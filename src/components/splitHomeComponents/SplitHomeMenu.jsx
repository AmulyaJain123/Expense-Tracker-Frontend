import { useState } from "react";
import styled from "styled-components";
import HowItWorksMenu from "./HowItWorksMenu";
import FeaturesMenu from "./FeaturesMenu";

const Button = styled.button`
  font-weight: 600;
  border-bottom: ${(props) => {
    return props.$status === true ? "solid black 4px" : "solid white 4px";
  }};
  transition: all 200ms;
  padding: 0 1px;
`;

const menu = [];

export default function SplitHomeMenu() {
  const [selectedMenu, setSelectedMenu] = useState(1);

  function menuClick(event) {
    const num = parseInt(event.target.id);
    setSelectedMenu(num);
  }

  return (
    <div id="menu">
      <div className="flex sm:text-lg justify-center space-x-10 mt-[175px]">
        <Button
          $status={selectedMenu === 1}
          onClick={(event) => menuClick(event)}
          id="1"
          className=""
        >
          Features
        </Button>
        <Button
          $status={selectedMenu === 0}
          onClick={(event) => menuClick(event)}
          id="0"
          className=""
        >
          How it works
        </Button>
      </div>
      <div
        id="menuContent"
        className="mt-8 min-h-[300px]  mx-[50px] lg:mx-[100px]"
      >
        {selectedMenu === 0 ? <HowItWorksMenu /> : null}
        {selectedMenu === 1 ? <FeaturesMenu /> : null}
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import styled from "styled-components";
import { styling } from "../../util/styling";

const Main = styled.div`
  /* background-color: ${styling.friendsBoxBgCol}; */
`;

const Div = styled.div`
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 30px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 30px;
  }
`;

const Button = styled.button`
  background-color: ${styling.friendsButtonBgCol};
  border: solid 1px black;
  &:hover {
    background-color: white;
    color: black;
    transition: 200ms;
  }
`;

export default function Friends() {
  const friends = useSelector((state) => state.splitCreate.friends);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const friendName = useRef();
  const buttonRef = useRef();

  function checkForDuplicacy() {
    for (let i of friends) {
      if (i.name === friendName.current.value.trim()) {
        return true;
      }
    }
    return false;
  }

  function addFriendClick() {
    if (checkForDuplicacy() === true) {
      setError(
        "Names of 2 Participants cannot be same. Try Aliases or change Casing."
      );
      return;
    } else if (error != null) {
      setError(null);
    }
    const nameVal = friendName.current.value.trim();
    if (nameVal != "") {
      const name = nameVal;
      friendName.current.value = "";
      dispatch(splitCreateActions.addFriend({ name: name }));
    }
  }
  function removeClick(friend) {
    if (error != null) {
      setError(null);
    }
    dispatch(splitCreateActions.removeFriend({ name: friend }));
  }

  function changeHandler() {
    if (checkForDuplicacy() === true) {
      setError(
        "Names of 2 Participants cannot be same. Try Aliases or change Casing."
      );
      return;
    } else {
      setError(null);
    }
  }

  function keyDownHandle(event) {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (
    <Main className="rounded-lg flex flex-col min-w-[250px] bg-slate-100 p-2 sm:p-3  h-[350px] sm:h-[400px]">
      <span className="w-full py-[6px] bg-black text-white flex justify-center items-center rounded-md  text-[11px] sm:text-xs lg:text-sm font-semibold uppercase">
        Participants
      </span>

      <Div className="w-full text-stone-500 mt-3 rounded-lg  flex-grow p-2 sm:p-4 overflow-auto">
        {friends.length != 0 ? (
          <ul>
            {friends.map((obj, index) => {
              return (
                <li
                  className="mb-2 sm:mb-3 flex w-full text-[11px] sm:text-xs lg:text-sm"
                  key={obj.name}
                >
                  <div className="min-w-[26px] sm:min-w-[35px]">
                    <span className="bg-[white] flex justify-center items-center w-[21px] sm:w-[26px] h-[21px] sm:h-[26px] rounded-[4px] sm:rounded-md ">{`${
                      index + 1
                    }`}</span>
                  </div>

                  <span className="bg-[white] flex-grow mr-1 flex px-3 pr-1 items-center w-[21px] sm:w-[26px] h-[21px] sm:h-[26px] rounded-[4px] sm:rounded-md ">
                    <span>{obj.name}</span>
                    <button
                      onClick={() => {
                        removeClick(obj.name);
                      }}
                      className="ml-auto "
                    >
                      <i className="fi fi-ss-cross-circle text-xs sm:text-sm flex w-[21px] sm:w-[26px] h-[21px] sm:h-[26px] justify-center items-center"></i>
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-[11px] sm:text-xs lg:text-sm">
            No Participants added
          </p>
        )}
      </Div>
      <div
        style={{
          display: `${error === null ? "none" : "flex"}`,
        }}
        className="bg-red-300 items-center rounded-md p-[6px] px-3"
      >
        <i className="fi fi-rs-exclamation mr-[6px] text-[10px] sm:text-[11px] lg:text-xs flex justify-center items-center"></i>
        <p className="sm:text-[11px] text-[9px]">{error}</p>
      </div>
      <div className="flex mt-3 sm:text-xs text-[11px] lg:text-sm ">
        <input
          ref={friendName}
          onChange={changeHandler}
          onKeyDown={(event) => keyDownHandle(event)}
          maxLength={20}
          placeholder="Write Name"
          className="rounded-md px-3 py-[4px] sm:py-[6px] w-full mr-[6px]"
          type="text"
        />
        <button
          onClick={addFriendClick}
          ref={buttonRef}
          className="bg-[#9d4edd] rounded-md border-[1.5px] border-[#9d4edd] hover:bg-white hover:text-[#9d4edd] duration-500 text-white font-semibold text-xs sm:text-sm py-1 w-[60px] sm:w-[70px]"
        >
          ADD
        </button>
      </div>
    </Main>
  );
}

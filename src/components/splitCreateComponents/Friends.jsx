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
    width: 8px;
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
    <Main className="rounded-lg flex flex-col min-w-[250px] bg-slate-100 p-3  h-[500px]">
      <span className="w-full py-2 bg-black text-white flex justify-center items-center rounded-lg  text-sm sm:text-base xl:text-lg font-semibold uppercase">
        Participants
      </span>

      <Div className="w-full text-stone-500 mt-4 rounded-lg  flex-grow p-3 sm:p-6 overflow-auto">
        {friends.length != 0 ? (
          <ul>
            {friends.map((obj, index) => {
              return (
                <li
                  className="mb-4 flex w-full text-sm sm:text-base xl:text-lg"
                  key={obj.name}
                >
                  <div className="min-w-[40px] sm:min-w-[50px]">
                    <span className="bg-[white] flex justify-center items-center w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] rounded-lg ">{`${
                      index + 1
                    }`}</span>
                  </div>

                  <span className="bg-[white] flex-grow mr-4 flex px-4 items-center h-[30px] sm:h-[35px] rounded-lg ">
                    <span>{obj.name}</span>
                    <button
                      onClick={() => {
                        removeClick(obj.name);
                      }}
                      className="ml-auto "
                    >
                      <i className="fi fi-ss-cross-circle text-lg sm:text-xl flex h-[30px] sm:h-[35px] justify-center items-center"></i>
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm sm:text-base xl:text-lg">
            No Participants added
          </p>
        )}
      </Div>
      <div
        style={{
          display: `${error === null ? "none" : "flex"}`,
        }}
        className="bg-red-300 items-center rounded-lg p-2 px-4"
      >
        <i className="fi fi-rs-exclamation mr-2 text-sm sm:text-base xl:text-lg flex justify-center items-center"></i>
        <p className="sm:text-sm text-xs">{error}</p>
      </div>
      <div className="flex mt-4 sm:text-base text-sm xl:text-lg ">
        <input
          ref={friendName}
          onChange={changeHandler}
          onKeyDown={(event) => keyDownHandle(event)}
          maxLength={20}
          placeholder="Write Name"
          className="rounded-lg px-4 py-2 w-full mr-2"
          type="text"
        />
        <button
          onClick={addFriendClick}
          ref={buttonRef}
          className="bg-[#9d4edd] rounded-lg border-2 border-[#9d4edd] hover:bg-white hover:text-[#9d4edd] duration-500 text-white font-semibold text-lg py-1 w-[90px]"
        >
          ADD
        </button>
      </div>
    </Main>
  );
}

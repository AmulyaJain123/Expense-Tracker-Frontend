import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { splitCreateActions, vaultActions } from "../store/main";

export const Discard = styled.button`
  font-size: 1.25rem; /* text-xl */
  padding: 0.75rem; /* p-3 */
  padding-left: 1.25rem; /* px-5 */
  padding-right: 1.25rem; /* px-5 */
  border-width: 2px; /* border-2 */
  border-color: #ff4d6d; /* border-[#9d4edd] */
  display: flex; /* flex */
  align-items: flex-end; /* flex-end */
  font-weight: bold; /* font-bold */
  border-radius: 0.75rem; /* rounded-xl */
  background-color: #ff4d6d; /* bg-[#9d4edd] */
  color: #fff0f3; /* text-[#f7ebfd] */
  width: fit-content; /* w-fit */
  margin-left: 70px; /* mr-[70px] */
  margin-right: 70px; /* ml-auto */
  margin-top: 50px; /* mt-[50px] */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  transition: background-color 0.5s, transform 0.5s, color 0.5s; /* duration-500 */

  &:hover {
    background-color: #fff0f3; /* hover:bg-[#f7ebfd] */
    transform: scale(1.1); /* hover:scale-[110%] */
    color: #ff4d6d; /* hover:text-[#9d4edd] */
  }
`;

export default function DiscardButton({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function clickHandler() {
    dispatch(splitCreateActions.clearAll());
    navigate("/split");
  }
  return (
    <Discard className="scale-90 sm:scale-100" onClick={clickHandler}>
      {children}
    </Discard>
  );
}
export function DiscardBillButton({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function clickHandler() {
    dispatch(vaultActions.clearAll());
    navigate("/vault");
  }
  return <Discard onClick={clickHandler}>{children}</Discard>;
}

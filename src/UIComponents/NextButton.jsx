import styled from "styled-components";

export const Button = styled.button`
  font-size: 1.25rem; /* text-xl */
  padding: 0.75rem; /* p-3 */
  padding-left: 1.25rem; /* px-5 */
  padding-right: 1.25rem; /* px-5 */
  border-width: 2px; /* border-2 */
  border-color: #9d4edd; /* border-[#9d4edd] */
  display: flex; /* flex */
  align-items: flex-end; /* flex-end */
  font-weight: bold; /* font-bold */
  border-radius: 0.75rem; /* rounded-xl */
  background-color: #9d4edd; /* bg-[#9d4edd] */
  color: #f7ebfd; /* text-[#f7ebfd] */
  width: fit-content; /* w-fit */
  margin-right: 70px; /* mr-[70px] */
  margin-left: 70px; /* ml-auto */
  margin-top: 50px; /* mt-[50px] */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  transition: background-color 0.5s, transform 0.5s, color 0.5s; /* duration-500 */

  &:hover {
    background-color: #f7ebfd; /* hover:bg-[#f7ebfd] */
    transform: scale(1.1); /* hover:scale-[110%] */
    color: #9d4edd; /* hover:text-[#9d4edd] */
  }
`;
export const BackButton = styled.button`
  font-size: 1.25rem; /* text-xl */
  padding: 0.75rem; /* p-3 */
  padding-left: 1.25rem; /* px-5 */
  padding-right: 1.25rem; /* px-5 */
  border-width: 2px; /* border-2 */
  border-color: #9d4edd; /* border-[#9d4edd] */
  display: flex; /* flex */
  align-items: flex-start; /* flex-end */
  font-weight: bold; /* font-bold */
  border-radius: 0.75rem; /* rounded-xl */
  background-color: #9d4edd; /* bg-[#9d4edd] */
  color: #f7ebfd; /* text-[#f7ebfd] */
  width: fit-content; /* w-fit */
  margin-left: 70px; /* mr-[70px] */
  margin-right: 70px; /* ml-auto */
  margin-top: 50px; /* mt-[50px] */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  transition: background-color 0.5s, transform 0.5s, color 0.5s; /* duration-500 */

  &:hover {
    background-color: #f7ebfd; /* hover:bg-[#f7ebfd] */
    transform: scale(1.1); /* hover:scale-[110%] */
    color: #9d4edd; /* hover:text-[#9d4edd] */
  }
`;

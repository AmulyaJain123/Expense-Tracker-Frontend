import { Outlet } from "react-router-dom";
import Protection from "../components/authComponents/Protection";

export default function ProtectedRoute() {
  return (
    <>
      <Protection>
        <Outlet></Outlet>
      </Protection>
    </>
  );
}

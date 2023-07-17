import { Outlet } from "react-router-dom";
import AnimatedBG from "../components/AnimatedBG";

export default function LayoutLogin() {
  return (
    <>
      <AnimatedBG />
      <Outlet />
    </>
  );
}

import { Outlet } from "react-router-dom";
import AnimatedBG from "../components/AnimatedBG";
import { Image } from "react-bootstrap";

import Logo from "../assets/images/marketid-logo.png";
import "../assets/css/layouts.css";

export default function LayoutLogin() {
  return (
    <>
      <Image
        className="marketid_logo p-2 mx-2 my-1"
        src={Logo}
        alt="marketid-logo"
      />

      <AnimatedBG />
      <Outlet />
    </>
  );
}

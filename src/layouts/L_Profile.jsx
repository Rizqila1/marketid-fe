import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ProfileNavbarComponent from "../components/Profile/Prof_Navbar";

export default function LayoutProfile() {
  return (
    <>
      <ProfileNavbarComponent />

      <Container className="pt-5 pb-2">
        <Outlet />
      </Container>
    </>
  );
}

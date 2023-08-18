import { Container, Navbar } from "react-bootstrap";

export default function ProfileNavbarComponent() {
  return (
    <>
      <Navbar
        variant="dark"
        bg="primary"
        expand="md"
        className="position-fixed w-100"
        style={{ zIndex: "10" }}
      >
        <Container>
          <Navbar.Brand className="heading__4" href="/marketid">
            Market.ID
          </Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
    </>
  );
}

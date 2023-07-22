import { Button } from "react-bootstrap";
import "../../assets/css/product-page.css";

export default function ProductAboutUs() {
  return (
    <div>
      <Button
        href="/marketid/about"
        className="display_aboutus button_hover2 mt-3 me-3 d-flex align-items-center justify-content-around"
        style={{
          width: "17rem",
          padding: "1.7rem",
          border: "0.06rem solid #ACB5BD",
          boxShadow: "0rem 0.3rem 0.3rem 0rem #00000070",
        }}
        variant="light"
      >
        <h2 className="heading__2 m-0">About Us</h2>

        <i
          className="about_icon bi bi-arrow-right-circle-fill text-dark"
          style={{ fontSize: "2rem" }}
        ></i>
      </Button>
    </div>
  );
}

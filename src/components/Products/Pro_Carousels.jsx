import { Carousel } from "react-bootstrap";
import CarouselIMG1 from "../../assets/images/Carousel1.jpg";
import CarouselIMG2 from "../../assets/images/Carousel2.jpg";
import CarouselIMG3 from "../../assets/images/Carousel3.jpg";

export default function ProductCarousels() {
  return (
    <>
      <Carousel
        className="mt-4"
        style={{
          width: "100%",
          boxShadow:
            "0rem 0.25rem 0.25rem 0rem #00000040, 0rem 0.7rem 0.5rem 0rem #FEC10760",
        }}
      >
        <Carousel.Item>
          <img
            width="100%"
            height={400}
            alt="900x400"
            style={{ borderRadius: "0.5rem" }}
            src={CarouselIMG1}
          />
          <Carousel.Caption>
            <div className="bg-light" style={{ borderRadius: "0.5rem" }}>
              <h1
                className="heading__1"
                style={{
                  backgroundColor: "#fafafa",
                  backgroundSize: "2rem 2rem",
                  color: "black",
                  borderRadius: "0.5rem",
                }}
              >
                Various Stunning Decorations
              </h1>
            </div>
            <p
              className="paragraph__2"
              style={{
                textShadow:
                  "-1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000",
              }}
            >
              There are many stuff that you can find to make your house look
              better
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            width="100%"
            height={400}
            alt="900x400"
            style={{ borderRadius: "0.5rem" }}
            src={CarouselIMG2}
          />
          <Carousel.Caption>
            <div className="bg-light" style={{ borderRadius: "0.5rem" }}>
              <h1
                className="heading__1"
                style={{
                  backgroundColor: "#fafafa",
                  backgroundSize: "2rem 2rem",
                  color: "black",
                  borderRadius: "0.5rem",
                }}
              >
                Set Yourself To Looks Fly
              </h1>
            </div>

            <p
              className="paragraph__2"
              style={{
                textShadow:
                  "-1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000",
              }}
            >
              Clothes are one of the most uploaded product on Market.ID, Make
              sure you got atleast one of them
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            width="100%"
            height={400}
            alt="900x400"
            style={{ borderRadius: "0.5rem" }}
            src={CarouselIMG3}
          />
          <Carousel.Caption>
            <h1
              className="heading__1"
              style={{
                textShadow:
                  "-1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000",
              }}
            >
              <i className="fas fa-crown me-2" style={{ color: "#ffe53d" }}></i>
              The Most Expensive Product
            </h1>
            <p
              className="paragraph__2"
              style={{
                textShadow:
                  "-1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000",
              }}
            >
              The Bugatti Chiron 2020 is the most expensive product you can find
              on Market.ID
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

import { Carousel } from "react-bootstrap";
import CarouselIMG1 from "../../assets/images/Carousel1Ps.jpg";
import CarouselIMG2 from "../../assets/images/Carousel2Ps.jpg";
import CarouselIMG3 from "../../assets/images/Carousel3Ps.jpg";
import Content from "../../content/eng/pages_product.json";

export default function ProductCarousels() {
  return (
    <>
      <Carousel
        autoPlay={true}
        interval={5000}
        className="mt-4"
        style={{
          width: "100%",
          boxShadow:
            "0rem 0.25rem 0.25rem 0rem #00000050, 0rem 0.7rem 0.5rem 0rem #FEC10760",
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
                {Content.carousel1_title}
              </h1>
            </div>
            <p
              className="paragraph__2"
              style={{
                textShadow:
                  "-0.06rem -0.06rem 0.06rem #000, 0.06rem -0.06rem 0.06rem #000, -0.06rem 0.06rem 0.06rem #000, 0.06rem 0.06rem 0.06rem #000",
              }}
            >
              {Content.carousel1_description}
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
                {Content.carousel2_title}
              </h1>
            </div>

            <p
              className="paragraph__2"
              style={{
                textShadow:
                  "-0.06rem -0.06rem 0.06rem #000, 0.06rem -0.06rem 0.06rem #000, -0.06rem 0.06rem 0.06rem #000, 0.06rem 0.06rem 0.06rem #000",
              }}
            >
              {Content.carousel2_description}
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
                  "-0.06rem -0.06rem 0.06rem #000, 0.06rem -0.06rem 0.06rem #000, -0.06rem 0.06rem 0.06rem #000, 0.06rem 0.06rem 0.06rem #000",
              }}
            >
              <i className="fas fa-crown me-2" style={{ color: "#ffe53d" }}></i>
              {Content.carousel3_title}
            </h1>
            <p
              className="paragraph__2"
              style={{
                textShadow:
                  "-1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000",
              }}
            >
              {Content.carousel3_description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

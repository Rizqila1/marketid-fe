import { Card, Container, Placeholder } from "react-bootstrap";
import noImage from "../../assets/images/no-image.jpg";

export default function SkeletonCard() {
  return (
    <Card>
      <Container className="p-2 pb-0">
        <Card.Img
          className="img_product pb-0"
          variant="top"
          height="161"
          src={noImage}
        />
      </Container>
      <Card.Body className="ps-2 w-100 pe-2">
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={12} />
          <Placeholder xs={5} />
          <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

import { Card, Placeholder } from "react-bootstrap";
import noImage from "../../assets/images/no-image.jpg";

export default function SkeletonCard() {
  return (
    <Card>
      <Card.Img variant="top" src={noImage} />
      <Card.Body>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={12} />
          <Placeholder xs={5} />
          <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

import { Image } from "react-bootstrap";
import Icon from "../../assets/images/no-data.png";
import "../../assets/css/product-page.css";

export default function ProductNotFound(props) {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
        <h1 className="text-dark heading__1 opacity-75">{props.message}</h1>
        <br />
        <Image className="display_notfound pb-5" src={Icon} alt="no-data" />
      </div>
    </>
  );
}

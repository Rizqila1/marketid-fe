import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../config/httpsAxios";
import handleErrorMessage from "../utils/handleErrorMessage";

export default function AListGroup(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    const id = user._id;
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`/users/logout/${id}`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // return to login page
        window.location.href = "/marketid/login";
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }
  return (
    <ListGroup
      style={{
        boxShadow:
          "0.3rem 0.5rem 0.5rem 0rem #0391FC40, 0rem 0.3rem 0.3rem 0rem #00000040",
      }}
    >
      {props.selector.map((item, index) => (
        <ListGroup.Item
          className={item.name === "Logout" && "text-danger"}
          key={index}
          href={item.href}
          action={item.action}
          active={item.active}
          onClick={item.onClick && handleLogout}
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

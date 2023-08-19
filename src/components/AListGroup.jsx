import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../config/httpsAxios";
import handleErrorMessage from "../utils/handleErrorMessage";
import { useLocation } from "react-router-dom";

export default function AListGroup(props) {
  // STORE
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    const id = user._id;
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/logout/${id}`)
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

  const location = useLocation();

  function handleGoToLink(link) {
    window.location.href = link;
  }

  return (
    <ListGroup
      style={{
        boxShadow:
          "0.3rem 0.5rem 0.5rem 0rem #0391FC40, 0rem 0.3rem 0.3rem 0rem #00000040",
      }}
    >
      {props.menus.map((item, index) => (
        <ListGroup.Item
          key={`list-menu-${item.title}-${index}`}
          active={item.link === location.pathname}
          action
          onClick={() => handleGoToLink(item.link)}
        >
          {item.title}
        </ListGroup.Item>
      ))}
      <ListGroup.Item
        className="text-danger"
        action
        onClick={() => handleLogout()}
      >
        Logout
      </ListGroup.Item>
    </ListGroup>
  );
}

import { Navigate } from "react-router-dom";

const LayoutAuthorization = ({ auth, children }) => {
  const { token } = auth;
  if (!token) {
    return <Navigate to="/marketid/login" replace />;
  }
  return children;
};

export default LayoutAuthorization;

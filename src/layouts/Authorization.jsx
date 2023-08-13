import { Navigate, useLocation } from "react-router-dom";

const LayoutAuthorization = ({ auth, children }) => {
  const { token, user } = auth;
  const location = useLocation();
  const isPage = ["/marketid/login", "/marketid/register"].includes(
    location.pathname
  );

  // FOR ROLE ADMIN
  if (user.role && ["admin"].includes(user.role.name)) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    if (isPage) return children;
    return <Navigate to="/marketid/login" replace />;
  }

  if (!token) {
    if (isPage) return children;
    return <Navigate to="/marketid/login" replace />;
  }

  if (token && isPage) return <Navigate to="/marketid/home" replace />;

  return children;
};

const LayoutAuthVisitor = ({ auth, children }) => {
  const { token } = auth;
  const location = useLocation();
  const isLogin = ["/marketid"].includes(location.pathname);

  if (isLogin && !token) return children;
  if (token && isLogin) return <Navigate to="/marketid/home" replace />;
};

export { LayoutAuthorization, LayoutAuthVisitor };

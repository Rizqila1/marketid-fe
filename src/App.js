import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/css/app.css";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/c_Loading";
import "./assets/css/loading.css";

function App() {
  return (
    <>
      <Loading />
      <ToastContainer />
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}

export default App;

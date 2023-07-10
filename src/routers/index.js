import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE & AUTH
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App/>}>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
    </Route>
  )
)
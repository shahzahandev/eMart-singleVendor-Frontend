import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import MainRoot from "./MainRoot/MainRoot.jsx";

import Login from "./Component/Login";
import Registration from "./Component/Registration";
import HomePage from "./Component/HomePage";
import About from "./Component/About";
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import Forgot from "./Component/Forgot"
import ResetPassword from "./Component/ResetPassword"
import ProductDetails from "./Component/ProductDetails"
import ProductUpload from "./Component/ProductUpload"
import Card from "./Component/Card"

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    children: [
      { path: "/", Component: HomePage },
      { path: "/about", Component: About },
      { path: "/login", Component: Login },
      { path: "/register", Component: Registration },
      { path: "/footer", Component: Footer },
      { path: "/contact", Component: Contact },
      {path: "/forgot", Component: Forgot},
      {path: "/resetpass", Component: ResetPassword},
      {path: "/products", Component: ProductDetails},
      {path: "/upload", Component: ProductUpload},
      {path: "/card", Component: Card},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
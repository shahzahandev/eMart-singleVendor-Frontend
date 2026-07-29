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
import Card from "./Component/Card"
import SingleProduct from "./Component/Singleproduct.jsx"
import ProfileDashboard from "./Component/ProfileDashboard.jsx";
import AdminDashboard from "./Component/AdminDashboard.jsx";
import ShopByCategories from "./Component/ShopByCategories.jsx";
import OfficialPartners from "./Component/OfficialPartners.jsx";
import VerifyEmail from "./Component/VerifyEmail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    children: [
      { index: true, Component: HomePage },
      { path: "/about", Component: About },
      { path: "/login", Component: Login },
      { path: "/register", Component: Registration },
      { path: "/footer", Component: Footer },
      { path: "/contact", Component: Contact },
      { path: "/forgot", Component: Forgot},
      { path: "/resetpass", Component: ResetPassword},
      { path: "/products", Component: ProductDetails},
      { path: "/card", Component: Card},
      { path: "/singleProduct/:id", Component: SingleProduct},
      { path: "/profileDashboard", Component: ProfileDashboard},
      { path: "/admin", Component: AdminDashboard},
      { path: "/shopByCategories", Component: ShopByCategories},
      { path: "/partners", Component: OfficialPartners},
      { path: "/verifyemail/:token", Component: VerifyEmail}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
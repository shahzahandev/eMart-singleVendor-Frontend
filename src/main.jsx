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
import EmailVerification from "./Component/EmailVerification.jsx";
import ProductUpload from "./Component/ProductUpload.jsx";
import ProductUpdate from "./Component/ProductUpdate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    children: [
      { index: true, Component: HomePage },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "/products", Component: ProductDetails },
      { path: "/singleProduct/:id", Component: SingleProduct },
      { path: "/shopByCategories", Component: ShopByCategories },
      { path: "/partners", Component: OfficialPartners },
      { path: "/card", Component: Card },
      { path: "/footer", Component: Footer }, 

      // auth path------------
      { path: "/register", Component: Registration },
      { path: "/verifyemail/:token", Component: EmailVerification },
      { path: "/login", Component: Login },
      { path: "/forgot", Component: Forgot },
      { path: "/resetpassword/:token", Component: ResetPassword },
      { path: "/profileDashboard", Component: ProfileDashboard },

      // Admin path
      { path: "/admin", Component: AdminDashboard },
      { path: "/productUpload", Component: ProductUpload},
      { path: "/productUpdate/:id", Component: ProductUpdate },


    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
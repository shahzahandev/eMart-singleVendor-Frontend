import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

export default function MainRoot() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
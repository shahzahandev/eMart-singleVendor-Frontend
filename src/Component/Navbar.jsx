import { useEffect, useState } from "react";
import { RiContactsLine } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import { GiCrossMark } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";
import { TbH3 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Logo from "../assets/logo.png"

export default function Navbar(handleLogin) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Shop", path: "/products" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    const updateUser = () => {
      let data = JSON.parse(localStorage.getItem('userInfo'))
      setUserInfo(data)
    };
    updateUser(); // page load

    window.addEventListener("login", updateUser);
    window.addEventListener("logout", updateUser);
    window.addEventListener("profileUpdated", updateUser);

    return () => {
      window.removeEventListener("login", updateUser);
      window.removeEventListener("logout", updateUser);
      window.removeEventListener("profileUpdated", updateUser);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-slate-800 backdrop-blur">
      <nav className="mx-auto flex h-35 max-w-7xl items-center justify-between px-1 sm:px-6 lg:px-8">
        <a href="/" className="w-[40%] lg:w-[25%]">
          <div className="w-1/2">
            <img src={Logo} alt="" />
          </div>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-lg font-medium text-gray-400 transition hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <div className="text-[30px] font-medium text-gray-400 transition flex items-center justify-center ">
            {
              !userInfo
                ?
                <a href="/register" className="text-lg font-medium text-gray-400 transition hover:text-white flex justify-center items-center gap-2">
                  <FaUser />
                  <p className=" text-lg font-medium">Account</p>
                </a>
                :
                <a href="/profileDashboard" className="text-lg font-medium text-gray-400 transition hover:text-white flex justify-center items-center gap-2">
                  <FaUser />
                  <p className=" text-lg font-medium">{userInfo.name}</p>
                </a>
            }
          </div>
          <a
            href="/card"
            className="relative grid h-10 w-10 place-items-center transition text-gray-400 hover:text-white text-[40px] font-extrabold"
            aria-label="Cart"
          >
            <CiShoppingCart />
            <span className="absolute -right-3 -top-3 grid h-7 w-7 place-items-center rounded-full bg-sky-400 text-lg font-bold text-black">
              0
            </span>
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="bg-slate-600 grid h-10 w-10 place-items-center rounded-lg border border-slate-600 text-slate-900 lg:hidden"
          aria-label="Open menu"
        >
          {open ? (
            <span className="text-2xl font-extrabold leading-none">
              <GiCrossMark />
            </span>
          ) : (
            <span className="text-2xl font-extrabold leading-none">
              <FaBarsStaggered />
            </span>
          )}
        </button>
      </nav>

      {open && (
        <div className="flex items-center text-center flex-col justify-center  border-slate-300 bg-slate-800 px-4 py-4 lg:hidden gap-10">
          <div className="space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-lg font-bold hover:text-white text-gray-400"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-10 ">
            <div className="text-[30px] font-medium text-gray-400 transition flex items-center justify-center ">
              {
                !userInfo
                  ?
                  <a href="/register" className="text-lg font-medium text-gray-400 transition hover:text-white flex justify-center items-center gap-2">
                    <p className=" text-lg font-medium">Account</p>
                  </a>
                  :
                  <a href="/profileDashboard" className="text-lg font-medium text-gray-400 transition hover:text-white flex justify-center items-center gap-2">

                    <p className=" text-lg font-medium">{userInfo.name}</p>
                  </a>
              }
            </div>
            <a
              href="/card"
              className="relative grid h-10 w-10 place-items-center transition hover:text-sky-400 text-white text-[40px] font-bold"
              aria-label="Cart"
            >
              <CiShoppingCart className="text-4xl font-extrabold" />
              <span className="absolute -right-3 -top-2 grid h-7 w-7 place-items-center rounded-full bg-sky-400 text-lg font-bold text-black">
                0
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
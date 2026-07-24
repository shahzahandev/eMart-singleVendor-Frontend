import { useEffect, useState } from "react";
import { RiContactsLine } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import { GiCrossMark } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";
import { TbH3 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Shop", path: "/products" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const [userInfo, setUserInfo] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('userInfo')) || null;
  } catch {
    return null;
  }
});

  // useEffect(() => {
  //   let userDetails = JSON.parse(localStorage.getItem('userInfo'))
  //   setUserInfo(userDetails)
  // }, [])
  // console.log(userInfo);


  return (
    <header className="sticky top-0 z-50 border-b bg-slate-800 backdrop-blur">
      <nav className="mx-auto flex h-36 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div>
            <h1 className="text-[40px] font-bold leading-5 text-sky-400">
              E-Earbuds
            </h1>
          </div>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-lg font-medium text-gray-50 transition hover:text-sky-400"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="text-[30px] font-medium text-gray-50 transition flex items-center justify-center ">
            {
              !userInfo?.user ?
                <a href="/register" className="text-lg font-medium text-gray-50 transition hover:text-sky-400 flex justify-center items-center gap-2">
                  <FaUser />
                  <p className=" text-lg font-medium">Account</p>
                </a> :

                  <a href="/profileDashboard" className="text-lg font-medium text-gray-50 transition hover:text-sky-400 flex justify-center items-center gap-2">
                  <FaUser />
                  <p className=" text-lg font-medium">{userInfo.user.userName}</p>
                </a> 
            }

          </div>
          <a
            href="/card"
            className="relative grid h-10 w-10 place-items-center transition hover:text-sky-400 text-white text-[40px] font-extrabold"
            aria-label="Cart"
          >
            <CiShoppingCart />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-sky-400 text-[11px] font-bold text-black">
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
                className="block rounded-lg px-3 py-2 text-lg font-bold hover:text-sky-500 text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-10 ">
                <div className="text-[30px] font-medium text-gray-50 transition flex items-center justify-center ">
            {
              !userInfo?.user ?
                <a href="/register" className="text-lg font-medium text-gray-50 transition hover:text-sky-400 flex justify-center items-center gap-2">
             
                  <p className=" text-lg font-medium">Account</p>
                </a> :

                  <a href="/profileDashboard" className="text-lg font-medium text-gray-50 transition hover:text-sky-400 flex justify-center items-center gap-2">
                  
                  <p className=" text-lg font-medium">{userInfo.user.userName}</p>
                </a> 
            }

          </div>
            <a
              href="/card"
              className="relative grid h-10 w-10 place-items-center transition hover:text-sky-400 text-white text-[40px] font-bold"
              aria-label="Cart"
            >
              <CiShoppingCart className="text-4xl font-extrabold" />
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-sky-400 text-[11px] font-bold text-black">
                0
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
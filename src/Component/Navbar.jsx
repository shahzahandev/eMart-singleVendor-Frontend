import { useState } from "react";
import { RiContactsLine } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Shop", path: "/products" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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
          <div className="text-[30px] font-medium text-gray-50 transition hover:text-sky-400">
            <a href="/login">
          <RiContactsLine />
          </a>
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
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-400 text-slate-700 lg:hidden"
          aria-label="Open menu"
        >
          {open ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <span className="text-2xl leading-none">☰</span>
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-300 bg-slate-300 px-4 py-4 lg:hidden">
          <div className="space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-emerald-700 hover:text-white"
            >
              Login
            </a>

            <a
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Register
            </a>

            <a
              href="/cart"
              onClick={() => setOpen(false)}
              className="col-span-2 rounded-lg bg-slate-100 px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-emerald-700 hover:text-white"
            >
              Cart - 0
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
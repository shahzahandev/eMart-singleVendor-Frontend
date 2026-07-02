import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300 bg-slate-300 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-700 text-lg font-bold text-white">
            E
          </div>

          <div>
            <h1 className="text-lg font-bold leading-5 text-slate-900">
              EcoBazar
            </h1>
            <p className="text-xs font-medium text-slate-500">Ecommerce</p>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-700"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Register
          </a>

          <a
            href="/card"
            className="relative grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            aria-label="Cart"
          >
            🛒
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-700 text-[11px] font-bold text-white">
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
          <div className="space-y-1">
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
              className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700"
            >
              Login
            </a>

            <a
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Register
            </a>

            <a
              href="/cart"
              onClick={() => setOpen(false)}
              className="col-span-2 rounded-lg bg-slate-100 px-4 py-2 text-center text-sm font-semibold text-slate-700"
            >
              Cart - 0
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
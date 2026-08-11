import { href } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-800 px-4 pt-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-20 border-b border-white/10 pb-10 md:grid-cols-1 lg:grid-cols-3">
          <FooterColumn
            title="Company Information"
            links={[
              { name: "Home", href: "/" },
              { name: "All Products", href: "/products" },
              { name: "Card", href: "/card" },
              { name: "Contact", href: "/contact" },
              { name: "My Profile", href: "/profileDashboard" },
            ]}
          />
          <FooterColumn
            title="Customer"
            links={[
              { name: "Login", href: "/login" },
              { name: "Register", href: "/register" },
              { name: "Forgot Password", href: "/forgot" },
              { name: "Admin Dashboard", href: "/admin" },

            ]}
          />

          <div>
            <h3 className="text-2xl font-semibold uppercase tracking-widest">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm text-slate-400">
              <p className="text-lg text-slate-400" >e-earbuds516@gmail.com</p>
              <p className="text-lg text-slate-400" >+880 1700-110011</p>
              <p className="text-lg text-slate-400" >              License No: TRAD/CHTG/019582/2023
              </p>
              <p className="text-lg text-slate-400" >Dhanmondi, Dhaka, Bangladesh</p>
            </div>

            <div className="mt-15 flex gap-10">
              <a
                href="#"
                className="grid h-15 w-15 place-items-center rounded-lg bg-white/10 text-2xl font-extrabold hover:bg-sky-500"
              >
                f
              </a>
              <a
                href="#"
                className="grid h-15 w-15 place-items-center rounded-lg bg-white/10 text-2xl font-extrabold hover:bg-sky-500"
              >
                in
              </a>
              <a
                href="#"
                className="grid h-15 w-15 place-items-center rounded-lg bg-white/10 text-2xl font-extrabold hover:bg-sky-500"
              >
                x
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-5 md:text-lg text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 E-Earbuds. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold uppercase tracking-widest">{title}</h3>

      <ul className="mt-10 space-y-5">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-lg text-slate-400 transition hover:text-white"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
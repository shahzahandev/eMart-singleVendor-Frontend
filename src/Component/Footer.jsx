export default function Footer() {
  return (
    <footer className="bg-slate-950 px-4 pt-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-700 text-lg font-bold">
                E
              </div>

              <div>
                <h2 className="text-lg font-bold leading-5">EcoBazar</h2>
                <p className="text-xs text-slate-400">Ecommerce</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Fresh grocery, daily essentials, organic products, and trusted
              shopping experience for every customer.
            </p>
          </div>

          <FooterColumn
            title="Quick Links"
            links={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ]}
          />

          <FooterColumn
            title="Customer"
            links={[
              { name: "Login", href: "/login" },
              { name: "Register", href: "/register" },
              { name: "Forgot Password", href: "/forgot" },
              { name: "Reset Password", href: "/resetpass" },
              { name: "Card", href: "/card" },
              { name: "Orders", href: "/orders" },
              { name: "Product Upload", href: "/upload" },
            ]}
          />

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>support@ecobazar.com</p>
              <p>+880 1700-000000</p>
              <p>Dhaka, Bangladesh</p>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-sm font-bold hover:bg-emerald-700"
              >
                f
              </a>
              <a
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-sm font-bold hover:bg-emerald-700"
              >
                in
              </a>
              <a
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-sm font-bold hover:bg-emerald-700"
              >
                x
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EcoBazar Ecommerce. All rights reserved.</p>

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
      <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
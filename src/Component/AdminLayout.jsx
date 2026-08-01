import { LayoutGrid, Package, Users as UsersIcon, ShoppingBag, LogOut } from "lucide-react";
import Container from "./Container";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "products", label: "Products", icon: Package },
  { key: "users", label: "Users", icon: UsersIcon },
  { key: "orders", label: "Orders", icon: ShoppingBag },
];

export default function AdminLayout({ children, onLogout, active }) {
  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-10 bg-white text-black py-5 md:py-20 ">
        {/* Sidebar */}
        <aside className="md:w-[30%] shrink-0 flex-col justify-between border-r border-slate-200 px-6 py-8 md:flex">
          <div>
            <div className="mb-8 flex items-baseline gap-2 border-b border-slate-900 pb-4">
              <h1 className="text-xl font-bold">E-Earbuds</h1>
              <span className="text-sm text-slate-500">Admin</span>
            </div>

            <nav className="flex flex-col  gap-1">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                <a
                  key={key}
                  href="/admin"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium transition-colors ${active === key
                      ? "bg-sky-400 text-white"
                      : "text-slate-800 hover:bg-slate-100"
                    }`}
                >
                  <Icon size={18} />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <button
            onClick={() => onLogout?.()}
            className="flex items-center gap-2 border-t border-slate-200 pt-4 text-[15px] font-medium text-rose-500 hover:text-rose-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* Content */}
        <main className="md:w-[60%]">{children}</main>
      </div>
    </Container>
  );
}

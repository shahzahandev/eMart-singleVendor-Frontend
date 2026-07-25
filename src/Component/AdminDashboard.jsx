import { useState, useMemo } from "react";
import {
  LayoutGrid,
  Package,
  Users as UsersIcon,
  ShoppingBag,
  LogOut,
  Search,
  Eye,
  Trash2,
  Pencil,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";
import Container from "./Container";

/* ---------------- Sample data (swap with real API data) ---------------- */

const PRODUCTS = [
  { id: 1, title: "Wireless Noise-Cancelling Headphones", sku: "ELEC-HEAD-001", category: "Electronics", price: 4500, originalPrice: 6000, stock: 12, status: "Active", image: "🎧" },
  { id: 2, title: "Minimalist Leather Backpack", sku: "FASH-BAG-002", category: "Fashion", price: 3200, originalPrice: null, stock: 8, status: "Active", image: "🎒" },
  { id: 3, title: "Ceramic Pour-Over Coffee Set", sku: "HOME-COF-003", category: "Home & Living", price: 1800, originalPrice: 2400, stock: 20, status: "Active", image: "☕" },
  { id: 4, title: "The Design of Everyday Things", sku: "BOOK-UX-004", category: "Books", price: 950, originalPrice: null, stock: 35, status: "Pending", image: "📘" },
  { id: 5, title: "Matte Skincare Gift Set", sku: "BEAU-SKN-005", category: "Beauty", price: 2100, originalPrice: 2800, stock: 15, status: "Active", image: "🧴" },
  { id: 6, title: "Adjustable Yoga Mat & Strap", sku: "SPRT-YOG-006", category: "Sports", price: 1500, originalPrice: 2000, stock: 0, status: "Inactive", image: "🧘" },
];

const USERS = [
  { id: 1, name: "Ashraf Hossain", email: "ashraf@example.com", phone: "01712345678", role: "Customer", status: "Active", joined: "Mar 14, 2026" },
  { id: 2, name: "Nusrat Jahan", email: "nusrat@example.com", phone: "01898765432", role: "Customer", status: "Active", joined: "Apr 2, 2026" },
  { id: 3, name: "Tanvir Ahmed", email: "tanvir@example.com", phone: "01611223344", role: "Admin", status: "Active", joined: "Jan 20, 2026" },
  { id: 4, name: "Farhana Akter", email: "farhana@example.com", phone: "01555667788", role: "Customer", status: "Suspended", joined: "May 11, 2026" },
  { id: 5, name: "Rakibul Islam", email: "rakibul@example.com", phone: "01922334455", role: "Customer", status: "Active", joined: "Jun 18, 2026" },
];

const ORDERS = [
  { id: "ORD1001", customer: "Ashraf Hossain", email: "ashraf@example.com", date: "Jul 1, 2026", total: 5200, payment: "bKash", status: "Delivered" },
  { id: "ORD1002", customer: "Nusrat Jahan", email: "nusrat@example.com", date: "Jul 5, 2026", total: 3200, payment: "Cash on Delivery", status: "Shipped" },
  { id: "ORD1003", customer: "Rakibul Islam", email: "rakibul@example.com", date: "Jul 7, 2026", total: 1800, payment: "Card", status: "Processing" },
  { id: "ORD1004", customer: "Farhana Akter", email: "farhana@example.com", date: "Jun 20, 2026", total: 1500, payment: "Nagad", status: "Cancelled" },
  { id: "ORD1005", customer: "Tanvir Ahmed", email: "tanvir@example.com", date: "Jul 10, 2026", total: 600, payment: "bKash", status: "Processing" },
];

/* ---------------- Status badge styles ---------------- */

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Inactive: "bg-red-50 text-red-600",
  Suspended: "bg-red-50 text-red-600",
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-sky-50 text-sky-700",
  Processing: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-600",
  "Out of stock": "bg-red-50 text-red-600",
};

const STATUS_ICON = {
  Delivered: CheckCircle2,
  Shipped: Truck,
  Processing: Clock,
  Cancelled: XCircle,
};

function StatusBadge({ status }) {
  const Icon = STATUS_ICON[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}
    >
      {Icon && <Icon size={12} />}
      {status}
    </span>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border border-sky-400 px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-black bg-sky-400 text-white"
          : "border-slate-300 text-slate-700 hover:border-sky-400"
      }`}
    >
      {label}
    </button>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex h-11 w-full items-center gap-2 rounded-lg border border-slate-300 px-4 sm:w-72">
      <Search size={16} className="text-slate-400 shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-6 py-5">
      <Icon size={20} className="text-slate-700" />
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
}

/* ---------------- Nav config ---------------- */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "products", label: "Products", icon: Package },
  { key: "users", label: "Users", icon: UsersIcon },
  { key: "orders", label: "Orders", icon: ShoppingBag },
];

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

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
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium transition-colors ${
                  activeTab === key
                    ? "bg-sky-400 text-white"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
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
      <main className="md:w-[60%]">
        {activeTab === "dashboard" && <DashboardPanel />}
        {activeTab === "products" && <ProductsPanel />}
        {activeTab === "users" && <UsersPanel />}
        {activeTab === "orders" && <OrdersPanel />}
      </main>   
    </div>
    </Container>
  );
}

/* ---------------- Dashboard ---------------- */

function DashboardPanel() {
  return (
    <div>
      <h2 className="text-3xl font-bold">E-Earbuds</h2>
      <p className="mt-1 text-slate-500">Overview of your store.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Products" value={PRODUCTS.length} icon={Package} />
        <StatCard label="Total Users" value={USERS.length} icon={UsersIcon} />
        <StatCard label="Total Orders" value={ORDERS.length} icon={ShoppingBag} />
      </div>
    </div>   
  );
}

/* ---------------- Products ---------------- */

function ProductsPanel() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesFilter = filter === "All" || p.status === filter;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="mt-1 text-slate-500">{PRODUCTS.length} total products</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-black hover:text-slate-600">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by title or SKU..." />
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Pending", "Inactive"].map((s) => (
            <FilterButton key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-slate-100 last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg">
                    {p.image}
                  </span>
                  <span className="font-medium">{p.title}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{p.sku}</td>
                <td className="px-4 py-3 text-slate-500">{p.category}</td>
                <td className="px-4 py-3">
                  ৳{p.price.toLocaleString("en-US")}
                  {p.originalPrice && (
                    <span className="ml-1 text-xs text-slate-400 line-through">
                      ৳{p.originalPrice.toLocaleString("en-US")}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {p.stock === 0 ? (
                    <StatusBadge status="Out of stock" />
                  ) : (
                    p.stock
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 text-slate-500">
                    <button aria-label="Edit" className="hover:text-black">
                      <Pencil size={16} />
                    </button>
                    <button aria-label="Delete" className="hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Users ---------------- */

function UsersPanel() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return USERS.filter((u) => {
      const matchesFilter = filter === "All" || u.status === filter;
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Users</h2>
      <p className="mt-1 text-slate-500">{USERS.length} registered users</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Suspended"].map((s) => (
            <FilterButton key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-slate-100 last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {u.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500">{u.phone}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{u.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 text-slate-500">
                    <button aria-label="View" className="hover:text-black">
                      <Eye size={16} />
                    </button>
                    <button aria-label="Delete" className="hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Orders ---------------- */

function OrdersPanel() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const stats = useMemo(() => {
    const processing = ORDERS.filter((o) => o.status === "Processing").length;
    const shipped = ORDERS.filter((o) => o.status === "Shipped").length;
    const revenue = ORDERS.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + o.total, 0);
    return { processing, shipped, revenue };
  }, []);

  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      const matchesFilter = filter === "All" || o.status === filter;
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Orders</h2>
      <p className="mt-1 text-slate-500">Manage and track customer orders.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Orders" value={ORDERS.length} icon={Package} />
        <StatCard label="Processing" value={stats.processing} icon={Clock} />
        <StatCard label="Shipped" value={stats.shipped} icon={Truck} />
        <StatCard label="Revenue" value={`৳${stats.revenue.toLocaleString("en-US")}`} icon={CheckCircle2} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by order ID or customer..." />
        <div className="flex flex-wrap gap-2">
          {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
            <FilterButton key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-semibold">{o.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{o.customer}</p>
                  <p className="text-xs text-slate-500">{o.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-500">{o.date}</td>
                <td className="px-4 py-3">৳{o.total.toLocaleString("en-US")}</td>
                <td className="px-4 py-3 text-slate-500">{o.payment}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3">
                  <button aria-label="View order" className="text-slate-500 hover:text-black">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

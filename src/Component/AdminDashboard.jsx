import { useState, useMemo, useEffect } from "react";
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
import axios from "axios";
import UserDetails from "./UserDetails";
import { useNavigate } from "react-router-dom";

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

// Backend sends lowercase statuses ("pending", "shipped", ...) — normalize to
// Title Case so it matches STATUS_STYLES/STATUS_ICON and displays nicely.
function normalizeStatus(status) {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

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
      className={`rounded-lg border border-sky-400 px-4 py-2 text-sm font-medium transition-colors ${active
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

export default function AdminDashboard({ onLogout, }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Shared data — lifted up here so every panel can use it via props.
  const [userNum, setUserNum] = useState([]);
  const [products, setProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // get all users
  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(`http://localhost:5000/api/v1/user/allUser`);
        setUserNum(res.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  //=============
  const handleDelete = (id) => {
    async function getData() {
      let data = await axios.delete(`http://localhost:5000/api/v1/user/deleteUser/${id}`);
      setDeletedUsers((prev) => [...prev, id]);
      let res = await axios.get(`http://localhost:5000/api/v1/user/allUser`);
      setUserNum(res.data.users);
    }
    getData();
  }

  // get all products
  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(`http://localhost:5000/api/v1/product/allProduct`);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  // product delete
  const proDelete = (id) => {
    async function getData() {
      let res = await axios.delete(`http://localhost:5000/api/v1/product/deleteProduct/${id}`)
      setDeletedProduct((prev) => [...prev, id]);
      console.log(deletedProduct);

      let data = await axios.get(`http://localhost:5000/api/v1/product/allProduct`);
      setProducts(data.data.products);
    }
    getData();
  }

  // get all orders
  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(`http://localhost:5000/api/v1/order/allOrder`);
        setOrders(res.data.order);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium transition-colors ${activeTab === key
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
          {activeTab === "dashboard" && (
            <DashboardPanel products={products} userNum={userNum} orders={orders} />
          )}
          {activeTab === "products" && <ProductsPanel
            proDelete={proDelete}
            deletedProduct={deletedProduct}
            products={products}
          />}
          {activeTab === "users" &&
            (selectedUser ? (
              <UserDetails
                user={selectedUser}
                orders={orders}
                onBack={() => setSelectedUser(null)}
              />
            ) : (
              <UsersPanel
                users={userNum}
                handleDelete={handleDelete}
                deletedUsers={deletedUsers}
                onView={setSelectedUser}
              />
            ))}
          {activeTab === "orders" && <OrdersPanel orders={orders} users={userNum} />}
        </main>
      </div>
    </Container>
  );
}

/* ---------------- Dashboard ---------------- */

function DashboardPanel({ products, userNum, orders }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">E-Earbuds</h2>
      <p className="mt-1 text-slate-500">Overview of your store.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Products" value={products.length} icon={Package} />
        <StatCard label="Total Users" value={userNum.length} icon={UsersIcon} />
        <StatCard label="Total Orders" value={orders.length} icon={ShoppingBag} />
      </div>
    </div>
  );
}

/* ---------------- Products ---------------- */

function ProductsPanel({ products, proDelete, deletedProduct }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesFilter = filter === "All" || p.status === filter;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [products, filter, search]);

  const edit = (id) => {
    navigate(`/productUpdate/${id}`)
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="mt-1 text-slate-500">{products.length} total products</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-black hover:text-slate-600">
          <a href="/productUpload" className="flex items-center gap-2">
            <Plus size={16} />
            Add Product
          </a>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by title or SKU..." />
        <div className="flex flex-wrap gap-2">
          {["All", "active", "inactive"].map((s) => (
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

                    {deletedProduct.includes(p._id) ? (
                        <span className="rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                          Deleted
                        </span>
                    ) :
                      p.status === "inactive" ? (
                        <div>
                                   <button
                              onClick={() => edit(p._id)}
                              aria-label="Edit" className="hover:text-black">
                              <Pencil size={16} />
                            </button>
                                 <button
                            disabled
                            className="cursor-not-allowed rounded bg-red-100 px-3 py-1 text-red-600"
                          >
                            Deleted
                          </button>
                        </div>
                     
                      ) :
                        (
                          <div className="flex items-center gap-3 text-slate-500">
                            <button
                              onClick={() => edit(p._id)}
                              aria-label="Edit" className="hover:text-black">
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => proDelete(p._id)}
                              aria-label="Delete" className="hover:text-red-600">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )
                    }

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

function UsersPanel({ users, handleDelete, deletedUsers, onView }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesFilter = filter === "All" || u.status === filter;
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [users, filter, search]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Users</h2>
      <p className="mt-1 text-slate-500">{users.length} registered users</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
        <div className="flex flex-wrap gap-2">
          {["All", "active", "delete"].map((s) => (
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
                <td className="px-4 py-3 text-slate-500">{u.phone ? u.phone : "Not Avaiable"}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(u.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 text-slate-500">
                    <button
                      aria-label="View"
                      onClick={() => onView(u)}
                      className="hover:text-black"
                    >
                      <Eye size={16} />
                    </button>
                    {deletedUsers.includes(u._id) ? (
                      <span className="rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                        Deleted
                      </span>
                    ) : (
                      u.status === "delete" ? (
                        <button
                          disabled
                          className="cursor-not-allowed rounded bg-red-100 px-3 py-1 text-red-600"
                        >
                          Deleted
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      )
                    )}
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

function OrdersPanel({ orders, users }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const getCustomer = (order) => {
    const match = users.find(
      (u) => u._id === order.user || u.id === order.user
    );
    return {
      name: match?.name || order.user || "—",
      email: match?.email || null,
    };
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stats = useMemo(() => {
    const processing = orders.filter(
      (o) => normalizeStatus(o.status) === "Processing"
    ).length;
    const shipped = orders.filter(
      (o) => normalizeStatus(o.status) === "Shipped"
    ).length;
    const revenue = orders
      .filter((o) => normalizeStatus(o.status) !== "Cancelled")
      .reduce((sum, o) => sum + (o.totalPrice ?? 0), 0);
    return { processing, shipped, revenue };
  }, [orders]);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const status = normalizeStatus(o.status);
      const matchesFilter = filter === "All" || status === filter;

      const { name: customerName, email: customerEmail } = getCustomer(o);
      const haystack = [o.tranId, o._id, customerName, customerEmail]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter && haystack.includes(search.toLowerCase());
    });
  }, [orders, users, filter, search]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Orders</h2>
      <p className="mt-1 text-slate-500">Manage and track customer orders.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Orders" value={orders.length} icon={Package} />
        <StatCard label="Processing" value={stats.processing} icon={Clock} />
        <StatCard label="Shipped" value={stats.shipped} icon={Truck} />
        <StatCard label="Revenue" value={`৳${stats.revenue.toLocaleString("en-US")}`} icon={CheckCircle2} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by order ID or customer..." />
        <div className="flex flex-wrap gap-2">
          {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
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
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const { name: customerName, email: customerEmail } = getCustomer(o);
              const itemCount = o.product?.length ?? 0;

              return (
                <tr key={o._id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-semibold">{o.tranId || o._id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{customerName}</p>
                    {customerEmail && (
                      <p className="text-xs text-slate-500">{customerEmail}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(o.createdAt)}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-3">৳{(o.totalPrice ?? 0).toLocaleString("en-US")}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={normalizeStatus(o.status)} />
                  </td>
                  <td className="px-4 py-3">
                    <button aria-label="View order" className="text-slate-500 hover:text-black">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
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

import { useState } from "react";
import { User, Package, LogOut, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
    { key: "profile", label: "Profile", icon: User },
    { key: "orders", label: "My Order", icon: Package },
    { key: "logout", label: "Logout", icon: LogOut },
];

const SAMPLE_ORDERS = [
    {
        id: "ORD-10482",
        date: "12 Jul 2026",
        status: "Delivered",
        items: 3,
        total: 5400,
    },
    {
        id: "ORD-10437",
        date: "02 Jul 2026",
        status: "Processing",
        items: 1,
        total: 1800,
    },
    {
        id: "ORD-10391",
        date: "21 Jun 2026",
        status: "Cancelled",
        items: 2,
        total: 3200,
    },
];

const STATUS_STYLES = {
    Delivered: "bg-sky-50 text-sky-700 border-sky-200",
    Processing: "bg-black/5 text-black border-black/20",
    Cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default function ProfileDashboard({ onLogout }) {
    const [active, setActive] = useState("profile");
    let navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        postalCode: "",
        city: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile update:", formData);
    };

  const handleNavClick = (key) => {
    if (key === "logout") {
      setShowLogoutConfirm(true);
      return;
    }
    setActive(key);
  };

    const confirmLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            localStorage.removeItem('userInfo');
            navigate("/login");
        }
        setShowLogoutConfirm(false);
    };

    return (
        <div className="mx-auto max-w-5xl p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
                {/* Sidebar */}
                <aside className="rounded-2xl border border-black/10 bg-white p-3 md:p-4">
                    <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
                        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                            const isActive = active === key;
                            const isLogout = key === "logout";
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleNavClick(key)}
                                    className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors md:w-full ${isLogout
                                        ? "text-red-600 hover:bg-red-50"
                                        : isActive
                                            ? "bg-sky-400 text-black"
                                            : "text-black/70 hover:bg-black/5"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content */}
                <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-8">
                    {active === "profile" && (
                        <>
                            <h2 className="text-xl font-bold text-black">Profile</h2>
                            <p className="mt-1 text-sm text-black/60">
                                Update your personal information.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-black">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-black">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="example@email.com"
                                            className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-black">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+880 1XXXXXXXXX"
                                            className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-black">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-black">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            placeholder="Postal code"
                                            className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-sm font-medium text-black">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="House, road, area"
                                            className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-lg bg-sky-400 text-sm font-semibold text-black transition hover:bg-sky-500 sm:w-auto sm:px-8"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </>
                    )}

                    {active === "orders" && (
                        <>
                            <h2 className="text-xl font-bold text-black">My Order</h2>
                            <p className="mt-1 text-sm text-black/60">
                                Track and review your past orders.
                            </p>

                            <div className="mt-6 flex flex-col gap-4">
                                {SAMPLE_ORDERS.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col gap-4 rounded-xl border border-black/10 p-4 transition hover:border-sky-300 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                                                <Package size={18} />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-black">{order.id}</p>
                                                <p className="mt-1 flex items-center gap-1 text-xs text-black/50">
                                                    <Calendar size={12} />
                                                    {order.date} · {order.items} item
                                                    {order.items > 1 ? "s" : ""}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[order.status]}`}
                                            >
                                                {order.status}
                                            </span>
                                            <span className="text-sm font-bold text-black">
                                                ৳{order.total.toLocaleString("en-US")}
                                            </span>
                                            <button
                                                className="flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700"
                                                onClick={() => console.log("View order", order.id)}
                                            >
                                                Details
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-black">Log out?</h3>
                        <p className="mt-2 text-sm text-black/60">
                            Are you sure you want to log out?
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="h-11 flex-1 rounded-lg border border-black/20 text-sm font-semibold text-black transition hover:bg-black/5"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="h-11 flex-1 rounded-lg bg-sky-400 text-sm font-semibold text-black transition hover:bg-sky-500"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
} from "lucide-react";

const STATUS_STYLE = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-sky-100 text-sky-700",
  Cancelled: "bg-red-100 text-red-700",
};

const STATUS_ICON = {
  Delivered: CheckCircle2,
  Processing: Clock,
  Shipped: Truck,
  Cancelled: XCircle,
};

export default function UserDetails({ user, orders = [], onBack }) {
  const userOrders = orders.filter((o) => o.user === user._id);

  return (
    <div className="px-5">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm hover:text-sky-600"
      >
        <ArrowLeft size={16} />
        Back to Users
      </button>

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-4xl font-bold">{user.name}</h2>
          <div className="mt-2 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="mt-8 grid gap-6 lg:grid-cols-1">
        {/* Contact */}

        <div className="rounded-2xl border p-6">
          <h3 className="mb-6 text-2xl font-bold">
            Contact Information
          </h3>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>{user.phone || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>{user.address || "No Address"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} />
              <span>
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Orders */}

        <div className="rounded-2xl border p-6">
          <h3 className="mb-6 text-2xl font-bold">
            Order History
          </h3>

          {userOrders.length === 0 ? (
            <p className="text-slate-400">
              No Order Found
            </p>
          ) : (
            <div className="space-y-5">
              {userOrders.map((order) => {
                const Icon = STATUS_ICON[order.status];

                return (
                  <div
                    key={order._id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <h4 className="font-semibold">
                        {order.tranId}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <h4 className="font-bold">
                        ৳{order.totalPrice}
                      </h4>

                      <span
                        className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          STATUS_STYLE[order.status]
                        }`}
                      >
                        {Icon && <Icon size={12} />}
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
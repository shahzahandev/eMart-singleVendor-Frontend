import { useMemo, useState } from "react";

const initialCartItems = [
  {
    _id: "1",
    title: "Fresh Organic Apple",
    price: 180,
    discountPrice: 150,
    brand: "EcoBazar",
    category: "Fruits & Vegetables",
    subCategory: "Fresh Fruits",
    quantity: 2,
    images: [],
  },
  {
    _id: "2",
    title: "Premium Basmati Rice",
    price: 850,
    discountPrice: 790,
    brand: "Golden Grain",
    category: "Grocery",
    subCategory: "Rice",
    quantity: 1,
    images: [],
  },
  {
    _id: "3",
    title: "Fresh Dairy Milk",
    price: 90,
    discountPrice: 80,
    brand: "Farm Fresh",
    category: "Dairy",
    subCategory: "Milk",
    quantity: 3,
    images: [],
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const deliveryCharge = cartItems.length > 0 ? 60 : 0;

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.price) * item.quantity;
    }, 0);
  }, [cartItems]);

  const discountedSubtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const finalPrice = item.discountPrice || item.price;
      return total + Number(finalPrice) * item.quantity;
    }, 0);
  }, [cartItems]);

  const discount = subtotal - discountedSubtotal;
  const total = discountedSubtotal + deliveryCharge;

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-700 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
            EcoBazar Cart
          </p>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Your Shopping Cart
              </h1>
              <p className="mt-4 text-sm leading-7 text-emerald-50 sm:text-base">
                Review your selected products, update quantity, and continue to
                checkout.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-emerald-50">Cart Items</p>
              <p className="mt-1 text-2xl font-bold">{cartItems.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Cart Products
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {cartItems.length} product selected
                </p>
              </div>

              {cartItems.length > 0 && (
                <button
                  onClick={() => setCartItems([])}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onIncrease={() => increaseQuantity(item._id)}
                    onDecrease={() => decreaseQuantity(item._id)}
                    onRemove={() => removeItem(item._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center">
                <h3 className="text-lg font-bold text-slate-900">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Add products to your cart and they will appear here.
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

            <div className="mt-5 space-y-4 text-sm">
              <SummaryRow label="Subtotal" value={`৳${subtotal}`} />
              <SummaryRow label="Discount" value={`- ৳${discount}`} />
              <SummaryRow label="Delivery Charge" value={`৳${deliveryCharge}`} />

              <div className="border-t border-slate-200 pt-4">
                <SummaryRow
                  label="Total"
                  value={`৳${total}`}
                  large
                />
              </div>
            </div>

            <button
              disabled={cartItems.length === 0}
              className="mt-6 h-12 w-full rounded-lg bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Proceed to Checkout
            </button>

            <button className="mt-3 h-12 w-full rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-700">
              Continue Shopping
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const finalPrice = item.discountPrice || item.price;
  const itemTotal = Number(finalPrice) * item.quantity;

  return (
    <article className="grid gap-4 rounded-xl border border-slate-200 p-4 sm:grid-cols-[120px_1fr]">
      <div className="flex h-32 items-center justify-center rounded-xl bg-slate-100">
        {item.images?.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="mx-auto h-10 w-10 rounded-full bg-slate-200" />
            <p className="mt-2 text-xs font-medium text-slate-400">Image</p>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {item.brand} • {item.category} • {item.subCategory}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-lg font-bold text-emerald-700">
                ৳{finalPrice}
              </span>

              {item.discountPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ৳{item.price}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onRemove}
            className="w-fit rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit items-center rounded-lg border border-slate-300">
            <button
              onClick={onDecrease}
              className="grid h-10 w-10 place-items-center text-lg font-bold text-slate-600 hover:bg-slate-100"
            >
              -
            </button>

            <span className="grid h-10 w-12 place-items-center border-x border-slate-300 text-sm font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={onIncrease}
              className="grid h-10 w-10 place-items-center text-lg font-bold text-slate-600 hover:bg-slate-100"
            >
              +
            </button>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-500">Item Total</p>
            <p className="text-lg font-bold text-slate-900">৳{itemTotal}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function SummaryRow({ label, value, large = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={large ? "text-base font-bold text-slate-900" : "text-slate-600"}>
        {label}
      </span>
      <span className={large ? "text-xl font-bold text-emerald-700" : "font-semibold text-slate-900"}>
        {value}
      </span>
    </div>
  );
}
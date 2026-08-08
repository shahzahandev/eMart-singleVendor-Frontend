import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/v1/product/allActiveProduct";
// Backend origin — images come back as relative paths ("/upload/xyz.jpg"),
// so this gets prepended to build a loadable <img src>.
const API_ORIGIN = "http://localhost:5000";

function imageSrc(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_ORIGIN}${url}`;
}

// Counts down to any given date. Returns null once that date has passed.
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const target = new Date(targetDate).getTime();

    const tick = () => {
      const diff = target - Date.now();

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        const productList = data.products || data.data || data;

        setProducts(Array.isArray(productList) ? productList : []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 py-5 text-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-medium sm:text-4xl lg:text-5xl">
                Explore Bestsellers
              </h1>
            </div>
            <div className="rounded-xl bg-white border border-slate-300 px-5 py-4 backdrop-blur">
              <p className="text-sm text-black">Total Products</p>
              <p className="mt-1 text-2xl font-bold">{products.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4  md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-6 inline-block px-3 py-1 text-2xl">
                All <span className="font-extrabold">Products</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search product..."
                className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 sm:w-64"
              />
            </div>
          </div>

          {loading && (
            <p className="text-center text-slate-500 py-10">Loading products...</p>
          )}

          {error && (
            <p className="text-center text-red-500 py-10">
              Failed to load products: {error}
            </p>
          )}

          {!loading && !error && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product }) {
  const hasDiscount = product.discountPrice && Number(product.discountPrice) < Number(product.price);

  const discountPct = hasDiscount
    ? Math.round(100 - (Number(product.discountPrice) / Number(product.price)) * 100)
    : null;

  const mainImage = product.images?.find((img) => img.isMain) || product.images?.[0];

  const now = Date.now();
  const startsAt = product.discountStartDate ? new Date(product.discountStartDate).getTime() : null;
  const endsAt = product.discountEndDate ? new Date(product.discountEndDate).getTime() : null;

  const notStartedYet = startsAt && now < startsAt;
  const discountActive = startsAt && endsAt && now >= startsAt && now <= endsAt;

  // Not started yet -> count down to the start date. Active -> count down to the end date.
  const timeLeft = useCountdown(
    notStartedYet ? product.discountStartDate : discountActive ? product.discountEndDate : null
  );

  return (
    <Link to={`/singleProduct/${product._id}`} state={{ product }}>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
        <div className="relative flex h-65 items-center justify-center overflow-hidden bg-slate-100">
          {mainImage ? (
            <img
              src={imageSrc(mainImage.url)}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-slate-200" />
              <p className="mt-3 text-sm font-medium text-slate-400">Product Image</p>
            </div>
          )}

          {timeLeft && (
            <div className="absolute right-3 top-3 rounded-lg bg-sky-800 px-2.5 py-1.5 text-center text-white backdrop-blur">
              <p className="text-[10px] font-medium uppercase tracking-wide text-white/90">
                {notStartedYet ? "Offer starts in" : "Offer ends in"}
              </p>
              <p className="font-mono text-sm font-bold leading-tight">
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
              </p>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {product.category}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {product.subCategory}
            </span>
            <span
              className={`font-semibold ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"
                }`}
            >
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </span>
          </div>
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{product.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">{product.shortDescription}</p>
          <div className="mt-4 flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-sm font-medium text-slate-400 line-through">৳{product.price}</span>
                <span className="text-xl font-bold text-slate-800">৳{product.discountPrice}</span>
                <span className="text- font-bold text-sky-600 px-2 py-0.5 rounded-full">
                  -{discountPct}% off
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-slate-800">৳{product.price}</span>
            )}
          </div>
          <button className="mt-5 h-11 w-full rounded-lg bg-sky-500 text-lg font-bold text-white hover:bg-sky-600  cursor-pointer">
            View Details
          </button>
        </div>
      </article>
    </Link>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="shrink-0 text-slate-500 font-bold ">{label}</span>
      <span className="line-clamp-1 text-right text-slate-700">{value || "N/A"}</span>
    </div>
  );
}

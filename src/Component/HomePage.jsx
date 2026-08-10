const API_URL = "https://emart-singlevendor-backend-6.onrender.com/api/v1/product/allActiveProduct";
const API_ORIGIN = "https://emart-singlevendor-backend-6.onrender.com";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Products from "./ProductDetails";
import About from "./About";
import Contact from "./Contact";
import ImageSlider from "./ImageSlider";
import axios from "axios";
import ShopByCategories from "./ShopByCategories";
import OfficialPartners from "./OfficialPartners";
import Container from "./Container";
import Image from "./Image"
import DiscountProducts from "./DiscountProduct";




export default function Home() {
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

        setProducts(Array.isArray(productList) ? productList.slice(0, 3) : []);
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
    <div>
      <ImageSlider></ImageSlider>
      <ShopByCategories></ShopByCategories>
      <OfficialPartners></OfficialPartners>
        <main className="min-h-screen bg-white">
          <section className="md:px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="mb-6 inline-block font-semibold px-3 py-1 text-2xl">
                    Latest <span className="font-extrabold">Products</span>
                  </h2>
                </div>
                <a className="" href="/products">
                  <button className="cursor-pointer w-fit rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-black hover:bg-sky-400">
                    View All
                  </button>
                </a>
              </div>

              <div className="grid gap-5  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </main>

      <Products></Products>
      <DiscountProducts></DiscountProducts>
      <Image></Image>
      <About></About>
      <Contact></Contact>
    </div>

  );
}

function imageSrc(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_ORIGIN}${url}`;
}

// Counts down to `endDate`. Returns null once the countdown has finished.
function useCountdown(endDate) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!endDate) {
      setTimeLeft(null);
      return;
    }

    const target = new Date(endDate).getTime();

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
  }, [endDate]);

  return timeLeft;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function ProductCard({ product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(100 - (Number(product.discountPrice) / Number(product.price)) * 100)
    : null;

  const mainImage =
    product.images?.find((img) => img.isMain) || product.images?.[0];

  const now = Date.now();
  const startsAt = product.discountStartDate ? new Date(product.discountStartDate).getTime() : null;
  const endsAt = product.discountEndDate ? new Date(product.discountEndDate).getTime() : null;
  const discountActive = startsAt && endsAt && now >= startsAt && now <= endsAt;

  const timeLeft = useCountdown(discountActive ? product.discountEndDate : null);



  return (
    <Link to={`/singleProduct/${product._id}`} state={{ product }}>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-gray-200 shadow-sm transition hover:shadow-lg">
        <div className="relative flex h-85 items-center justify-center overflow-hidden bg-gray-200">
          {mainImage ? (
            <img
              src={imageSrc(mainImage.url)}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-110 rounded-2xl"
            />
          ) : (
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-slate-200" />
              <p className="mt-3 text-sm font-medium text-slate-400">Product Image</p>
            </div>
          )}

          {timeLeft && (
            <div className="absolute right-3 top-3 rounded-lg bg-slate-200 px-2.5 py-1.5 text-center text-red-600 backdrop-blur">
              <p className="text-[10px] font-medium uppercase tracking-wide text-red-600">
                Offer ends in
              </p>
              <p className="font-mono text-sm font-bold leading-tight">
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
              </p>
            </div>
          )}
        </div>
        <div className="px-0 pt-2">
          <h3 className="line-clamp-1 px-2 text-lg font-medium text-slate-900">{product.title}</h3>
          <div className="mt-4 px-2 flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-sm font-medium text-slate-400 line-through">৳{product.price}</span>
                <span className="text-xl font-bold text-black">৳{product.discountPrice}</span>
                <span className="text- font-bold text-sky-600 px-2 py-0.5 rounded-full">
                  -{discountPct}% off
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-emerald-700">৳{product.price}</span>
            )}
          </div>
          <button className="mt-5 h-15 w-full bg-sky-500 text-lg font-bold text-white  hover:bg-sky-600 cursor-pointer">
            Choose Option
          </button>
        </div>
      </article>
    </Link>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="shrink-0 font-medium text-slate-500">{label}</span>
      <span className="text-right text-slate-700">{value || "N/A"}</span>
    </div>
  );
}

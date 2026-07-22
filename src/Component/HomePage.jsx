const API_URL = "https://emart-singlevendor-backend-3.onrender.com/api/v1/product/allProduct";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Products from "./ProductDetails";
import About from "./About";
import Contact from "./Contact";
import ImageSlider from "./ImageSlider";


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
      <main className="min-h-screen bg-slate-50">
        <section className="px-4 py-4 text-gray-900 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className=" max-w-2xl">
              <h1 className="text-3xl font-medium tracking-widest sm:text-4xl lg:text-5xl">
                Find Your Vibe            
              </h1>
            </div>
          </div>
        </section>

        <section className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-medium text-slate-900">
                  Latest Products
                </h2>
              </div>
              <a className="" href="/products">
                <button className="cursor-pointer w-fit rounded-lg border border-black px-4 py-2.5 text-sm font-semibold text-black hover:bg-slate-200">
                  View All
                </button>
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Products></Products>
      <About></About>
      <Contact></Contact>
    </div>

  );
}

function ProductCard({ product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <Link to={`/singleProduct/${product._id}`} state={{ product }}>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-85 items-center justify-center bg-slate-100">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-slate-200" />
              <p className="mt-3 text-sm font-medium text-slate-400">Product Image</p>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="line-clamp-1 text-lg font-medium text-slate-900">{product.title}</h3>
          <div className="mt-4 flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-black">৳{product.discountPrice}</span>
                <span className="text-sm font-medium text-slate-400 line-through">৳{product.price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-emerald-700">৳{product.price}</span>
            )}
          </div>
          <button className="mt-5 h-11 w-full rounded-lg bg-sky-500 text-lg font-bold text-white hover:bg-sky-600 cursor-pointer">
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
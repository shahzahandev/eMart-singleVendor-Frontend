import { useEffect, useState } from "react";
const API_URL = "https://emart-singlevendor-backend-3.onrender.com/api/v1/product/allProduct";

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
  <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-700 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Shop fresh and daily essential products
              </h1>
            </div>
            <div className="rounded-xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-emerald-50">Total Products</p>
              <p className="mt-1 text-2xl font-bold">{products.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">All Products</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search product..."
                className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 sm:w-64"
              />
              <select className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100">
                <option>All Categories</option>
                <option>Fruits & Vegetables</option>
                <option>Grocery</option>
                <option>Dairy</option>
                <option>Beverages</option>
              </select>
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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  const hasDiscount =
    product.discountPrice && Number(product.discountPrice) < Number(product.price);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-48 items-center justify-center bg-slate-100">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]?.url || product.images[0]}
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
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {product.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
           {product.subCategory}
          </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-emerald-700">
           stock {product.stock}
          </span>

        </div>
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{product.shortDescription}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-center gap-3">
          {hasDiscount ? (
            <>
              <span className="text-xl font-bold text-emerald-700">৳{product.discountPrice}</span>
              <span className="text-sm font-medium text-slate-400 line-through">৳{product.price}</span>
            </>
          ) : (
            <span className="text-xl font-bold text-emerald-700">৳{product.price}</span>
          )}
        </div>
        <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <Info label="Brand" value={product.brand} />
          <Info label="Info" value={product.additionalInfo} />
        </div>
        <button className="mt-5 h-11 w-full rounded-lg bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </article>
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
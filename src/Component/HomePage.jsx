const API_URL = "https://emart-singlevendor-backend-3.onrender.com/api/v1/product/allProduct";
import { useEffect, useState } from "react";


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
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-700 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mt-3 max-w-2xl">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Fresh grocery products for your daily needs
            </h1>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Latest Products
              </h2>
            </div>
            <a className="" href="/products">
              <button className="cursor-pointer w-fit rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
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
  );
}

function ProductCard({ product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-52 items-center justify-center bg-slate-100">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-slate-200" />
            <p className="mt-3 text-sm font-medium text-slate-400">
              Product Image
            </p>
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

        <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>

        <p className="mt-2 text-sm font-medium text-slate-500">
          {product.shortDescription}
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-3">
          {hasDiscount ? (
            <>
              <span className="text-xl font-bold text-emerald-700">
                ৳{product.discountPrice}
              </span>
              <span className="text-sm font-medium text-slate-400 line-through">
                ৳{product.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-emerald-700">
              ৳{product.price}
            </span>
          )}
        </div>

        <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <Info label="Brand" value={product.brand} />
          <Info label="Category" value={product.category} />
          <Info label="Sub Category" value={product.subCategory} />
          <Info
            label="Additional Info"
            value={product.additionalInfo}
          />
        </div>

        <button className="mt-5 h-11 w-full rounded-lg bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800">
          Add to Cart
        </button>
      </div>
    </article>
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
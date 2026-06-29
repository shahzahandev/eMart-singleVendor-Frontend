const products = [
  {
    _id: "1",
    title: "Fresh Organic Apple",
    description:
      "Fresh organic apples collected from trusted farms. Perfect for healthy snacks, juice, and daily nutrition.",
    shortDescription: "Fresh and sweet organic apple.",
    price: 180,
    discountPrice: 150,
    brand: "EcoBazar",
    category: "Fruits & Vegetables",
    subCategory: "Fresh Fruits",
    additionalInformation: "Weight: 1kg, Origin: Local Farm, Quality: Premium",
    images: [],
  },
  {
    _id: "2",
    title: "Premium Basmati Rice",
    description:
      "Long grain premium basmati rice with natural aroma. Suitable for biryani, pulao, and daily meals.",
    shortDescription: "Long grain aromatic basmati rice.",
    price: 850,
    discountPrice: 790,
    brand: "Golden Grain",
    category: "Grocery",
    subCategory: "Rice",
    additionalInformation: "Weight: 5kg, Type: Basmati, Packaging: Sealed Pack",
    images: [],
  },
  {
    _id: "3",
    title: "Fresh Dairy Milk",
    description:
      "Pure dairy milk processed with hygiene and freshness. Great for tea, coffee, desserts, and everyday use.",
    shortDescription: "Pure fresh dairy milk.",
    price: 90,
    discountPrice: 80,
    brand: "Farm Fresh",
    category: "Dairy",
    subCategory: "Milk",
    additionalInformation: "Volume: 1L, Storage: Keep refrigerated",
    images: [],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-700 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
            EcoBazar Ecommerce
          </p>

          <div className="mt-3 max-w-2xl">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Fresh grocery products for your daily needs
            </h1>
            <p className="mt-4 text-sm leading-6 text-emerald-50 sm:text-base">
              Browse organic fruits, grocery items, dairy products, beverages,
              and more from EcoBazar.
            </p>
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
              <p className="mt-1 text-sm text-slate-500">
                All uploaded product information will show here.
              </p>
            </div>

            <button className="w-fit rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
              View All
            </button>
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
            value={product.additionalInformation}
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
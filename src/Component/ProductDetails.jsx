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
  {
    _id: "4",
    title: "Organic Tomato",
    description:
      "Fresh red tomatoes perfect for salad, curry, sauce, and everyday cooking.",
    shortDescription: "Fresh local organic tomato.",
    price: 120,
    discountPrice: 100,
    brand: "Eco Farm",
    category: "Fruits & Vegetables",
    subCategory: "Fresh Vegetables",
    additionalInformation: "Weight: 1kg, Quality: Fresh, Origin: Local Farm",
    images: [],
  },
  {
    _id: "5",
    title: "Pure Mustard Oil",
    description:
      "Pure mustard oil with strong aroma and traditional taste for everyday cooking.",
    shortDescription: "Aromatic pure mustard oil.",
    price: 240,
    discountPrice: 220,
    brand: "Natural Gold",
    category: "Grocery",
    subCategory: "Oil",
    additionalInformation: "Volume: 1L, Type: Mustard Oil, Packaging: Bottle",
    images: [],
  },
  {
    _id: "6",
    title: "Fresh Yogurt Cup",
    description:
      "Creamy and smooth yogurt made from fresh milk. Great for dessert and snacks.",
    shortDescription: "Creamy fresh yogurt.",
    price: 70,
    discountPrice: 60,
    brand: "Farm Fresh",
    category: "Dairy",
    subCategory: "Yogurt",
    additionalInformation: "Weight: 250g, Storage: Keep refrigerated",
    images: [],
  },
  {
    _id: "7",
    title: "Green Tea Pack",
    description:
      "Refreshing green tea for daily wellness, energy, and a calming tea break.",
    shortDescription: "Refreshing daily green tea.",
    price: 320,
    discountPrice: 290,
    brand: "Tea Valley",
    category: "Beverages",
    subCategory: "Tea",
    additionalInformation: "Pack: 100g, Type: Green Tea, Origin: Sylhet",
    images: [],
  },
  {
    _id: "8",
    title: "Mixed Spices Pack",
    description:
      "Aromatic mixed spices for curry, meat, vegetables, and traditional recipes.",
    shortDescription: "Aromatic cooking spices.",
    price: 160,
    discountPrice: 140,
    brand: "Spice House",
    category: "Grocery",
    subCategory: "Spices",
    additionalInformation: "Weight: 200g, Packaging: Sealed Pack",
    images: [],
  },
];

export default function Products() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-700 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
            EcoBazar Products
          </p>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Shop fresh and daily essential products
              </h1>

              <p className="mt-5 text-sm leading-7 text-emerald-50 sm:text-base">
                Browse grocery, fruits, vegetables, dairy, beverages, and more
                from EcoBazar.
              </p>
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
              <h2 className="text-xl font-bold text-slate-900">
                All Products
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                6-8 product card same design e show kora hoyeche.
              </p>
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  const hasDiscount =
    product.discountPrice && Number(product.discountPrice) < Number(product.price);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-48 items-center justify-center bg-slate-100">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-slate-200" />
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

        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
          {product.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.shortDescription}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
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

        <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <Info label="Brand" value={product.brand} />
          <Info label="Info" value={product.additionalInformation} />
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
      <span className="line-clamp-1 text-right text-slate-700">
        {value || "N/A"}
      </span>
    </div>
  );
}
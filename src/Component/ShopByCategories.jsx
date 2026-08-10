import categoryANC from "../assets/air.png";
import categoryENC from "../assets/air-v2.webp";
import categoryCharger from "../assets/charger.webp";
import categoryCable from "../assets/cable.webp";
import Container from "./Container";

const CATEGORIES = [
  { id: 1, name: "ANC Earbuds", image: categoryANC },
  { id: 2, name: "ENC Earbuds", image: categoryENC },
  { id: 3, name: "Charger", image: categoryCharger },
  { id: 4, name: "Cable", image: categoryCable },
];

export default function ShopByCategories() {
  return (
    <section className="py-10 md:py-14 lg:py-14 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Shop By Categories
          </h2>

          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#0071e3]"></div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 md:gap-2 sm:grid-cols-2 md:grid-cols-4 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="text-center text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-[#0071e3] sm:text-base lg:text-lg">
                  {cat.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
    </section>
  );
}
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
        <Container>
            <section className="px-4 py-8 sm:px-6 lg:px-10">
                <h2 className="mb-6 inline-block px-3 py-1 text-2xl">
                    Shop By <span className="font-extrabold">Categories</span>
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {CATEGORIES.map((cat) => (
                        <a
                            key={cat.id}
                            href={`/products?category=${encodeURIComponent(cat.name)}`}
                            className="group flex flex-col overflow-hidden rounded-lg"
                        >
                            <div className="flex h-60 items-center justify-center overflow-hidden bg-white sm:h-48">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                                />
                            </div>
                            <div className="bg-sky-200 py-3 text-center text-lg font-bold text-slate-800 transition-colors group-hover:bg-sky-400 sm:text-base">
                                {cat.name}
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </Container>
    );
}

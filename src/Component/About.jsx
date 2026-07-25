export default function About() {
  const features = [
    {
      title: "Fresh Products",
      description:
        "We focus on fresh grocery, fruits, vegetables, dairy, and daily essentials.",
    },
    {
      title: "Trusted Quality",
      description:
        "Every product is selected carefully so customers can shop with confidence.",
    },
    {
      title: "Fast Delivery",
      description:
        "EcoBazar aims to deliver daily needs quickly and safely to your doorstep.",
    },
  ];

  const stats = [
    { value: "500+", label: "Products" },
    { value: "50+", label: "Brands" },
    { value: "1K+", label: "Happy Customers" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Who We Are
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              ICE is a Bangladeshi consumer electronics brand with the purpose of impacting people’s daily lives using technology.
              We fuse sleek design with precision power to create tools that help you unlock your better self. Whether you're chasing deadlines, dreams, or dopamine, ICE gives you the edge to rise higher, perform better, and own your moment.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Customers can browse product details like title, description,
              price, discount price, brand, category, sub-category, and
              additional information before making a purchase decision.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-sky-50 p-4"
                >
                  <p className="text-2xl font-bold text-sky-300">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Our Mission
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Our mission is to provide a clean, trustworthy, and customer
              friendly online grocery shopping system where product information
              is easy to understand and checkout feels simple.
            </p>

            <div className="mt-6 rounded-xl bg-sky-50 p-5">
              <p className="text-sm font-semibold text-black">
                E-Earbuds Promise
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fresh products, fair prices, clear details, and better service
                for every customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Why Choose E-Earbuds?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We care about product quality, simple design, and customer trust.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-sky-100 text-xl">
                  ✓
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
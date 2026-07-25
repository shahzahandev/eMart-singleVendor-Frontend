import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in name, email, and message.");
      return;
    }

    console.log("Contact Message:", formData);
    alert("Message sent successfully!");
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 py-14 text-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mt-4 max-w-3xl">
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              We are here to help you
            </h1>

            <p className="mt-5 text-sm leading-7 text-black sm:text-base">
              Have questions about products, delivery, orders, or support?
              Send us a message and our E-Earbuds team will contact you soon.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Send Message
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill out the form below and we will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Order or product related question"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-sky-400 text-sm font-semibold text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 sm:w-auto sm:px-8"
              >
                Send Message
              </button>
            </form>
          </div>

          <aside className="space-y-5">
            <InfoCard
              title="Customer Support"
              value="e-earbuds@ecobazar.com"
              description="For order, delivery, and product support."
            />

            <InfoCard
              title="Phone"
              value="+880 1700-110011"
              description="Available from 9:00 AM to 9:00 PM."
            />

            <InfoCard
              title="Address"
              value="Dhanmondi, Dhaka, Bangladesh"
              description="E-Earbuds online service."
            />

            <div className="rounded-2xl bg-sky-100 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Business Hours
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between gap-4">
                  <span>Saturday - Thursday</span>
                  <span className="font-semibold">9 AM - 9 PM</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Friday</span>
                  <span className="font-semibold">10 AM - 6 PM</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}

function InfoCard({ title, value, description }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-emerald-700">{title}</p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">{value}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
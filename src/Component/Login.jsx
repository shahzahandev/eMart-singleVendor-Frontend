import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    console.log("Login Data:", formData);
    alert("Login successful!");
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
          <div className="hidden bg-emerald-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold">EcoBazar Ecommerce</h1>
              <p className="mt-4 max-w-md text-emerald-50">
                Login to your account and continue shopping fresh, organic, and
                daily grocery products from EcoBazar.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-emerald-50">
                Secure login, fast checkout, order tracking, and a smooth
                shopping experience for every customer.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Login to continue with EcoBazar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <a
                    href="#"
                    className="text-sm font-medium text-emerald-700 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <a href="/register" className="font-semibold text-emerald-700 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
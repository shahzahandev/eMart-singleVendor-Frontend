import axios from "axios";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");


    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      async function getData() {
        let res = await axios.post(`https://emart-singlevendor-backend-6.onrender.com/api/v1/auth/forgotPassword`, {email})
        setSuccess(res.data.message);
        setEmail("")
      }
      getData()
      
    } catch (error) {
      console.log(error.response.data.message);
    }
  
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
          <div className="hidden bg-sky-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold">E-Earbuds</h1>
              <p className="mt-4 max-w-md text-emerald-50">
                Enter your email address and we will send you a password reset
                link.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-emerald-50">
                Keep your account secure and continue shopping fresh grocery
                products anytime.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Forgot Password
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your email to receive a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                  {success}
                </div>
              )}
              

              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-sky-500 text-sm font-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                Send Reset Link
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Remember your password?{" "}
              <a href="#" className="font-semibold text-sky-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
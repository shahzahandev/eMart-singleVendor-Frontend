import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { token } = useParams()
  const navigete = useNavigate()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      async function getData() {
        let res = await axios.post(`https://emart-singlevendor-backend-6.onrender.com/api/v1/auth/resetPassword/${token}`, formData)
        setSuccess(res.data.message);
        setFormData({ newPassword: "", confirmPassword: "" })
        setTimeout(() => {
          navigete("/login")
        }, 2000)
      }
      getData();
    } catch (error) {
      console.log(error);
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
                Create a new password to secure your E-Earbuds account.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-emerald-50">
                Use a strong password to protect your orders, wishlist, and
                account details.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Reset Password
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your new password below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="h-12 w-full rounded-lg border border-slate-300 px-4 pr-11 text-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((v) => !v)}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="h-12 w-full rounded-lg border border-slate-300 px-4 pr-11 text-sm outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
                Reset Password
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Back to{" "}
              <a href="/login" className="font-semibold text-sky-700 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

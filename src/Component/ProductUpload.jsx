import { useState } from "react";
import axios from "axios";
import { ImagePlus, X, Star } from "lucide-react";
import AdminLayout from "./AdminLayout";

const ADD_PRODUCT_URL = "https://emart-singlevendor-backend-6.onrender.com/api/v1/product/createProduct";
const MAX_IMAGES = 5;

export default function ProductUpload({ onLogout }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    subCategory: "",
    tag: "",
    status: "",
    additionalInfo: "",
  });

  const [images, setImages] = useState([]); // File objects
  const [previews, setPreviews] = useState([]); // object URLs for preview
  const [mainIndex, setMainIndex] = useState(null); // index into images/previews marked as main
  const [imageError, setImageError] = useState("");

  // Discount
  const [discountType, setDiscountType] = useState("none"); // "none" | "flat" | "percentage"
  const [discountValue, setDiscountValue] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [discountEndDate, setDiscountEndDate] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImageError("");

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      setImageError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    if (files.length > remainingSlots) {
      setImageError(
        `You can upload a maximum of ${MAX_IMAGES} images. Only the first ${remainingSlots} of your selection were added.`
      );
    }

    const filesToAdd = files.slice(0, remainingSlots);

    setImages((prev) => {
      const updated = [...prev, ...filesToAdd];
      // First image ever added becomes main by default
      setMainIndex((current) => (current === null ? 0 : current));
      return updated;
    });
    setPreviews((prev) => [
      ...prev,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImageError("");

    setMainIndex((current) => {
      if (current === null) return null;
      const remainingCount = images.length - 1;
      if (remainingCount <= 0) return null;
      if (index === current) return 0; // main image removed -> fall back to first
      if (index < current) return current - 1; // shift left
      return current;
    });
  };

  const setAsMain = (index) => setMainIndex(index);

  // ---- Discount / sale price preview ----
  const numericPrice = Number(formData.price) || 0;
  const numericDiscount = Number(discountValue) || 0;

  let salePrice = numericPrice;
  if (discountType === "flat") {
    salePrice = Math.max(numericPrice - numericDiscount, 0);
  } else if (discountType === "percentage") {
    salePrice = Math.max(numericPrice - (numericPrice * numericDiscount) / 100, 0);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.price || !formData.category) {
      setError("Title, Price, and Category are required.");
      return;
    }

    if (
      discountType !== "none" &&
      discountStartDate &&
      discountEndDate &&
      discountStartDate > discountEndDate
    ) {
      setError("Discount start date cannot be after the end date.");
      return;
    }

    if (discountType === "flat") {
      const price = Number(formData.price);
      const discount = Number(discountValue);

      if (discount >= price) {
        setError("Discount amount cannot be greater than or equal to the product price.");
        return;
      }
    }
    if (discountType === "percentage") {
      const discount = Number(discountValue);

      if (discount > 100) {
        setError("Percentage discount cannot be greater than 100%.");
        return;
      }
    }

    try {
      setSubmitting(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      payload.append("discountType", discountType);
      if (discountType !== "none") {
        payload.append("discountValue", discountValue || 0);
        payload.append("discountStartDate", discountStartDate);
        payload.append("discountEndDate", discountEndDate);
        payload.append("discountPrice", salePrice);
      }

      images.forEach((file) => payload.append("images", file));
      // Must match the backend's `let { ..., isMain } = req.body;` field name.
      payload.append("isMain", mainIndex ?? 0);

      const res = await axios.post(ADD_PRODUCT_URL, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(res.data?.message || "Product added successfully.");
      setFormData({
        title: "",
        description: "",
        shortDescription: "",
        price: "",
        stock: "",
        brand: "",
        category: "",
        subCategory: "",
        tag: "",
        status: "",
        additionalInfo: "",
      });
      setImages([]);
      setPreviews([]);
      setMainIndex(null);
      setDiscountType("none");
      setDiscountValue("");
      setDiscountStartDate("");
      setDiscountEndDate("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout onLogout={onLogout} active="products">
      <h2 className="text-3xl font-bold">Add Product</h2>
      <p className="mt-1 text-slate-500">Create a new product listing.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-black">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product title"
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-black">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Full product description"
              className="w-full rounded-lg border border-black/20 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-black">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={2}
              placeholder="One or two lines summary"
              className="w-full rounded-lg border border-black/20 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand name"
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Sub Category
            </label>
            <input
              type="text"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="e.g. Earbuds"
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. wireless, anc"
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select Status</option>
              <option value="pending">pending</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>


          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-black">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Box contents, warranty, notes..."
              className="w-full rounded-lg border border-black/20 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* ---------------- Discount section ---------------- */}
          <div className="sm:col-span-2 rounded-xl border border-black/10 p-5">
            <h3 className="mb-4 text-base font-semibold text-black">Discount</h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Discount Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="none">None</option>
                  <option value="flat">Flat</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Discount {discountType === "percentage" ? "(%)" : "(৳)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  disabled={discountType === "none"}
                  placeholder="0"
                  className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:bg-black/5 disabled:text-black/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Sale price preview
                </label>
                <div className="flex h-12 items-center rounded-lg bg-black/5 px-4 text-sm font-semibold text-black">
                  ৳{salePrice.toLocaleString("en-US")}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Discount start date
                </label>
                <input
                  type="date"
                  value={discountStartDate}
                  onChange={(e) => setDiscountStartDate(e.target.value)}
                  disabled={discountType === "none"}
                  className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:bg-black/5 disabled:text-black/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Discount end date
                </label>
                <input
                  type="date"
                  value={discountEndDate}
                  onChange={(e) => setDiscountEndDate(e.target.value)}
                  disabled={discountType === "none"}
                  className="h-12 w-full rounded-lg border border-black/20 px-4 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:bg-black/5 disabled:text-black/40"
                />
              </div>
            </div>
          </div>

          {/* ---------------- Images section ---------------- */}
          <div className="sm:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-black">
                Product Images
              </label>
              <span className="text-xs text-black/50">
                {images.length}/{MAX_IMAGES}
              </span>
            </div>

            <label
              className={`flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-black/50 transition ${images.length >= MAX_IMAGES
                ? "cursor-not-allowed border-black/10 opacity-50"
                : "cursor-pointer border-black/20 hover:border-sky-400 hover:text-sky-500"
                }`}
            >
              <ImagePlus size={24} />
              <span className="text-sm">
                {images.length >= MAX_IMAGES
                  ? "Maximum images reached"
                  : "Click to upload images"}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={images.length >= MAX_IMAGES}
                className="hidden"
              />
            </label>

            {imageError && (
              <p className="mt-2 text-sm text-red-600">{imageError}</p>
            )}

            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {previews.map((src, i) => (
                  <div
                    key={src}
                    className={`group relative aspect-square overflow-hidden rounded-lg border-2 ${mainIndex === i ? "border-sky-400" : "border-black/10"
                      }`}
                  >
                    <img src={src} alt={`preview ${i + 1}`} className="h-full w-full object-cover" />

                    <button
                      type="button"
                      onClick={() => setAsMain(i)}
                      aria-label="Set as main image"
                      className={`absolute left-1 top-1 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold transition ${mainIndex === i
                        ? "bg-sky-400 text-black"
                        : "bg-black/60 text-white opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      <Star size={10} fill={mainIndex === i ? "currentColor" : "none"} />
                      {mainIndex === i ? "Main" : "Set main"}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label="Remove image"
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 h-12 w-full rounded-lg bg-sky-400 text-sm font-semibold text-black transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </AdminLayout>
  );
}

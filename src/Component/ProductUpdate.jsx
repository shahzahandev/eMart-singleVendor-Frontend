import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ImagePlus, X, Star } from "lucide-react";
import AdminLayout from "./AdminLayout";

const singleProductUrl = (id) =>
  `https://emart-singlevendor-backend-6.onrender.com/api/v1/product/singleProduct/${id}`;
const updateProductUrl = (id) =>
  `https://emart-singlevendor-backend-6.onrender.com/api/v1/product/updateProduct/${id}`;

const API_ORIGIN = "https://emart-singlevendor-backend-6.onrender.com";
const MAX_IMAGES = 5;

function imageSrc(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_ORIGIN}${url}`;
}

// Formats an ISO date string to yyyy-mm-dd for <input type="date">.
function toDateInputValue(iso) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 10);
}

export default function ProductUpdate({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Existing images: [{ _id, url, isMain }]
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]); // File objects
  const [newPreviews, setNewPreviews] = useState([]); // object URLs
  const [imageError, setImageError] = useState("");

  // mainKey identifies which image (existing or newly added) is main.
  // Existing image -> its _id. New image -> `new-${index}`.
  const [mainKey, setMainKey] = useState(null);

  // Discount
  const [discountType, setDiscountType] = useState("none"); // "none" | "flat" | "percentage"
  const [discountValue, setDiscountValue] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [discountEndDate, setDiscountEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await axios.get(singleProductUrl(id));
        const p = res.data.product;

        setFormData({
          title: p.title || "",
          description: p.description || "",
          shortDescription: p.shortDescription || "",
          price: p.price ?? "",
          stock: p.stock ?? "",
          brand: p.brand || "",
          category: p.category || "",
          subCategory: p.subCategory || "",
          tag: Array.isArray(p.tag) ? p.tag.join(", ") : p.tag || "",
          additionalInfo: p.additionalInfo || "",
          status: p.status || "",
        });

        const images = p.images || [];
        setExistingImages(images);

        const mainExisting = images.find((img) => img.isMain);
        setMainKey(mainExisting ? mainExisting._id : images[0]?._id ?? null);

        // Discount
        const type = p.discountType || "none";
        setDiscountType(type);
        if (type !== "none" && p.price) {
          const price = Number(p.price);
          const salePrice = Number(p.discountPrice ?? price);
          const rawDiscount =
            type === "flat"
              ? price - salePrice
              : price > 0
              ? Math.round(((price - salePrice) / price) * 100)
              : 0;
          setDiscountValue(String(Math.max(rawDiscount, 0)));
          setDiscountStartDate(toDateInputValue(p.discountStartDate));
          setDiscountEndDate(toDateInputValue(p.discountEndDate));
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalImageCount = existingImages.length + newImages.length;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImageError("");

    const remainingSlots = MAX_IMAGES - totalImageCount;

    if (remainingSlots <= 0) {
      setImageError(`You can have a maximum of ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    if (files.length > remainingSlots) {
      setImageError(
        `You can have a maximum of ${MAX_IMAGES} images. Only the first ${remainingSlots} of your selection were added.`
      );
    }

    const filesToAdd = files.slice(0, remainingSlots);
    const startIndex = newImages.length;

    setNewImages((prev) => [...prev, ...filesToAdd]);
    setNewPreviews((prev) => [
      ...prev,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ]);

    // If nothing is main yet, the first newly added image becomes main.
    setMainKey((current) => current ?? `new-${startIndex}`);

    e.target.value = "";
  };

  const removeExistingImage = (index) => {
    const removed = existingImages[index];
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
    setImageError("");

    if (mainKey === removed?._id) {
      // Fall back to first remaining existing image, else first new image, else null.
      setMainKey(updated[0]?._id ?? (newImages.length > 0 ? "new-0" : null));
    }
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    setImageError("");

    setMainKey((current) => {
      if (current === `new-${index}`) {
        // Fall back to first existing image, else the new first (if any left).
        if (existingImages.length > 0) return existingImages[0]._id;
        return newImages.length > 1 ? "new-0" : null;
      }
      // Re-index keys after the removed one shifts left.
      if (typeof current === "string" && current.startsWith("new-")) {
        const currentIdx = Number(current.split("-")[1]);
        if (currentIdx > index) return `new-${currentIdx - 1}`;
      }
      return current;
    });
  };

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

    if (!formData.status) {
      setError("Status must be selected.");
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

    if (discountType === "flat" && numericDiscount >= numericPrice) {
      setError("Discount amount cannot be greater than or equal to the product price.");
      return;
    }

    if (discountType === "percentage" && numericDiscount > 100) {
      setError("Percentage discount cannot be greater than 100%.");
      return;
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

      // Existing images kept, with isMain flags updated to match the current selection.
      const updatedExisting = existingImages.map((img) => ({
        ...img,
        isMain: img._id === mainKey,
      }));
      payload.append("existingImages", JSON.stringify(updatedExisting));

      newImages.forEach((file) => payload.append("images", file));

      // If the chosen main image is one of the newly uploaded files, tell the
      // backend which index (within this upload's file list) is main.
      const newMainIndex =
        typeof mainKey === "string" && mainKey.startsWith("new-")
          ? Number(mainKey.split("-")[1])
          : -1;
      payload.append("newMainIndex", newMainIndex);

      const res = await axios.post(updateProductUrl(id), payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(res.data?.message || "Product updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout} active="products">
        <p className="text-slate-500">Loading product...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout} active="products">
      <h2 className="text-3xl font-bold">Update Product</h2>
      <p className="mt-1 text-slate-500">Edit this product's details.</p>

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
              Status <span className="text-red-500">*</span>
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
                {totalImageCount}/{MAX_IMAGES}
              </span>
            </div>

            {existingImages.length > 0 && (
              <>
                <p className="mb-2 text-xs font-medium text-slate-500">Current images</p>
                <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {existingImages.map((img, i) => (
                    <div
                      key={img._id}
                      className={`group relative aspect-square overflow-hidden rounded-lg border-2 ${
                        mainKey === img._id ? "border-sky-400" : "border-black/10"
                      }`}
                    >
                      <img
                        src={imageSrc(img.url)}
                        alt={`existing ${i + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => setMainKey(img._id)}
                        aria-label="Set as main image"
                        className={`absolute left-1 top-1 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold transition ${
                          mainKey === img._id
                            ? "bg-sky-400 text-black"
                            : "bg-black/60 text-white opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <Star size={10} fill={mainKey === img._id ? "currentColor" : "none"} />
                        {mainKey === img._id ? "Main" : "Set main"}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeExistingImage(i)}
                        aria-label="Remove image"
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <label
              className={`flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-black/50 transition ${
                totalImageCount >= MAX_IMAGES
                  ? "cursor-not-allowed border-black/10 opacity-50"
                  : "cursor-pointer border-black/20 hover:border-sky-400 hover:text-sky-500"
              }`}
            >
              <ImagePlus size={24} />
              <span className="text-sm">
                {totalImageCount >= MAX_IMAGES
                  ? "Maximum images reached"
                  : "Click to add more images"}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={totalImageCount >= MAX_IMAGES}
                className="hidden"
              />
            </label>

            {imageError && <p className="mt-2 text-sm text-red-600">{imageError}</p>}

            {newPreviews.length > 0 && (
              <>
                <p className="mb-2 mt-4 text-xs font-medium text-slate-500">New images</p>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {newPreviews.map((src, i) => {
                    const key = `new-${i}`;
                    return (
                      <div
                        key={src}
                        className={`group relative aspect-square overflow-hidden rounded-lg border-2 ${
                          mainKey === key ? "border-sky-400" : "border-black/10"
                        }`}
                      >
                        <img src={src} alt={`new preview ${i + 1}`} className="h-full w-full object-cover" />

                        <button
                          type="button"
                          onClick={() => setMainKey(key)}
                          aria-label="Set as main image"
                          className={`absolute left-1 top-1 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold transition ${
                            mainKey === key
                              ? "bg-sky-400 text-black"
                              : "bg-black/60 text-white opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <Star size={10} fill={mainKey === key ? "currentColor" : "none"} />
                          {mainKey === key ? "Main" : "Set main"}
                        </button>

                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          aria-label="Remove image"
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
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
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </AdminLayout>
  );
}

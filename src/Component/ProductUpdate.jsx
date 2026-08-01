import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ImagePlus, X } from "lucide-react";
import AdminLayout from "./AdminLayout";

const singleProductUrl = (id) =>
  `http://localhost:5000/api/v1/product/singleProduct/${id}`;
const updateProductUrl = (id) =>
  `http://localhost:5000/api/v1/product/updateProduct/${id}`;

export default function ProductUpdate({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    stock: "",
    brand: "",
    category: "",
    subCategory: "",
    tag: "",
    additionalInfo: "",
  });

  const [existingImages, setExistingImages] = useState([]); // image URLs already on the product
  const [newImages, setNewImages] = useState([]); // newly picked File objects
  const [newPreviews, setNewPreviews] = useState([]);

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
          price: p.price || "",
          discountPrice: p.discountPrice || "",
          stock: p.stock || "",
          brand: p.brand || "",
          category: p.category || "",
          subCategory: p.subCategory || "",
          tag: [p.tag] || "",
          additionalInfo: p.additionalInfo || "",
        });
        setExistingImages(p.images || []);
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setNewImages((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = "";
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.price || !formData.category) {
      setError("Title, Price, and Category are required.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      // Images the user kept from before (backend can diff against the product's current list)
      payload.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((file) => payload.append("images", file));

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
              Discount Price
            </label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
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

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-black">
              Product Images
            </label>

            {existingImages.length > 0 && (
              <>
                <p className="mb-2 text-xs font-medium text-slate-500">Current images</p>
                <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {existingImages.map((src, i) => (
                    <div key={src} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10">
                      <img src={src} alt={`existing ${i + 1}`} className="h-full w-full object-cover" />
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

            <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black/20 text-black/50 transition hover:border-sky-400 hover:text-sky-500">
              <ImagePlus size={24} />
              <span className="text-sm">Click to add more images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {newPreviews.length > 0 && (
              <>
                <p className="mb-2 mt-4 text-xs font-medium text-slate-500">New images</p>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {newPreviews.map((src, i) => (
                    <div key={src} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10">
                      <img src={src} alt={`new preview ${i + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
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

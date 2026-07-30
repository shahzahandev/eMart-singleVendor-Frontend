// import { useState } from "react";
// import axios from "axios";
import { ImagePlus, X } from "lucide-react";

// const ADD_PRODUCT_URL = "http://localhost:5000/api/v1/product/addProduct";

export default function ProductUpload() {
    //   const [formData, setFormData] = useState({
    //     title: "",
    //     description: "",
    //     shortDescription: "",
    //     price: "",
    //     discountPrice: "",
    //     stock: "",
    //     brand: "",
    //     category: "",
    //     subCategory: "",
    //     tag: "",
    //     additionalInfo: "",
    //   });

    //   const [images, setImages] = useState([]); // File objects
    //   const [previews, setPreviews] = useState([]); // object URLs for preview
    //   const [error, setError] = useState("");
    //   const [success, setSuccess] = useState("");
    //   const [submitting, setSubmitting] = useState(false);

    //   const handleChange = (e) => {
    //     // const { name, value } = e.target;
    //     // setFormData((prev) => ({ ...prev, [name]: value }));
    //   };

    //   const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files || []);
    //     if (!files.length) return;

    //     setImages((prev) => [...prev, ...files]);
    //     setPreviews((prev) => [
    //       ...prev,
    //       ...files.map((file) => URL.createObjectURL(file)),
    //     ]);
    //     e.target.value = "";
    //   };

    //   const removeImage = (index) => {
    //     setImages((prev) => prev.filter((_, i) => i !== index));
    //     setPreviews((prev) => prev.filter((_, i) => i !== index));
    //   };

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError("");
    //     setSuccess("");

    //     if (!formData.title || !formData.price || !formData.category) {
    //       setError("Title, Price, and Category are required.");
    //       return;
    //     }

    //     try {
    //       setSubmitting(true);

    //       const payload = new FormData();
    //       Object.entries(formData).forEach(([key, value]) => {
    //         payload.append(key, value);
    //       });
    //       images.forEach((file) => payload.append("images", file));

    //     //   const res = await axios.post(ADD_PRODUCT_URL, payload, {
    //     //     headers: { "Content-Type": "multipart/form-data" },
    //     //   });

    //     //   setSuccess(res.data?.message || "Product added successfully.");
    //       setFormData({
    //         title: "",
    //         description: "",
    //         shortDescription: "",
    //         price: "",
    //         discountPrice: "",
    //         stock: "",
    //         brand: "",
    //         category: "",
    //         subCategory: "",
    //         tag: "",
    //         additionalInfo: "",
    //       });
    //     //   setImages([]);
    //     //   setPreviews([]);
    //     } catch (err) {
    //       setError(err.response?.data?.message || "Failed to add product.");
    //     } finally {
    //       setSubmitting(false);
    //     }
    //   };

    return (
        <section className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-black">E-Earbuds</h1>
                    <p className="mt-1 text-sm text-black/60">Add a new product</p>
                </div>

                <form
                    //   onSubmit={handleSubmit}
                    className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
                >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-black">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                // value={formData.title}
                                // onChange={handleChange}
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
                                // value={formData.description}
                                // onChange={handleChange}
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
                                // value={formData.shortDescription}
                                // onChange={handleChange}
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
                                // value={formData.price}
                                // onChange={handleChange}
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
                                // value={formData.discountPrice}
                                // onChange={handleChange}
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
                                // value={formData.stock}
                                // onChange={handleChange}
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
                                // value={formData.brand}
                                // onChange={handleChange}
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
                                // value={formData.category}
                                // onChange={handleChange}
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
                                // value={formData.subCategory}
                                // onChange={handleChange}
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
                                // value={formData.tag}
                                // onChange={handleChange}
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
                                // value={formData.additionalInfo}
                                // onChange={handleChange}
                                rows={3}
                                placeholder="Box contents, warranty, notes..."
                                className="w-full rounded-lg border border-black/20 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-black">
                                Product Images
                            </label>

                            <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black/20 text-black/50 transition hover:border-sky-400 hover:text-sky-500">
                                <ImagePlus size={24} />
                                <span className="text-sm">Click to upload images</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    //   onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            {/* {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {previews.map((src, i) => (
                    <div key={src} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10">
                      <img src={src} alt={`preview ${i + 1}`} className="h-full w-full object-cover" />
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
              )} */}
                        </div>
                    </div>

                    {/* {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )} */}
                    {/* {success && (
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )} */}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            // disabled={submitting}
                            className="mt-6 h-12 w-full rounded-lg bg-sky-400 text-sm font-semibold text-black transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                        >
                            {/* {submitting ? "Submitting..." : "Submit"} */}
                            Submit
                        </button>
                        <button
                            className="mt-6 w-full border-b-2 text-sm font-semibold text-black transition hover:text-sky-500  sm:w-auto sm:px-10 py-0"
                        >
                            <a href="/admin">
                            Back to Admin Dashboard
                            </a>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

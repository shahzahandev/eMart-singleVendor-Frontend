import { useState } from "react";

export default function ProductUpload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    brand: "",
    category: "",
    subCategory: "",
    additionalInformation: "",
    images: [],
  });

  const [error, setError] = useState("");

  const categories = [
    {
      name: "Fruits & Vegetables",
      subCategories: ["Fresh Fruits", "Fresh Vegetables", "Organic Items"],
    },
    {
      name: "Grocery",
      subCategories: ["Rice", "Oil", "Spices", "Snacks"],
    },
    {
      name: "Dairy",
      subCategories: ["Milk", "Cheese", "Yogurt", "Butter"],
    },
    {
      name: "Beverages",
      subCategories: ["Juice", "Tea", "Coffee", "Soft Drinks"],
    },
  ];

  const selectedCategory = categories.find(
    (item) => item.name === formData.category
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      setError("Maximum 5 images allowed.");
      return;
    }

    setError("");

    setFormData({
      ...formData,
      images: selectedFiles,
    });
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Product title is required.");
      return;
    }

    if (!formData.price) {
      setError("Product price is required.");
      return;
    }

    if (!formData.category) {
      setError("Product category is required.");
      return;
    }

    console.log("Product Upload Data:", formData);
    alert("Product uploaded successfully!");
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Upload Product
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add a new product to EcoBazar Ecommerce.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-2xl bg-white p-5 shadow-xl sm:p-6 lg:grid-cols-[1fr_360px] lg:p-8"
        >
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Product Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Fresh Organic Apple"
                required
              />

              <Input
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="EcoBazar"
              />

              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="120"
                required
              />

              <Input
                label="Discount Price"
                name="discountPrice"
                type="number"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="99"
              />

              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Sub Category"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                disabled={!formData.category}
              >
                <option value="">
                  {formData.category ? "Select sub category" : "Select category first"}
                </option>
                {selectedCategory?.subCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            <Textarea
              label="Short Description"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Short product summary..."
              rows={3}
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Full product description..."
              rows={6}
            />

            <Textarea
              label="Additional Information"
              name="additionalInformation"
              value={formData.additionalInformation}
              onChange={handleChange}
              placeholder="Weight, origin, freshness, delivery note..."
              rows={4}
            />
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="block text-sm font-medium text-slate-700">
                Product Images
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Upload maximum 5 images.
              </p>

              <label className="mt-4 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-6 text-center hover:border-emerald-600">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />

                <span className="text-sm font-semibold text-emerald-700">
                  Click to upload
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  PNG, JPG, WEBP accepted
                </span>
              </label>

              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {formData.images.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="relative overflow-hidden rounded-lg border border-slate-200 bg-white"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="h-24 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Required Fields
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Title is required</li>
                <li>Price is required</li>
                <li>Category is required</li>
              </ul>
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
              Upload Product
            </button>
          </aside>
        </form>
      </div>
    </section>
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

function Select({
  label,
  name,
  value,
  onChange,
  children,
  required = false,
  disabled = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        {children}
      </select>
    </div>
  );
}

function Textarea({ label, name, value, onChange, placeholder, rows = 4 }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}
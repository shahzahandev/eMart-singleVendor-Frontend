import { CiStar } from "react-icons/ci";
import { FiShoppingCart, FiTruck } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuRotateCcw } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import Container from "./Container";

const ALL_PRODUCTS_URL = "http://localhost:5000/api/v1/product/allProduct";
// Backend origin — images come back as relative paths ("/upload/xyz.jpg"),
// so this gets prepended to build a loadable <img src>.
const API_ORIGIN = "http://localhost:5000";

function currency(n) {
  return `৳${Number(n ?? 0).toLocaleString("en-US")}`;
}

function imageSrc(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_ORIGIN}${url}`;
}

export default function SingleProduct() {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(ALL_PRODUCTS_URL);
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        const productList = data.products || data.data || data;
        const found = (Array.isArray(productList) ? productList : []).find(
          (p) => p._id === id
        );

        if (!found) throw new Error("Product not found");
        setProduct(found);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, product]);

  if (loading) {
    return <p className="text-center text-slate-500 py-20">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <p className="text-center text-red-500 py-20">
        Failed to load product{error ? `: ${error}` : ""}
      </p>
    );
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }) {
  const images = product.images?.length ? product.images : [];
  // Default to the isMain image if one is flagged, otherwise the first image.
  const defaultIndex = Math.max(
    images.findIndex((img) => img.isMain),
    0
  );

  const [activeImage, setActiveImage] = useState(defaultIndex);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();

  const hasDiscount =
    product.discountPrice && Number(product.discountPrice) < Number(product.price);
  const discountPct = hasDiscount
    ? Math.round(100 - (Number(product.discountPrice) / Number(product.price)) * 100)
    : null;

  return (
    <Container>
  <div className=" md:py-15 py-5 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-3 order-2 md:order-1">
          {images.map((img, i) => (
            <button
              key={img._id || img.url}
              onClick={() => setActiveImage(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                activeImage === i
                  ? "border-emerald-500"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={imageSrc(img.url)} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="order-1 md:order-2 rounded-xl overflow-hidden bg-slate-100 aspect-square flex items-center justify-center">
          {images.length > 0 ? (
            <img
              src={imageSrc(images[activeImage]?.url)}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-200" />
          )}
        </div>

        {/* Details */}
        <div className="order-3 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-black/70">
              {product.category}
            </span>
            {product.subCategory && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {product.subCategory}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-semibold text-slate-900 leading-snug">
            {product.title}
          </h1>

          {product.shortDescription && (
            <p className="text-sm text-slate-500">{product.shortDescription}</p>
          )}

          <div className="flex items-center gap-2 mt-1">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-black">
                  {currency(product.discountPrice)}
                </span>
                <span className="text-slate-400 line-through text-base">
                  {currency(product.price)}
                </span>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  -{discountPct}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-balance">
                {currency(product.price)}
              </span>
            )}
          </div>

          <div>
            <span className="text-xs font-medium text-sky-500 bg-sky-50 px-2 py-1 rounded-full">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 mt-2">
            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 transition-colors text-white font-medium rounded-lg py-3 disabled:opacity-50"
                disabled={product.stock === 0}
              >
                <FiShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={() => setWishlisted((w) => !w)}
                aria-pressed={wishlisted}
                aria-label="Add to wishlist"
                className="w-12 flex items-center justify-center border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <FaRegHeart
                  size={18}
                  className={wishlisted ? "text-rose-500" : "text-slate-500"}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center mt-2">
            <div className="flex flex-col items-center gap-1 text-xs text-slate-600">
              <FiTruck size={18} />
              Fast delivery
            </div>
            <div className="flex flex-col items-center gap-1 text-xs text-slate-600">
              <IoShieldCheckmarkOutline size={18} />
              Secure payment
            </div>
            <div className="flex flex-col items-center gap-1 text-xs text-slate-600">
              <LuRotateCcw size={18} />
              7-day return
            </div>
          </div>

          <hr className="my-2 border-slate-200" />

          {product.description && (
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-1">Description</h2>
              <p className="text-sm text-slate-600">{product.description}</p>
            </div>
          )}

          {product.additionalInfo && (
            <div className="mt-2">
              <h2 className="text-sm font-semibold text-slate-900 mb-1">
                Additional Information
              </h2>
              <p className="text-sm text-slate-600">{product.additionalInfo}</p>
            </div>
          )}

          {product.brand && (
            <div className="mt-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Brand: </span>
              {product.brand}
            </div>
          )}
               {product.tag && (
            <div className="mt-2 text-sm text-slate-600">
              <span className="font-bold text-slate-900">Tag : </span>
              {product.tag}
            </div>
          )}
        </div>
      </div>
        <div className="flex flex-col py-5 gap-3 order-2 md:order-1">
          {images.map((img, i) => (
            <button
              key={img._id || img.url}
              // onClick={() => setActiveImage(i)}
              className={`w-full h-full rounded-lg overflow-hidden transition-colors`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={imageSrc(img.url)} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
    </div>
    </Container>
  
  );
}


import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProduct,
  updateProduct,
} from "../../redux/adminSlices/adminProductsSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AdminEditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [removedImages, setRemovedImages] = useState([]);
  const [removeMainImage, setRemoveMainImage] = useState(false);
  const mainImageInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const { product, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    countInStock: 0,
    tags: "",
    isFeatured: false,
    discount: 0,
    sku: "",
    seller: "",
    colours: "",
    material: "",
    sizes: "",
    madeIn: "",
  });

  const fetchProductData = async () => {
    try {
      const response = await dispatch(fetchProduct(productId)).unwrap(); // Wait until users are fetched
    } catch (err) {
      toast.error("Failed to fetch users.");
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        category: product.category,
        productImage: product.productImage,
        images: product.images || [],
        countInStock: product.countInStock,
        tags: (product.tags || []).join(", "),
        isFeatured: product.isFeatured,
        discount: product.discount,
        sku: product.sku,
        seller: product.seller,
        colours: (product.colours || []).join(", "),
        material: product.material,
        sizes: (product.sizes || []).join(", "),
        madeIn: product.madeIn,
      });
      setCreatedDate(product.createdAt);
      setUpdatedDate(product.updatedAt);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, productImage: file }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeGalleryImage = (idx) => {
    const removed = form.images[idx];

    // Track removed only if it's an existing image (string)
    if (typeof removed === "string") {
      setRemovedImages((prev) => [...prev, removed]);
    }

    const updated = form.images.filter((_, i) => i !== idx);
    setForm((prev) => ({ ...prev, images: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append all normal fields
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("brand", form.brand);
      formData.append("category", form.category);
      formData.append("countInStock", form.countInStock);
      formData.append("tags", form.tags);
      formData.append("isFeatured", form.isFeatured);
      formData.append("discount", form.discount);
      formData.append("sku", form.sku);
      formData.append("seller", form.seller);
      formData.append("colours", form.colours);
      formData.append("material", form.material);
      formData.append("sizes", form.sizes);
      formData.append("madeIn", form.madeIn);

      if (removeMainImage) {
        formData.append("removeMainImage", true);
      }
      // Append product images (main + gallery) under the same key
      if (form.productImage && typeof form.productImage !== "string") {
        formData.append("productImages", form.productImage);
      }

      form.images.forEach((img) => {
        if (typeof img !== "string") {
          formData.append("productImages", img);
        }
      });

      formData.append("removedImages", JSON.stringify(removedImages));
      await dispatch(
        updateProduct({ productId, productData: formData })
      ).unwrap();
      toast.success("Product updated successfully!");
      // navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md space-y-7">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      {createdDate && (
        <div className="md:col-span-2 text-sm text-gray-500">
          Created At: {new Date(createdDate).toLocaleString()}
        </div>
      )}
      {updatedDate && (
        <div className="md:col-span-2 text-sm text-gray-500">
          Last Updated: {new Date(updatedDate).toLocaleString()}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { label: "Product Name", name: "name" },
          { label: "Brand", name: "brand" },
          { label: "Category", name: "category" },
          { label: "SKU", name: "sku" },
          { label: "Price", name: "price", type: "number" },
          { label: "Discount (%)", name: "discount", type: "number" },
          { label: "Stock Quantity", name: "countInStock", type: "number" },
          { label: "Seller", name: "seller" },
          { label: "Colours", name: "colours",placeholder:"separated by commas e.g. red,blue,green" },//e.g. "SM,L,XL,XXL" },
          { label: "Material", name: "material" },
          { label: "Sizes", name: "sizes",placeholder:"separated by commas e.g. SM,L,XL,XXL" },
          { label: "Made In", name: "madeIn" },
        ].map(({ label, name, type = "text", placeholder }) => (
          <div className="flex flex-col gap-2" key={name}>
            <label className="text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={`${placeholder}`}
              required={["name", "category", "price"].includes(name)}
              className="input border-b-1 h-12 border-gray-300 outline-none "
            />
          </div>
        ))}

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="input border-1 outline-none border-gray-300 p-2"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-gray-700">Tags (comma separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>

        {/* Main Image Upload */}
        <div className="md:col-span-2">
          <label className="text-gray-700 font-semibold">Main Image</label>
          {form.productImage ? (
            <div className="relative w-32 h-32 mb-4">
              <img
                src={
                  mainImagePreview
                    ? mainImagePreview
                    : typeof form.productImage === "string"
                    ? form.productImage.startsWith("http") ||
                      form.productImage.startsWith("/")
                      ? form.productImage
                      : `${
                          import.meta.env.VITE_API_URL
                        }/uploads/productImages/${form.productImage}`
                    : form.productImage
                    ? URL.createObjectURL(form.productImage)
                    : ""
                }
                alt="Main"
                className="w-full h-full object-cover border rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setForm((prev) => ({ ...prev, productImage: "" }));
                  setMainImagePreview("");
                  setRemoveMainImage(true); // Mark it for deletion on backend
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <div>
              <button
                className="bg-blue-600 text-white px-4 py-2 w-[220px] hover:scale-95 transition-all duration-200 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  mainImageInputRef.current.click();
                }}
              >
                Upload Main Image
              </button>
              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="input hidden"
              />
            </div>
          )}
        </div>

        {/* Gallery Images Upload */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Gallery Images</label>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              galleryInputRef.current.click();
            }}
            className="bg-blue-600 text-white px-4 py-2 w-[220px] hover:scale-95 transition-all duration-200 rounded-md"
          >
            Upload Gallery Images
          </button>
          <input
            ref={galleryInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryChange}
            className="input hidden"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {form.images?.map((img, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 border rounded overflow-hidden"
              >
                <img
                  src={
                    typeof img === "string"
                      ? img.startsWith("http") || img.startsWith("/")
                        ? img
                        : `${
                            import.meta.env.VITE_API_URL
                          }/uploads/productImages/${img}`
                      : URL.createObjectURL(img)
                  }
                  alt={`Image ${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          <label className="text-gray-700">Mark as Featured</label>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;

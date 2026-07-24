import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { createProduct } from "../../redux/adminSlices/adminProductsSlice";
import { FaBahai } from "react-icons/fa";
import { axiosInstance } from "../../lib/axios";
import { generateProductDescription } from "../../utils/gemini";
import { motion } from "framer-motion";

const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const { loading, error, products, product } = useSelector(
    (state) => state.adminProducts
  );
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);
  const multipleImageInputRef = useRef(null);
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

  const [productImage, setProductImage] = useState(null); // Single file
  const [images, setImages] = useState([]); // Multiple files
  const [isHidden, setIsHidden] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductImage = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleAdditionalImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "tags" && typeof value === "string") {
          value
            .split(",")
            .map((tag) => tag.trim())
            .forEach((tag) => formData.append("tags[]", tag));
        } else if (key === "colours" && typeof value === "string") {
          value
            .split(",")
            .map((colour) => colour.trim())
            .forEach((colour) => formData.append("colours[]", colour.toLowerCase()));
        } else if (key === "sizes" && typeof value === "string") {
          value
            .split(",")
            .map((size) => size.trim())
            .forEach((size) => formData.append("sizes[]", size));
        } else {
          formData.append(key, value);
        }
      });

      formData.append("productImages", productImage);

      images.forEach((img) => {
        formData.append("productImages", img);
      });

      // yaha pa humko dispatch karna hai
      const response = await dispatch(createProduct(formData)).unwrap();

      if (response.ok) {
        toast.success("Product created successfully!");
        setForm({
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
        setProductImage(null);
        setImages([]);
      } else {
        toast.error(error.response.data.message || "Failed to create product.");
        throw new Error(data.message || "Failed to create product.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Failed to create product.");
    }
  };

  const handleGenerateDescriptionWithAi = async () => {
    if (!form.name || !form.brand) {
      toast.error("Please enter product name and features.");
      return;
    }
    try {
      const description = await generateProductDescription(
        form.name,
        form.brand
      );
      console.log(description);
      setForm((prev) => ({
        ...prev,
        description: description,
      }));
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.message || "Failed to generate description."
      );
    }
  };

  return (
    <div className="w-full p-6 flex-1 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        <div className="flex flex-col">
          <label htmlFor="name">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="input  outline-none h-12 border-b-1 border-gray-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="brand">Brand</label>
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="sku">SKU</label>
          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="discount">Discount</label>
          <input
            name="discount"
            type="number"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="countInStock">Count In Stock</label>
          <input
            name="countInStock"
            type="number"
            value={form.countInStock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="countInStock">Seller</label>
          <input
            name="seller"
            type="text"
            value={form.seller}
            onChange={handleChange}
            placeholder="Seller Name"
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="countInStock">Material</label>
          <input
            name="material"
            type="text"
            value={form.material}
            onChange={handleChange}
            placeholder="Material"
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="countInStock">Made In</label>
          <input
            name="madeIn"
            type="text"
            value={form.madeIn}
            onChange={handleChange}
            placeholder="made In"
            className="input border-b-1 h-12 border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="countInStock">Colours</label>
          <input
            name="colours"
            type="text"
            value={form.colours}
            onChange={handleChange}
            placeholder="Colours (comma separated)"
            className="input border-b-1 h-12 border-gray-300 outline-none capitalize"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="countInStock">Sizes</label>
          <input
            name="sizes"
            type="text"
            value={form.sizes}
            onChange={handleChange}
            placeholder="Sizes (comma separated)"
            className="input border-b-1 h-12 border-gray-300 outline-none capitalize"
          />
        </div>
        <div className="md:col-span-2 relative">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            required
            className="input md:col-span-2 min-h-12 border-none outline-none relative w-full pr-4"
          />
          <motion.div
            className="absolute top-2 right-0 z-85"
            onClick={() => handleGenerateDescriptionWithAi()}
            whileHover={{
              rotate: [0, 360],
              transition: {
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              },
            }}
          >
            <FaBahai
              onMouseEnter={() => setIsHidden(true)}
              onClick={() => setIsHidden(false)}
              onMouseLeave={() => setIsHidden(false)}
            />
          </motion.div>
          {isHidden && (
            <div className="absolute top-1 right-5 ">
              <span className="text-sm">Generate with AI</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="tags">Tags</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="input md:col-span-2 h-12 border-none outline-none"
          />
        </div>

        {/* Main image upload */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Main Image
          </label>
          <button
            className="bg-blue-600 hover:bg-blue-700 hover:scale-90 transition-all duration-200 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              imageInputRef.current.click();
            }}
          >
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleProductImage}
            className="input hidden"
            ref={imageInputRef}
          />
          {productImage && (
            <div className="relative">
              <img
                src={URL.createObjectURL(productImage)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover border rounded relative"
              />
              <button
                type="button"
                className="absolute top-0 left-0 text-xs bg-red-500 text-white px-1 rounded-full h-6 w-6"
                onClick={() => setProductImage(null)} // You'd define this function
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Additional images */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Additional Images
          </label>
          <button
            className="bg-blue-600 hover:bg-blue-700 hover:scale-90 transition-all duration-200 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              multipleImageInputRef.current.click();
            }}
          >
            Upload Multiple Image
          </button>
          <input
            type="file"
            ref={multipleImageInputRef}
            accept="image/*"
            multiple
            onChange={handleAdditionalImages}
            className="input hidden"
          />
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, i) => {
                return (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`img-${i}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full h-6 w-6 px-1"
                      onClick={() => handleRemoveImage(i)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          <label className="text-gray-700">Mark as Featured</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md md:col-span-2"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;

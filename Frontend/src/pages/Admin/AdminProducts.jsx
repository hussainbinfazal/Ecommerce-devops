import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../../redux/adminSlices/adminProductsSlice";
import { FaEdit, FaTrashAlt, FaStar, FaTag } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import { Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const AdminProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error, likedProduct, guestLikedProduct } =
    useSelector((state) => state.adminProducts);
  const { wishlist, guestWishlist } = useSelector((state) => state.wishlist);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
      } catch (error) {
      }
    };
    fetchAllProducts();
  }, [dispatch]);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        toast.success("Product deleted successfully");
        dispatch(fetchProducts()).unwrap();
      } catch (err) {
        toast.error("Error deleting product");
      }
    }
  };

  
  const filteredProducts = products?.filter((product) => {
    const lowerSearch = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(lowerSearch) ||
      product.description.toLowerCase().includes(lowerSearch) ||
      product.brand?.toLowerCase().includes(lowerSearch) ||
      product.category.toLowerCase().includes(lowerSearch) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(lowerSearch)) ||
      product.sku?.toLowerCase().includes(lowerSearch) ||
      product.seller?.toLowerCase().includes(lowerSearch) ||
      product.colours?.some((colour) =>
        colour.toLowerCase().includes(lowerSearch)
      ) ||
      product.material?.toLowerCase().includes(lowerSearch) ||
      product.sizes?.some((size) => size.toLowerCase().includes(lowerSearch)) ||
      product.madeIn?.toLowerCase().includes(lowerSearch)
    );
  });
  const sortedNewest = [...filteredProducts].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  })

  return (
    <div className="adminpage w-full flex-1 max-h-screen flex flex-col justify-start bg-white items-center pr-5 ">
      <div className=" bg-white w-full flex-1 p-4">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/admin/products/create")}
          >
            <MdOutlineAddBox className="mr-2" />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-1/3 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-gray-600">
            Showing {filteredProducts?.length || 0} of {products?.length || 0}{" "}
            products
          </span>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-10 bg-gray-100 p-3 font-semibold rounded">
          <div className="col-span-2">Image</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Stock</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Rating</div>
          <div className="col-span-1">Discount</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {/* Product rows */}
        {sortedNewest?.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-10 border-b-1 border-gray-200 py-4 items-center hover:bg-gray-50"
            onClick={() => {
              navigate(`/admin/products/manage/${product._id}`);
            }}
          >
            <div className="col-span-2 pl-2">
              <img
                src={
                product?.productImage?.startsWith("http")
                  ? product.productImage
                  : `${import.meta.env.VITE_API_URL}/uploads/productImages/${
                      product?.productImage
                    }`
              }
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
            <div className="col-span-2">{product.name}</div>
            <div className="col-span-1">{product.countInStock}</div>
            <div className="col-span-1">₹{product.price}</div>
            <div className="col-span-1 flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              {product.rating?.toFixed(1)}
            </div>
            <div className="col-span-1">
              {product.discount ? (
                <span className="text-green-600 font-medium">
                  <FaTag className="inline mr-1" />
                  {product.discount}%
                </span>
              ) : (
                "-"
              )}
            </div>
            <div className="col-span-2 flex justify-center gap-4">
              <button
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(product._id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}

        {/* No results */}
        {filteredProducts?.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;

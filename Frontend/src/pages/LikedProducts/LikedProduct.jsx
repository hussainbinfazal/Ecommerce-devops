import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  addToGuestWishlist,
  removeFromGuestWishlist,
  clearGuestWishlist,
  removeFromWishlist,
  mergeGuestLikes,
  fetchWishlist,
  fetchGuestWishlist,
} from "../../redux/slices/wishlistSlice";
import {
  addToCart,
  removeFromCart,
  clearCart,
  setGuestCart,
  addToGuestCart,
  removeFromGuestCart,
  clearGuestCart,
  mergeGuestCart,
  fetchCartItems,
} from "../../redux/slices/cartSlice";
const LikedProduct = () => {
  // This would typically come from your global state management (Redux/Context)

  const { wishlist, guestWishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.user);
  const combinedWishlist =
    wishlist?.length > 0 ? wishlist : guestWishlist || [];
  const dispatch = useDispatch();
  const handleAddToCart = async (product) => {
    if (product.countInStock === 0) {
      alert("Product is out of stock");
      return;
    }
    if (!product.countInStock) {
      alert("Product is out of stock");
      return;
    }

    if (isAuthenticated) {
      await dispatch(addToCart(product._id)).unwrap();
      await dispatch(removeFromWishlist(product._id)).unwrap();
      await dispatch(fetchWishlist()).unwrap();
    } else {
      dispatch(addToGuestCart(product));
      dispatch(removeFromGuestWishlist(product));
      dispatch(fetchGuestWishlist());
    }
  };
  const handleRemoveFromLiked = async (product) => {
    if (isAuthenticated) {
      await dispatch(removeFromWishlist(product._id));
      await dispatch(fetchWishlist()).unwrap();
    } else {
      dispatch(removeFromGuestWishlist(product));
      dispatch(fetchGuestWishlist());
    }
  };
  useEffect(() => {
    const syncWishlist = async () => {
      if (isAuthenticated) {
        await dispatch(fetchWishlist()).unwrap();
        if (guestWishlist.length > 0) {
          await dispatch(mergeGuestLikes(guestWishlist)).unwrap();
          dispatch(clearGuestWishlist());
          await dispatch(fetchWishlist()).unwrap(); // <-- re-fetch to get updated list
        }
      } else {
        dispatch(fetchGuestWishlist());
      }
    };
    syncWishlist();
  }, [dispatch, isAuthenticated]);
  useEffect(() => {}, []);
  return (
    <div className="w-full min-h-screen flex justify-start items-center flex-col bg-gray-50 py-8">
      <NavigationHeader />
      <div className="w-full flex justify-center items-center">
        <div className="w-6/7 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              My wishlist <FaHeart className="inline-block text-red-500 ml-2" />
            </h1>
            <span className="text-gray-600">
              {combinedWishlist.length}{" "}
              {combinedWishlist.length === 1 ? "item" : "items"}
            </span>
          </div>

          {combinedWishlist?.length === 0 ? (
            // Empty state
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <FaHeart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="mt-1 text-gray-500">
                Start adding items you love to your wishlist
              </p>
              <Link
                to="/products"
                className="mt-6 inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            // Product grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {combinedWishlist.map((item) => {
                const product = item.product || item;
                return (
                  <div
                    key={product._id || product}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-100 w-80"
                  >
                    {/* Product Image */}
                    <div className="relative h-48">
                      <img
                        src={
                          product?.productImage?.startsWith("http")
                            ? product.productImage
                            : `${
                                import.meta.env.VITE_API_URL
                              }/uploads/productImages/${product?.productImage}`
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromLiked(product);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <RiDeleteBin6Line className="text-red-500" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-gray-500 text-sm line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span
                          className={`${
                            product.discount ? "text-red-500 text-lg" : ""
                          } text-lg font-semibold text-gray-900`}
                        >
                          $
                          {
                            (product.discount
                              ? product.price -
                                (product.price * product.discount) / 100
                              : product.price
                            )
                              ?.toString()
                              .split(".")[0]
                          }
                          {product.discount ? (
                            <span className="text-sm text-gray-500 line-through ml-2 mb-2">
                              ${product.price}
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={`text-sm ${
                            product.countInStock
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {product.countInStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.countInStock}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md 
                ${
                  product.countInStock
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
                        >
                          <FaShoppingCart />
                          Add to Cart
                        </button>
                        <Link
                          to={`/product/${product._id}`}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedProduct;

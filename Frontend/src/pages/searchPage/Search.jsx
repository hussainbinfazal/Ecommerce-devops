import React from "react";
import { Link, useParams } from "react-router-dom";

import { FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
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
import { ProductCard } from "../../components/shared/TopProducts";
import { getProducts } from "../../redux/slices/productSlice";
const Search = () => {
  const { searchTerm } = useParams();
  const { products = [] } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const searchProducts = products.filter((product) => {
    const search = searchTerm?.toLowerCase();
    return (
      product.name?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const fetchSearchProducts = async () => {
      try {
        if (products.length === 0) {
          await dispatch(getProducts()).unwrap();
        }
      } catch (error) {
      }
    };
    fetchSearchProducts();
  }, [searchTerm, products.length, dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.product);
  const handleAddToCart = async (productId) => {
    if (isAuthenticated) {
      await dispatch(addToCart({ productId: productId?._id })).unwrap();
      await dispatch(fetchCartItems()).unwrap();
    } else {
      dispatch(addToGuestCart(productId));
      dispatch(fetchWishlist()).unwrap();
    }
  };
  const handleRemoveFromCart = async (productId) => {
    if (isAuthenticated) {
      await dispatch(removeFromCart({ productId: productId?._id })).unwrap();
      await dispatch(fetchWishlist()).unwrap();
      await dispatch(fetchCartItems()).unwrap();
    } else {
      dispatch(removeFromGuestCart(productId));
      dispatch(fetchWishlist()).unwrap();
    }
  };
  const handleLike = async (product) => {
    if (isAuthenticated) {
      await dispatch(addToWishlist(product._id)).unwrap();
      await dispatch(fetchWishlist()).unwrap();
      await dispatch(fetchCartItems()).unwrap(); // fetchCartItems
    } else {
      dispatch(
        addToGuestWishlist({
          product: {
            _id: product._id,
            name: product.name,
            image: product.productImage,
            price: product.price,
            discount: product.discount,
            description: product.description,
            rating: product.rating,
            numReviews: product.numReviews,
            countInStock: product.countInStock,
            category: product.category,
            brand: product.brand,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            seller: product.seller,
            tags: product.tags,
            isFeatured: product.isFeatured,
            sku: product.sku,
            colours: product.colours,
            sizes: product.sizes,
            material: product.material,
            madeIn: product.madeIn,
            __v: product.__v,
          },
        })
      );
      dispatch(fetchGuestWishlist());
    }
  };

  const handleUnlike = async (product) => {
    if (isAuthenticated) {
      await dispatch(removeFromWishlist(product._id));
      await dispatch(fetchWishlist()).unwrap();
    } else {
      dispatch(removeFromGuestWishlist(product));
      dispatch(fetchGuestWishlist());
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-start items-center flex-col bg-gray-50 py-8">
      {/* <NavigationHeader /> */}
      <div className="w-full flex justify-center items-center">
        <div className="w-6/7 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Search Items{" "}
              <FaSearch className="inline-block text-red-500 ml-2" />
            </h1>
            <span className="text-gray-600">
              {(searchProducts || []).length}{" "}
              {(searchProducts || []).length === 1 ? "item" : "items"}
            </span>
          </div>

          {(searchProducts || [])?.length === 0 ? (
            // Empty state
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="mt-1 text-gray-500">
                
              </p>
              <Link
                to="/"
                className="mt-6 inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            // Product grid
            <div className="  sm:pl-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-y-6 gap-6">
              {(searchProducts || []).map((item) => {
                return (
                  <ProductCard
                    key={item._id}
                    product={item}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    isPadding={true}
                
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

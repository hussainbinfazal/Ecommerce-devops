import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "./shared/TopProducts";
import NavigationHeader from "./layout/NavigatioHeader";
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getProductsByCategory } from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  filterProductByCategories,
  getProducts,
} from "../redux/slices/productSlice";
import LoadingSpinner from "./shared/LoadingSpinner";
import {
  addToGuestWishlist,
  removeFromGuestWishlist,
  fetchGuestWishlist,
  removeFromWishlist,
  addToWishlist,
  fetchWishlist,
} from "../redux/slices/wishlistSlice";
import {
  addToCart,
  removeFromCart,
  fetchCartItems,
  clearCart,
  addToGuestCart,
  removeFromGuestCart,
  clearGuestCart,
  setGuestCart,
  fetchGuestCart,
} from "../redux/slices/cartSlice";

const CategoryPage = () => {
  const { category, subCategory, option, subOption } = useParams();
  const { productsByCategory, products } = useSelector(
    (state) => state.product
  );
  const paramsData = {
    category: category,
    subCategory: subCategory,
    option: option,
    subOption: subOption,
  };

  const dispatch = useDispatch();

  const fetchProductsByParams = async (paramsData) => {
    try {
      dispatch(
        filterProductByCategories({
          category: category,
          subCategory: subCategory,
          option: option,
          subOption: subOption,
        })
      );
    } catch (error) {
    }
  };
  useEffect(() => {
    if (products.length === 0) {
      const fetchAllProducts = async () => {
        await dispatch(getProducts());
      };
      fetchAllProducts();
    }
  }, []);
  useEffect(() => {
    if (products.length > 0) {
      fetchProductsByParams(paramsData);
    }
  }, [products]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: null,
    brands: [],
    inStock: false,
    onSale: false,
    colours: [],
    sizes: [],
    materials: [],
  });
  const [sortOption, setSortOption] = useState("featured");

  // Sample products data
  // const products = [
  //   {
  //     id: 1,
  //     name: "Wireless Earbuds Pro",
  //     price: 129.99,
  //     rating: 4.5,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "SoundMaster",
  //     category: "Electronics",
  //     inStock: true,
  //     discount: 15,
  //     dateAdded: "2023-03-15",
  //     reviews: 342
  //   },
  //   {
  //     id: 2,
  //     name: "Organic Cotton T-Shirt",
  //     price: 24.99,
  //     rating: 4.2,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "EcoWear",
  //     category: "Clothing",
  //     inStock: true,
  //     discount: 0,
  //     dateAdded: "2023-05-22",
  //     reviews: 128
  //   },
  //   {
  //     id: 3,
  //     name: "Stainless Steel Water Bottle",
  //     price: 19.99,
  //     rating: 4.7,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "HydroFlask",
  //     category: "Home",
  //     inStock: false,
  //     discount: 10,
  //     dateAdded: "2023-01-10",
  //     reviews: 256
  //   },
  //   {
  //     id: 4,
  //     name: "Bluetooth Speaker",
  //     price: 89.99,
  //     rating: 4.3,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "AudioTech",
  //     category: "Electronics",
  //     inStock: true,
  //     discount: 20,
  //     dateAdded: "2023-04-05",
  //     reviews: 187
  //   },
  //   {
  //     id: 5,
  //     name: "Yoga Mat",
  //     price: 34.99,
  //     rating: 4.6,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "FlexiFit",
  //     category: "Sports",
  //     inStock: true,
  //     discount: 20,
  //     dateAdded: "2023-02-18",
  //     reviews: 231
  //   },
  //   {
  //     id: 6,
  //     name: "Vitamin C Serum",
  //     price: 29.99,
  //     rating: 4.4,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "GlowCare",
  //     category: "Beauty",
  //     inStock: true,
  //     discount: 5,
  //     dateAdded: "2023-06-30",
  //     reviews: 176
  //   },
  //   {
  //     id: 7,
  //     name: "Wireless Charging Pad",
  //     price: 39.99,
  //     rating: 4.1,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "PowerUp",
  //     category: "Electronics",
  //     inStock: false,
  //     discount: 15,
  //     dateAdded: "2023-03-28",
  //     reviews: 92
  //   },
  //   {
  //     id: 8,
  //     name: "Memory Foam Pillow",
  //     price: 49.99,
  //     rating: 4.8,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "SleepWell",
  //     category: "Home",
  //     inStock: true,
  //     discount: 25,
  //     dateAdded: "2023-01-25",
  //     reviews: 312
  //   },
  //   {
  //     id: 9,
  //     name: "Running Shoes",
  //     price: 79.99,
  //     rating: 4.5,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "SwiftRun",
  //     category: "Sports",
  //     inStock: true,
  //     discount: 0,
  //     dateAdded: "2023-05-14",
  //     reviews: 204
  //   },
  //   {
  //     id: 10,
  //     name: "Ceramic Coffee Mug",
  //     price: 14.99,
  //     rating: 4.0,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "BrewTime",
  //     category: "Home",
  //     inStock: true,
  //     discount: 0,
  //     dateAdded: "2023-07-08",
  //     reviews: 87
  //   },
  //   {
  //     id: 11,
  //     name: "Facial Cleanser",
  //     price: 19.99,
  //     rating: 4.3,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "PureSkin",
  //     category: "Beauty",
  //     inStock: false,
  //     discount: 10,
  //     dateAdded: "2023-04-17",
  //     reviews: 143
  //   },
  //   {
  //     id: 12,
  //     name: "Smart Watch",
  //     price: 199.99,
  //     rating: 4.7,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "TechWear",
  //     category: "Electronics",
  //     inStock: true,
  //     discount: 30,
  //     dateAdded: "2023-02-05",
  //     reviews: 278
  //   },
  //   {
  //     id: 13,
  //     name: "Denim Jeans",
  //     price: 59.99,
  //     rating: 4.2,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "UrbanStyle",
  //     category: "Clothing",
  //     inStock: true,
  //     discount: 0,
  //     dateAdded: "2023-06-12",
  //     reviews: 165
  //   },
  //   {
  //     id: 14,
  //     name: "Resistance Bands Set",
  //     price: 29.99,
  //     rating: 4.4,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "FitLife",
  //     category: "Sports",
  //     inStock: true,
  //     discount: 15,
  //     dateAdded: "2023-03-03",
  //     reviews: 118
  //   },
  //   {
  //     id: 15,
  //     name: "Air Fryer",
  //     price: 119.99,
  //     rating: 4.6,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "KitchenPro",
  //     category: "Home",
  //     inStock: false,
  //     discount: 20,
  //     dateAdded: "2023-01-30",
  //     reviews: 231
  //   },
  //   {
  //     id: 16,
  //     name: "Hair Dryer",
  //     price: 49.99,
  //     rating: 4.1,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "StylePlus",
  //     category: "Beauty",
  //     inStock: true,
  //     discount: 0,
  //     dateAdded: "2023-05-19",
  //     reviews: 97
  //   },
  //   {
  //     id: 17,
  //     name: "Laptop Backpack",
  //     price: 44.99,
  //     rating: 4.3,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "UrbanGear",
  //     category: "Accessories",
  //     inStock: true,
  //     discount: 10,
  //     dateAdded: "2023-04-22",
  //     reviews: 154
  //   },
  //   {
  //     id: 18,
  //     name: "Wireless Mouse",
  //     price: 24.99,
  //     rating: 4.0,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "TechTools",
  //     category: "Electronics",
  //     inStock: true,
  //     discount: 0,
  //     dateAdded: "2023-07-15",
  //     reviews: 82
  //   },
  //   {
  //     id: 19,
  //     name: "Scented Candle Set",
  //     price: 29.99,
  //     rating: 4.5,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "CozyHome",
  //     category: "Home",
  //     inStock: true,
  //     discount: 15,
  //     dateAdded: "2023-02-28",
  //     reviews: 193
  //   },
  //   {
  //     id: 20,
  //     name: "Fitness Tracker",
  //     price: 79.99,
  //     rating: 4.2,
  //     image: "https://m.media-amazon.com/images/I/61vihvwHdBL._AC_SY200_.jpg",
  //     brand: "ActiveLife",
  //     category: "Electronics",
  //     inStock: false,
  //     discount: 25,
  //     dateAdded: "2023-06-05",
  //     reviews: 207
  //   }
  // ];

  // Extract unique brands for filter option
  const brands = [
    ...new Set((products || [])?.map((product) => product.brand || "Generic")),
  ];

  const materials = [
    ...new Set((products || [])?.map((product) => product.material)),
  ];
  const sizes = [
    ...new Set((products || [])?.flatMap((product) => product.sizes)),
  ];
  const colours = [
    ...new Set((products || [])?.flatMap((product) => product.colours)),
  ];
  const filteredProducts = (productsByCategory || [])
    .filter((product) => {
      return (
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        (filters.rating === null || product.rating >= filters.rating) &&
        (filters.brands.length === 0 ||
          filters.brands.includes(product.brand || "Generic")) &&
        (!filters.inStock || product.inStock) &&
        (!filters.onSale || product.discount > 0) &&
        (filters.colours.length === 0 ||
          filters.colours.some((colour) =>
            (product.colours || []).includes(colour)
          )) &&
        (filters.sizes.length === 0 ||
          filters.sizes.some((size) => (product.sizes || []).includes(size))) &&
        (filters.materials.length === 0 ||
          filters.materials.some((material) =>
            (product.material || []).includes(material)
          ))
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "size":
          return b.size - a.size;
        case "newest":
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        default:
          return 0; // Default/featured sorting
      }
    });

  const handlePriceChange = (min, max) => {
    setFilters({ ...filters, priceRange: [min, max] });
  };

  const toggleBrand = (brand) => {
    setFilters({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  const toggleMaterial = (material) => {
    setFilters({
      ...filters,
      material: filters.material === material ? null : material,
    });
  };
  const toggleSize = (size) => {
    setFilters({
      ...filters,
      size: filters.size === size ? null : size,
    });
  };

  const toggleColour = (colour) => {
    setFilters({
      ...filters,
      colours: filters.colours?.includes(colour)
        ? filters.colours.filter((c) => c !== colour)
        : [...filters.colours, colour],
    });
  };

  const fetchProductsbyCategory = (category) => {
    const response = dispatch(getProductsByCategory(category));
  };

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
    <div className="w-full h-full flex flex-col items-center justify-start overflow-auto pb-20">
      <NavigationHeader />
      <div className="w-full max-w-7xl px-4">
        {/* Header with title and mobile filter button */}
        <div className="flex justify-between items-center py-6 border-b">
          <h1 className="text-2xl font-bold capitalize">
            {category || "All Products"}
          </h1>
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
                <option value="newest">Newest Arrivals</option>
                <option value="newest">Size:XL to Small</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md"
            >
              {showFilters ? <FiX /> : <FiFilter />}
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 pt-6">
          {/* Filters Sidebar - Hidden on mobile unless toggled */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-4`}
          >
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                Price Range
                {filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? (
                  <button
                    onClick={() => handlePriceChange(0, 1000)}
                    className="text-sm text-red-600"
                  >
                    Reset
                  </button>
                ) : null}
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange(
                      filters.priceRange[0],
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Customer Rating</h3>
              {[4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`rating-${stars}`}
                    name="rating"
                    checked={filters.rating === stars}
                    onChange={() =>
                      setFilters({
                        ...filters,
                        rating: filters.rating === stars ? null : stars,
                      })
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`rating-${stars}`}
                    className="flex items-center"
                  >
                    {Array(stars)
                      .fill()
                      .map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    <span className="text-gray-500 ml-1">& Up</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Brand</h3>
              <div className="max-h-48 overflow-y-auto">
                {brands?.map((brand) => (
                  <div key={brand} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="mr-2"
                    />
                    <label htmlFor={`brand-${brand}`}>{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Material</h3>
              <div className="max-h-48 overflow-y-auto">
                {materials?.map((material) => (
                  <div key={material} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`brand-${material}`}
                      checked={filters.materials?.includes(material)}
                      onChange={() => toggleMaterial(material)}
                      className="mr-2"
                    />
                    <label htmlFor={`Material-${material}`}>{material}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Colour</h3>
              <div className="max-h-48 overflow-y-auto">
                {colours?.map((colour) => (
                  <div key={colour} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`brand-${colour}`}
                      checked={filters.colours?.includes(colour)}
                      onChange={() => toggleColour(colour)}
                      className={`mr-2 rounded-full ${
                        "bg-" + colour.toLowerCase() + "500"
                      }`}
                    />
                    <label htmlFor={`Colour-${colour}`}>{colour}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Sizes</h3>
              <div className="max-h-48 overflow-y-auto">
                {sizes?.map((size) => (
                  <div key={size} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`size-${size}`}
                      checked={filters.sizes?.includes(size)}
                      onChange={() => toggleSize(size)}
                      className={`mr-2`}
                    />
                    <label htmlFor={`Size-${size}`}>{size}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="in-stock"
                  checked={filters.inStock}
                  onChange={() =>
                    setFilters({ ...filters, inStock: !filters.inStock })
                  }
                  className="mr-2"
                />
                <label htmlFor="in-stock">In Stock Only</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="on-sale"
                  checked={filters.onSale}
                  onChange={() =>
                    setFilters({ ...filters, onSale: !filters.onSale })
                  }
                  className="mr-2"
                />
                <label htmlFor="on-sale">On Sale</label>
              </div>
            </div>

            <button
              onClick={() =>
                setFilters({
                  priceRange: [0, 1000],
                  rating: null,
                  brands: [],
                  inStock: false,
                  onSale: false,
                })
              }
              className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-4 text-gray-600">
              {filteredProducts.length} products found
            </div>

            {/* Product Grid */}
            <div className="flex w-full flex-wrap gap-1">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={`${product.id}-${Math.random()}`} // Better key for duplicates
                  product={product}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700">
                  No products match your filters
                </h3>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 1000],
                      rating: null,
                      brands: [],
                      inStock: false,
                      onSale: false,
                    })
                  }
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

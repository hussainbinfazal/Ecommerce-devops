import React, { useState, useEffect } from "react";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import TopProducts, { StarRating } from "../../components/shared/TopProducts";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowsRotate } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiHeart, FiEyeOff } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BsCartCheckFill } from "react-icons/bs";

import { getProducts } from "../../redux/slices/productSlice";
import {
  mergeGuestCart,
  fetchCartItems,
  fetchGuestCart,
  addToGuestCart,
  clearGuestCart,
  removeFromGuestCart,
  removeFromCart,
  addToCart,
  updateCartItemQuantity,
  checkoutCart,
  updateCouponStatus,
} from "../../redux/slices/cartSlice";
import {
  addToGuestWishlist,
  removeFromGuestWishlist,
  fetchGuestWishlist,
  removeFromWishlist,
  addToWishlist,
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  // const [isLiked, setIsLiked] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [releatedProucts, setReleatedProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const { cartItems, guestCartItems, guestCartSubtotal, cart, loading } =
    useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);

  const maxQuantity = product?.countInStock || 10;
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const incrementQuantity = () => {
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const releatedProducts = products.filter(
    (p) => p.category === product.category
  );
  console.log(releatedProducts);
  const getProductById = async (productId) => {
    const fetchedProducts = await dispatch(getProducts()).unwrap();
    const foundProduct = fetchedProducts.find((p) => p._id === productId);
    const releatedProucts = fetchedProducts.filter(
      (p) => p.category === product.category
    );
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.productImage);
      setReleatedProducts(releatedProucts);
    }
  };

  useEffect(() => {
    if (productId) getProductById(productId);
  }, [productId]);

  const handleAddToCart = async (productId, quantity, colour, size) => {
    if (isAuthenticated) {
      if (!colour || !size) {
        alert("Please select both color and size before adding to cart.");
        return;
      }
      if (quantity === 0) {
        window.alert("Please select quantity");
        return;
      }
      await dispatch(
        addToCart({
          productId: product._id,
          quantity,
          colour: colour,
          size: size,
        })
      ).unwrap();
      await dispatch(fetchCartItems()).unwrap();
      setQuantity(1);
      setColour("");
      setSize("");
    } else {
      dispatch(addToGuestCart(productId, quantity, colour, size));
      dispatch(fetchGuestCart()).unwrap();
      dispatch(fetchWishlist()).unwrap();
      setQuantity(1);
      setColour("");
      setSize("");
    }
  };
  const handleRemoveFromCart = async (productId, quantity, colour, size) => {
    if (isAuthenticated) {
      await dispatch(
        removeFromCart({
          productId: product._id,
          quantity: quantity,
          colour: colour,
          size: size,
        })
      ).unwrap();
      await dispatch(fetchWishlist()).unwrap();
      await dispatch(fetchCartItems()).unwrap();
    } else {
      dispatch(removeFromGuestCart(productId));
      dispatch(fetchGuestCart()).unwrap();
      dispatch(fetchWishlist()).unwrap();
      setQuantity(1);
      setColour("");
      setSize("");
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

  // Functionality
  const { wishlist, guestWishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.user);
  const alreadyAdded = isAuthenticated
    ? cartItems?.some((item) => item?.product?._id === product._id)
    : guestCartItems?.some((item) => item?._id === product._id);
  const isLiked =
    (Array.isArray(wishlist) &&
      wishlist.some((item) => item?.product?._id === product._id)) ||
    (Array.isArray(guestWishlist) &&
      guestWishlist.some((item) => item?.product?._id === product._id));

  const navigate = useNavigate();

  // payment process if user buys the product directly from the page
  

  useEffect(() => {
    if (
      cartItems.some(
        (item) => item.product._id === productId || item.product === productId
      )
    ) {
      setIsAdded(true);
    }
    console.log("This is the cartitems", cartItems);
  }, [productId, product, cartItems]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start lg:justify-center overflow-auto pb-20">
      <div className="lg:w-6/7 w-full lg:h-[800px] h-[1500px] px-4">
        <NavigationHeader />

        <div className="w-full lg:h-[600px] h-[1380px] py-4 flex flex-col lg:flex-row justify-between items-center">
          {/* Left Images Side */}
          <div className="lg:w-3/5 w-full h-full flex justify-start items-center">
            <div className="w-[24%] h-full flex flex-col justify-between items-center gap-4">
              {product?.images?.map((img) => (
                <div
                  key={img}
                  className="w-full h-[130px] bg-[#dad7d7] flex justify-center items-center rounded-md"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-[90%] h-4/5 rounded-md"
                    onClick={() => setMainImage(img)}
                  />
                </div>
              ))}
            </div>
            <div className="w-[70%] h-full flex items-center justify-center mx-4 my-3 bg-[#F5F5F5] rounded-md">
              <img
                src={
                  mainImage?.startsWith("http")
                    ? mainImage
                    : `${
                        import.meta.env.VITE_API_URL
                      }/uploads/productImages/${mainImage}`
                }
                alt=""
                className="w-4/5 h-4/5 object-cover"
              />
            </div>
          </div>

          {/* Right Product Info Side */}
          <div className="lg:w-2/5 w-full h-full mt-10 lg:mt-0">
            <div className="w-full h-full flex flex-col justify-center items-center px-8">
              <div className="w-[90%] h-[50%] border-b flex flex-col gap-2 py-1">
                <span className="text-2xl">{product?.name}</span>
                <span className="flex items-center gap-4 text-sm">
                  <StarRating rating={product?.rating || 0} /> (
                  {product?.numReviews}) |{" "}
                  <span
                    className={`${
                      product?.stock ? "text-green-500" : "text-red-500"
                    } flex items-center`}
                  >
                    {product?.countInStock}
                  </span>{" "}
                  in stock
                </span>
                <span className="font-semibold text-2xl flex items-center gap-4  ">
                  {product?.discount ? (
                    <>
                      <span className="text-green-600">
                        ₹
                        {Math.floor(
                          product.price -
                            (product.price * product.discount) / 100
                        )}
                      </span>
                      <span className="line-through text-gray-500 text-base">
                        ₹{product.price}
                      </span>
                      <span className="text-lg text-red-500">
                        -{product.discount}%
                      </span>
                    </>
                  ) : (
                    <span>₹{product?.price}</span>
                  )}
                </span>
                <span className="max-h-[200px] line-clamp-2">
                  {product?.description}
                </span>
              </div>

              <div className="w-[90%] h-[70%] flex flex-col justify-start items-start py-4 gap-4">
                {/* Colors */}
                <span className="flex items-center gap-3">
                  <h3 className="text-lg">Colors:</h3>
                  <span className="flex gap-2 lowercase">
                    {product?.colours?.map((color, i) => (
                      <div
                        key={i}
                        className={`w-[20px] h-[20px] rounded-full hover:border-2 ${
                          colour.toLowerCase() === color.toLowerCase()
                            ? "border-1 border-gray-400"
                            : "border-1 border-transparent"
                        } cursor-pointer`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        onClick={(e) => setColour(color.toLowerCase())}
                      ></div>
                    ))}
                  </span>
                </span>

                {/* Size */}
                <span className="flex items-center gap-3">
                  <h3 className="text-lg">Size:</h3>
                  <span className="flex gap-2">
                    {product?.sizes?.map((s, i) => (
                      <div
                        key={i}
                        className={`w-[30px] h-[30px] rounded-md border-1 px-1 text-sm hover:bg-red-700 hover:text-white cursor-pointer flex justify-center items-center ${
                          s === size ? "bg-red-700 text-white" : ""
                        } outline-none`}
                        onClick={() => {
                          setSize(s);
                        }}
                      >
                        {s}
                      </div>
                    ))}
                  </span>
                </span>

                {/* Quantity + Actions */}
                <span className="flex flex-col lg:flex-row items-center gap-6 w-full">
                  <span className="flex items-center w-full lg:w-1/2 h-[60px]">
                    <button
                      onClick={decrementQuantity}
                      className="w-[50px] h-[90%] rounded-l-md border hover:bg-red-700 hover:text-white"
                    >
                      -
                    </button>
                    <div className="w-[80px] h-[90%] border flex justify-center items-center">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-[50px] h-[90%] rounded-r-md border hover:bg-red-700 hover:text-white"
                    >
                      +
                    </button>
                  </span>
                  <span className="w-full lg:w-1/2 h-[70px] flex justify-end items-center gap-2">
                    {alreadyAdded ? (
                      <button
                        className="hover:scale-105 transition-all bg-red-500 text-white h-[50px] w-full lg:w-[200px] rounded-md "
                        onClick={() =>
                          handleRemoveFromCart(product, quantity, colour, size)
                        }
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        className="hover:scale-105 transition-all bg-red-500 text-white h-[50px] w-full lg:w-[200px] rounded-md "
                        onClick={() =>
                          handleAddToCart(product, quantity, colour, size)
                        }
                      >
                        Buy Now
                      </button>
                    )}
                    <div
                      className="h-[50px] w-[50px] rounded-md bg-white border flex justify-center items-center cursor-pointer hover:scale-105"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      {isLiked ? (
                        <FaHeart
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnlike(product);
                          }}
                        />
                      ) : (
                        <FiHeart
                          className="w-5 h-5 text-gray-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(product);
                          }}
                        />
                      )}
                    </div>
                    <div
                      className="h-[50px] w-[50px] rounded-md bg-white border flex justify-center items-center cursor-pointer hover:scale-105"
                      onClick={() => setIsAdded(!isAdded)}
                    >
                      {isAdded ? (
                        <BsCartCheckFill
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromCart(
                              product,
                              quantity,
                              colour,
                              size
                            );
                          }}
                        />
                      ) : (
                        <FiShoppingCart
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product, quantity, colour, size);
                          }}
                        />
                      )}
                    </div>
                  </span>
                </span>

                {/* Delivery & Return */}
                <span className="flex items-center gap-6 w-full h-[80px] border-2 border-black pl-4 mt-10 rounded-sm">
                  <TbTruckDelivery className="w-[50px] h-[50px]" />
                  Free Delivery
                </span>
                <span className="flex items-center gap-6 w-full h-[80px] border-2 border-black pl-4 rounded-sm">
                  <FaArrowsRotate className="w-[40px] h-[50px]" />
                  Return within 3 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TopProducts
        topMostHeading="Related Products"
        isTimer={false}
        categoryTitle="You may also like"
        isGrid={false}
        isViewButton={true}
        bottomButtonText="View All Products"
        products={releatedProducts}
      />
    </div>
  );
};

export default Product;

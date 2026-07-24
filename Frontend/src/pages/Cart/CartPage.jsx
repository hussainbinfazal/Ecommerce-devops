import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
const CartPage = () => {
  const pathnames = useLocation().pathname.split("/").filter(Boolean);
  const dispatch = useDispatch();
  const { isAuthenticated, checking, user } = useSelector(
    (state) => state.user
  );
  const { cartItems, guestCartItems, guestCartSubtotal, cart, loading } =
    useSelector((state) => state.cart);
  const combinedCartItems =
    cartItems?.length > 0 ? cartItems : guestCartItems ? guestCartItems : [];
 
  const [quantities, setQuantities] = useState({});
  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      await dispatch(addToCart(product._id)).unwrap();
    } else {
      dispatch(
        addToGuestCart({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.productImage,
          qty: 1,
        })
      );
    }
  };
  const handleUpdateQuantity = async (productId, qty) => {
    try {
      await dispatch(updateCartItemQuantity({ productId, qty })).unwrap();
      await dispatch(fetchCartItems()).unwrap();
      await dispatch(mergeGuestCart()).unwrap();
    } catch (error) {
    }
  };
  const handleRemoveFromCart = async (product) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (isConfirmed) {
      if (isAuthenticated) {
        try {
          await dispatch(removeFromCart(product?.product?._id)).unwrap();
          await dispatch(fetchCartItems()).unwrap();
          await dispatch(mergeGuestCart()).unwrap();
          dispatch(clearGuestCart()).unwrap();
        } catch (error) {
        }
      } else {
        dispatch(removeFromGuestCart(product));
        dispatch(fetchGuestCart());
      }
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      console.log("Fetching cart items...");
      if (isAuthenticated) {
        try {
          const data = await dispatch(fetchCartItems()).unwrap();
          console.log("Cart items fetched:", data);
          
          const mergedCart = await dispatch(mergeGuestCart()).unwrap();
          console.log("Merged cart items:", mergedCart);
          dispatch(clearGuestCart());
        } catch (error) {
          console.log("Error fetching cart items:", error);
          
        }
      } else {
        dispatch(fetchGuestCart());
      }
    };
    fetchCart();
  }, [dispatch, isAuthenticated]);
  const navigate = useNavigate();
  useEffect(() => {
    if (combinedCartItems && combinedCartItems.length > 0) {
      const initialQuantities = {};
      combinedCartItems.forEach((item) => {
        initialQuantities[item._id] = item.qty || 1;
      });
      setQuantities(initialQuantities);
    }
  }, [combinedCartItems]);

  const handleUpdateCart = async () => {
    if (isAuthenticated) {
      try {
        const data = await dispatch(fetchCartItems()).unwrap();
        await dispatch(mergeGuestCart()).unwrap();
        dispatch(clearGuestCart());
        navigate("/checkout");
      } catch (error) {
      }
    } else {
      dispatch(fetchGuestCart());
    }
  };

  const handleUpdateCoupon = async (coupon) => {
    if (isAuthenticated) {
      try {
        await dispatch(updateCouponStatus(coupon)).unwrap();
        await dispatch(fetchCartItems()).unwrap();
      } catch (error) {}
    }
  };
  const [coupon, setCoupon] = useState();
  // if(loading){
  //   return <h1>Loading</h1>
  // }

  useEffect(() => {
    const fetchAllCartItems = async () => {
      if (isAuthenticated) {
        try {
          const data = await dispatch(fetchCartItems()).unwrap();
          await dispatch(mergeGuestCart()).unwrap();
          dispatch(clearGuestCart());
        } catch (error) {
        }
      } else {
        dispatch(fetchGuestCart());
      }
    };
    fetchAllCartItems();
  }, [isAuthenticated]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start lg;justify-center xl:justify-center 2xl:justify-center  pr-5 overflow-auto mt-16">
      <div className=" lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full  flex items-center gap-2  px-2   text-sm">
        <Link to="/" className="text-gray-600 hover:text-blue-500">
          Home
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={name}>
              <MdKeyboardArrowRight className="text-gray-500" />
              {isLast ? (
                <span className="text-gray-900 font-medium capitalize">
                  {name}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-600 hover:text-blue-500 capitalize"
                >
                  {name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="cart lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full px-4  flex items-center justify-end pr-0 flex-col mt-20 lg:px-18 xl:px-18 2xl:px-18 ">
        <div className="cartHeadings w-full h-[80px] pr-0 flex justify-between items-center lg:px-18 xl:px-18 2xl:px-18  py-4 shadow-xl mb-4">
          <div className="w-1/4 h-full pl-2 lg:px-4 xl:px-4 2xl:px-4">
            Product
          </div>
          <div className="w-1/4 h-full">Price</div>
          <div className="w-1/4 h-full">Quantity</div>
          <div className="w-1/4 h-full">Subtotal</div>
        </div>
        <div className="cartItems w-full h-2/4 flex flex-col justify-end lg:gap-2 lg:px-18 xl:px-18 2xl:px-18 pr-0  ">
          {/* cartItems */}
          {Array.isArray(combinedCartItems) && combinedCartItems.length > 0 ? (
            combinedCartItems?.map((item, index) => (
              <div
                key={item?._id}
                className="w-full flex justify-between items-center h-[75px] px:0 lg:px-1  my-6 shadow-lg"
              >
                <div className="w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4 h-full flex items-center gap-2 md:gap-4 lg:gap:4 xl:gap-4 2xl:gap-4 relative sm:pl-3 md:pl-3 lg:pl-3 xl:pl-3 2xl:pl-3">
                  <img
                    src={
                          item?.product?.productImage?.startsWith("http")
                            ? item?.product.productImage
                            : `${
                                import.meta.env.VITE_API_URL
                              }/uploads/productImages/${item?.product?.productImage}`
                        }
                    alt={item?.name}
                    className="w-[50px] h-[50px] object-cover relative"
                  />
                  <span className="text-sm cursor-pointer" onClick={() => navigate(`/product/${item?.product?._id}`)}>{item?.product?.name}</span>
                  <div className="absolute top-2 left-2 w-[20px] h-[5px]  z-40 rounded-full">
                    <RxCross2
                      className="bg-red-500 hover:bg-red-700 hover:scale-110 text-white rounded-full"
                      onClick={() => {handleRemoveFromCart(item)
                        
                      }}
                    />
                  </div>
                </div>
                <div className="w-1/4 h-full flex items-center justify-start sm:justify-start lg:justify-start xl:justify-start 2xl:justify-start gap-1 pl-3 text-semibold text-lg">
                  <span>₹</span>
                  {
                    (item?.product?.discount
                      ? item?.product?.price -
                        (item?.product?.price * item?.product?.discount) / 100
                      : item?.product?.price
                    )
                      ?.toString()
                      .split(".")[0]
                  }
                </div>
                <div className="w-1/4 h-full flex items-center  justify-center sm:justify-start lg:justify-center xl:justify-start 2xl:justify-start">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantities[item._id] || 1}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value);
                      setQuantities({
                        ...quantities,
                        [item._id]: newQty,
                      });
                      handleUpdateQuantity(item?.product?._id, newQty);
                    }}
                    className="w-12 h-3/4 text-center focus:outline-none appearance-none border-1 border-gray-300 p-1"
                    style={{
                      /* Force arrows to show */
                      "-moz-appearance": "textfield" /* Firefox */,
                      "&::-webkit-inner-spin-button": {
                        marginLeft: "8px", // Adds gap between arrows
                      },
                    }}
                  />
                </div>
                <div className="w-1/4 h-full flex items-center  justify-start sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start">
                  ₹{" "}
                  {(item?.product?.discount
                    ? item?.product.price -
                      (item?.product?.price * item?.product?.discount) / 100
                    : item?.product?.price
                  )
                    ?.toString()
                    .split(".")[0] * quantities[item._id] || 1}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                No Items in Cart
              </span>
            </div>
          )}
        </div>
        <div className="cartFooter w-full h-1/4 flex justify-between items-center lg:px-18 xl:px-18 2xl:px-18 lg:pr-20 xl:pr-20 2xl:pr-20 my-6">
          <button
            className="w-[150px] lg:w-[250px] xl:w-[250px] 2xl:w-[250px] h-[50px]  lg:h-[50px] xl:h-[50px] 2xl:h-[50px] border-2 border-black flex justify-center items-center"
            onClick={() => navigate("/")}
          >
            Return to shop
          </button>
          <button
            className="w-[150px] lg:w-[250px] xl:w-[250px] 2xl:w-[250px] h-[50px]  lg:h-[50px] xl:h-[50px] 2xl:h-[50px] border-2 border-black flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={handleUpdateCart}
          >
            Update Cart
          </button>
        </div>
      </div>
        {Array.isArray(combinedCartItems) && combinedCartItems.length > 0 && (
      <div className="cartTotal w-6/7 h-[580px] lg:h-[520px] xl:h-[520px] 2xl:h-[520px] gap-4 bg-white py-4 lg:mt-18 xl:mt-18 2xl:mt-18 flex flex-col lg:flex-row xl:flex-row 2xl:flex-row  justify-between lg:px-36 xl:px-36 2xl:px-36 ">
        {/* Tota Left */}
          <>
            <div className="w-full lg:w-1/2 h-full flex justify-between lg:justify-start items-center lg:items-start gap-2 lg:gap-4">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-2/3 lg:w-1/2 h-[50px] border-2 border-black rounded-md pl-4"
                placeholder="Coupon Code"
              />
              <button
                className="w-1/3 h-[50px] border-2 border-black rounded-md text-white bg-red-700/80 hover:bg-red-500/95 hover:scale-90 transition-all duration-300"
                onClick={() => handleUpdateCoupon(coupon)}
              >
                Apply Coupon
              </button>
            </div>

            <div className="w-full lg:w-1/2 h-full flex justify-end items-start text-black">
              <div className="w-[440px] h-[450px] rounded-md border-black border-2 px-4">
                <div className="w-full h-1/5 flex items-center text-black text-2xl py-2">
                  Cart Total
                </div>

                <div className="w-full h-1/8 flex justify-between items-center text-lg border-b-2 border-black">
                  Subtotal <span>₹ {Math.ceil(cart.subTotal)}</span>
                </div>

                <div className="w-full h-1/8 flex justify-between items-center text-lg border-b-2 border-black">
                  Shipping <span>₹ {cart?.shipping}</span>
                </div>

                <div className="w-full h-1/8 flex justify-between items-center text-lg border-b-2 border-black">
                  Tax <span>₹ {Math.floor(cart?.tax)}</span>
                </div>

                {cart?.coupon?.coupon && cart?.coupon?.discount && (
                  <div className="w-full h-1/8 flex justify-between items-center text-lg border-b-2 border-black">
                    Coupon code applied: {cart.coupon.coupon}
                    <span>-{cart.coupon.discount}%</span>
                  </div>
                )}

                <div className="w-full h-1/8 flex justify-between items-center text-lg">
                  Total <span>₹ {Math.floor(cart?.total)}</span>
                </div>

                <div className="w-full h-1/8 flex justify-center items-center text-lg">
                  <button
                    className="cursor-pointer hover:scale-90 hover:bg-red-500/95 transition-all duration-300 w-[280px] h-[50px] border-2 border-white rounded-md text-white bg-red-700/80"
                    onClick={() => navigate("/cart/checkout")}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </>
      </div>
        )}
      {/* <div className="w-full h-[50px] "></div> */}
    </div>
  );
};

export default CartPage;

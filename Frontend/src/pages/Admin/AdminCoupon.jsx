import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Optional: for user feedback
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  fetchCoupons,
  fetchCouponByUser,
} from "../../redux/adminSlices/adminCouponSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const AdminCoupon = () => {
  const { coupons, coupon } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const [couponData, setCouponData] = useState({
    code: "",
    discount: "",
    expiresAt: "",
    usageLimit: "",
  });
  const [newCouponData, setNewCouponData] = useState({
    code: "",
    discount: "",
    expiresAt: "",
    usageLimit: "",
  });

  const [existingCouponId, setExistingCouponId] = useState();
  const [editingStatus, setEditingStatus] = useState(false);
  const handleChange = (e) => {
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value,
    });
    setNewCouponData({
      ...newCouponData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createCoupon(newCouponData)).unwrap();
      
      await dispatch(fetchCoupons()).unwrap();
      setNewCouponData({
        code: "",
        discount: "",
        expiresAt: "",
        usageLimit: "",
      });
    } catch (error) {
      
      toast.error(error.response?.data?.message || "Failed to create coupon");
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );
    if (isConfirmed) {
      try {
        await dispatch(deleteCoupon(couponId)).unwrap();
        await dispatch(fetchCoupons()).unwrap();
        toast.success("Coupon deleted successfully!");
      } catch (error) {
        
        toast.error(error.response?.data?.message || "Failed to delete coupon");
      }
    }
  };
  const handleUpdateCoupon = async (couponId, couponData) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to update this coupon?"
    );
    if (isConfirmed) {
      try {
        await dispatch(updateCoupon({ couponId, couponData })).unwrap();
        await dispatch(fetchCoupons()).unwrap();
        setEditingStatus(false);
        setExistingCouponId(null);
        setCouponData({
          code: "",
          discount: "",
          expiresAt: "",
          usageLimit: "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update coupon");
      }
    }
  };
  const handleStartEditing = (coupon) => {
    setEditingStatus(true);
    setExistingCouponId(coupon._id);

    let formattedDate = "";

    if (coupon.expiresAt) {
      const dateObj = new Date(coupon.expiresAt);
      formattedDate = dateObj.toISOString().split("T")[0]; // ✅ Converts to "yyyy-MM-dd"
    }

    setCouponData({
      code: coupon.code,
      discount: coupon.discount,
      expiresAt: formattedDate,
      usageLimit: coupon.usageLimit,
    });
  };

  const handleCancelEditing = () => {
    setEditingStatus(false);
    setExistingCouponId(null);
    setCouponData({
      code: "",
      discount: "",
      expiresAt: "",
      usageLimit: "",
    });
  };

  useEffect(() => {
    const fetchAllCoupons = async () => {
      try {
        await dispatch(fetchCoupons()).unwrap();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch coupons");
      }
    };
    fetchAllCoupons();
  }, []);
  return (
    <div className="w-full min-h-screen flex-1 flex flex-col  items-center gap-2 overflow-auto ">
      <div className="w-[95%] min-h-[100px] bg-gray-100 py-4 pt-0">
        <h2 className="text-2xl font-semibold bg-white text-gray-800 r ">
          Existing Coupon
        </h2>
        <div className="w-full flex h-auto flex-col gap-2 px-4 py-2   bg-white">
          <div className="w-full flex h-[40px] ">
            <div className="w-1/5 h-full flex items-center text-gray-600 bg-[#e1e5f2] font-semibold px-2">
              Coupon
            </div>
            <div className="w-1/5 h-full flex items-center text-gray-600 bg-[#e1e5f2] font-semibold px-2">
              Discount
            </div>
            <div className="w-1/5 h-full flex items-center text-gray-600 bg-[#e1e5f2] font-semibold px-2">
              Expiry Date
            </div>
            <div className="w-1/5 h-full flex items-center text-gray-600 bg-[#e1e5f2] font-semibold px-2">
              Usage Limit
            </div>
            <div className="w-1/5 h-full flex items-center text-gray-600 bg-[#e1e5f2] font-semibold ">
              Actions
            </div>
          </div>
          <div className="w-full  min-h-full max-h-[400px] overflow-y-auto bcoupon-b-1 bcoupon-gray-700">
            {/* here we do the Map of the coupons */}
            {coupons && coupons.length > 0 ? (
              coupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="w-full flex h-[60px] border-b-1 bg-white hover:bg-gray-50  border-gray-200"
                >
                  <div className="w-1/5 h-full flex items-center text-gray-800  font-medium px-2">
                    {editingStatus && existingCouponId === coupon._id ? (
                      <input
                        type="text"
                        name="code"
                        value={couponData.code}
                        onChange={handleChange}
                        className="w-full h-full text-gray-800 bg-whit  font-medium outline-none"
                      />
                    ) : (
                      coupon.code
                    )}
                  </div>
                  <div className="w-1/5 h-full flex items-center text-gray-800  font-medium px-2">
                    {editingStatus && existingCouponId === coupon._id ? (
                      <input
                        type="number"
                        name="discount"
                        value={couponData.discount}
                        onChange={handleChange}
                        className="w-full h-full text-gray-800  font-medium outline-none"
                      />
                    ) : (
                      coupon.discount && (
                        <span className="text-green-500">
                          {coupon.discount}%
                        </span>
                      )
                    )}
                  </div>
                  <div className="w-1/5 h-full flex items-center text-gray-800  font-medium px-2">
                    {editingStatus && existingCouponId === coupon._id ? (
                      <input
                        type="date"
                        name="expiresAt"
                        value={couponData.expiresAt}
                        onChange={handleChange}
                        className="w-full h-full text-gray-800  font-medium outline-none "
                      />
                    ) : (
                      new Date(coupon.expiresAt).toLocaleDateString()
                    )}
                  </div>
                  <div className="w-1/5 h-full flex items-center text-gray-800  font-medium px-2">
                    {editingStatus && existingCouponId === coupon._id ? (
                      <input
                        type="number"
                        name="usageLimit"
                        value={couponData.usageLimit}
                        onChange={handleChange}
                        className="w-full h-full text-gray-800  font-medium outline-none"
                      />
                    ) : (
                      coupon.usageLimit
                    )}
                  </div>
                  <div className="w-1/5 h-full flex items-center text-gray-800  font-medium px-2">
                    {existingCouponId === coupon._id && editingStatus ? (
                      <div
                        className={`w-[100%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-between items-center gap-2 px-2  `}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={`w-[80px] h-[40px] bg-rose-500 text-white text-sm rounded-sm ${
                            existingCouponId === coupon._id && existingCouponId
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          disabled={existingCouponId !== coupon._id}
                          onClick={() => {
                           
                            
                            handleUpdateCoupon(coupon._id, couponData);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className={`w-[80px] h-[40px] bg-rose-500 text-white text-sm rounded-sm ${
                            existingCouponId === coupon._id && existingCouponId
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          onClick={() => handleDeleteCoupon(coupon._id)}
                          disabled={existingCouponId !== coupon._id}
                        >
                          Delete
                        </button>
                        <RxCross2
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => handleCancelEditing()}
                        />
                      </div>
                    ) : (
                      <div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-between items-center gap-2 px-2">
                        <CiEdit
                          className="w-5 h-5 cursor-pointer text-blue-500 "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEditing(coupon);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                No coupon found
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl mx-auto mt-16 p-6 bcoupon rounded shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Create Coupon</h2>
        <form onSubmit={handleCreateCoupon} className="flex flex-col gap-4">
          {/* Coupon Code */}
          <div>
            <label className="block font-medium mb-1">Coupon Code</label>
            <input
              type="text"
              name="code"
              value={newCouponData.code}
              onChange={handleChange}
              className="w-full bcoupon px-3 py-2 rounded"
              placeholder="e.g. WELCOME10"
              required
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={newCouponData.discount}
              onChange={handleChange}
              className="w-full bcoupon px-3 py-2 rounded"
              placeholder="e.g. 10"
              required
              min={1}
              max={100}
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block font-medium mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiresAt"
              value={newCouponData.expiresAt}
              onChange={handleChange}
              className="w-full bcoupon px-3 py-2 rounded"
            />
          </div>

          {/* Usage Limit */}
          <div>
            <label className="block font-medium mb-1">Usage Limit</label>
            <input
              type="number"
              name="usageLimit"
              value={newCouponData.usageLimit}
              onChange={handleChange}
              className="w-full bcoupon px-3 py-2 rounded"
              placeholder="e.g. 100"
              min={1}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Create Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCoupon;

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleOrder,
  deleteOrderByAdmin,
  updateOrderStatus,
  updatePaymentStatus,
} from "../../redux/adminSlices/adminOrdersSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchSingleOrder(orderId));
    }
  }, [orderId, dispatch]);

  console.log("Order Details:", order);
  const handlePaymentStatus = async (orderId, paymentStatus) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to mark this order as paid?"
    );
    if (isConfirmed) {
      try {
        await dispatch(updatePaymentStatus({ orderId, paymentStatus }));
        // toast.success("Order status updated successfully");
        await dispatch(fetchSingleOrder(orderId)); // Refresh the order details after updating
      } catch (error) {
        toast.error("Failed to update order status, please try again.");
      }
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (isConfirmed) {
      try {
        await dispatch(deleteOrderByAdmin(orderId));
        toast.success("Order deleted successfully");
        navigate(`/admin/orders`);
      } catch (error) {
        toast.error("Failed to delete order, please try again.");
      }
    }
  };

  if (loading || !order || order._id !== orderId) return <LoadingSpinner />;

  return (
    <div className="order-details-container p-5 w-full h-full gap-2 relative">
      {/* Action Buttons */}
      <div className="absolute top-5 right-4 z-10">
        <div className="flex space-x-2">
          <button
            className="w-[140px] h-[40px] bg-green-600 text-white rounded-sm cursor-pointer hover:scale-95 transition-all p-1"
            onClick={() =>
              handlePaymentStatus(orderId, order.isPaid ? "Unpaid" : "Paid")
            }
          >
            {order.isPaid ? "Mark as Unpaid" : "Mark as Paid"}
          </button>
          <button
            className="w-[100px] h-[40px] bg-red-500 text-white rounded-sm cursor-pointer hover:scale-95 transition-all"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-2">Order Details</h2>

      <div className="order-summary mt-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Order Status:</strong> {order.status}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{order.totalPrice?.toFixed(2)}
        </p>
      </div>

      {/* Order Items Table */}
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md "
                  />
                </td>
                <td className="px-4 py-2 font-medium">{item.name}</td>
                <td className="px-4 py-2">{item.qty}</td>
                <td className="px-4 py-2">₹{item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shipping Info */}
      <div className="shipping-info mt-4">
        <h3 className="text-xl font-semibold">Shipping Address</h3>
        <p>
          {order.shippingAddress?.address?.street},{" "}
          {order.shippingAddress?.address?.apartment}
        </p>
        <p>
          {order.shippingAddress?.address?.city},{" "}
          {order.shippingAddress?.address?.state}
        </p>
        <p>
          {order.shippingAddress?.address?.country} -{" "}
          {order.shippingAddress?.address?.pincode}
        </p>
      </div>

      {/* Payment Info */}
      <div className="payment-info mt-4">
        <h3 className="text-xl font-semibold">Payment Status</h3>
        <p>
          <strong>Method:</strong> {Object.values(order.paymentMethod) || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {order.isPaid ? "Paid" : "Not Paid"}
        </p>
        {order.isPaid && (
          <p>
            <strong>Paid At:</strong>{" "}
            {new Date(order.paidAt).toLocaleDateString()}
          </p>
        )}
        <p>
          <strong>Email:</strong> {order.paymentResult?.email_address || "N/A"}
        </p>
      </div>

      {/* Delivery Info */}
      <div className="delivery-info mt-4">
        <h3 className="text-xl font-semibold">Delivery Status</h3>
        <p>
          <strong>Status:</strong>{" "}
          {order.isDelivered ? "Delivered" : "Not Delivered"}
        </p>
        {order.isDelivered && (
          <p>
            <strong>Delivered At:</strong>{" "}
            {new Date(order.deliveredAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetails;

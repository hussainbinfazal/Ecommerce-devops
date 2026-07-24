import React from "react";
import { Link } from "react-router-dom";
import { FaShippingFast, FaGlobe, FaClock, FaBoxOpen } from "react-icons/fa";
import NavigationHeader from "../../components/layout/NavigatioHeader";
const ShippingPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Shipping Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaShippingFast className="mx-auto text-3xl text-blue-600 mb-3" />
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over ₹50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaGlobe className="mx-auto text-3xl text-green-600 mb-3" />
            <h3 className="font-semibold">Global Delivery</h3>
            <p className="text-sm text-gray-600">Worldwide shipping</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaClock className="mx-auto text-3xl text-orange-600 mb-3" />
            <h3 className="font-semibold">Fast Processing</h3>
            <p className="text-sm text-gray-600">24-48 hour dispatch</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaBoxOpen className="mx-auto text-3xl text-purple-600 mb-3" />
            <h3 className="font-semibold">Order Tracking</h3>
            <p className="text-sm text-gray-600">Real-time updates</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Domestic Shipping */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Domestic Shipping
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We offer various shipping options for domestic orders within
                  [Your Country]:
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-3">Standard Shipping</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Delivery Time: 3-5 business days</li>
                    <li>Cost: ₹4.99 (Free for orders over ₹50)</li>
                    <li>Tracking included</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-3">Express Shipping</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Delivery Time: 1-2 business days</li>
                    <li>Cost: ₹9.99</li>
                    <li>Priority handling</li>
                    <li>Real-time tracking</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-3">Next Day Delivery</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Order by 2 PM for next-day delivery</li>
                    <li>Cost: ₹14.99</li>
                    <li>Available for select locations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* International Shipping */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. International Shipping
              </h2>
              <p className="text-gray-700 mb-4">
                We ship to most countries worldwide. International shipping
                rates and delivery times vary by location:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-3">Standard International</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Delivery Time: 7-14 business days</li>
                    <li>Cost: Starting from ₹19.99</li>
                    <li>Tracking available</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-3">Express International</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Delivery Time: 3-5 business days</li>
                    <li>Cost: Starting from ₹39.99</li>
                    <li>Priority handling</li>
                    <li>Full tracking</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Important Notice
                </h3>
                <p className="text-yellow-700">
                  International customers are responsible for all duties, import
                  taxes, and customs fees.
                </p>
              </div>
            </section>

            {/* Processing Time */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. Processing Time
              </h2>
              <p className="text-gray-700 mb-4">
                Orders are typically processed within 24-48 hours of being
                placed. During peak seasons or sales events, processing may take
                up to 72 hours.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Orders placed before 2 PM (EST) are processed same day</li>
                <li>Weekend orders are processed on Monday</li>
                <li>Holiday orders may require additional processing time</li>
              </ul>
            </section>

            {/* Tracking Orders */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Tracking Your Order
              </h2>
              <p className="text-gray-700 mb-4">
                All orders include tracking capabilities. To track your order:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Log into your account</li>
                <li>Visit the Order History section</li>
                <li>Click on your order number</li>
                <li>Click "Track Package"</li>
              </ol>
            </section>

            {/* Shipping Restrictions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Shipping Restrictions
              </h2>
              <p className="text-gray-700 mb-4">
                Some items and destinations may have shipping restrictions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Certain hazardous materials</li>
                <li>Oversized items may incur additional fees</li>
                <li>
                  Some remote locations may require extended delivery times
                </li>
                <li>Specific countries may have import restrictions</li>
              </ul>
            </section>

            {/* Lost or Damaged Packages */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Lost or Damaged Packages
              </h2>
              <p className="text-gray-700 mb-4">
                In the event your package is lost or damaged during transit:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Contact our customer service within 48 hours</li>
                <li>
                  Provide order number and photos of damage (if applicable)
                </li>
                <li>We'll initiate a trace or replacement process</li>
                <li>Resolution typically within 3-5 business days</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Shipping Questions?</h3>
            <p className="text-gray-700 mb-4">
              Our customer service team is here to help with any
              shipping-related questions:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Email: shipping@yourcompany.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Monday-Friday, 9AM-5PM EST</li>
            </ul>
          </div>

          {/* Related Links */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Related Information</h3>
            <div className="space-x-4">
              <Link
                to="/refund-policy"
                className="text-blue-600 hover:underline"
              >
                Refund Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-blue-600 hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} [Your Company Name]. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

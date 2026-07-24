import React from "react";
import { Link } from "react-router-dom";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import {
  FaShoppingCart,
  FaExchangeAlt,
  FaUserCircle,
  FaCreditCard,
  FaTruck,
  FaQuestionCircle,
  FaHeadset,
  FaBook,
} from "react-icons/fa";

const Help = () => {
  // Help categories with their respective topics
  const helpCategories = [
    {
      title: "Orders & Shipping",
      icon: <FaShoppingCart className="text-3xl text-blue-600" />,
      topics: [
        { title: "Track my order", link: "/track-order" },
        { title: "Shipping methods and costs", link: "/shipping-info" },
        { title: "Order cancellation", link: "/order-cancellation" },
        { title: "International shipping", link: "/international-shipping" },
        { title: "Order status", link: "/order-status" },
      ],
    },
    {
      title: "Returns & Refunds",
      icon: <FaExchangeAlt className="text-3xl text-green-600" />,
      topics: [
        { title: "Return policy", link: "/return-policy" },
        { title: "Start a return", link: "/start-return" },
        { title: "Refund status", link: "/refund-status" },
        { title: "Exchange items", link: "/exchanges" },
        { title: "Return shipping", link: "/return-shipping" },
      ],
    },
    {
      title: "Account & Profile",
      icon: <FaUserCircle className="text-3xl text-purple-600" />,
      topics: [
        { title: "Account settings", link: "/account-settings" },
        { title: "Password reset", link: "/reset-password" },
        { title: "Profile management", link: "/profile" },
        { title: "Address book", link: "/addresses" },
        { title: "Privacy settings", link: "/privacy-settings" },
      ],
    },
    {
      title: "Payment & Pricing",
      icon: <FaCreditCard className="text-3xl text-red-600" />,
      topics: [
        { title: "Payment methods", link: "/payment-methods" },
        { title: "Pricing information", link: "/pricing" },
        { title: "Promotions & discounts", link: "/promotions" },
        { title: "Gift cards", link: "/gift-cards" },
        { title: "Billing issues", link: "/billing" },
      ],
    },
  ];

  // Quick help guides
  const quickGuides = [
    {
      title: "How to Place an Order",
      icon: <FaShoppingCart className="text-2xl text-blue-600" />,
      steps: [
        "Browse products and add to cart",
        "Review your shopping cart",
        "Enter shipping information",
        "Choose payment method",
        "Confirm and place order",
      ],
    },
    {
      title: "Tracking Your Order",
      icon: <FaTruck className="text-2xl text-green-600" />,
      steps: [
        "Log into your account",
        "Go to Order History",
        "Select your order",
        "View tracking information",
        "Check delivery status",
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-gray-600">
            Find answers, manage your orders, and get support when you need it.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              How can we help you today?
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>
                    <Link
                      to={topic.link}
                      className="text-gray-600 hover:text-blue-600 hover:underline"
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Help Guides */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Quick Help Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  {guide.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {guide.title}
                  </h3>
                </div>
                <ol className="list-decimal list-inside space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-gray-600">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <FaHeadset className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Contact Support
            </h3>
            <p className="text-gray-600 mb-4">
              Need personal assistance? Our team is here to help.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Contact Us
            </Link>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <FaQuestionCircle className="text-3xl text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ</h3>
            <p className="text-gray-600 mb-4">
              Find answers to commonly asked questions.
            </p>
            <Link
              to="/faq"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              View FAQ
            </Link>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <FaBook className="text-3xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Knowledge Base
            </h3>
            <p className="text-gray-600 mb-4">
              Detailed guides and documentation for all features.
            </p>
            <Link
              to="/knowledge-base"
              className="inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/shipping-policy"
              className="text-blue-600 hover:underline"
            >
              Shipping Policy
            </Link>
            <Link to="/return-policy" className="text-blue-600 hover:underline">
              Return Policy
            </Link>
            <Link
              to="/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-blue-600 hover:underline"
            >
              Terms & Conditions
            </Link>
            <Link to="/size-guide" className="text-blue-600 hover:underline">
              Size Guide
            </Link>
            <Link to="/product-care" className="text-blue-600 hover:underline">
              Product Care
            </Link>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            For urgent issues, call our support line:{" "}
            <span className="font-semibold">(555) 123-4567</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Available 24/7 for emergency support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    orderNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            We're here to help! Please reach out with any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="text-red-600">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">Customer Service:</p>
                  <p className="text-gray-800">(555) 123-4567</p>
                  <p className="text-gray-600 mt-2">Technical Support:</p>
                  <p className="text-gray-800">(555) 987-6543</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="text-red-600">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">Customer Support:</p>
                  <p className="text-gray-800">support@yourcompany.com</p>
                  <p className="text-gray-600 mt-2">Business Inquiries:</p>
                  <p className="text-gray-800">business@yourcompany.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="text-red-600">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">Main Office:</p>
                  <p className="text-gray-800">
                    123 Business Street
                    <br />
                    Suite 100
                    <br />
                    City, State 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="text-red-600">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">Monday - Friday:</p>
                  <p className="text-gray-800">9:00 AM - 6:00 PM EST</p>
                  <p className="text-gray-600 mt-2">Saturday:</p>
                  <p className="text-gray-800">10:00 AM - 4:00 PM EST</p>
                  <p className="text-gray-600 mt-2">Sunday:</p>
                  <p className="text-gray-800">Closed</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-400">
                    <FaTwitter className="text-2xl" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-pink-600">
                    <FaInstagram className="text-2xl" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    <FaWhatsapp className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject and Order Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="return">Return/Refund</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="orderNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Order Number (if applicable)
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., ORD-123456"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    What are your shipping times?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Standard shipping takes 3-5 business days. Express shipping
                    is available for 1-2 business days delivery.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    How can I track my order?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    You can track your order by logging into your account and
                    visiting the Order History section.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    What is your return policy?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    We offer a 30-day return policy for most items. Please visit
                    our Returns page for more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Our Location
            </h2>
            <div className="h-96 bg-gray-200 rounded-lg">
              {/* Add your map component here */}
              {/* Example: Google Maps iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

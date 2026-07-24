import React from "react";
import { Link } from "react-router-dom";
import { FaUndo, FaBox, FaCreditCard, FaTruck } from "react-icons/fa";
import NavigationHeader from "../../components/layout/NavigatioHeader";


const ReturnPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Return & Exchange Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaUndo className="mx-auto text-3xl text-blue-600 mb-3" />
            <h3 className="font-semibold">30-Day Returns</h3>
            <p className="text-sm text-gray-600">Hassle-free returns</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaBox className="mx-auto text-3xl text-green-600 mb-3" />
            <h3 className="font-semibold">Free Returns</h3>
            <p className="text-sm text-gray-600">No return shipping fee</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaCreditCard className="mx-auto text-3xl text-orange-600 mb-3" />
            <h3 className="font-semibold">Quick Refunds</h3>
            <p className="text-sm text-gray-600">3-5 business days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaTruck className="mx-auto text-3xl text-purple-600 mb-3" />
            <h3 className="font-semibold">Easy Exchange</h3>
            <p className="text-sm text-gray-600">Simple process</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Return Policy Overview
              </h2>
              <p className="text-gray-700 mb-4">
                We want you to be completely satisfied with your purchase. If
                you're not entirely happy with your order, we're here to help.
                You can return most items purchased from [Your Company Name]
                within 30 days of delivery for a full refund or exchange.
              </p>
            </section>

            {/* Return Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Return Eligibility
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  To be eligible for a return, your item must be:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Unused and in the same condition that you received it</li>
                  <li>In the original packaging with all tags attached</li>
                  <li>
                    Accompanied by the original receipt or proof of purchase
                  </li>
                  <li>Returned within 30 days of delivery</li>
                </ul>

                <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Non-Returnable Items
                  </h3>
                  <ul className="list-disc pl-6 text-red-700 space-y-1">
                    <li>Personal care items and cosmetics (if opened)</li>
                    <li>Intimate apparel and swimwear</li>
                    <li>Downloadable software products</li>
                    <li>Gift cards</li>
                    <li>Clearance items (unless defective)</li>
                    <li>Perishable goods</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Return Process</h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-4">
                <li>
                  <strong>Initiate Return:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Log into your account and visit the Orders section</li>
                    <li>Select the item you wish to return</li>
                    <li>
                      Choose return reason and preferred resolution (refund or
                      exchange)
                    </li>
                    <li>Print return shipping label (if provided)</li>
                  </ul>
                </li>
                <li>
                  <strong>Package Your Return:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Pack items securely in original packaging</li>
                    <li>Include all tags, accessories, and documentation</li>
                    <li>Attach return shipping label</li>
                  </ul>
                </li>
                <li>
                  <strong>Ship the Return:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Drop off at authorized shipping location</li>
                    <li>Keep tracking number for reference</li>
                  </ul>
                </li>
              </ol>
            </section>

            {/* Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Refunds</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Once we receive your return, we'll inspect the item and
                  process your refund:
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-3">Refund Timeline:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Item inspection: 1-2 business days</li>
                    <li>Refund processing: 1-2 business days</li>
                    <li>Credit card refund: 3-5 business days to appear</li>
                    <li>Store credit: Immediate upon approval</li>
                  </ul>
                </div>

                <p className="text-gray-700">
                  Original shipping charges are non-refundable unless the return
                  is due to our error or a defective product.
                </p>
              </div>
            </section>

            {/* Exchanges */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Exchanges</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  To exchange an item for a different size or color:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Select "Exchange" when initiating your return</li>
                  <li>Choose the desired replacement item</li>
                  <li>Ship your return using provided label</li>
                  <li>Replacement item ships once original is received</li>
                </ul>
              </div>
            </section>

            {/* Damaged or Defective Items */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Damaged or Defective Items
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-gray-700 mb-4">
                  If you receive a damaged or defective item:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Contact us within 48 hours of receipt</li>
                  <li>Provide photos of the damage</li>
                  <li>We'll send a prepaid return label</li>
                  <li>Choose between refund or replacement</li>
                </ul>
              </div>
            </section>

            {/* International Returns */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. International Returns
              </h2>
              <p className="text-gray-700 mb-4">For international orders:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>30-day return window applies</li>
                <li>Customer responsible for return shipping</li>
                <li>Import duties and taxes are non-refundable</li>
                <li>Contact customer service for return authorization</li>
              </ul>
            </section>

            {/* Holiday Returns */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Holiday Returns
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-gray-700 mb-4">
                  Special holiday return policy:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    Items purchased Nov 1 - Dec 24 can be returned until Jan 31
                  </li>
                  <li>Standard return conditions apply</li>
                  <li>Gift receipts accepted</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Need Help with a Return?
            </h3>
            <p className="text-gray-700 mb-4">
              Our customer service team is here to help:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Email: returns@yourcompany.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Monday-Friday, 9AM-5PM EST</li>
            </ul>
          </div>

          {/* Related Links */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Related Policies</h3>
            <div className="space-x-4">
              <Link
                to="/shipping-policy"
                className="text-blue-600 hover:underline"
              >
                Shipping Policy
              </Link>
              <Link
                to="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
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

export default ReturnPolicy;

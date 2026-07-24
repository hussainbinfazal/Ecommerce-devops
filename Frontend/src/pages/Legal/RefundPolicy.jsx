import React from "react";
import { Link } from "react-router-dom";
import {
  FaExchangeAlt,
  FaMoneyBillWave,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { useNavigate } from "react-router-dom";
const RefundPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaExchangeAlt className="mx-auto text-3xl text-blue-600 mb-3" />
            <h3 className="font-semibold">Easy Returns</h3>
            <p className="text-sm text-gray-600">Within 30 days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaMoneyBillWave className="mx-auto text-3xl text-green-600 mb-3" />
            <h3 className="font-semibold">Full Refund</h3>
            <p className="text-sm text-gray-600">Money-back guarantee</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaClock className="mx-auto text-3xl text-orange-600 mb-3" />
            <h3 className="font-semibold">Processing Time</h3>
            <p className="text-sm text-gray-600">5-7 business days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaShieldAlt className="mx-auto text-3xl text-purple-600 mb-3" />
            <h3 className="font-semibold">Secure Process</h3>
            <p className="text-sm text-gray-600">100% secure refund</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
              <p className="text-gray-700 mb-4">
                At [Your Company Name], we want you to be completely satisfied
                with your purchase. If you're not entirely happy with your
                order, we're here to help. This policy outlines how you can
                return items and receive a refund.
              </p>
            </section>

            {/* Return Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Return Eligibility
              </h2>
              <p className="text-gray-700 mb-4">
                To be eligible for a return, your item must be:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Unused and in the same condition that you received it</li>
                <li>In the original packaging</li>
                <li>Within 30 days of the delivery date</li>
                <li>
                  Accompanied by the original receipt or proof of purchase
                </li>
              </ul>

              <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Non-Returnable Items
                </h3>
                <ul className="list-disc pl-6 text-red-700 space-y-1">
                  <li>Personal care items and cosmetics (if opened)</li>
                  <li>Intimate apparel</li>
                  <li>Downloadable software products</li>
                  <li>Gift cards</li>
                  <li>Sale items (unless defective)</li>
                </ul>
              </div>
            </section>

            {/* Return Process */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Return Process</h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-4">
                <li>
                  <strong>Initiate Return:</strong> Log into your account and
                  visit the Orders section, or contact our customer service
                  team.
                </li>
                <li>
                  <strong>Package Your Return:</strong> Securely pack the item
                  in its original packaging with all tags attached.
                </li>
                <li>
                  <strong>Ship the Item:</strong> Use our provided return label
                  or ship to our returns address. We recommend using a tracked
                  shipping service.
                </li>
                <li>
                  <strong>Refund Processing:</strong> Once we receive and
                  inspect the item, we'll notify you about the status of your
                  refund.
                </li>
              </ol>
            </section>

            {/* Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Refunds</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Once your return is received and inspected, we will send you
                  an email to notify you that we have received your returned
                  item. We will also notify you of the approval or rejection of
                  your refund.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Refund Timeline:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>
                      Processing time: 1-2 business days after receiving the
                      item
                    </li>
                    <li>
                      Credit card refunds: 5-7 business days to reflect in your
                      account
                    </li>
                    <li>Store credit: Immediately available after approval</li>
                    <li>Bank transfers: 7-10 business days</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Damaged or Defective Items */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Damaged or Defective Items
              </h2>
              <p className="text-gray-700 mb-4">
                If you receive a damaged or defective item, please contact us
                immediately. We will provide a prepaid return label and process
                your refund or replacement as soon as possible.
              </p>
            </section>

            {/* Exchange Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Exchange Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We offer exchanges for items within 30 days of delivery. To
                request an exchange:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Contact our customer service team</li>
                <li>Provide your order number and exchange request details</li>
                <li>Wait for confirmation before shipping the item back</li>
                <li>Once received, we'll ship your exchange item</li>
              </ul>
            </section>

            {/* Shipping Costs */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Shipping Costs</h2>
              <p className="text-gray-700 mb-4">
                Return shipping costs are the responsibility of the customer,
                except in cases of damaged or defective items. Original shipping
                charges are non-refundable unless the item arrived damaged or
                defective.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our return and refund policy,
              please contact us:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Email: returns@yourcompany.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Customer Service Hours: Monday-Friday, 9AM-5PM EST</li>
            </ul>
          </div>

          {/* Related Links */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Related Information</h3>
            <div className="space-x-4">
              <Link
                to="/shipping-policy"
                className="text-blue-600 hover:underline"
              >
                Shipping Policy
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

export default RefundPolicy;

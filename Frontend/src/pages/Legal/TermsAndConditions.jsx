import React from "react";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { Link } from "react-router-dom";
import {
  FaGavel,
  FaUserShield,
  FaFileContract,
  FaShieldAlt,
} from "react-icons/fa";
const TermsAndConditions = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaGavel className="mx-auto text-3xl text-blue-600 mb-3" />
            <h3 className="font-semibold">Legal Agreement</h3>
            <p className="text-sm text-gray-600">Binding terms</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaUserShield className="mx-auto text-3xl text-green-600 mb-3" />
            <h3 className="font-semibold">User Rights</h3>
            <p className="text-sm text-gray-600">Your protections</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaFileContract className="mx-auto text-3xl text-orange-600 mb-3" />
            <h3 className="font-semibold">Usage Rules</h3>
            <p className="text-sm text-gray-600">Platform guidelines</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaShieldAlt className="mx-auto text-3xl text-purple-600 mb-3" />
            <h3 className="font-semibold">Data Protection</h3>
            <p className="text-sm text-gray-600">Your privacy</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Agreement to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By accessing and using [Your Company Name]'s website and
                services, you agree to be bound by these Terms and Conditions.
                If you disagree with any part of these terms, you may not access
                our services.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>"User"</strong> refers to any person accessing or
                  using our services
                </li>
                <li>
                  <strong>"Services"</strong> includes our website, products,
                  and all related services
                </li>
                <li>
                  <strong>"Content"</strong> includes text, images, videos, and
                  other materials
                </li>
                <li>
                  <strong>"Account"</strong> refers to the user's registered
                  profile
                </li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Promptly update any changes to your information</li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                </ul>
              </div>
            </section>

            {/* Product Purchases */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Product Purchases
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  By making a purchase, you acknowledge that:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    All product information is accurate to the best of our
                    knowledge
                  </li>
                  <li>Prices are subject to change without notice</li>
                  <li>We reserve the right to limit or refuse orders</li>
                  <li>
                    Payment must be received in full before order processing
                  </li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4">
                All content on this website, including but not limited to text,
                graphics, logos, images, and software, is the property of [Your
                Company Name] and is protected by intellectual property laws.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-3">Prohibited Actions:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Copying or reproducing content without permission</li>
                  <li>Modifying or creating derivative works</li>
                  <li>Using content for commercial purposes</li>
                  <li>Removing copyright or trademark notices</li>
                </ul>
              </div>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. User Conduct</h2>
              <p className="text-gray-700 mb-4">Users must not:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate others or provide false information</li>
                <li>Interfere with website security or functionality</li>
                <li>Upload malicious code or content</li>
                <li>Engage in unauthorized data collection</li>
              </ul>
            </section>

            {/* Privacy and Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 mb-4">
                Our Privacy Policy governs the collection and use of your
                personal information. By using our services, you consent to our
                data practices as described in our Privacy Policy.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Limitation of Liability
              </h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700 mb-4">
                  [Your Company Name] shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages
                  arising from your use of our services.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend accounts and access
                to services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For violation of these terms</li>
                <li>For fraudulent or illegal activities</li>
                <li>At our sole discretion</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting. Continued use of our
                services constitutes acceptance of modified terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance
                with the laws of [Your Jurisdiction], without regard to its
                conflict of law provisions.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Email: legal@yourcompany.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Legal Street, Business City, ST 12345</li>
            </ul>
          </div>

          {/* Related Links */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Related Policies</h3>
            <div className="space-x-4">
              <Link
                to="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                to="/refund-policy"
                className="text-blue-600 hover:underline"
              >
                Refund Policy
              </Link>
              <Link
                to="/shipping-policy"
                className="text-blue-600 hover:underline"
              >
                Shipping Policy
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

export default TermsAndConditions;

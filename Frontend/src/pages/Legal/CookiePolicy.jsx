import React from "react";

const CookiePolicy = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                This Cookie Policy explains how [Your Company Name] ("we", "us",
                or "our") uses cookies and similar technologies when you visit
                our website [your-website.com]. This policy helps you understand
                what cookies are, how we use them, and the choices you have
                regarding their use.
              </p>
            </section>

            {/* What Are Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. What Are Cookies?
              </h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your device when
                you visit a website. They are widely used to make websites work
                more efficiently and provide information to the website owners.
                Cookies enhance your browsing experience by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Remembering your preferences and settings</li>
                <li>Helping you navigate between pages efficiently</li>
                <li>Remembering your login details</li>
                <li>Helping us understand how you use our website</li>
              </ul>
            </section>

            {/* Types of Cookies We Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. Types of Cookies We Use
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Essential Cookies
                </h3>
                <p className="text-gray-700 mb-2">
                  These cookies are necessary for the website to function
                  properly. They enable basic functions like page navigation and
                  access to secure areas of the website. The website cannot
                  function properly without these cookies.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Performance Cookies
                </h3>
                <p className="text-gray-700 mb-2">
                  These cookies help us understand how visitors interact with
                  our website by collecting and reporting information
                  anonymously. They help us improve our website's functionality.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Functionality Cookies
                </h3>
                <p className="text-gray-700 mb-2">
                  These cookies enable the website to remember choices you make
                  (such as your username, language, or region) and provide
                  enhanced features.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Targeting/Advertising Cookies
                </h3>
                <p className="text-gray-700 mb-2">
                  These cookies are used to track visitors across websites. They
                  are used to display ads that are relevant and engaging for
                  individual users.
                </p>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. How to Manage Cookies
              </h2>
              <p className="text-gray-700 mb-4">
                Most web browsers allow you to control cookies through their
                settings preferences. However, if you limit the ability of
                websites to set cookies, you may worsen your overall user
                experience. Below you can learn how to manage cookies in
                different browsers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Chrome: Settings → Privacy and Security → Cookies and other
                  site data
                </li>
                <li>
                  Firefox: Options → Privacy & Security → Cookies and Site Data
                </li>
                <li>
                  Safari: Preferences → Privacy → Cookies and website data
                </li>
                <li>
                  Edge: Settings → Privacy, search, and services → Cookies
                </li>
              </ul>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Third-Party Cookies
              </h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services that use cookies on our website,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Google Analytics (for website analytics)</li>
                <li>Facebook Pixel (for advertising)</li>
                <li>Payment processors</li>
                <li>Social media plugins</li>
              </ul>
            </section>

            {/* Updates to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Updates to This Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or for operational, legal, or
                regulatory reasons. We encourage you to periodically review this
                page for the latest information on our cookie practices.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our Cookie Policy, please contact
              us:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Email: privacy@yourcompany.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Privacy Street, Security City, 12345</li>
            </ul>
          </div>

          {/* Related Policies */}
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
                to="/terms-conditions"
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

export default CookiePolicy;

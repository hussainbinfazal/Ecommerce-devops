import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className='w-6/7 mx-auto'><NavigationHeader /> </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to [Your Company Name]'s Privacy Policy. This Privacy Policy 
                describes how we collect, use, and share your personal information 
                when you use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Payment information</li>
                <li>Usage data and preferences</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Process your orders and payments</li>
                <li>Communicate with you about your orders and services</li>
                <li>Improve our services and user experience</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>
            </section>

            {/* Add more sections as needed */}
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-700">
              If you have any questions about our Privacy Policy, please contact us:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Email: privacy@yourcompany.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Privacy Street, Security City, 12345</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy


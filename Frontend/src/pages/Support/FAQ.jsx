


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { useEffect } from "react";
const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openQuestions, setOpenQuestions] = useState({});

  // FAQ Categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "orders", name: "Orders & Shipping" },
    { id: "returns", name: "Returns & Refunds" },
    { id: "products", name: "Products & Stock" },
    { id: "account", name: "Account & Security" },
    { id: "payment", name: "Payment & Pricing" },
  ];

  // FAQ Data
  const faqData = [
    {
      category: "orders",
      questions: [
        {
          id: "order1",
          question: "How do I track my order?",
          answer:
            "You can track your order by logging into your account and visiting the Order History section. Click on your order number to view detailed tracking information. We also send tracking updates via email once your order ships.",
        },
        {
          id: "order2",
          question: "What are your shipping times and costs?",
          answer:
            "Standard shipping (3-5 business days): ₹4.99\nExpress shipping (1-2 business days): ₹9.99\nFree standard shipping on orders over ₹50\nInternational shipping varies by location.",
        },
        {
          id: "order3",
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can view specific shipping rates during checkout.",
        },
      ],
    },
    {
      category: "returns",
      questions: [
        {
          id: "return1",
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Products must be unused and in original packaging. Some items (like intimate apparel and opened cosmetics) cannot be returned for hygiene reasons.",
        },
        {
          id: "return2",
          question: "How do I initiate a return?",
          answer:
            "1. Log into your account\n2. Go to Order History\n3. Select the order and items to return\n4. Print the return label\n5. Package items securely\n6. Drop off at any authorized shipping location",
        },
        {
          id: "return3",
          question: "How long does it take to process a refund?",
          answer:
            "Refunds are processed within 1-2 business days after we receive your return. It may take an additional 3-5 business days for the refund to appear in your account, depending on your bank.",
        },
      ],
    },
    {
      category: "products",
      questions: [
        {
          id: "product1",
          question: "How do I know if a product is in stock?",
          answer:
            "Product availability is shown in real-time on each product page. If an item is out of stock, you can sign up for email notifications when it becomes available again.",
        },
        {
          id: "product2",
          question: "Are your products authentic?",
          answer:
            "Yes, we only sell authentic products sourced directly from manufacturers or authorized distributors. We guarantee the authenticity of all items sold on our platform.",
        },
        {
          id: "product3",
          question: "Do you offer product warranties?",
          answer:
            "Warranty coverage varies by product. Specific warranty information can be found on individual product pages. Most electronics come with a standard 1-year manufacturer warranty.",
        },
      ],
    },
    {
      category: "account",
      questions: [
        {
          id: "account1",
          question: "How do I reset my password?",
          answer:
            '1. Click "Forgot Password" on the login page\n2. Enter your email address\n3. Check your email for reset instructions\n4. Click the reset link and create a new password',
        },
        {
          id: "account2",
          question: "How can I update my account information?",
          answer:
            "Log into your account and go to Account Settings. Here you can update your:\n- Contact information\n- Shipping addresses\n- Payment methods\n- Communication preferences",
        },
        {
          id: "account3",
          question: "Is my personal information secure?",
          answer:
            "Yes, we use industry-standard security measures including SSL encryption and secure payment processing. We never store complete credit card information. View our Security Policy for more details.",
        },
      ],
    },
    {
      category: "payment",
      questions: [
        {
          id: "payment1",
          question: "What payment methods do you accept?",
          answer:
            "We accept:\n- Credit/Debit cards (Visa, Mastercard, American Express)\n- PayPal\n- Apple Pay\n- Google Pay\n- Shop Pay",
        },
        {
          id: "payment2",
          question: "When will I be charged for my order?",
          answer:
            "Your payment method will be charged immediately when you place your order. For pre-orders, you may be charged when the item ships.",
        },
        {
          id: "payment3",
          question: "Do you offer financing options?",
          answer:
            "Yes, we offer financing through Affirm and Klarna for eligible purchases. You can select these options during checkout to view available payment plans.",
        },
      ],
    },
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const filteredQuestions = faqData.reduce((acc, category) => {
    const filteredCategoryQuestions = category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeCategory === "all" || activeCategory === category.category) {
      acc.push(...filteredCategoryQuestions);
    }

    return acc;
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 pt-0">
      <div className="w-6/7 mx-auto">
        <NavigationHeader />{" "}
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find quick answers to common questions. Can't find what you're
            looking for?{" "}
            <Link to="/contact" className="text-blue-600 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ₹{
                    activeCategory === category.id
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredQuestions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">
                  {item.question}
                </span>
                {openQuestions[item.id] ? (
                  <FaChevronUp className="text-gray-400" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              {openQuestions[item.id] && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <p className="text-gray-700 whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No matching questions found.</p>
              <p className="mt-2">
                <Link to="/contact" className="text-blue-600 hover:underline">
                  Contact our support team
                </Link>{" "}
                for assistance.
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you 24/7
          </p>
          <div className="space-x-4">
            <Link
              to="/contact"
              className="inline-block px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@yourcompany.com"
              className="inline-block px-6 py-2 bg-white text-red-600 font-medium rounded-md border border-red-600 hover:bg-blue-50"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

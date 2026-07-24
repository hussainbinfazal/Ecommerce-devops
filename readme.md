
# 🛒 QuickCart E-commerce Platform

QuickCart is a modern, full-stack e-commerce application built with the MERN stack, designed to provide a secure and seamless shopping experience for customers and administrators alike. The platform includes product management, cart and checkout workflows, order handling, coupon management, payment integration, and an admin dashboard with analytics-ready capabilities.

---

## 🌟 Project Overview

QuickCart is structured as a scalable, modular web application with a React frontend and an Express-based backend, supported by MongoDB. It is intended for real-world e-commerce scenarios, including user authentication, product catalog management, secure checkout, and administrative operations.

---

## ✨ Key Features

### 🛍️ Customer Experience
- Product browsing, search, and category-based navigation
- Persistent cart and checkout flow
- Order placement and order history
- Wishlist and product interaction features
- Responsive design for desktop and mobile devices

### 💳 Payments and Promotions
- Secure payment integration with Razorpay
- Cash on delivery support
- Coupon creation and discount management

### 📊 Admin Capabilities
- Product, category, and inventory management
- Order and user administration
- Dashboard-oriented analytics and reporting workflow
- Coupon and promotional controls

### 🔐 Security and Reliability
- JWT-based authentication
- Role-based access for users and administrators
- Protected API routes and server-side validation
- File upload support for product and profile images

---

## 🛠️ Technology Stack

### Frontend
- React with Vite
- Redux Toolkit
- Tailwind CSS
- React Router

### Backend
- Node.js and Express
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads

### Integrations
- Razorpay for payments
- Docker for containerized development and deployment

---

## 🧱 Architecture Highlights

- RESTful API structure with clear separation of concerns
- Dedicated controllers, routes, models, and middleware
- Containerized frontend and backend services for consistent environments
- Scalable foundation for future enhancements such as AI recommendations and analytics expansion

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- MongoDB instance (local or cloud)
- Docker and Docker Compose (optional, recommended for local containerized setup)
- Razorpay account for payment integration

### Local Development Setup

#### Backend

```bash
cd Backend
npm install
cp .env.example .env
# Fill in your MongoDB URI, JWT secret, and payment keys in .env
npm run dev
```

#### Frontend

```bash
cd ../Frontend
npm install
cp .env.example .env
# Fill in your API base URL and payment keys in .env
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## 🐳 Docker Setup

The project includes Docker configuration for both the frontend and backend, along with Docker Compose support for a full local stack.

### Files Included
- [compose.yaml](compose.yaml) – Full development stack with frontend, backend, and MongoDB
- [compose.debug.yaml](compose.debug.yaml) – Debug-oriented frontend configuration
- [Backend/dockerfile](Backend/dockerfile) – Backend container definition
- [Frontend/dockerfile](Frontend/dockerfile) – Frontend container definition

### Start the Application with Docker Compose

```bash
docker compose up --build
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5001
- MongoDB on port 27017

### Stop the Containers

```bash
docker compose down
```

### Debug Configuration

```bash
docker compose -f compose.debug.yaml up --build
```

This setup is useful for debugging the frontend service with Node.js inspection support.

---

## 📁 Project Structure

```text
Quickcart-Ecommerce/
├── Backend/              # Express server, API routes, models, and controllers
├── Frontend/             # React application and UI components
├── compose.yaml          # Docker Compose configuration for development
├── compose.debug.yaml    # Debug Compose configuration
├── k8s/                  # Kubernetes deployment files
└── readme.md             # Project documentation
```

---

## 📱 Core User Flows

### For Customers
- Register or sign in
- Browse products and categories
- Add items to the cart
- Proceed through checkout and payment
- Track orders and view order history

### For Administrators
- Sign in to the admin panel
- Manage products, orders, users, and coupons
- Review analytics and operational data
- Maintain promotions and inventory

---

## 🎯 Why This Project Stands Out

- Modern MERN-based architecture
- Secure payment processing with Razorpay
- Admin-focused workflow and business logic
- Clean, maintainable code structure
- Containerized setup for easier local development and deployment

---

## 🔮 Future Enhancements

- AI-powered product recommendations
- Mobile app support with React Native
- Multi-vendor marketplace capabilities
- Advanced reporting and export features

---

## 🤝 Contributing

Contributions are welcome. If you would like to improve the project, please open an issue or submit a pull request with your proposed changes.

---

## 📄 License

This project is part of a professional portfolio and is intended to showcase full-stack e-commerce development skills.

---

Thank you for visiting QuickCart. If you find this project valuable, please consider giving it a star on GitHub.

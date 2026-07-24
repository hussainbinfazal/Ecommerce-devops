import { useState } from "react";
import { BrowserRouter as Router, createBrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, Routes, Route } from "react-router";
import "./App.css";
import Preheader from "./components/layout/Preheader";
import Header from "./components/layout/Header";
import HeroSection from "./pages/Home/components/HeroSection";
import SubCategoryPage from "./components/SubCategoryPage";
import TopProducts from "./components/shared/TopProducts";
import Seperation from "./pages/Home/components/Seperation";
import ImageSlider from "./pages/Home/components/ImageSlider";
import MiddleComponent from "./pages/Home/components/MiddleComponent";
import Footer from "./components/layout/Footer";
import CartPage from "./pages/Cart/CartPage";
import HomePage from "./pages/Home/Homepage";
import Layout from "./components/layout/Layout";
import Checkout from "./pages/Checkout/Checkout";
import Profilepage from "./pages/profile/Profilepage";
import Feedback from "./pages/Feedback/Feedback";
import Error from "./pages/error/Error";
import Product from "./pages/product/Product";
import Loginpage from "./pages/login/Loginpage";
import Registerpage from "./pages/login/Registerpage";
import CategoryPage from "./components/Category";
import Orders from "./pages/Orders/Orders";
import AdminProducts from "./pages/Admin/AdminProducts";
import { useEffect } from "react";
import AdminLoginPage from "./pages/Admin/AdminLoginpage";
import Adminpage from "./pages/Admin/Adminpage";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUser from "./pages/Admin/AdminUser";
import AdminShop from "./pages/Admin/AdminShop";
import LikedProduct from "./pages/LikedProducts/LikedProduct";

import TermsAndConditions from "./pages/Legal/TermsAndConditions";
import ShippingPolicy from "./pages/Legal/ShippingPolicy";
import RefundPolicy from "./pages/Legal/RefundPolicy";
import ContactUs from "./pages/Support/ContactUs";
import FAQ from "./pages/Support/FAQ";
import Help from "./pages/Support/Help";
import SecurityPolicy from "./pages/Policies/SecurityPolicy";
import ReturnPolicy from "./pages/Policies/ReturnPolicy";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store/store";
import { ProtectedRoute } from "./middlewares/middlewares";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/userSlice";
import AuthProvider from "./components/auth/AuthProvider";
import PublicRoutes from "./components/auth/PublicRoutes";
import { AdminProtectedRoute } from "./middlewares/adminMiddlewares/adminMiddleWare";
import Search from "./pages/searchPage/Search";
import AllProducts from "./pages/product/AllProducts";
import ScrollLoader from "./components/layout/ScrollLoader";

import { ClerkProvider } from "@clerk/clerk-react";
import AuthWatcher from "./middlewares/auth/AuthWatcher.jsx";
function App() {
  const [count, setCount] = useState(0);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

  return (
    <Provider store={store}>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <AuthProvider>
          {/* Auth watcher for contionous checking of token  */}
          <ScrollLoader />
          <AuthWatcher />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Router>
            <Layout>
              <Routes>
                {/* User Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/cart/checkout"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={stripePromise}>
                        <Checkout />
                      </Elements>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profilepage />
                    </ProtectedRoute>
                  }
                />
                <Route path="contact" element={<Feedback />} />
                <Route path="*" element={<Error />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/register" element={<Registerpage />} />
                <Route path="/search/:searchTerm" element={<Search />} />
                <Route path="/products" element={<AllProducts />} />
                <Route
                  path="/categories/:category"
                  element={<CategoryPage />}
                />
                <Route
                  path="/categories/:category/:subCategory"
                  element={<SubCategoryPage />}
                />
                <Route
                  path="/categories/:category/:subCategory/:option"
                  element={<SubCategoryPage />}
                />
                <Route
                  path="/categories/:category/:subCategory/:option/:subOption"
                  element={<SubCategoryPage />}
                />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route path="/wishlist" element={<LikedProduct />} />
                {/* Admin Routes */}
                <Route
                  path="/iamadmin"
                  element={
                    <ProtectedRoute>
                      <AdminProtectedRoute>
                        <AdminLoginPage />
                      </AdminProtectedRoute>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/help" element={<Help />} />
                <Route path="/security-policy" element={<SecurityPolicy />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />

                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <Adminpage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </ClerkProvider>
    </Provider>
  );
}

export default App;

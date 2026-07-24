import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import PreHeader from "../../components/layout/Preheader";
import TopProducts from "../../components/shared/TopProducts";
import HeroSection from "./components/HeroSection";
import ImageSlider from "./components/ImageSlider";
import MiddleComponent from "./components/MiddleComponent";
import Seperation from "./components/Seperation";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  addToGuestWishlist,
  removeFromGuestWishlist,
  fetchGuestWishlist,
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";
import { getProducts } from "../../redux/slices/productSlice";
import { useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton"

const HomePage = () => {
  
  const { user } = useUser();
  const [allProducts, setAllProducts] = useState([]);
  const { products, loading } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bestSellingProducts = useMemo(() => {
    return products.filter((filteredProduct) => filteredProduct.rating >= 0);
  }, [products]);
  const now = new Date();
  const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

  const latestProducts = products.filter((product) => {
    return new Date(product.createdAt) > sevenDaysAgo;
  });
  const handleLike = (product) => {
    if (isAuthenticated) {
      dispatch(addToWishlist(product._id)).unwrap();
    } else {
      dispatch(
        addToGuestWishlist({
          product: product._id,
          name: product.name,
          image: product.productImage,
        })
      );
    }
  };

  const handleUnlike = (productId) => {
    if (isAuthenticated) {
      dispatch(removeFromWishlist(productId)).unwrap();
      dispatch(fetchWishlist()).unwrap();
    } else {
      dispatch(removeFromGuestWishlist(productId)).unwrap();
    }
  };

  useEffect(() => {
    try {
      const fetchAllProducts = async () => {
        const response = await dispatch(getProducts()).unwrap();
        dispatch(fetchWishlist()).unwrap();
        dispatch(fetchGuestWishlist());
      };
      fetchAllProducts();
    } catch (error) {}
  }, []);

  useEffect(() => {}, [user]);
  // if (loading || !products || products.length === 0) return <LoadingSpinner />;
  return (
    <>
      <main>
        <HeroSection />
        <TopProducts
          topMostHeading="Top Deals"
          isTimer={true}
          categoryTitle="Flash Sales"
          isGrid={false}
          isViewButton={true}
          bottomButtonText="View All Products"
          products={products}
          loading={loading}
          handleLike={handleLike}
          isOnSale={true}
        />
        <Seperation />
        <TopProducts
          topMostHeading="This Month"
          isTimer={false}
          categoryTitle="Best Selling Products"
          isGrid={false}
          isViewButton={true}
          bottomButtonText="View All Products"
          products={bestSellingProducts}
          isOnSale={true}
        />
        <ImageSlider />
        <TopProducts
          topMostHeading="Our Products"
          isTimer={false}
          categoryTitle="Explore Our Products"
          isGrid={true}
          isViewButton={true}
          bottomButtonText="View All Products"
          products={products}
          Loading={loading}
        />
        <MiddleComponent />
      </main>
    </>
  );
};

export default HomePage;

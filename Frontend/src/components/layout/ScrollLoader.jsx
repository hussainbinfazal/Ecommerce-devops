import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollLoader = () => {
  const { scrollYProgress } = useScroll();
  

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[5px] bg-red-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollLoader;

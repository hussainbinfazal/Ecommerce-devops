import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { CiHome } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { IoMdContact } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { LiaRegistered } from "react-icons/lia";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const UI2 = () => {
  const [isHoveredIndex, setIsHoveredIndex] = useState(false);
  const links = [
    {
      name: "Home",
      to: "/",
      icon: (
        <CiHome className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      name: "About",
      to: "/about",
      icon: (
        <FcAbout className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      name: "Contact",
      to: "/contact",
      icon: (
        <IoMdContact className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      name: "Login",
      to: "/login",
      icon: (
        <IoMdLogIn className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      name: "Register",
      to: "/register",
      icon: (
        <LiaRegistered className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
  ];
  const mouseX = useMotionValue(Infinity);
  const refs = useRef([]);

  return (
    <motion.div className="w-full h-screen flex justify-center items-center  ">
      <motion.div
        className="w-fit h-[40px] bg-white z-85 flex gap-4  rounded-md mx-auto px-4 justify-center items-center border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 shadow-[0px_1px_4px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset] dark:shadow-[0px_1px_4px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset] "
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={(e) => mouseX.set(Infinity)}
      >
        {links.map((link, index) => {
          const distance = useTransform(mouseX, (val) => {
            const el = refs.current[index];
            const bounds = el?.getBoundingClientRect() ?? {
              left: 0,
              width: 0,
            };
            return val - (bounds?.left ?? 0) - (bounds?.width ?? 0) / 2;
          });

          useEffect(() => {
            const unsubscribe = distance.on("change", (val) => {
              console.log("Distance:", val);
            });
            return () => unsubscribe(); // Clean up
          }, [distance]);
          const widthTransform = useTransform(
            distance,
            [-120, 0, 120],
            [30, 50, 30]
          );
          const heightTransform = useTransform(
            distance,
            [-120, 0, 120],
            [30, 50, 30]
          );

          const iconWidthTransform = useTransform(
            distance,
            [-150, 0, 150],
            [20, 40, 20]
          );
          const iconHeightTransform = useTransform(
            distance,
            [-150, 0, 150],
            [20, 40, 20]
          );

          const width = useSpring(widthTransform, {
            mass: 0.1,
            stiffness: 300,
            damping: 50,
          });

          const height = useSpring(heightTransform, {
            mass: 0.1,
            stiffness: 300,
            damping: 50,
          });

          const widthIcon = useSpring(iconWidthTransform, {
            mass: 0.1,
            stiffness: 300,
            damping: 50,
          });
          const heightIcon = useSpring(iconHeightTransform, {
            mass: 0.1,
            stiffness: 300,
            damping: 50,
          });

          return (
            <Link to={link.to}>
              <motion.div
                key={link.name}
                ref={(el) => (refs.current[index] = el)}
                style={{
                  width,
                  height,
                }}
                onMouseEnter={() => setIsHoveredIndex(index)}
                onMouseLeave={() => setIsHoveredIndex(null)}
                className="group relative flex justify-center items-center rounded-full bg-neutral-200"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <AnimatePresence>
                  {isHoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0, y: 2 }}
                      className="absolute text-xs -top-6 text-neutral-500 dark:text-neutral-300 whitespace-pre"
                    >
                      {link.name}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  style={{ width: widthIcon, height: heightIcon }}
                  className="group flex justify-center items-center"
                >
                  {link.icon}
                </motion.div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default UI2;

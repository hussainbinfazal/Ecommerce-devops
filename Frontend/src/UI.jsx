import React from "react";
import { motion } from "motion/react";

const UI = () => {
  return (
    <div
      className="[prespective::1000px] [transform-style:preserve-3d] w-full h-screen flex justify-center items-center bg-neutral-950"
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px,rgba(6,182,212,0.2) 0.5px,transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
    >
      <motion.button
        className=" group w-50 h-20 px-12 py-4 relative  bg-black flex justify-center items-center rounded-lg shadow-[0px_1px_4px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset] text-blue-500 hover:text-white"
        initial={{ rotate: 0 }}
        whileHover={{ rotateX: [25], rotateY: 10,boxShadow:"0px 20px 50px rgba(8,112,184,0.7)"   }}
        whileTap={{ rotate: 0 }}

        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          translateZ: 100,
          
        }}
      >
        Subscribe Bro
        <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto z-50"></span>
        <span className="absolute inset-x-0 opacity-0 group-hover:opacity-100 bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[4px] w-3/4 mx-auto z-50 blur-sm transition-opacity duration-300"></span>
        {/* <span className="absolute opacity-0 group-hover:opacity-100  bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-tansparent h-px w-3/4 mx-auto z-50"></span> */}
      </motion.button>
    </div>
  );
};

export default UI;

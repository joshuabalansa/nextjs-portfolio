import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGoogle } from "react-icons/fa";

// FlipLink Component for Animated Text Logo
const DURATION = 0.25;
const STAGGER = 0.025;

const AnimatedLinks = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-6xl font-extrabold uppercase sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600 hover:scale-110 transition-all duration-300"
      style={{
        lineHeight: 1,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

// Main Logo Section with Text and Icon-based Logos
export const LogoSection = () => {
  return (
    <section className="grid place-content-center gap-4 px-8 py-24 text-white">
      <motion.div
        className="flex justify-center items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Flip Text Animation Logo */}
        <motion.div
          className="flex justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatedLinks href="#">Joshua</AnimatedLinks>
        </motion.div>

        {/* Icon-based Logos */}
        <motion.div
          className="flex justify-center items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-6xl cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600"
          >
            <FaGithub />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-6xl cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600"
          >
            <FaLinkedin />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-6xl cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600"
          >
            <FaInstagram />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-6xl cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600"
          >
            <FaGoogle />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

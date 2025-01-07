import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const TechStack = () => {

  const techStack = [
    "PHP",
    "Linux",
    "React",
    "Next.js",
    "Laravel",
    "JavaScript",
    "Tailwind CSS",
    "TypeScript",
    "Firebase",
    "MongoDB",
    "MySQL",
    "Redis",
  ]

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className="grid place-content-center gap-2 px-8 py-24 dark:text-white light:text-black ">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Tech Stack</h1>
      <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-300 mb-20">As a Full Stack Developer, I specialize in creating dynamic, robust, and user-friendly applications using modern technologies.</p>

      {techStack.map((lang, index) => (
        <FlipLink key={index} onClick={handleClick}>
          {lang}
        </FlipLink>
      ))}
    </section>
  );
};

const FlipLink = ({ children, onClick }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href="#"
      onClick={onClick}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-8xl"
      style={{
        lineHeight: 0.75,
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

export default TechStack;
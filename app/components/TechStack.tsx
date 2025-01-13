import React from "react";
import { motion } from "framer-motion";
import { FaPhp, FaLinux, FaReact, FaLaravel, FaJs } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiFirebase, SiMongodb, SiMysql, SiRedis } from 'react-icons/si';

const DURATION = 0.25;

const techStack = [
  { name: "PHP", icon: <FaPhp />, color: "#8892BF" },
  { name: "Linux", icon: <FaLinux />, color: "" },
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "" },
  { name: "Laravel", icon: <FaLaravel />, color: "#FF2D20" },
  { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38B2AC" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#007ACC" },
  { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
  { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
  { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
];

const TechStack = () => {
  return (
    <section className="grid place-content-center gap-2 px-8 py-24 dark:text-white light:text-black mb-72">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Tech Stack</h1>
      <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-300 mb-20">As a Full Stack Developer, I specialize in creating dynamic, robust, and user-friendly applications using modern technologies.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{ scale: 1.1, color: tech.color }}
            className="flex flex-col items-center"
            transition={{ duration: DURATION }}
            style={{ color: 'inherit' }}
          >
            <div className="text-6xl mb-2 cursor-pointer"  style={{ color: 'inherit' }}>
              {tech.icon}
            </div>
            <span>{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;

"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import {
  FaEnvelope,
  FaPhp,
  FaLinux,
  FaReact,
  FaLaravel,
  FaJs,
  FaHeart,
} from "react-icons/fa";
import { BsSun, BsMoon, BsFillArrowDownCircleFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiGnubash,
} from "react-icons/si";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [theme, setTheme] = useState("light");
  const [isAtTop, setIsAtTop] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { href: "https://instagram.com/joo.schwa/", Icon: AiFillInstagram },
    {
      href: "https://linkedin.com/in/joshua-balansa-62846a245",
      Icon: AiFillLinkedin,
    },
    { href: "https://github.com/joshuabalansa", Icon: AiFillGithub },
    { href: "mailto:jbalansa143@gmail.com", Icon: FaEnvelope },
  ];

  const techStack = [
    { name: "PHP", icon: <FaPhp />, color: "#8892BF" },
    { name: "Linux", icon: <FaLinux />, color: "" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "" },
    { name: "Laravel", icon: <FaLaravel />, color: "#FF2D20" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "Bash", icon: <SiGnubash />, color: "#4EAA25" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#007ACC" },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
  ];

  const projects = [
    {
      title: "Research Title Generator",
      details: "A web-based application for generating research titles.",
      techStack: "Next JS, Google Gemini",
      githubLink: "https://github.com/joshuabalansa/Research-Title-Generator",
      liveLink: "https://research-title-generator-alpha.vercel.app/",
    },
    {
      title: "Automated Daily Tech Blog Posts",
      details:
        "An AI-powered app that automatically generates tech related blog posts.",
      techStack: "Next JS, Google Gemini",
      githubLink: "https://github.com/joshuabalansa/automated-blog-posting",
      liveLink: "",
    },
    {
      title: "Healthcare Management System",
      details:
        "A web-based application for managing patient records, appointments, and billing.",
      techStack: "PHP, JavaScript, Bootstrap",
      githubLink:
        "https://github.com/joshuabalansa/healthcare-information-system.git",
        liveLink: "",
    },
    {
      title: "Order Management System with Analytics",
      details:
        "A web-based system for managing orders, inventory, and shipping with analytics.",
      techStack: "Laravel, JavaScript, Bootstrap",
      githubLink: "https://github.com/joshuabalansa/tps-auth.git",
      liveLink: "",
    },
    {
      title: "Tourism Landing Page",
      details:
        "A web-based application for promoting tourism and attracting visitors.",
      techStack: "HTML, CSS, JavaScript",
      githubLink: "https://github.com/joshuabalansa/tourism.git",
      liveLink: "",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Main Section */}
      <motion.section
        className="min-h-screen px-4 sm:px-10 md:px-20 lg:px-40 relative"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="py-10 mb-12 flex flex-row items-center justify-between">
          <h1 className="text-xl font-bold">
            <button
              className="text-3xl cursor-pointer hover:scale-125 transition-all"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === "dark" ? <BsSun /> : <BsMoon />}
            </button>
          </h1>
          <Link
            href="https://calendly.com/jbalansa143/30min"
            target="_blank"
            className="relative inline-block px-6 py-3 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-gradient-to-r to-emerald-600 from-sky-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-gradient-to-r from-cyan-500 to-teal-500"></span>
            <span className="relative text-black group-hover:text-white flex justify-center items-center gap-1">
              <MdCall />
              <span>Let&apos;s Talk</span>
            </span>
          </Link>
        </nav>

        <div className="text-start p-5 md:p-20 bg-slate-50 dark:bg-gray-900 rounded-lg">
          <h1 className="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-5xl md:text-8xl">
              Hello,
            </span>
            <span className="text-gray-800 dark:text-white"> I&apos;m Josh! {"\u{1F44B}"}</span>
          </h1>
          <h1 className="mb-4 text-2xl font-extrabold md:text-4xl lg:text-5xl text-gray-800 dark:text-white">
            Full Stack Developer
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-10">
            Need a professional website or a powerful web app? I design and
            develop custom web applications tailored to your business needs.
          </p>

          <motion.div
            className="text-4xl sm:text-5xl flex gap-1 sm:gap-10 py-5 text-gray-600 dark:text-gray-300"
            variants={socialVariants}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map(({ href, Icon }, index) => (
              <Link key={index} href={href}>
                <motion.div
                  whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                >
                  <Icon className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400" />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

        {isAtTop && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-300 sm:text-3xl md:text-4xl">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <BsFillArrowDownCircleFill className="cursor-pointer" />
            </motion.div>
          </div>
        )}

        <section className="py-24 dark:bg-gray-900 rounded-lg">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 md:text-5xl lg:text-6xl dark:text-white sm:text-end text-center sm:mr-10 mr-0">
            Tech Stack
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-14 text-center sm:text-end sm:mr-10 mr-0">
            I Build dynamic, scalable, and user-friendly
            applications with modern technologies.
          </p>

          {/* Tech Stack Section */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-1">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.1, color: tech.color }}
                className="flex flex-col items-center"
                transition={{ duration: 0.25 }}
                style={{ color: "inherit" }}
              >
                <div
                  className="text-6xl mb-2 cursor-pointer"
                  style={{ color: "inherit" }}
                >
                  {tech.icon}
                </div>
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.section>

      {/* Projects Section */}
      <section className="px-4 sm:px-10 md:px-20 lg:px-40 py-24 dark:bg-gray-900">
        <motion.h3
          className="mb-5 text-4xl font-extrabold text-start text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Recent{" "}
          <span className="rounded text-white bg-gradient-to-r to-emerald-600 from-sky-400 p-1">
            Projects
          </span>
        </motion.h3>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-start mb-10">
          I create custom websites, web apps, and AI-powered integrations that
          drive growth and efficiency.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 group cursor-pointer p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm font-medium mb-2 text-black dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                Tech Stack: {project.techStack}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {project.details}
              </p>
              {project.githubLink !== "#" ? (
                <Link
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 text-sm font-medium"
                  href={project.githubLink}
                >
                  Github
                </Link>
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Company Project
                </span>
              )}
              {" "}
              {project.liveLink !== "" && (
                <Link
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 text-sm font-medium"
                  href={project.githubLink}
                >
                  | Live
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>
      <footer className="dark:bg-gray-900 light:bg-white dark:text-white light:text-black py-4 text-center p-10">
      <p className="text-lg mt-2 flex items-center justify-center gap-2">
        <span>Made with </span>
        <FaHeart /> By JoshuaB
      </p>
    </footer>
    </div>
  );
};

export default Portfolio;

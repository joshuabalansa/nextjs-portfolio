import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { motion } from "framer-motion";

const MainSection = ({ name, title, description }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, delay: 0.3 },
    },
  };

  return (
    <motion.section
      className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-40"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="py-10 mb-12 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-xl font-bold dark:text-white text-center sm:text-left">
          <button
            className="text-3xl dark:text-gray-300 text-gray-800 cursor-pointer"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? <BsSun /> : <BsMoon />}
          </button>
        </h1>
        <div className="flex items-center justify-between mt-5 sm:mt-0 gap-5">
          <Link
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md"
            href="/JoshuaBalansaResume.pdf"
            target="_blank"
          >
            Resume
          </Link>
        </div>
      </nav>

      <div className="text-center p-5 md:p-10">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hello, World!&quot;</span> I&apos;m Joshua!</h1>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Full Stack Developer</h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-10">As a developer with a passion for solving complex problems 💡, I specialize in building scalable and innovative solutions ⚙️. I am always seeking new opportunities to apply my skills 💻, contribute to impactful projects 🌍, and expand my expertise in modern web technologies 🌐</p>
      </div>

      <motion.div
        className="text-4xl sm:text-5xl flex justify-center gap-5 sm:gap-10 py-5 text-gray-600 dark:text-gray-300"
        variants={socialVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map(({ href, Icon }, index) => (
          <Link key={index} href={href}>
            <motion.div
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
            >
              <Icon className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400" />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default MainSection;

import React from "react";
import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";


const MainSection = ({ name, title, description }) => {
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
      className="min-h-screen"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="py-10 mb-12 flex justify-between">
        <h1 className="text-xl font-bold dark:text-white">
          <Link href="#">{ name }</Link>
        </h1>
        <ul className="flex items-center">
          <li>
          <Link
              className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8"
              href="/JoshuaBalansaResume.pdf"
              target="_blank"
            >
              Resume
            </Link>
          </li>
        </ul>
      </nav>

      <div className="text-center p-10">
        <motion.h2
          className="text-4xl py-2 text-teal-600 font-bold md:text-6xl dark:text-teal-400"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {name}
        </motion.h2>
        <motion.h3
          className="text-2xl py-2 font-bold md:text-3xl dark:text-white"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-medium py-9 leading-5 md:text-xl max-w-6xl mx-auto dark:text-gray-300"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        className="text-5xl flex justify-center gap-10 py-3 text-gray-600 dark:text-gray-300"
        variants={socialVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map(({ href, Icon }, index) => (
          <Link key={index} href={href}>
            <motion.div
              whileHover={{
                scale: 1.2,  // Scale to 120% when hovered
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

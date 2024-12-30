import React from "react";
import Link from "next/link";

import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";

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

  return (
    <section className="min-h-screen">
      <nav className="py-10 mb-12 flex justify-between">
        <h1 className="text-xl font-bold dark:text-white">
          {/* <Link href="#">{ name }</Link> */}
        </h1>
        <ul className="flex items-center">
          <li>
            <a
              className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8"
              href="https://github.com/joshuabalansa"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>

      <div className="text-center p-10">
        <h2 className="text-5xl py-2 text-teal-600 font-bold md:text-6xl dark:text-teal-400">
          {name}
        </h2>
        <h3 className="text-2xl py-2 font-bold md:text-3xl dark:text-white">
          {title}
        </h3>
        <p className="text-medium py-9 leading-6 md:text-xl max-w-6xl mx-auto dark:text-gray-300">
          {description}
        </p>
      </div>
      <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-300">
        {socialLinks.map(({ href, Icon }, index) => (
          <Link key={index} href={href}>
            <Icon className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MainSection;

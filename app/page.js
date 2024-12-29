"use client";

import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import web1 from "../public/web1.png";
import web2 from "../public/web2.png";
import web3 from "../public/web3.png";
import web4 from "../public/web4.png";
import web5 from "../public/web5.png";
import web6 from "../public/web6.png";
import Link from "next/link";
import {NextIcon  } from "./components/SvgIcons";
// import ThreeBackground from './components/ThreeBackground';

export default function Home() {
  return (
    <div>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900 dark:text-white">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-xl font-bold dark:text-white">
              Joshua Balansa
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
              Joshua Balansa
            </h2>
            <h3 className="text-2xl py-2 font-bold md:text-3xl dark:text-white">
              Full Stack Developer
            </h3>
            <p className="text-medium py-9 leading-5 md:text-xl max-w-6xl mx-auto dark:text-gray-300">
              👋 Hello, World! I'm Joshua! I'm a passionate software developer
              with a love for all things tech-related. My journey in the world
              of programming began when I discovered my curiosity for solving
              problems through code. Since then, I've been on an exciting quest
              to explore the vast realms of software development. Continuous
              learning is essential in the ever-evolving tech landscape.
              Presently, I'm diving deep into PHP Laravel frameworks to broaden
              my skillset and tackle more exciting challenges.
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-300">
            <Link href={"https://instagram.com/joo.schwa/"}>
              <AiFillInstagram className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400" />
            </Link>
            <Link href={"https://linkedin.com/in/joshua-balansa-62846a245"}>
              <AiFillLinkedin className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400" />
            </Link>
            <Link href={"https://github.com/joshuabalansa"}>
              <AiFillGithub className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400" />
            </Link>
          </div>
          {/* <div className="relative">
            <ThreeBackground />
          </div> */}
        </section>

        <section className="bg-white dark:bg-gray-800 py-10 px-10">
          <div>
            <h3 className="text-3xl py1 dark:text-white">Tech Stack</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-300">
              Since 2021, I have been working as a Full Stack Developer,
              focusing on building user-friendly and accessible websites. I have
              experience in React, Next.js, and Tailwind CSS, and I am excited
              to continue learning and growing in this field.
            </p>
          </div>
          <div className="lg:flex gap-10">
            {/* <div
              className="text-center shadow-lg p-10 rounded-xl my-10 flex-1
                           bg-white dark:bg-gray-700
                           dark:shadow-xl dark:border-gray-600
                           transition-all duration-300
                           hover:scale-105"
            > */}
              <NextIcon />
            {/* </div> */}
          </div>
        </section>

        <section className="py-10 dark:bg-gray-900">
          <h3 className="text-3xl py-1 mb-5 dark:text-white">Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:flex-wrap lg:flex-row">
            {[web1, web2, web3, web4, web5, web6].map((web, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden
                           transform transition-all duration-300
                           hover:scale-105
                           "
              >
                <Image
                  src={web}
                  width={"100%"}
                  height={"100%"}
                  format="webp"
                  layout="responsive"
                  alt={`web${index + 1}`}
                  className="rounded-lg object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

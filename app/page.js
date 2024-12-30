"use client";

import TeckStack from "./components/TechStack";
import Projects from "./components/Projects";
import MainSection from "./components/MainSection";
import { FaHeart } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
// import ThreeBackground from './components/ThreeBackground';

export default function Home() {
  return (
    <div>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900 dark:text-white">
        <MainSection
          name="Joshua Balansa"
          title="Full Stack Developer"
          description="👋✨ Hello, World! I'm Joshua! 🚀 I'm a passionate software
          developer with a ❤️ for all things tech-related. My journey in the
          world of programming began when I discovered my curiosity for
          solving problems through code. 🧩💡 Since then, I've been on an
          exciting quest to explore the vast realms of software development.
          🌐💻 Continuous learning is essential in the ever-evolving tech
          landscape. 🌱📚 Presently, I'm diving deep into PHP Laravel
          frameworks 🐘⚡ and React Next.js ⚛️🌟 to broaden my skillset and
          tackle more exciting challenges. 💪🎯"
        />
        <TeckStack
          title="Tech Stack"
          description=" As a Full Stack Developer, I specialize in creating dynamic, robust, and user-friendly applications using modern technologies.
            My expertise lies in leveraging PHP and Laravel for building scalable backend solutions, React and Next.js for seamless
            frontend experiences, and Tailwind CSS for crafting responsive and visually appealing designs.
            I also have experience working with Linux environments, MongoDB, and MySQL for managing data efficiently,
            and JavaScript to tie everything together with functionality and interactivity.
            My passion for continuous learning drives me to explore and integrate new tools and frameworks into my workflow."
        />
        <Projects />
      </main>
      {/* <footer className="bg-gray-800 text-white py-4 mt-10 text-center">
        <p>
          Made with <FaHeart className="text-red-500 inline-block" /> by{" "}
          <span className="font-semibold">JoshuaB</span>
        </p>
        <p className="text-sm mt-2 flex items-center justify-center gap-2">
          <span>Built with</span>
          <SiNextdotjs className="text-white inline-block" />
        </p>
      </footer> */}
      <footer className="bg-gray-900 text-white py-4 text-center">
          <p className="text-lg">
            Made with <FaHeart className="text-red-500 inline-block" /> by{' '}
            <span className="font-semibold">JoshuaB</span>
          </p>
          <p className="text-sm mt-2 flex items-center justify-center gap-2">
            <span>Built with</span>
            <SiNextdotjs title="Next.js" className="text-white inline-block" />
            <RiTailwindCssFill title="Tailwind CSS" className="text-white inline-block" />
          </p>
        </footer>
    </div>
  );
}

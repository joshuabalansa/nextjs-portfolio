"use client";

import { TechStack, Projects, MainSection, Footer } from "./components";

export default function Home() {
  return (
    <div>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900 dark:text-white">
        <MainSection
          name="Joshua Balansa"
          title="Full Stack Developer"
          description="👋✨ Hello, World! I'm Joshua!  a passionate software developer 💻 with a strong focus on continuous learning.📚 Currently, I’m deepening my expertise in PHP 🐘, Laravel ⚡ and React ⚛️ to tackle exciting challenges and expand my skills in software development."
        />
        <TechStack
          title="Tech Stack"
          description=" As a Full Stack Developer, I specialize in creating dynamic, robust, and user-friendly applications using modern technologies."
        />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

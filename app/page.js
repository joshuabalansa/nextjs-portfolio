"use client";

import { TechStack, Projects, MainSection, Footer } from "./components";


export default function Home() {
  return (
    <div>
      <main className="bg-white md:px-20 lg:px-40 dark:bg-gray-900 dark:text-white">

        <MainSection
          name="Joshua Balansa"
          title="Full Stack Developer"
          description="As a developer with a passion for solving complex problems 💡, I specialize in building scalable and innovative solutions ⚙️. I am always seeking new opportunities to apply my skills 💻, contribute to impactful projects 🌍, and expand my expertise in modern web technologies 🌐"
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

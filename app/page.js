"use client";

import { TechStack, Projects, MainSection, Footer } from "./components";
import CursorLight from "./components/CursorLight";

export default function Home() {
  return (
    <div>
      <CursorLight />
      <main className="bg-white md:px-20 lg:px-40 dark:bg-gray-900 dark:text-white">
        <MainSection/>
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

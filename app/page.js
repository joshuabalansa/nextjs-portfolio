"use client";

import { TechStack, Projects, MainSection, Footer } from './components';

export default function Home() {
  return (
    <div>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900 dark:text-white">
        <MainSection
          name="Joshua Balansa"
          title="Full Stack Developer"
          description="👋✨ Hello, World! I'm Joshua!  I'm a passionate software
          developer with a  for all things tech-related. My journey in the
          world of programming began when I discovered my curiosity for
          solving problems through code. Since then, I've been on an
          exciting quest to explore the vast realms of software development.
           Continuous learning is essential in the ever-evolving tech
          landscape. 🌱📚 Presently, I'm diving deep into PHP Laravel
          frameworks 🐘⚡ and React Next.js ⚛️🌟 to broaden my skillset and
          tackle more exciting challenges. 💪🎯"
        />
        <TechStack
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
      <Footer />
    </div>
  );
}

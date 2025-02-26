
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "Research Title Generator",
    details: "A web-based application for generating research titles.",
    techStack: "Next JS, Google Gemini",
    githubLink: "https://github.com/joshuabalansa/Research-Title-Generator",
  },
  {
    title: "Automated Daily Tech Blog Posts",
    details: "An AI-powered app that automatically generates tech related blog posts.",
    techStack: "Next JS, Google Gemini",
    githubLink: "https://github.com/joshuabalansa/automated-blog-posting",
  },
  {
    title: "Healthcare Management System",
    details:
      "A web-based application for managing patient records, appointments, and billing.",
    techStack: "PHP, JavaScript, Bootstrap",
    githubLink: "https://github.com/joshuabalansa/healthcare-information-system.git",
  },
  {
    title: "Order Management System with Analytics",
    details:
      "A web-based system for managing orders, inventory, and shipping with analytics.",
    techStack: "Laravel, JavaScript, Bootstrap",
    githubLink: "https://github.com/joshuabalansa/tps-auth.git",
  },
  {
    title: "Tourism Landing Page",
    details:
      "A web-based application for promoting tourism and attracting visitors.",
    techStack: "HTML, CSS, JavaScript",
    githubLink: "https://github.com/joshuabalansa/tourism.git",
  }
  // {
  //   title: "PlumbersStock",
  //   details: "An e-commerce site for plumbers and their supplies.",
  //   techStack: "Laravel, Livewire",
  //   githubLink: "#",
  // },
  // {
  //   title: "Adamsandco",
  //   details: "A wholesaler and designer of custom products for over 8 years.",
  //   techStack: "Laravel",
  //   githubLink: "#",
  // },
];

const Projects = () => {
  return (
    <section className="py-10 p-3 mt-20 dark:bg-gray-900">
      <motion.h3
        className="mb-20 text-4xl font-extrabold text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Recent Projects
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                View on Github
              </Link>
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">Company Project</span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
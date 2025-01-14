import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import web1 from "../../public/web1.png";
import web2 from "../../public/web2.jpg";
import web3 from "../../public/web3.png";
import web4 from "../../public/web4.png";
import web5 from "../../public/web5.png";
import Link from "next/link";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const descriptions = [
    "Healthcare Management System",
    "Order Management System with Analytics",
    "Tourism Landing Page",
    "PlumbersStock",
    "Adamsandco",
  ];

  const details = [
    "Healthcare Management System is a web-based application that provides a comprehensive solution for managing patient records, appointments, and billing. ",
    "Order Management System with Analytics is a web-based application that provides a comprehensive solution for managing orders, inventory, and shipping.",
    "Tourism Landing Page is a web-based application that provides a comprehensive solution for promoting tourism and attracting visitors to a destination. ",
    "PlumbersStock is an e-commerce site that services customers around the world. ",
    "Adams & Co. has been designing their own line and wholesaling their products for more than 8 years.",
  ];

  const techStacks = [
    "PHP, JavaScript, Bootstrap",
    "Laravel, JavaScript, Bootstrap",
    "HTML, CSS, JavaScript",
    "Laravel, Livewire",
    "Laravel",
  ];

  const githubLinks = [
    "https://github.com/joshuabalansa/healthcare-information-system.git",
    "https://github.com/joshuabalansa/tps-auth.git",
    "https://github.com/joshuabalansa/tourism.git",
    "#",
    "#",

  ];

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-10 p-5 mt-20 dark:bg-gray-900">
      <motion.h3
        className="mb-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
       Recent Projects
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[web1, web2, web3, web4, web5].map((web, index) => (
          <motion.div
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 group cursor-pointer"
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              {/* <Image
                src={web}
                width={400}
                height={320}
                layout="intrinsic"
                alt={`web${index + 1}`}
                className="w-full h-full object-cover"
              /> */}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {activeIndex === index && (
                  <div className="text-white">{descriptions[index]}</div>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-medium mb-2 text-black dark:text-white">
                {descriptions[index]}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                Tech Stack: {techStacks[index]}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {details[index]}
              </p>
              {githubLinks[index] !== "#" ? (
                <Link target="_blank" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 text-sm font-medium" href={githubLinks[index]}>
                    View on Github
                </Link>
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">Private Repository</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

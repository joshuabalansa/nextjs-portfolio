import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import web1 from "../../public/web1.png";
import web2 from "../../public/web2.jpg";
import web3 from "../../public/web3.png";
import web4 from "../../public/web4.png";
import web5 from "../../public/web5.png";
// import web6 from "../../public/web6.png";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const descriptions = [
    "PlumbersStock",
    "Adamsandco",
    "Healthcare Management System",
    "Order Management System with Analytics",
    "Tourism Landing Page",
  ];

  const handleClick = (index) => {

    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-10 p-5 dark:bg-gray-900 mt-20">
      <motion.h3
        className="text-3xl py-1 dark:text-white font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
       Explore Projects
      </motion.h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:flex-wrap lg:flex-row">
        {[web1, web2, web3, web4, web5].map((web, index) => (
          <div
            key={index}
            className="transition-all duration-300 group"
            onClick={() => handleClick(index)}
          >
            <motion.div
              className="relative rounded-lg overflow-hidden transform hover:shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image
                src={web}
                width={100}
                height={100}
                layout="responsive"
                alt={`web${index + 1}`}
                className="rounded-lg object-cover cursor-pointer"
              />
              <motion.div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-lg font-semibold">
                  {descriptions[index]}
                </p>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

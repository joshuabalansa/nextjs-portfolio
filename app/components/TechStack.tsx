import {
  FaPhp,
  FaLaravel,
  FaReact,
  FaLinux,
  FaJsSquare,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql } from "react-icons/si";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const TechStack = ({ title, description }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const stackItems = [
    { Icon: FaPhp, label: "PHP", color: "text-indigo-600" },
    { Icon: FaLaravel, label: "Laravel", color: "text-red-600" },
    { Icon: FaReact, label: "React", color: "text-blue-600" },
    { Icon: SiNextdotjs, label: "Next.js", color: "text-black dark:text-white" },
    { Icon: SiTailwindcss, label: "Tailwind CSS", color: "text-teal-500" },
    { Icon: FaLinux, label: "Linux", color: "text-gray-800 dark:text-gray-300" },
    { Icon: SiMongodb, label: "MongoDB", color: "text-green-600" },
    { Icon: FaJsSquare, label: "JavaScript", color: "text-yellow-500" },
    { Icon: SiMysql, label: "MySQL", color: "text-blue-700" },
  ];

  return (
    <motion.section
      ref={ref}
      className="bg-white dark:bg-gray-800 py-10 px-10 rounded-md flex flex-col items-center"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div>
        <h3 className="text-3xl py-1 dark:text-white font-bold text-center">
          {title}
        </h3>
        <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-300 md:text-center sm:text-center">
          {description}
        </p>
      </div>
      <motion.div
        className="lg:flex gap-10 flex-wrap justify-center"
        variants={containerVariants}
      >
        {stackItems.map((item, index) => {
          const { Icon, label, color } = item;

          return (
            <motion.div
              className="flex items-center gap-4 mb-5 cursor-pointer mt-10"
              key={label}
              custom={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <Icon className={`h-12 w-12 ${color}`} />
              <span className="text-lg font-medium text-gray-800 dark:text-gray-300">
                {label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default TechStack;

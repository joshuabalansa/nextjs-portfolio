import {
    FaPhp,
    FaLaravel,
    FaReact,
    FaLinux,
    FaJsSquare,
  } from "react-icons/fa";

  import { SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql } from "react-icons/si";
  import { motion } from "framer-motion";

  const TechStack = ({ title, description}) => {
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
      <section className="bg-white dark:bg-gray-800 py-10 px-10 rounded-md">
        <div>
          <h3 className="text-3xl py-1 dark:text-white">{ title }</h3>
          <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-300">
           { description }
          </p>
        </div>
        <div className="lg:flex gap-10 flex-wrap justify-center">
          {stackItems.map((item, index) => {
            const { Icon, label, color } = item;
            return (
              <motion.div
                className="flex items-center gap-4 mb-5 cursor-pointer"
                key={label}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
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
        </div>
      </section>
    );
  };

  export default TechStack;

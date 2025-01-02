import { motion } from "framer-motion";
import Image from "next/image";
import web1 from "../../public/web1.png";
import web2 from "../../public/web2.jpg";
import web3 from "../../public/web3.png";
import web4 from "../../public/web4.png";
import web5 from "../../public/web5.png";
// import web6 from "../../public/web6.png";

const Projects = () => {
  return (
    <section className="py-10 dark:bg-gray-900 lg:mt-20">
      <motion.h3
        className="text-3xl py-1 mb-5 dark:text-white font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:flex-wrap lg:flex-row">
        {[web1, web2, web3, web4, web5].map((web, index) => (
          <motion.div
            key={index}
            className="rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Image
              src={web}
              width={"100%"}
              height={"100%"}
              layout="responsive"
              alt={`web${index + 1}`}
              className="rounded-lg object-cover cursor-pointer"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

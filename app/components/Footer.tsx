import { FaHeart } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center p-10">
      {/* <p className="text-lg">
        Made with <FaHeart className="text-red-500 inline-block" /> by{" "}
        <span className="font-semibold">JoshuaB</span>
      </p> */}

      <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
          </svg>
          <p>"The best design is the simplest one that works. - Albert Einstein"</p>
      </blockquote>

      <p className="text-sm mt-2 flex items-center justify-center gap-2">
        <span>Built with</span>
        <SiNextdotjs title="Next.js" className="text-white inline-block" />
        <RiTailwindCssFill
          title="Tailwind CSS"
          className="text-white inline-block"
        />
      </p>
    </footer>
  );
};

export default Footer;

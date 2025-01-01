import { FaHeart } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center p-10">
      <p className="text-lg">
        Made with <FaHeart className="text-red-500 inline-block" /> by{" "}
        <span className="font-semibold">JoshuaB</span>
      </p>
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
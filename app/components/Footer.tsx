import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 light:bg-white dark:text-white light:text-black py-4 text-center p-10">
      <p className="text-lg mt-2 flex items-center justify-center gap-2">
        <span>Made with </span>
        <FaHeart /> By JoshuaB
      </p>
    </footer>
  );
};

export default Footer;

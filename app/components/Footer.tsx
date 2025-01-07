import { SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 light:bg-white dark:text-white light:text-black py-4 text-center p-10">
      <p className="text-lg mt-2 flex items-center justify-center gap-2">
        <span>Built with</span>
        <Link href={"https://nextjs.org/"}><SiNextdotjs title="Next.js" className="dark:text-white light:text-black inline-block hover:scale-125" /></Link>
        <Link href={"https://tailwindcss.com/"}><RiTailwindCssFill title="Tailwind CSS" className="dark:text-white light:text-black inline-block hover:scale-125" /></Link>
      </p>
    </footer>
  );
};

export default Footer;

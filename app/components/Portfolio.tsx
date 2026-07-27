"use client"

import React, { useState, useEffect, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { AiFillInstagram, AiFillLinkedin, AiFillGithub, AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import {
  FaEnvelope,
  FaPhp,
  FaLinux,
  FaReact,
  FaLaravel,
  FaJs,
  FaHeart,
  FaCode,
  FaRocket,
  FaBriefcase,
  FaDownload,
  FaChevronDown,
} from "react-icons/fa";
import { LuSun, LuMoon } from "react-icons/lu";
import { MdCall, MdEmail, MdLocationOn, MdWork } from "react-icons/md";
import {
  SiNextdotjs,
  SiTypescript,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiVuedotjs,
  SiGnubash,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
} from "react-icons/si";

const roles = [
  "Full Stack Developer",
  "React & Next.js Developer",
  "Laravel Developer",
  "Problem Solver",
];

const Portfolio = () => {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("home");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Typewriter state
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Projects carousel state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sections = ['home', 'about', 'tech', 'projects', 'contact'];
      const scrollPosition = currentScrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      if (currentScrollY <= 0) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 64) {
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Typewriter effect for hero roles
  useEffect(() => {
    const current = roles[roleIndex];
    let delay = isDeleting ? 40 : 90;
    if (!isDeleting && typedText === current) delay = 2200;
    else if (isDeleting && typedText === "") delay = 400;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === current) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      } else {
        setTypedText(current.slice(0, typedText.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  // Scroll-reveal animations
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Track carousel pages for the dot indicators
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const update = () => {
      setPageCount(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth)));
      setActivePage(Math.min(
        Math.round(el.scrollLeft / el.clientWidth),
        Math.ceil(el.scrollWidth / el.clientWidth) - 1
      ));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollCarousel = (direction: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  const goToPage = (page: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "1h" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const socialLinks = [
    { href: "https://instagram.com/joo.schwa/", Icon: AiFillInstagram, label: "Instagram" },
    {
      href: "https://linkedin.com/in/joshua-balansa-62846a245",
      Icon: AiFillLinkedin,
      label: "LinkedIn",
    },
    { href: "https://github.com/joshuabalansa", Icon: AiFillGithub, label: "GitHub" },
    { href: "mailto:jbalansa143@gmail.com", Icon: FaEnvelope, label: "Email" },
  ];

  const techStack = [
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#888888" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#007ACC" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Express", icon: <SiExpress />, color: "#888888" },
    { name: "PHP", icon: <FaPhp />, color: "#8892BF" },
    { name: "Laravel", icon: <FaLaravel />, color: "#FF2D20" },
    { name: "Vue.js", icon: <SiVuedotjs />, color: "#4FC08D" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    { name: "Linux", icon: <FaLinux />, color: "#FCC624" },
    { name: "Bash", icon: <SiGnubash />, color: "#4EAA25" },
  ];

  const projects = [
    {
      title: "Centimo AI Powered POS",
      details:
        "CENTIMO is a multi-tenant SaaS application that helps retailers run sales, manage inventory, and understand performance. Merchants subscribe monthly to access a touch-friendly POS terminal, product catalog, order history, stock management, and AI-assisted sales insights.",
      techStack: "Next.js, TypeScript, Tailwind CSS",
      githubLink: "",
      liveLink: "https://centimo.app",
    },
    {
      title: "E-Tinda Farmers Marketplace",
      details: "A comprehensive web-based marketplace that connects local farmers directly with buyers, eliminating middlemen and creating an efficient agricultural supply chain.",
      techStack: "Laravel 12, JavaScript, Bootstrap",
      githubLink: "https://github.com/joshuabalansa/e-tinda-web-marketplace-",
      liveLink: "",
    },
    {
      title: "Kingdom Development Group Philippines Page",
      details: "A stunning, modern landing page for Kingdom Development Group Philippines.",
      techStack: "Next.js 14, Tailwind CSS, DaisyUI",
      githubLink: "",
      liveLink: "https://www.kdgphilippines.org/",
    },
    {
      title: "Task Management Dashboard with Deployment Tracking",
      details: "A modern task management dashboard with deployment tracking, team management, and analytics.",
      techStack: "React, TypeScript, Tailwind CSS",
      githubLink: "https://github.com/joshuabalansa/taskflow",
      liveLink: "",
    },
    {
      title: "Research Title Generator",
      details: "A web-based application for generating research titles.",
      techStack: "Next JS, Google Gemini",
      githubLink: "https://github.com/joshuabalansa/Research-Title-Generator",
      liveLink: "https://research-title-generator-alpha.vercel.app/",
    },
    {
      title: "Automated Daily Tech Blog Posts",
      details:
        "An AI-powered app that automatically generates tech related blog posts.",
      techStack: "Next JS, Google Gemini",
      githubLink: "https://github.com/joshuabalansa/automated-blog-posting",
      liveLink: "",
    },
    {
      title: "Healthcare Management System",
      details:
        "A web-based application for managing patient records, appointments, and billing.",
      techStack: "PHP, JavaScript, Bootstrap",
      githubLink:
        "https://github.com/joshuabalansa/healthcare-information-system.git",
        liveLink: "",
    },
    {
      title: "Order Management System with Analytics",
      details:
        "A web-based system for managing orders, inventory, and shipping with analytics.",
      techStack: "Laravel, JavaScript, Bootstrap",
      githubLink: "https://github.com/joshuabalansa/tps-auth.git",
      liveLink: "",
    },
    {
      title: "Tourism Landing Page",
      details:
        "A web-based application for promoting tourism and attracting visitors.",
      techStack: "HTML, CSS, JavaScript",
      githubLink: "https://github.com/joshuabalansa/tourism.git",
      liveLink: "",
    },
    {
      title: "Talisay Water District",
      details:
        "Talisay Water District website.",
      techStack: "Laravel, Bootstrap, JavaScript",
      githubLink: "",
      liveLink: "https://talisaywaterdistrict.gov.ph/",
    },
  ];

  const floatingIcons = [
    { icon: <FaReact />, color: "#61DAFB", className: "top-[22%] left-[8%]", delay: "0s" },
    { icon: <SiNextdotjs />, color: "#888888", className: "top-[18%] right-[10%]", delay: "1.2s" },
    { icon: <SiTypescript />, color: "#007ACC", className: "bottom-[28%] left-[12%]", delay: "0.6s" },
    { icon: <FaLaravel />, color: "#FF2D20", className: "bottom-[24%] right-[8%]", delay: "1.8s" },
    { icon: <SiTailwindcss />, color: "#06B6D4", className: "top-[45%] right-[4%]", delay: "0.3s" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/25 to-purple-600/25 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/25 to-cyan-600/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-pink-400/15 to-orange-400/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 transition-transform duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-16">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="absolute left-0 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {theme === "dark" ? <LuSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}
            </button>
            <div className="flex flex-wrap justify-center gap-x-1 gap-y-1 px-10 text-xs sm:text-sm md:gap-x-2 md:text-base">
              {['home', 'about', 'tech', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
                    activeSection === section
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-900/40'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/70'
                  }`}
                >
                  {section === 'tech' ? 'Technologies' : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
      >
        <div className="hero-grid absolute inset-0 pointer-events-none" />

        {/* Floating tech icons */}
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`hidden md:flex absolute ${item.className} p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-float pointer-events-none`}
            style={{ animationDelay: item.delay, color: item.color }}
          >
            <span className="text-3xl">{item.icon}</span>
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-300/50 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Available for Work
            </span>
          </div>

          <h1 className="animate-fade-up text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-700 dark:text-gray-200" style={{ animationDelay: "0.25s" }}>
            Hi, I&apos;m Josh
          </h1>

          <div className="animate-fade-up mb-8 h-9 md:h-10" style={{ animationDelay: "0.4s" }}>
            <p className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300">
              {typedText}
              <span className="animate-caret text-blue-600 dark:text-blue-400">|</span>
            </p>
          </div>

          <div className="animate-fade-up mb-10 flex flex-wrap items-center justify-center gap-4 text-lg text-gray-500 dark:text-gray-400" style={{ animationDelay: "0.55s" }}>
            <span className="flex items-center gap-2">
              <FaCode />
              Web Developer
            </span>
            <span className="flex items-center gap-2">
              <MdLocationOn />
              Philippines
            </span>
          </div>

          <p className="animate-fade-up mb-12 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed" style={{ animationDelay: "0.7s" }}>
            I craft exceptional digital experiences through innovative web applications,
            combining cutting-edge technology with elegant design to bring your vision to life.
          </p>

          <div className="animate-fade-up flex justify-center gap-4 sm:gap-6 mb-12" style={{ animationDelay: "0.85s" }}>
            {socialLinks.map(({ href, Icon, label }, index) => (
              <Link key={index} href={href} target="_blank" aria-label={label} className="group">
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 group-hover:bg-white/90 dark:group-hover:bg-gray-800/90 group-hover:-translate-y-1.5 group-hover:shadow-xl">
                  <Icon className="text-3xl text-gray-600 dark:text-gray-300 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
              </Link>
            ))}
          </div>

          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "1s" }}>
            <Link
              href="/JoshuaBalansaResume.pdf"
              download
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-full transition-all duration-300 hover:from-emerald-700 hover:to-cyan-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <FaDownload className="mr-2" />
              Download Resume
            </Link>
            <button
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95"
            >
              View My Work
              <AiOutlineArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to about section"
            className="animate-fade-up mt-16 mx-auto flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <FaChevronDown className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* About Section — Bento Grid */}
      <section
        id="about"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {/* Photo tile */}
            <div className="reveal col-span-2 row-span-2 relative rounded-3xl overflow-hidden shadow-xl group min-h-[320px] bg-gray-100 dark:bg-gray-900 transition-transform duration-300 hover:-translate-y-1">
              <Image
                src="/img-1.jpeg"
                alt="Joshua Balansa"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-bold text-xl">Joshua Balansa</p>
                <p className="text-gray-200 text-sm">Full Stack Developer</p>
              </div>
              <div className="absolute top-4 right-4 w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FaCode className="text-2xl text-white" />
              </div>
            </div>

            {/* Journey tile */}
            <div className="reveal col-span-2 row-span-2 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">My Journey</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                With a passion for technology and innovation, I specialize in creating
                full-stack web applications that solve real-world problems. My expertise
                spans from modern frontend frameworks to robust backend systems.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I believe in clean code, user-centered design, and continuous learning.
                Every project is an opportunity to push boundaries and create something extraordinary.
              </p>
            </div>

            {/* Stat tiles */}
            <div className="reveal p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <FaRocket className="text-3xl text-gray-700 dark:text-gray-200 mb-3 mx-auto" />
              <h4 className="text-3xl font-black text-gray-800 dark:text-white">50+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Projects Completed</p>
            </div>

            <div className="reveal p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <FaBriefcase className="text-3xl text-gray-700 dark:text-gray-200 mb-3 mx-auto" />
              <h4 className="text-3xl font-black text-gray-800 dark:text-white">4.5+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Years Experience</p>
            </div>

            <div className="reveal p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <MdLocationOn className="text-3xl text-gray-700 dark:text-gray-200 mb-3 mx-auto" />
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">Philippines</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Based in</p>
            </div>

            <div className="reveal p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <MdWork className="text-3xl text-gray-700 dark:text-gray-200 mb-3 mx-auto" />
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">Open to Work</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Freelance & Full-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section — Marquee Carousel */}
      <section
        id="tech"
        className="py-24 px-0 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Tech <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Modern technologies I use to build exceptional digital experiences
            </p>
          </div>
        </div>

        <div className="reveal space-y-5">
          {[
            { items: techStack.slice(0, 8), reverse: false },
            { items: techStack.slice(8), reverse: true },
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="marquee relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-slate-50 dark:from-gray-900 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-indigo-100 dark:from-gray-900 to-transparent" />
              <div className={`flex w-max gap-4 ${row.reverse ? "marquee-track-reverse" : "marquee-track"}`}>
                {[...row.items, ...row.items].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex items-center gap-3 px-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transition-colors hover:border-blue-400/60 dark:hover:border-blue-500/60"
                  >
                    <span className="text-2xl" style={{ color: tech.color }}>{tech.icon}</span>
                    <span className="font-semibold text-gray-800 dark:text-white whitespace-nowrap">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section — Carousel */}
      <section
        id="projects"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcasing my latest work and innovative solutions
            </p>
          </div>

          <div className="reveal relative">
            <div
              ref={carouselRef}
              className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group snap-start shrink-0 w-[88%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex flex-col p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-400/50 dark:hover:border-purple-500/50"
                >
                  <span className="text-sm font-mono font-bold text-gray-400 dark:text-gray-500 mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm line-clamp-4">
                    {project.details}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.split(', ').map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {project.githubLink && project.githubLink !== "#" && (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors"
                      >
                        <AiFillGithub />
                        Code
                      </Link>
                    )}
                    {project.liveLink && (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 text-sm transition-colors"
                      >
                        <FaRocket />
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => scrollCarousel(-1)}
                aria-label="Previous projects"
                disabled={activePage === 0}
                className="p-3 rounded-full bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 transition-all hover:border-purple-400/60 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              >
                <AiOutlineArrowLeft className="text-xl" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    aria-label={`Go to page ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activePage === index
                        ? "w-8 bg-gradient-to-r from-purple-600 to-pink-600"
                        : "w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollCarousel(1)}
                aria-label="Next projects"
                disabled={activePage === pageCount - 1}
                className="p-3 rounded-full bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 transition-all hover:border-purple-400/60 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              >
                <AiOutlineArrowRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let&apos;s <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to bring your ideas to life? Let&apos;s create something amazing together.
            </p>
          </div>

          <div className="reveal grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <MdEmail className="text-3xl text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300 break-all">jbalansa143@gmail.com</p>
            </div>
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <MdLocationOn className="text-3xl text-emerald-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Location</h3>
              <p className="text-gray-600 dark:text-gray-300">Philippines</p>
            </div>
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <MdWork className="text-3xl text-purple-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Status</h3>
              <p className="text-gray-600 dark:text-gray-300">Available for Work</p>
            </div>
          </div>

          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              data-cal-namespace="1h"
              data-cal-link="joshua-balansa-iulx9o/1h"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <MdCall className="mr-2" />
              Schedule a Call
            </button>
            <Link
              href="mailto:jbalansa143@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95"
            >
              <MdEmail className="mr-2" />
              Send Email
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-gray-600 dark:text-gray-300">Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-300">by Joshua Balansa</span>
          </div>
        </div>
      </footer>

      <Script id="chatbase-script" strategy="afterInteractive">
        {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="${process.env.NEXT_PUBLIC_CHATBOT_ID}";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
      </Script>
    </div>
  );
};

export default Portfolio;

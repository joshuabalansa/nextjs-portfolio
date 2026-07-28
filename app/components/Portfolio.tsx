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
  FaBriefcase,
  FaDownload,
  FaChevronDown,
  FaRocket,
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
  "Front-end Developer",
];

const SectionHeading = ({ overline, title, subtitle }: { overline: string; title: string; subtitle?: string }) => (
  <div className="text-center mb-16 reveal">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
      {overline}
    </p>
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

const Portfolio = () => {
  const [theme, setTheme] = useState("dark");
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
    const savedTheme = localStorage.getItem("theme") || "dark";
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
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/60 dark:border-gray-800/60 transition-transform duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-16">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="absolute left-0 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
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
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {section === 'tech' ? 'Stack' : section === 'projects' ? 'Work' : section}
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
            className={`hidden md:flex absolute ${item.className} p-4 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800/60 shadow-sm animate-float pointer-events-none`}
            style={{ animationDelay: item.delay, color: item.color }}
          >
            <span className="text-3xl">{item.icon}</span>
          </div>
        ))}

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open to new projects
            </span>
          </div>

          <h1 className="animate-fade-up text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white" style={{ animationDelay: "0.25s" }}>
            Hi, I&apos;m Josh.
          </h1>

          <div className="animate-fade-up mb-8 h-8 md:h-9" style={{ animationDelay: "0.4s" }}>
            <p className="text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400">
              {typedText}
              <span className="animate-caret text-gray-400 dark:text-gray-500">|</span>
            </p>
          </div>

          <p className="animate-fade-up mb-12 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed" style={{ animationDelay: "0.55s" }}>
            I design and build clean, fast web applications — from polished
            interfaces to reliable back-end systems. Based in the Philippines,
            working with clients everywhere.
          </p>

          <div className="animate-fade-up flex flex-col sm:flex-row gap-3 justify-center mb-12" style={{ animationDelay: "0.7s" }}>
            <button
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center justify-center px-7 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.03] active:scale-95 shadow-sm"
            >
              See my work
              <AiOutlineArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/JoshuaBalansaResume.pdf"
              download
              className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white hover:scale-[1.03] active:scale-95"
            >
              <FaDownload className="mr-2 text-sm" />
              Resume
            </Link>
          </div>

          <div className="animate-fade-up flex justify-center gap-3" style={{ animationDelay: "0.85s" }}>
            {socialLinks.map(({ href, Icon, label }, index) => (
              <Link key={index} href={href} target="_blank" aria-label={label} className="group">
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 transition-all duration-300 group-hover:border-gray-900 dark:group-hover:border-white group-hover:-translate-y-1">
                  <Icon className="text-xl text-gray-500 dark:text-gray-400 transition-colors group-hover:text-gray-900 dark:group-hover:text-white" />
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to about section"
            className="animate-fade-up mt-16 mx-auto flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
            style={{ animationDelay: "1s" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <FaChevronDown className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* About Section — Bento Grid */}
      <section
        id="about"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/40"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading overline="About" title="A bit about me" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {/* Photo tile */}
            <div className="reveal col-span-2 row-span-2 relative rounded-2xl overflow-hidden group min-h-[320px] bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-transform duration-300 hover:-translate-y-1">
              <Image
                src="/img-1.jpeg"
                alt="Joshua Balansa"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-xl">Joshua Balansa</p>
                <p className="text-gray-300 text-sm">Full Stack Developer</p>
              </div>
            </div>

            {/* What I do tile */}
            <div className="reveal col-span-2 row-span-2 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What I do</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                I&apos;m a full-stack developer who enjoys taking products from idea
                to launch. I work across the stack — React and Next.js on the
                front-end, Laravel and Node.js on the back-end.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I care about clean code, thoughtful design, and shipping things
                that actually get used.
              </p>
            </div>

            {/* Stat tiles */}
            <div className="reveal p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <FaRocket className="text-2xl text-gray-400 dark:text-gray-500 mb-3 mx-auto" />
              <h4 className="text-3xl font-bold text-gray-900 dark:text-white">50+</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Projects shipped</p>
            </div>

            <div className="reveal p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <FaBriefcase className="text-2xl text-gray-400 dark:text-gray-500 mb-3 mx-auto" />
              <h4 className="text-3xl font-bold text-gray-900 dark:text-white">4.5+</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Years of experience</p>
            </div>

            <div className="reveal p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <MdLocationOn className="text-2xl text-gray-400 dark:text-gray-500 mb-3 mx-auto" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Philippines</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Based in</p>
            </div>

            <div className="reveal p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <MdWork className="text-2xl text-gray-400 dark:text-gray-500 mb-3 mx-auto" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Open to work</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Freelance & full-time</p>
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
          <SectionHeading
            overline="Stack"
            title="Tools I work with"
            subtitle="The technologies behind my day-to-day work."
          />
        </div>

        <div className="reveal space-y-4">
          {[
            { items: techStack.slice(0, 8), reverse: false },
            { items: techStack.slice(8), reverse: true },
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="marquee relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />
              <div className={`flex w-max gap-3 ${row.reverse ? "marquee-track-reverse" : "marquee-track"}`}>
                {[...row.items, ...row.items].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors hover:border-gray-400 dark:hover:border-gray-600"
                  >
                    <span className="text-xl" style={{ color: tech.color }}>{tech.icon}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{tech.name}</span>
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
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/40"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            overline="Work"
            title="Selected work"
            subtitle="A few projects I've designed, built, and shipped."
          />

          <div className="reveal relative">
            <div
              ref={carouselRef}
              className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group snap-start shrink-0 w-[88%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none hover:border-gray-400 dark:hover:border-gray-600"
                >
                  <span className="text-sm font-mono text-gray-400 dark:text-gray-600 mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm line-clamp-4">
                    {project.details}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.split(', ').map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full"
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
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white text-sm transition-colors"
                      >
                        <AiFillGithub />
                        Code
                      </Link>
                    )}
                    {project.liveLink && (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        className="group/live flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:opacity-90 text-sm font-medium transition-all"
                      >
                        Live site
                        <AiOutlineArrowRight className="-rotate-45 transition-transform group-hover/live:rotate-0" />
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
                className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 transition-all hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white hover:scale-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              >
                <AiOutlineArrowLeft className="text-xl" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    aria-label={`Go to page ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activePage === index
                        ? "w-7 bg-gray-900 dark:bg-white"
                        : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollCarousel(1)}
                aria-label="Next projects"
                disabled={activePage === pageCount - 1}
                className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 transition-all hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white hover:scale-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
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
          <SectionHeading
            overline="Contact"
            title="Let's work together"
            subtitle="Have a project in mind? Tell me about it."
          />

          <div className="reveal grid md:grid-cols-3 gap-4 mb-12">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <MdEmail className="text-2xl text-gray-400 dark:text-gray-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 break-all">jbalansa143@gmail.com</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <MdLocationOn className="text-2xl text-gray-400 dark:text-gray-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Philippines (GMT+8)</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none dark:hover:border-gray-700">
              <MdWork className="text-2xl text-gray-400 dark:text-gray-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Availability</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open to new projects</p>
            </div>
          </div>

          <div className="reveal flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              data-cal-namespace="1h"
              data-cal-link="joshua-balansa-iulx9o/1h"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.03] active:scale-95 shadow-sm"
            >
              <MdCall className="mr-2" />
              Schedule a call
            </button>
            <Link
              href="mailto:jbalansa143@gmail.com"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white hover:scale-[1.03] active:scale-95"
            >
              <MdEmail className="mr-2" />
              Send an email
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Joshua Balansa. Built with Next.js.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, Icon, label }, index) => (
              <Link
                key={index}
                href={href}
                target="_blank"
                aria-label={label}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Icon className="text-lg" />
              </Link>
            ))}
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

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
  FaChevronDown,
} from "react-icons/fa";
import { LuSun, LuMoon, LuMenu, LuX } from "react-icons/lu";
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
  SiNestjs,
} from "react-icons/si";

const roles = [
  "Full Stack Developer",
  "React & Next.js Developer",
  "Laravel Developer",
  "Front-end Developer",
];

/** Scroll progress for sticky pin sections: starts as section enters the viewport. */
const getPinnedSectionProgress = (section: HTMLElement) => {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const pinDistance = Math.max(1, section.offsetHeight - vh);

  // Still fully below the fold
  if (rect.top >= vh) return 0;

  // Approaching / partially visible: map rect.top (vh → 0) to progress 0 → 0.88
  if (rect.top > 0) {
    const approach = 1 - rect.top / vh;
    return Math.round(approach * 0.88 * 1000) / 1000;
  }

  // Sticky pinned: remaining scroll 0.88 → 1
  const pin = Math.min(1, Math.max(0, -rect.top / pinDistance));
  return Math.round((0.88 + pin * 0.12) * 1000) / 1000;
};

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "tech", label: "Stack" },
    { id: "projects", label: "Work" },
    { id: "contact", label: "Contact" },
  ] as const;

  // Typewriter state
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Projects carousel state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // Philosophy scroll-pin progress (0 → 1)
  const philosophyRef = useRef<HTMLElement>(null);
  const [philosophyProgress, setPhilosophyProgress] = useState(0);

  // Tech stack scroll-pin progress (0 → 1)
  const techRef = useRef<HTMLElement>(null);
  const [techProgress, setTechProgress] = useState(0);

  // Projects scroll-pin progress (0 → 1)
  const projectsRef = useRef<HTMLElement>(null);
  const [projectsProgress, setProjectsProgress] = useState(0);

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
      setIsMobileMenuOpen(false);
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
        setIsMobileMenuOpen(false);
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

  // Sticky section scroll progress (philosophy + tech + projects)
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (philosophyRef.current) {
        const next = getPinnedSectionProgress(philosophyRef.current);
        setPhilosophyProgress((prev) => (prev === next ? prev : next));
      }
      if (techRef.current) {
        const next = getPinnedSectionProgress(techRef.current);
        setTechProgress((prev) => (prev === next ? prev : next));
      }
      if (projectsRef.current) {
        const next = getPinnedSectionProgress(projectsRef.current);
        setProjectsProgress((prev) => (prev === next ? prev : next));
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
    { name: "NestJS", icon: <SiNestjs />, color: "#E0234E" },
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
      title: "Centimo - AI Powered POS",
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

  const heroIcons = [
    { Icon: FaReact, color: "#61DAFB", label: "React", pos: "top-[6%] left-[38%]", size: "h-14 w-14 text-2xl sm:h-16 sm:w-16 sm:text-3xl", float: "animate-float-a", delay: "0s", sx: "0px", sy: "-38px", r: "-6deg" },
    { Icon: SiNextdotjs, color: "#888888", label: "Next.js", pos: "top-[10%] right-[14%]", size: "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl", float: "animate-float-b", delay: "0.3s", sx: "32px", sy: "-34px", r: "10deg" },
    { Icon: SiTypescript, color: "#007ACC", label: "TypeScript", pos: "top-[28%] right-[2%]", size: "h-14 w-14 text-2xl sm:h-16 sm:w-16 sm:text-3xl", float: "animate-float-c", delay: "0.6s", sx: "40px", sy: "-6px", r: "12deg" },
    { Icon: FaJs, color: "#F7DF1E", label: "JavaScript", pos: "top-[48%] right-[6%]", size: "h-11 w-11 text-lg sm:h-12 sm:w-12 sm:text-xl", float: "animate-float-d", delay: "0.15s", sx: "36px", sy: "18px", r: "8deg" },
    { Icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS", pos: "bottom-[28%] right-[4%]", size: "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl", float: "animate-float-a", delay: "0.9s", sx: "38px", sy: "28px", r: "-8deg" },
    { Icon: SiNodedotjs, color: "#339933", label: "Node.js", pos: "bottom-[12%] right-[18%]", size: "h-14 w-14 text-2xl sm:h-16 sm:w-16 sm:text-3xl", float: "animate-float-b", delay: "0.45s", sx: "24px", sy: "40px", r: "6deg" },
    { Icon: SiExpress, color: "#888888", label: "Express", pos: "bottom-[4%] left-[40%]", size: "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl", float: "animate-float-c", delay: "1.1s", sx: "4px", sy: "44px", r: "-4deg" },
    { Icon: SiNestjs, color: "#E0234E", label: "NestJS", pos: "bottom-[22%] left-[28%]", size: "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl", float: "animate-float-d", delay: "0.55s", sx: "-12px", sy: "28px", r: "7deg" },
    { Icon: FaPhp, color: "#8892BF", label: "PHP", pos: "bottom-[14%] left-[14%]", size: "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl", float: "animate-float-d", delay: "0.25s", sx: "-28px", sy: "36px", r: "-12deg" },
    { Icon: FaLaravel, color: "#FF2D20", label: "Laravel", pos: "bottom-[32%] left-[2%]", size: "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl", float: "animate-float-a", delay: "0.75s", sx: "-40px", sy: "16px", r: "10deg" },
    { Icon: SiVuedotjs, color: "#4FC08D", label: "Vue.js", pos: "top-[46%] left-[2%]", size: "h-11 w-11 text-lg sm:h-12 sm:w-12 sm:text-xl", float: "animate-float-b", delay: "1.2s", sx: "-42px", sy: "4px", r: "-10deg" },
    { Icon: SiMongodb, color: "#47A248", label: "MongoDB", pos: "top-[26%] left-[6%]", size: "h-11 w-11 text-lg sm:h-12 sm:w-12 sm:text-xl", float: "animate-float-c", delay: "0.5s", sx: "-38px", sy: "-14px", r: "8deg" },
    { Icon: SiMysql, color: "#4479A1", label: "MySQL", pos: "top-[12%] left-[16%]", size: "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl", float: "animate-float-d", delay: "1s", sx: "-30px", sy: "-32px", r: "-14deg" },
    { Icon: SiFirebase, color: "#FFCA28", label: "Firebase", pos: "top-[36%] left-[28%]", size: "h-11 w-11 text-lg sm:h-12 sm:w-12 sm:text-xl", float: "animate-float-a", delay: "0.35s", sx: "-16px", sy: "-8px", r: "12deg" },
    { Icon: FaLinux, color: "#FCC624", label: "Linux", pos: "bottom-[40%] right-[26%]", size: "h-11 w-11 text-lg sm:h-12 sm:w-12 sm:text-xl", float: "animate-float-b", delay: "0.85s", sx: "20px", sy: "12px", r: "-6deg" },
    { Icon: SiGnubash, color: "#4EAA25", label: "Bash", pos: "top-[56%] right-[24%]", size: "h-11 w-11 text-lg sm:h-12 sm:w-12 sm:text-xl", float: "animate-float-c", delay: "1.35s", sx: "14px", sy: "20px", r: "9deg" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-clip">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/60 dark:border-gray-800/60 transition-transform duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {theme === "dark" ? <LuSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
                    activeSection === id
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
            </button>

            {/* Spacer so desktop theme button stays left-aligned with centered-feel layout */}
            <div className="hidden md:block w-9" aria-hidden="true" />
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 pt-1 border-t border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
            <div className="flex flex-col gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-left font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === id
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-dvh flex items-center justify-center overflow-x-clip"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="hero-mesh absolute inset-0" />
          <div className="hero-grid absolute inset-0" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-6 xl:col-span-5 relative z-10 text-center lg:text-left">
              <div className="animate-fade-up" style={{ animationDelay: "0.08s" }}>
                <div className="inline-flex items-center gap-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Open to new projects
                </div>
              </div>

              <div className="animate-fade-up mt-6 sm:mt-8" style={{ animationDelay: "0.18s" }}>
                <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-medium mb-2 sm:mb-3">
                  Hi, I&apos;m
                </p>
                <h1 className="text-[clamp(3.75rem,14vw,8.5rem)] font-bold tracking-tighter leading-[0.88] text-gray-900 dark:text-white">
                  Josh<span className="text-gray-300 dark:text-gray-600">.</span>
                </h1>
                <div className="hero-line mt-5 h-px w-20 bg-gray-900 dark:bg-white mx-auto lg:mx-0" />
              </div>

              <div className="animate-fade-up mt-7 sm:mt-8 h-8 sm:h-9" style={{ animationDelay: "0.32s" }}>
                <p className="text-xl sm:text-2xl font-medium tracking-tight text-gray-500 dark:text-gray-400 font-[family-name:var(--font-geist-mono)]">
                  {typedText}
                  <span className="animate-caret text-gray-400 dark:text-gray-500">|</span>
                </p>
              </div>

              <p
                className="animate-fade-up mt-6 sm:mt-8 max-w-md mx-auto lg:mx-0 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                style={{ animationDelay: "0.45s" }}
              >
                I design and build clean, fast web applications — polished
                interfaces, reliable back ends. Based in the Philippines,
                working with clients everywhere.
              </p>

              <div
                className="animate-fade-up mt-9 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                style={{ animationDelay: "0.58s" }}
              >
                <button
                  onClick={() => scrollToSection("projects")}
                  className="group inline-flex items-center justify-center px-7 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.03] active:scale-95 shadow-sm"
                >
                  See my work
                  <AiOutlineArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white hover:scale-[1.03] active:scale-95"
                >
                  Get in touch
                </button>
              </div>

              <div
                className="animate-fade-up mt-10 sm:mt-12 flex items-center justify-center lg:justify-start gap-1"
                style={{ animationDelay: "0.72s" }}
              >
                {socialLinks.map(({ href, Icon, label }, index) => (
                  <Link
                    key={index}
                    href={href}
                    target="_blank"
                    aria-label={label}
                    className="p-2.5 text-gray-400 dark:text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
                  >
                    <Icon className="text-xl" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Floating language / framework constellation */}
            <div
              className="lg:col-span-6 xl:col-span-7 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="hero-constellation group/constellation">
                <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-gray-200/50 to-transparent dark:from-gray-700/30 dark:to-transparent blur-2xl pointer-events-none" />

                {heroIcons.map(({ Icon, color, label, pos, size, float, delay, sx, sy, r }, index) => (
                  <div
                    key={label}
                    className={`hero-icon-wrap absolute ${pos}`}
                    style={{
                      "--sx": sx,
                      "--sy": sy,
                      "--r": r,
                      transitionDelay: `${index * 20}ms`,
                    } as React.CSSProperties}
                    title={label}
                  >
                    <div className={float} style={{ animationDelay: delay }}>
                      <div className={`hero-icon ${size}`}>
                        <Icon style={{ color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          aria-label="Scroll to about section"
          className="animate-fade-up absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll</span>
          <FaChevronDown className="animate-bounce text-sm" />
        </button>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-gray-50 dark:bg-gray-900/40" />
        <div className="pointer-events-none absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-gray-100/80 to-transparent dark:from-gray-800/20" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gray-200/40 dark:bg-gray-800/30 blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <SectionHeading
            overline="About"
            title="A bit about me"
            subtitle="The person behind the projects."
          />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Portrait — sticky while story scrolls */}
            <div className="reveal lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div
                  aria-hidden
                  className="absolute -inset-px rounded-[1.85rem] bg-gradient-to-br from-gray-300 via-gray-200/40 to-gray-400/50 dark:from-gray-600 dark:via-gray-700/30 dark:to-gray-500/40"
                />
                <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden group bg-gray-200 dark:bg-gray-800">
                  <Image
                    src="/img-1.jpeg"
                    alt="Joshua Balansa"
                    fill
                    sizes="(max-width: 1024px) 24rem, 40vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-white text-2xl font-semibold tracking-tight">
                      Joshua Balansa
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="lg:col-span-7 space-y-14">
              <div className="reveal" style={{ transitionDelay: "80ms" }}>
                <div className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Open to freelance & full-time
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold tracking-tight text-gray-900 dark:text-white leading-[1.2] mb-6">
                  I take products from idea to launch — clean interfaces, solid backends, real results.
                </h3>
                <div className="space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  <p>
                    I&apos;m a full-stack developer who works across the stack —
                    React and Next.js on the front-end, Laravel and Node.js on
                    the back-end — with a focus on speed, clarity, and craft.
                  </p>
                  <p>
                    I care about clean code, thoughtful design, and shipping
                    things people actually use. Based in the Philippines,
                    collaborating with clients worldwide.
                  </p>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: "120ms" }}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-5">
                  How I work
                </p>
                <div className="space-y-6 max-w-xl">
                  {[
                    {
                      step: "01",
                      title: "Understand the goal",
                      body: "I start with the problem, users, and constraints — not a stack preference. Clear scope and outcomes first.",
                    },
                    {
                      step: "02",
                      title: "Design & build in parallel",
                      body: "Interfaces and APIs come together early so we can validate quickly, tighten the UX, and avoid late surprises.",
                    },
                    {
                      step: "03",
                      title: "Ship, measure, refine",
                      body: "Production-ready code with room to iterate: performance, feedback, and small improvements that compound over time.",
                    },
                  ].map(({ step, title, body }) => (
                    <div key={step} className="flex gap-5">
                      <span className="shrink-0 text-sm font-bold tabular-nums text-gray-300 dark:text-gray-600 pt-0.5">
                        {step}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5">
                          {title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <dl
                className="reveal divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800 max-w-xl"
                style={{ transitionDelay: "160ms" }}
              >
                {[
                  { label: "Front-end", value: "React, Next.js, TypeScript, Tailwind" },
                  { label: "Back-end", value: "Laravel, Node.js, Express, REST APIs" },
                  { label: "Data", value: "MySQL, MongoDB, Firebase" },
                  { label: "Mindset", value: "Ship sharp, iterate fast" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4"
                  >
                    <dt className="sm:w-28 shrink-0 text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {label}
                    </dt>
                    <dd className="text-gray-800 dark:text-gray-200 font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="reveal" style={{ transitionDelay: "200ms" }}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-5">
                  What I bring
                </p>
                <ul className="space-y-4 max-w-xl">
                  {[
                    "End-to-end ownership — from UI details to database design and deployment.",
                    "Product-minded delivery: prioritise what matters, cut what doesn’t, keep velocity high.",
                    "Clear async communication so remote work stays simple across time zones.",
                    "A bias toward maintainable systems — not just a quick demo that breaks next month.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900 dark:bg-white"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="reveal grid grid-cols-3 gap-4 sm:gap-8 max-w-xl"
                style={{ transitionDelay: "240ms" }}
              >
                {[
                  { value: "E2E", label: "Idea to launch" },
                  { value: "4.5+", label: "Years experience" },
                  { value: "PH", label: "GMT+8 base" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white tabular-nums">
                      {value}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-snug">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="reveal" style={{ transitionDelay: "280ms" }}>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-8">
                  Whether you need a polished landing experience, a full product
                  build, or help tightening an existing codebase — I&apos;m
                  ready to jump in and ship.
                </p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                >
                  Let&apos;s work together
                  <AiOutlineArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — scroll-pinned MINIMALIST statement */}
      <section
        ref={philosophyRef}
        id="philosophy"
        className="relative h-[180vh] bg-white dark:bg-gray-950"
        aria-label="Design philosophy"
      >
        <div className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden px-4 sm:px-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 philosophy-grid opacity-40 dark:opacity-30"
          />

          <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
            <p
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-gray-400 dark:text-gray-500 mb-6 sm:mb-8"
              style={{
                opacity: Math.min(1, philosophyProgress / 0.12),
                transform: `translateY(${(1 - Math.min(1, philosophyProgress / 0.12)) * 16}px)`,
                transition: "none",
              }}
            >
              Philosophy
            </p>

            <h2
              className="philosophy-word font-bold tracking-tighter text-gray-900 dark:text-white select-none"
              aria-label="Minimalist"
            >
              {"MINIMALIST".split("").map((letter, index) => {
                const letterStart = 0.05 + index * 0.035;
                const letterEnd = letterStart + 0.14;
                const t = Math.min(
                  1,
                  Math.max(0, (philosophyProgress - letterStart) / (letterEnd - letterStart))
                );
                const ease = 1 - Math.pow(1 - t, 3);
                return (
                  <span
                    key={`${letter}-${index}`}
                    className="inline-block"
                    style={{
                      opacity: ease,
                      transform: `translateY(${(1 - ease) * 48}px) scale(${0.88 + ease * 0.12})`,
                      filter: `blur(${(1 - ease) * 8}px)`,
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </h2>

            <div
              className="mx-auto mt-8 sm:mt-10 max-w-xl"
              style={{
                opacity: Math.min(1, Math.max(0, (philosophyProgress - 0.48) / 0.22)),
                transform: `translateY(${Math.max(0, 1 - Math.min(1, Math.max(0, (philosophyProgress - 0.48) / 0.22))) * 28}px)`,
              }}
            >
              <div
                className="h-px w-12 bg-gray-900 dark:bg-white mx-auto mb-6 sm:mb-8 origin-center"
                style={{
                  transform: `scaleX(${Math.min(1, Math.max(0, (philosophyProgress - 0.48) / 0.18))})`,
                }}
              />
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Less noise, more clarity. I design and build with restraint —
                clean layouts, purposeful motion, and only the details that
                earn their place. Complexity lives under the hood so the
                experience stays simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section — scroll-linked marquees */}
      <section
        ref={techRef}
        id="tech"
        className="relative h-[140vh] overflow-hidden"
      >
        <div className="sticky top-0 h-dvh flex flex-col justify-center py-16 sm:py-20">
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            style={{
              opacity: Math.min(1, Math.max(0, techProgress / 0.12)),
              transform: `translateY(${(1 - Math.min(1, Math.max(0, techProgress / 0.12))) * 28}px)`,
            }}
          >
            <div className="text-center mb-10 sm:mb-14">
              <p
                className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3"
                style={{
                  opacity: Math.min(1, Math.max(0, techProgress / 0.14)),
                  transform: `translateY(${(1 - Math.min(1, Math.max(0, techProgress / 0.14))) * 10}px)`,
                }}
              >
                Stack
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
                style={{
                  opacity: Math.min(1, Math.max(0, (techProgress - 0.04) / 0.16)),
                  transform: `translateY(${(1 - Math.min(1, Math.max(0, (techProgress - 0.04) / 0.16))) * 18}px) scale(${0.97 + Math.min(1, Math.max(0, (techProgress - 0.04) / 0.16)) * 0.03})`,
                }}
              >
                Tools I work with
              </h2>
              <p
                className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
                style={{
                  opacity: Math.min(1, Math.max(0, (techProgress - 0.1) / 0.16)),
                  transform: `translateY(${(1 - Math.min(1, Math.max(0, (techProgress - 0.1) / 0.16))) * 14}px)`,
                }}
              >
                The technologies behind my day-to-day work.
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 w-full">
            {(() => {
              const rowCount = 4;
              const perRow = Math.ceil(techStack.length / rowCount);
              return Array.from({ length: rowCount }, (_, rowIndex) => {
                const items = techStack.slice(rowIndex * perRow, (rowIndex + 1) * perRow);
                if (items.length === 0) return null;
                const reverse = rowIndex % 2 === 1;
                // Reveal while section is still approaching the top
                const start = 0.12 + rowIndex * 0.08;
                const end = start + 0.18;
                const t = Math.min(
                  1,
                  Math.max(0, (techProgress - start) / (end - start))
                );
                const ease = 1 - Math.pow(1 - t, 3);
                const fromX = reverse ? 10 : -10;
                const drift = reverse
                  ? (1 - ease) * 6 + Math.max(0, techProgress - 0.5) * -4
                  : (1 - ease) * -6 + Math.max(0, techProgress - 0.5) * 4;

                return (
                  <div
                    key={rowIndex}
                    className="marquee relative overflow-hidden"
                    style={{
                      opacity: ease,
                      transform: `translateX(${fromX * (1 - ease) + drift * 0.35}%)`,
                      filter: `blur(${(1 - ease) * 4}px)`,
                    }}
                  >
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />
                    <div
                      className={`flex w-max gap-3 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}
                      style={{
                        animationPlayState: t > 0.2 ? "running" : "paused",
                      }}
                    >
                      {[...items, ...items, ...items].map((tech, index) => {
                        const chipStart = start + 0.02 + (index % items.length) * 0.015;
                        const chipT = Math.min(
                          1,
                          Math.max(0, (techProgress - chipStart) / 0.12)
                        );
                        const chipEase = 1 - Math.pow(1 - chipT, 3);

                        return (
                          <div
                            key={`${tech.name}-${index}`}
                            className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors hover:border-gray-400 dark:hover:border-gray-600"
                            style={{
                              opacity: chipEase,
                              transform: `scale(${0.9 + chipEase * 0.1}) translateY(${(1 - chipEase) * 12}px)`,
                            }}
                          >
                            <span className="text-xl" style={{ color: tech.color }}>
                              {tech.icon}
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <p
            className="mt-10 sm:mt-12 text-center text-sm text-gray-400 dark:text-gray-500 px-4"
            style={{
              opacity: Math.min(1, Math.max(0, (techProgress - 0.45) / 0.2)),
              transform: `translateY(${(1 - Math.min(1, Math.max(0, (techProgress - 0.45) / 0.2))) * 12}px)`,
            }}
          >
            Front-end, back-end, data, and the shell — ships on these tools.
          </p>
        </div>
      </section>

      {/* Projects Section — centered sticky showcase */}
      <section
        ref={projectsRef}
        id="projects"
        className="relative h-[150vh] overflow-hidden bg-gray-50 dark:bg-gray-900/40"
      >
        <div className="sticky top-0 h-dvh flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto w-full">
            <div
              className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
              style={{
                opacity: Math.min(1, projectsProgress / 0.14),
                transform: `translateY(${(1 - Math.min(1, projectsProgress / 0.14)) * 24}px)`,
              }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3"
                style={{
                  opacity: Math.min(1, projectsProgress / 0.16),
                }}
              >
                Work
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
                style={{
                  opacity: Math.min(1, Math.max(0, (projectsProgress - 0.04) / 0.16)),
                  transform: `translateY(${(1 - Math.min(1, Math.max(0, (projectsProgress - 0.04) / 0.16))) * 16}px)`,
                }}
              >
                Selected work
              </h2>
              <p
                className="mt-4 text-lg text-gray-500 dark:text-gray-400"
                style={{
                  opacity: Math.min(1, Math.max(0, (projectsProgress - 0.1) / 0.16)),
                  transform: `translateY(${(1 - Math.min(1, Math.max(0, (projectsProgress - 0.1) / 0.16))) * 12}px)`,
                }}
              >
                A few projects I&apos;ve designed, built, and shipped.
              </p>
            </div>

            <div
              className="relative"
              style={{
                opacity: Math.min(1, Math.max(0, (projectsProgress - 0.12) / 0.2)),
                transform: `translateY(${(1 - Math.min(1, Math.max(0, (projectsProgress - 0.12) / 0.2))) * 36}px)`,
              }}
            >
              <div
                ref={carouselRef}
                className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1"
              >
                {projects.map((project, index) => {
                  const cardStart = 0.14 + Math.min(index, 5) * 0.04;
                  const cardT = Math.min(
                    1,
                    Math.max(0, (projectsProgress - cardStart) / 0.18)
                  );
                  const cardEase = 1 - Math.pow(1 - cardT, 3);

                  return (
                    <article
                      key={index}
                      className="group snap-center shrink-0 w-[min(88vw,22rem)] sm:w-[min(70vw,24rem)] lg:w-[calc(33.333%-14px)] relative flex flex-col min-h-[340px] sm:min-h-[360px] p-7 sm:p-8 rounded-[1.35rem] border border-gray-200/90 dark:border-gray-800 bg-white/90 dark:bg-gray-950/80 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-gray-400 dark:hover:border-gray-600"
                      style={{
                        opacity: cardEase,
                        transform: `scale(${0.94 + cardEase * 0.06}) translateY(${(1 - cardEase) * 28}px)`,
                      }}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-2 -top-4 text-[5.5rem] sm:text-[6.5rem] font-bold leading-none tabular-nums text-gray-100 dark:text-gray-900/80 select-none transition-transform duration-500 group-hover:scale-105"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="relative z-10 flex flex-col h-full">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
                          Project {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed text-sm sm:text-[0.95rem] line-clamp-4">
                          {project.details}
                        </p>

                        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 leading-relaxed mb-6 font-[family-name:var(--font-geist-mono)]">
                          {project.techStack.split(", ").join(" · ")}
                        </p>

                        <div className="mt-auto flex flex-wrap items-center gap-4">
                          {project.liveLink && (
                            <Link
                              href={project.liveLink}
                              target="_blank"
                              className="group/live inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                            >
                              Live site
                              <AiOutlineArrowRight className="transition-transform group-hover/live:translate-x-0.5 -rotate-45 group-hover/live:rotate-0" />
                            </Link>
                          )}
                          {project.githubLink && project.githubLink !== "#" && (
                            <Link
                              href={project.githubLink}
                              target="_blank"
                              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              <AiFillGithub className="text-base" />
                              Code
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10" />
            </div>

            <div
              className="mt-8 sm:mt-10 flex items-center justify-center gap-6"
              style={{
                opacity: Math.min(1, Math.max(0, (projectsProgress - 0.28) / 0.18)),
                transform: `translateY(${(1 - Math.min(1, Math.max(0, (projectsProgress - 0.28) / 0.18))) * 14}px)`,
              }}
            >
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
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activePage === index
                        ? "w-8 bg-gray-900 dark:bg-white"
                        : "w-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500"
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

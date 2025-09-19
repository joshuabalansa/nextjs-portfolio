"use client"

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin, AiFillGithub, AiOutlineArrowRight } from "react-icons/ai";
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
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaDownload,
} from "react-icons/fa";
import { BsSun, BsMoon, BsFillArrowDownCircleFill, BsStars } from "react-icons/bs";
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
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Portfolio = () => {
  const [theme, setTheme] = useState("light");
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const socialLinksRef = useRef(null);
  const socialIconsRef = useRef([]);
  const techStackRef = useRef(null);
  const techStackTitleRef = useRef(null);
  const techStackItemsRef = useRef([]);
  const projectsRef = useRef(null);
  const projectsTitleRef = useRef(null);
  const projectCardsRef = useRef([]);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null);

  // Framer Motion scroll hooks
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
      setIsAtTop(window.scrollY === 0);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'tech', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
    };

    window.addEventListener("scroll", handleScroll);

    // Enhanced GSAP Animations
    if (typeof window !== "undefined") {
      // Hero section animations
      const heroTimeline = gsap.timeline({ delay: 0.5 });

      gsap.set([heroTitleRef.current, heroSubtitleRef.current, heroDescriptionRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(socialLinksRef.current, {
        opacity: 0,
        y: 30,
      });

      // Stunning hero entrance
      heroTimeline
        .to(heroTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(heroSubtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.8")
        .to(heroDescriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.6")
        .to(socialLinksRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.4");

      // Floating animation for hero elements - REMOVED
      // gsap.to(heroTitleRef.current, {
      //   y: -10,
      //   duration: 3,
      //   ease: "power1.inOut",
      //   yoyo: true,
      //   repeat: -1,
      // });

      // Tech Stack animations
      ScrollTrigger.create({
        trigger: techStackRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(techStackTitleRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.8
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)"
          });

          gsap.fromTo(techStackItemsRef.current, {
            opacity: 0,
            y: 30,
            rotation: 10
          }, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.3,
          });
        }
      });

      // Projects animations
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(projectsTitleRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.8
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)"
          });

          gsap.fromTo(projectCardsRef.current, {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotation: 5
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.15,
            delay: 0.3,
          });
        }
      });

      // Parallax effects
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(heroRef.current, {
            y: self.progress * 100,
            ease: "none",
          });
        }
      });

      // Enhanced hover effects
      techStackItemsRef.current.forEach((item) => {
        if (item) {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.2,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });

      projectCardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              rotationY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              duration: 0.4,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
        }
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const socialLinks = [
    { href: "https://instagram.com/joo.schwa/", Icon: AiFillInstagram },
    {
      href: "https://linkedin.com/in/joshua-balansa-62846a245",
      Icon: AiFillLinkedin,
    },
    { href: "https://github.com/joshuabalansa", Icon: AiFillGithub },
    { href: "mailto:jbalansa143@gmail.com", Icon: FaEnvelope },
  ];

  const techStack = [
    { name: "React", icon: <FaReact />, color: "#61DAFB", category: "Frontend" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#000000", category: "Frontend" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#007ACC", category: "Language" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", category: "Language" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4", category: "Styling" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933", category: "Backend" },
    { name: "Express", icon: <SiExpress />, color: "#000000", category: "Backend" },
    { name: "PHP", icon: <FaPhp />, color: "#8892BF", category: "Backend" },
    { name: "Laravel", icon: <FaLaravel />, color: "#FF2D20", category: "Framework" },
    { name: "Vue.js", icon: <SiVuedotjs />, color: "#4FC08D", category: "Frontend" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", category: "Database" },
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1", category: "Database" },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28", category: "Backend" },
    { name: "Linux", icon: <FaLinux />, color: "#FCC624", category: "System" },
    { name: "Bash", icon: <SiGnubash />, color: "#4EAA25", category: "System" },
  ];

  const projects = [
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
      title: "Ecommerce",
      details:
        "E-commerce.",
      techStack: "Next JS",
      githubLink: "#",
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


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white overflow-x-hidden">
      {/* Static Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "dark" ? <BsSun className="text-yellow-500" /> : <BsMoon className="text-blue-600" />}
              </button>
              <div className="hidden md:flex space-x-6">
                {['home', 'about', 'tech', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize font-medium transition-colors ${
                      activeSection === section
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="https://calendly.com/jbalansa143/30min"
                target="_blank"
                className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  <MdCall />
                  Let&apos;s Talk
                  <AiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            ref={heroTitleRef}
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Hi, I&apos;m Josh! 👋
              </span>
            </h1>
          </motion.div>

          <motion.div
            ref={heroSubtitleRef}
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-4xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
              Full Stack Developer
            </h3>
            <div className="flex items-center justify-center gap-4 text-lg text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <MdLocationOn />
                Philippines
              </span>
              <span className="flex items-center gap-2">
                <FaCode />
                Available for Work
              </span>
            </div>
          </motion.div>

          <motion.div
            ref={heroDescriptionRef}
            className="mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              I craft exceptional digital experiences through innovative web applications,
              combining cutting-edge technology with elegant design to bring your vision to life.
            </p>
          </motion.div>

          <motion.div
            ref={socialLinksRef}
            className="flex justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {socialLinks.map(({ href, Icon }, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  if (el) socialIconsRef.current[index] = el;
                }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="group"
              >
                <Link href={href} target="_blank">
                  <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:bg-white/80 dark:group-hover:bg-gray-800/80 transition-all duration-300">
                    <Icon className="text-3xl text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link
              href="/JoshuaBalansaResume.pdf"
              download
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaDownload className="mr-2" />
              Download Resume
            </Link>
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            >
              View My Work
              <AiOutlineArrowRight className="ml-2" />
            </button>
          </motion.div>

        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate about creating digital solutions that make a difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">My Journey</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  With a passion for technology and innovation, I specialize in creating
                  full-stack web applications that solve real-world problems. My expertise
                  spans from modern frontend frameworks to robust backend systems.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I believe in clean code, user-centered design, and continuous learning.
                  Every project is an opportunity to push boundaries and create something extraordinary.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                  <FaRocket className="text-3xl text-blue-600 mb-2 mx-auto" />
                  <h4 className="font-semibold text-gray-800 dark:text-white">50+</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Projects Completed</p>
                </div>
                <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                  <FaBriefcase className="text-3xl text-purple-600 mb-2 mx-auto" />
                  <h4 className="font-semibold text-gray-800 dark:text-white">4.5+</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Years Experience</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/img-1.jpeg"
                  alt="Joshua Balansa"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FaCode className="text-3xl text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        id="tech"
        ref={techStackRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={techStackTitleRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Tech <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Modern technologies I use to build exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                ref={(el) => {
                  if (el) techStackItemsRef.current[index] = el;
                }}
                className="group p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{tech.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tech.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        ref={projectsRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={projectsTitleRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcasing my latest work and innovative solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  if (el) projectCardsRef.current[index] = el;
                }}
                className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.details}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.split(', ').map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  {project.githubLink && project.githubLink !== "#" ? (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <AiFillGithub />
                      Code
                    </Link>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                      <FaBriefcase />
                      Company Project
                    </span>
                  )}
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      <FaRocket />
                      Live Demo
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        ref={contactRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let&apos;s <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to bring your ideas to life? Let&apos;s create something amazing together.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <MdEmail className="text-3xl text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">jbalansa143@gmail.com</p>
            </div>
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <MdLocationOn className="text-3xl text-emerald-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Location</h3>
              <p className="text-gray-600 dark:text-gray-300">Philippines</p>
            </div>
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <MdWork className="text-3xl text-purple-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Status</h3>
              <p className="text-gray-600 dark:text-gray-300">Available for Work</p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://calendly.com/jbalansa143/30min"
              target="_blank"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MdCall className="mr-2" />
              Schedule a Call
            </Link>
            <Link
              href="mailto:jbalansa143@gmail.com"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            >
              <MdEmail className="mr-2" />
              Send Email
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-700/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-600 dark:text-gray-300">Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-300">by Joshua Balansa</span>
          </motion.div>
          <motion.p
            className="text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            © 2024 All rights reserved. Built with Next.js, TypeScript, and Tailwind CSS.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Portfolio;


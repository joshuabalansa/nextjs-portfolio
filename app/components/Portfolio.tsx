"use client"

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import {
  FaEnvelope,
  FaPhp,
  FaLinux,
  FaReact,
  FaLaravel,
  FaJs,
  FaHeart,
} from "react-icons/fa";
import { BsSun, BsMoon, BsFillArrowDownCircleFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import {
  SiNextdotjs,
  SiTypescript,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiVuedotjs,
  SiGnubash,
} from "react-icons/si";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Portfolio = () => {
  const [theme, setTheme] = useState("light");
  const [isAtTop, setIsAtTop] = useState(true);

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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    // GSAP Animations - SIMPLE & PROFESSIONAL
    if (typeof window !== "undefined") {
      // Hero section - Clean and Professional
      const heroTimeline = gsap.timeline();

      // Initial state for hero elements - Clean fade in
      gsap.set([heroTitleRef.current, heroSubtitleRef.current, heroDescriptionRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(socialLinksRef.current, {
        opacity: 1,
        y: 0,
      });

      // Social icons - no GSAP animations

      // Hero entrance animation - Professional sequence
      heroTimeline
        .to(heroTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(heroSubtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        .to(heroDescriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3")

      // Tech Stack animations - Clean and Professional
      ScrollTrigger.create({
        trigger: techStackRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Title with clean fade in
          gsap.fromTo(techStackTitleRef.current,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            }
          );

          // Tech items with subtle stagger
          gsap.fromTo(techStackItemsRef.current,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
              delay: 0.2,
            }
          );
        }
      });

      // Projects animations - Professional and Clean
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Title with clean fade in
          gsap.fromTo(projectsTitleRef.current,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            }
          );

          // Project cards with subtle stagger
          gsap.fromTo(projectCardsRef.current,
            {
              opacity: 0,
              y: 40
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
              delay: 0.2,
            }
          );

          // Professional hover effect for project cards
          projectCardsRef.current.forEach((card, index) => {
            if (card) {
              card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              });

              card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                  scale: 1,
                  y: 0,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              });
            }
          });
        }
      });

      // Simple Parallax Effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(heroRef.current, {
            y: progress * 50,
            ease: "none",
          });
        }
      });

      // Smooth scroll behavior
      gsap.registerPlugin(ScrollTrigger);

      // Add smooth scrolling to the entire page
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      // Social icons - no animations

      // Professional hover effects for tech stack
      techStackItemsRef.current.forEach((item, index) => {
        if (item) {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.15,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });

      // Professional text reveal animation
      const heroTitleText = heroTitleRef.current?.querySelector('.text-transparent');
      if (heroTitleText) {
        gsap.fromTo(heroTitleText,
          {
            backgroundPosition: "200% center",
            opacity: 0.7
          },
          {
            backgroundPosition: "0% center",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5
          }
        );
      }
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
    { name: "PHP", icon: <FaPhp />, color: "#8892BF" },
    { name: "Linux", icon: <FaLinux />, color: "" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "" },
    { name: "Laravel", icon: <FaLaravel />, color: "#FF2D20" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "Bash", icon: <SiGnubash />, color: "#4EAA25" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#007ACC" },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "Vue.js", icon: <SiVuedotjs />, color: "#DC382D" },
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
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Main Section */}
      <motion.section
        ref={heroRef}
        className="min-h-screen px-4 sm:px-10 md:px-20 lg:px-40 relative"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="py-10 mb-12 flex flex-row items-center justify-between">
          <h1 className="text-xl font-bold">
            <button
              className="text-3xl cursor-pointer hover:scale-125 transition-all"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === "dark" ? <BsSun /> : <BsMoon />}
            </button>
          </h1>
          <Link
            href="https://calendly.com/jbalansa143/30min"
            target="_blank"
            className="relative inline-block px-6 py-3 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-gradient-to-r to-emerald-600 from-sky-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-gradient-to-r from-cyan-500 to-teal-500"></span>
            <span className="relative text-black group-hover:text-white flex justify-center items-center gap-1">
              <MdCall />
              <span>Let&apos;s Talk</span>
            </span>
          </Link>
        </nav>

        <div className="text-start p-5 md:p-20 bg-slate-100 dark:bg-gray-800 rounded-xl">
          <h1 ref={heroTitleRef} className="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-5xl md:text-8xl">
              Hello,
            </span>
            <span className="text-gray-800 dark:text-white"> I&apos;m Josh! {"\u{1F44B}"}</span>
          </h1>
          <h1 ref={heroSubtitleRef} className="mb-4 text-2xl font-extrabold md:text-4xl lg:text-5xl text-gray-800 dark:text-white">
            Full Stack Developer
          </h1>
          <p ref={heroDescriptionRef} className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-10">
            Need a professional website or a powerful web app? I design and
            develop custom web applications tailored to your business needs.
          </p>

          <div
            ref={socialLinksRef}
            className="text-4xl sm:text-5xl flex gap-1 sm:gap-10 py-5 text-gray-600 dark:text-gray-300"
          >
            {socialLinks.map(({ href, Icon }, index) => (
              <Link key={index} href={href}>
                <div
                  ref={(el) => {
                    if (el) socialIconsRef.current[index] = el;
                  }}
                >
                  <Icon className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {isAtTop && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-300 sm:text-3xl md:text-4xl">
            <motion.div
              animate={{
                y: [0, 10, 0],
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="cursor-pointer hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              <BsFillArrowDownCircleFill />
            </motion.div>
          </div>
        )}

        <section ref={techStackRef} className="py-24 dark:bg-gray-900 rounded-lg">
          <h1 ref={techStackTitleRef} className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 md:text-5xl lg:text-6xl dark:text-white sm:text-center text-center sm:mr-10 mr-0">
            Tech Stack
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-14 text-center sm:text-center sm:mr-10 mr-0">
            I Build dynamic, scalable, and user-friendly
            applications with modern technologies.
          </p>

          {/* Tech Stack Section */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-1">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                ref={(el) => {
                  if (el) techStackItemsRef.current[index] = el;
                }}
                whileHover={{ scale: 1.1, color: tech.color }}
                className="flex flex-col items-center"
                transition={{ duration: 0.25 }}
                style={{ color: "inherit" }}
              >
                <div
                  className="text-6xl mb-2 cursor-pointer"
                  style={{ color: "inherit" }}
                >
                  {tech.icon}
                </div>
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.section>

      {/* Projects Section */}
      <section ref={projectsRef} className="px-4 sm:px-10 md:px-20 lg:px-40 py-24 dark:bg-gray-900">
        <motion.h3
          ref={projectsTitleRef}
          className="mb-5 text-4xl font-extrabold text-start text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Recent{" "}
          <span className="rounded text-white bg-gradient-to-r to-emerald-600 from-sky-400 p-1">
            Projects
          </span>
        </motion.h3>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-start mb-10">
          I create custom websites, web apps, and AI-powered integrations that
          drive growth and efficiency.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
    <motion.div
      key={index}
      ref={(el) => {
        if (el) projectCardsRef.current[index] = el;
      }}
      className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 group cursor-pointer p-6"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-sm font-medium mb-2 text-black dark:text-white">
        {project.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
        Tech Stack: {project.techStack}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {project.details}
      </p>
      <div className="flex space-x-4">
        {project.githubLink === "#" ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Company Project
          </span>
        ) : project.githubLink ? (
          <Link
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 text-sm font-medium"
            href={project.githubLink}
          >
            Github
          </Link>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Private Repository
          </span>
        )}
        {project.liveLink && (
          <Link
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 text-sm font-medium"
            href={project.liveLink}
          >
            Live
          </Link>
        )}
      </div>
    </motion.div>
  ))}
        </div>
      </section>
      <footer className="dark:bg-gray-900 light:bg-white dark:text-white light:text-black py-4 text-center p-10">
      <p className="text-lg mt-2 flex items-center justify-center gap-2">
        <span>Made with </span>
        <FaHeart /> By JoshuaB
      </p>
    </footer>
    </div>
  );
};

export default Portfolio;


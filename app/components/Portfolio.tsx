"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
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
  FaBriefcase,
  FaDownload,
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

const Portfolio = () => {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("home");

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      githubLink: "https://github.com/joshuabalansa/KDG",
      liveLink: "",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white overflow-x-hidden">
      {/* Static Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-16">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="absolute left-0 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            >
              {theme === "dark" ? <LuSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}
            </button>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 px-10 text-xs sm:text-sm md:gap-x-6 md:text-base">
              {['home', 'about', 'tech', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium ${
                    activeSection === section
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
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
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-gray-600 dark:text-gray-300">
              Hi, I&apos;m Josh!
            </h1>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl md:text-4xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
              Web Developer
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
          </div>

          <div className="mb-12 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              I craft exceptional digital experiences through innovative web applications,
              combining cutting-edge technology with elegant design to bring your vision to life.
            </p>
          </div>

          <div className="flex justify-center gap-8 mb-12">
            {socialLinks.map(({ href, Icon }, index) => (
              <div key={index} className="group">
                <Link href={href} target="_blank">
                  <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:bg-white/80 dark:group-hover:bg-gray-800/80">
                    <Icon className="text-3xl text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/JoshuaBalansaResume.pdf"
              download
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
            >
              <FaDownload className="mr-2" />
              Download Resume
            </Link>
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
            >
              View My Work
              <AiOutlineArrowRight className="ml-2" />
            </button>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
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
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/img-1.jpeg"
                  alt="Joshua Balansa"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FaCode className="text-3xl text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech"
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Tech <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Modern technologies I use to build exceptional digital experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:group-hover:bg-gray-800/80 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3" style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{tech.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tech.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcasing my latest work and innovative solutions
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200 dark:border-gray-700">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative p-6 border-b border-r border-gray-200 dark:border-gray-700 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                    {project.details}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.split(', ').map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.githubLink && project.githubLink !== "#" ? (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                    >
                      <AiFillGithub />
                      Code
                    </Link>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-sm">
                      <FaBriefcase />
                      Company Project
                    </span>
                  )}
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 text-sm"
                    >
                      <FaRocket />
                      Live Demo
                    </Link>
                  )}
                </div>
                </div>
              </div>
            ))}
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
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let&apos;s <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to bring your ideas to life? Let&apos;s create something amazing together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendly.com/jbalansa143/30min"
              target="_blank"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
            >
              <MdCall className="mr-2" />
              Schedule a Call
            </Link>
            <Link
              href="mailto:jbalansa143@gmail.com"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
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
            <FaHeart className="text-red-500" />
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

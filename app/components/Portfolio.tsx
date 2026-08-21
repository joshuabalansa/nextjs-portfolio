"use client";

import React, { useEffect, useRef, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineArrowRight,
} from "react-icons/ai";
import {
  FaEnvelope,
  FaJs,
  FaLaravel,
  FaLinux,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { LuArrowUp, LuCalendarCheck, LuMapPin, LuMenu, LuX } from "react-icons/lu";
import { MdCall, MdEmail } from "react-icons/md";
import {
  SiExpress,
  SiFirebase,
  SiGnubash,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { HiOutlineServer, HiOutlineSparkles } from "react-icons/hi";
import { BsCodeSlash } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { siteConfig } from "../site.config";

const roles = [
  "Full Stack Developer",
  "React & Next.js Developer",
  "Laravel Developer",
  "Front-end Developer",
];

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

const socialLinks = [
  { href: siteConfig.social.github, Icon: AiFillGithub, label: "GitHub" },
  { href: siteConfig.social.linkedin, Icon: AiFillLinkedin, label: "LinkedIn" },
  { href: siteConfig.social.instagram, Icon: AiFillInstagram, label: "Instagram" },
  { href: `mailto:${siteConfig.email}`, Icon: FaEnvelope, label: "Email" },
];

const techStack = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#A8A29E" },
  { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#A8A29E" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { name: "PHP", icon: FaPhp, color: "#8892BF" },
  { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Linux", icon: FaLinux, color: "#FCC624" },
  { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
];

const skillGroups = [
  {
    title: "Frontend",
    Icon: FiMonitor,
    iconClass: "text-blue-400",
    wrapClass: "from-blue-900/30 to-stone-900/30",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vue.js"],
  },
  {
    title: "Backend",
    Icon: HiOutlineServer,
    iconClass: "text-green-400",
    wrapClass: "from-green-900/30 to-stone-900/30",
    items: ["Node.js", "Express", "NestJS", "PHP", "Laravel"],
  },
  {
    title: "Data & Tools",
    Icon: HiOutlineSparkles,
    iconClass: "text-amber-400",
    wrapClass: "from-amber-900/30 to-stone-900/30",
    items: ["MongoDB", "MySQL", "Firebase", "Linux", "Bash"],
  },
];

const projects = [
  {
    title: "Maison Lumière",
    details:
      "A marketing and operations site for a boutique Airbnb management house in Manila. Investors can explore the method, live portfolio numbers, and book a call; the app also handles unit bookings, guest activity, and an admin dashboard for managed suites.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    githubLink: "",
    liveLink: "https://maison-lumiere-bice.vercel.app/",
    category: "Web App",
    categoryClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    cover: "from-amber-800/70 via-stone-800 to-neutral-950",
    image: "/projects/maison-lumiere.png",
    featured: false,
  },
  {
    title: "Centimo - AI Powered POS",
    details:
      "CENTIMO is a multi-tenant SaaS application that helps retailers run sales, manage inventory, and understand performance. Merchants subscribe monthly to access a touch-friendly POS terminal, product catalog, order history, stock management, and AI-assisted sales insights.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubLink: "",
    liveLink: "https://centimo.app",
    category: "Featured",
    categoryClass: "bg-green-500/10 text-green-400 border-green-500/20",
    cover: "from-emerald-800/60 via-stone-800 to-neutral-950",
    image: "/projects/centimo.png",
    featured: true,
  },
  {
    title: "E-Tinda Farmers Marketplace",
    details:
      "A comprehensive web-based marketplace that connects local farmers directly with buyers, eliminating middlemen and creating an efficient agricultural supply chain.",
    techStack: ["Laravel 12", "JavaScript", "Bootstrap"],
    githubLink: "https://github.com/joshuabalansa/e-tinda-web-marketplace-",
    liveLink: "",
    category: "Marketplace",
    categoryClass: "bg-green-500/10 text-green-400 border-green-500/20",
    cover: "from-lime-900/50 via-stone-800 to-neutral-950",
    image: "/projects/e-tinda.png",
    featured: false,
  },
  {
    title: "Kingdom Development Group Philippines Page",
    details: "A stunning, modern landing page for Kingdom Development Group Philippines.",
    techStack: ["Next.js 14", "Tailwind CSS", "DaisyUI"],
    githubLink: "",
    liveLink: "https://www.kdgphilippines.org/",
    category: "Landing",
    categoryClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cover: "from-sky-900/50 via-stone-800 to-neutral-950",
    image: "/projects/kdg-philippines.png",
    featured: false,
  },
  {
    title: "Talisay Water District",
    details: "Talisay Water District website.",
    techStack: ["Laravel", "Bootstrap", "JavaScript"],
    githubLink: "",
    liveLink: "https://talisaywaterdistrict.gov.ph/",
    category: "Web",
    categoryClass: "bg-stone-500/10 text-stone-300 border-stone-500/20",
    cover: "from-stone-700/60 via-stone-800 to-neutral-950",
    image: "/projects/talisay-water-district.png",
    featured: false,
  },
];

const approachSteps = [
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
];

const stats = [
  { value: projects.length, suffix: "+", label: "Projects" },
  { value: 4.5, suffix: "+", label: "Years Exp", display: "4.5+" },
  { value: techStack.length, suffix: "", label: "Tech Stack" },
  { value: 0, suffix: "", label: "GMT+8", display: "PH" },
];

const stackHighlights = [
  { label: "Front-end", value: "React, Next.js, TypeScript, Tailwind" },
  { label: "Back-end", value: "Laravel, Node.js, Express, REST APIs" },
  { label: "Data", value: "MySQL, MongoDB, Firebase" },
  { label: "Mindset", value: "Ship sharp, iterate fast" },
];

const whatIBring = [
  "End-to-end ownership — from UI details to database design and deployment.",
  "Product-minded delivery: prioritise what matters, cut what doesn’t, keep velocity high.",
  "Clear async communication so remote work stays simple across time zones.",
  "A bias toward maintainable systems — not just a quick demo that breaks next month.",
];

const featuredProject = projects.find((project) => project.featured) ?? projects[0];
const otherProjects = projects.filter((project) => project !== featuredProject);

const contactDetails = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    Icon: MdEmail,
  },
  {
    label: "Location",
    value: `${siteConfig.location} · GMT+8`,
    Icon: LuMapPin,
  },
  {
    label: "Availability",
    value: "Open to freelance & full-time",
    Icon: LuCalendarCheck,
  },
];

function animateCount(el: HTMLElement, target: number, display?: string, suffix = "") {
  if (display) {
    el.textContent = display;
    return;
  }
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = window.setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      window.clearInterval(timer);
    }
    el.textContent = `${current}${suffix}`;
  }, 40);
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const countedRef = useRef(false);
  const blobsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const current = roles[roleIndex];
    let delay = isDeleting ? 40 : 90;
    if (!isDeleting && typedText === current) delay = 2200;
    else if (isDeleting && typedText === "") delay = 400;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && typedText === current) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      } else {
        setTypedText(current.slice(0, typedText.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");

          if (!countedRef.current && entry.target.querySelector("[data-count]")) {
            countedRef.current = true;
            entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
              animateCount(
                el,
                Number(el.dataset.count),
                el.dataset.display,
                el.dataset.suffix ?? ""
              );
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", ...navItems.map((item) => item.id)];

    const handleScroll = () => {
      setNavCompact(window.scrollY > 50);

      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const blobs = blobsRef.current?.querySelectorAll<HTMLElement>(".animate-morph");
      if (!blobs?.length) return;
      const moveX = (event.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (event.clientY - window.innerHeight / 2) * 0.01;
      blobs.forEach((blob, index) => {
        const factor = (index + 1) * 0.5;
        blob.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "1h" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-stone-100 overflow-x-clip">
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
          navCompact ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="text-stone-100 font-medium text-sm"
            >
              joshua<span className="text-stone-500">.dev</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`nav-link text-sm transition-colors ${
                    activeSection === id
                      ? "is-active text-stone-200"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-neutral-950 bg-white hover:bg-stone-100 transition-all duration-300"
              >
                Let&apos;s Talk
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden text-stone-400 hover:text-stone-200 transition-colors"
            >
              <LuMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] glass flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-8 right-8 text-stone-400 hover:text-stone-200"
        >
          <LuX className="w-7 h-7" />
        </button>
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="text-2xl text-stone-300 hover:text-stone-100 transition-colors"
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="text-2xl text-stone-300 hover:text-stone-100 transition-colors"
        >
          Contact
        </button>
      </div>

      <main>
        <section
          id="hero"
          ref={blobsRef}
          aria-label="Introduction"
          className="min-h-dvh flex items-center justify-center relative overflow-hidden grid-pattern"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-stone-800/30 to-stone-900/30 blur-3xl animate-morph" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-900/20 to-stone-900/20 blur-3xl animate-morph"
            style={{ animationDelay: "-5s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 animate-rotate-slow">
            <div className="orbit-ring" />
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10 animate-rotate-slow"
            style={{ animationDirection: "reverse", animationDuration: "20s" }}
          >
            <div className="orbit-ring" />
          </div>

          <div className="particle animate-float" style={{ top: "15%", left: "10%", animationDelay: "-2s" }} />
          <div className="particle animate-float" style={{ top: "25%", right: "15%", animationDelay: "-4s" }} />
          <div className="particle animate-float" style={{ bottom: "30%", left: "20%", animationDelay: "-6s" }} />
          <div className="particle animate-float" style={{ bottom: "20%", right: "25%", animationDelay: "-1s" }} />
          <div className="particle animate-float" style={{ top: "60%", left: "5%", animationDelay: "-3s" }} />
          <div className="particle animate-float" style={{ top: "40%", right: "8%", animationDelay: "-5s" }} />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-up pb-24">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
              <span className="text-white">Josh</span>
              <span className="sr-only">ua Balansa — Full Stack Developer</span>
            </h1>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-8 bg-stone-700" />
              <p className="text-lg md:text-xl text-stone-400 font-light min-h-7">
                {typedText}
                <span className="animate-caret text-stone-500">|</span>
              </p>
              <div className="h-px w-8 bg-stone-700" />
            </div>

            <p className="text-stone-500 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              I design and build clean, fast web applications — polished interfaces,
              reliable back ends. Based in the Philippines, working with clients everywhere.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="group px-8 py-4 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-stone-600 to-stone-700 hover:from-stone-500 hover:to-stone-600 transition-all duration-500 flex items-center gap-3 hover:shadow-lg hover:shadow-stone-800/50"
              >
                View My Work
                <AiOutlineArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 rounded-2xl text-sm font-medium text-stone-400 glass hover:text-stone-200 transition-all duration-500"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex items-center justify-center gap-5 mt-12">
              {socialLinks.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "me noopener noreferrer"}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-stone-500 hover:text-stone-200 transition-all duration-300"
                >
                  <Icon className="text-xl" />
                </Link>
              ))}
            </div>
          </div>

        </section>

        <section id="about" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 reveal lg:sticky lg:top-28 lg:self-start">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
                    <Image
                      src="/img-about.png"
                      alt="Joshua Balansa, full stack developer based in the Philippines"
                      fill
                      sizes="(max-width: 1024px) 24rem, 40vw"
                      priority
                      className="object-cover object-center"
                    />
                  </div>
                  <div
                    className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 animate-float"
                    style={{ animationDuration: "6s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-900/40 to-stone-800/40 flex items-center justify-center">
                        <BsCodeSlash className="text-amber-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-stone-100">4.5+</p>
                        <p className="text-xs text-stone-500">Years Coding</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 border border-stone-800 rounded-3xl -z-10" />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-14">
                <div className="reveal stagger-1">
                  <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-stone-400 font-medium uppercase tracking-[0.2em]">
                      Open to freelance & full-time
                    </span>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 mb-4 block">
                    About Me
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
                    I take products from
                    <br />
                    <span className="gradient-text">idea to launch</span>
                  </h2>
                  <p className="text-stone-400 font-light leading-relaxed text-lg mb-6">
                    I&apos;m a full-stack developer who works across the stack — React and
                    Next.js on the front-end, Laravel and Node.js on the back-end — with a
                    focus on speed, clarity, and craft.
                  </p>
                  <p className="text-stone-500 font-light leading-relaxed">
                    I care about clean code, thoughtful design, and shipping things people
                    actually use. Based in the Philippines, collaborating with clients worldwide.
                  </p>
                </div>

                <div className="reveal stagger-2">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 mb-6">
                    How I work
                  </p>
                  <div className="space-y-6">
                    {approachSteps.map((item) => (
                      <div key={item.step} className="flex gap-5">
                        <span className="shrink-0 text-sm font-semibold tabular-nums text-stone-600 pt-0.5">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-semibold text-stone-100 mb-1.5">{item.title}</h3>
                          <p className="text-stone-400 font-light leading-relaxed">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <dl className="reveal stagger-3 divide-y divide-neutral-800/80 border-y border-neutral-800/80">
                  {stackHighlights.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4"
                    >
                      <dt className="sm:w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-stone-500">
                        {label}
                      </dt>
                      <dd className="text-stone-200 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="reveal stagger-4">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 mb-6">
                    What I bring
                  </p>
                  <ul className="space-y-4">
                    {whatIBring.map((item) => (
                      <li key={item} className="flex gap-3 text-stone-400 font-light leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-100"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 reveal stagger-5">
                  {stats.map((stat) => (
                    <div key={stat.label} className="glass rounded-2xl p-5 text-center card-shine">
                      <p
                        className="text-3xl font-bold text-stone-100 mb-1"
                        data-count={stat.value}
                        data-suffix={stat.suffix}
                        data-display={stat.display}
                      >
                        {stat.display ?? "0"}
                      </p>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="reveal">
                  <p className="text-stone-400 font-light leading-relaxed mb-8">
                    Whether you need a polished landing experience, a full product build, or
                    help tightening an existing codebase — I&apos;m ready to jump in and ship.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToSection("contact")}
                    className="group inline-flex items-center text-sm font-medium text-stone-100 hover:text-stone-300 transition-colors"
                  >
                    Let&apos;s work together
                    <AiOutlineArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-32 px-6 relative">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 mb-4 block reveal">
                Tech Stack
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight reveal stagger-1">
                Tools I <span className="gradient-text">work with</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillGroups.map((group, index) => (
                <div
                  key={group.title}
                  className={`glass rounded-3xl p-8 hover-lift card-shine reveal stagger-${index + 1} ${
                    index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.wrapClass} flex items-center justify-center mb-6`}
                  >
                    <group.Icon className={`${group.iconClass} text-[28px]`} />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-100 tracking-tight mb-5">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg text-sm bg-neutral-800/80 text-stone-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 reveal stagger-4">
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
                {techStack.map(({ name, icon: Icon, color }) => (
                  <span key={name} title={name} style={{ color }}>
                    <Icon className="text-4xl" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 mb-4 block reveal">
                Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight reveal stagger-1">
                Featured <span className="gradient-text">projects</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-2 reveal stagger-1">
                <article className="glass rounded-3xl overflow-hidden hover-lift card-shine">
                  <div className="grid lg:grid-cols-2">
                    <div className={`project-cover aspect-video lg:aspect-auto min-h-[260px] bg-gradient-to-br ${featuredProject.cover}${featuredProject.image ? " has-image" : ""}`}>
                      {featuredProject.image ? (
                        <Image
                          src={featuredProject.image}
                          alt={`${featuredProject.title} screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top"
                        />
                      ) : null}
                      <div className="absolute inset-0 z-[2] flex items-end p-8">
                        <p className="relative z-10 text-5xl font-bold tracking-tighter text-white/20">
                          01
                        </p>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${featuredProject.categoryClass}`}
                        >
                          {featuredProject.category}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-stone-100 tracking-tight mb-4">
                        {featuredProject.title}
                      </h3>
                      <p className="text-stone-400 font-light leading-relaxed mb-6">
                        {featuredProject.details}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {featuredProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg text-xs bg-neutral-800/80 text-stone-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        {featuredProject.liveLink ? (
                          <Link
                            href={featuredProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex items-center gap-2 text-sm text-stone-300 hover:text-stone-100 transition-colors"
                          >
                            Live Demo
                            <AiOutlineArrowRight className="-rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              {otherProjects.map((project, index) => (
                <div key={project.title} className={`reveal stagger-${Math.min(index + 2, 5)}`}>
                  <article className="glass rounded-3xl overflow-hidden hover-lift card-shine h-full flex flex-col">
                    <div className={`project-cover aspect-video bg-gradient-to-br ${project.cover}${project.image ? " has-image" : ""}`}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-top"
                        />
                      ) : null}
                      <div className="absolute inset-0 z-[2] flex items-end p-6">
                        <p className="relative z-10 text-4xl font-bold tracking-tighter text-white/20">
                          {String(index + 2).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${project.categoryClass}`}
                        >
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-stone-100 tracking-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-stone-400 font-light text-sm leading-relaxed mb-6 flex-1">
                        {project.details}
                      </p>
                      {project.techStack.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg text-xs bg-neutral-800/80 text-stone-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <div className="flex items-center gap-4">
                        {project.liveLink ? (
                          <Link
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex items-center gap-2 text-sm text-stone-300 hover:text-stone-100 transition-colors"
                          >
                            Live Demo
                            <AiOutlineArrowRight className="-rotate-45 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                        ) : null}
                        {project.githubLink ? (
                          <Link
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex items-center gap-2 text-sm text-stone-500 hover:text-stone-300 transition-colors"
                          >
                            {project.liveLink ? "Code" : "Source Code"}
                            <AiFillGithub />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center reveal">
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="me noopener noreferrer"
                className="group glass hover-lift rounded-2xl px-8 py-5 flex items-center gap-4 text-stone-300 hover:text-stone-100 transition-colors"
              >
                <span className="w-12 h-12 rounded-xl bg-neutral-800/80 flex items-center justify-center text-stone-200 group-hover:text-white transition-colors">
                  <AiFillGithub className="text-2xl" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-medium text-stone-100">
                    Check GitHub for more projects
                  </span>
                  <span className="block text-xs text-stone-500 mt-0.5">
                    github.com/joshuabalansa
                  </span>
                </span>
                <AiOutlineArrowRight className="-rotate-45 text-stone-500 group-hover:text-stone-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-6 relative">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="reveal">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 mb-4 block">
                Contact
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Let&apos;s build
                <br />
                <span className="gradient-text">something great</span>
              </h2>
              <p className="text-stone-400 font-light leading-relaxed max-w-xl mx-auto mb-14">
                Have a project in mind? Tell me about it — freelance, product builds, or
                full-time opportunities.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 mb-12 reveal stagger-1">
              {contactDetails.map(({ label, value, href, Icon }) => {
                const content = (
                  <>
                    <Icon className="text-[22px] text-stone-400 mx-auto mb-4 group-hover:text-amber-400 transition-colors" />
                    <p className="text-xs text-stone-600 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-stone-200 text-sm break-all">{value}</p>
                  </>
                );

                return href ? (
                  <Link key={label} href={href} className="group">
                    {content}
                  </Link>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal stagger-2">
              <button
                type="button"
                data-cal-namespace="1h"
                data-cal-link="joshua-balansa-iulx9o/1h"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-medium text-neutral-950 bg-white hover:bg-stone-100 transition-all duration-300"
              >
                <MdCall />
                Schedule a call
              </button>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-medium text-stone-400 glass hover:text-stone-200 transition-all duration-300"
              >
                <MdEmail />
                Send an email
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 px-6 border-t border-neutral-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-stone-400 text-sm">
                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "me noopener noreferrer"}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-600 hover:text-stone-300 transition-colors"
                >
                  <Icon className="text-xl" />
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              aria-label="Back to top"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-stone-500 hover:text-stone-200 transition-all duration-300 hover:-translate-y-1"
            >
              <LuArrowUp className="w-5 h-5" />
            </button>
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

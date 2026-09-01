"use client";

import React, { useEffect, useRef, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineArrowRight,
} from "react-icons/ai";
import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaHeart,
  FaLaravel,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { LuFlaskConical, LuTestTube } from "react-icons/lu";
import { MdCall, MdEmail, MdOutlineApi } from "react-icons/md";
import {
  SiBootstrap,
  SiCss3,
  SiCypress,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGnubash,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostman,
  SiRedis,
  SiSocketdotio,
  SiSupabase,
  SiSwagger,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVercel,
  SiVitest,
  SiVuedotjs,
} from "react-icons/si";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
import { cn } from "@/lib/utils";
import { siteConfig } from "../site.config";

const ShaderBackground = dynamic(
  () =>
    import("@/components/ui/waves-shaders-homlu-ui").then(
      (mod) => mod.ShaderBackground
    ),
  { ssr: false }
);

const SplashCursor = dynamic(() => import("./SplashCursor"), { ssr: false });

const heroStack = ["React", "Next.js", "Laravel", "Node.js"];

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

const skillTabs = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces, component systems, and client-side architecture.",
  },
  {
    id: "backend",
    label: "Backend",
    description: "Servers, application logic, and the service layer.",
  },
  {
    id: "apis",
    label: "APIs",
    description: "Contracts, auth, and how services talk to each other.",
  },
  {
    id: "data",
    label: "Data",
    description: "Persistence, realtime, and the stores behind the product.",
  },
  {
    id: "devops",
    label: "DevOps",
    description: "Shipping, hosting, and keeping environments healthy.",
  },
  {
    id: "testing",
    label: "Testing",
    description: "Unit, integration, and end-to-end confidence before production.",
  },
] as const;

type SkillTabId = (typeof skillTabs)[number]["id"];

type Skill = {
  name: string;
  icon: IconType;
  color: string;
  category: SkillTabId;
};

const skills: Skill[] = [
  { name: "React", icon: FaReact, color: "#61DAFB", category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#A8A29E", category: "frontend" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "frontend" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", category: "frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", category: "frontend" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "backend" },
  { name: "Express", icon: SiExpress, color: "#A8A29E", category: "backend" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E", category: "backend" },
  { name: "PHP", icon: FaPhp, color: "#777BB4", category: "backend" },
  { name: "Laravel", icon: FaLaravel, color: "#FF2D20", category: "backend" },
  { name: "REST", icon: MdOutlineApi, color: "#F59E0B", category: "apis" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", category: "apis" },
  { name: "WebSockets", icon: SiSocketdotio, color: "#A8A29E", category: "apis" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#FB015B", category: "apis" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37", category: "apis" },
  { name: "OpenAPI", icon: SiSwagger, color: "#85EA2D", category: "apis" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "data" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "data" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "data" },
  { name: "SQLite", icon: SiSqlite, color: "#003B57", category: "data" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", category: "data" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", category: "data" },
  { name: "Redis", icon: SiRedis, color: "#DC382D", category: "data" },
  { name: "Git", icon: SiGit, color: "#F05032", category: "devops" },
  { name: "GitHub", icon: SiGithub, color: "#A8A29E", category: "devops" },
  { name: "Linux", icon: SiLinux, color: "#FCC624", category: "devops" },
  { name: "Bash", icon: SiGnubash, color: "#4EAA25", category: "devops" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", category: "devops" },
  { name: "Vercel", icon: SiVercel, color: "#A8A29E", category: "devops" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF", category: "devops" },
  { name: "Nginx", icon: SiNginx, color: "#009639", category: "devops" },
  { name: "Jest", icon: SiJest, color: "#C21325", category: "testing" },
  { name: "Vitest", icon: SiVitest, color: "#729B1B", category: "testing" },
  { name: "Playwright", icon: LuTestTube, color: "#2EAD33", category: "testing" },
  { name: "Cypress", icon: SiCypress, color: "#69D3A7", category: "testing" },
  { name: "PHPUnit", icon: LuFlaskConical, color: "#3B82F6", category: "testing" },
  { name: "Testing Library", icon: SiTestinglibrary, color: "#E33332", category: "testing" },
];

function SkillTile({ name, icon: Icon, color }: Skill) {
  return (
    <div className="group flex min-w-0 items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/5 bg-neutral-900/40 px-2.5 py-2.5 sm:px-4 sm:py-3.5 transition-colors duration-300 hover:border-white/10 hover:bg-neutral-800/50">
      <Icon
        className="text-xl sm:text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
        aria-hidden
      />
      <span className="truncate text-xs sm:text-sm text-stone-300 transition-colors group-hover:text-stone-100">
        {name}
      </span>
    </div>
  );
}

const projects = [
  {
    title: "Maison Lumière",
    details:
      "A marketing and operations site for a boutique Airbnb management house in Manila. Investors can explore the method, live portfolio numbers, and book a call; the app also handles unit bookings, guest activity, and an admin dashboard for managed suites.",
    githubLink: "",
    liveLink: "https://maison-lumiere-bice.vercel.app/",
    category: "Web App",
    categoryClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cover: "from-blue-900/70 via-stone-800 to-neutral-950",
    image: "/projects/maison-lumiere.png",
    featured: false,
  },
  {
    title: "Centimo - AI Powered POS",
    details:
      "CENTIMO is a multi-tenant SaaS application that helps retailers run sales, manage inventory, and understand performance. Merchants subscribe monthly to access a touch-friendly POS terminal, product catalog, order history, stock management, and AI-assisted sales insights.",
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
  { value: 15, suffix: "+", label: "Projects" },
  { value: 5, suffix: "+", label: "Years Exp", display: "5+" },
  { value: skills.length, suffix: "", label: "Tech Stack" },
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

function getSkillTrackMetrics(track: HTMLElement) {
  const top = window.scrollY + track.getBoundingClientRect().top;
  const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
  return { top, scrollable };
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [navCompact, setNavCompact] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState<SkillTabId>("frontend");
  const countedRef = useRef(false);
  const skillTabRefs = useRef<Partial<Record<SkillTabId, HTMLButtonElement | null>>>({});
  const skillsTrackRef = useRef<HTMLDivElement>(null);
  const skillScrollLockRef = useRef(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let ticking = false;
    let compact = false;
    let skillTop = 0;
    let skillScrollable = 1;

    const cacheSkillMetrics = () => {
      const track = skillsTrackRef.current;
      if (!track) return;
      skillTop = window.scrollY + track.getBoundingClientRect().top;
      skillScrollable = Math.max(1, track.offsetHeight - window.innerHeight);
    };

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const nextCompact = y > 50;
      if (nextCompact !== compact) {
        compact = nextCompact;
        setNavCompact(nextCompact);
      }

      const scrollPosition = y + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection((current) => (current === id ? current : id));
          break;
        }
      }

      const track = skillsTrackRef.current;
      if (!track || skillScrollLockRef.current || prefersReducedMotion.matches) return;
      if (mobileQuery.matches) return;
      if (y + window.innerHeight < skillTop || y > skillTop + track.offsetHeight) return;

      const progress = Math.min(1, Math.max(0, (y - skillTop) / skillScrollable));
      const nextId = skillTabs[Math.min(skillTabs.length - 1, Math.floor(progress * skillTabs.length))].id;
      setActiveSkillTab((current) => (current === nextId ? current : nextId));
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const unlockSkillScroll = () => {
      skillScrollLockRef.current = false;
    };

    cacheSkillMetrics();
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", cacheSkillMetrics, { passive: true });
    window.addEventListener("wheel", unlockSkillScroll, { passive: true });
    window.addEventListener("touchmove", unlockSkillScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", cacheSkillMetrics);
      window.removeEventListener("wheel", unlockSkillScroll);
      window.removeEventListener("touchmove", unlockSkillScroll);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadCal = async () => {
      if (cancelled) return;
      const cal = await getCalApi({ namespace: "1h" });
      if (cancelled) return;
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(loadCal, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const timer = window.setTimeout(loadCal, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const activeSkillGroup =
    skillTabs.find((tab) => tab.id === activeSkillTab) ?? skillTabs[0];
  const visibleSkills = skills.filter((skill) => skill.category === activeSkillTab);

  const scrollToSkillTab = (tabId: SkillTabId) => {
    setActiveSkillTab(tabId);
    const track = skillsTrackRef.current;
    if (
      !track ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    const index = skillTabs.findIndex((tab) => tab.id === tabId);
    const { top, scrollable } = getSkillTrackMetrics(track);
    const y = top + ((index + 0.4) / skillTabs.length) * scrollable;
    skillScrollLockRef.current = true;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const focusSkillTab = (tabId: SkillTabId) => {
    scrollToSkillTab(tabId);
    skillTabRefs.current[tabId]?.focus();
  };

  const handleSkillTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = skillTabs.findIndex((tab) => tab.id === activeSkillTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % skillTabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + skillTabs.length) % skillTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = skillTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    focusSkillTab(skillTabs[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 overflow-x-clip">
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR="#4487ff"
        BACK_COLOR={{ r: 0.04, g: 0.04, b: 0.04 }}
        TRANSPARENT
      />
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 px-6 transform-gpu transition-[padding] duration-500 ${
          navCompact ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-2xl overflow-hidden transform-gpu transition-[background,backdrop-filter,border-color,color] duration-500 ${
              navCompact ? "glass" : "border border-transparent bg-transparent"
            }`}
          >
            <div className="flex items-center justify-center gap-5 px-5 py-3.5 sm:gap-7 sm:px-6 sm:py-4 md:gap-10">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`nav-link text-sm font-medium sm:text-base transition-colors duration-500 ${
                    navCompact
                      ? activeSection === id
                        ? "is-active text-stone-200"
                        : "text-stone-400 hover:text-stone-200"
                      : activeSection === id
                        ? "is-active text-neutral-950"
                        : "text-neutral-950/70 hover:text-neutral-950"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section
          id="hero"
          aria-label="Introduction"
          className="min-h-dvh flex items-center relative overflow-hidden bg-neutral-950 contain-paint"
        >
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <ShaderBackground className="absolute inset-0 h-full w-full pointer-events-none" />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-neutral-950/25" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[3]" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-24">
            <div className="w-full mx-auto text-center">
                <h1 className="hero-name font-bold text-white animate-fade-up hero-delay-1 mb-8 whitespace-nowrap">
                  Joshua Balansa
                </h1>

                <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up hero-delay-2">
                  <div className="h-px w-10 bg-white/40" />
                  <p className="font-mono text-sm md:text-base text-stone-100 tracking-wide">
                    Full-stack developer
                  </p>
                  <div className="h-px w-10 bg-white/40" />
                </div>

                <p className="text-stone-200 font-normal text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8 animate-fade-up hero-delay-3">
                  I design and ship clean, fast web products — interfaces with craft,
                  backends that hold up. Based in the Philippines, working with clients worldwide.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-10 animate-fade-up hero-delay-3">
                  {heroStack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs tracking-wide border border-white/15 bg-neutral-950/40 text-stone-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up hero-delay-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection("projects")}
                    className="group inline-flex items-center justify-center gap-3 w-full sm:w-52 h-14 rounded-2xl text-sm font-medium text-neutral-950 bg-white hover:bg-stone-100 transition-all duration-300"
                  >
                    View My Work
                    <AiOutlineArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center justify-center w-full sm:w-52 h-14 rounded-2xl text-sm font-medium text-stone-100 glass hover:text-white transition-all duration-500"
                  >
                    Get In Touch
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 mt-10 animate-fade-up hero-delay-5">
                  {socialLinks.map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "me noopener noreferrer"}
                      aria-label={label}
                      className="w-11 h-11 rounded-xl glass flex items-center justify-center text-stone-200 hover:text-white hover:border-white/20 transition-all duration-300"
                    >
                      <Icon className="text-xl" />
                    </Link>
                  ))}
                </div>
            </div>
          </div>
        </section>

        <div className="relative bg-[#0a0a0a]">
        <section id="about" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 reveal lg:sticky lg:top-28 lg:self-start">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src="/josh-about-sticker.png"
                      alt="Joshua Balansa, full stack developer based in the Philippines"
                      fill
                      sizes="(max-width: 1024px) 24rem, 40vw"
                      className="object-contain object-center about-sticker"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-14">
                <div className="reveal stagger-1">
                  <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
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
                  <p className="text-stone-400 font-light leading-relaxed text-lg">
                    I&apos;m a full-stack developer who works across the stack — React and
                    Next.js on the front-end, Laravel and Node.js on the back-end — with a
                    focus on speed, clarity, and craft.
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

        <section id="skills" className="relative">
          <div
            ref={skillsTrackRef}
            className="skills-pin-track relative"
            style={{ "--skill-tab-count": skillTabs.length } as React.CSSProperties}
          >
            <div className="skills-pin-inner relative z-20 flex h-auto flex-col bg-[#0a0a0a] px-4 pb-10 pt-20 md:sticky md:top-0 md:h-dvh md:px-6 md:pb-8 md:pt-28">
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
              <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col">
                <div className="mb-4 shrink-0 text-center md:mb-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight reveal stagger-1">
                    Tools I <span className="gradient-text">work with</span>
                  </h2>
                  <p className="mt-3 md:mt-4 text-sm md:text-base text-stone-500 font-light leading-relaxed max-w-xl mx-auto reveal stagger-2">
                    The web engineering toolkit — from the interface to APIs, data, testing, and deploy.
                  </p>
                </div>

                <div className="flex min-h-0 flex-1 flex-col md:justify-center reveal stagger-3">
                  <div className="mb-4 flex shrink-0 justify-center md:mb-6">
                    <div
                      role="tablist"
                      aria-label="Skill categories"
                      onKeyDown={handleSkillTabKeyDown}
                      className="glass rounded-2xl p-1.5 flex flex-wrap justify-center gap-1 w-full md:w-auto"
                    >
                      {skillTabs.map((tab) => {
                        const isActive = activeSkillTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            id={`skill-tab-${tab.id}`}
                            aria-selected={isActive}
                            aria-controls={`skill-panel-${tab.id}`}
                            tabIndex={isActive ? 0 : -1}
                            ref={(node) => {
                              skillTabRefs.current[tab.id] = node;
                            }}
                            onClick={() => scrollToSkillTab(tab.id)}
                            className={`shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
                              isActive
                                ? "bg-white text-neutral-950"
                                : "text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    id={`skill-panel-${activeSkillGroup.id}`}
                    role="tabpanel"
                    aria-labelledby={`skill-tab-${activeSkillGroup.id}`}
                    className="glass card-shine shrink-0 overflow-visible rounded-2xl p-4 sm:rounded-3xl sm:p-8 md:p-8 lg:p-10"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3 mb-5 md:mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-stone-100 tracking-tight">
                          {activeSkillGroup.label}
                        </h3>
                        <p className="text-sm md:text-base text-stone-500 font-light mt-1.5 md:mt-2 max-w-xl">
                          {activeSkillGroup.description}
                        </p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-600">
                        {visibleSkills.length} tools
                      </p>
                    </div>
                    <div
                      key={activeSkillGroup.id}
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 animate-fade-in"
                    >
                      {visibleSkills.map((skill) => (
                        <SkillTile key={skill.name} {...skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section-cv relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="pt-32 pb-8 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight reveal stagger-1">
                Featured <span className="gradient-text">projects</span>
              </h2>
              <p className="mt-3 md:mt-4 text-sm md:text-base text-stone-500 font-light leading-relaxed max-w-xl mx-auto reveal stagger-2">
                A selection of products and sites I&apos;ve built — scroll to stack
                through each one.
              </p>
            </div>

            <StackingCards totalCards={projects.length} className="reveal">
              <div className="relative z-10 flex h-[40vh] min-h-[240px] items-end justify-center pb-6">
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-stone-600">
                  Scroll to explore ↓
                </p>
              </div>

              {projects.map((project, index) => (
                <StackingCardItem
                  key={project.title}
                  index={index}
                  className="h-[85vh] min-h-[620px]"
                >
                  <article
                    className={cn(
                      "mx-auto flex h-[75%] w-11/12 max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 shadow-2xl shadow-black/40 backdrop-blur-sm lg:flex-row",
                      project.featured && "ring-1 ring-blue-500/20"
                    )}
                  >
                    <div className="relative flex flex-1 flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:max-w-[46%]">
                      <span
                        className={cn(
                          "mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium",
                          project.categoryClass
                        )}
                      >
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight text-stone-50 sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-sm font-light leading-relaxed text-stone-400 sm:text-base">
                        {project.details}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {project.liveLink ? (
                          <Link
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-stone-100 transition-colors hover:bg-white/20 sm:text-sm"
                          >
                            Live Demo
                            <AiOutlineArrowRight className="-rotate-45 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </Link>
                        ) : null}
                        {project.githubLink ? (
                          <Link
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 text-xs text-stone-300 transition-colors hover:text-stone-100 sm:text-sm"
                          >
                            {project.liveLink ? "Code" : "Source"}
                            <AiFillGithub className="text-base" />
                          </Link>
                        ) : null}
                      </div>
                    </div>

                    <div className="relative min-h-[220px] flex-1 overflow-hidden border-t border-white/5 lg:min-h-0 lg:border-l lg:border-t-0">
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br",
                          project.cover
                        )}
                        aria-hidden
                      />
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 54vw"
                          className="object-contain object-center p-4 sm:p-6"
                        />
                      ) : null}
                    </div>
                  </article>
                </StackingCardItem>
              ))}
            </StackingCards>

            <div className="py-24 flex justify-center reveal">
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

        <section id="contact" className="section-cv py-32 px-6 relative">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="reveal">
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal stagger-1">
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
        </div>
      </main>

      <footer className="section-cv py-16 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-stone-400 text-sm">
            Built with <FaHeart className="text-blue-500" aria-hidden /> by Josh
          </span>
        </div>
      </footer>

      <Script id="chatbase-script" strategy="lazyOnload">
        {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="${process.env.NEXT_PUBLIC_CHATBOT_ID}";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
      </Script>
    </div>
  );
};

export default Portfolio;

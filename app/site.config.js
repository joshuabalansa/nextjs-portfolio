const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://balansajoshua.vercel.app";

export const siteConfig = {
  name: "Joshua Balansa",
  shortName: "Josh",
  title: "Joshua Balansa | Full Stack Developer",
  description:
    "Joshua Balansa is a full stack developer based in the Philippines. I build clean, fast web apps with React, Next.js, Laravel, and Node.js — from idea to launch for clients worldwide.",
  url: siteUrl,
  locale: "en_US",
  email: "jbalansa143@gmail.com",
  location: "Philippines",
  jobTitle: "Full Stack Developer",
  keywords: [
    "Joshua Balansa",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Node.js Developer",
    "Philippines Developer",
    "Freelance Web Developer",
    "TypeScript",
    "Web Application Development",
  ],
  social: {
    github: "https://github.com/joshuabalansa",
    linkedin: "https://linkedin.com/in/joshua-balansa-62846a245",
    instagram: "https://instagram.com/joo.schwa/",
  },
  ogImage: "/img-1.jpeg",
};

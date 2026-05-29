import { FaReact, FaGitAlt, FaGithub, FaLinkedin, FaStackOverflow, FaHtml5, FaCss3Alt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiJavascript,
  SiBootstrap,
  SiJquery,
  SiVite,
  SiFramer,
  SiRedux,
  SiSass,
  SiWebpack,
  SiJest,
  SiVercel,
  SiStorybook,
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

// ── Personal Info ─────────────────────────────────────────────
export const PERSON = {
  name: "Abdallah Mohamed Gomaa",
  role: "Frontend Developer",
  tagline: "I craft pixel-perfect, high-performance digital experiences.",
  location: "Cairo, Egypt",
  email: "abdullah.gomaa.dev@gmail.com",
  available: true,
  // Rotating roles for the typing animation in Hero
  roles: ["Frontend Developer", "React Developer", "UI/UX Designer", "Web Designer", "Freelance Developer"],
};

// ── Social Links ──────────────────────────────────────────────
export const SOCIALS = [
  { name: "GitHub", url: "https://github.com/Gomaa404", icon: FaGithub },
  { name: "LinkedIn", url: "https://linkedin.com/in/gomaa404", icon: FaLinkedin },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/27645986/abdallhagomaa", icon: FaStackOverflow },
  { name: "Email", url: "mailto:abdullah.gomaa.dev@gmail.com", icon: MdEmail },
];

// ── Stats (Hero section) ──────────────────────────────────────
export const STATS = [
  { value: "2+", label: "Years Exp." },
  { value: "10+", label: "Projects" },
  { value: "5+", label: "Clients" },
  { value: "99%", label: "Satisfaction" },
];

// ── Skills ────────────────────────────────────────────────────
export const SKILLS = [
  { name: "HTML5", icon: FaHtml5, color: "#e34f26", level: 95 },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572b6", level: 90 },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", level: 92 },
  { name: "jQuery", icon: SiJquery, color: "#0769ad", level: 85 },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3", level: 88 },
  { name: "React", icon: FaReact, color: "#61dafb", level: 95 },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 88 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", level: 85 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38bdf8", level: 92 },
  { name: "Figma", icon: SiFigma, color: "#f24e1e", level: 85 },
  { name: "Git", icon: FaGitAlt, color: "#f05032", level: 92 },
  { name: "Vite", icon: SiVite, color: "#646cff", level: 90 },
  { name: "Redux", icon: SiRedux, color: "#764abc", level: 85 },
  { name: "Sass", icon: SiSass, color: "#cc6699", level: 88 },
  { name: "Vercel", icon: SiVercel, color: "#ffffff", level: 90 },
];

// ── Experience Timeline ───────────────────────────────────────
export const EXPERIENCE = [
  {
    title: "Freelance Frontend Developer",
    company: "Self-Employed",
    period: "2025 – Present",
    desc: "Building high-performance web applications for clients worldwide. Specialising in React, Next.js, and modern frontend tooling.",
  },
  {
    title: "Frontend Developer Intern",
    company: "Internship",
    period: "2024 – 2025",
    desc: "Contributed to production React codebases, implemented UI components, and collaborated with senior engineers on agile teams.",
  },
  {
    title: "Frontend Developer",
    company: "Self-Learning & Projects",
    period: "2022 – 2024",
    desc: "Mastered modern frontend technologies through hands-on projects — React, TypeScript, Tailwind CSS, and performance optimisation.",
  },
];

// ── Projects ──────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce App",
    desc: "Full-featured e-commerce storefront built with TypeScript and Next.js. Includes product pages, cart, and a clean checkout flow — deployed on Vercel.",
    image: "/screenshots/ecommerce.png",
    tags: ["TypeScript", "Next.js", "Vercel"],
    demo: "https://e-commerce-gamma-pearl-64.vercel.app",
    github: "https://github.com/Gomaa404/e-commerce",
    featured: true,
    color: "#7c3aed",
  },
  {
    id: 2,
    title: "LinkedIn-Style Post Feed",
    desc: "A social feed UI inspired by LinkedIn — includes post creation, like/comment interactions, and a responsive layout. Live on Vercel.",
    image: "/screenshots/linkedin-post.png",
    tags: ["React", "JavaScript", "CSS"],
    demo: "https://linked-post-seven.vercel.app",
    github: "https://github.com/Gomaa404/linked-Post",
    featured: true,
    color: "#0891b2",
  },
  {
    id: 3,
    title: "Mealify Landing Page",
    desc: "A polished restaurant landing page built with pure HTML & CSS. Features smooth sections, responsive design, and a modern food-focused layout.",
    image: "/screenshots/mealify.png",
    tags: ["HTML", "CSS"],
    demo: "https://gomaa404.github.io/Mealify-page/",
    github: "https://github.com/Gomaa404/Mealify-page",
    featured: true,
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "CRUD Dashboard",
    desc: "A JavaScript CRUD application with full create, read, update, and delete operations. Clean UI with local state management.",
    image: "/screenshots/cruds.png",
    tags: ["JavaScript", "HTML", "CSS"],
    demo: "https://gomaa404.github.io/cruds/",
    github: "https://github.com/Gomaa404/cruds",
    color: "#0891b2",
  },
  {
    id: 5,
    title: "Fokir Portfolio Template",
    desc: "A responsive personal portfolio template built with CSS and HTML showcasing skills, portfolio, and contact sections.",
    image: "/screenshots/fokir.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    demo: "https://gomaa404.github.io/fokir/",
    github: "https://github.com/Gomaa404/fokir",
    color: "#7c3aed",
  },
  {
    id: 6,
    title: "DevFolio Template",
    desc: "A developer-focused portfolio HTML template with sections for projects, skills, and contact — built to be clean and professional.",
    image: "/screenshots/devfolio.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    demo: "https://gomaa404.github.io/DevFolio/",
    github: "https://github.com/Gomaa404/DevFolio",
    color: "#10b981",
  },
  {
    id: 7,
    title: "Bookmark Manager",
    desc: "A browser-based bookmark manager with add, delete, and visit functionality. Built in vanilla JavaScript with local storage persistence.",
    image: "/screenshots/bookmark.png",
    tags: ["JavaScript", "HTML", "CSS"],
    demo: "https://gomaa404.github.io/Bookmark-/",
    github: "https://github.com/Gomaa404/Bookmark-",
    color: "#f43f5e",
  },
  {
    id: 8,
    title: "HTML & CSS Template One",
    desc: "A complete multi-section landing page template built with semantic HTML and modern CSS — fully responsive and pixel-perfect.",
    image: "/screenshots/html-template.png",
    tags: ["HTML", "CSS"],
    demo: "https://gomaa404.github.io/HTML_And_CSS_Template_One-/",
    github: "https://github.com/Gomaa404/HTML_And_CSS_Template_One-",
    color: "#8b5cf6",
  },
];

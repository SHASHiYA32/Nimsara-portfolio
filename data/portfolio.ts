// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
//  Images are Unsplash photos (free to use). Swap any `image` id for another
//  photo id from unsplash.com — e.g. "photo-1498050108023-c5249f4df085".
// ─────────────────────────────────────────────────────────────

export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const profile = {
  name: "Shashintha Nimsara",
  first: "Shashintha",
  last: "Nimsara",
  role: "Full-Stack Developer & UI/UX Specialist",
  location: "Kandy, Sri Lanka",
  email: "shashinthanimsara.perera@gmail.com",
  phone: "+94 72 351 3533",
  github: "https://github.com/SHASHiYA32",
  githubHandle: "@SHASHiYA32",
  intro:
    "I build scalable backend services, clean component architectures and responsive full-stack applications.",
  about:
    "I'm a full-stack developer and UI/UX specialist from Kandy, Sri Lanka. I combine server-side architecture with polished front-end design to deliver fast, production-ready web apps — with a strong focus on clean architecture and high-performance digital solutions.",
  resumeUrl: "/resume/Shashintha-Nimsara-Resume.pdf",
};

export const images = {
  hero: img("photo-1498050108023-c5249f4df085", 1400),
  zoom: img("photo-1461749280684-dccba630e2f6", 2400),
};

export const stats = [
  { value: 2, suffix: "+", label: "Years of experience" },
  { value: 10, suffix: "+", label: "Projects shipped" },
  { value: 24, suffix: "h", label: "Typical response time" },
];

export const focus = [
  {
    title: "Clean Architecture",
    text: "Modular, type-safe code with modern component patterns that stays easy to extend.",
  },
  {
    title: "Pixel-Perfect UI/UX",
    text: "Typography, spacing, motion and accessibility — details that make interfaces feel right.",
  },
  {
    title: "Speed & Performance",
    text: "Bundle size, caching, rendering and Core Web Vitals tuned for real users.",
  },
];

export type Project = {
  index: string;
  title: string;
  category: string;
  blurb: string;
  overview: string;
  role: string;
  tech: string[];
  url: string;
  image: string;
  colors: [string, string];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Personal Portfolio",
    category: "Portfolio / Web",
    blurb: "My home on the web — a fast, glassmorphic portfolio with a command palette.",
    overview:
      "The first version of my portfolio: a dark, minimal site with an interactive project showcase, a ⌘K command palette and a public guestbook, built for speed and clarity.",
    role: "Design & Development",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    url: "https://shashintha-nimsara.vercel.app",
    image: "photo-1467232004584-a241de8bcf5d",
    colors: ["#1f2a44", "#0d1220"],
  },
  {
    index: "02",
    title: "DevDynamo Official",
    category: "Company / Agency",
    blurb: "The website of my studio building web, software and mobile apps.",
    overview:
      "The official site for DevDynamo, my development business. It presents services — web, software and mobile apps and custom solutions — in a clean, conversion-focused layout.",
    role: "Design & Development",
    tech: ["Full Stack", "Web Dev", "Tailwind", "UI/UX"],
    url: "https://dev-dynamo-official.vercel.app",
    image: "photo-1519389950473-47ba0277781c",
    colors: ["#2b1f44", "#120d20"],
  },
  {
    index: "03",
    title: "POS Management System",
    category: "Business System",
    blurb: "A point-of-sale system with a live dashboard for day-to-day operations.",
    overview:
      "A point-of-sale and store management system with a dashboard view of sales and operations, backed by a Node.js API and a database.",
    role: "Full-Stack Development",
    tech: ["React", "Node.js", "Database", "Dashboard"],
    url: "https://pos-system-livid-pi.vercel.app",
    image: "photo-1460925895917-afdab827c52f",
    colors: ["#1d3b36", "#0c1a18"],
  },
  {
    index: "04",
    title: "Personal Finance Tracker",
    category: "Productivity / FinTech",
    blurb: "Income and spending turned into clear, readable charts.",
    overview:
      "A finance tracker that turns income and expenses into charts and summaries, so budgets are understandable at a glance. Typed end-to-end with TypeScript.",
    role: "Design & Development",
    tech: ["React", "TypeScript", "Tailwind", "Charts"],
    url: "https://personal-finance-tracker-psi-six.vercel.app",
    image: "photo-1554224155-6726b3ff858f",
    colors: ["#3b2f1d", "#1a140c"],
  },
  {
    index: "05",
    title: "Aurex Web Platform",
    category: "Web Application",
    blurb: "A polished Next.js platform with a crisp, modern interface.",
    overview:
      "A web platform built with Next.js and React, with an emphasis on a refined, modern UI/UX and smooth interactions.",
    role: "Design & Development",
    tech: ["Next.js", "React", "UI/UX"],
    url: "https://aurex-production.vercel.app",
    image: "photo-1550751827-4bd374c3f58b",
    colors: ["#3b1d2e", "#1a0c14"],
  },
  {
    index: "06",
    title: "Next.js Todo App",
    category: "Productivity",
    blurb: "A fast, minimal to-do app for planning the day.",
    overview:
      "A minimal to-do application built with Next.js and Tailwind CSS — quick to use, responsive and distraction-free.",
    role: "Design & Development",
    tech: ["Next.js", "React", "Tailwind CSS"],
    url: "https://next-js-todo-app-gamma-five.vercel.app",
    image: "photo-1484480974693-6ca0a78fb36b",
    colors: ["#1d2f3b", "#0c161a"],
  },
  {
    index: "07",
    title: "Tord",
    category: "Web Application",
    blurb: "A modern, typed web app built on Next.js and Tailwind.",
    overview:
      "A modern web application built with Next.js, React, TypeScript and Tailwind CSS, structured with clean, reusable components.",
    role: "Design & Development",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    url: "https://tord-olive.vercel.app",
    image: "photo-1518770660439-4636190af475",
    colors: ["#26331d", "#10160c"],
  },
  {
    index: "08",
    title: "Universal Business Platform",
    category: "Business Management",
    blurb: "A full-stack management platform that brings operations into one place.",
    overview:
      "A full-stack business management platform with dashboards for running core operations from a single interface. Built with Next.js, TypeScript and Tailwind.",
    role: "Full-Stack Development",
    tech: ["Next.js", "React", "Tailwind", "TypeScript", "Dashboard", "Full Stack"],
    url: "https://dd-management-demo.vercel.app",
    image: "photo-1551288049-bebda4e38f71",
    colors: ["#1d1f3b", "#0c0d1a"],
  },
];

export const stackGroups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS"],
  },
  { title: "Motion & Graphics", items: ["GSAP", "Three.js", "Lenis", "Figma"] },
  { title: "Backend", items: ["Node.js", "REST APIs", "Databases"] },
  { title: "Tooling", items: ["Git & GitHub", "Vercel", "UI/UX Design"] },
];

export const resume = {
  title: "Full-Stack Developer",
  summary:
    "Full-Stack Software Engineer with a solid academic foundation and hands-on industry experience building scalable web applications. Proficient in modern full-stack workflows including React, Next.js, TypeScript, and robust backend integrations, with a strong focus on clean architecture and high-performance digital solutions.",
  experience: [
    {
      role: "Software Engineer",
      org: "amezcloud",
      period: "May 2026 — Jul 2026",
      text: "Architecting and developing production-ready web applications, optimizing full-stack performance, and implementing robust frontend and backend services.",
    },
    {
      role: "Self-Taught Web Developer & Independent Projects",
      org: "Independent",
      period: "2019 — Present",
      text: "Designed and launched multiple full-stack web applications and interactive platforms from scratch, mastering modern component-driven architectures, responsive UI/UX, and database integration.",
    },
  ],
  education: [
    { title: "B.Sc. in Software Engineering", status: "Graduated · 2025" },
    { title: "Master's in Software Engineering", status: "Ongoing" },
    { title: "HND in AI & Data Science", status: "Ongoing" },
  ],
};

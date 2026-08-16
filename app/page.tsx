"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  FormEvent,
  MouseEvent,
} from "react";
import {
  FileText,
  Menu,
  ExternalLink,
  Download,
  Code,
  Sparkles,
  Zap,
  FolderGit2,
  Cpu,
  Award,
  Atom,
  FileCode2,
  FileJson,
  Globe,
  Layers,
  Palette,
  Eye,
  Component,
  Server,
  GitBranch,
  Database,
  Container,
  ShieldCheck,
  Cloud,
  Layout,
  ArrowUp,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Terminal,
  Command,
  CornerDownLeft,
  User,
  Mail,
  MessageSquare,
  Keyboard,
  SquareSigma,
  Brain,
  GraduationCap,
  Coffee,
} from "lucide-react";

import Hero from "@/components/Hero";
import AmbientGlow from "@/components/AmbientGlow";
import ContactGuestbook from "@/components/ContactGuestbook";
import About from "@/components/About";

interface ProjectData {
  id: string;
  title: string;
  categoryLabel: string;
  categoryGroup: "ai" | "web" | "system";
  img: string;
  desc: string;
  highlights: string[];
  tags: string[];
  link: string;
}

const PROJECTS_DATA: Record<string, ProjectData> = {
  portfolio: {
    id: "portfolio",
    title: "Personal Portfolio Website",
    categoryLabel: "Portfolio / Web",
    categoryGroup: "web",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    desc: "My primary personal developer portfolio featuring a dark minimalist aesthetic, glassmorphism, interactive command palette, and smooth section transitions.",
    highlights: [
      "Built with Next.js, React, and Tailwind CSS v4.",
      "Custom global keyboard shortcuts and command palette (Ctrl+K).",
      "Fully responsive grid layout with live interactive project previews.",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    link: "http://shashintha-nimsara.vercel.app/",
  },
  devdynamo: {
    id: "devdynamo",
    title: "DevDynamo Official",
    categoryLabel: "Company / Agency",
    categoryGroup: "system",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    desc: "The official digital hub for DevDynamo, showcasing full-stack web and game development services, enterprise tools, and creative digital solutions.",
    highlights: [
      "Professional agency showcase layout.",
      "Optimized performance and clean typography architecture.",
      "Integrated contact and project inquiry flows.",
    ],
    tags: ["Full Stack", "Web Dev", "Tailwind", "UI/UX"],
    link: "https://dev-dynamo-official.vercel.app/",
  },
  pos: {
    id: "pos",
    title: "POS Management System",
    categoryLabel: "Business System",
    categoryGroup: "system",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    desc: "A comprehensive Point of Sale (POS) system designed for streamlined inventory tracking, sales processing, and business reporting.",
    highlights: [
      "Real-time inventory and stock updates.",
      "Fast checkout and transaction processing UI.",
      "Sales analytics dashboard views.",
    ],
    tags: ["React", "Database", "Dashboard", "Node.js"],
    link: "https://pos-system-livid-pi.vercel.app/",
  },
  finance: {
    id: "finance",
    title: "Personal Finance Tracker",
    categoryLabel: "Productivity / FinTech",
    categoryGroup: "web",
    img: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80",
    desc: "An intuitive web application to monitor daily expenses, manage budgets, and visualize financial growth over time.",
    highlights: [
      "Interactive expense categorization and budget limits.",
      "Clean chart visualizers for monetary tracking.",
      "Responsive dark-themed layout.",
    ],
    tags: ["React", "TypeScript", "Tailwind", "Charts"],
    link: "https://personal-finance-tracker-psi-six.vercel.app/",
  },
  aurex: {
    id: "aurex",
    title: "Aurex Web Platform",
    categoryLabel: "Web Application",
    categoryGroup: "web",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    desc: "A dynamic web platform built for high-speed performance, clean component architecture, and seamless user interaction.",
    highlights: [
      "Optimized page load speeds and component modularity.",
      "Modern interactive UI elements.",
      "Scalable frontend structure.",
    ],
    tags: ["Next.js", "React", "UI/UX"],
    link: "https://aurex-production.vercel.app/",
  },
  todo: {
    id: "todo",
    title: "Next.js Todo Application",
    categoryLabel: "Productivity",
    categoryGroup: "web",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    desc: "A feature-rich task management application built to handle daily workflows, task statuses, and smooth local state persistence.",
    highlights: [
      "Instant task creation, editing, and deletion flow.",
      "Clean state handling and data organization.",
      "Minimalist dark mode UI design.",
    ],
    tags: ["Next.js", "React", "Tailwind CSS"],
    link: "https://next-js-todo-app-gamma-five.vercel.app/",
  },
  tord: {
    id: "tord",
    title: "Tord",
    categoryLabel: "Web Application",
    categoryGroup: "web",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    desc: "A modern web application built for seamless user experience, fast navigation, and interactive layouts.",
    highlights: [
      "Responsive design optimized for multiple devices.",
      "Clean UI component integration.",
      "Fast production build and performance.",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    link: "https://tord-olive.vercel.app/",
  },
  DDPlatform:{
  id: "dd-management-platform",
  title: "Universal Business Management Platform",
  categoryLabel: "Business Management System",
  categoryGroup: "system",
  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  desc: "A powerful all-in-one business management platform designed to help businesses manage inventory, sales, customers, suppliers, financial obligations, and business performance from a single modern dashboard.",
  highlights: [
    "Centralized dashboard for monitoring key business performance metrics.",
    "Complete inventory management with stock levels, SKU tracking, and low-stock alerts.",
    "Sales management with transaction history, invoices, payment statuses, and outstanding balances.",
    "Customer and supplier management for maintaining organized business relationships.",
    "Weekly, monthly, and custom reporting for data-driven business decisions.",
    "Real-time business insights including revenue, inventory value, customer dues, and payables.",
    "Responsive modern interface designed for efficient day-to-day business operations.",
    "Scalable architecture that can be customized for different types of businesses."
  ],
  tags: [
    "Business Management",
    "Inventory",
    "Sales",
    "CRM",
    "Reports",
    "Analytics",
    "Dashboard",
    "Full Stack"
  ],
  link: "https://dd-management-demo.vercel.app/",
}
};

interface GuestbookComment {
  name: string;
  role: string;
  message: string;
  time: string;
}

const DEFAULT_COMMENTS: GuestbookComment[] = [
  {
    name: "Marcus Vance",
    role: "VP of Product @ TechScale",
    message:
      "Nimsara's dark minimalist aesthetic and clean code structure are top tier. Loved working together on the design system!",
    time: "2 hours ago",
  },
  {
    name: "Elena Rostova",
    role: "Senior UX Designer",
    message:
      "The 3D tilt card in the hero section is super smooth! Exceptional attention to spacing and micro-interactions.",
    time: "Yesterday",
  },
  {
    name: "David K.",
    role: "Full Stack Engineer",
    message:
      "Clean performance, crisp typography choices, and ultra fast tabs showcase. Stellar work!",
    time: "3 days ago",
  },
];

interface Toast {
  id: string;
  message: string;
}

function calculateReadingTime(
  descText: string,
  highlightsArray: string[] = [],
) {
  const combinedText = descText + " " + highlightsArray.join(" ");
  const words = combinedText.trim().split(/\s+/).filter(Boolean).length;
  const wpm = 200;
  const totalSeconds = Math.max(5, Math.round((words / wpm) * 60));

  let badgeLabel = "";
  if (totalSeconds < 30) {
    badgeLabel = `${totalSeconds}s read`;
  } else if (totalSeconds < 60) {
    badgeLabel = `< 1 min read`;
  } else {
    const mins = Math.ceil(totalSeconds / 60);
    badgeLabel = `${mins} min read`;
  }

  return { badgeLabel, wordCount: words, seconds: totalSeconds };
}

export default function App() {
  // Preloader State
  const [isLoadingPreloader, setIsLoadingPreloader] = useState(true);
  const [preloaderProgress, setPreloaderProgress] = useState(0);
  const [preloaderMessage, setPreloaderMessage] = useState(
    "Welcome to my Portfolio Website...",
  );

  // Navigation & UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "projects" | "techstack" | "certificates"
  >("projects");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "web" | "ai" | "system"
  >("all");

  // Modals
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(
    null,
  );
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Command Palette & Shortcut Helper State
  const [isShortcutHelperOpen, setIsShortcutHelperOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [commandSelectedIndex, setCommandSelectedIndex] = useState(0);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Hero Card & Ambient Effects
  const [isPortraitColorMode, setIsPortraitColorMode] = useState(false);
  const [ambientPos, setAmbientPos] = useState({ x: -1000, y: -1000 });

  // Guestbook & Contact
  const [guestbookComments, setGuestbookComments] = useState<
    GuestbookComment[]
  >([]);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((msg: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string, toastMsg?: string) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        if (toastMsg) {
          showToast(toastMsg);
        }
      }
    },
    [showToast],
  );

  // Global Keyboard Shortcuts (Ctrl+K for Command Palette, Ctrl+Alt+[Key] for Sections)
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      // 1. Command Palette Trigger: Ctrl + K or Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => {
          const next = !prev;
          if (next) {
            setCommandQuery("");
            setCommandSelectedIndex(0);
          }
          return next;
        });
        return;
      }

      // 2. Direct Section Scroll Shortcuts: Ctrl + Alt + [Key]
      if (e.ctrlKey && e.altKey) {
        const key = e.key.toLowerCase();
        if (key === "c") {
          e.preventDefault();
          scrollToSection("contact", "Jumped to Contacts (Ctrl + Alt + C)");
          setIsCommandPaletteOpen(false);
        } else if (key === "a") {
          e.preventDefault();
          scrollToSection("about", "Jumped to About (Ctrl + Alt + A)");
          setIsCommandPaletteOpen(false);
        } else if (key === "p") {
          e.preventDefault();
          setActiveTab("projects");
          scrollToSection("showcase", "Jumped to Projects (Ctrl + Alt + P)");
          setIsCommandPaletteOpen(false);
        } else if (key === "g") {
          e.preventDefault();
          scrollToSection("guestbook", "Jumped to Guestbook (Ctrl + Alt + G)");
          setIsCommandPaletteOpen(false);
        } else if (key === "h") {
          e.preventDefault();
          scrollToSection("hero", "Jumped to Top (Ctrl + Alt + H)");
          setIsCommandPaletteOpen(false);
        } else if (key === "r") {
          e.preventDefault();
          setIsResumeModalOpen(true);
          showToast("Opened Resume (Ctrl + Alt + R)");
          setIsCommandPaletteOpen(false);
        } else if (key === "t") {
          e.preventDefault();
          setActiveTab("techstack");
          scrollToSection("showcase", "Jumped to Tech Stack (Ctrl + Alt + T)");
          setIsCommandPaletteOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, [scrollToSection, showToast]);

  // Auto-focus input when command palette opens
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => {
        commandInputRef.current?.focus();
      }, 50);
    }
  }, [isCommandPaletteOpen]);

  // Command Palette Items
  const commandsList = [
    {
      id: "cmd-hero",
      title: "Scroll to Top / Hero",
      description: "Jump to the main landing hero banner",
      category: "Navigation",
      icon: <ArrowUp className="w-4 h-4 text-indigo-400" />,
      shortcut: "Ctrl + Alt + H",
      action: () => {
        scrollToSection("hero");
        showToast("Navigated to Top section");
      },
    },
    {
      id: "cmd-about",
      title: "Scroll to About",
      description:
        "Learn more about Shashintha Nimsara, experience, and background",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-emerald-400" />,
      shortcut: "Ctrl + Alt + A",
      action: () => {
        scrollToSection("about");
        showToast("Navigated to About section");
      },
    },
    {
      id: "cmd-projects",
      title: "View Projects Showcase",
      description: "Explore full stack, AI, and systems engineering projects",
      category: "Showcase",
      icon: <FolderGit2 className="w-4 h-4 text-amber-400" />,
      shortcut: "Ctrl + Alt + P",
      action: () => {
        setActiveTab("projects");
        scrollToSection("showcase");
        showToast("Navigated to Projects Showcase");
      },
    },
    {
      id: "cmd-techstack",
      title: "View Tech Stack",
      description: "Browse frontend, backend, UI design, and cloud tools",
      category: "Showcase",
      icon: <Cpu className="w-4 h-4 text-sky-400" />,
      shortcut: "Ctrl + Alt + T",
      action: () => {
        setActiveTab("techstack");
        scrollToSection("showcase");
        showToast("Navigated to Tech Stack");
      },
    },
    {
      id: "cmd-certificates",
      title: "View Certifications",
      description: "Check verified cloud, frontend, and security credentials",
      category: "Showcase",
      icon: <Award className="w-4 h-4 text-purple-400" />,
      action: () => {
        setActiveTab("certificates");
        scrollToSection("showcase");
        showToast("Navigated to Certifications");
      },
    },
    {
      id: "cmd-guestbook",
      title: "Scroll to Guestbook",
      description: "Read community testimonials or leave a signature",
      category: "Navigation",
      icon: <MessageSquare className="w-4 h-4 text-pink-400" />,
      shortcut: "Ctrl + Alt + G",
      action: () => {
        scrollToSection("guestbook");
        showToast("Navigated to Guestbook");
      },
    },
    {
      id: "cmd-contact",
      title: "Scroll to Contact Form",
      description: "Send a direct inquiry or project collaboration request",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      shortcut: "Ctrl + Alt + C",
      action: () => {
        scrollToSection("contact");
        showToast("Navigated to Contact");
      },
    },
    {
      id: "cmd-resume",
      title: "Open Professional Resume",
      description: "View or download PDF copy of work history & skills",
      category: "Actions",
      icon: <FileText className="w-4 h-4 text-indigo-400" />,
      shortcut: "Ctrl + Alt + R",
      action: () => {
        setIsResumeModalOpen(true);
        showToast("Opened Resume Modal");
      },
    },
    {
      id: "cmd-toggle-portrait",
      title: "Toggle 3D Badge Avatar Mode",
      description: "Switch between monochrome glow & vibrant portrait avatar",
      category: "Actions",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => {
        setIsPortraitColorMode((prev) => !prev);
        showToast(
          `Avatar mode: ${!isPortraitColorMode ? "Vibrant Color" : "Monochrome"}`,
        );
      },
    },
  ];

  const filteredCommands = commandsList.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(commandQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(commandQuery.toLowerCase()) ||
      cmd.category.toLowerCase().includes(commandQuery.toLowerCase()),
  );

  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCommandSelectedIndex(
        (prev) => (prev + 1) % Math.max(1, filteredCommands.length),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCommandSelectedIndex(
        (prev) =>
          (prev - 1 + filteredCommands.length) %
          Math.max(1, filteredCommands.length),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        const selectedCmd =
          filteredCommands[commandSelectedIndex] || filteredCommands[0];
        if (selectedCmd) {
          selectedCmd.action();
          setIsCommandPaletteOpen(false);
        }
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsCommandPaletteOpen(false);
    }
  };

  // Initialize Preloader & Local Storage Data
  useEffect(() => {
    window.scrollTo(0, 0);

    // Preloader interval
    const messages = [
      "Welcome to my Portfolio Website...",
      "Loading dark minimalist aesthetics...",
      "Initializing 3D hero badge...",
      "Portfolio ready!",
    ];
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const progressVal = step * 25;
      setPreloaderProgress(progressVal);
      if (step - 1 < messages.length) {
        setPreloaderMessage(messages[step - 1]);
      }
      if (progressVal >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoadingPreloader(false);
          setTimeout(() => {
            setIsShortcutHelperOpen(true);
          }, 350);
        }, 400);
      }
    }, 280);

    // Load Guestbook
    const saved = localStorage.getItem("nimsara_portfolio_guestbook");
    if (saved) {
      try {
        setGuestbookComments(JSON.parse(saved));
      } catch {
        setGuestbookComments(DEFAULT_COMMENTS);
      }
    } else {
      setGuestbookComments(DEFAULT_COMMENTS);
    }

    return () => clearInterval(interval);
  }, []);

  // Ambient mouse spotlight
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setAmbientPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard navigation for Modals
  useEffect(() => {
    const projectKeys = Object.keys(PROJECTS_DATA);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectKey) {
        if (e.key === "Escape") {
          e.preventDefault();
          setSelectedProjectKey(null);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const currentIdx = projectKeys.indexOf(selectedProjectKey);
          const nextIdx = (currentIdx + 1) % projectKeys.length;
          setSelectedProjectKey(projectKeys[nextIdx]);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const currentIdx = projectKeys.indexOf(selectedProjectKey);
          const prevIdx =
            (currentIdx - 1 + projectKeys.length) % projectKeys.length;
          setSelectedProjectKey(projectKeys[prevIdx]);
        }
      } else if (isResumeModalOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsResumeModalOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProjectKey, isResumeModalOpen]);

  // Filter projects list
  const projectList = Object.values(PROJECTS_DATA).filter((p) => {
    if (selectedCategory === "all") return true;
    return p.categoryGroup === selectedCategory;
  });

  const projectKeys = Object.keys(PROJECTS_DATA);
  const currentProject = selectedProjectKey
    ? PROJECTS_DATA[selectedProjectKey]
    : null;
  const currentProjectIndex = selectedProjectKey
    ? projectKeys.indexOf(selectedProjectKey)
    : 0;
  const readStats = currentProject
    ? calculateReadingTime(currentProject.desc, currentProject.highlights)
    : null;

  return (
    <div className="bg-black text-white relative min-h-dvh selection:bg-white selection:text-black antialiased">
      {/* Background Grid Mesh */}
      <div className="fixed inset-0 bg-grid-pattern opacity-80 pointer-events-none z-0"></div>

      {/* 1. PRELOADER OVERLAY */}
      <div
        className={`fixed inset-0 bg-[#000000] z-[100] flex flex-col items-center justify-center p-6 select-none transition-all duration-500 ${
          isLoadingPreloader ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-md w-full flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#121215] border border-[#27272a] flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden">
            <span className="text-2xl font-extrabold tracking-tighter text-white">
              SN
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent"></div>
          </div>

          <h2 className="text-lg md:text-xl font-medium text-white mb-2 tracking-wide min-h-[28px]">
            {preloaderMessage}
          </h2>
          <p className="text-xs text-zinc-500 mb-8 tracking-widest uppercase font-mono">
            Initializing Experience
          </p>

          <div className="w-full bg-[#18181b] h-1.5 rounded-full overflow-hidden border border-[#27272a] relative">
            <div
              className="h-full bg-white transition-all duration-300 rounded-full"
              style={{ width: `${preloaderProgress}%` }}
            ></div>
          </div>

          <div className="mt-4 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span>{preloaderProgress}%</span>
            <span className="text-zinc-600">•</span>
            <span>Dark Minimalist React Architecture</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION HEADER */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
        <nav className="glass-nav backdrop-blur-xl rounded-2xl px-5 py-3 shadow-2xl flex items-center justify-between border border-[#27272a]/80">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white font-bold text-sm group-hover:border-white transition-colors">
              SN
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-zinc-300 transition-colors flex items-center gap-1.5">
                Shashintha Nimsara
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                  title="Available for work"
                ></span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                full-stack developer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#121215]/80 p-1.5 rounded-xl border border-[#27272a]/60 text-xs font-medium">
            <a
              href="#about"
              className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1f1f23] transition-all"
            >
              About
            </a>
            <a
              href="#showcase"
              className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1f1f23] transition-all"
            >
              Showcase
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1f1f23] transition-all"
            >
              Contact
            </a>
            <a
              href="#guestbook"
              className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1f1f23] transition-all"
            >
              Guestbook
            </a>
          </div>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#18181b] border border-[#27272a] text-zinc-300 hover:text-white hover:border-zinc-500 text-xs font-mono transition-all active:scale-95"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden lg:inline text-xs font-sans font-medium text-zinc-200">
                Commands
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#27272a] text-[10px] font-mono text-zinc-400 border border-white/10">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all active:scale-95 shadow-lg"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-zinc-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 glass-card rounded-2xl p-4 border border-[#27272a] flex flex-col gap-2 shadow-2xl  backdrop-blur-xl">
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-[#18181b] hover:text-white"
            >
              About
            </a>
            <a
              href="#showcase"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-[#18181b] hover:text-white"
            >
              Showcase
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-[#18181b] hover:text-white"
            >
              Contact
            </a>
            <a
              href="#guestbook"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-[#18181b] hover:text-white"
            >
              Guestbook
            </a>
            <div className="pt-2 border-t border-[#27272a] flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#18181b] border border-[#27272a] text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Command className="w-3.5 h-3.5 text-indigo-400" />
                <span>Command Palette (Ctrl + K)</span>
              </button>
              <button
                onClick={() => {
                  setIsResumeModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold flex items-center justify-center gap-2"
              >
                <FileText className="w-3.5 h-3.5" />
                View Resume
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3. HERO SECTION */}
        <Hero />

        {/* ABOUT / BIO DETAIL SECTION */}
        <About />

        {/* 4. INTERACTIVE SHOWCASE (TABS SYSTEM) */}
        <section id="showcase" className="py-20 border-t border-[#27272a]/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">
                // EXPLORE MY WORK
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Interactive Showcase
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Switch between projects, technical skills, and verified
              credentials using the interactive navigation tabs below.
            </p>
          </div>

          {/* TABS NAVIGATION BAR */}
          <div className="flex justify-center mb-8 sm:mb-10 w-full px-1">
            <div className="grid grid-cols-3 sm:flex p-1.5 rounded-2xl bg-[#121215] border border-[#27272a] shadow-xl text-xs font-medium w-full max-w-xl sm:w-auto gap-1">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-2 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-xs text-center ${
                  activeTab === "projects"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Projects</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] hidden xs:inline-block sm:inline-block ${activeTab === "projects" ? "bg-black/10" : "bg-[#18181b] border border-[#27272a]"}`}
                >
                  {projectList.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("techstack")}
                className={`px-2 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-xs text-center ${
                  activeTab === "techstack"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Tech Stack</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] hidden xs:inline-block sm:inline-block ${activeTab === "techstack" ? "bg-black/10" : "bg-[#18181b] border border-[#27272a]"}`}
                >
                  17
                </span>
              </button>

              <button
                onClick={() => setActiveTab("certificates")}
                className={`px-2 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-xs text-center ${
                  activeTab === "certificates"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Certificates</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] hidden xs:inline-block sm:inline-block ${activeTab === "certificates" ? "bg-black/10" : "bg-[#18181b] border border-[#27272a]"}`}
                >
                  1
                </span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT 1: PROJECTS VIEW */}
          {activeTab === "projects" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Category Filter Sub-pills */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs font-mono px-2">
                {(["all", "web", "ai", "system"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg transition-all capitalize text-[11px] sm:text-xs ${
                      selectedCategory === cat
                        ? "bg-[#18181b] border border-white/20 text-white font-semibold"
                        : "bg-[#121215] border border-[#27272a] text-zinc-400 hover:text-white hover:border-zinc-500"
                    }`}
                  >
                    {cat === "all"
                      ? "All Projects"
                      : cat === "web"
                        ? "Web Apps"
                        : cat === "ai"
                          ? "AI & Data"
                          : "Design Systems"}
                  </button>
                ))}
              </div>

              {/* Projects Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {projectList.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProjectKey(project.id)}
                    className="project-card glass-card rounded-2xl border border-[#27272a] overflow-hidden flex flex-col group hover:border-zinc-400 active:scale-[0.98] active:border-indigo-500/50 transition-all duration-200 cursor-pointer select-none"
                  >
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-[#18181b]">
                      <iframe
                        src={project.link}
                        title={project.title}
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100 pointer-events-none border-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent"></div>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                          {project.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#27272a] flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectKey(project.id);
                          }}
                          className="text-xs font-semibold text-white hover:text-zinc-300 flex items-center gap-1 active:scale-95 transition-transform py-1 px-2 rounded-lg hover:bg-white/5"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 font-mono py-1 px-2"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: TECH STACK VIEW */}
          {activeTab === "techstack" && (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* Category 1: Core Frontend */}
              <div>
                <h3 className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  Core Frontend & Architecture
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-sky-400 mb-2 group-hover:bg-sky-950/40">
                      <Atom className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      React 19
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Expert • 4 yrs
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-blue-400 mb-2 group-hover:bg-blue-950/40">
                      <FileCode2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      TypeScript
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Advanced
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-yellow-400 mb-2 group-hover:bg-yellow-950/40">
                      <FileJson className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      JavaScript ES6+
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Expert
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-white mb-2 group-hover:bg-zinc-800">
                      <Globe className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Next.js 15
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Advanced
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-orange-400 mb-2 group-hover:bg-orange-950/40">
                      <Code className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      HTML5 / CSS3
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Expert
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-purple-400 mb-2 group-hover:bg-purple-950/40">
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      State Management
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Redux / Zustand
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 2: Backend, Systems & Languages */}
              <div>
                <h3 className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Backend, Systems & Core Languages
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-emerald-500 mb-2">
                      <Server className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Node.js & Express
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Proficient
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-red-500 mb-2">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">Java</span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Advanced • Master's
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-purple-500 mb-2">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      C# & .NET
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Backend & OOP
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-blue-600 mb-2">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">C++</span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Systems Logic
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-blue-500 mb-2">
                      <Database className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      MySQL / Supabase
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Expert
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 3: Styling, Motion & UI Design */}
              <div>
                <h3 className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  Styling, Motion & UI Design
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-cyan-400 mb-2">
                      <Palette className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Tailwind CSS v4
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Expert
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-pink-400 mb-2">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Framer Motion
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Advanced
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-[#f34f1c] mb-2">
                      <SquareSigma className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Figma & UI Systems
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Design Ops
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-emerald-400 mb-2">
                      <Eye className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Web Accessibility
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      WCAG 2.1 AA
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-amber-400 mb-2">
                      <Component className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Shadcn / Radix
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Advanced
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-green-400 mb-2">
                      <Brain className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">GSAP</span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      FLUENT
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 4: Tooling & Cloud */}
              <div>
                <h3 className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  Tooling, Dev & Cloud
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-yellow-300 mb-2">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Vite & Bundling
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Expert
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-orange-500 mb-2">
                      <GitBranch className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Git & GitHub
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      CI/CD Workflows
                    </span>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-[#27272a] flex flex-col items-center text-center group hover:border-zinc-400 hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#18181b] flex items-center justify-center text-sky-300 mb-2">
                      <Container className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Docker / Containers
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Foundational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: CERTIFICATES VIEW */}
          {activeTab === "certificates" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="glass-card p-6 rounded-2xl border border-[#27272a] flex flex-col sm:flex-row items-start gap-4 hover:border-zinc-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white shrink-0">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        META // COURSERA
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        Verified 2024
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Meta Frontend Developer Professional Certificate
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Comprehensive 9-course specialization covering advanced
                      React, JavaScript algorithms, version control, responsive
                      UI design, and web optimization.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-zinc-500 text-[11px]">
                        ID: META-FE-983210
                      </span>
                      <button
                        onClick={() =>
                          showToast("Credential verified: Active status")
                        }
                        className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                      >
                        <span>Verify Credentials</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-[#27272a] flex flex-col sm:flex-row items-start gap-4 hover:border-zinc-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white shrink-0">
                    <Cloud className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        AMAZON WEB SERVICES
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        Verified 2023
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      AWS Certified Cloud Practitioner
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Validated core cloud concepts, security practices,
                      serverless deployment pipelines, and global CloudFront CDN
                      routing.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-zinc-500 text-[11px]">
                        ID: AWS-CP-482019
                      </span>
                      <button
                        onClick={() =>
                          showToast("Credential verified: Active status")
                        }
                        className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                      >
                        <span>Verify Credentials</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-[#27272a] flex flex-col sm:flex-row items-start gap-4 hover:border-zinc-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white shrink-0">
                    <Cpu className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        FRONTEND MASTERS
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        Verified 2024
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Advanced React & TypeScript Architecture
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      In-depth mastery of custom hook patterns, state machine
                      orchestration, generics, render optimizations, and custom
                      Vite build tooling.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-zinc-500 text-[11px]">
                        ID: FM-REACT-TS-771
                      </span>
                      <button
                        onClick={() =>
                          showToast("Credential verified: Active status")
                        }
                        className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                      >
                        <span>Verify Credentials</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div> */}

                <div className="glass-card p-6 rounded-2xl border border-[#27272a] flex flex-col sm:flex-row items-start gap-4 hover:border-zinc-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white shrink-0">
                    <GraduationCap className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        JAVA INSTITUTE & ACADEMIC CREDENTIALS
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        Graduated 2025 / Ongoing
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      B.Sc. & Master’s in Software Engineering
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Completed B.Sc. in Software Engineering (2025) and
                      currently advancing expertise through the Master’s program
                      at Java Institute, focusing on robust software
                      architecture and system design.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-zinc-500 text-[11px]">
                        INSTITUTE: Java Institute
                      </span>
                      <button
                        onClick={() =>
                          showToast(
                            "Academic credentials verified: Active status",
                          )
                        }
                        className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                      >
                        <span>Verify Status</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 5. CONTACT & GUESTBOOK SECTION */}
        <ContactGuestbook />
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#27272a]/80 bg-[#000000] py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center font-bold text-white text-xs">
              SN
            </div>
            <span>
              © {new Date().getFullYear()} Shashintha Nimsara. Designed &
              Developed with Dark Minimalist Craft.
            </span>
          </div>

          <div className="flex items-center gap-6 font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#showcase" className="hover:text-white transition-colors">
              Showcase
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </footer>

      {/* MODAL 1: PROJECT DETAILS MODAL */}
      {selectedProjectKey && currentProject && (
        <div className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="glass-card max-w-2xl w-full rounded-2xl sm:rounded-3xl border border-[#27272a] overflow-hidden shadow-2xl relative my-auto flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {currentProject.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {currentProject.categoryLabel}
                    </span>
                    <span className="text-[10px] text-zinc-600">•</span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{readStats?.badgeLabel}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 shrink-0 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-[#27272a]/60">
                <div className="flex items-center gap-1 bg-[#18181b] border border-[#27272a] rounded-xl p-1">
                  <button
                    onClick={() => {
                      const prevIdx =
                        (currentProjectIndex - 1 + projectKeys.length) %
                        projectKeys.length;
                      setSelectedProjectKey(projectKeys[prevIdx]);
                    }}
                    className="w-7 h-7 rounded-lg hover:bg-[#27272a] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    title="Previous Project (Left Arrow ←)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-zinc-400 px-2 select-none">
                    {currentProjectIndex + 1} of {projectKeys.length}
                  </span>
                  <button
                    onClick={() => {
                      const nextIdx =
                        (currentProjectIndex + 1) % projectKeys.length;
                      setSelectedProjectKey(projectKeys[nextIdx]);
                    }}
                    className="w-7 h-7 rounded-lg hover:bg-[#27272a] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    title="Next Project (Right Arrow →)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedProjectKey(null)}
                  className="w-8 h-8 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  title="Close Modal (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
              <div className="relative h-44 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden border border-[#27272a] bg-[#18181b] shrink-0">
                <iframe
                  src={currentProject.link}
                  title={currentProject.title}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    Overview & Specs
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 bg-[#18181b] border border-[#27272a] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span>
                      {readStats?.wordCount} words • ~{readStats?.seconds}s read
                    </span>
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed bg-[#18181b]/50 p-3.5 rounded-xl border border-[#27272a]/60">
                  {currentProject.desc}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Key Architectural Highlights:
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                  {currentProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#27272a] bg-[#09090b]/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1 bg-[#18181b] px-2 py-1 rounded-md border border-[#27272a]">
                  <kbd className="text-zinc-300 font-bold">←</kbd>{" "}
                  <kbd className="text-zinc-300 font-bold">→</kbd> Navigate
                </span>
                <span className="flex items-center gap-1 bg-[#18181b] px-2 py-1 rounded-md border border-[#27272a]">
                  <kbd className="text-zinc-300 font-bold">Esc</kbd> Close
                </span>
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                <button
                  onClick={() => setSelectedProjectKey(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#18181b] text-xs text-zinc-400 hover:text-white border border-[#27272a] transition-colors"
                >
                  Close
                </button>
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 flex items-center gap-1.5 transition-colors"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* //dssd */}
      {/* MODAL 2: RESUME VIEWER MODAL */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="glass-card max-w-3xl w-full rounded-2xl sm:rounded-3xl border border-[#27272a] overflow-hidden shadow-2xl relative my-auto flex flex-col max-h-[92vh] sm:max-h-[88vh]">
            <div className="p-4 sm:p-6 border-b border-[#27272a] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Shashintha Nimsara — Resume
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Full-Stack Developer
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-zinc-400 hover:text-white shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto text-xs text-zinc-300 flex-1">
              <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
                <h4 className="font-bold text-white mb-1">
                  Professional Summary
                </h4>
                <p className="text-zinc-400 leading-relaxed">
                  Full-Stack Software Engineer with a solid academic foundation
                  and hands-on industry experience building scalable web
                  applications. Proficient in modern full-stack workflows
                  including React, Next.js, TypeScript, and robust backend
                  integrations, with a strong focus on clean architecture and
                  high-performance digital solutions.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Work Experience
                </h4>

                <div className="border-l-2 border-[#27272a] pl-4 space-y-1">
                  <div className="flex justify-between font-bold text-white flex-wrap gap-1">
                    <span>Software Engineer — amezcloud</span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      2026 — Present
                    </span>
                  </div>
                  <p className="text-zinc-400">
                    Architecting and developing production-ready web
                    applications, optimizing full-stack performance, and
                    implementing robust frontend and backend services.
                  </p>
                </div>

                <div className="border-l-2 border-[#27272a] pl-4 space-y-1">
                  <div className="flex justify-between font-bold text-white flex-wrap gap-1">
                    <span>
                      Self-Taught Web Developer & Independent Projects
                    </span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      2019 — Present
                    </span>
                  </div>
                  <p className="text-zinc-400">
                    Designed and launched multiple full-stack web applications
                    and interactive platforms from scratch, mastering modern
                    component-driven architectures, responsive UI/UX, and
                    database integration.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Education & Certifications
                </h4>
                <div className="flex justify-between font-bold text-white flex-wrap gap-1">
                  <span>B.Sc. in Software Engineering </span>
                  <span className="text-zinc-500 font-mono text-[11px]">
                    Graduated - 2025
                  </span>
                </div>
                <div className="flex justify-between font-bold text-white flex-wrap gap-1">
                  <span>Master's in Software Engineering — Java Institute</span>
                  <span className="text-zinc-500 font-mono text-[11px]">
                    Ongoing
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-[#27272a] bg-[#09090b]/90 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  showToast("Downloading Shashintha Nimsara Resume PDF...");
                  setTimeout(() => setIsResumeModalOpen(false), 1000);
                }}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Copy</span>
              </button>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#18181b] text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: COMMAND PALETTE MODAL (Ctrl + K / Cmd + K) */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-4 pt-16 sm:pt-4 animate-in fade-in duration-200"
          onClick={() => setIsCommandPaletteOpen(false)}
        >
          <div
            className="glass-card max-w-xl w-full rounded-2xl border border-[#27272a] bg-[#0c0c0e]/95 overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="p-3.5 sm:p-4 border-b border-[#27272a] flex items-center gap-3 bg-[#121215]">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                ref={commandInputRef}
                type="text"
                value={commandQuery}
                onChange={(e) => {
                  setCommandQuery(e.target.value);
                  setCommandSelectedIndex(0);
                }}
                onKeyDown={handlePaletteKeyDown}
                placeholder="Type a command or search sections... (e.g. Contacts, Projects)"
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              {commandQuery && (
                <button
                  onClick={() => {
                    setCommandQuery("");
                    commandInputRef.current?.focus();
                  }}
                  className="text-zinc-500 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-zinc-400 shrink-0">
                Esc
              </kbd>
            </div>

            {/* Quick Category / Shortcut Hints Bar */}
            <div className="px-4 py-2 border-b border-[#27272a]/60 bg-[#09090b] flex items-center justify-between text-[11px] text-zinc-400 font-mono overflow-x-auto no-scrollbar gap-2">
              <div className="flex items-center gap-2 shrink-0">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Shortcuts:</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a]">
                  Ctrl+Alt+C: Contact
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a]">
                  Ctrl+Alt+P: Projects
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a]">
                  Ctrl+Alt+A: About
                </span>
              </div>
            </div>

            {/* Command Results List */}
            <div className="p-2 overflow-y-auto flex-1 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <Command className="w-8 h-8 text-zinc-600 mx-auto" />
                  <p className="text-sm font-medium text-zinc-400">
                    No commands found for "{commandQuery}"
                  </p>
                  <p className="text-xs text-zinc-600">
                    Try searching "contact", "projects", "resume", or "about"
                  </p>
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === commandSelectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsCommandPaletteOpen(false);
                      }}
                      onMouseEnter={() => setCommandSelectedIndex(idx)}
                      className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all duration-150 ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-950/80 to-[#18181b] border border-indigo-500/40 text-white shadow-md"
                          : "bg-transparent border border-transparent text-zinc-300 hover:bg-[#18181b]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-indigo-600/30 border border-indigo-500/50"
                              : "bg-[#18181b] border border-[#27272a]"
                          }`}
                        >
                          {cmd.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">
                              {cmd.title}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] border border-[#27272a] text-zinc-400 shrink-0">
                              {cmd.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {cmd.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {cmd.shortcut && (
                          <span className="px-2 py-1 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-indigo-300">
                            {cmd.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Bar */}
            <div className="p-3 border-t border-[#27272a] bg-[#09090b] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-300 font-bold">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-300 font-bold">
                    ↓
                  </kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-300 font-bold">
                    ↵
                  </kbd>
                  <span>Select</span>
                </span>
              </div>
              <div>
                <span>
                  <strong className="text-zinc-300">
                    {filteredCommands.length}
                  </strong>{" "}
                  commands available
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: SHORTCUT HELPER POPUP */}
      {isShortcutHelperOpen && (
        <div
          className="fixed inset-0 z-[85] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsShortcutHelperOpen(false)}
        >
          <div
            className="glass-card max-w-lg w-full rounded-2xl sm:rounded-3xl border border-indigo-500/40 bg-[#0c0c0e]/95 p-5 sm:p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95 slide-in-from-bottom-6 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-[10px] font-mono text-indigo-300">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Pro Tip • Keyboard Navigation</span>
                </div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 pt-1">
                  Keyboard Shortcuts Helper
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Navigate the portfolio instantly using system keyboard
                  shortcuts or search with the command palette.
                </p>
              </div>

              <button
                onClick={() => setIsShortcutHelperOpen(false)}
                className="w-8 h-8 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-zinc-400 hover:text-white shrink-0 transition-colors"
                title="Close & Shrink to Floating Button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Command Shortcut Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/60 to-[#121215] border border-indigo-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 shrink-0">
                  <Command className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Global Command Palette
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    Search all sections, projects, & actions
                  </p>
                </div>
              </div>
              <kbd className="px-2.5 py-1 rounded-lg bg-[#18181b] border border-indigo-500/40 text-xs font-mono text-indigo-300 font-bold shadow-md shrink-0">
                Ctrl + K
              </kbd>
            </div>

            {/* Section Shortcuts Grid */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Quick Section Jumps (Ctrl + Alt + [Key])
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#121215] border border-[#27272a] flex items-center justify-between">
                  <span className="text-zinc-300 font-medium">
                    Contact Form
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-indigo-300 font-semibold">
                    Ctrl+Alt+C
                  </kbd>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121215] border border-[#27272a] flex items-center justify-between">
                  <span className="text-zinc-300 font-medium">
                    Projects Grid
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-indigo-300 font-semibold">
                    Ctrl+Alt+P
                  </kbd>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121215] border border-[#27272a] flex items-center justify-between">
                  <span className="text-zinc-300 font-medium">
                    About Nimsara
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-indigo-300 font-semibold">
                    Ctrl+Alt+A
                  </kbd>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121215] border border-[#27272a] flex items-center justify-between">
                  <span className="text-zinc-300 font-medium">Tech Stack</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-indigo-300 font-semibold">
                    Ctrl+Alt+T
                  </kbd>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121215] border border-[#27272a] flex items-center justify-between">
                  <span className="text-zinc-300 font-medium">Guestbook</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-indigo-300 font-semibold">
                    Ctrl+Alt+G
                  </kbd>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121215] border border-[#27272a] flex items-center justify-between">
                  <span className="text-zinc-300 font-medium">
                    Resume Modal
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono text-indigo-300 font-semibold">
                    Ctrl+Alt+R
                  </kbd>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 border-t border-[#27272a] flex items-center justify-between gap-3">
              <p className="text-[10px] text-zinc-500 font-mono">
                Closing shrinks this to bottom-right button
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsShortcutHelperOpen(false);
                    setIsCommandPaletteOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-1.5"
                >
                  <Command className="w-3.5 h-3.5" />
                  <span>Try Ctrl + K</span>
                </button>
                <button
                  onClick={() => setIsShortcutHelperOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-[#18181b] text-zinc-300 hover:text-white border border-[#27272a] text-xs font-medium transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM-RIGHT FLOATING SHORTCUT BUTTON (Appears when popup is closed on desktop/tablet) */}
      {!isLoadingPreloader && !isShortcutHelperOpen && (
        <button
          onClick={() => setIsShortcutHelperOpen(true)}
          className="hidden sm:flex fixed bottom-6 right-6 z-[80] group items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#121215]/95 backdrop-blur-md border border-indigo-500/40 hover:border-indigo-400 text-white shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 active:scale-95 animate-in fade-in zoom-in-75 duration-300"
          title="Open Keyboard Shortcuts Helper (Ctrl+K)"
        >
          <div className="w-6 h-6 rounded-full bg-indigo-950/80 border border-indigo-500/50 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
            <Keyboard className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 pr-0.5 text-xs font-mono font-medium text-zinc-200">
            <span>Shortcuts</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] text-indigo-300">
              ⌘K
            </kbd>
          </div>
        </button>
      )}

      {/* TOAST NOTIFICATIONS CONTAINER */}
      <div className="fixed bottom-6 sm:bottom-20 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="glass-card px-4 py-3 rounded-xl border border-white/20 text-xs font-medium text-white shadow-2xl flex items-center gap-2 pointer-events-auto animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <AmbientGlow />
    </div>
  );
}

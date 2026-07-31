export interface Project {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'system';
  categoryLabel: string;
  categoryColor: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  stats?: string;
}

export interface TechItem {
  name: string;
  category: 'core' | 'design' | 'tools';
  categoryName: string;
  experience: string;
  level: string;
  iconName: string;
  color: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  icon: string;
  verifyUrl: string;
  skills: string[];
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  timestamp: string;
  rating: number;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'nexus',
    title: 'Nexus AI Analytics Platform',
    category: 'ai',
    categoryLabel: 'AI / Analytics',
    categoryColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
    description: 'Real-time analytics engine streaming Gemini telemetry predictions, interactive metric charts, and operational alerts.',
    fullDescription: 'Nexus is an enterprise-grade AI observability platform designed for real-time model monitoring, token cost estimation, and anomaly detection. Built with high-speed WebSockets and responsive canvas chart rendering.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    tags: ['Next.js 15', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Gemini API'],
    features: [
      'Live WebSocket metric streaming with <10ms latency',
      'AI-assisted telemetry log summary and anomaly scoring',
      'Interactive canvas time-series data visualizer',
      'Exportable audit reports in CSV and PDF formats'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    stats: '10k+ Events/sec'
  },
  {
    id: 'aura',
    title: 'Aura Luxury Storefront',
    category: 'web',
    categoryLabel: 'E-Commerce',
    categoryColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30',
    description: 'Ultra-fast e-commerce experience featuring smooth cart drawer animations, dark glass product inspection, and instant filters.',
    fullDescription: 'Aura redefines modern luxury shopping with zero-layout-shift routing, ambient glassmorphism product preview modals, and instantaneous local state management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tags: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Stripe'],
    features: [
      '60fps fluid cart drawer animations and gesture controls',
      'Instant faceted search with optimism updates',
      'Dark glassmorphic 3D product view inspection',
      'Full WCAG 2.1 AA keyboard accessibility'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    stats: '99/100 Lighthouse'
  },
  {
    id: 'cyber',
    title: 'CyberCanvas UI Primitives',
    category: 'system',
    categoryLabel: 'Design System',
    categoryColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
    description: 'A modern dark minimalist React UI library built with Radix primitives, accessible keyboard focus, and frosted glass aesthetics.',
    fullDescription: 'An open-source design system component suite offering 40+ accessible, fully customizable UI primitives styled with frosted glass borders, CSS variables, and fluid motion defaults.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    tags: ['React 19', 'TypeScript', 'Radix UI', 'Tailwind CSS', 'Storybook'],
    features: [
      '40+ pre-built frosted glass UI components',
      'Comprehensive keyboard navigation and screen-reader support',
      'Zero-runtime overhead CSS variable color tokens',
      'Automatic dark mode and custom accent theme generator'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    stats: '1.2k Stars'
  },
  {
    id: 'velocity',
    title: 'Velocity Kanban Suite',
    category: 'web',
    categoryLabel: 'Productivity',
    categoryColor: 'text-sky-400 bg-sky-950/60 border-sky-500/30',
    description: 'Agile project management tool featuring drag-and-drop columns, local-first offline state persistence, and command menu shortcuts.',
    fullDescription: 'Velocity provides a frictionless, lightning-fast workspace for agile teams. Designed with local-first IndexedDB persistence, keyboard shortcuts (Cmd+K), and rich task metadata.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    tags: ['React 19', 'Zustand', 'dnd-kit', 'Tailwind CSS'],
    features: [
      'Frictionless drag-and-drop task reordering across boards',
      'Local-first storage engine with real-time sync recovery',
      'Global command palette for instant navigation and creation',
      'Subtask completion analytics and velocity burndown charts'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    stats: 'Offline First'
  },
  {
    id: 'pulse',
    title: 'Pulse Audio Synthesizer',
    category: 'web',
    categoryLabel: 'Audio / Canvas',
    categoryColor: 'text-pink-400 bg-pink-950/60 border-pink-500/30',
    description: 'Interactive browser workstation built with WebAudio API, customizable waveform generators, and real-time Canvas visualizers.',
    fullDescription: 'Pulse is an in-browser musical playground and sound synthesizer. It exposes polyphonic oscillator controls, custom ADSR envelopes, and reactive audio frequency visualizers.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    tags: ['WebAudio API', 'HTML5 Canvas', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Low-latency polyphonic audio synthesis with WebAudio',
      '60fps real-time audio spectrum oscilloscope on Canvas',
      'MIDI controller connection and custom presets import/export',
      'BPM tap tempo and customizable step sequencer'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    stats: 'Sub-5ms Latency'
  },
  {
    id: 'zenith',
    title: 'Zenith Terminal Dashboard',
    category: 'ai',
    categoryLabel: 'FinTech',
    categoryColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
    description: 'Financial market terminal monitoring live ticker feeds, orderbook liquidity depth, and automated sentiment indicators.',
    fullDescription: 'Zenith delivers institutional-grade market depth monitoring, candlestick chart analysis, and live order execution simulation in a clean dark glass aesthetic.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80',
    tags: ['Next.js 15', 'WebSockets', 'Chart.js', 'Tailwind CSS'],
    features: [
      'Real-time crypto and stock ticker WebSocket streaming',
      'Depth chart orderbook liquidity visualization',
      'Custom technical indicators (RMA, MACD, Bollinger Bands)',
      'Dark glass terminal layout with multi-monitor preset layouts'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    stats: 'Real-time Feeds'
  }
];

export const TECH_STACK: TechItem[] = [
  { name: 'React 19', category: 'core', categoryName: 'Core Frontend', experience: '4+ Years', level: 'Expert', iconName: 'Atom', color: 'text-sky-400' },
  { name: 'TypeScript', category: 'core', categoryName: 'Core Frontend', experience: '4 Years', level: 'Advanced', iconName: 'FileCode2', color: 'text-blue-400' },
  { name: 'Next.js 15', category: 'core', categoryName: 'Core Frontend', experience: '3+ Years', level: 'Expert', iconName: 'Globe', color: 'text-white' },
  { name: 'JavaScript ES6+', category: 'core', categoryName: 'Core Frontend', experience: '5+ Years', level: 'Master', iconName: 'FileJson', color: 'text-yellow-400' },
  { name: 'HTML5 / CSS3', category: 'core', categoryName: 'Core Frontend', experience: '5+ Years', level: 'Expert', iconName: 'Code', color: 'text-orange-400' },
  { name: 'State (Zustand/Redux)', category: 'core', categoryName: 'Core Frontend', experience: '4 Years', level: 'Advanced', iconName: 'Layers', color: 'text-purple-400' },
  
  { name: 'Tailwind CSS v4', category: 'design', categoryName: 'Styling & Design', experience: '4 Years', level: 'Master', iconName: 'Palette', color: 'text-cyan-400' },
  { name: 'Framer Motion', category: 'design', categoryName: 'Styling & Design', experience: '3 Years', level: 'Advanced', iconName: 'Sparkles', color: 'text-pink-400' },
  { name: 'Figma & Design Systems', category: 'design', categoryName: 'Styling & Design', experience: '4 Years', level: 'Design Ops', iconName: 'Figma', color: 'text-rose-400' },
  { name: 'Accessibility (WCAG)', category: 'design', categoryName: 'Styling & Design', experience: '3 Years', level: 'WCAG AA', iconName: 'Eye', color: 'text-emerald-400' },
  { name: 'Shadcn / Radix UI', category: 'design', categoryName: 'Styling & Design', experience: '2+ Years', level: 'Expert', iconName: 'Component', color: 'text-amber-400' },
  
  { name: 'Node.js & Express', category: 'tools', categoryName: 'Backend & Tooling', experience: '3+ Years', level: 'Advanced', iconName: 'Server', color: 'text-emerald-500' },
  { name: 'Vite & Webpack', category: 'tools', categoryName: 'Backend & Tooling', experience: '4 Years', level: 'Expert', iconName: 'Zap', color: 'text-yellow-300' },
  { name: 'Git & GitHub Workflows', category: 'tools', categoryName: 'Backend & Tooling', experience: '5 Years', level: 'Expert', iconName: 'GitBranch', color: 'text-orange-500' },
  { name: 'Jest / Playwright', category: 'tools', categoryName: 'Backend & Tooling', experience: '2+ Years', level: 'Proficient', iconName: 'CheckCircle2', color: 'text-green-400' },
  { name: 'REST & GraphQL APIs', category: 'tools', categoryName: 'Backend & Tooling', experience: '4 Years', level: 'Advanced', iconName: 'Network', color: 'text-indigo-400' }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'meta-frontend',
    title: 'Meta Senior Frontend Developer Professional Certificate',
    issuer: 'Meta (Coursera)',
    date: 'Certified Nov 2024',
    credentialId: 'META-FD-894102',
    icon: 'Award',
    verifyUrl: '#',
    skills: ['React', 'Advanced JavaScript', 'Web Performance', 'UX Design', 'Testing']
  },
  {
    id: 'aws-developer',
    title: 'AWS Certified Developer — Associate',
    issuer: 'Amazon Web Services',
    date: 'Certified Aug 2024',
    credentialId: 'AWS-DEV-902318',
    icon: 'ShieldCheck',
    verifyUrl: '#',
    skills: ['Serverless', 'Cloud Architecture', 'S3', 'CloudFront', 'Lambda']
  },
  {
    id: 'google-ux',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    date: 'Certified Mar 2024',
    credentialId: 'GGL-UX-718293',
    icon: 'Sparkles',
    verifyUrl: '#',
    skills: ['User Research', 'Wireframing', 'Figma', 'Prototyping', 'Accessibility']
  },
  {
    id: 'meta-react-native',
    title: 'Meta React Native Mobile Specialist',
    issuer: 'Meta',
    date: 'Certified Jan 2024',
    credentialId: 'META-RN-481920',
    icon: 'Smartphone',
    verifyUrl: '#',
    skills: ['React Native', 'Mobile UI', 'Expo', 'iOS/Android Native']
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company: 'Vercel Ecosystem',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    content: 'Alex is a phenomenal engineer. His attention to detail on frosted glass micro-interactions and performance optimization was instrumental to our latest product launch!',
    timestamp: '2 hours ago',
    rating: 5
  },
  {
    id: '2',
    author: 'David Chen',
    role: 'Lead Designer',
    company: 'Stripe Product Team',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Working with Alex is an absolute joy. He translates complex Figma component tokens into clean, modular, and type-safe React code effortlessly.',
    timestamp: '1 day ago',
    rating: 5
  },
  {
    id: '3',
    author: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Lumina Analytics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'The dark minimalist UI Alex engineered for our real-time dashboard exceeded our highest expectations. Super fast and rock solid.',
    timestamp: '3 days ago',
    rating: 5
  }
];

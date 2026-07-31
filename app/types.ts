export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'game-dev' | 'full-stack' | 'systems' | 'ai-graphics';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  architectureDetails: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experienceYears: string;
    description: string;
    tags: string[];
  }[];
}

export interface TimelineMilestone {
  year: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  keyAchivements: string[];
  techUsed: string[];
  badge?: string;
}

export interface TechStackItem {
  name: string;
  category: 'frontend' | 'backend' | 'game' | 'devops';
  icon: string;
  highlight: string;
}

export type GeometryType = 'icosahedron' | 'cube' | 'torusKnot' | 'particles';

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
  highlights?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: number; // Optional self-assessment, 1-5
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'mobile' | 'web' | 'fullstack' | 'backend';
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  desktopUrl?: string;
  featured: boolean;
  highlights?: string[];
  role?: string;
  outcome?: string;
}

export interface Language {
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Professional working' | 'Conversational' | 'Basic';
}

export interface Reference {
  name: string;
  title: string;
  email: string;
  company?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  languages: Language[];
  references: Reference[];
}

// Shared TypeScript interfaces used by both server-side fetching (lib/fetchData.ts)
// and client components (Hero, BentoGrid, Skills, Projects, Certifications).
// Previously the Skill interface was duplicated in BentoGrid.tsx and Skills.tsx — fixed here.

export interface ProfileData {
  name: string;
  tagline: string;
  subtitle: string;
  aboutTitle: string;
  aboutBio: string;
  // All configured Typewriter Lines (admin → Profile → Typewriter Lines).
  // The Hero rotates through them continuously; falls back to [subtitle].
  typewriterLines?: string[];
  // projectsCount/toolsCount/experienceCount were removed from the UI
  // (fake-stat counters) — kept out of the type; Firestore may still hold
  // legacy values that are ignored by the frontend.
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Project {
  id: string;
  title: string;
  tools: string[];
  summary: string;
  description: string;
  themeColor: string;
  link?: string;
  image?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badgeId?: string;
  certificateUrl?: string;
  issueDate?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationDate: string;
  cgpa: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

// admin-portal/src/components/types.ts
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  summary?: string;
  tools?: string[];
  themeColor?: string;
  image?: string;
  link?: string;
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

export interface ProfileData {
  heroTitle: string;
  heroTagline: string;
  aboutTitle: string;
  aboutBio: string;
  typewriter?: string[];
}

export interface Toast {
  text: string;
  type: "success" | "error";
}

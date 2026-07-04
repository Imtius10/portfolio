export interface ProfileData {
  id: string;
  name: string;
  designation: string;
  tagline: string | null;
  bio: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  resumeUrl: string | null;
  photoUrl: string | null;
  socialLinks: SocialLink[];
  skills: SkillWithCategory[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
}

export interface SkillWithCategory {
  id: string;
  name: string;
  level: number;
  icon: string | null;
  category: {
    id: string;
    name: string;
  } | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  description: string | null;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date | string;
  endDate: Date | string | null;
  description: string | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string | null;
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  techStack: string[];
  challenges: string | null;
  improvements: string | null;
  featured: boolean;
  images: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

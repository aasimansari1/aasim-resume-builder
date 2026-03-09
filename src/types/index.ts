export interface ResumeData {
  _id?: string;
  userId: string;
  title: string;
  template: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  atsScore?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  jobTitle?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  plan: "free" | "pro";
  role: "user" | "admin";
  createdAt?: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPro: boolean;
}

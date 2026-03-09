import { ResumeData } from "@/types";

export function calculateATSScore(resume: ResumeData): number {
  let score = 0;

  // Personal Info completeness (20 points)
  const personalFields = ["fullName", "email", "phone", "location", "jobTitle"];
  const filledPersonal = personalFields.filter(
    (f) => resume.personalInfo[f as keyof typeof resume.personalInfo]
  ).length;
  score += (filledPersonal / personalFields.length) * 20;

  // Summary (15 points)
  if (resume.summary) {
    const wordCount = resume.summary.split(/\s+/).length;
    if (wordCount >= 30 && wordCount <= 100) score += 15;
    else if (wordCount >= 15) score += 10;
    else if (wordCount > 0) score += 5;
  }

  // Experience (25 points)
  if (resume.experience.length > 0) {
    score += Math.min(resume.experience.length * 5, 15);
    const hasBullets = resume.experience.some((e) => e.bullets.length > 0);
    if (hasBullets) score += 10;
  }

  // Education (15 points)
  if (resume.education.length > 0) {
    score += Math.min(resume.education.length * 7.5, 15);
  }

  // Skills (15 points)
  if (resume.skills.length > 0) {
    score += Math.min(resume.skills.length * 2, 15);
  }

  // Projects & Certifications (10 points)
  if (resume.projects.length > 0) score += 5;
  if (resume.certifications.length > 0) score += 5;

  return Math.min(Math.round(score), 100);
}

export function getATSSuggestions(resume: ResumeData): string[] {
  const suggestions: string[] = [];

  if (!resume.personalInfo.fullName) suggestions.push("Add your full name");
  if (!resume.personalInfo.email) suggestions.push("Add your email address");
  if (!resume.personalInfo.phone) suggestions.push("Add your phone number");
  if (!resume.personalInfo.jobTitle) suggestions.push("Add a target job title");
  if (!resume.summary) suggestions.push("Add a professional summary");
  if (resume.summary && resume.summary.split(/\s+/).length < 30)
    suggestions.push("Expand your summary to at least 30 words");
  if (resume.experience.length === 0) suggestions.push("Add work experience");
  if (resume.experience.some((e) => e.bullets.length === 0))
    suggestions.push("Add bullet points to your experience entries");
  if (resume.education.length === 0) suggestions.push("Add education details");
  if (resume.skills.length < 5) suggestions.push("Add at least 5 relevant skills");
  if (resume.skills.length === 0) suggestions.push("Add skills section");

  return suggestions;
}

import mongoose, { Schema, models } from "mongoose";

const ResumeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, default: "Untitled Resume" },
    template: { type: String, default: "professional" },
    personalInfo: {
      fullName: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
      jobTitle: { type: String, default: "" },
    },
    summary: { type: String, default: "" },
    experience: [
      {
        id: String,
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
        bullets: [String],
      },
    ],
    education: [
      {
        id: String,
        institution: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
        gpa: String,
      },
    ],
    skills: [String],
    projects: [
      {
        id: String,
        name: String,
        description: String,
        technologies: [String],
        link: String,
      },
    ],
    certifications: [
      {
        id: String,
        name: String,
        issuer: String,
        date: String,
        link: String,
      },
    ],
    atsScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Resume = models.Resume || mongoose.model("Resume", ResumeSchema);
export default Resume;

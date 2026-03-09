"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Save, Download, Eye, Edit3, ChevronLeft, Plus, Trash2, GripVertical, BarChart3, Sparkles, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import { ResumeData, Experience, Education, Project, Certification } from "@/types";
import { templates } from "@/lib/templates";
import { calculateATSScore, getATSSuggestions } from "@/lib/atsScorer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const defaultResume: ResumeData = {
  userId: "", title: "Untitled Resume", template: "professional",
  personalInfo: { fullName: "", email: "", phone: "", location: "", linkedin: "", website: "", jobTitle: "" },
  summary: "", experience: [], education: [], skills: [], projects: [], certifications: [],
};

function generateId() { return Math.random().toString(36).substring(2, 9); }

function BuilderContent() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const templateParam = searchParams.get("template");
  const previewRef = useRef<HTMLDivElement>(null);

  const [resume, setResume] = useState<ResumeData>({ ...defaultResume, template: templateParam || "professional" });
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [atsSuggestions, setAtsSuggestions] = useState<string[]>([]);
  const [showATS, setShowATS] = useState(false);

  useEffect(() => {
    if (resumeId) {
      fetch(`/api/resume/${resumeId}`).then(r => r.json()).then(data => { if (data && !data.error) setResume(data); }).catch(() => {});
    }
  }, [resumeId]);

  useEffect(() => { setAtsScore(calculateATSScore(resume)); setAtsSuggestions(getATSSuggestions(resume)); }, [resume]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const addExperience = () => {
    setResume(prev => ({ ...prev, experience: [...prev.experience, { id: generateId(), company: "", position: "", startDate: "", endDate: "", current: false, description: "", bullets: [""] }] }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    setResume(prev => { const u = [...prev.experience]; (u[index] as any)[field] = value; return { ...prev, experience: u }; });
  };

  const removeExperience = (index: number) => {
    setResume(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const addBullet = (expIndex: number) => {
    setResume(prev => { const u = [...prev.experience]; u[expIndex].bullets.push(""); return { ...prev, experience: u }; });
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    setResume(prev => { const u = [...prev.experience]; u[expIndex].bullets[bulletIndex] = value; return { ...prev, experience: u }; });
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    setResume(prev => { const u = [...prev.experience]; u[expIndex].bullets = u[expIndex].bullets.filter((_, i) => i !== bulletIndex); return { ...prev, experience: u }; });
  };

  const addEducation = () => {
    setResume(prev => ({ ...prev, education: [...prev.education, { id: generateId(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }] }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResume(prev => { const u = [...prev.education]; (u[index] as any)[field] = value; return { ...prev, education: u }; });
  };

  const removeEducation = (index: number) => {
    setResume(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setResume(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    setResume(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const addProject = () => {
    setResume(prev => ({ ...prev, projects: [...prev.projects, { id: generateId(), name: "", description: "", technologies: [], link: "" }] }));
  };

  const updateProject = (index: number, field: string, value: any) => {
    setResume(prev => { const u = [...prev.projects]; (u[index] as any)[field] = value; return { ...prev, projects: u }; });
  };

  const removeProject = (index: number) => {
    setResume(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const addCertification = () => {
    setResume(prev => ({ ...prev, certifications: [...prev.certifications, { id: generateId(), name: "", issuer: "", date: "", link: "" }] }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setResume(prev => { const u = [...prev.certifications]; (u[index] as any)[field] = value; return { ...prev, certifications: u }; });
  };

  const removeCertification = (index: number) => {
    setResume(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
  };

  const saveResume = async () => {
    setSaving(true);
    try {
      const method = resumeId ? "PUT" : "POST";
      const url = resumeId ? `/api/resume/${resumeId}` : "/api/resume";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...resume, atsScore }) });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error); }
      toast.success("Resume saved!");
    } catch (error: any) { toast.error(error.message || "Failed to save"); }
    finally { setSaving(false); }
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    toast.loading("Generating PDF...", { id: "pdf" });
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.personalInfo.fullName || "resume"}.pdf`);
      toast.success("PDF downloaded!", { id: "pdf" });
    } catch { toast.error("Failed to generate PDF", { id: "pdf" }); }
  };

  const sections = [
    { id: "personal", label: "Personal Info" }, { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" }, { id: "education", label: "Education" },
    { id: "skills", label: "Skills" }, { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" }, { id: "template", label: "Template" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Toolbar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600" /></a>
            <input type="text" value={resume.title} onChange={(e) => setResume(prev => ({ ...prev, title: e.target.value }))} className="text-lg font-semibold text-secondary bg-transparent border-none outline-none focus:ring-0 w-48 sm:w-auto" placeholder="Resume title" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowATS(!showATS)} className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${showATS ? "bg-primary-50 text-primary-700" : "hover:bg-gray-100 text-gray-600"}`}>
              <BarChart3 className="w-4 h-4" /> ATS: {atsScore}%
            </button>
            <button onClick={() => setShowPreview(!showPreview)} className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              {showPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? "Edit" : "Preview"}
            </button>
            <button onClick={saveResume} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-60">
              <Save className="w-4 h-4" /><span className="hidden sm:inline">{saving ? "Saving..." : "Save"}</span>
            </button>
            <button onClick={downloadPDF} className="btn-primary !py-2 !px-4 text-sm flex items-center gap-1.5">
              <Download className="w-4 h-4" /><span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Editor */}
        <div className={`w-full lg:w-1/2 ${showPreview ? "hidden lg:block" : ""}`}>
          <div className="sticky top-[128px] z-30 bg-gray-50 border-b border-gray-200 overflow-x-auto">
            <div className="flex px-4">
              {sections.map(section => (
                <button key={section.id} onClick={() => setActiveSection(section.id)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeSection === section.id ? "border-primary-600 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 max-w-2xl">
            {/* ATS Panel */}
            {showATS && (
              <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-secondary flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary-600" /> ATS Score</h3>
                  <span className={`text-2xl font-bold ${atsScore >= 80 ? "text-green-600" : atsScore >= 50 ? "text-yellow-600" : "text-red-600"}`}>{atsScore}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div className={`h-2 rounded-full transition-all duration-500 ${atsScore >= 80 ? "bg-green-500" : atsScore >= 50 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${atsScore}%` }} />
                </div>
                {atsSuggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase">Suggestions</p>
                    {atsSuggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600"><Sparkles className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />{s}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Personal Info */}
            {activeSection === "personal" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-secondary">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value={resume.personalInfo.fullName} onChange={e => updatePersonalInfo("fullName", e.target.value)} className="input-field" placeholder="John Doe" />
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label><input type="text" value={resume.personalInfo.jobTitle || ""} onChange={e => updatePersonalInfo("jobTitle", e.target.value)} className="input-field" placeholder="Software Engineer" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={resume.personalInfo.email} onChange={e => updatePersonalInfo("email", e.target.value)} className="input-field" placeholder="john@example.com" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={resume.personalInfo.phone} onChange={e => updatePersonalInfo("phone", e.target.value)} className="input-field" placeholder="+1 (555) 000-0000" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input type="text" value={resume.personalInfo.location} onChange={e => updatePersonalInfo("location", e.target.value)} className="input-field" placeholder="San Francisco, CA" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label><input type="text" value={resume.personalInfo.linkedin || ""} onChange={e => updatePersonalInfo("linkedin", e.target.value)} className="input-field" placeholder="linkedin.com/in/johndoe" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Website</label><input type="text" value={resume.personalInfo.website || ""} onChange={e => updatePersonalInfo("website", e.target.value)} className="input-field" placeholder="johndoe.com" /></div>
                </div>
              </div>
            )}

            {/* Summary */}
            {activeSection === "summary" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-secondary">Professional Summary</h2>
                <textarea value={resume.summary} onChange={e => setResume(prev => ({ ...prev, summary: e.target.value }))} className="input-field min-h-[150px] resize-y" placeholder="Write a brief professional summary..." rows={6} />
                <p className="text-xs text-gray-400">{resume.summary.split(/\s+/).filter(Boolean).length} words (recommended: 30-100)</p>
              </div>
            )}

            {/* Experience */}
            {activeSection === "experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-secondary">Work Experience</h2>
                  <button onClick={addExperience} className="btn-secondary text-sm !py-2 !px-3 flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>
                </div>
                {resume.experience.map((exp, expIdx) => (
                  <div key={exp.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 text-gray-400"><GripVertical className="w-5 h-5 cursor-grab" /><span className="text-sm font-medium">Experience {expIdx + 1}</span></div>
                      <button onClick={() => removeExperience(expIdx)} className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Position</label><input type="text" value={exp.position} onChange={e => updateExperience(expIdx, "position", e.target.value)} className="input-field" placeholder="Software Engineer" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input type="text" value={exp.company} onChange={e => updateExperience(expIdx, "company", e.target.value)} className="input-field" placeholder="Google" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input type="text" value={exp.startDate} onChange={e => updateExperience(expIdx, "startDate", e.target.value)} className="input-field" placeholder="Jan 2022" /></div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input type="text" value={exp.endDate} onChange={e => updateExperience(expIdx, "endDate", e.target.value)} className="input-field" placeholder="Present" disabled={exp.current} />
                        <label className="flex items-center gap-2 mt-1.5 text-sm text-gray-600">
                          <input type="checkbox" checked={exp.current} onChange={e => updateExperience(expIdx, "current", e.target.checked)} className="rounded border-gray-300 text-primary-600" /> Currently working here
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bullet Points</label>
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 mb-2">
                          <span className="text-gray-300 text-sm">&bull;</span>
                          <input type="text" value={bullet} onChange={e => updateBullet(expIdx, bIdx, e.target.value)} className="input-field text-sm" placeholder="Describe your achievement..." />
                          <button onClick={() => removeBullet(expIdx, bIdx)} className="p-1 text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                      <button onClick={() => addBullet(expIdx)} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mt-1"><Plus className="w-3 h-3" /> Add bullet</button>
                    </div>
                  </div>
                ))}
                {resume.experience.length === 0 && <p className="text-center text-gray-400 py-8">No experience added yet. Click &quot;Add&quot; to get started.</p>}
              </div>
            )}

            {/* Education */}
            {activeSection === "education" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-secondary">Education</h2>
                  <button onClick={addEducation} className="btn-secondary text-sm !py-2 !px-3 flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>
                </div>
                {resume.education.map((edu, idx) => (
                  <div key={edu.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-gray-400">Education {idx + 1}</span>
                      <button onClick={() => removeEducation(idx)} className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Institution</label><input type="text" value={edu.institution} onChange={e => updateEducation(idx, "institution", e.target.value)} className="input-field" placeholder="MIT" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Degree</label><input type="text" value={edu.degree} onChange={e => updateEducation(idx, "degree", e.target.value)} className="input-field" placeholder="Bachelor of Science" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label><input type="text" value={edu.field} onChange={e => updateEducation(idx, "field", e.target.value)} className="input-field" placeholder="Computer Science" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input type="text" value={edu.startDate} onChange={e => updateEducation(idx, "startDate", e.target.value)} className="input-field" placeholder="2018" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">End Date</label><input type="text" value={edu.endDate} onChange={e => updateEducation(idx, "endDate", e.target.value)} className="input-field" placeholder="2022" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">GPA (optional)</label><input type="text" value={edu.gpa || ""} onChange={e => updateEducation(idx, "gpa", e.target.value)} className="input-field" placeholder="3.8" /></div>
                    </div>
                  </div>
                ))}
                {resume.education.length === 0 && <p className="text-center text-gray-400 py-8">No education added yet.</p>}
              </div>
            )}

            {/* Skills */}
            {activeSection === "skills" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-secondary">Skills</h2>
                <div className="flex gap-2">
                  <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill()} className="input-field flex-1" placeholder="Type a skill and press Enter" />
                  <button onClick={addSkill} className="btn-primary !py-2 !px-4 text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                      {skill} <button onClick={() => removeSkill(idx)} className="hover:text-red-600"><X className="w-3.5 h-3.5" /></button>
                    </span>
                  ))}
                </div>
                {resume.skills.length === 0 && <p className="text-sm text-gray-400">Add at least 5 relevant skills for best ATS results.</p>}
              </div>
            )}

            {/* Projects */}
            {activeSection === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-secondary">Projects</h2>
                  <button onClick={addProject} className="btn-secondary text-sm !py-2 !px-3 flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>
                </div>
                {resume.projects.map((proj, idx) => (
                  <div key={proj.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-gray-400">Project {idx + 1}</span>
                      <button onClick={() => removeProject(idx)} className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label><input type="text" value={proj.name} onChange={e => updateProject(idx, "name", e.target.value)} className="input-field" placeholder="My Project" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label><input type="text" value={proj.link || ""} onChange={e => updateProject(idx, "link", e.target.value)} className="input-field" placeholder="github.com/..." /></div>
                      <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={proj.description} onChange={e => updateProject(idx, "description", e.target.value)} className="input-field min-h-[80px]" placeholder="Describe the project..." /></div>
                      <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label><input type="text" value={proj.technologies.join(", ")} onChange={e => updateProject(idx, "technologies", e.target.value.split(",").map((t: string) => t.trim()))} className="input-field" placeholder="React, Node.js, MongoDB" /></div>
                    </div>
                  </div>
                ))}
                {resume.projects.length === 0 && <p className="text-center text-gray-400 py-8">No projects added yet.</p>}
              </div>
            )}

            {/* Certifications */}
            {activeSection === "certifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-secondary">Certifications</h2>
                  <button onClick={addCertification} className="btn-secondary text-sm !py-2 !px-3 flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>
                </div>
                {resume.certifications.map((cert, idx) => (
                  <div key={cert.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-gray-400">Certification {idx + 1}</span>
                      <button onClick={() => removeCertification(idx)} className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" value={cert.name} onChange={e => updateCertification(idx, "name", e.target.value)} className="input-field" placeholder="AWS Solutions Architect" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label><input type="text" value={cert.issuer} onChange={e => updateCertification(idx, "issuer", e.target.value)} className="input-field" placeholder="Amazon" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="text" value={cert.date} onChange={e => updateCertification(idx, "date", e.target.value)} className="input-field" placeholder="2023" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label><input type="text" value={cert.link || ""} onChange={e => updateCertification(idx, "link", e.target.value)} className="input-field" placeholder="credential URL" /></div>
                    </div>
                  </div>
                ))}
                {resume.certifications.length === 0 && <p className="text-center text-gray-400 py-8">No certifications added yet.</p>}
              </div>
            )}

            {/* Template Switcher */}
            {activeSection === "template" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-secondary">Choose Template</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {templates.map(tmpl => (
                    <button key={tmpl.id} onClick={() => setResume(prev => ({ ...prev, template: tmpl.id }))} className={`relative rounded-xl border-2 p-3 transition-all ${resume.template === tmpl.id ? "border-primary-600 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className="aspect-[3/4] bg-white rounded-lg shadow-sm mb-2 flex items-center justify-center">
                        <div className="w-full p-2 space-y-1">
                          <div className="h-1.5 bg-secondary rounded w-2/3 mx-auto" />
                          <div className="h-1 bg-gray-200 rounded w-1/2 mx-auto" />
                          <div className="h-px bg-gray-200 my-1" />
                          <div className="h-1 bg-gray-200 rounded w-full" />
                          <div className="h-1 bg-gray-200 rounded w-5/6" />
                        </div>
                      </div>
                      <p className="text-xs font-medium text-secondary">{tmpl.name}</p>
                      {resume.template === tmpl.id && <div className="absolute top-2 right-2 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                      {tmpl.isPro && <span className="absolute top-2 left-2 text-[10px] bg-secondary text-white px-1.5 py-0.5 rounded font-medium">PRO</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className={`w-full lg:w-1/2 lg:border-l border-gray-200 bg-gray-100 min-h-screen ${!showPreview ? "hidden lg:block" : ""}`}>
          <div className="sticky top-[128px] p-6 overflow-auto" style={{ maxHeight: "calc(100vh - 128px)" }}>
            <div ref={previewRef} className="bg-white shadow-lg mx-auto resume-preview" style={{ maxWidth: "595px", minHeight: "842px", padding: "40px" }}>
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{resume.personalInfo.fullName || "Your Name"}</h1>
                {resume.personalInfo.jobTitle && <p className="text-sm text-primary-600 font-medium mt-0.5">{resume.personalInfo.jobTitle}</p>}
                <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-600">
                  {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
                  {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
                  {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
                  {resume.personalInfo.linkedin && <span>{resume.personalInfo.linkedin}</span>}
                  {resume.personalInfo.website && <span>{resume.personalInfo.website}</span>}
                </div>
              </div>

              {resume.summary && (
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
                  <p className="text-xs text-gray-700 leading-relaxed">{resume.summary}</p>
                </div>
              )}

              {resume.experience.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">Experience</h2>
                  {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-gray-900">{exp.position || "Position"}</h3>
                        <span className="text-[10px] text-gray-500">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                      </div>
                      <p className="text-xs text-gray-600 italic">{exp.company}</p>
                      {exp.bullets.filter(Boolean).length > 0 && (
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                          {exp.bullets.filter(Boolean).map((b, i) => <li key={i} className="text-xs text-gray-700">{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {resume.education.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">Education</h2>
                  {resume.education.map(edu => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                        <span className="text-[10px] text-gray-500">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="text-xs text-gray-600">{edu.institution}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
                    </div>
                  ))}
                </div>
              )}

              {resume.skills.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.skills.map((skill, i) => <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{skill}</span>)}
                  </div>
                </div>
              )}

              {resume.projects.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">Projects</h2>
                  {resume.projects.map(proj => (
                    <div key={proj.id} className="mb-2">
                      <h3 className="text-xs font-bold text-gray-900">{proj.name}{proj.link && <span className="font-normal text-primary-600 ml-1">({proj.link})</span>}</h3>
                      <p className="text-xs text-gray-700">{proj.description}</p>
                      {proj.technologies.filter(Boolean).length > 0 && <p className="text-[10px] text-gray-500 mt-0.5">Tech: {proj.technologies.filter(Boolean).join(", ")}</p>}
                    </div>
                  ))}
                </div>
              )}

              {resume.certifications.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">Certifications</h2>
                  {resume.certifications.map(cert => (
                    <div key={cert.id} className="mb-1.5">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-gray-900">{cert.name}</h3>
                        <span className="text-[10px] text-gray-500">{cert.date}</span>
                      </div>
                      <p className="text-xs text-gray-600">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              )}

              {!resume.personalInfo.fullName && !resume.summary && resume.experience.length === 0 && resume.education.length === 0 && resume.skills.length === 0 && (
                <div className="flex items-center justify-center h-[600px] text-gray-300">
                  <div className="text-center"><Edit3 className="w-12 h-12 mx-auto mb-3" /><p className="text-sm">Start editing to see your resume preview</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full" />
        </div>
      </main>
    }>
      <BuilderContent />
    </Suspense>
  );
}

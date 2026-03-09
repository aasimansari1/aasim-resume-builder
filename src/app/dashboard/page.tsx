"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Download, Trash2, Edit3, MoreVertical, Search, BarChart3, Crown } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";

interface Resume {
  _id: string;
  title: string;
  template: string;
  updatedAt: string;
  atsScore: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => { fetchResumes(); }, []);

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/resume");
      if (res.ok) setResumes(await res.json());
    } catch { toast.error("Failed to load resumes"); }
    finally { setLoading(false); }
  };

  const createResume = async () => {
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled Resume" }),
      });
      if (!res.ok) { const data = await res.json(); toast.error(data.error); return; }
      const resume = await res.json();
      router.push(`/builder?id=${resume._id}`);
    } catch { toast.error("Failed to create resume"); }
  };

  const deleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      const res = await fetch(`/api/resume/${id}`, { method: "DELETE" });
      if (res.ok) { setResumes(resumes.filter((r) => r._id !== id)); toast.success("Resume deleted"); }
    } catch { toast.error("Failed to delete resume"); }
    setActiveMenu(null);
  };

  const filteredResumes = resumes.filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (<div key={i} className="h-48 bg-gray-200 rounded-xl" />))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary font-display">My Resumes</h1>
            <p className="text-gray-500 text-sm mt-1">{session?.user?.name ? `Welcome back, ${session.user.name.split(" ")[0]}` : "Manage your resumes"}</p>
          </div>
          <div className="flex items-center gap-3">
            {(session?.user as any)?.plan === "free" && (
              <Link href="/pricing" className="flex items-center gap-1.5 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg font-medium hover:bg-amber-100 transition-colors">
                <Crown className="w-4 h-4" /> Upgrade to Pro
              </Link>
            )}
            <button onClick={createResume} className="btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Resume
            </button>
          </div>
        </div>

        {resumes.length > 0 && (
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search resumes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field !pl-11" />
          </div>
        )}

        {filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <div key={resume._id} className="card p-0 overflow-hidden group">
                <div className="aspect-[3/4] bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex items-center justify-center relative">
                  <div className="w-full max-w-[140px] bg-white rounded-lg shadow-sm p-3 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center mb-2">
                      <div className="h-2 bg-secondary rounded w-2/3 mx-auto mb-0.5" />
                      <div className="h-1 bg-gray-300 rounded w-1/2 mx-auto" />
                    </div>
                    <div className="h-px bg-gray-200 my-1.5" />
                    <div className="space-y-1">
                      <div className="h-1 bg-primary-200 rounded w-1/3" />
                      <div className="h-0.5 bg-gray-200 rounded w-full" />
                      <div className="h-0.5 bg-gray-200 rounded w-5/6" />
                      <div className="h-0.5 bg-gray-200 rounded w-4/6" />
                    </div>
                  </div>

                  {resume.atsScore > 0 && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                      <BarChart3 className="w-3 h-3 text-primary-600" />
                      <span className="text-primary-700">{resume.atsScore}%</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <button onClick={() => setActiveMenu(activeMenu === resume._id ? null : resume._id)} className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    {activeMenu === resume._id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <Link href={`/builder?id=${resume._id}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"><Edit3 className="w-4 h-4" /> Edit</Link>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"><Download className="w-4 h-4" /> Download PDF</button>
                        <hr className="my-1" />
                        <button onClick={() => deleteResume(resume._id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"><Trash2 className="w-4 h-4" /> Delete</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100">
                  <h3 className="font-semibold text-secondary text-sm truncate">{resume.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400 capitalize">{resume.template} template</span>
                    <span className="text-xs text-gray-400">{new Date(resume.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary mb-2">No resumes yet</h3>
            <p className="text-gray-500 mb-6">Create your first resume to get started</p>
            <button onClick={createResume} className="btn-primary"><Plus className="w-4 h-4 inline mr-2" />Create My First Resume</button>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  }, []);

  const validateAndSetFile = (file: File) => {
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type)) { toast.error("Only PDF and DOCX files are allowed"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("File size must be less than 5MB"); return; }
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error); }
      toast.success("Resume uploaded and parsed!");
      router.push("/builder");
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-secondary font-display mb-3">Upload Your Resume</h1>
          <p className="text-gray-600">Upload your existing resume and we&apos;ll convert it to a professional template</p>
        </div>

        <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${dragOver ? "border-primary-500 bg-primary-50" : file ? "border-green-300 bg-green-50" : "border-gray-300 bg-white hover:border-primary-300 hover:bg-gray-50"}`}>
          {file ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <div>
                <p className="font-semibold text-secondary">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 mx-auto">
                <X className="w-4 h-4" /> Remove
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-secondary font-medium">Drag and drop your resume here</p>
                <p className="text-sm text-gray-500 mt-1">or click to browse</p>
              </div>
              <input type="file" accept=".pdf,.docx" onChange={(e) => { if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]); }} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="inline-block btn-secondary cursor-pointer text-sm">Browse Files</label>
              <p className="text-xs text-gray-400">PDF or DOCX, max 5MB</p>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-6 flex gap-3 justify-center">
            <button onClick={handleUpload} disabled={uploading} className="btn-primary disabled:opacity-60">
              {uploading ? "Processing..." : "Upload & Parse Resume"}
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Or{" "}<a href="/builder" className="text-primary-600 font-medium hover:text-primary-700">start from scratch</a></p>
        </div>
      </div>
    </main>
  );
}

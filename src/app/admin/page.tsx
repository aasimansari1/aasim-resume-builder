"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Users, FileText, Crown, TrendingUp, Search, Shield } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

interface AdminData {
  stats: { totalUsers: number; proUsers: number; freeUsers: number; totalResumes: number };
  recentUsers: Array<{ _id: string; name: string; email: string; plan: string; role: string; createdAt: string }>;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/auth/login"); }, [status, router]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin");
        if (res.ok) setData(await res.json());
        else if (res.status === 403) router.push("/dashboard");
      } catch {} finally { setLoading(false); }
    })();
  }, [router]);

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}</div>
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary">Access Denied</h2>
          <p className="text-gray-500 mt-2">You don&apos;t have admin privileges.</p>
        </div>
      </main>
    );
  }

  const stats = [
    { label: "Total Users", value: data.stats.totalUsers, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Pro Users", value: data.stats.proUsers, icon: Crown, color: "bg-amber-50 text-amber-600" },
    { label: "Free Users", value: data.stats.freeUsers, icon: Users, color: "bg-green-50 text-green-600" },
    { label: "Total Resumes", value: data.stats.totalResumes, icon: FileText, color: "bg-purple-50 text-purple-600" },
  ];

  const filteredUsers = data.recentUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl font-bold text-secondary font-display">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage users, templates, and analytics</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="card overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-semibold text-secondary">Recent Users</h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field !pl-9 !py-2 text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-semibold text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-secondary">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.plan === "pro" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}`}>
                        {user.plan === "pro" && <Crown className="w-3 h-3 mr-1" />}{user.plan}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{user.role}</span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && <div className="text-center py-8 text-gray-500 text-sm">No users found</div>}
        </div>
      </div>
    </main>
  );
}

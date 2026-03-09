"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, FileText, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary">
              Aasim <span className="text-primary-600">Resume</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">Features</Link>
            <Link href="/#templates" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">Templates</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-semibold text-sm">{session.user?.name?.charAt(0) || "U"}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{session.user?.name?.split(" ")[0]}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                    <Link href="/builder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>Create Resume</Link>
                    <hr className="my-1" />
                    <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors px-4 py-2">Log in</Link>
                <Link href="/auth/signup" className="btn-primary text-sm !py-2.5 !px-5">Get Started Free</Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <Link href="/#features" className="px-3 py-2 text-gray-600 hover:text-primary-600 text-sm font-medium" onClick={() => setMobileOpen(false)}>Features</Link>
              <Link href="/#templates" className="px-3 py-2 text-gray-600 hover:text-primary-600 text-sm font-medium" onClick={() => setMobileOpen(false)}>Templates</Link>
              <Link href="/pricing" className="px-3 py-2 text-gray-600 hover:text-primary-600 text-sm font-medium" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <hr />
              {session ? (
                <>
                  <Link href="/dashboard" className="px-3 py-2 text-gray-600 text-sm font-medium" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => signOut()} className="px-3 py-2 text-left text-red-600 text-sm font-medium">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="px-3 py-2 text-gray-600 text-sm font-medium" onClick={() => setMobileOpen(false)}>Log in</Link>
                  <Link href="/auth/signup" className="btn-primary text-sm text-center" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">AI-Powered Resume Builder</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary leading-tight tracking-tight font-display">
            Build a Professional
            <br />
            <span className="gradient-text">Resume in Minutes</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create ATS-friendly resumes with Aasim Resume Builder. Professional templates, AI suggestions, and instant PDF download.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder" className="btn-primary text-base flex items-center gap-2 !px-8 !py-4">
              Create My Resume <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#templates" className="btn-secondary text-base !px-8 !py-4">View Templates</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 font-medium">4.9/5 rating</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <span>Trusted by 10,000+ job seekers</span>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <span>Free to start</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-1">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block bg-white px-4 py-1 rounded-md text-xs text-gray-400">technobites.tech/builder</div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 border-r border-gray-100">
                  <div className="space-y-4">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-10 bg-gray-100 rounded-lg w-full" />
                    <div className="h-10 bg-gray-100 rounded-lg w-full" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-10 bg-gray-100 rounded-lg" />
                      <div className="h-10 bg-gray-100 rounded-lg" />
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mt-6" />
                    <div className="h-20 bg-gray-100 rounded-lg w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/4 mt-6" />
                    <div className="h-10 bg-gray-100 rounded-lg w-full" />
                    <div className="h-10 bg-gray-100 rounded-lg w-full" />
                  </div>
                </div>
                <div className="p-8 bg-gray-50">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="text-center mb-4">
                      <div className="h-5 bg-secondary rounded w-2/3 mx-auto mb-2" />
                      <div className="h-2.5 bg-gray-300 rounded w-1/2 mx-auto" />
                      <div className="h-2 bg-gray-200 rounded w-2/3 mx-auto mt-1" />
                    </div>
                    <div className="h-px bg-gray-200 my-4" />
                    <div className="space-y-3">
                      <div className="h-3 bg-primary-200 rounded w-1/4" />
                      <div className="h-2 bg-gray-200 rounded w-full" />
                      <div className="h-2 bg-gray-200 rounded w-5/6" />
                      <div className="h-2 bg-gray-200 rounded w-4/6" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="h-3 bg-primary-200 rounded w-1/3" />
                      <div className="h-2 bg-gray-200 rounded w-full" />
                      <div className="h-2 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="h-3 bg-primary-200 rounded w-1/5" />
                      <div className="flex flex-wrap gap-1.5">
                        <div className="h-5 bg-primary-50 rounded-full w-16" />
                        <div className="h-5 bg-primary-50 rounded-full w-20" />
                        <div className="h-5 bg-primary-50 rounded-full w-14" />
                        <div className="h-5 bg-primary-50 rounded-full w-18" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

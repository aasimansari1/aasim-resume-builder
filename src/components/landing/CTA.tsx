"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-600 rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display mb-6">
          Land Your Dream Job<br /><span className="text-primary-400">Faster</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of successful job seekers who built their winning resumes with Aasim Resume Builder. Start for free today.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <Link href="/builder" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-600/25">
            Create My Resume Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

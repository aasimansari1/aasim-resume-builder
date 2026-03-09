"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Download, Edit3, BarChart3, Zap } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Resume Suggestions", description: "Get intelligent suggestions for bullet points, skills, and summary to make your resume stand out." },
  { icon: Shield, title: "ATS Optimized Templates", description: "All templates are tested against major ATS systems to ensure your resume gets through." },
  { icon: Download, title: "Instant PDF Download", description: "Download your polished resume as a perfectly formatted PDF with one click." },
  { icon: Edit3, title: "Easy Editing", description: "Intuitive drag-and-drop editor. Add, remove, and reorder sections effortlessly." },
  { icon: BarChart3, title: "Resume Score", description: "Get an ATS compatibility score and actionable tips to improve your resume." },
  { icon: Zap, title: "Lightning Fast", description: "Build a complete professional resume in under 10 minutes with our streamlined process." },
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-600 font-semibold text-sm mb-3">POWERFUL FEATURES</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-secondary font-display">
            Everything You Need to Build<br />the Perfect Resume
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card p-6 group">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Upload, Edit3, Download } from "lucide-react";

const steps = [
  { icon: Upload, step: "01", title: "Upload or Start Fresh", description: "Upload your existing resume or start from scratch with our easy-to-use builder." },
  { icon: Edit3, step: "02", title: "Edit Using Templates", description: "Choose from professional templates and customize every section with our intuitive editor." },
  { icon: Download, step: "03", title: "Download PDF", description: "Download your polished, ATS-optimized resume as a perfectly formatted PDF." },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-600 font-semibold text-sm mb-3">HOW IT WORKS</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-secondary font-display">
            Three Simple Steps to<br />Your Perfect Resume
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-primary-200" />
              )}
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
                <step.icon className="w-10 h-10 text-primary-600" />
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{step.step}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

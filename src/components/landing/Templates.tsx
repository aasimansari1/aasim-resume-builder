"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";
import { templates } from "@/lib/templates";

export default function Templates() {
  return (
    <section id="templates" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-600 font-semibold text-sm mb-3">RESUME TEMPLATES</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-secondary font-display">
            Professional Templates<br />That Get You Hired
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group card overflow-hidden">
              <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-[200px] bg-white rounded-lg shadow-md p-4 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center mb-3">
                    <div className="h-3 bg-secondary rounded w-2/3 mx-auto mb-1" />
                    <div className="h-1.5 bg-gray-300 rounded w-1/2 mx-auto" />
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-primary-200 rounded w-1/3" />
                    <div className="h-1 bg-gray-200 rounded w-full" />
                    <div className="h-1 bg-gray-200 rounded w-5/6" />
                    <div className="h-1 bg-gray-200 rounded w-4/6" />
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 bg-primary-200 rounded w-1/4" />
                    <div className="h-1 bg-gray-200 rounded w-full" />
                    <div className="h-1 bg-gray-200 rounded w-3/4" />
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 bg-primary-200 rounded w-1/5" />
                    <div className="flex gap-1">
                      <div className="h-2.5 bg-primary-50 rounded-full w-8" />
                      <div className="h-2.5 bg-primary-50 rounded-full w-10" />
                      <div className="h-2.5 bg-primary-50 rounded-full w-7" />
                    </div>
                  </div>
                </div>
                {template.isPro && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3" /> PRO
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-gray-100">
                <h3 className="font-semibold text-secondary">{template.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                <Link href={`/builder?template=${template.id}`} className="mt-3 inline-block text-sm text-primary-600 font-medium hover:text-primary-700">
                  Use this template &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

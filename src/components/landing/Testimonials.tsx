"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "Software Engineer", content: "Aasim Resume Builder helped me create a resume that actually got callbacks. The ATS score feature was incredibly helpful in optimizing my resume.", rating: 5 },
  { name: "James Morrison", role: "Marketing Manager", content: "I went from zero interviews to three in one week after using this builder. The templates are modern and the AI suggestions saved me hours.", rating: 5 },
  { name: "Priya Patel", role: "Recent Graduate", content: "As a fresh graduate, I had no idea how to format a resume. This tool made it so easy. I got my first job within two weeks of using it!", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-600 font-semibold text-sm mb-3">TESTIMONIALS</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-secondary font-display">
            Loved by Job Seekers<br />Everywhere
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card p-6">
              <Quote className="w-8 h-8 text-primary-100 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-secondary text-sm">{testimonial.name}</p>
                <p className="text-gray-500 text-xs">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

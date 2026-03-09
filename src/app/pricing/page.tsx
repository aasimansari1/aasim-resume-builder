"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const plans = [
  {
    name: "Free", price: "$0", period: "forever", description: "Perfect for getting started",
    features: ["1 resume", "3 basic templates", "PDF download", "ATS score checker", "Basic editing tools"],
    cta: "Get Started Free", href: "/auth/signup", popular: false,
  },
  {
    name: "Pro", price: "$9", period: "/month", description: "Everything you need to land your dream job",
    features: ["Unlimited resumes", "All 6+ premium templates", "AI resume suggestions", "AI bullet point improvement", "Resume keyword suggestions", "Priority ATS optimization", "Cover letter builder", "Priority support"],
    cta: "Start Pro Trial", href: "/auth/signup?plan=pro", popular: true,
  },
];

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary-600 font-semibold text-sm mb-3">PRICING</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-secondary font-display mb-4">Simple, Transparent Pricing</motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600 text-lg">Start for free. Upgrade when you need more.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }}
                className={`relative rounded-2xl p-8 ${plan.popular ? "bg-secondary text-white ring-2 ring-primary-600 shadow-xl" : "bg-white border border-gray-200 shadow-sm"}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" /> MOST POPULAR
                  </div>
                )}
                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "text-white" : "text-secondary"}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-secondary"}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-primary-400" : "text-primary-600"}`} />
                      <span className={plan.popular ? "text-gray-300" : "text-gray-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.popular ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25" : "bg-gray-100 text-secondary hover:bg-gray-200"}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

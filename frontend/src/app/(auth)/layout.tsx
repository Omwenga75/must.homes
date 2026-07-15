"use client";

import { motion } from "framer-motion";
import { Home, Star, Users, Building2, Shield, Award } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Building2, value: "500+", label: "Listed Houses" },
  { icon: Users, value: "2,400+", label: "Happy Students" },
  { icon: Home, value: "14", label: "Estates Covered" },
  { icon: Star, value: "4.8", label: "Average Rating" },
];

const quotes = [
  {
    text: "Finding my room near MUST was so easy with MUST HOMES. I moved in within 3 days!",
    author: "Aisha K.",
    course: "Computer Science, Year 2",
  },
  {
    text: "The verified listings gave me peace of mind. No more scams or disappointments.",
    author: "Brian M.",
    course: "Engineering, Year 3",
  },
  {
    text: "I love how I can filter by amenities. Found a place with WiFi and a parking spot!",
    author: "Fatuma A.",
    course: "Business, Year 1",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative column */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden bg-[#0F172A] flex-col justify-between p-12">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#2563EB]/30 blur-[100px] animate-pulse" />
          <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-[#10B981]/20 blur-[100px] animate-pulse delay-1000" />
          <div className="absolute -bottom-40 left-1/4 w-[450px] h-[450px] rounded-full bg-[#2563EB]/20 blur-[100px] animate-pulse delay-500" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">
                MUST{" "}
                <span className="text-[#2563EB]">HOMES</span>
              </span>
              <p className="text-white/40 text-xs">Student Housing Platform</p>
            </div>
          </motion.div>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              Your Perfect{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">
                Student Home
              </span>{" "}
              Awaits
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Discover verified, affordable accommodation near Meru University of Science and Technology. No middlemen, no hidden fees.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 mb-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">{stat.value}</div>
                  <div className="text-white/50 text-xs">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Rotating testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
              &ldquo;{quotes[0].text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white text-xs font-bold">
                {quotes[0].author.charAt(0)}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{quotes[0].author}</div>
                <div className="text-white/40 text-xs">{quotes[0].course}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom badges */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Shield className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Verified Listings</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Award className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Trusted Platform</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form column */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-[#0F172A] dark:via-slate-900 dark:to-slate-900 overflow-auto">
        {/* Mobile header */}
        <div className="lg:hidden px-6 pt-6 pb-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#0F172A] dark:text-white font-bold text-lg tracking-tight">
              MUST <span className="text-[#2563EB]">HOMES</span>
            </span>
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}

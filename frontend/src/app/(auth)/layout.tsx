"use client";

import { Home } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#f0fbf5]">
      {/* Left Column - Lively Content */}
      <div className="hidden lg:flex lg:flex-1 flex-col bg-white relative overflow-hidden">

        {/* Logo */}
        <div className="absolute top-8 left-12 xl:left-16 z-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#01452c] flex items-center justify-center shadow-md">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#01452c] font-extrabold text-2xl tracking-tight">
              MUST HOMES
            </span>
          </Link>
        </div>

        {/* Image collage — top right */}
        <div className="absolute top-0 right-0 w-[55%] h-[58%] pointer-events-none z-10">
          {/* Main big image */}
          <div className="absolute top-10 right-8 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl rotate-3 bg-white p-1.5">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
              alt="Modern Apartment"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Floating Emoji 1 */}
          <div
            className="absolute top-6 left-4 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-2xl animate-bounce z-20"
            style={{ animationDuration: "3s" }}
          >
            🏠
          </div>

          {/* Floating badge */}
          <div className="absolute bottom-4 right-6 bg-[#01452c] text-white text-xs font-bold px-3 py-2 rounded-full shadow-xl z-20 flex items-center gap-1">
            ✓ Verified
          </div>
        </div>

        {/* Text — bottom half, fully visible */}
        <div className="absolute bottom-0 left-0 w-full px-12 xl:px-16 pb-16 z-20">
          <h1 className="text-5xl xl:text-6xl font-bold text-[#01452c] leading-[1.1] mb-5 tracking-tight">
            Find your <br />
            <span className="text-emerald-500">perfect room</span> <br />
            near campus.
          </h1>
          <p className="text-lg text-[#2a6650]/70 font-medium leading-relaxed max-w-sm">
            Connect with verified landlords, read student reviews, and book your home instantly.
          </p>
        </div>

        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] -z-0 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-50 rounded-full blur-[120px] -z-0 -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-[#f0fbf5]">

        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#01452c] flex items-center justify-center shadow-md">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#01452c] font-extrabold text-xl tracking-tight">
              MUST HOMES
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[400px] bg-white rounded-xl shadow-xl shadow-emerald-900/10 p-8 border border-emerald-100">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#f0f2f5]">
      {/* Left Column - Lively Content */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-center px-12 xl:px-24 bg-white relative overflow-hidden">
        
        {/* Logo */}
        <div className="absolute top-8 left-12 xl:left-24">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900 font-extrabold text-2xl tracking-tight">
              MUST HOMES
            </span>
          </Link>
        </div>

        {/* Text */}
        <div className="max-w-md z-10 mt-10">
          <h1 className="text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Find the <br />
            <span className="text-[#1877F2]">perfect room</span> <br />
            near campus.
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Connect with verified landlords, read student reviews, and book your home instantly.
          </p>
        </div>

        {/* Lively Collage (Abstracted with CSS/Images) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[500px] pointer-events-none hidden xl:block">
          
          {/* Main big image */}
          <div className="absolute top-4 right-12 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl rotate-3 bg-white p-2">
            <div className="w-full h-full relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80" 
                alt="Modern Apartment" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Overlapping image 1 */}
          <div className="absolute bottom-12 left-0 w-48 h-56 rounded-2xl overflow-hidden shadow-2xl -rotate-6 bg-white p-2 z-10">
            <div className="w-full h-full relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80" 
                alt="Happy Students" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating Emoji/Icon 1 */}
          <div className="absolute top-12 left-8 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-3xl animate-bounce z-20" style={{ animationDuration: '3s' }}>
            🎉
          </div>

          {/* Floating Emoji/Icon 2 */}
          <div className="absolute bottom-32 right-4 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-2xl z-20 hover:scale-110 transition-transform">
            💖
          </div>

        </div>

        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] -z-10 translate-y-1/3" />

      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-[#f0f2f5]">
        
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900 font-extrabold text-xl tracking-tight">
              MUST HOMES
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[400px] bg-white rounded-xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
}

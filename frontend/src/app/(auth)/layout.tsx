"use client";

import { Home } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex relative">
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-[#0F172A] dark:via-slate-900 dark:to-slate-900 overflow-auto">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between absolute top-0 left-0 w-full z-10">
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
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10 relative z-0 pt-20">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}

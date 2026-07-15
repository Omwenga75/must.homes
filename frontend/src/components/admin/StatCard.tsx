"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#01452c]/10 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-semibold">{title}</h3>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#01452c] flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-extrabold text-slate-800">{value}</span>
        {trend && (
          <span
            className={`text-sm font-semibold pb-1 ${
              trendUp ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

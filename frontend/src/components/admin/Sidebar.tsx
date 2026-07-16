"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LayoutDashboard, Building, Calendar, Users, Settings, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-[#01452c]/10 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-[#01452c]/10">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[#01452c] text-xl">
          <div className="w-8 h-8 rounded-lg bg-[#01452c] flex items-center justify-center">
            <Home className="text-white w-[18px] h-[18px]" />
          </div>
          ADMIN
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#01452c] text-white shadow-md shadow-[#01452c]/20"
                  : "text-slate-600 hover:text-[#01452c] hover:bg-[#e8f7f2]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#01452c]/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

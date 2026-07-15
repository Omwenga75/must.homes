"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/houses", label: "Houses" },
  { href: "/#features", label: "Features" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#01452c]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[#01452c] text-xl">
          <div className="w-8 h-8 rounded-lg bg-[#01452c] flex items-center justify-center">
            <Home className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
          </div>
          MUST HOMES
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === l.href
                  ? "bg-[#e8f7f2] text-[#01452c]"
                  : "text-slate-600 hover:text-[#01452c] hover:bg-[#e8f7f2]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-[#01452c] hover:bg-[#e8f7f2] rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold bg-[#01452c] hover:bg-[#023120] text-white rounded-xl shadow-md shadow-[#01452c]/20 transition-all hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-[#e8f7f2] transition-colors text-[#01452c]"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-[#01452c]/10 bg-white px-6 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#01452c] hover:bg-[#e8f7f2] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/login"
              className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#01452c]/20 text-[#01452c] hover:bg-[#e8f7f2] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#01452c] text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

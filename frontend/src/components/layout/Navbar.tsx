import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-[#01452c]">MUST HOMES</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#01452c]">
        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
        <Link href="/#features" className="hover:text-emerald-600 transition-colors">Features</Link>
        <Link href="/houses" className="hover:text-emerald-600 transition-colors">Houses</Link>
        <Link href="/#about" className="hover:text-emerald-600 transition-colors">About Us</Link>
        <Link href="/#contact" className="hover:text-emerald-600 transition-colors">Contact Us</Link>
      </div>

      <Link 
        href="/login" 
        className="flex items-center gap-2 bg-[#dcf1e7] hover:bg-[#c9e8dc] text-[#01452c] px-4 py-2 rounded-full font-semibold transition-colors"
      >
        <div className="w-6 h-6 rounded-full border border-[#01452c] flex items-center justify-center">
          <User className="w-3.5 h-3.5" />
        </div>
        Sign In
      </Link>
    </nav>
  );
}

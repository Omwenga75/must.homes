import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e8f7f2] font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#01452c]">MUST HOMES</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#01452c]">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link href="#features" className="hover:text-emerald-600 transition-colors">Features</Link>
          <Link href="/houses" className="hover:text-emerald-600 transition-colors">Houses</Link>
          <Link href="#about" className="hover:text-emerald-600 transition-colors">About Us</Link>
          <Link href="#contact" className="hover:text-emerald-600 transition-colors">Contact Us</Link>
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

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-12 lg:pt-24 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left Content */}
        <div className="flex-1 space-y-8 z-10">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#01452c] leading-[1.1] tracking-tight">
            Find Your <span className="text-[#0e6f4b]">Dream Home</span> in Seconds.
          </h1>
          <p className="text-lg lg:text-xl text-[#2a6650] max-w-lg leading-relaxed">
            Discover verified properties, unlock precise locations, and connect with trusted hosts in one beautiful platform.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link 
              href="/houses" 
              className="bg-[#01452c] hover:bg-[#023120] text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-[#01452c]/20 transition-transform hover:scale-105 active:scale-95"
            >
              Explore Houses
            </Link>
            <Link 
              href="#learn-more" 
              className="bg-white hover:bg-zinc-50 text-[#01452c] px-8 py-4 rounded-full font-semibold shadow-lg shadow-black/5 transition-transform hover:scale-105 active:scale-95"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Content - Phone Mockup */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end">
          <div className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/30">
            <Image
              src="/hero_mockup.png"
              alt="MUST HOMES App Mockup"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}

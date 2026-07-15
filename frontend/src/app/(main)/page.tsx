import Image from "next/image";
import Link from "next/link";
import { Shield, MapPin, Star, Wifi, Car, Zap, ArrowRight, Building2, Users, Home } from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Listed Houses" },
  { icon: Users, value: "2,400+", label: "Happy Students" },
  { icon: Home, value: "14", label: "Estates Covered" },
  { icon: Star, value: "4.8", label: "Average Rating" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    desc: "Every property is personally verified. No scams, no surprises — just genuine student-friendly accommodation.",
  },
  {
    icon: MapPin,
    title: "Precise Locations",
    desc: "Interactive maps show you exactly how far each house is from MUST campus, markets, and bus stops.",
  },
  {
    icon: Star,
    title: "Trusted Reviews",
    desc: "Read honest reviews from fellow students who have lived there. Make informed decisions.",
  },
  {
    icon: Wifi,
    title: "Filter by Amenities",
    desc: "WiFi, water, electricity, parking? Filter to find houses that match exactly what you need.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Book a viewing or secure your room instantly. Connect directly with landlords in seconds.",
  },
  {
    icon: Car,
    title: "Easy Transport",
    desc: "See nearby matatu routes, boda stages, and walking distances right from the listing.",
  },
];

const testimonials = [
  {
    text: "Finding my room near MUST was so easy with MUST HOMES. I moved in within 3 days!",
    author: "Aisha K.",
    course: "Computer Science, Year 2",
    initials: "AK",
  },
  {
    text: "The verified listings gave me peace of mind. No more scams or disappointments.",
    author: "Brian M.",
    course: "Engineering, Year 3",
    initials: "BM",
  },
  {
    text: "I love how I can filter by amenities. Found a place with WiFi and a parking spot!",
    author: "Fatuma A.",
    course: "Business, Year 1",
    initials: "FA",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 lg:pt-20 pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left text */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#01452c]/10 text-[#01452c] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#01452c] animate-pulse" />
            Student Housing Platform — MUST
          </div>
          <h1 className="text-5xl lg:text-[5.5rem] font-extrabold text-[#01452c] leading-[1.05] tracking-tight">
            Find Your{" "}
            <span className="relative">
              <span className="text-emerald-600">Dream Home</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 9C50 3 150 1 298 9" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>{" "}
            in Seconds.
          </h1>
          <p className="text-lg lg:text-xl text-[#2a6650]/80 max-w-lg leading-relaxed">
            Discover verified, affordable accommodation near Murang&apos;a University of Technology. No middlemen, no hidden fees.
          </p>
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            <Link
              href="/houses"
              className="inline-flex items-center gap-2 bg-[#01452c] hover:bg-[#023120] text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-[#01452c]/25 transition-all hover:scale-105 active:scale-95"
            >
              Explore Houses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-[#01452c] px-8 py-4 rounded-full font-semibold shadow-lg shadow-black/5 border border-[#01452c]/10 transition-all hover:scale-105 active:scale-95"
            >
              Learn More
            </Link>
          </div>
          {/* Trust badges */}
          <div className="flex items-center gap-6 pt-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-[#01452c]/60 font-medium">
              <Shield className="w-4 h-4 text-emerald-600" /> Verified Listings
            </div>
            <div className="flex items-center gap-2 text-sm text-[#01452c]/60 font-medium">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" /> Rated 4.8/5
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px]">
            {/* Glow */}
            <div className="absolute inset-8 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/20 border-4 border-white/60">
              <Image
                src="/hero_mockup.png"
                alt="MUST HOMES App Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────── */}
      <section className="bg-[#01452c] py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <stat.icon className="w-6 h-6 text-emerald-300" />
              <div className="text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="text-emerald-300/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────── */}
      <section id="features" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Why Students Love Us</p>
          <h2 className="text-4xl font-extrabold text-[#01452c]">Everything You Need, In One Place</h2>
          <p className="text-[#2a6650]/70 max-w-xl mx-auto">We built MUST HOMES to solve every pain point students face when looking for housing.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white rounded-3xl p-8 shadow-sm border border-[#01452c]/8 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-[#01452c] flex items-center justify-center mb-5 transition-colors duration-300">
                <f.icon className="w-6 h-6 text-[#01452c] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-[#01452c] mb-2">{f.title}</h3>
              <p className="text-[#2a6650]/70 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <section id="about" className="bg-[#01452c] py-24 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">Student Stories</p>
            <h2 className="text-4xl font-extrabold text-white">What Our Students Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.author}</div>
                    <div className="text-white/40 text-xs">{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-extrabold text-[#01452c]">Ready to Find Your Room?</h2>
          <p className="text-[#2a6650]/70 text-lg">Join thousands of MUST students who found their perfect home on our platform.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <Link
              href="/houses"
              className="inline-flex items-center gap-2 bg-[#01452c] hover:bg-[#023120] text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-[#01452c]/25 transition-all hover:scale-105 active:scale-95"
            >
              Browse Houses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-[#01452c] border border-[#01452c]/20 px-8 py-4 rounded-full font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="bg-[#01452c] text-white/60 py-8 px-6 text-center text-sm">
        <p className="font-bold text-white text-base mb-1">MUST HOMES</p>
        <p>&copy; {new Date().getFullYear()} Murang&apos;a University of Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

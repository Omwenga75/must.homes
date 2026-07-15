import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  MapPin,
  Star,
  Wifi,
  Car,
  Zap,
  ArrowRight,
  Building2,
  Users,
  Home,
  CheckCircle,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Listed Houses" },
  { icon: Users, value: "2,400+", label: "Happy Students" },
  { icon: Home, value: "14", label: "Estates Covered" },
  { icon: Star, value: "4.8★", label: "Average Rating" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    desc: "Every property is personally inspected and verified. Zero scams, zero surprises.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: MapPin,
    title: "Precise Locations",
    desc: "See exactly how far each house is from MUST campus, markets, and bus stops.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Star,
    title: "Student Reviews",
    desc: "Read honest reviews from fellow students who have actually lived in each house.",
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Wifi,
    title: "Amenity Filters",
    desc: "Filter by WiFi, water, electricity, parking, and more to find your perfect match.",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Book a viewing or secure your room immediately. Connect directly with landlords.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Car,
    title: "Easy Transport",
    desc: "See nearby matatu routes, boda stages, and walking distances from each listing.",
    color: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Browse Houses",
    desc: "Explore hundreds of verified listings. Filter by price, location, amenities — no account needed.",
  },
  {
    step: "02",
    title: "Find Your Match",
    desc: "Read reviews, view photos, check distances to campus and see all amenities clearly.",
  },
  {
    step: "03",
    title: "Create an Account",
    desc: "Sign up free when you&apos;re ready to book a viewing or message a landlord directly.",
  },
  {
    step: "04",
    title: "Move In!",
    desc: "Secure your room with our platform. We&apos;re with you every step of the way.",
  },
];

const testimonials = [
  {
    text: "Finding my room near MUST was incredibly easy. I moved in within 3 days of signing up!",
    author: "Aisha K.",
    course: "Computer Science, Year 2",
    initials: "AK",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    text: "The verified listings gave me total peace of mind. No more scams or disappointments.",
    author: "Brian M.",
    course: "Engineering, Year 3",
    initials: "BM",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    text: "I love filtering by amenities. Found a studio with WiFi, water and parking within my budget!",
    author: "Fatuma A.",
    course: "Business, Year 1",
    initials: "FA",
    gradient: "from-purple-400 to-pink-500",
  },
];

const featuredHouses = [
  {
    id: 1,
    title: "Modern Studio near MUST Gate A",
    estate: "Kiharu Estate",
    distance: "0.2 km",
    price: 4500,
    rating: 4.9,
    amenities: ["WiFi", "Water", "Electricity"],
    tag: "Most Popular",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
  },
  {
    id: 2,
    title: "1-Bedroom Self Contain with Parking",
    estate: "Kiharu Estate",
    distance: "0.4 km",
    price: 7000,
    rating: 4.8,
    amenities: ["WiFi", "Water", "Electricity", "Parking"],
    tag: "Verified",
    tagColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    id: 3,
    title: "Executive Studio with Security",
    estate: "Town Center",
    distance: "1.4 km",
    price: 8000,
    rating: 5.0,
    amenities: ["WiFi", "Water", "Electricity", "Parking"],
    tag: "Premium",
    tagColor: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* ═══════════════════════════════════════════════
           HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_bg.png"
            alt="MUST University Campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#01452c]/95 via-[#01452c]/80 to-[#01452c]/30" />
        </div>

        {/* Floating pattern */}
        <div className="absolute inset-0 z-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24 w-full">
          <div className="max-w-2xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              No Account Required to Browse
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              Find Your
              <br />
              <span className="text-emerald-400">Dream Room</span>
              <br />
              Near MUST
            </h1>

            <p className="text-lg sm:text-xl text-white/75 max-w-lg leading-relaxed">
              Browse 500+ verified, affordable student homes near Murang&apos;a University of Technology.
              No middlemen. No hidden fees. No login needed to explore.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/houses"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95"
              >
                Browse Houses — It&apos;s Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
              >
                How It Works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-2 flex-wrap">
              {["Verified Listings", "500+ Houses", "4.8★ Rated", "Free to Browse"].map((b) => (
                <div key={b} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           STATS BAR
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#01452c] py-10 border-y border-[#01452c]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <s.icon className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-emerald-300/70 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           FEATURED HOUSES
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-8 bg-[#f0fbf5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div className="space-y-2">
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Handpicked for You</p>
              <h2 className="text-4xl font-extrabold text-[#01452c]">Featured Houses</h2>
              <p className="text-[#2a6650]/70 max-w-lg">
                Top-rated, verified houses that students love. No login needed to browse.
              </p>
            </div>
            <Link
              href="/houses"
              className="inline-flex items-center gap-2 text-[#01452c] font-semibold hover:text-emerald-600 transition-colors text-sm"
            >
              View all houses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHouses.map((house) => (
              <Link
                key={house.id}
                href="/houses"
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#01452c]/8 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={house.image}
                    alt={house.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-3 left-3 ${house.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                    {house.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur text-[#01452c] text-sm font-extrabold px-3 py-1.5 rounded-full">
                    KES {house.price.toLocaleString()}/mo
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-[#01452c] text-base leading-snug">{house.title}</h3>
                  <div className="flex items-center gap-1 text-[#2a6650]/60 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {house.estate} · {house.distance} from campus
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {house.amenities.map((a) => (
                      <span key={a} className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-[#01452c]">{house.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600 group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/houses"
              className="inline-flex items-center gap-2 bg-[#01452c] hover:bg-[#023120] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-[#01452c]/20 transition-all hover:scale-105 active:scale-95"
            >
              Explore All 500+ Houses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           HOW IT WORKS
      ═══════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Simple Process</p>
            <h2 className="text-4xl font-extrabold text-[#01452c]">How MUST HOMES Works</h2>
            <p className="text-[#2a6650]/70 max-w-xl mx-auto text-lg">
              You can browse everything for free. Login is only needed when you&apos;re ready to book or contact a landlord.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-6 border-t-2 border-dashed border-[#01452c]/20 z-10" />
                )}
                <div className="bg-[#f0fbf5] rounded-3xl p-8 h-full space-y-4 border border-[#01452c]/8 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#01452c] text-white text-xl font-extrabold flex items-center justify-center">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-[#01452c] text-lg">{step.title}</h3>
                  <p className="text-[#2a6650]/70 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           FEATURES
      ═══════════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6 sm:px-8 bg-[#f0fbf5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Why Students Love Us</p>
            <h2 className="text-4xl font-extrabold text-[#01452c]">Everything You Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white rounded-3xl p-8 shadow-sm border border-[#01452c]/8 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-5`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-[#01452c] mb-2">{f.title}</h3>
                <p className="text-[#2a6650]/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 sm:px-8 bg-[#01452c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14 space-y-3">
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Student Stories</p>
            <h2 className="text-4xl font-extrabold text-white">What Our Students Say</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Thousands of MUST students found their homes here. Here&apos;s what they think.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5 hover:bg-white/10 transition-colors">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">{t.author}</div>
                    <div className="text-white/40 text-xs">{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#01452c] flex items-center justify-center mx-auto mb-2">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#01452c]">
            Ready to Find Your Room?
          </h2>
          <p className="text-[#2a6650]/70 text-lg max-w-xl mx-auto">
            Browse freely. Login only when you&apos;re ready to book or contact a landlord.
            It only takes 30 seconds to create a free account.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/houses"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Browse Houses — Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-[#01452c] hover:bg-[#023120] text-white px-10 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-[#01452c]/20 transition-all hover:scale-105 active:scale-95"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           CONTACT
      ═══════════════════════════════════════════════ */}
      <section id="contact" className="py-16 px-6 sm:px-8 bg-[#f0fbf5] border-t border-[#01452c]/10">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: Phone, label: "Call Us", value: "+254 700 000 000" },
            { icon: Mail, label: "Email Us", value: "hello@musthomes.co.ke" },
            { icon: Clock, label: "Support Hours", value: "Mon–Sat, 8am–6pm" },
          ].map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#01452c] flex items-center justify-center">
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#01452c]/40 mb-0.5">{c.label}</div>
                <div className="text-[#01452c] font-semibold">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           FOOTER
      ═══════════════════════════════════════════════ */}
      <footer className="bg-[#01452c] text-white/60 py-10 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 font-extrabold text-white text-lg">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            MUST HOMES
          </div>
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Murang&apos;a University of Technology Student Housing Platform.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/houses" className="hover:text-white transition-colors">Houses</Link>
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
  Home, ShoppingBag,
  CheckCircle,
  Mail,
  Clock,
  Phone,
} from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Listed Items" },
  { icon: Users, value: "2,400+", label: "Happy Students" },
  { icon: ShoppingBag, value: "14", label: "Categories Covered" },
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
    desc: "See exactly how far each listing is from MUST campus, markets, and bus stops.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Star,
    title: "Student Reviews",
    desc: "Read honest reviews from fellow students who have actually used each listing.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: CheckCircle,
    title: "Detailed Filters",
    desc: "Filter by condition, price, and category to find exactly the items you need.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Zap,
    title: "Instant Order",
    desc: "Book a viewing or secure your item immediately. Connect directly with sellers.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Car,
    title: "Easy Transport",
    desc: "See nearby matatu routes, boda stages, and walking distances from each listing.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Browse Listings",
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
    desc: "Sign up free when you&apos;re ready to book a viewing or message a seller directly.",
  },
  {
    step: "04",
    title: "Move In!",
    desc: "Secure your item with our platform. We&apos;re with you every step of the way.",
  },
];

const testimonials = [
  {
    text: "Finding what I needed near MUST was incredibly easy. I got it within 3 days of signing up!",
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
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    text: "I love the detailed filters. Found a second-hand laptop in excellent condition within my budget!",
    author: "Fatuma A.",
    course: "Business, Year 1",
    initials: "FA",
    gradient: "from-emerald-400 to-teal-500",
  },
];

const featuredItems = [
  {
    id: 1,
    title: "Meko Gas Cylinder (6kg)",
    location: "Nchiru",
    distance: "0.2 km",
    price: 2500,
    rating: 4.9,
    tags: ["Refilled", "With Burner"],
    tag: "Most Popular",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item1/600/400",
  },
  {
    id: 2,
    title: "iPhone 11 (64GB)",
    location: "Town Center",
    distance: "1.0 km",
    price: 25000,
    rating: 4.8,
    tags: ["Unlocked", "No Scratches"],
    tag: "Verified",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item2/600/400",
  },
  {
    id: 3,
    title: "Study Table & Chair",
    location: "Nchiru",
    distance: "0.5 km",
    price: 3500,
    rating: 5.0,
    tags: ["Wooden", "Ergonomic"],
    tag: "Premium",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item3/600/400",
  },
];

const secondHandItems = [
  {
    id: 1,
    title: "Samsung Galaxy A32",
    price: 12000,
    tag: "Used - Good",
    tags: ["Minor Scratches", "Battery 85%"],
    image: "https://picsum.photos/seed/item4/600/400",
  },
  {
    id: 2,
    title: "HP Pavilion Laptop (i5)",
    price: 28000,
    tag: "Used - Excellent",
    tags: ["8GB RAM", "256GB SSD"],
    image: "https://picsum.photos/seed/item5/600/400",
  },
  {
    id: 3,
    title: "Engineering Drawing Kit",
    price: 800,
    tag: "Used - Good",
    tags: ["Complete Set", "Year 1"],
    image: "https://picsum.photos/seed/item6/600/400",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#fafafa]">

      {/* ═══════════════════════════════════════════════
           HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center pt-28 pb-24">
        {/* Dynamic Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/hero_bg.png')] bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-out hover:scale-110" />
          {/* Lighter overlay so the image is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#022c22]/50 via-[#022c22]/30 to-[#022c22]/60" />
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px]" />
          <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
          
          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tighter mb-0 max-w-5xl drop-shadow-sm">
            Meru <br className="sm:hidden" />
            University
            {" "}
            <br className="hidden sm:block" />
            Marketplace
          </h1>




        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           STATS BAR
      ═══════════════════════════════════════════════ */}
      <section className="relative py-10 overflow-hidden">
        {/* Hero BG image continuation */}
        <div className="absolute inset-0 bg-[url('/hero_bg.png')] bg-cover bg-center bg-no-repeat" />
        {/* Dark gradient overlay — heavier than hero so text pops */}
        <div className="absolute inset-0 bg-[#022c22]/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
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
           NEW ITEMS
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-8 bg-[#f0fbf5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold text-[#01452c]">New Items</h2>
              <p className="text-[#2a6650]/70 max-w-xl mx-auto">
                Brand new items listed by verified sellers. No login needed to browse.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <Link
                key={item.id}
                href="/items"
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#01452c]/8 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-72 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#01452c] text-base leading-snug">{item.title}</h3>
                  <div className="flex items-center gap-1 text-[#2a6650]/60 text-sm mt-2">
                    <Phone className="w-3.5 h-3.5" />
                    +254 712 345 678
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/items"
              className="inline-flex items-center gap-2 bg-[#01452c] hover:bg-[#023120] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-[#01452c]/20 transition-all hover:scale-105 active:scale-95"
            >
              Explore All New Items
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           SECOND HAND ITEMS
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold text-[#01452c]">Second Hand Items</h2>
              <p className="text-[#2a6650]/70 max-w-xl mx-auto">
                Quality used items at student-friendly prices. Great deals from fellow students.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondHandItems.map((item) => (
              <Link
                key={item.id}
                href="/second-hand"
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-amber-100 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-72 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#01452c] text-base leading-snug">{item.title}</h3>
                  <div className="flex items-center gap-1 text-[#2a6650]/60 text-sm mt-2">
                    <Phone className="w-3.5 h-3.5" />
                    +254 712 345 678
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/second-hand"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-amber-900/20 transition-all hover:scale-105 active:scale-95"
            >
              Explore All Second Hand Items
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
            <h2 className="text-4xl font-extrabold text-[#01452c]">How MUST MARKETPLACE Works</h2>
            <p className="text-[#2a6650]/70 max-w-xl mx-auto text-lg">
              You can browse everything for free. Login is only needed when you&apos;re ready to book or contact a seller.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">

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
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            MUST MARKETPLACE
          </div>
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Meru University of Science and Technology Student Marketplace.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/items" className="hover:text-white transition-colors">New Items</Link>
            <Link href="/second-hand" className="hover:text-white transition-colors">Second Hand</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

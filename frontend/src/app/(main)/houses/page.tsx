"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Wifi,
  Car,
  Zap,
  Droplets,
  Star,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowRight,
  Home,
  LogIn,
} from "lucide-react";

const houses = [
  {
    id: 1,
    title: "Modern Studio near MUST Gate A",
    estate: "Kiharu Estate",
    distance: "0.2 km from campus",
    price: 4500,
    beds: 1,
    rating: 4.9,
    reviews: 23,
    amenities: ["wifi", "water", "electricity"],
    tag: "Most Popular",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
  },
  {
    id: 2,
    title: "Spacious Bedsitter, Shared Compound",
    estate: "Makuyu Estate",
    distance: "0.6 km from campus",
    price: 3200,
    beds: 1,
    rating: 4.7,
    reviews: 18,
    amenities: ["water", "electricity"],
    tag: "Budget Friendly",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  },
  {
    id: 3,
    title: "1-Bedroom Self Contain with Parking",
    estate: "Kiharu Estate",
    distance: "0.4 km from campus",
    price: 7000,
    beds: 1,
    rating: 4.8,
    reviews: 11,
    amenities: ["wifi", "water", "electricity", "parking"],
    tag: "Verified",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    id: 4,
    title: "2-Bedroom Apartment, Quiet Neighborhood",
    estate: "Muiri Estate",
    distance: "1.1 km from campus",
    price: 9500,
    beds: 2,
    rating: 4.6,
    reviews: 9,
    amenities: ["wifi", "water", "electricity", "parking"],
    tag: "New",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
  {
    id: 5,
    title: "Single Room, Walking Distance to MUST",
    estate: "Makuyu Estate",
    distance: "0.3 km from campus",
    price: 2800,
    beds: 1,
    rating: 4.5,
    reviews: 34,
    amenities: ["water", "electricity"],
    tag: "Budget Friendly",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
  },
  {
    id: 6,
    title: "Executive Studio with WiFi & Security",
    estate: "Town Center",
    distance: "1.4 km from campus",
    price: 8000,
    beds: 1,
    rating: 5.0,
    reviews: 7,
    amenities: ["wifi", "water", "electricity", "parking"],
    tag: "Premium",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
  },
  {
    id: 7,
    title: "Cosy Bedsitter with Garden View",
    estate: "Muiri Estate",
    distance: "0.9 km from campus",
    price: 3800,
    beds: 1,
    rating: 4.4,
    reviews: 12,
    amenities: ["water", "electricity"],
    tag: "Cosy",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
  },
  {
    id: 8,
    title: "Shared 2-Bedroom Near Kiharu Market",
    estate: "Kiharu Estate",
    distance: "0.7 km from campus",
    price: 5500,
    beds: 2,
    rating: 4.6,
    reviews: 19,
    amenities: ["wifi", "water", "electricity"],
    tag: "Great Value",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
  },
  {
    id: 9,
    title: "Furnished Studio, Bills Included",
    estate: "Town Center",
    distance: "1.2 km from campus",
    price: 6500,
    beds: 1,
    rating: 4.9,
    reviews: 5,
    amenities: ["wifi", "water", "electricity"],
    tag: "All Inclusive",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-3.5 h-3.5" />,
  water: <Droplets className="w-3.5 h-3.5" />,
  electricity: <Zap className="w-3.5 h-3.5" />,
  parking: <Car className="w-3.5 h-3.5" />,
};

const amenityLabels: Record<string, string> = {
  wifi: "WiFi",
  water: "Water",
  electricity: "Electricity",
  parking: "Parking",
};

const estates = ["All Estates", "Kiharu Estate", "Makuyu Estate", "Muiri Estate", "Town Center"];
const priceRanges = ["Any Price", "Under KES 3,500", "KES 3,500–6,000", "KES 6,000–9,000", "Above KES 9,000"];

function BookingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 rounded-3xl bg-[#01452c] flex items-center justify-center mx-auto">
          <Home className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-[#01452c] mb-2">Login to Book a Viewing</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            You can browse all houses for free. Create a free account to book viewings, contact landlords, and save your favourite houses.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 bg-[#01452c] hover:bg-[#023120] text-white px-6 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            Sign In / Create Account
          </Link>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-[#01452c] text-sm font-medium transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HousesPage() {
  const [search, setSearch] = useState("");
  const [selectedEstate, setSelectedEstate] = useState("All Estates");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const filtered = houses.filter((h) => {
    const matchSearch =
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.estate.toLowerCase().includes(search.toLowerCase());
    const matchEstate = selectedEstate === "All Estates" || h.estate === selectedEstate;
    const matchAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => h.amenities.includes(a));
    const matchPrice = (() => {
      if (selectedPrice === "Any Price") return true;
      if (selectedPrice === "Under KES 3,500") return h.price < 3500;
      if (selectedPrice === "KES 3,500–6,000") return h.price >= 3500 && h.price <= 6000;
      if (selectedPrice === "KES 6,000–9,000") return h.price >= 6000 && h.price <= 9000;
      if (selectedPrice === "Above KES 9,000") return h.price > 9000;
      return true;
    })();
    return matchSearch && matchEstate && matchAmenities && matchPrice;
  });

  const hasFilters =
    selectedAmenities.length > 0 ||
    selectedPrice !== "Any Price" ||
    selectedEstate !== "All Estates";

  return (
    <div className="min-h-screen bg-[#f0fbf5]">
      {showBookingModal && <BookingModal onClose={() => setShowBookingModal(false)} />}

      {/* Page Header */}
      <div className="bg-[#01452c] py-10 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Find Your Perfect Room
          </h1>

          {/* Search bar */}
          <div className="w-full max-w-2xl flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by name or estate..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                showFilters || hasFilters
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && (
                <span className="w-5 h-5 rounded-full bg-white text-[#01452c] text-xs font-extrabold flex items-center justify-center">
                  {selectedAmenities.length + (selectedPrice !== "Any Price" ? 1 : 0) + (selectedEstate !== "All Estates" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-[#01452c]/10 px-6 sm:px-8 py-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#01452c]/50">Estate</label>
              <div className="relative">
                <select
                  value={selectedEstate}
                  onChange={(e) => setSelectedEstate(e.target.value)}
                  className="appearance-none bg-[#e8f7f2] border border-[#01452c]/15 text-[#01452c] text-sm font-semibold pl-4 pr-10 py-3 rounded-xl focus:outline-none cursor-pointer"
                >
                  {estates.map((e) => <option key={e}>{e}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#01452c]/50 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#01452c]/50">Price Range</label>
              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="appearance-none bg-[#e8f7f2] border border-[#01452c]/15 text-[#01452c] text-sm font-semibold pl-4 pr-10 py-3 rounded-xl focus:outline-none cursor-pointer"
                >
                  {priceRanges.map((p) => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#01452c]/50 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#01452c]/50">Amenities</label>
              <div className="flex gap-2 flex-wrap">
                {["wifi", "water", "electricity", "parking"].map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all ${
                      selectedAmenities.includes(a)
                        ? "bg-[#01452c] text-white border-[#01452c]"
                        : "bg-[#e8f7f2] text-[#01452c] border-[#01452c]/15 hover:border-[#01452c]/40"
                    }`}
                  >
                    {amenityIcons[a]} {amenityLabels[a]}
                  </button>
                ))}
              </div>
            </div>
            {hasFilters && (
              <button
                onClick={() => { setSelectedEstate("All Estates"); setSelectedPrice("Any Price"); setSelectedAmenities([]); }}
                className="flex items-center gap-1.5 text-sm text-[#01452c]/50 hover:text-[#01452c] transition pb-1"
              >
                <X className="w-4 h-4" /> Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Houses Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#01452c]/60 text-sm">
            <span className="font-bold text-[#01452c] text-base">{filtered.length}</span> house{filtered.length !== 1 && "s"} found
          </p>
          <p className="text-xs text-[#01452c]/40 hidden sm:block">
            Browse freely — login only needed to book
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#01452c]/40 bg-white rounded-3xl border border-[#01452c]/8">
            <Search className="w-14 h-14 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-bold text-[#01452c]/50">No houses match your filters</p>
            <p className="text-sm mt-1">Try adjusting your search or clearing filters</p>
            <button
              onClick={() => { setSearch(""); setSelectedEstate("All Estates"); setSelectedPrice("Any Price"); setSelectedAmenities([]); }}
              className="mt-5 text-sm font-semibold text-emerald-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((house) => (
              <div
                key={house.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#01452c]/8 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={house.image}
                    alt={house.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 ${house.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                    {house.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur text-[#01452c] text-sm font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                    KES {house.price.toLocaleString()}<span className="text-xs font-medium text-[#01452c]/50">/mo</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-[#01452c] text-[15px] leading-snug">{house.title}</h3>
                    <div className="flex items-center gap-1.5 text-[#2a6650]/55 text-xs mt-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {house.estate} · {house.distance}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5">
                    {house.amenities.map((a) => (
                      <span
                        key={a}
                        className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {amenityIcons[a]} {amenityLabels[a]}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(house.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}`}
                      />
                    ))}
                    <span className="text-sm font-bold text-[#01452c] ml-0.5">{house.rating}</span>
                    <span className="text-xs text-[#2a6650]/40">({house.reviews} reviews)</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="flex-1 bg-[#01452c] hover:bg-[#023120] text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                    >
                      Book Viewing
                    </button>
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="flex items-center gap-1 px-4 py-2.5 border border-[#01452c]/20 text-[#01452c] hover:bg-[#e8f7f2] text-sm font-semibold rounded-xl transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#01452c] py-14 px-6 sm:px-8 mt-8">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h3 className="text-2xl font-extrabold text-white">Found a house you love?</h3>
          <p className="text-white/60">
            Create a free account to book viewings, contact landlords, save favourites, and manage your booking — all in one place.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
          >
            <LogIn className="w-5 h-5" />
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#012a1b] text-white/50 py-8 px-6 text-center text-sm">
        <p className="font-bold text-white text-sm mb-1">MUST HOMES</p>
        <p>&copy; {new Date().getFullYear()} Meru University of Science and Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

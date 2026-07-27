"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowRight,
  Phone,
} from "lucide-react";

const secondHandItems = [
  {
    id: 1,
    title: "Samsung Galaxy A32",
    price: 12000,
    tag: "Used - Good",
    tags: ["Minor Scratches", "Battery 85%"],
    image: "https://picsum.photos/seed/item16/600/400",
    location: "Nchiru",
  },
  {
    id: 2,
    title: "HP Pavilion Laptop (i5)",
    price: 28000,
    tag: "Used - Excellent",
    tags: ["8GB RAM", "256GB SSD"],
    image: "https://picsum.photos/seed/item17/600/400",
    location: "Town Center",
  },
  {
    id: 3,
    title: "Engineering Drawing Kit",
    price: 800,
    tag: "Used - Good",
    tags: ["Complete Set", "Year 1"],
    image: "https://picsum.photos/seed/item18/600/400",
    location: "Kiharu Location",
  },
  {
    id: 4,
    title: "Canon DSLR Camera (EOS 1300D)",
    price: 35000,
    tag: "Used - Excellent",
    tags: ["18-55mm Lens", "2 Batteries"],
    image: "https://picsum.photos/seed/item19/600/400",
    location: "Muiri Location",
  },
  {
    id: 5,
    title: "Organic Chemistry Textbook",
    price: 400,
    tag: "Used - Good",
    tags: ["8th Edition", "Highlighted"],
    image: "https://picsum.photos/seed/item20/600/400",
    location: "Nchiru",
  },
  {
    id: 6,
    title: "Mini Electric Fan",
    price: 1200,
    tag: "Used - Excellent",
    tags: ["USB Powered", "Quiet"],
    image: "https://picsum.photos/seed/item21/600/400",
    location: "Town Center",
  },
  {
    id: 7,
    title: "Casio Scientific Calculator",
    price: 900,
    tag: "Used - Good",
    tags: ["FX-991ES", "All Functions"],
    image: "https://picsum.photos/seed/item22/600/400",
    location: "Makuyu Location",
  },
  {
    id: 8,
    title: "Steel Bunk Bed Frame",
    price: 5500,
    tag: "Used - Fair",
    tags: ["Sturdy", "Self Assembly"],
    image: "https://picsum.photos/seed/item23/600/400",
    location: "Kiharu Location",
  },
  {
    id: 9,
    title: "Wireless Earbuds (JBL)",
    price: 2500,
    tag: "Used - Excellent",
    tags: ["Original", "With Case"],
    image: "https://picsum.photos/seed/item24/600/400",
    location: "Muiri Location",
  },
];

const locations = ["All Locations", "Nchiru", "Town Center", "Kiharu Location", "Muiri Location", "Makuyu Location"];
const priceRanges = ["Any Price", "Under KES 1,000", "KES 1,000–5,000", "KES 5,000–15,000", "Above KES 15,000"];
const conditions = ["All Conditions", "Used - Excellent", "Used - Good", "Used - Fair"];

export default function SecondHandPage() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = secondHandItems.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchLocation = selectedLocation === "All Locations" || item.location === selectedLocation;
    const matchCondition = selectedCondition === "All Conditions" || item.tag === selectedCondition;
    const matchPrice = (() => {
      if (selectedPrice === "Any Price") return true;
      if (selectedPrice === "Under KES 1,000") return item.price < 1000;
      if (selectedPrice === "KES 1,000–5,000") return item.price >= 1000 && item.price <= 5000;
      if (selectedPrice === "KES 5,000–15,000") return item.price >= 5000 && item.price <= 15000;
      if (selectedPrice === "Above KES 15,000") return item.price > 15000;
      return true;
    })();
    return matchSearch && matchLocation && matchCondition && matchPrice;
  });

  const hasFilters =
    selectedLocation !== "All Locations" ||
    selectedPrice !== "Any Price" ||
    selectedCondition !== "All Conditions";

  return (
    <div className="min-h-screen bg-[#fffbf0]">

      {/* Page Header */}
      <div className="bg-amber-600 py-10 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Second Hand Items
          </h1>
          <p className="text-white/70 mb-6 text-sm">Quality used items at student-friendly prices</p>

          {/* Search bar */}
          <div className="w-full max-w-2xl flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300/40 transition"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                showFilters || hasFilters
                  ? "bg-white border-white text-amber-600"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && (
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-xs font-extrabold flex items-center justify-center">
                  {(selectedLocation !== "All Locations" ? 1 : 0) +
                    (selectedPrice !== "Any Price" ? 1 : 0) +
                    (selectedCondition !== "All Conditions" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-amber-100 px-6 sm:px-8 py-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-6 items-end justify-center">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-amber-600/60">Location</label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold pl-4 pr-10 py-3 rounded-xl focus:outline-none cursor-pointer"
                >
                  {locations.map((e) => <option key={e}>{e}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-amber-600/60">Price Range</label>
              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="appearance-none bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold pl-4 pr-10 py-3 rounded-xl focus:outline-none cursor-pointer"
                >
                  {priceRanges.map((p) => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-amber-600/60">Condition</label>
              <div className="relative">
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="appearance-none bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold pl-4 pr-10 py-3 rounded-xl focus:outline-none cursor-pointer"
                >
                  {conditions.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
              </div>
            </div>
            {hasFilters && (
              <button
                onClick={() => { setSelectedLocation("All Locations"); setSelectedPrice("Any Price"); setSelectedCondition("All Conditions"); }}
                className="flex items-center gap-1.5 text-sm text-amber-600/60 hover:text-amber-700 transition pb-1"
              >
                <X className="w-4 h-4" /> Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-amber-700/40 bg-white rounded-3xl border border-amber-100">
            <Search className="w-14 h-14 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-bold text-amber-700/50">No items match your filters</p>
            <p className="text-sm mt-1">Try adjusting your search or clearing filters</p>
            <button
              onClick={() => { setSearch(""); setSelectedLocation("All Locations"); setSelectedPrice("Any Price"); setSelectedCondition("All Conditions"); }}
              className="mt-5 text-sm font-semibold text-amber-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-amber-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/d97706?text=No+Image' }}
                  />
                  <span className="absolute top-3 left-3 bg-amber-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-white text-[#01452c] text-base font-extrabold px-4 py-1.5 rounded-full shadow-md">
                    KES {item.price.toLocaleString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-[#01452c] text-lg leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      +254 712 345 678
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#012a1b] text-white/50 py-8 px-6 text-center text-sm mt-8">
        <p className="font-bold text-white text-sm mb-1">MUST MARKETPLACE</p>
        <p>&copy; {new Date().getFullYear()} Meru University of Science and Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

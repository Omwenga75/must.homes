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
  BedDouble,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowRight,
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
    tag: "Popular",
    tagColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
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
    tagColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
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
    tagColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80",
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
    tagColor: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
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
    tagColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80",
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
    tagColor: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
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
const priceRanges = ["Any Price", "Under KES 3,500", "KES 3,500 – 6,000", "KES 6,000 – 9,000", "Above KES 9,000"];

export default function HousesPage() {
  const [search, setSearch] = useState("");
  const [selectedEstate, setSelectedEstate] = useState("All Estates");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const filtered = houses.filter((h) => {
    const matchSearch =
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.estate.toLowerCase().includes(search.toLowerCase());
    const matchEstate =
      selectedEstate === "All Estates" || h.estate === selectedEstate;
    const matchAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => h.amenities.includes(a));
    const matchPrice = (() => {
      if (selectedPrice === "Any Price") return true;
      if (selectedPrice === "Under KES 3,500") return h.price < 3500;
      if (selectedPrice === "KES 3,500 – 6,000") return h.price >= 3500 && h.price <= 6000;
      if (selectedPrice === "KES 6,000 – 9,000") return h.price >= 6000 && h.price <= 9000;
      if (selectedPrice === "Above KES 9,000") return h.price > 9000;
      return true;
    })();
    return matchSearch && matchEstate && matchAmenities && matchPrice;
  });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[#01452c] py-14 px-6 sm:px-8 text-center">
        <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">Verified & Updated Daily</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Find Your Perfect Room
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Browse {houses.length} verified student houses near Murang&apos;a University of Technology.
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-2xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or estate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3.5 rounded-2xl text-sm font-medium transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(selectedAmenities.length > 0 || selectedPrice !== "Any Price" || selectedEstate !== "All Estates") && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-[#01452c]/10 px-6 sm:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-6 items-start">
            {/* Estate */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#01452c]/50">Estate</label>
              <div className="relative">
                <select
                  value={selectedEstate}
                  onChange={(e) => setSelectedEstate(e.target.value)}
                  className="appearance-none bg-[#e8f7f2] border border-[#01452c]/15 text-[#01452c] text-sm font-medium pl-4 pr-10 py-2.5 rounded-xl focus:outline-none cursor-pointer"
                >
                  {estates.map((e) => <option key={e}>{e}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#01452c]/50 pointer-events-none" />
              </div>
            </div>
            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#01452c]/50">Price Range</label>
              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="appearance-none bg-[#e8f7f2] border border-[#01452c]/15 text-[#01452c] text-sm font-medium pl-4 pr-10 py-2.5 rounded-xl focus:outline-none cursor-pointer"
                >
                  {priceRanges.map((p) => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#01452c]/50 pointer-events-none" />
              </div>
            </div>
            {/* Amenities */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#01452c]/50">Amenities</label>
              <div className="flex gap-2 flex-wrap">
                {["wifi", "water", "electricity", "parking"].map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl border transition-all ${
                      selectedAmenities.includes(a)
                        ? "bg-[#01452c] text-white border-[#01452c]"
                        : "bg-[#e8f7f2] text-[#01452c] border-[#01452c]/15 hover:border-[#01452c]/40"
                    }`}
                  >
                    {amenityIcons[a]}
                    {amenityLabels[a]}
                  </button>
                ))}
              </div>
            </div>
            {/* Clear */}
            <div className="flex items-end">
              <button
                onClick={() => { setSelectedEstate("All Estates"); setSelectedPrice("Any Price"); setSelectedAmenities([]); }}
                className="flex items-center gap-1 text-sm text-[#01452c]/50 hover:text-[#01452c] transition"
              >
                <X className="w-4 h-4" /> Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* House Cards */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#01452c]/70 text-sm">
            Showing <span className="font-bold text-[#01452c]">{filtered.length}</span> house{filtered.length !== 1 && "s"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#01452c]/40">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No houses match your filters</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((house) => (
              <div
                key={house.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#01452c]/8 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={house.image}
                    alt={house.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute top-3 left-3 ${house.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {house.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#01452c] text-sm font-bold px-3 py-1 rounded-full">
                    KES {house.price.toLocaleString()}/mo
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-[#01452c] text-base leading-snug">{house.title}</h3>
                    <div className="flex items-center gap-1 text-[#2a6650]/60 text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5" />
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
                        {amenityIcons[a]}
                        {amenityLabels[a]}
                      </span>
                    ))}
                  </div>

                  {/* Rating & CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(house.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-[#01452c]">{house.rating}</span>
                      <span className="text-xs text-[#2a6650]/50">({house.reviews})</span>
                    </div>
                    <Link
                      href={`/houses/${house.id}`}
                      className="flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-[#01452c] transition-colors"
                    >
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#01452c] text-white/60 py-8 px-6 text-center text-sm mt-12">
        <p className="font-bold text-white text-base mb-1">MUST HOMES</p>
        <p>&copy; {new Date().getFullYear()} Murang&apos;a University of Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

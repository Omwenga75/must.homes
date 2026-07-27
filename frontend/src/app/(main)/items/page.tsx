"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  Home,
  LogIn,
  Phone,
} from "lucide-react";

const items = [
  {
    id: 1,
    title: "Meko Gas Cylinder (6kg)",
    location: "Nchiru",
    distance: "0.2 km from campus",
    price: 2500,
    beds: 1,
    rating: 4.9,
    reviews: 23,
    amenities: ["wifi", "water", "electricity"],
    tag: "Most Popular",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item7/600/400",
  },
  {
    id: 2,
    title: "iPhone 11 (64GB)",
    location: "Town Center",
    distance: "1.0 km from campus",
    price: 25000,
    beds: 1,
    rating: 4.8,
    reviews: 18,
    amenities: ["water", "electricity"],
    tag: "Verified",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item8/600/400",
  },
  {
    id: 3,
    title: "Study Table & Chair",
    location: "Nchiru",
    distance: "0.5 km from campus",
    price: 3500,
    beds: 1,
    rating: 5.0,
    reviews: 11,
    amenities: ["wifi", "parking"],
    tag: "Premium",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item9/600/400",
  },
  {
    id: 4,
    title: "Hp EliteBook 840 G5",
    location: "Muiri Location",
    distance: "1.1 km from campus",
    price: 22000,
    beds: 1,
    rating: 4.6,
    reviews: 9,
    amenities: ["wifi", "electricity"],
    tag: "New",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item10/600/400",
  },
  {
    id: 5,
    title: "Sony WH-1000XM4 Headphones",
    location: "Makuyu Location",
    distance: "0.3 km from campus",
    price: 18000,
    beds: 1,
    rating: 4.5,
    reviews: 34,
    amenities: ["water", "electricity"],
    tag: "Budget Friendly",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item11/600/400",
  },
  {
    id: 6,
    title: "Mini Fridge",
    location: "Town Center",
    distance: "1.4 km from campus",
    price: 8000,
    beds: 1,
    rating: 5.0,
    reviews: 7,
    amenities: ["wifi", "water", "electricity", "parking"],
    tag: "Premium",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item12/600/400",
  },
  {
    id: 7,
    title: "Acoustic Guitar",
    location: "Muiri Location",
    distance: "0.9 km from campus",
    price: 5000,
    beds: 1,
    rating: 4.4,
    reviews: 12,
    amenities: ["water", "electricity"],
    tag: "Cosy",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item13/600/400",
  },
  {
    id: 8,
    title: "Calculus Textbook",
    location: "Kiharu Location",
    distance: "0.7 km from campus",
    price: 1500,
    beds: 1,
    rating: 4.6,
    reviews: 19,
    amenities: ["wifi", "water", "electricity"],
    tag: "Great Value",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item14/600/400",
  },
  {
    id: 9,
    title: "Electric Kettle",
    location: "Town Center",
    distance: "1.2 km from campus",
    price: 1200,
    beds: 1,
    rating: 4.9,
    reviews: 5,
    amenities: ["wifi", "water", "electricity"],
    tag: "All Inclusive",
    tagColor: "bg-emerald-500",
    image: "https://picsum.photos/seed/item15/600/400",
  },
];

function OrderModal({ onClose }: { onClose: () => void }) {
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
            You can browse all listings for free. Create a free account to book viewings, contact sellers, and save your favourites.
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

export default function ItemsPage() {
  const [showOrderModal, setShowOrderModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0fbf5]">
      {showOrderModal && <OrderModal onClose={() => setShowOrderModal(false)} />}



      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#01452c]/8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-72 overflow-hidden bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/01452c?text=No+Image' }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-[#01452c] text-lg leading-snug">{item.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +254 712 345 678
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-[#012a1b] text-white/50 py-8 px-6 text-center text-sm">
        <p className="font-bold text-white text-sm mb-1">MUST MARKETPLACE</p>
        <p>&copy; {new Date().getFullYear()} Meru University of Science and Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

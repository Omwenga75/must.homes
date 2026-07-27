"use client";

import Link from "next/link";
import {
  X,
  Phone,
  LogIn,
  Home,
} from "lucide-react";
import { useState } from "react";

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

export default function SecondHandPage() {
  return (
    <div className="min-h-screen bg-[#fffbf0]">

      {/* Page Header */}
      <div className="bg-amber-600 py-10 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Second Hand Items
          </h1>
          <p className="text-white/70 text-sm">Quality used items at student-friendly prices</p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondHandItems.map((item) => (
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
      </div>

      {/* Footer */}
      <footer className="bg-[#012a1b] text-white/50 py-8 px-6 text-center text-sm mt-8">
        <p className="font-bold text-white text-sm mb-1">MUST MARKETPLACE</p>
        <p>&copy; {new Date().getFullYear()} Meru University of Science and Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

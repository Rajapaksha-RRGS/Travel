"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamic import with SSR false for 3D avatar
const TravelerAvatar3D = dynamic(() => import("@/components/TravelerAvatar3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-sm h-[460px] flex flex-col items-center justify-center gap-3 bg-[#E4DDD3] rounded-3xl border border-[#D5CFC5]">
      <div className="w-8 h-8 border-2 border-[#67B882] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-[#555E68] font-medium tracking-wide">
        Loading 3D Explorer Avatar...
      </span>
    </div>
  ),
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ECE6DE] text-[#1E232A] selection:bg-[#67B882] selection:text-[#0C1E12]">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVIGATION (English Only)                                   */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#1C2126]/95 backdrop-blur-md px-6 sm:px-10 py-4 flex items-center justify-between text-white border-b border-white/10 shadow-md">
        {/* Brand Logo on Left */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="font-sans font-extrabold text-xl sm:text-2xl tracking-[0.16em] uppercase">
            Trip IT
          </span>
        </Link>

        {/* Center Dropdown Menus */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium tracking-wide">
          <Link href="/" className="hover:text-[#67B882] transition-colors">
            Home
          </Link>

          <button className="flex items-center gap-1.5 hover:text-[#67B882] transition-colors">
            <span>Destinations</span>
            <span className="text-[10px] opacity-70">⌵</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-[#67B882] transition-colors">
            <span>Tour Types</span>
            <span className="text-[10px] opacity-70">⌵</span>
          </button>

          <Link href="/about" className="text-[#86D097] font-semibold flex items-center gap-1">
            <span>About Us</span>
          </Link>
        </nav>

        {/* Right Action Elements */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-[13px] font-medium text-white transition-all border border-white/20"
          >
            ← Back to Home
          </Link>

          <button className="px-5 py-2.5 rounded-full bg-[#86D097] hover:bg-[#72BF84] text-[#0F2E18] text-[13px] font-semibold transition-all shadow-lg shadow-black/20">
            Contact Us
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. ABOUT US HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative py-20 px-6 sm:px-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0D7CC] border border-[#CCC2B5] text-xs font-semibold uppercase tracking-widest text-[#556358] mb-5">
          <span>🧭 OUR PASSION & EXPEDITION MISSION</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1E232A] max-w-4xl leading-tight">
          Passionate About the Timeless Wonders of Sri Lanka
        </h1>

        <p className="text-base sm:text-lg text-[#555E68] max-w-2xl mt-5 leading-relaxed font-light">
          From ascending the ancient Lion Rock fortress of Sigiriya at first dawn, to standing before the monumental 5th-century Aukana Buddha colossus and admiring majestic wild elephant herds in Habarana.
        </p>

        {/* Quick Highlights Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-3xl">
          <div className="bg-white/80 border border-[#D5CFC5] p-5 rounded-2xl shadow-sm">
            <span className="font-serif text-3xl font-bold text-[#1E232A] block">15+</span>
            <span className="text-xs text-[#737C86] uppercase font-medium">Years Experience</span>
          </div>
          <div className="bg-white/80 border border-[#D5CFC5] p-5 rounded-2xl shadow-sm">
            <span className="font-serif text-3xl font-bold text-[#1E232A]">12,000+</span>
            <span className="text-xs text-[#737C86] uppercase font-medium block">Delighted Travelers</span>
          </div>
          <div className="bg-white/80 border border-[#D5CFC5] p-5 rounded-2xl shadow-sm">
            <span className="font-serif text-3xl font-bold text-[#2D5A38]">99.4%</span>
            <span className="text-xs text-[#737C86] uppercase font-medium block">5-Star Satisfaction</span>
          </div>
          <div className="bg-white/80 border border-[#D5CFC5] p-5 rounded-2xl shadow-sm">
            <span className="font-serif text-3xl font-bold text-[#1E232A]">100%</span>
            <span className="text-xs text-[#737C86] uppercase font-medium block">Locally Certified</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 3D TRAVEL BOY AVATAR INTERACTIVE SPOTLIGHT                             */}
      {/* ========================================================================= */}
      <section className="py-12 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-[#DFD7CD] to-[#D5CDC1] border border-[#C5BCB0] rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
          {/* Left Column: Interactive Story & Description */}
          <div className="flex flex-col gap-5 max-w-xl text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/40 text-xs font-semibold text-[#2D5A38] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#67B882] animate-pulse" />
              <span>3D INTERACTIVE GUIDE &bull; LEO</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E232A] leading-tight">
              Meet Leo — Your 3D Travel Companion for Sri Lanka
            </h2>

            <p className="text-[#4A535E] text-sm sm:text-base leading-relaxed">
              Watch Leo follow you as you explore our story! As a curious explorer with his travel backpack, binoculars, and safari cap, he looks directly where your cursor moves and shares his love for Sigiriya, Aukana, and Habarana.
            </p>

            <div className="bg-white/80 border border-[#C9C0B3] p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#86D097]/30 flex items-center justify-center text-lg shrink-0">
                🧭
              </div>
              <div className="text-xs text-[#555E68]">
                <strong className="block text-[#1E232A] font-semibold text-sm">
                  Move your cursor across the screen
                </strong>
                Leo smoothly turns his head and actively looks at whatever you are reading! Click him for a friendly wave and tips.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("mission");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-[#1E232A] hover:bg-[#2C333D] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                Read Our Story ↓
              </button>
            </div>
          </div>

          {/* Right Column: 3D Travel Boy Avatar Canvas */}
          <div className="w-full lg:w-auto flex justify-center z-10">
            <TravelerAvatar3D />
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full border border-white/30 pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full border border-white/20 pointer-events-none" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OUR PHILOSOPHY & VALUES                                                */}
      {/* ========================================================================= */}
      <section id="mission" className="py-20 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#738276]">
            OUR CORE PILLARS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E232A] mt-2">
            Why Travelers Choose Trip IT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#DDD7CD] shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F3EB] text-[#2D5A38] flex items-center justify-center text-2xl">
              🌿
            </div>
            <h3 className="font-serif text-2xl text-[#1E232A]">
              Ethical & Respectful
            </h3>
            <p className="text-sm text-[#555E68] leading-relaxed">
              We deeply respect the sanctity of Buddhist sanctuaries like Aukana and maintain careful distance when observing wild elephant herds in Habarana. No mass tourism, only pure authenticity.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#DDD7CD] shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F3EB] text-[#2D5A38] flex items-center justify-center text-2xl">
              🏛️
            </div>
            <h3 className="font-serif text-2xl text-[#1E232A]">
              Deep Local Expertise
            </h3>
            <p className="text-sm text-[#555E68] leading-relaxed">
              Our certified naturalist guides and private chauffeurs were born and raised in the Cultural Triangle. They know the exact hours when sunlight illuminates Sigiriya and where wild elephants gather.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#DDD7CD] shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F3EB] text-[#2D5A38] flex items-center justify-center text-2xl">
              ✨
            </div>
            <h3 className="font-serif text-2xl text-[#1E232A]">
              Tailored Luxury Travel
            </h3>
            <p className="text-sm text-[#555E68] leading-relaxed">
              From the moment you land at Colombo to your final sunset: your entire expedition is supported with private air-conditioned comfort, curated boutique eco-lodges, and 24/7 personalized care.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MEET OUR EXPERT GUIDES                                                 */}
      {/* ========================================================================= */}
      <section className="py-16 px-6 sm:px-10 max-w-6xl mx-auto border-t border-[#DDD7CD]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#738276]">
            THE ON-GROUND TEAM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E232A] mt-2">
            Our Local Heritage & Wildlife Guides
          </h2>
          <p className="text-sm text-[#555E68] mt-2">
            Passionate individuals who bring the legends of ancient kings and the wild secrets of the jungle to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Shantha Bandara",
              role: "Head Cultural & Heritage Guide",
              specialty: "Historian specialized in Aukana & Anuradhapura kingdoms",
              experience: "18 years experience",
              image: "/images/aukana.jpg",
            },
            {
              name: "Nalin Kumara",
              role: "Wildlife & Safari Specialist",
              specialty: "Naturalist expert for Minneriya & Habarana elephants",
              experience: "14 years experience",
              image: "/images/habarana.jpg",
            },
            {
              name: "Dilini Senanayake",
              role: "Travel Advisor & Route Architect",
              specialty: "Curator of luxury eco-lodges & bespoke family circuits",
              experience: "11 years experience",
              image: "/images/sigiriya.jpg",
            },
          ].map((guide, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#DDD7CD] shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <strong className="block text-lg font-serif">{guide.name}</strong>
                  <span className="text-xs text-white/80">{guide.role}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between gap-3 text-sm">
                <p className="text-[#555E68] text-xs leading-relaxed">{guide.specialty}</p>
                <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs text-[#2D5A38] font-semibold">
                  <span>★ {guide.experience}</span>
                  <span className="text-[#737C86]">Licensed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION                                                         */}
      {/* ========================================================================= */}
      <section className="py-14 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="bg-[#1C2126] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl text-center md:text-left">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-light">
              Design Your Dream Journey to Sri Lanka
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Connect with our dedicated travel architects today. We will gladly help you design the perfect itinerary spanning Sigiriya, Aukana, and Habarana.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/20"
            >
              Explore Home Page
            </Link>
            <button className="px-7 py-3.5 rounded-full bg-[#86D097] hover:bg-[#72BF84] text-[#0F2E18] text-xs sm:text-sm font-semibold transition-all shadow-lg">
              Contact Our Experts
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="bg-[#181C20] text-white/70 py-12 px-6 sm:px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-extrabold text-white text-base tracking-[0.16em]">
              Trip IT
            </span>
            <span>Specialists in bespoke cultural and wildlife expeditions across Sri Lanka.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition-colors text-white font-semibold">
              About Us
            </Link>
            <a href="#mission" className="hover:text-white transition-colors">
              Our Mission
            </a>
          </div>

          <div className="text-white/50 text-[11px]">
            &copy; {new Date().getFullYear()} Trip IT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

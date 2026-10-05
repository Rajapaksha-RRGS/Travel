"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// The 3 iconic destinations requested by the user
const HERO_SLIDES = [
  {
    id: "sigiriya",
    titleLine1: "Expedition to Sigiriya, Aukana &",
    titleLine2: "Wild Elephants of Habarana",
    subtitle:
      "Explore the highlights of Sri Lanka on this bespoke expedition. Follow an awe-inspiring heritage circuit surrounded by panoramic jungle vistas, pristine wildlife, and sacred ancient sanctuaries.",
    image: "/images/sigiriya.jpg",
    locationTag: "SRI LANKA • SIGIRIYA",
    highlightName: "Sigiriya Lion Rock",
    quoteLeft: {
      text: "Standing atop the Lion Rock at sunrise was pure magic. In just a few days, we experienced thousands of years of royal history.",
      author: "Linda Wagenmakers",
      meta: "2024 – Sri Lanka Expedition",
      avatar: "LW",
    },
    quoteRight: {
      text: "The climb to Sigiriya's summit before the morning heat was unforgettable. A truly world-class travel experience.",
      author: "Mark & Sophie van Dijk",
      meta: "2024 – Cultural Circuit",
      avatar: "MS",
    },
  },
  {
    id: "aukana",
    titleLine1: "Sacred Aukana Buddha Colossus &",
    titleLine2: "Ancient Royal Kingdoms of Lanka",
    subtitle:
      "Behold the monumental 12-meter standing Buddha statue carved from solid granite in the 5th century during King Dhatusena's reign, glowing in serene morning sunlight amidst sacred forest tranquility.",
    image: "/images/aukana.jpg",
    locationTag: "SRI LANKA • AUKANA",
    highlightName: "Aukana Buddha Statue",
    quoteLeft: {
      text: "The delicate drape of the stone robe carved 1,500 years ago is breathtakingly sharp. Absolute peace and spiritual reverence.",
      author: "Dr. Pieter Visser",
      meta: "2024 – History & Archaeology",
      avatar: "PV",
    },
    quoteRight: {
      text: "Our guide brought us to Aukana right at dawn before any crowds arrived. The sunrise on the granite cliff is etched in our memories.",
      author: "Annelies Bakker",
      meta: "2024 – Sacred Temples",
      avatar: "AB",
    },
  },
  {
    id: "habarana",
    titleLine1: "Wild Elephants of Habarana &",
    titleLine2: "Untamed Safari of Minneriya",
    subtitle:
      "Witness the greatest natural gathering of Asian wild elephants in the world across the shimmering reservoirs and lush grasslands of Habarana, where herds roam freely in complete harmony.",
    image: "/images/habarana.jpg",
    locationTag: "SRI LANKA • HABARANA",
    highlightName: "Habarana Wildlife Safari",
    quoteLeft: {
      text: "We counted over 180 wild elephants grazing by the water reservoir at dusk. It felt like stepping directly into National Geographic.",
      author: "Bram & Chantal",
      meta: "2024 – Wildlife Safari",
      avatar: "BC",
    },
    quoteRight: {
      text: "Trip IT crafted the journey of a lifetime. Seamlessly organized with an exceptionally knowledgeable local naturalist guide.",
      author: "Roelof de Vries",
      meta: "2024 – Nature & Wilderness",
      avatar: "RV",
    },
  },
];

export default function HomePage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "overview" | "itinerary" | "practical" | "reviews"
  >("overview");
  const [openDay, setOpenDay] = useState<number>(1);

  // Auto-switch slides every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <div className="min-h-screen bg-[#ECE6DE] text-[#1E232A] selection:bg-[#67B882] selection:text-[#0C1E12]">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVIGATION (English Only)                                   */}
      {/* ========================================================================= */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 flex items-center justify-between text-white">
        {/* Brand Logo on Left */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="font-sans font-extrabold text-xl sm:text-2xl tracking-[0.16em] uppercase">
            Trip IT
          </span>
        </Link>

        {/* Center Dropdown Menus */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium tracking-wide">
          <button className="flex items-center gap-1.5 hover:text-[#67B882] transition-colors">
            <span>Destinations</span>
            <span className="text-[10px] opacity-70">⌵</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-[#67B882] transition-colors">
            <span>Tour Types</span>
            <span className="text-[10px] opacity-70">⌵</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-[#67B882] transition-colors">
            <span>Themes</span>
            <span className="text-[10px] opacity-70">⌵</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-[#67B882] transition-colors">
            <span>Special Offers</span>
            <span className="text-[10px] opacity-70">⌵</span>
          </button>

          <Link href="/about" className="hover:text-[#67B882] transition-colors font-medium">
            About Us
          </Link>
        </nav>

        {/* Right Action Elements */}
        <div className="flex items-center gap-3">
          {/* Travel Deals Pill Button */}
          <button className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-[13px] font-medium text-white transition-all border border-white/20">
            Travel Deals
          </button>

          {/* Search Input Pill */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/35 hover:bg-black/45 backdrop-blur-md border border-white/25 text-[13px] text-white/90 transition-all w-60">
            <span className="text-white/60 text-xs truncate">
              Search tour or destination...
            </span>
            <span className="ml-auto text-white/70 text-sm">⌕</span>
          </div>

          {/* Green Contact Pill CTA Button */}
          <button className="px-5 py-2.5 rounded-full bg-[#86D097] hover:bg-[#72BF84] text-[#0F2E18] text-[13px] font-semibold transition-all shadow-lg shadow-black/20">
            Contact Us
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (100vh Fullscreen Transitioning Canvas)                   */}
      {/* ========================================================================= */}
      <section className="relative w-full h-screen min-h-[700px] max-h-[1050px] overflow-hidden flex flex-col justify-between">
        {/* Background Images with Crossfade & Slow Zoom */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out scale-105"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: idx === currentSlideIndex ? "scale(1.04)" : "scale(1)",
              }}
            />
            {/* Cinematic Vignette & Atmospheric Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        ))}

        {/* Slide Selector Indicators (Moved down near bottom of hero) */}
        <div className="absolute bottom-16 right-6 sm:right-10 z-30 flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all shadow-md ${
                idx === currentSlideIndex
                  ? "bg-white text-black font-semibold shadow-lg scale-105"
                  : "bg-black/50 text-white/80 hover:bg-black/70 border border-white/20"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  idx === currentSlideIndex ? "bg-[#1E783B]" : "bg-white/50"
                }`}
              />
              <span className="hidden sm:inline">{slide.highlightName}</span>
            </button>
          ))}
        </div>

        {/* Spacer for Top Header */}
        <div className="h-24" />

        {/* Center Main Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center gap-4 my-auto">
          {/* Location Badge (Circular Compass Icon + SRI LANKA Tag) */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs text-white/90 backdrop-blur-sm bg-white/5">
              <span>🧭</span>
            </div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/85">
              {currentSlide.locationTag}
            </span>
          </div>

          {/* Main Headline (Curved luxury serif style) */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.18] tracking-tight drop-shadow-md max-w-4xl">
            <span>{currentSlide.titleLine1}</span>
            <br />
            <span>{currentSlide.titleLine2}</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed mx-auto drop-shadow-sm pt-1">
            {currentSlide.subtitle}
          </p>

          {/* Center Dashed Scroll Indicator */}
          <div className="pt-4 flex flex-col items-center">
            <a
              href="#tabs-section"
              className="w-10 h-10 rounded-full border border-dashed border-white/60 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-all animate-bounce"
            >
              <span className="text-sm">↓</span>
            </a>
          </div>
        </div>

        {/* Floating Testimonial Review Cards */}
        {/* Left Floating Card */}
        <div className="hidden lg:block absolute left-8 xl:left-14 top-1/2 -translate-y-1/2 z-20">
          <div className="bg-[#1C231F]/70 hover:bg-[#1C231F]/85 backdrop-blur-md border border-white/15 rounded-2xl p-5 max-w-[270px] text-white shadow-2xl transition-all">
            <p className="text-[12.5px] leading-relaxed text-white/90 italic font-light">
              &ldquo;{currentSlide.quoteLeft.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#67B882]/30 border border-[#67B882]/60 flex items-center justify-center text-xs font-bold text-[#86D097]">
                {currentSlide.quoteLeft.avatar}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-medium text-white">
                  {currentSlide.quoteLeft.author}
                </span>
                <span className="text-[10.5px] text-white/60">
                  {currentSlide.quoteLeft.meta}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="hidden lg:block absolute right-8 xl:right-14 top-1/2 -translate-y-1/2 z-20">
          <div className="bg-[#242C1E]/70 hover:bg-[#242C1E]/85 backdrop-blur-md border border-white/15 rounded-2xl p-5 max-w-[270px] text-white shadow-2xl transition-all">
            <p className="text-[12.5px] leading-relaxed text-white/90 italic font-light">
              &ldquo;{currentSlide.quoteRight.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#E5B869]/30 border border-[#E5B869]/60 flex items-center justify-center text-xs font-bold text-[#F0CA82]">
                {currentSlide.quoteRight.avatar}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-medium text-white">
                  {currentSlide.quoteRight.author}
                </span>
                <span className="text-[10.5px] text-white/60">
                  {currentSlide.quoteRight.meta}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* Bottom Docked Capsule Navigation Bar (Lifted 8px up)                   */}
        {/* ===================================================================== */}
        <div id="tabs-section" className="relative z-30 w-full flex justify-center px-4 -mb-8 -translate-y-2">
          <div className="inline-flex items-center bg-[#D4D9DC] shadow-xl p-1.5 rounded-full border border-white/40 max-w-4xl w-full justify-between overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-[#8E9FA5] text-white shadow-md"
                  : "text-[#3D474D] hover:text-black"
              }`}
            >
              General Information
            </button>

            <button
              onClick={() => setActiveTab("itinerary")}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "itinerary"
                  ? "bg-[#8E9FA5] text-white shadow-md"
                  : "text-[#3D474D] hover:text-black"
              }`}
            >
              Itinerary
            </button>

            <button
              onClick={() => setActiveTab("practical")}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "practical"
                  ? "bg-[#8E9FA5] text-white shadow-md"
                  : "text-[#3D474D] hover:text-black"
              }`}
            >
              Practical Information
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "reviews"
                  ? "bg-[#8E9FA5] text-white shadow-md"
                  : "text-[#3D474D] hover:text-black"
              }`}
            >
              Traveler Reviews
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BELOW-HERO TAB CONTENT PANELS (English Only)                           */}
      {/* ========================================================================= */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 pb-28">
        {/* TAB 1: General Information */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-14 animate-fade-in">
            {/* Title & Introduction */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8D2C8] pb-8">
              <div className="max-w-2xl flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#738276]">
                  TOUR HIGHLIGHTS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1E232A]">
                  Three Iconic Treasures of Sri Lanka
                </h2>
                <p className="text-[#555E68] text-base leading-relaxed">
                  A breathtaking journey through the cultural and ecological heart of the island. Combine the legendary rock citadel of Sigiriya, the serene 5th-century Aukana Buddha colossus, and the awe-inspiring wild elephant gathering in Habarana.
                </p>
              </div>

              {/* Quick Trip Badges */}
              <div className="flex items-center gap-3">
                <div className="bg-white/80 border border-[#D5CFC5] px-4 py-2.5 rounded-2xl shadow-sm text-center">
                  <span className="block text-lg font-serif font-bold text-[#1E232A]">8 Days</span>
                  <span className="text-[11px] text-[#737C86] uppercase">Duration</span>
                </div>
                <div className="bg-white/80 border border-[#D5CFC5] px-4 py-2.5 rounded-2xl shadow-sm text-center">
                  <span className="block text-lg font-serif font-bold text-[#1E232A]">Private Driver</span>
                  <span className="text-[11px] text-[#737C86] uppercase">Included</span>
                </div>
                <div className="bg-white/80 border border-[#D5CFC5] px-4 py-2.5 rounded-2xl shadow-sm text-center">
                  <span className="block text-lg font-serif font-bold text-[#1E232A]">Boutique</span>
                  <span className="text-[11px] text-[#737C86] uppercase">Eco-Lodges</span>
                </div>
              </div>
            </div>

            {/* 3 Highlight Destination Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Sigiriya */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#DDD7CD] flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/sigiriya.jpg"
                    alt="Sigiriya Lion Rock Fortress"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                    UNESCO World Heritage
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1E232A] mb-1">
                      Sigiriya Lion Rock
                    </h3>
                    <p className="text-sm text-[#5C6670] leading-relaxed">
                      Scale the 200-meter monolith of King Kasyapa, marvel at the 1,500-year-old painted frescoes, and admire the mirrored wall and royal landscaped water gardens.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs text-[#7B858F]">
                    <span>Best Time: 06:30 – 09:30 AM</span>
                    <span className="text-[#3D6B48] font-semibold">Key Highlight →</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Aukana */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#DDD7CD] flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/aukana.jpg"
                    alt="Aukana Buddha Statue"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                    5th Century Masterpiece
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1E232A] mb-1">
                      Aukana Buddha Colossus
                    </h3>
                    <p className="text-sm text-[#5C6670] leading-relaxed">
                      A monumental 12-meter standing Buddha statue carved from a single sheer granite cliff under King Dhatusena. Experience the blessing of fearlessness in dawn serenity.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs text-[#7B858F]">
                    <span>Best Time: 07:00 – 10:00 AM</span>
                    <span className="text-[#3D6B48] font-semibold">Sacred Sanctuary →</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Habarana */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#DDD7CD] flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/habarana.jpg"
                    alt="Habarana Wild Elephants"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                    Wild Elephant Safari
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1E232A] mb-1">
                      Habarana & Minneriya Safari
                    </h3>
                    <p className="text-sm text-[#5C6670] leading-relaxed">
                      Venture on an open 4x4 safari jeep in search of colossal herds of wild Asian elephants gathered near the ancient lakes. Enjoy golden sunsets and rich birdlife.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs text-[#7B858F]">
                    <span>Best Time: 03:30 – 06:30 PM</span>
                    <span className="text-[#3D6B48] font-semibold">Wildlife Safari →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action Banner */}
            <div className="bg-[#212925] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="flex flex-col gap-2 max-w-xl text-center md:text-left">
                <h3 className="font-serif text-2xl sm:text-3xl font-light">
                  Ready to experience this tailored journey?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our destination experts will gladly tailor a private expedition for you, complete with a private guide, boutique eco-lodges, and flexible departure dates.
                </p>
              </div>
              <button className="px-8 py-3.5 rounded-full bg-[#86D097] hover:bg-[#72BF84] text-[#0F2E18] text-sm font-semibold transition-all shadow-lg whitespace-nowrap">
                Request a Custom Quote
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Itinerary */}
        {activeTab === "itinerary" && (
          <div className="flex flex-col gap-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#738276]">
                DAY-BY-DAY ITINERARY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E232A] mt-1">
                Your Complete Travel Program
              </h2>
              <p className="text-[#555E68] text-sm mt-2">
                Every day is thoughtfully timed for cool morning explorations, relaxed village dining, and sunset wildlife encounters.
              </p>
            </div>

            {/* Accordion Days */}
            <div className="space-y-4">
              {[
                {
                  day: 1,
                  title: "Arrival in Colombo & Gateway to the Cultural Triangle",
                  summary:
                    "Meet and greet by your dedicated private chauffeur-guide at Bandaranaike International Airport. Scenic drive through lush central countryside to your secluded boutique eco-lodge near Sigiriya.",
                  highlight: "Candlelit welcome dinner under the tropical stars",
                },
                {
                  day: 2,
                  title: "The Majestic Sigiriya Lion Rock at Dawn",
                  summary:
                    "Early morning ascent of the 1,200 steps to the top of Sigiriya before the midday heat. Marvel at the ancient mirror wall, royal throne, and panoramic 360-degree canopy views.",
                  highlight: "Sunrise light across royal landscaped gardens",
                },
                {
                  day: 3,
                  title: "Sacred Aukana Buddha Colossus & Ancient Kalawewa Reservoir",
                  summary:
                    "Excursion to the 12-meter standing granite Buddha of Aukana, a masterpiece of 5th-century hydraulic civilization. Afternoon relaxation along the monumental embankment of Kalawewa reservoir.",
                  highlight: "Traditional village lunch with fresh organic spices",
                },
                {
                  day: 4,
                  title: "4x4 Wildlife Safari & Wild Elephant Gathering in Habarana",
                  summary:
                    "Board your private open safari jeep into the lush forests and waterways of Habarana and Minneriya. Witness herds of more than 150 elephants with newborn calves bathing at sunset.",
                  highlight: "Golden hour wildlife photography across the lake",
                },
                {
                  day: 5,
                  title: "Hidden Monastic Caves of Resvehera & Return",
                  summary:
                    "Visit the ancient forest monastery of Resvehera featuring 99 meditation caves carved with early Brahmi inscriptions, before relaxed departure to the coast or airport.",
                  highlight: "Peaceful blessings in ancient monastic sanctuaries",
                },
              ].map((item) => (
                <div
                  key={item.day}
                  className="bg-white rounded-2xl border border-[#DDD7CD] overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenDay(openDay === item.day ? 0 : item.day)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F9F7F3] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#8E9FA5]/20 text-[#3D474D] font-serif font-bold flex items-center justify-center text-sm shrink-0">
                        {item.day}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#67B882]">
                          DAY {item.day}
                        </span>
                        <h4 className="font-serif text-lg text-[#1E232A]">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xl text-[#7B858F] font-light">
                      {openDay === item.day ? "−" : "+"}
                    </span>
                  </button>

                  {openDay === item.day && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#F0ECE6] flex flex-col gap-3 text-sm text-[#555E68] bg-[#FAF8F5]">
                      <p className="leading-relaxed">{item.summary}</p>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D5A38] bg-[#E8F3EB] px-3 py-1.5 rounded-full w-fit">
                        <span>★ Key Highlight:</span>
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Practical Information */}
        {activeTab === "practical" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-3xl p-8 border border-[#DDD7CD] shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3EB] text-[#2D5A38] flex items-center justify-center text-xl">
                🌤️
              </div>
              <h3 className="font-serif text-2xl text-[#1E232A]">
                Best Travel Seasons
              </h3>
              <p className="text-sm text-[#555E68] leading-relaxed">
                The Cultural Triangle (Sigiriya, Aukana, and Habarana) is ideal for travel year-round. The most popular dry months with clear blue skies are <strong>December to April</strong> and <strong>July to September</strong>.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#DDD7CD] shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3EB] text-[#2D5A38] flex items-center justify-center text-xl">
                👗
              </div>
              <h3 className="font-serif text-2xl text-[#1E232A]">
                Temple Dress Code & Etiquette
              </h3>
              <p className="text-sm text-[#555E68] leading-relaxed">
                When visiting sacred sites like the Aukana Buddha Colossus, shoulders and knees must be covered, and footwear removed at temple thresholds. Light white or modest cotton attire is warmly appreciated.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#DDD7CD] shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3EB] text-[#2D5A38] flex items-center justify-center text-xl">
                🚗
              </div>
              <h3 className="font-serif text-2xl text-[#1E232A]">
                Private Chauffeur & Comfort
              </h3>
              <p className="text-sm text-[#555E68] leading-relaxed">
                You travel in a modern, air-conditioned private vehicle with a seasoned English-speaking chauffeur-guide who knows every scenic backroad and safe elephant crossing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#DDD7CD] shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3EB] text-[#2D5A38] flex items-center justify-center text-xl">
                🐘
              </div>
              <h3 className="font-serif text-2xl text-[#1E232A]">
                Ethical Wildlife Watching
              </h3>
              <p className="text-sm text-[#555E68] leading-relaxed">
                All our safaris strictly prioritize animal welfare: we maintain a respectful distance from wild elephant herds, turn off engines when observing, and strictly enter with licensed wildlife rangers.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: Traveler Reviews */}
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#738276]">
                TESTIMONIALS & EXPERIENCES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E232A] mt-1">
                What Our Travelers Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote:
                    "Seeing over 150 wild elephants gathered around the Habarana reservoir at sunset was a lifelong dream come true. Our private guide Shantha took such good care of us!",
                  author: "The Harrison Family",
                  location: "London, UK",
                  rating: 5,
                  highlight: "Habarana Elephant Safari",
                },
                {
                  quote:
                    "Climbing Sigiriya at 7 AM was perfectly timed. No lines, cool morning breeze, and an astonishing view from the top. Standing before the Aukana Buddha gave us goosebumps.",
                  author: "Jasper & Laura",
                  location: "Sydney, Australia",
                  rating: 5,
                  highlight: "Sigiriya & Aukana",
                },
                {
                  quote:
                    "Everything was organized with impeccable attention to detail. The boutique lodges tucked away in nature were stunning and the Sri Lankan food was sensational.",
                  author: "Claire & Thomas",
                  location: "Toronto, Canada",
                  rating: 5,
                  highlight: "Cultural Triangle Tour",
                },
                {
                  quote:
                    "The combination of ancient cultural heritage at Aukana and the wild natural beauty of Habarana made this our finest family vacation ever. Highly recommended!",
                  author: "David & Sarah Miller",
                  location: "San Francisco, USA",
                  rating: 5,
                  highlight: "Culture & Wildlife",
                },
              ].map((rev, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-[#DDD7CD] shadow-sm flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-[#E5B869] text-sm">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-sm text-[#4A535E] italic leading-relaxed">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-[#1E232A] font-medium">{rev.author}</strong>
                      <span className="text-[#848E98]">{rev.location}</span>
                    </div>
                    <span className="text-[#3D6B48] font-semibold bg-[#E8F3EB] px-2.5 py-1 rounded-full text-[11px]">
                      {rev.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER (English Only)                                                  */}
      {/* ========================================================================= */}
      <footer className="bg-[#1C2126] text-white/70 py-14 px-6 sm:px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-extrabold text-white text-base tracking-[0.16em]">
              Trip IT
            </span>
            <span>Specialists in bespoke cultural and wildlife expeditions across Sri Lanka.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Destinations</Link>
            <Link href="/" className="hover:text-white transition-colors">Itinerary</Link>
            <Link href="/" className="hover:text-white transition-colors">Practical Info</Link>
            <Link href="/about" className="hover:text-white transition-colors font-medium">About Us</Link>
          </div>

          <div className="text-white/50 text-[11px]">
            &copy; {new Date().getFullYear()} Trip IT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Camera, BookOpen, MapPin, ArrowLeft, ExternalLink } from "lucide-react";

const photographyGallery = [
  {
    title: "Golden Hour",
    description: "Capturing the magic of sunset light filtering through the trees",
    gradient: "from-amber-500/20 to-orange-600/20",
    icon: "🌅",
  },
  {
    title: "Street Moments",
    description: " candid shots of everyday life and urban stories",
    gradient: "from-blue-500/20 to-indigo-600/20",
    icon: "🏙️",
  },
  {
    title: "Nature Close-ups",
    description: "Finding beauty in the smallest details of the natural world",
    gradient: "from-emerald-500/20 to-teal-600/20",
    icon: "🌿",
  },
  {
    title: "Night Photography",
    description: "Exploring light trails and cityscapes after dark",
    gradient: "from-purple-500/20 to-violet-600/20",
    icon: "🌙",
  },
  {
    title: "People & Portraits",
    description: "Connecting with people through the lens, capturing genuine emotions",
    gradient: "from-rose-500/20 to-pink-600/20",
    icon: "📸",
  },
  {
    title: "Travel Diaries",
    description: "Documenting journeys and the stories behind every destination",
    gradient: "from-cyan-500/20 to-sky-600/20",
    icon: "✈️",
  },
];

const booksReading = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Craftsmanship",
    description: "A handbook of agile software craftsmanship — learning to write maintainable, readable code.",
    gradient: "from-emerald-500/20 to-green-600/20",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Personal Development",
    description: "Building good habits and breaking bad ones — applicable to both coding and life.",
    gradient: "from-blue-500/20 to-cyan-600/20",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "Programming",
    description: "Your journey to mastery — timeless advice for software developers.",
    gradient: "from-purple-500/20 to-violet-600/20",
  },
  {
    title: "System Design Interview",
    author: "Alex Xu",
    category: "Technical",
    description: "Preparing for system design interviews and understanding large-scale architectures.",
    gradient: "from-amber-500/20 to-orange-600/20",
  },
];

const travelDestinations = [
  {
    name: "Kuakata",
    region: "Patuakhali, Barishal",
    description: "The daughter of the sea — witnessing sunrise and sunset from the same beach. Kuakata's pristine shoreline and natural beauty left a lasting impression.",
    gradient: "from-blue-500/20 to-cyan-600/20",
    icon: "🌊",
  },
  {
    name: "Cox's Bazar",
    region: "Chittagong Division",
    description: "The world's longest natural sea beach. Walking along the 120km sandy shore was an unforgettable experience.",
    gradient: "from-emerald-500/20 to-teal-600/20",
    icon: "🏖️",
  },
  {
    name: "Barishal",
    region: "Barishal Division",
    description: "The Venice of Bengal — exploring the rivers, canals, and rich cultural heritage of southern Bangladesh.",
    gradient: "from-indigo-500/20 to-blue-600/20",
    icon: "⛵",
  },
  {
    name: "Khulna",
    region: "Khulna Division",
    description: "Gateway to the Sundarbans — experiencing the world's largest mangrove forest and the Royal Bengal Tiger's habitat.",
    gradient: "from-green-500/20 to-emerald-600/20",
    icon: "🐅",
  },
  {
    name: "St. Martin's Island",
    region: "Cox's Bazar",
    description: "Bangladesh's only coral island — crystal clear waters, vibrant marine life, and untouched natural paradise.",
    gradient: "from-cyan-500/20 to-sky-600/20",
    icon: "🐠",
  },
  {
    name: "Sylhet",
    region: "Sylhet Division",
    description: "The land of two leaves and a bud — lush tea gardens, orange groves, and the spiritual shrines of Hazrat Shahjalal.",
    gradient: "from-lime-500/20 to-green-600/20",
    icon: "🍃",
  },
];

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/#home"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My <span className="text-emerald-400">Hobbies</span> & Interests
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Beyond coding, I enjoy photography, reading, and exploring new places. 
            These are the things that keep me inspired and creative.
          </p>
        </div>

        {/* Photography Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <Camera className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Photography</h2>
              <p className="text-slate-400 text-sm">Capturing moments through my lens</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographyGallery.map((item, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-400/30 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <p className="text-slate-300 text-sm italic">
              &ldquo;Photography is the story I fail to put into words.&rdquo; — Destin Sparks
            </p>
          </div>
        </section>

        {/* Books Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">What I&apos;m Reading</h2>
              <p className="text-slate-400 text-sm">Books that shape my thinking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {booksReading.map((book, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${book.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/30 transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{book.title}</h3>
                    <p className="text-slate-400 text-sm">by {book.author}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    {book.category}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">{book.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <MapPin className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Places I&apos;ve Explored</h2>
              <p className="text-slate-400 text-sm">Journey through the beauty of Bangladesh</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelDestinations.map((dest, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br ${dest.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{dest.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{dest.name}</h3>
                    <p className="text-slate-400 text-xs">{dest.region}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">{dest.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Connecting with People */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Connecting with People</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              One of my greatest joys is connecting with people from diverse backgrounds. 
              Whether it&apos;s through photography, travel, or tech communities, I love learning 
              from others&apos; experiences and perspectives. Every conversation teaches something new.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Tech Communities", "Photography Groups", "University Events", "Online Forums", "Local Meetups"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

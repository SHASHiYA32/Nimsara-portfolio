"use client";

import React, { useState, MouseEvent } from "react";
import {
  ArrowDownRight,
  Bird,
  FolderGit2,
  Link,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import avatarImgSrc from "@/src/assets/images/developer_avatar_1785407010646.jpg";

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "94723513533";
  const whatsappNumber = "94723513533";
  const whatsappMessage = encodeURIComponent(
    "Hi Shashintha, I saw your portfolio and would like to discuss a project with you!",
  );

  const emailAddress = "shashinthanimsara.perera@gmail.com";
  const emailSubject = encodeURIComponent(
    "Project Inquiry / Hiring Opportunity",
  );
  const emailBody = encodeURIComponent(
    "Hi Shashintha,\n\nI came across your portfolio and I'm interested in working with you.\n\nProject details:",
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -20,
      y: (x / rect.width) * 20,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="pt-36 sm:pt-44 pb-20 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Headline Column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-zinc-200 shadow-sm border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Ready for High-Impact Full-Stack Engineering
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Full-Stack Developer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
                & UI/UX Specialist
              </span>
            </h1>
          </div>

          {/* Short Bio Summary */}
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Bridging the gap between robust server-side architecture and
            pixel-perfect front-end design to build lightning-fast,
            production-ready web ecosystems.
          </p>

          {/* Micro Stats Row */}
          <div className="grid grid-cols-3 gap-4 py-3 w-full max-w-md border-y border-white/10">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                2+
              </div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
                Years Exp.
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                10+
              </div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
                Projects
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                99.9%
              </div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
                Code Quality
              </div>
            </div>
          </div>

          {/* Action Call To Actions */}
          <div className="flex flex-col md:flex-row items-center gap-4 pt-2 w-full">
            <a
              href="#showcase"
              className="w-full px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
            >
              <span>View Projects</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-6 py-3.5 rounded-xl glass-card text-white font-semibold text-sm hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-3 border border-white/10"
            >
              <div className="relative h-3 w-3">
                <div className="absolute bg-green-400 h-3 w-3 rounded-full animate-ping"></div>
                <div className="absolute bg-green-400 h-3 w-3 rounded-full"></div>
              </div>
              <span>Hire Me</span>
            </button>

            {/* Social Icons */}
            <div className="w-full justify-center flex items-center gap-2 ml-auto sm:ml-2 pt-2 sm:pt-0">
              <a
                href="https://github.com/SHASHiYA32"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                aria-label="GitHub Profile"
              >
                <FolderGit2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Link className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                aria-label="Twitter Profile"
              >
                <Bird className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right 3D Tilt Badge Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(2000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 ? "transform 0.5s ease-out" : "none",
            }}
            className="w-full max-w-sm glass-card rounded-3xl p-6 border border-white/15 shadow-2xl relative overflow-hidden group cursor-pointer"
          >
            {/* Background Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all" />

            {/* Card Header ID */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono text-zinc-400 tracking-wider">
                  DEV ID // #04928-F
                </span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                KA - CP, SL
              </div>
            </div>

            {/* Developer Avatar Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 border border-white/10 bg-[#09090b] group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src={avatarImgSrc}
                alt="Shashintha Nimsara Developer Portrait"
                className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="font-bold tracking-wide backdrop-blur-md px-2.5 py-1 rounded-lg bg-black/60 border border-white/10">
                  Software Engineer
                </span>
                <span className="text-[10px] font-mono text-emerald-400 backdrop-blur-md px-2 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>

            {/* Developer Details */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-extrabold text-white">
                  Shashintha Nimsara
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  @SHASHiYA32
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Building scalable backend services, clean component
                architectures, and responsive full-stack applications.
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                  Next.js
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                  TypeScript
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                  Tailwind
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                  React
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl glass-card bg-neutral-900/90 border border-white/10 p-6 text-white shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Let's Connect!</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 text-sm mb-6">
              Choose your preferred way to reach out. The message template will
              be automatically filled for you.
            </p>

            {/* Action Options */}
            <div className="flex flex-col gap-3">
              {/* WhatsApp Option */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 rounded-xl bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 transition-all text-green-300 font-medium"
              >
                {/* WhatsApp Icon */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Chat via WhatsApp</span>
              </a>

              <a
                href={`tel:+${phoneNumber}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 rounded-xl bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 transition-all text-purple-300 font-medium"
              >
                {/* Phone Call Icon */}
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Directly</span>
              </a>

              {/* Email Option */}
              <a
                href={`mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-all text-blue-300 font-medium"
              >
                {/* Email Icon */}
                <svg
                  className="w-6 h-6 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Send an Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

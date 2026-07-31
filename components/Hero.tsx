'use client';

import React, { useState, MouseEvent } from 'react';
import { ArrowDownRight, Bird, Download, ExternalLink, FolderGit2, Link, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import avatarImgSrc from '@/src/assets/images/developer_avatar_1785407010646.jpg';

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -20,
      y: (x / rect.width) * 20
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
            Available for Senior Roles & High-Impact Projects
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
            Architecting ultra-responsive, accessible, and high-performance web applications with a focus on dark minimalist aesthetics, frosted glass optics, and fluid user experiences.
          </p>

          {/* Micro Stats Row */}
          <div className="grid grid-cols-3 gap-4 py-3 w-full max-w-md border-y border-white/10">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">4+</div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">Years Exp.</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">25+</div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">Projects</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">99.9%</div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">Code Quality</div>
            </div>
          </div>

          {/* Action Call To Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full">
            <a
              href="#showcase"
              className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-xl flex items-center gap-2"
            >
              <span>View Projects</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <button
              className="px-6 py-3.5 rounded-xl glass-card text-white font-semibold text-sm hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2 border border-white/10"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Download CV</span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-auto sm:ml-2 pt-2 sm:pt-0">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                aria-label="GitHub Profile"
              >
                <FolderGit2 className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Link className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
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
              transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'none'
            }}
            className="w-full max-w-sm glass-card rounded-3xl p-6 border border-white/15 shadow-2xl relative overflow-hidden group cursor-pointer"
          >
            {/* Background Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all" />

            {/* Card Header ID */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono text-zinc-400 tracking-wider">DEV ID // #04928-F</span>
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
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="font-bold tracking-wide backdrop-blur-md px-2.5 py-1 rounded-lg bg-black/60 border border-white/10">Senior Engineer</span>
                <span className="text-[10px] font-mono text-emerald-400 backdrop-blur-md px-2 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>

            {/* Developer Details */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-extrabold text-white">Shashintha Nimsara</h3>
                <span className="text-xs text-zinc-400 font-mono">@SHASHiYA32</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Building modular design systems, high-speed Vite architectures, and responsive Next.js applications.
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">Next.js 15</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">TypeScript</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">Tailwind v4</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">React 19</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import { Code2, LayoutTemplate, Zap, ShieldCheck, Cpu } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Pillar 1 */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 shadow-sm">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Clean Architecture</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Writing modular, maintainable, and type-safe code bases using TypeScript and modern component design patterns.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 shadow-sm">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Pixel-Perfect UI/UX</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Obsessed with typography, spacing, motion physics, glassmorphism, and responsive accessibility standards.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Speed & Performance</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Optimizing bundle sizes, client-side caching, rendering cycles, and core web vitals for instantaneous load times.
          </p>
        </div>

      </div>
    </section>
  );
}

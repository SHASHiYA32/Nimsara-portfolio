'use client';

import { useEffect, useState } from 'react';

export default function AmbientGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
      className="fixed w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0 transition-opacity duration-300 opacity-90"
    >
      <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.08)_0%,rgba(99,102,241,0.05)_35%,transparent_70%)]" />
    </div>
  );
}

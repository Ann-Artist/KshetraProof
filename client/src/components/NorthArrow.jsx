import React from 'react';
import { Compass } from 'lucide-react';

export const NorthArrow = () => {
  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-2 shadow-float border border-ink-200 flex flex-col items-center justify-center w-10 h-14 select-none">
      <div className="font-mono text-[10px] font-bold text-forest-950 tracking-tight">N</div>
      <Compass className="w-6 h-6 text-brand-700 animate-pulse" />
      <div className="w-2 h-0.5 bg-forest-950 mt-0.5 rounded-full" />
    </div>
  );
};

export default NorthArrow;

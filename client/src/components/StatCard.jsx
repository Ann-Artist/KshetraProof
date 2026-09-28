import React from 'react';
import * as Icons from 'lucide-react';

const TINT_CLASSES = {
  sage: 'bg-tint-sage border-brand-400/40 text-forest-950',
  wheat: 'bg-tint-wheat border-harvest-400/40 text-harvest-700',
  clay: 'bg-tint-clay border-amber-400/40 text-amber-900',
  rose: 'bg-tint-rose border-red-300/60 text-red-900',
  sky: 'bg-tint-sky border-sky-300/60 text-sky-900',
  lilac: 'bg-tint-lilac border-purple-300/60 text-purple-900'
};

export const StatCard = ({ title, value, subtitle, icon, tint = 'sky', trend }) => {
  const IconComponent = Icons[icon] || Icons.HelpCircle;
  const tintClass = TINT_CLASSES[tint] || TINT_CLASSES.sky;

  return (
    <div className={`rounded-2xl p-5 border shadow-card transition-all hover:-translate-y-0.5 ${tintClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-3xl font-bold font-sans tracking-tight block">{value}</span>
          <span className="text-xs font-semibold text-ink-600 uppercase tracking-wide mt-1 block">{title}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center text-forest-950 shadow-sm shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>
      {(subtitle || trend) && (
        <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-xs">
          <span className="text-ink-600 font-medium">{subtitle}</span>
          {trend && (
            <span className="font-semibold px-1.5 py-0.5 rounded bg-white/60 text-forest-900">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;

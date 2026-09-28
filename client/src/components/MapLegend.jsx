import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export const MapLegend = () => {
  const [isOpen, setIsOpen] = useState(true);

  const legendItems = [
    { label: 'Old Cadastral Boundary (1985)', stroke: '#2F6FB5', style: 'solid', fill: 'none' },
    { label: 'Proposed Boundary (Survey)', stroke: '#1E2419', style: 'dashed', fill: 'rgba(30,36,25,0.06)' },
    { label: 'Verified Parcel', stroke: '#2F9E5B', style: 'solid', fill: 'rgba(47,158,91,0.28)' },
    { label: 'Pending Parcel', stroke: '#D9A21B', style: 'solid', fill: 'rgba(217,162,27,0.28)' },
    { label: 'Disputed Boundary', stroke: '#C23B3B', style: 'solid', fill: 'rgba(194,59,59,0.32)' },
    { label: 'Area Mismatch (>5%)', stroke: '#D9782F', style: 'solid', fill: 'rgba(217,120,47,0.30)' },
    { label: 'Government / Goyatan', stroke: '#7B5EA7', style: 'solid', fill: 'rgba(123,94,167,0.24)' },
    { label: 'RTK Boundary Marker (Pillar)', marker: 'BM', color: '#1F3A2B' },
    { label: 'Canal / Drainage Line', stroke: '#3B8DBD', style: 'solid', fill: 'rgba(216,234,243,0.8)' }
  ];

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-3 shadow-float border border-ink-200 max-w-[260px] text-xs">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between font-bold text-forest-950 cursor-pointer select-none pb-1 border-b border-ink-200/60"
      >
        <div className="flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-brand-600" />
          <span>Cadastral Legend</span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-ink-500" /> : <ChevronUp className="w-4 h-4 text-ink-500" />}
      </div>

      {isOpen && (
        <div className="mt-2.5 space-y-2">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {item.marker ? (
                <div className="w-4 h-4 rounded bg-forest-950 text-white font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                  {item.marker}
                </div>
              ) : (
                <div
                  className="w-5 h-3 rounded-sm border shrink-0"
                  style={{
                    borderColor: item.stroke,
                    backgroundColor: item.fill || 'transparent',
                    borderStyle: item.style === 'dashed' ? 'dashed' : 'solid'
                  }}
                />
              )}
              <span className="text-ink-700 font-medium text-[11px] leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapLegend;

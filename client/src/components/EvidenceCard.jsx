import React from 'react';
import { Camera, MapPin, Calendar, User, CheckCircle2 } from 'lucide-react';
import SimTag from './SimTag';

export const EvidenceCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 shadow-card overflow-hidden group hover:border-brand-500 transition">
      <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
        <img
          src={item.url || item.photoUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80'}
          alt={item.title || 'Evidence Photo'}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute top-2 left-2 bg-forest-950/80 backdrop-blur text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <Camera className="w-3 h-3 text-brand-400" />
          <span>Sample Evidence</span>
        </div>
        <div className="absolute top-2 right-2">
          <SimTag label="Mock Evidence" />
        </div>
        <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur text-white text-[11px] px-2 py-1 rounded-lg flex items-center justify-between">
          <span className="font-mono text-brand-400 font-semibold">{item.markerId || 'BM-POINT'}</span>
          <span>{item.accuracy ? `±${item.accuracy}m RTK` : 'GPS Tagged'}</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm text-ink-900 line-clamp-1">{item.title || item.description || 'Boundary Point Photo'}</h4>
        <p className="text-xs text-ink-600 mt-1 line-clamp-2">{item.description || 'Captured during survey verification flight/rover pass.'}</p>

        <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between text-xs text-ink-500">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-ink-600" />
            <span>{item.uploadedBy || item.capturedBy || 'Surveyor'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-ink-600" />
            <span>{item.timestamp ? new Date(item.timestamp).toLocaleDateString() : '28 Sep 2026'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCard;

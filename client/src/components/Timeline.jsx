import React from 'react';
import { Clock, User, FileText, CheckCircle2, AlertCircle, Edit3, Shield } from 'lucide-react';

export const Timeline = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return (
      <div className="p-8 text-center text-ink-500 bg-white rounded-2xl border border-ink-200">
        <Clock className="w-8 h-8 mx-auto mb-2 text-ink-300" />
        <p className="text-sm">No history records found for this parcel.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-ink-200 shadow-card">
      <h3 className="font-bold text-base text-ink-900 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-brand-600" />
        <span>Parcel Version & Audit History</span>
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-ink-200">
        {history.map((item, index) => {
          const isLatest = index === history.length - 1 || index === 0;

          return (
            <div key={item.id || index} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                  isLatest
                    ? 'bg-brand-500 border-white ring-4 ring-brand-500/20'
                    : 'bg-white border-ink-400'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isLatest ? 'bg-forest-950' : 'bg-ink-500'}`} />
              </div>

              {/* Content Card */}
              <div className="bg-canvas rounded-xl p-4 border border-ink-200 hover:border-brand-500 transition">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink-900">{item.action}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-ink-200 text-ink-700 font-semibold">
                      {item.version || `v${index + 1}.0`}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-ink-500">
                    {item.timestamp ? new Date(item.timestamp).toLocaleString() : '28 Sep 2026, 09:00'}
                  </span>
                </div>

                <p className="text-xs text-ink-600 leading-relaxed mt-1">{item.notes}</p>

                <div className="mt-3 pt-2 border-t border-ink-200/60 flex items-center justify-between text-[11px] text-ink-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-ink-600" />
                    <span>{item.actor}</span>
                  </div>
                  <span className="capitalize font-medium text-forest-950 px-2 py-0.5 rounded bg-brand-100/60">
                    Role: {item.role}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;

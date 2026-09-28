import React from 'react';
import { RadioTower, Plane, BatteryMedium, WifiOff, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import SimTag from './SimTag';

export const DeviceStatus = ({ telemetry, onSync }) => {
  return (
    <div className="bg-hero-gradient rounded-3xl p-6 shadow-card border border-brand-400/30">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-forest-950 text-brand-400 flex items-center justify-center shadow-md">
            <RadioTower className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-forest-950 text-base">Survey Hardware Link</h3>
              <SimTag label="Simulated Hardware" />
            </div>
            <p className="text-xs text-ink-600">RTK/CORS Rover, Smart Pole & Survey Drone Telemetry</p>
          </div>
        </div>
        {onSync && (
          <button
            onClick={onSync}
            className="btn btn-ghost text-xs h-9 bg-white/80 hover:bg-white text-forest-950 border-brand-500/40"
          >
            <RefreshCw className="w-3.5 h-3.5 text-brand-600" />
            <span>Test Telemetry Sync</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Smart Pole */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-3 border border-white/60">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide block">Smart Pole</span>
          <div className="flex items-center gap-1.5 mt-1 text-forest-950 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Connected</span>
          </div>
        </div>

        {/* RTK Receiver */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-3 border border-white/60">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide block">RTK Status</span>
          <div className="flex items-center gap-1.5 mt-1 text-emerald-700 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Fixed (CORS)</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-3 border border-white/60">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide block">Precision</span>
          <div className="flex items-center gap-1 mt-1 text-forest-950 font-mono font-bold text-sm">
            <span>±0.03 m</span>
          </div>
        </div>

        {/* Battery */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-3 border border-white/60">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide block">Pole Battery</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-2 rounded-full bg-ink-200 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[78%]" />
            </div>
            <span className="text-xs font-mono font-bold text-forest-950">78%</span>
          </div>
        </div>

        {/* Network */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-3 border border-white/60 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide block">Network Mode</span>
          <div className="flex items-center gap-1.5 mt-1 text-amber-700 font-semibold text-sm">
            <WifiOff className="w-4 h-4 text-amber-600" />
            <span>Offline Field Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;

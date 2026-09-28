import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SimTag from '../components/SimTag';
import { surveyService } from '../services/surveyService';
import {
  RadioTower,
  Plane,
  BatteryMedium,
  WifiOff,
  Wifi,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Send
} from 'lucide-react';

export const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDevices() {
      try {
        const res = await surveyService.getDevices();
        if (res.success) setDevices(res.data);
      } catch (err) {
        console.error('Failed to load devices:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDevices();
  }, []);

  const handleSendTelemetry = async (deviceId) => {
    try {
      const res = await surveyService.updateDeviceTelemetry(deviceId, {
        battery: Math.floor(60 + Math.random() * 35),
        accuracy: (0.01 + Math.random() * 0.03).toFixed(3)
      });
      if (res.success) {
        alert(res.message);
        const refreshed = await surveyService.getDevices();
        if (refreshed.success) setDevices(refreshed.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout title="Survey Hardware & Telemetry Control">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-card flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-ink-900">Hardware Fleet Status</h3>
            <SimTag label="RTK / CORS / Drone Link" />
          </div>
          <p className="text-xs text-ink-500">
            Simulates telemetry inputs from survey drone quadcopter, smart boundary pole rover, and CORS reference base.
          </p>
        </div>
      </div>

      {/* Grid of Hardware Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {devices.map((device) => {
          const isDrone = device.type === 'drone';

          return (
            <div
              key={device.id}
              className="bg-hero-gradient rounded-3xl p-6 border border-brand-400/30 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-forest-950 text-brand-400 flex items-center justify-center font-bold">
                      {isDrone ? <Plane className="w-6 h-6" /> : <RadioTower className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-forest-950 text-base">{device.name}</h4>
                      <span className="font-mono text-xs text-brand-700 font-bold block">{device.id}</span>
                    </div>
                  </div>
                  <SimTag label={device.status} />
                </div>

                {/* Telemetry Grid */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center bg-white/80 p-2.5 rounded-xl border border-white/60">
                    <span className="text-ink-500 font-semibold">Battery Telemetry:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-ink-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${device.battery}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-forest-950">{device.battery}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-white/80 p-2.5 rounded-xl border border-white/60">
                    <span className="text-ink-500 font-semibold">Network Link:</span>
                    <span className="font-semibold flex items-center gap-1 text-amber-700">
                      {device.network === 'offline' ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                      <span className="capitalize">{device.network}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-white/80 p-2.5 rounded-xl border border-white/60">
                    <span className="text-ink-500 font-semibold">GNSS Fix Mode:</span>
                    <span className="font-mono font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="uppercase">{device.gnss}</span>
                    </span>
                  </div>

                  {device.accuracy && (
                    <div className="flex justify-between items-center bg-white/80 p-2.5 rounded-xl border border-white/60">
                      <span className="text-ink-500 font-semibold">Calculated Precision:</span>
                      <span className="font-mono font-bold text-forest-950">±{device.accuracy} meters</span>
                    </div>
                  )}

                  {isDrone && (
                    <div className="flex justify-between items-center bg-white/80 p-2.5 rounded-xl border border-white/60">
                      <span className="text-ink-500 font-semibold">Orthomosaic Images:</span>
                      <span className="font-mono font-bold text-brand-700">{device.imageCount} Frames</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-forest-950/10 flex items-center justify-between">
                <span className="text-[11px] text-ink-500 font-mono">
                  Sync: {new Date(device.lastSync).toLocaleTimeString()}
                </span>
                <button
                  onClick={() => handleSendTelemetry(device.id)}
                  className="btn btn-primary text-xs h-8 px-3"
                >
                  <Send className="w-3 h-3 text-brand-400" />
                  <span>Send Telemetry</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Devices;

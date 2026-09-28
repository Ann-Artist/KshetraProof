import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import SimTag from '../components/SimTag';
import { parcelService } from '../services/parcelService';
import { conflictService } from '../services/conflictService';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  BarChart,
  Bar
} from 'recharts';
import {
  Landmark,
  Grid2x2,
  BadgeCheck,
  Clock,
  Scale,
  TriangleAlert,
  ArrowRight,
  Eye,
  RadioTower,
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashRes, parcelsRes] = await Promise.all([
          parcelService.getDashboard(),
          parcelService.getParcels()
        ]);
        if (dashRes.success) setData(dashRes.data);
        if (parcelsRes.success) setParcels(parcelsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const progressData = [
    { name: 'Verified', value: 1, color: '#2F9E5B' },
    { name: 'Pending', value: 1, color: '#D9A21B' },
    { name: 'Disputed', value: 1, color: '#C23B3B' },
    { name: 'Area Mismatch', value: 1, color: '#D9782F' },
    { name: 'Government', value: 1, color: '#7B5EA7' }
  ];

  const trendData = [
    { day: 'Mon', surveyed: 1, verified: 0 },
    { day: 'Tue', surveyed: 2, verified: 1 },
    { day: 'Wed', surveyed: 3, verified: 1 },
    { day: 'Thu', surveyed: 4, verified: 1 },
    { day: 'Fri', surveyed: 5, verified: 1 }
  ];

  const handleRunAnalysis = async () => {
    try {
      const res = await conflictService.runAnalysis();
      if (res.success) {
        alert(res.message);
        window.location.reload();
      }
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  return (
    <Layout title="Resurvey Control Dashboard">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Villages" value="1" subtitle="Rampur Pilot" icon="Landmark" tint="lilac" />
        <StatCard title="Total Parcels" value={data?.totalParcels || 5} subtitle="Mapped Cadastral" icon="Grid2x2" tint="sky" />
        <StatCard title="Verified" value={data?.verifiedParcels || 1} subtitle="Official Approval" icon="BadgeCheck" tint="sage" />
        <StatCard title="Pending" value={data?.pendingParcels || 1} subtitle="Awaiting Review" icon="Clock" tint="wheat" />
        <StatCard title="Disputed" value={data?.disputedParcels || 1} subtitle="Objections Filed" icon="Scale" tint="rose" />
        <StatCard title="High Conflicts" value={data?.highPriorityConflicts || 2} subtitle="Area & Shift" icon="TriangleAlert" tint="clay" />
      </div>

      {/* Row 2: Hero Hardware Banner & Conflict Analysis CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hardware Callout Card */}
        <div className="lg:col-span-2 contour-bg rounded-3xl p-6 text-white shadow-card border border-forest-800 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-harvest-400 text-forest-950 font-bold">
                SIH26010 Hardware Simulation
              </span>
              <SimTag label="Field Hardware Linked" />
            </div>

            <h3 className="text-xl font-bold text-white leading-tight">
              Survey Drone & CORS/RTK Rover Telemetry Active
            </h3>
            <p className="text-xs text-ink-300 mt-2 max-w-xl leading-relaxed">
              Real-time hardware status simulated for Smart Boundary Poles, RTK CORS reference stations, and high-resolution orthomosaic drone flight missions.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4 text-xs font-mono">
              <div className="bg-forest-900/80 p-2.5 rounded-xl border border-forest-800">
                <span className="text-ink-400 block text-[10px]">SMART POLE</span>
                <span className="text-brand-400 font-bold">CONNECTED</span>
              </div>
              <div className="bg-forest-900/80 p-2.5 rounded-xl border border-forest-800">
                <span className="text-ink-400 block text-[10px]">RTK PRECISION</span>
                <span className="text-emerald-400 font-bold">±0.03 METERS</span>
              </div>
              <div className="bg-forest-900/80 p-2.5 rounded-xl border border-forest-800">
                <span className="text-ink-400 block text-[10px]">DRONE FLIGHT</span>
                <span className="text-harvest-400 font-bold">128 IMAGES</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-forest-800 flex items-center justify-between relative z-10">
            <span className="text-xs text-ink-300">Target Demonstration Parcel: <strong className="text-harvest-400">P-101 (2.00 ac vs 1.85 ac)</strong></span>
            <button onClick={() => navigate('/devices')} className="btn btn-accent text-xs h-9 px-4">
              <RadioTower className="w-3.5 h-3.5" />
              <span>Inspect Devices</span>
            </button>
          </div>
        </div>

        {/* Quick Action Card */}
        <div className="bg-hero-gradient rounded-3xl p-6 border border-brand-400/30 flex flex-col justify-between shadow-card">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-forest-950 text-base">Conflict Detection Engine</h3>
              <SimTag label="Automated" />
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              Scans cadastral database for area mismatches (&gt;5%), boundary shifts (&gt;0.30m), and overlaps against RTK captured points.
            </p>
          </div>

          <div className="space-y-2 mt-4">
            <button
              onClick={handleRunAnalysis}
              className="w-full btn btn-primary text-xs h-10 font-semibold"
            >
              <Play className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
              <span>Run Village Conflict Scan</span>
            </button>
            <button
              onClick={() => navigate('/conflicts')}
              className="w-full btn btn-ghost text-xs h-10 border-brand-500/40 font-semibold"
            >
              <span>View Open Conflicts ({data?.highPriorityConflicts || 2})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Progress Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart: Survey Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-ink-900">Parcel Status Split</h3>
            <span className="text-xs font-mono font-bold text-brand-700">Rampur Pilot</span>
          </div>

          <div className="h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold font-mono text-forest-950">5</span>
              <span className="text-[11px] text-ink-500 font-medium">Total Parcels</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-ink-100 text-xs">
            {progressData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-ink-600 truncate">{item.name}:</span>
                <span className="font-bold font-mono text-ink-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Trend Chart */}
        <div className="card bg-brand-100/60 border-brand-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-forest-950">Survey & Verification Progress</h3>
              <p className="text-xs text-ink-600">Daily RTK boundary points vs officer approvals</p>
            </div>
            <SimTag label="Live Log" />
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <XAxis dataKey="day" stroke="#5B6355" fontSize={11} />
                <YAxis stroke="#5B6355" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="surveyed" stroke="#2F7A5A" fill="#6FA85A" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Audit Timeline */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-ink-900">Recent Survey Events</h3>
            <button onClick={() => navigate('/map')} className="text-xs text-brand-700 font-semibold hover:underline">
              View Map →
            </button>
          </div>

          <div className="space-y-3">
            {data?.recentActivity?.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-canvas border border-ink-200/60">
                <div className="w-7 h-7 rounded-lg bg-forest-950 text-brand-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {item.parcelId.split('-')[1]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink-900">{item.action}</span>
                    <span className="font-mono text-[10px] text-ink-500">{item.version}</span>
                  </div>
                  <p className="text-[11px] text-ink-600 line-clamp-1 mt-0.5">{item.notes}</p>
                  <span className="text-[10px] text-ink-400 block mt-1">By {item.actor} • {new Date(item.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Parcels Overview Table */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-lg text-ink-900">Rampur Village Parcels Directory</h3>
            <p className="text-xs text-ink-500">Recorded 7/12 area vs measured RTK area comparison</p>
          </div>
          <button onClick={() => navigate('/parcels')} className="btn btn-ghost text-xs">
            <span>View All Parcels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="th">Parcel ID</th>
                <th className="th">Survey No.</th>
                <th className="th">Owner Name</th>
                <th className="th">Recorded Area</th>
                <th className="th">Measured Area</th>
                <th className="th">Area Mismatch</th>
                <th className="th">Status</th>
                <th className="th text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {parcels.map((p) => (
                <tr key={p.parcelId} className="hover:bg-canvas transition">
                  <td className="px-4 py-3 font-mono font-bold text-brand-700">{p.parcelId}</td>
                  <td className="px-4 py-3 font-mono text-ink-900">{p.surveyNumber}</td>
                  <td className="px-4 py-3 font-semibold text-ink-900">{p.ownerName}</td>
                  <td className="px-4 py-3 font-mono">{p.recordedArea} ac</td>
                  <td className="px-4 py-3 font-mono font-bold">{p.measuredArea} ac</td>
                  <td className="px-4 py-3 font-mono">
                    {p.areaDifference > 0 ? (
                      <span className={`px-2 py-0.5 rounded font-bold ${p.percentDifference > 5 ? 'bg-amber-100 text-amber-900' : 'text-ink-600'}`}>
                        -{p.areaDifference} ac ({p.percentDifference}%)
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">0.00 ac (Match)</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => navigate(`/parcels/${p.parcelId}`)}
                      className="p-1.5 rounded-lg border border-ink-200 text-ink-700 hover:bg-forest-950 hover:text-white transition"
                      title="Inspect Parcel"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

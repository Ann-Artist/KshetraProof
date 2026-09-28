import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import SimTag from '../components/SimTag';
import ParcelMap from '../components/ParcelMap';
import { conflictService } from '../services/conflictService';
import { parcelService } from '../services/parcelService';
import {
  TriangleAlert,
  Play,
  Filter,
  Eye,
  X,
  ArrowRight,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Conflicts = () => {
  const navigate = useNavigate();
  const [conflicts, setConflicts] = useState([]);
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [targetParcel, setTargetParcel] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConflicts() {
      try {
        const res = await conflictService.getConflicts();
        if (res.success) {
          setConflicts(res.data);
          if (res.data.length > 0) {
            setSelectedConflict(res.data[0]);
            loadTargetParcel(res.data[0].parcelId);
          }
        }
      } catch (err) {
        console.error('Failed to load conflicts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadConflicts();
  }, []);

  const loadTargetParcel = async (pId) => {
    try {
      const pRes = await parcelService.getParcel(pId);
      if (pRes.success) setTargetParcel(pRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectConflict = (c) => {
    setSelectedConflict(c);
    loadTargetParcel(c.parcelId);
  };

  const handleRunScan = async () => {
    try {
      const res = await conflictService.runAnalysis();
      if (res.success) {
        alert(res.message);
        const refreshed = await conflictService.getConflicts();
        if (refreshed.success) setConflicts(refreshed.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredConflicts = conflicts.filter(c => {
    if (filterPriority === 'all') return true;
    return c.priority === filterPriority;
  });

  return (
    <Layout title="Automated Land Conflict Management">
      {/* Top Header Card */}
      <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-ink-900">Area & Boundary Conflict Engine</h3>
            <SimTag label="RTK Algorithmic Scan" />
          </div>
          <p className="text-xs text-ink-500">Flags area mismatch (&gt;5%), boundary shifts, & cadastral record discrepancies.</p>
        </div>

        <button onClick={handleRunScan} className="btn btn-accent text-xs h-10 px-4">
          <Play className="w-4 h-4 fill-forest-950 text-forest-950" />
          <span>Run Scan Engine</span>
        </button>
      </div>

      {/* Main Table & Side Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Conflicts Data Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-ink-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-ink-900">Flagged Conflict Registry</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-ink-500 font-medium">Priority Filter:</span>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="input h-8 text-xs py-0 font-semibold"
              >
                <option value="all">All Priorities ({conflicts.length})</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-ink-200">
                  <th className="th">Conflict ID</th>
                  <th className="th">Parcel</th>
                  <th className="th">Conflict Type</th>
                  <th className="th">Recorded vs Measured</th>
                  <th className="th">Difference</th>
                  <th className="th">Priority</th>
                  <th className="th">Status</th>
                  <th className="th text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filteredConflicts.map((c) => {
                  const isSelected = selectedConflict && selectedConflict.conflictId === c.conflictId;
                  return (
                    <tr
                      key={c.conflictId}
                      onClick={() => handleSelectConflict(c)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-brand-50 border-l-4 border-l-brand-500' : 'hover:bg-canvas'
                      }`}
                    >
                      <td className="px-4 py-3 font-mono font-bold text-brand-700">{c.conflictId}</td>
                      <td className="px-4 py-3 font-mono font-bold text-forest-950">{c.parcelId}</td>
                      <td className="px-4 py-3 font-semibold text-ink-900 capitalize">{c.type.replace('_', ' ')}</td>
                      <td className="px-4 py-3 font-mono">
                        {c.recordedValue} ac vs {c.measuredValue} ac
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-amber-900 bg-amber-50 px-2 rounded">
                        -{c.difference} ac (7.5%)
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800">
                          {c.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={c.status} variant="chip" />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1 rounded bg-forest-950 text-white">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 cols: Side Drawer with Map & Details */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-ink-200 shadow-card space-y-4">
          {selectedConflict ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-ink-100">
                <div>
                  <span className="font-mono text-xs font-bold text-brand-700">{selectedConflict.conflictId}</span>
                  <h3 className="font-bold text-base text-ink-900 mt-0.5">{selectedConflict.title}</h3>
                </div>
                <StatusBadge status={selectedConflict.status} />
              </div>

              {/* Conflict Action Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs">
                <span className="font-bold text-amber-900 block mb-1">Recommended Officer Action:</span>
                <p className="text-amber-800 leading-relaxed">{selectedConflict.recommendedAction}</p>
                <div className="mt-2 text-[11px] font-mono font-bold text-amber-950">
                  Detected Boundary Shift: {selectedConflict.boundaryShiftMetres} meters
                </div>
              </div>

              {/* Mini Map Preview */}
              {targetParcel && (
                <div className="rounded-2xl overflow-hidden border border-ink-200">
                  <ParcelMap
                    parcels={[targetParcel]}
                    selectedParcel={targetParcel}
                    height="240px"
                    center={targetParcel.oldGeometry.coordinates[0][0].reverse()}
                    zoom={18}
                  />
                </div>
              )}

              {/* Action Link */}
              <button
                onClick={() => navigate(`/reviews?parcelId=${selectedConflict.parcelId}`)}
                className="w-full btn btn-primary text-xs h-10 font-bold"
              >
                <span>Proceed to Officer Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="p-6 text-center text-ink-500">Select a conflict row to inspect spatial details.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Conflicts;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import SimTag from '../components/SimTag';
import EvidenceCard from '../components/EvidenceCard';
import Timeline from '../components/Timeline';
import ParcelMap from '../components/ParcelMap';
import { parcelService } from '../services/parcelService';
import {
  Grid2x2,
  MapPin,
  Camera,
  MessageSquareWarning,
  ClipboardCheck,
  FileText,
  ArrowRight,
  ShieldAlert,
  Ruler,
  User,
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const ParcelDetails = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();

  const [parcel, setParcel] = useState(null);
  const [activeTab, setActiveTab] = useState('points'); // 'points' | 'evidence' | 'objections' | 'history'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadParcel() {
      try {
        const res = await parcelService.getParcel(parcelId || 'P-101');
        if (res.success) setParcel(res.data);
      } catch (err) {
        console.error('Failed to load parcel:', err);
      } finally {
        setLoading(false);
      }
    }
    loadParcel();
  }, [parcelId]);

  if (loading) {
    return (
      <Layout title="Parcel Details">
        <div className="p-12 text-center font-mono text-ink-500 animate-pulse">Loading parcel survey record...</div>
      </Layout>
    );
  }

  if (!parcel) {
    return (
      <Layout title="Parcel Not Found">
        <div className="p-12 text-center text-ink-500">
          <p>Parcel {parcelId} could not be located in Rampur village.</p>
          <button onClick={() => navigate('/parcels')} className="mt-4 btn btn-primary">Back to Parcels</button>
        </div>
      </Layout>
    );
  }

  const hasMismatch = parcel.percentDifference > 5;

  return (
    <Layout title={`Parcel Record ${parcel.parcelId}`}>
      {/* Top Header Back Bar */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="btn btn-ghost text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to List</span>
        </button>

        <div className="flex items-center gap-2">
          <StatusBadge status={parcel.status} />
          <SimTag label="RTK Measured" />
        </div>
      </div>

      {/* Hero Card: Area Comparison & Metadata */}
      <div className="bg-hero-gradient rounded-3xl p-6 shadow-card border border-brand-400/30">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-forest-950/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-forest-950 font-mono">{parcel.parcelId}</h2>
              <span className="text-sm font-bold text-ink-600">Survey No. {parcel.surveyNumber} (Sub: {parcel.subdivision})</span>
            </div>
            <p className="text-xs font-mono text-brand-700 mt-0.5">ULPIN: {parcel.ulpin}</p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-ink-500 block uppercase tracking-wider">Recorded Owner</span>
            <span className="text-base font-bold text-forest-950 block">{parcel.ownerName}</span>
            <span className="text-xs text-ink-600 block">{parcel.fatherName} • Khata {parcel.khataNumber}</span>
          </div>
        </div>

        {/* Departure -> Arrival Departure Area Visualizer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/80 backdrop-blur p-4 rounded-2xl border border-white/60">
          <div className="text-center md:text-left">
            <span className="text-xs text-ink-500 font-semibold block">Old 7/12 Land Record</span>
            <span className="text-2xl font-bold font-mono text-ink-900">{parcel.recordedArea} acres</span>
            <span className="text-[11px] text-ink-500 block">Cadastral Sheet 1985</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${hasMismatch ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900'}`}>
              Δ {parcel.areaDifference} acres ({parcel.percentDifference}%)
            </span>
            <div className="w-full flex items-center my-1.5 px-4">
              <div className="w-2.5 h-2.5 rounded-full bg-forest-950" />
              <div className={`flex-1 h-0.5 border-t-2 border-dashed ${hasMismatch ? 'border-amber-600' : 'border-emerald-600'}`} />
              <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            </div>
            <span className="text-[10px] text-ink-500">RTK Shift Analysis</span>
          </div>

          <div className="text-center md:text-right">
            <span className="text-xs text-ink-500 font-semibold block">Simulated RTK Measurement</span>
            <span className={`text-2xl font-bold font-mono ${hasMismatch ? 'text-amber-900' : 'text-emerald-700'}`}>
              {parcel.measuredArea} acres
            </span>
            <span className="text-[11px] text-ink-500 block">{parcel.accuracyClass}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Pills Bar */}
      <div className="bg-white p-3 rounded-2xl border border-ink-200 shadow-card flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-forest-950 uppercase tracking-wide">Quick Workflow Actions:</span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate(`/parcels/${parcel.parcelId}/capture`)}
            className="btn btn-accent text-xs h-9 px-3.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Capture RTK Point</span>
          </button>

          <button
            onClick={() => navigate(`/objections?parcelId=${parcel.parcelId}`)}
            className="btn btn-ghost text-xs h-9 px-3.5"
          >
            <MessageSquareWarning className="w-3.5 h-3.5 text-amber-700" />
            <span>Submit Objection</span>
          </button>

          <button
            onClick={() => navigate(`/reviews?parcelId=${parcel.parcelId}`)}
            className="btn btn-ghost text-xs h-9 px-3.5"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-brand-700" />
            <span>Officer Review</span>
          </button>

          <button
            onClick={() => navigate(`/reports/parcels/${parcel.parcelId}`)}
            className="btn btn-primary text-xs h-9 px-3.5"
          >
            <FileText className="w-3.5 h-3.5 text-brand-400" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Main Content Split: Tabs & Details on Left, Mini Map on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Tabbed Evidence & History */}
        <div className="lg:col-span-7 space-y-4">
          {/* Segmented Tabs Bar */}
          <div className="bg-white p-1.5 rounded-2xl border border-ink-200 shadow-card flex items-center gap-1">
            {[
              { id: 'points', label: `Boundary Points (${parcel.points?.length || 0})`, icon: MapPin },
              { id: 'evidence', label: `Evidence Gallery (${parcel.evidence?.length || 0})`, icon: Camera },
              { id: 'objections', label: `Objections (${parcel.objections?.length || 0})`, icon: MessageSquareWarning },
              { id: 'history', label: `Version Timeline (${parcel.history?.length || 0})`, icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-forest-950 text-white shadow-sm'
                      : 'text-ink-600 hover:bg-ink-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Boundary Points Table */}
          {activeTab === 'points' && (
            <div className="bg-white rounded-2xl p-5 border border-ink-200 shadow-card">
              <h3 className="font-bold text-base text-ink-900 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Captured RTK Boundary Markers</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-ink-200">
                      <th className="th">Code</th>
                      <th className="th">Marker ID</th>
                      <th className="th">Coordinates (Lat, Lng)</th>
                      <th className="th">Precision</th>
                      <th className="th">RTK Status</th>
                      <th className="th">Captured At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {parcel.points?.map((pt) => (
                      <tr key={pt.id} className="hover:bg-canvas">
                        <td className="px-4 py-3 font-mono font-bold text-brand-700">{pt.pointCode}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-forest-950">{pt.markerId}</td>
                        <td className="px-4 py-3 font-mono">{pt.latitude.toFixed(5)}, {pt.longitude.toFixed(5)}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-emerald-700">±{pt.accuracy} m</td>
                        <td className="px-4 py-3 uppercase font-semibold text-emerald-700">{pt.rtkStatus}</td>
                        <td className="px-4 py-3 font-mono text-ink-500">{new Date(pt.capturedAt).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Evidence Gallery */}
          {activeTab === 'evidence' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {parcel.evidence?.map((item) => (
                <EvidenceCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Tab 3: Objections List */}
          {activeTab === 'objections' && (
            <div className="bg-white rounded-2xl p-5 border border-ink-200 shadow-card space-y-3">
              {parcel.objections?.length === 0 ? (
                <p className="text-xs text-ink-500 text-center py-6">No citizen objections filed for this parcel.</p>
              ) : (
                parcel.objections?.map((obj) => (
                  <div key={obj.id} className="p-4 rounded-xl bg-canvas border border-ink-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink-900">{obj.objectorName}</span>
                        <span className="font-mono text-xs text-brand-700 font-semibold">{obj.objectionId}</span>
                      </div>
                      <StatusBadge status={obj.status} />
                    </div>
                    <p className="text-xs text-ink-600 leading-relaxed">{obj.description}</p>
                    <div className="mt-3 pt-2 border-t border-ink-200/60 flex items-center justify-between text-[11px] text-ink-500">
                      <span>Contact: {obj.contact}</span>
                      <span>Submitted: {new Date(obj.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 4: Version Timeline */}
          {activeTab === 'history' && <Timeline history={parcel.history} />}
        </div>

        {/* Right 5 cols: Mini Map & Conflict Status Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Mini Comparison Map */}
          <div className="bg-white rounded-2xl p-4 border border-ink-200 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-ink-900">Boundary Overlay Comparison</h3>
              <span className="text-[11px] text-ink-500 font-mono">Blue = Old | Ink = Proposed</span>
            </div>

            <ParcelMap
              parcels={[parcel]}
              selectedParcel={parcel}
              boundaryPoints={parcel.points || []}
              height="280px"
              center={parcel.oldGeometry.coordinates[0][0].reverse()}
              zoom={18}
            />
          </div>

          {/* Open Conflict Summary Card */}
          {parcel.conflicts?.map((conf) => (
            <div key={conf.id} className="bg-amber-50 rounded-2xl p-5 border border-amber-300 shadow-card">
              <div className="flex items-center gap-2 mb-2 text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <h4 className="font-bold text-base">{conf.title}</h4>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">{conf.recommendedAction}</p>

              <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-amber-950">Shift: {conf.boundaryShiftMetres}m</span>
                <button
                  onClick={() => navigate(`/reviews?parcelId=${parcel.parcelId}`)}
                  className="btn bg-amber-900 text-white text-xs h-8 px-3"
                >
                  Resolve in Officer Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ParcelDetails;

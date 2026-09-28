import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import SimTag from '../components/SimTag';
import ParcelMap from '../components/ParcelMap';
import { parcelService } from '../services/parcelService';
import { Printer, Download, ArrowLeft, Shield, Landmark } from 'lucide-react';

export const ParcelReport = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();

  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await parcelService.getParcel(parcelId || 'P-101');
        if (res.success) setParcel(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [parcelId]);

  if (loading) {
    return (
      <Layout title="Parcel Survey Report">
        <div className="p-12 text-center font-mono text-ink-500 animate-pulse">Generating survey report sheet...</div>
      </Layout>
    );
  }

  if (!parcel) {
    return (
      <Layout title="Report Error">
        <div className="p-12 text-center text-ink-500">Parcel record not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title="Official Resurvey Sheet Report">
      {/* Sticky Action Toolbar */}
      <div className="no-print bg-white p-4 rounded-2xl border border-ink-200 shadow-card flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="btn btn-ghost text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Parcel</span>
        </button>

        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="btn btn-ghost text-xs">
            <Printer className="w-4 h-4 text-forest-950" />
            <span>Print Survey Sheet</span>
          </button>

          <button onClick={() => window.print()} className="btn btn-primary text-xs">
            <Download className="w-4 h-4 text-brand-400" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Printable Survey Sheet Card */}
      <div className="max-w-[820px] mx-auto bg-white p-8 sm:p-10 rounded-2xl border-2 border-ink-200 shadow-xl relative font-sans text-ink-900 leading-normal">
        {/* Rotated DEMO Stamp */}
        <div className="absolute top-8 right-8 pointer-events-none select-none border-4 border-harvest-400/80 text-harvest-700 font-mono text-xl font-extrabold px-3 py-1 rounded-xl rotate-[-8deg] opacity-70">
          DEMO BUILD
        </div>

        {/* Header Block */}
        <div className="flex items-start justify-between border-b-2 border-forest-950 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-forest-950 text-brand-400 flex items-center justify-center font-bold">
              <Landmark className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-forest-950">KshetraProof Survey Verification Report</h1>
              <p className="text-xs text-ink-600 font-medium">SIH26010 Hardware-Assisted Rural Agricultural Land Resurvey System</p>
            </div>
          </div>
        </div>

        {/* Survey-sheet Title Block Grid */}
        <div className="grid grid-cols-4 gap-2 bg-canvas p-4 rounded-xl border border-ink-200 text-xs font-mono mb-6">
          <div><span className="text-ink-500 block text-[10px]">VILLAGE:</span> <strong className="text-forest-950">Rampur</strong></div>
          <div><span className="text-ink-500 block text-[10px]">TALUKA:</span> <strong className="text-forest-950">Khed</strong></div>
          <div><span className="text-ink-500 block text-[10px]">DISTRICT:</span> <strong className="text-forest-950">Nashik</strong></div>
          <div><span className="text-ink-500 block text-[10px]">STATE:</span> <strong className="text-forest-950">Maharashtra</strong></div>

          <div className="mt-2"><span className="text-ink-500 block text-[10px]">SURVEY NO:</span> <strong className="text-brand-700 font-bold">{parcel.surveyNumber} ({parcel.subdivision})</strong></div>
          <div className="mt-2"><span className="text-ink-500 block text-[10px]">PARCEL ID:</span> <strong className="text-brand-700 font-bold">{parcel.parcelId}</strong></div>
          <div className="mt-2"><span className="text-ink-500 block text-[10px]">ULPIN FIELD:</span> <strong>{parcel.ulpin}</strong></div>
          <div className="mt-2"><span className="text-ink-500 block text-[10px]">DATE & SCALE:</span> <strong>28 Sep 2026 | 1:1000</strong></div>
        </div>

        {/* Landholder Ownership Record */}
        <div className="mb-6">
          <h2 className="font-serif text-base font-bold border-b border-ink-200 pb-1 mb-3 text-forest-950">1. Landholder & 7/12 Record Information</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div><span className="text-ink-500">Recorded Owner:</span> <strong className="text-ink-900">{parcel.ownerName}</strong></div>
              <div><span className="text-ink-500">Father/Spouse Name:</span> <span>{parcel.fatherName}</span></div>
              <div><span className="text-ink-500">Khata Register No:</span> <span className="font-mono">{parcel.khataNumber}</span></div>
            </div>
            <div className="space-y-1">
              <div><span className="text-ink-500">Recorded Land Area (7/12):</span> <strong className="font-mono">{parcel.recordedArea} acres</strong></div>
              <div><span className="text-ink-500">Measured Area (RTK CORS):</span> <strong className="font-mono text-brand-700">{parcel.measuredArea} acres</strong></div>
              <div><span className="text-ink-500">Area Difference (Deficit):</span> <span className="font-mono font-bold text-amber-900">-{parcel.areaDifference} ac ({parcel.percentDifference}%)</span></div>
            </div>
          </div>
        </div>

        {/* Map Snapshot */}
        <div className="mb-6">
          <h2 className="font-serif text-base font-bold border-b border-ink-200 pb-1 mb-3 text-forest-950">2. Boundary Geometry & RTK Overlay</h2>
          <div className="rounded-xl overflow-hidden border border-ink-200">
            <ParcelMap
              parcels={[parcel]}
              selectedParcel={parcel}
              boundaryPoints={parcel.points || []}
              height="280px"
              center={parcel.oldGeometry.coordinates[0][0].reverse()}
              zoom={18}
            />
          </div>
        </div>

        {/* Boundary Points Table */}
        <div className="mb-6">
          <h2 className="font-serif text-base font-bold border-b border-ink-200 pb-1 mb-3 text-forest-950">3. Measured RTK Boundary Markers</h2>
          <table className="w-full text-xs font-mono border border-ink-200 rounded-lg overflow-hidden">
            <thead className="bg-canvas">
              <tr className="border-b border-ink-200">
                <th className="th font-mono">Code</th>
                <th className="th font-mono">Marker ID</th>
                <th className="th font-mono">Latitude</th>
                <th className="th font-mono">Longitude</th>
                <th className="th font-mono">Elevation</th>
                <th className="th font-mono">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {parcel.points?.map((pt) => (
                <tr key={pt.id}>
                  <td className="px-3 py-2 font-bold">{pt.pointCode}</td>
                  <td className="px-3 py-2">{pt.markerId}</td>
                  <td className="px-3 py-2">{pt.latitude.toFixed(6)}</td>
                  <td className="px-3 py-2">{pt.longitude.toFixed(6)}</td>
                  <td className="px-3 py-2">{pt.elevation} m</td>
                  <td className="px-3 py-2 text-emerald-700">±{pt.accuracy} m (Fixed)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Evidence & Status Summary */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-6">
          <div className="p-3 bg-canvas rounded-xl border border-ink-200">
            <span className="font-bold text-forest-950 block mb-1">Evidence & Objections</span>
            <div>Field Photo Evidence Count: <strong className="font-mono">{parcel.evidence?.length || 2}</strong></div>
            <div>Citizen Objections Filed: <strong className="font-mono">{parcel.objections?.length || 1}</strong></div>
            <div>Accuracy Classification: <strong className="font-mono text-emerald-700">{parcel.accuracyClass}</strong></div>
          </div>

          <div className="p-3 bg-canvas rounded-xl border border-ink-200">
            <span className="font-bold text-forest-950 block mb-1">Current Workflow Status</span>
            <div className="flex items-center gap-2 mt-1">
              <span>Verified Status:</span>
              <StatusBadge status={parcel.status} />
            </div>
            <div className="mt-1 text-[11px] text-ink-500">Version: {parcel.history?.[parcel.history.length - 1]?.version || 'v2.0'}</div>
          </div>
        </div>

        {/* MANDATORY VERBATIM DISCLAIMER CALLOUT (PRD & Frontend Spec requirement) */}
        <div className="p-4 rounded-xl bg-harvest-100/80 border-2 border-harvest-400 text-xs text-harvest-700 leading-relaxed font-sans">
          <span className="font-bold block mb-1 uppercase tracking-wide">Legal Disclaimer Notice:</span>
          <p className="font-mono text-[11px]">
            This is a survey and verification report for demonstration purposes. It is not a legal title certificate and does not replace an official revenue-department decision.
          </p>
        </div>

        {/* Signature Line */}
        <div className="mt-10 pt-6 border-t border-ink-200 flex items-center justify-between text-xs text-ink-500">
          <div>
            <div className="h-8 border-b border-ink-300 w-48 mb-1" />
            <span>Authorized Cadastral Surveyor</span>
          </div>

          <div className="text-right">
            <div className="h-8 border-b border-ink-300 w-48 mb-1 ml-auto" />
            <span>Revenue Officer Signature & Stamp</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParcelReport;

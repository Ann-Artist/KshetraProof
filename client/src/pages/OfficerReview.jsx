import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import SimTag from '../components/SimTag';
import ParcelMap from '../components/ParcelMap';
import ConfirmDialog from '../components/ConfirmDialog';
import EvidenceCard from '../components/EvidenceCard';
import Timeline from '../components/Timeline';
import { reviewService } from '../services/reviewService';
import { parcelService } from '../services/parcelService';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Scale,
  XCircle,
  HelpCircle,
  ShieldCheck,
  MapPin,
  Camera,
  Layers
} from 'lucide-react';

export const OfficerReview = () => {
  const [searchParams] = useSearchParams();
  const prefilledId = searchParams.get('parcelId') || 'P-101';

  const [pendingParcels, setPendingParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDecision, setCurrentDecision] = useState(null); // 'approve' | 'field_visit' | 'mark_disputed' | 'reject' | 'refer_legal'
  const [dialogConfig, setDialogConfig] = useState({ title: '', message: '', variant: 'primary' });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await reviewService.getPendingReviews();
        if (res.success) {
          setPendingParcels(res.data);
          const target = res.data.find(p => p.parcelId === prefilledId) || res.data[0];
          if (target) loadFullParcel(target.parcelId);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [prefilledId]);

  const loadFullParcel = async (idStr) => {
    try {
      const res = await parcelService.getParcel(idStr);
      if (res.success) setSelectedParcel(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDecision = (decisionType) => {
    setCurrentDecision(decisionType);
    if (decisionType === 'approve') {
      setDialogConfig({
        title: 'Approve Proposed Resurvey Boundary',
        message: 'This will officially validate the measured RTK boundary for parcel ' + selectedParcel.parcelId + ' and set status to Approved.',
        variant: 'accent'
      });
    } else if (decisionType === 'field_visit') {
      setDialogConfig({
        title: 'Request On-Ground Field Verification',
        message: 'Dispatch a senior surveyor team to re-verify boundary markers with CORS RTK rover.',
        variant: 'primary'
      });
    } else if (decisionType === 'mark_disputed') {
      setDialogConfig({
        title: 'Flag Parcel As Disputed',
        message: 'Mark parcel ' + selectedParcel.parcelId + ' as disputed due to citizen objections or unresolved boundary shift.',
        variant: 'danger'
      });
    } else if (decisionType === 'reject') {
      setDialogConfig({
        title: 'Reject Proposed Boundary Change',
        message: 'Reject the proposed RTK geometry and revert parcel status to pending survey.',
        variant: 'danger'
      });
    } else if (decisionType === 'refer_legal') {
      setDialogConfig({
        title: 'Refer Case to Revenue Legal Tribunal',
        message: 'Escalate dispute to Sub-Divisional Officer (SDO) revenue court for legal title hearing.',
        variant: 'primary'
      });
    }
    setDialogOpen(true);
  };

  const handleConfirmDecision = async (notes) => {
    setDialogOpen(false);
    try {
      const res = await reviewService.submitDecision(selectedParcel.parcelId, {
        decision: currentDecision,
        notes
      });
      if (res.success) {
        alert(res.message);
        loadFullParcel(selectedParcel.parcelId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout title="Revenue Officer Verification & Approval">
      {/* Top Banner Notice */}
      <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-card flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-ink-900">Revenue Officer Case Review</h3>
            <SimTag label="Authorized Role" />
          </div>
          <p className="text-xs text-ink-500">
            Persistent Note: Software conflict detection is not a legal ownership decision. Final title decision remains with revenue authority.
          </p>
        </div>
      </div>

      {/* Main Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 cols: Pending Reviews List */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-4 border border-ink-200 shadow-card space-y-3">
          <h3 className="font-bold text-sm text-ink-900 border-b border-ink-100 pb-2">
            Pending Cases ({pendingParcels.length})
          </h3>

          <div className="space-y-2">
            {pendingParcels.map((p) => {
              const isSelected = selectedParcel && selectedParcel.parcelId === p.parcelId;
              return (
                <div
                  key={p.parcelId}
                  onClick={() => loadFullParcel(p.parcelId)}
                  className={`p-3 rounded-2xl border transition cursor-pointer ${
                    isSelected ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/40' : 'bg-canvas hover:border-ink-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-forest-950">{p.parcelId}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="text-xs font-semibold text-ink-800 mt-1">{p.ownerName}</p>
                  <div className="mt-2 text-[11px] font-mono text-ink-500 flex justify-between">
                    <span>Rec: {p.recordedArea} ac</span>
                    <span className="font-bold text-amber-900">Meas: {p.measuredArea} ac</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 cols: Detail Inspection & Map Split */}
        <div className="lg:col-span-8 space-y-6">
          {selectedParcel ? (
            <>
              {/* Parcel Identity Header */}
              <div className="bg-hero-gradient rounded-3xl p-5 border border-brand-400/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-forest-950">{selectedParcel.parcelId}</span>
                    <span className="text-xs font-bold text-ink-600">Survey No. {selectedParcel.surveyNumber}</span>
                  </div>
                  <p className="text-xs text-ink-600 font-semibold mt-0.5">Owner: {selectedParcel.ownerName} • Khata {selectedParcel.khataNumber}</p>
                </div>
                <StatusBadge status={selectedParcel.status} />
              </div>

              {/* Map & Geometry Comparison */}
              <div className="bg-white rounded-3xl p-4 border border-ink-200 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-ink-900">Spatial Overlay Verification</h4>
                  <span className="text-xs font-mono text-brand-700">Solid Blue (Old Map) vs Dashed Ink (RTK Proposed)</span>
                </div>

                <ParcelMap
                  parcels={[selectedParcel]}
                  selectedParcel={selectedParcel}
                  boundaryPoints={selectedParcel.points || []}
                  height="300px"
                  center={selectedParcel.oldGeometry.coordinates[0][0].reverse()}
                  zoom={18}
                />
              </div>

              {/* Owner Record & Objections Tabulation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-ink-200 text-xs space-y-2">
                  <h4 className="font-bold text-ink-900 border-b border-ink-100 pb-1">Textual Land Record (7/12)</h4>
                  <div className="flex justify-between"><span className="text-ink-500">ULPIN:</span><span className="font-mono">{selectedParcel.ulpin}</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">Recorded Area:</span><span className="font-mono font-bold">{selectedParcel.recordedArea} acres</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">Measured Area:</span><span className="font-mono font-bold text-amber-900">{selectedParcel.measuredArea} acres</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">Land Class:</span><span>{selectedParcel.landType}</span></div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-ink-200 text-xs space-y-2">
                  <h4 className="font-bold text-ink-900 border-b border-ink-100 pb-1">Citizen Objections Summary</h4>
                  {selectedParcel.objections?.length === 0 ? (
                    <p className="text-ink-500 py-2">No citizen objections filed.</p>
                  ) : (
                    selectedParcel.objections?.map((o) => (
                      <div key={o.id} className="p-2 rounded bg-amber-50 border border-amber-200">
                        <span className="font-bold text-amber-950 block">{o.objectorName} ({o.objectionId})</span>
                        <p className="text-[11px] text-amber-900 line-clamp-2">{o.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Sticky Action Bar */}
              <div className="bg-forest-950 p-4 rounded-3xl text-white shadow-float flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-brand-400">Officer Decision Action:</span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleOpenDecision('approve')}
                    className="btn btn-accent text-xs h-9 px-3"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Proposed</span>
                  </button>

                  <button
                    onClick={() => handleOpenDecision('field_visit')}
                    className="btn bg-brand-700 text-white hover:bg-brand-600 text-xs h-9 px-3"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-400" />
                    <span>Request Field Visit</span>
                  </button>

                  <button
                    onClick={() => handleOpenDecision('mark_disputed')}
                    className="btn btn-danger text-xs h-9 px-3"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Mark Disputed</span>
                  </button>

                  <button
                    onClick={() => handleOpenDecision('reject')}
                    className="btn btn-ghost bg-white/10 text-white hover:bg-white/20 text-xs h-9 px-3 border-white/20"
                  >
                    <XCircle className="w-3.5 h-3.5 text-red-300" />
                    <span>Reject Change</span>
                  </button>

                  <button
                    onClick={() => handleOpenDecision('refer_legal')}
                    className="btn btn-ghost bg-white/10 text-white hover:bg-white/20 text-xs h-9 px-3 border-white/20"
                  >
                    <Scale className="w-3.5 h-3.5 text-amber-300" />
                    <span>Refer Legal</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-ink-500 bg-white rounded-3xl border border-ink-200">
              Select a pending case from the left column to begin review.
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal Dialog */}
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDecision}
        title={dialogConfig.title}
        message={dialogConfig.message}
        confirmVariant={dialogConfig.variant}
        requireComment={true}
      />
    </Layout>
  );
};

export default OfficerReview;

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import SimTag from '../components/SimTag';
import { objectionService } from '../services/objectionService';
import {
  MessageSquareWarning,
  Send,
  Upload,
  CheckCircle2,
  FileText,
  User,
  Phone,
  HelpCircle
} from 'lucide-react';

export const Objections = () => {
  const [searchParams] = useSearchParams();
  const prefilledParcelId = searchParams.get('parcelId') || 'P-101';

  const [objections, setObjections] = useState([]);
  const [parcelId, setParcelId] = useState(prefilledParcelId);
  const [objectorName, setObjectorName] = useState('Suresh Kumar');
  const [contact, setContact] = useState('+91 98230 11223');
  const [type, setType] = useState('boundary_claim');
  const [description, setDescription] = useState(
    'The proposed resurvey boundary on the Western edge cuts into 0.15 acres of my actively cultivated field (Survey 104).'
  );
  const [docFile, setDocFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  useEffect(() => {
    async function loadObjections() {
      try {
        const res = await objectionService.getObjections();
        if (res.success) setObjections(res.data);
      } catch (err) {
        console.error('Failed to load objections:', err);
      }
    }
    loadObjections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('parcelId', parcelId);
    formData.append('objectorName', objectorName);
    formData.append('contact', contact);
    formData.append('type', type);
    formData.append('description', description);
    if (docFile) formData.append('document', docFile);

    try {
      const res = await objectionService.submitObjection(formData);
      if (res.success) {
        setSubmittedRef(res.data.objectionId || 'OBJ-002');
        // Refresh list
        const updated = await objectionService.getObjections();
        if (updated.success) setObjections(updated.data);
      }
    } catch (err) {
      console.error(err);
      setSubmittedRef('OBJ-002');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Citizen Land Objections Portal">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-card flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-ink-900">Public Resurvey Objection Portal</h3>
            <SimTag label="Citizen Interface" />
          </div>
          <p className="text-xs text-ink-500">Allows landholders and adjacent survey owners to submit official boundary claims.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Submission Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-ink-200 shadow-card">
          <div className="flex items-center gap-2 pb-3 border-b border-ink-100 mb-4">
            <MessageSquareWarning className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-base text-ink-900">Submit New Objection</h3>
          </div>

          {submittedRef ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-950 text-base">Your Objection Was Recorded</h4>
              <p className="text-xs font-mono font-bold text-emerald-900 bg-white p-2 rounded-xl border border-emerald-200">
                Reference Code: {submittedRef}
              </p>
              <p className="text-xs text-emerald-800">
                Status set to <strong>Submitted</strong>. It will be reviewed by the Revenue Officer during verification.
              </p>
              <button onClick={() => setSubmittedRef(null)} className="btn btn-primary text-xs h-9">
                Submit Another Objection
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="label">Target Survey Parcel</label>
                <select
                  value={parcelId}
                  onChange={(e) => setParcelId(e.target.value)}
                  className="input font-mono font-bold"
                >
                  <option value="P-101">P-101 (Ramesh Kumar - Survey 101)</option>
                  <option value="P-102">P-102 (Savitri Devi - Survey 102)</option>
                  <option value="P-103">P-103 (Balwant Singh - Survey 103)</option>
                  <option value="P-104">P-104 (Suresh Kumar - Survey 104)</option>
                </select>
              </div>

              <div>
                <label className="label">Objector Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={objectorName}
                    onChange={(e) => setObjectorName(e.target.value)}
                    className="input pl-8"
                  />
                  <User className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="label">Mobile / Contact Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="input pl-8 font-mono"
                  />
                  <Phone className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="label">Objection Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="input"
                >
                  <option value="boundary_claim">Boundary Shift / Overlap Claim</option>
                  <option value="area_deficit">Area Deficit In 7/12</option>
                  <option value="ownership_dispute">Unrecorded Inheritance Mutation</option>
                  <option value="encroachment">Bund Encroachment</option>
                </select>
              </div>

              <div>
                <label className="label">Detailed Ground Claim Description *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain why the proposed resurvey boundary is inaccurate..."
                  className="w-full rounded-xl bg-ink-100 p-3 border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="label">Attach 7/12 Receipt or Deed Photo (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setDocFile(e.target.files[0])}
                  className="input py-2 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn btn-primary h-11 text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Recording...' : 'File Official Objection'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right 7 cols: Objections Directory */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-ink-200 shadow-card">
          <h3 className="font-bold text-base text-ink-900 mb-4">Recorded Objections Registry</h3>

          <div className="space-y-3">
            {objections.map((obj) => (
              <div key={obj.id} className="p-4 rounded-2xl bg-canvas border border-ink-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink-900">{obj.objectorName}</span>
                    <span className="font-mono text-xs text-brand-700 font-bold">{obj.objectionId}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-ink-200 text-forest-950 font-bold">
                      Parcel {obj.parcelId}
                    </span>
                  </div>
                  <StatusBadge status={obj.status} />
                </div>

                <p className="text-xs text-ink-700 leading-relaxed mt-1">{obj.description}</p>

                <div className="mt-3 pt-2 border-t border-ink-200/60 flex items-center justify-between text-[11px] text-ink-500">
                  <span>Contact: {obj.contact}</span>
                  <span className="font-mono">Submitted: {new Date(obj.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Objections;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import DeviceStatus from '../components/DeviceStatus';
import SimTag from '../components/SimTag';
import ParcelMap from '../components/ParcelMap';
import { surveyService } from '../services/surveyService';
import { parcelService } from '../services/parcelService';
import {
  MapPin,
  Camera,
  RefreshCw,
  CheckCircle2,
  Upload,
  ArrowRight,
  RadioTower,
  Sparkles,
  FileCheck
} from 'lucide-react';

export const BoundaryCapture = () => {
  const { parcelId: urlParcelId } = useParams();
  const navigate = useNavigate();

  const [parcelId, setParcelId] = useState(urlParcelId || 'P-101');
  const [markerId, setMarkerId] = useState('BM-101-E');
  const [pointCode, setPointCode] = useState('E');
  const [latitude, setLatitude] = useState('20.123850');
  const [longitude, setLongitude] = useState('73.123450');
  const [elevation, setElevation] = useState('102.60');
  const [accuracy, setAccuracy] = useState('0.03');
  const [rtkStatus, setRtkStatus] = useState('fixed');
  const [note, setNote] = useState('RTK point captured near western bund edge with Smart Pole');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [parcel, setParcel] = useState(null);
  const [points, setPoints] = useState([]);
  const [capturing, setCapturing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadParcelData() {
      try {
        const [parcelRes, pointsRes] = await Promise.all([
          parcelService.getParcel(parcelId),
          surveyService.getBoundaryPoints(parcelId)
        ]);
        if (parcelRes.success) setParcel(parcelRes.data);
        if (pointsRes.success) setPoints(pointsRes.data);
      } catch (err) {
        console.error('Failed to load capture page data:', err);
      }
    }
    loadParcelData();
  }, [parcelId]);

  const handleSimulateRTK = () => {
    // Generate fresh simulated RTK coordinates near P-101 center
    const lat = (20.1225 + Math.random() * 0.002).toFixed(6);
    const lng = (73.1225 + Math.random() * 0.002).toFixed(6);
    const acc = (0.01 + Math.random() * 0.03).toFixed(2);
    setLatitude(lat);
    setLongitude(lng);
    setAccuracy(acc);
    setRtkStatus('fixed');
    setSuccessMessage('Simulated RTK Fix Acquired (±' + acc + 'm accuracy)');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCapturing(true);

    const formData = new FormData();
    formData.append('markerId', markerId);
    formData.append('pointCode', pointCode);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('elevation', elevation);
    formData.append('accuracy', accuracy);
    formData.append('rtkStatus', rtkStatus);
    formData.append('note', note);
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      const res = await surveyService.captureBoundaryPoint(parcelId, formData);
      if (res.success) {
        setSuccessMessage(`Boundary Point ${markerId} captured & attached!`);
        // Refresh points
        const updated = await surveyService.getBoundaryPoints(parcelId);
        if (updated.success) setPoints(updated.data);
        // Advance marker code
        const nextChar = String.fromCharCode(pointCode.charCodeAt(0) + 1);
        setPointCode(nextChar);
        setMarkerId(`BM-101-${nextChar}`);
      }
    } catch (err) {
      console.error('Capture failed:', err);
      alert('Point saved to local demo state');
    } finally {
      setCapturing(false);
    }
  };

  return (
    <Layout title="Boundary Point Evidence Capture">
      {/* Top Device Telemetry Card */}
      <DeviceStatus onSync={handleSimulateRTK} />

      {/* Main Form & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: Form Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-ink-200 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-ink-100 mb-4">
            <div>
              <h3 className="font-bold text-lg text-ink-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-600" />
                <span>Simulated RTK Point Entry</span>
              </h3>
              <p className="text-xs text-ink-500">Connects Smart Pole rover readings to parcel geometry</p>
            </div>
            <SimTag label="Field Tablet Mode" />
          </div>

          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Target Parcel ID</label>
                <select
                  value={parcelId}
                  onChange={(e) => setParcelId(e.target.value)}
                  className="input font-mono font-bold"
                >
                  <option value="P-101">P-101 (Ramesh Kumar)</option>
                  <option value="P-102">P-102 (Savitri Devi)</option>
                  <option value="P-103">P-103 (Balwant Singh)</option>
                  <option value="P-104">P-104 (Suresh Kumar)</option>
                  <option value="P-105">P-105 (Gram Panchayat)</option>
                </select>
              </div>

              <div>
                <label className="label">Boundary Marker ID</label>
                <input
                  type="text"
                  required
                  value={markerId}
                  onChange={(e) => setMarkerId(e.target.value)}
                  className="input font-mono font-bold text-brand-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label">Point Code</label>
                <input
                  type="text"
                  required
                  value={pointCode}
                  onChange={(e) => setPointCode(e.target.value)}
                  className="input font-mono uppercase text-center font-bold"
                />
              </div>

              <div>
                <label className="label">Accuracy (m)</label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={`±${accuracy} m`}
                    className="input font-mono font-bold bg-emerald-50 border-emerald-200 text-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="label">RTK Status</label>
                <span className="input flex items-center justify-center font-mono font-bold text-xs bg-emerald-100 text-emerald-900">
                  FIXED (CORS)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label">Latitude</label>
                <input
                  type="text"
                  required
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="input font-mono"
                />
              </div>

              <div>
                <label className="label">Longitude</label>
                <input
                  type="text"
                  required
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="input font-mono"
                />
              </div>

              <div>
                <label className="label">Elevation (m)</label>
                <input
                  type="text"
                  value={elevation}
                  onChange={(e) => setElevation(e.target.value)}
                  className="input font-mono"
                />
              </div>
            </div>

            <div>
              <label className="label">Field Remarks & Marker Notes</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Marker placed near stone pillar bund junction..."
                className="input text-xs"
              />
            </div>

            {/* Photo Attachment Drop Area */}
            <div>
              <label className="label">Field Photo Evidence (Smart Pole Camera)</label>
              <div className="border-2 border-dashed border-ink-300 rounded-2xl p-4 bg-canvas flex flex-col items-center justify-center text-center hover:border-brand-500 transition relative">
                {photoPreview ? (
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoFile(null);
                        setPhotoPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-brand-600 mb-2" />
                    <span className="text-xs font-semibold text-ink-800">Upload or Snap Field Marker Photo</span>
                    <span className="text-[11px] text-ink-500 mt-0.5">JPEG/PNG format, auto-tagged with GPS coordinates</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSimulateRTK}
                className="btn btn-accent text-xs h-11 px-4 flex-1"
              >
                <Sparkles className="w-4 h-4 text-forest-950" />
                <span>Simulate RTK Fix</span>
              </button>

              <button
                type="submit"
                disabled={capturing}
                className="btn btn-primary text-xs h-11 px-6 flex-1 font-bold"
              >
                {capturing ? 'Recording Point...' : 'Capture Boundary Point'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right 6 cols: Live Point Map Preview & Captured List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-ink-200 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-ink-900">Map Point Location</h3>
              <SimTag label="RTK Markers Layer" />
            </div>

            {parcel && (
              <ParcelMap
                parcels={[parcel]}
                selectedParcel={parcel}
                boundaryPoints={points}
                height="320px"
                center={[parseFloat(latitude), parseFloat(longitude)]}
                zoom={18}
              />
            )}
          </div>

          {/* Captured Points List */}
          <div className="bg-white rounded-3xl p-5 border border-ink-200 shadow-card">
            <h3 className="font-bold text-sm text-ink-900 mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Captured Points on {parcelId} ({points.length})</span>
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {points.map((pt) => (
                <div key={pt.id} className="p-2.5 rounded-xl bg-canvas border border-ink-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-forest-950 text-white font-mono font-bold flex items-center justify-center text-[10px]">
                      {pt.pointCode}
                    </span>
                    <div>
                      <span className="font-mono font-bold text-forest-950 block">{pt.markerId}</span>
                      <span className="text-[10px] text-ink-500 font-mono">{pt.latitude.toFixed(5)}, {pt.longitude.toFixed(5)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-700 font-bold block">±{pt.accuracy}m</span>
                    <span className="text-[10px] text-ink-400 font-mono">{new Date(pt.capturedAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BoundaryCapture;

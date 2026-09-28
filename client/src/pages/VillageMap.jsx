import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ParcelMap from '../components/ParcelMap';
import StatusBadge from '../components/StatusBadge';
import SimTag from '../components/SimTag';
import { parcelService } from '../services/parcelService';
import { surveyService } from '../services/surveyService';
import { conflictService } from '../services/conflictService';
import { Search, MapPin, Eye, Play, Filter, AlertTriangle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const VillageMap = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialParcelId = searchParams.get('select') || 'P-101';

  const [parcels, setParcels] = useState([]);
  const [boundaryPoints, setBoundaryPoints] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMapData() {
      try {
        const [parcelsRes, pointsRes] = await Promise.all([
          parcelService.getParcels(),
          surveyService.getBoundaryPoints('P-101')
        ]);

        if (parcelsRes.success) {
          setParcels(parcelsRes.data);
          const target = parcelsRes.data.find(p => p.parcelId === initialParcelId) || parcelsRes.data[0];
          setSelectedParcel(target);
        }

        if (pointsRes.success) {
          setBoundaryPoints(pointsRes.data);
        }
      } catch (err) {
        console.error('Failed to load map data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMapData();
  }, [initialParcelId]);

  const filteredParcels = parcels.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch =
      p.parcelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.surveyNumber.includes(searchTerm) ||
      p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleRunAnalysis = async () => {
    try {
      const res = await conflictService.runAnalysis();
      if (res.success) {
        alert(res.message);
        const updated = await parcelService.getParcels();
        if (updated.success) setParcels(updated.data);
      }
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  return (
    <Layout title="Rampur Cadastral Map View">
      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base text-ink-900">Village Rampur (VIL-001) Map</span>
          <span className="text-xs font-mono text-ink-500">• 5 Cadastral Parcels</span>
          <SimTag label="RTK Layer On" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAnalysis}
            className="btn btn-accent text-xs h-9 px-3"
          >
            <Play className="w-3.5 h-3.5 fill-forest-950" />
            <span>Run Conflict Scan</span>
          </button>

          <button
            onClick={() => navigate('/boundary-capture')}
            className="btn btn-primary text-xs h-9 px-3"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>Capture RTK Point</span>
          </button>
        </div>
      </div>

      {/* Main Map & Parcel List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-250px)] min-h-[600px]">
        {/* Left Side: Parcel List & Filters */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-ink-200 shadow-card flex flex-col justify-between overflow-hidden">
          <div>
            {/* Search Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by Parcel ID, Survey No, Owner..."
                className="input pl-9 h-9 text-xs"
              />
              <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-2.5" />
            </div>

            {/* Segmented Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-3 border-b border-ink-100 text-xs font-medium">
              {[
                { id: 'all', label: 'All (5)' },
                { id: 'conflict', label: 'Mismatch' },
                { id: 'pending', label: 'Pending' },
                { id: 'disputed', label: 'Disputed' },
                { id: 'verified', label: 'Verified' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-2.5 py-1 rounded-xl whitespace-nowrap transition text-[11px] ${
                    filterStatus === tab.id
                      ? 'bg-harvest-400 text-forest-950 font-bold shadow-sm'
                      : 'bg-canvas text-ink-600 hover:bg-ink-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List Rows with Progress Line */}
            <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-380px)] pr-1">
              {filteredParcels.map((parcel) => {
                const isSelected = selectedParcel && selectedParcel.parcelId === parcel.parcelId;
                const hasConflict = parcel.percentDifference > 5;

                return (
                  <div
                    key={parcel.parcelId}
                    onClick={() => setSelectedParcel(parcel)}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/40'
                        : 'bg-white border-ink-200 hover:border-ink-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-forest-950">{parcel.parcelId}</span>
                        <span className="text-xs text-ink-500">Survey #{parcel.surveyNumber}</span>
                      </div>
                      <StatusBadge status={parcel.status} />
                    </div>

                    <p className="text-xs font-semibold text-ink-800 mt-1">{parcel.ownerName}</p>

                    {/* Progress Bar Line for Mismatch */}
                    <div className="mt-2 text-[11px]">
                      <div className="flex justify-between text-ink-500 font-mono mb-0.5">
                        <span>Rec: {parcel.recordedArea} ac</span>
                        <span className={hasConflict ? 'text-amber-900 font-bold' : 'text-emerald-700'}>
                          Meas: {parcel.measuredArea} ac
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-ink-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${hasConflict ? 'bg-amber-600' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(100, (parcel.measuredArea / parcel.recordedArea) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-ink-100 flex items-center justify-between text-[11px]">
                      <span className="text-ink-500 font-mono">ULPIN: {parcel.ulpin}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/parcels/${parcel.parcelId}`);
                        }}
                        className="text-brand-700 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Details</span>
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-ink-100 text-center text-xs text-ink-500">
            Click parcel row or map polygon to inspect survey details.
          </div>
        </div>

        {/* Right Side: Interactive Leaflet Map */}
        <div className="lg:col-span-8 h-full">
          <ParcelMap
            parcels={filteredParcels}
            selectedParcel={selectedParcel}
            onSelectParcel={(p) => setSelectedParcel(p)}
            boundaryPoints={boundaryPoints}
            height="100%"
          />
        </div>
      </div>
    </Layout>
  );
};

export default VillageMap;

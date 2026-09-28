import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import MapLegend from './MapLegend';
import NorthArrow from './NorthArrow';
import SimTag from './SimTag';
import StatusBadge from './StatusBadge';
import { Eye, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Helper component to center map on selected parcel
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 17, { duration: 0.8 });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom DivIcons for Pillars
const createPillarIcon = (markerId, isSelected) => {
  return L.divIcon({
    className: 'custom-pillar-icon',
    html: `<div style="
      background-color: ${isSelected ? '#6FA85A' : '#0F1F17'};
      color: #FFFFFF;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 6px;
      border-radius: 6px;
      border: 2px solid #FFFFFF;
      box-shadow: 0 4px 12px rgba(15,31,23,0.3);
      white-space: nowrap;
    ">${markerId}</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 12]
  });
};

export const ParcelMap = ({
  parcels = [],
  selectedParcel = null,
  onSelectParcel = () => {},
  boundaryPoints = [],
  height = '100%',
  center = [20.1235, 73.1235],
  zoom = 17
}) => {
  const navigate = useNavigate();
  // Map Basemap layer choices: 'carto' | 'google_road' | 'google_sat' | 'esri_sat'
  const [mapType, setMapType] = useState('carto');

  const getStyleForParcel = (parcel, isOld = false) => {
    if (isOld) {
      return {
        color: '#2F6FB5',
        weight: 2,
        fillColor: 'transparent',
        dashArray: null
      };
    }

    const isSelected = selectedParcel && selectedParcel.parcelId === parcel.parcelId;

    switch (parcel.status) {
      case 'verified':
      case 'approved':
        return {
          color: '#2F9E5B',
          weight: isSelected ? 4 : 2.5,
          fillColor: '#2F9E5B',
          fillOpacity: isSelected ? 0.4 : 0.28
        };
      case 'pending':
        return {
          color: '#D9A21B',
          weight: isSelected ? 4 : 2.5,
          fillColor: '#D9A21B',
          fillOpacity: isSelected ? 0.4 : 0.28
        };
      case 'disputed':
        return {
          color: '#C23B3B',
          weight: isSelected ? 4.5 : 3,
          fillColor: '#C23B3B',
          fillOpacity: isSelected ? 0.45 : 0.32
        };
      case 'conflict':
        return {
          color: '#D9782F',
          weight: isSelected ? 4.5 : 3,
          fillColor: '#D9782F',
          fillOpacity: isSelected ? 0.45 : 0.3
        };
      case 'government':
        return {
          color: '#7B5EA7',
          weight: isSelected ? 4 : 2.5,
          fillColor: '#7B5EA7',
          fillOpacity: isSelected ? 0.35 : 0.24
        };
      default:
        return {
          color: '#1E2419',
          weight: 2,
          fillColor: '#1E2419',
          fillOpacity: 0.15,
          dashArray: '8 6'
        };
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-ink-200 shadow-card" style={{ height }}>
      {/* Map Segment Control Top Right */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2">
        <NorthArrow />
        <div className="bg-white/95 backdrop-blur rounded-2xl p-1 shadow-float border border-ink-200 flex items-center gap-1 text-xs">
          <button
            onClick={() => setMapType('carto')}
            className={`px-2.5 py-1 rounded-xl font-medium transition ${
              mapType === 'carto' ? 'bg-harvest-400 text-forest-950 font-bold shadow-sm' : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Parchment
          </button>

          <button
            onClick={() => setMapType('google_road')}
            className={`px-2.5 py-1 rounded-xl font-medium transition ${
              mapType === 'google_road' ? 'bg-harvest-400 text-forest-950 font-bold shadow-sm' : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Google Road
          </button>

          <button
            onClick={() => setMapType('google_sat')}
            className={`px-2.5 py-1 rounded-xl font-medium transition flex items-center gap-1 ${
              mapType === 'google_sat' ? 'bg-harvest-400 text-forest-950 font-bold shadow-sm' : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            <span>Google Satellite</span>
            <SimTag label="HD" />
          </button>

          <button
            onClick={() => setMapType('esri_sat')}
            className={`px-2.5 py-1 rounded-xl font-medium transition text-[11px] ${
              mapType === 'esri_sat' ? 'bg-harvest-400 text-forest-950 font-bold shadow-sm' : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Esri Imagery
          </button>
        </div>
      </div>

      {/* Floating Card for Selected Parcel */}
      {selectedParcel && (
        <div className="absolute top-4 left-4 z-[1000] bg-white rounded-2xl shadow-float p-4 w-[320px] border border-ink-200 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-ink-100">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-forest-950">{selectedParcel.parcelId}</span>
              <span className="text-xs font-semibold text-ink-500">Survey #{selectedParcel.surveyNumber}</span>
            </div>
            <StatusBadge status={selectedParcel.status} />
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-ink-500">Owner Record:</span>
              <span className="font-semibold text-ink-900">{selectedParcel.ownerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">Recorded Area:</span>
              <span className="font-mono font-medium">{selectedParcel.recordedArea} acres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">Measured (RTK):</span>
              <span className={`font-mono font-bold ${selectedParcel.percentDifference > 5 ? 'text-amber-700' : 'text-emerald-700'}`}>
                {selectedParcel.measuredArea} acres
              </span>
            </div>
            {selectedParcel.areaDifference > 0 && (
              <div className="flex justify-between bg-amber-50 p-1.5 rounded-lg border border-amber-200 text-amber-900">
                <span>Difference:</span>
                <span className="font-mono font-bold">
                  {selectedParcel.areaDifference} ac ({selectedParcel.percentDifference}%)
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-ink-500">Land Type:</span>
              <span>{selectedParcel.landType}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ink-100 flex items-center gap-2">
            <button
              onClick={() => navigate(`/parcels/${selectedParcel.parcelId}`)}
              className="flex-1 btn btn-primary text-xs h-9"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Open Parcel Details</span>
            </button>
            <button
              onClick={() => navigate(`/parcels/${selectedParcel.parcelId}/capture`)}
              className="btn btn-accent text-xs h-9 px-3"
              title="Capture RTK Point"
            >
              <MapPin className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Map Legend Bottom Left */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <MapLegend />
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <MapController center={selectedParcel ? selectedParcel.oldGeometry.coordinates[0][0].reverse() : center} zoom={zoom} />

        {/* Tile Layers based on Map Type */}
        {mapType === 'carto' && (
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
        )}

        {mapType === 'google_road' && (
          <TileLayer
            attribution="&copy; Google Maps"
            url={`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}${googleApiKey ? `&key=${googleApiKey}` : ''}`}
          />
        )}

        {mapType === 'google_sat' && (
          <TileLayer
            attribution="&copy; Google Maps Satellite"
            url={`https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}${googleApiKey ? `&key=${googleApiKey}` : ''}`}
          />
        )}

        {mapType === 'esri_sat' && (
          <TileLayer
            attribution="Esri World Imagery"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {/* Parcels Render */}
        {parcels.map((parcel) => {
          const isSelected = selectedParcel && selectedParcel.parcelId === parcel.parcelId;

          const oldCoords = parcel.oldGeometry.coordinates[0].map((pt) => [pt[1], pt[0]]);
          const proposedCoords = parcel.proposedGeometry
            ? parcel.proposedGeometry.coordinates[0].map((pt) => [pt[1], pt[0]])
            : null;

          return (
            <React.Fragment key={parcel.id || parcel.parcelId}>
              {/* Old Boundary (Blue Solid Line) */}
              <Polygon
                positions={oldCoords}
                pathOptions={getStyleForParcel(parcel, true)}
                eventHandlers={{
                  click: () => onSelectParcel(parcel)
                }}
              />

              {/* Proposed Boundary (Semantic Status Style) */}
              {proposedCoords && (
                <Polygon
                  positions={proposedCoords}
                  pathOptions={{
                    ...getStyleForParcel(parcel, false),
                    dashArray: parcel.status === 'conflict' ? '6 4' : null
                  }}
                  eventHandlers={{
                    click: () => onSelectParcel(parcel)
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono font-bold text-forest-950">{parcel.parcelId}</span>
                        <StatusBadge status={parcel.status} />
                      </div>
                      <p className="text-xs text-ink-600 font-medium">{parcel.ownerName}</p>
                      <p className="text-xs font-mono mt-1">
                        Rec: {parcel.recordedArea} ac | Meas: {parcel.measuredArea} ac
                      </p>
                      <button
                        onClick={() => navigate(`/parcels/${parcel.parcelId}`)}
                        className="mt-2 text-xs font-bold text-brand-700 hover:underline block"
                      >
                        View Full Record →
                      </button>
                    </div>
                  </Popup>
                </Polygon>
              )}
            </React.Fragment>
          );
        })}

        {/* Boundary Points / RTK Markers */}
        {boundaryPoints.map((pt) => {
          const isSelected = selectedParcel && selectedParcel.parcelId === pt.parcelId;
          return (
            <Marker
              key={pt.id || pt.markerId}
              position={[pt.latitude, pt.longitude]}
              icon={createPillarIcon(pt.markerId, isSelected)}
            >
              <Popup>
                <div className="text-xs">
                  <span className="font-mono font-bold text-forest-950 block">{pt.markerId}</span>
                  <p className="text-ink-600 mt-0.5">{pt.note || 'RTK Boundary Pillar'}</p>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-mono font-semibold">
                    <span>RTK Fixed ±{pt.accuracy}m</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ParcelMap;

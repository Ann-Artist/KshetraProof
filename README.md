# KshetraProof

## Evidence-Linked Agricultural Land Resurvey

KshetraProof is a prototype web platform for SIH26010 that helps compare old agricultural land records with current survey evidence, detect boundary/area conflicts, record objections, and support official review.

## Problem

Rural land records may be outdated or may not match the ground because of inheritance, partition, sale, delayed mutation, map errors, encroachment, changed roads/canals, and shared-boundary disputes.

## Proposed Solution

KshetraProof compares:

```text
Old cadastral map and records
        +
Current drone/aerial survey
        +
RTK/CORS boundary points
        +
Current legal/administrative change records
        ↓
Conflict detection and official verification
```

It distinguishes lawful changes—such as inheritance, sale, partition, subdivision, acquisition, and survey correction—from unsupported physical changes such as a shifted fence or possible encroachment.

KshetraProof does not decide ownership automatically. It preserves evidence from all parties and sends disputed cases to the authorized revenue authority.

## Prototype Version

The current prototype is a basic React and Node.js web application using fictional records and simulated hardware data.

### Prototype features

- Dashboard with survey statistics.
- Interactive parcel map.
- Old and proposed boundary comparison.
- Simulated drone and RTK/CORS status.
- Simulated boundary-point capture.
- Evidence and photo records.
- Area/boundary conflict detection.
- Citizen objection form.
- Officer review workflow.
- Parcel history.
- Parcel survey report.

### Prototype demonstration flow

```text
Login
  ↓
Open village map
  ↓
Select disputed parcel
  ↓
Capture simulated RTK point
  ↓
Detect conflict
  ↓
Submit objection
  ↓
Officer review
  ↓
Generate parcel report
```

### Prototype limitations

- Drone data is simulated or sample data.
- RTK/CORS values are simulated.
- Records are fictional.
- No official land-record APIs are connected.
- No legal ownership decision is made.
- No real government record is updated.

## Actual Production System

The actual system would use:

- Survey-grade RTK/PPK drone.
- CORS-connected RTK GNSS rover.
- Smart boundary-verification pole.
- QR/NFC boundary markers.
- Offline field tablet application.
- Solar field-power kit.
- GIS and PostGIS database.
- Official RoR, registration, mutation, court, acquisition, and survey integrations.
- Secure evidence storage and audit logs.
- Authorized revenue-officer approval.

### Actual production workflow

```text
Drone and RTK survey
        ↓
Field evidence collection
        ↓
GIS comparison with old records
        ↓
Legal-change record matching
        ↓
Citizen objections
        ↓
Revenue-authority verification
        ↓
Approved versioned parcel record
```

## Technology Stack

### Prototype

- React + Vite.
- Tailwind CSS.
- React-Leaflet.
- Node.js + Express.
- JSON/SQLite or PostgreSQL.
- Mock hardware APIs.

### Production

- React or Flutter field application.
- Node.js or Python backend.
- PostgreSQL + PostGIS.
- Object storage.
- RTK/Bluetooth/NTRIP integration.
- Drone-processing pipeline.
- Government-approved APIs.

## Project Structure

```text
kshetraproof/
├── client/   # React frontend
├── server/   # Node.js/Express backend
├── uploads/  # Prototype evidence files
└── README.md
```

## Core API Routes

```http
POST /api/auth/login
GET  /api/parcels
GET  /api/parcels/:id
POST /api/parcels/:id/points
POST /api/evidence/upload
GET  /api/conflicts
POST /api/objections
POST /api/reviews/:parcelId/decision
GET  /api/parcels/:id/history
```

## Demo Parcel

```text
Village: Rampur
Parcel: P-101
Survey number: 101
Recorded area: 2.00 acres
Measured area: 1.85 acres
Status: Boundary conflict
```

## Disclaimer

KshetraProof is a survey-evidence and verification platform. The prototype uses simulated data and is not a legal title certificate, ownership decision, or official land-record system.

## Summary

```text
Measure → Compare → Explain → Verify → Decide → Preserve history
```

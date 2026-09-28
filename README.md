# KshetraProof

## Evidence-Linked Agricultural Land Resurvey Platform

KshetraProof is a prototype web application for SIH26010: **Survey/Resurvey of Rural Agricultural Land in India**.

It demonstrates how drone mapping, RTK/CORS survey points, field evidence, GIS comparison, citizen objections, and officer review can work together to identify and document agricultural land-boundary changes.

> The prototype uses fictional records and simulated drone/RTK data. It does not determine legal ownership or update official government land records.

## Problem Statement

Many rural land records are old or incomplete. The recorded map may not match the present condition on the ground because of:

- Inheritance and informal family partition.
- Registered sale or gift not reflected in updated records.
- Unrecorded transactions.
- Encroachment or shifted fences and field bunds.
- Subdivision or merging of parcels.
- Errors in old cadastral maps.
- Missing or delayed mutation records.
- Roads, canals, and government acquisition.
- Differences between textual records and spatial maps.
- Disputes between neighbouring landholders.

These problems can cause land disputes, incorrect agricultural planning, delayed government services, and administrative inefficiency.

## Proposed Solution

KshetraProof is an evidence-linked land-survey and verification platform.

It compares:

1. Old cadastral maps and land records.
2. Current drone or aerial survey data.
3. RTK/CORS ground points and field evidence.
4. Current registration, mutation, ownership, and official change records.

The system identifies whether a difference is likely to be:

- A lawful ownership transfer.
- Inheritance or succession.
- Partition or subdivision.
- Parcel amalgamation.
- Government acquisition.
- Land-use conversion.
- Approved survey correction.
- Physical boundary discrepancy.
- Possible encroachment.
- Unresolved dispute.

The platform does not decide ownership automatically. It provides evidence and sends disputed cases to the authorized revenue authority for verification and decision.

## Main Innovation

The main innovation is an **evidence-linked shared-boundary verification workflow**.

Every survey point, photo, marker, claimant statement, objection, map change, and officer decision is linked to the correct parcel and preserved in the parcel history.

The system distinguishes between:

```text
Physical change: What is visible on the ground?
Legal change: What approved record explains the change?
Final status: What has the authorized authority decided?
```

A changed fence is not automatically treated as a legal boundary. A new owner is not inferred only from a drone image. The system keeps physical evidence and legal records separate and compares them transparently.

## How It Works

```text
Old maps and records
        ↓
Drone/aerial survey layer
        ↓
RTK/CORS ground points
        ↓
GIS map comparison
        ↓
Conflict and change detection
        ↓
Field evidence and both-party claims
        ↓
Citizen objection process
        ↓
Officer/revenue review
        ↓
Versioned parcel record and report
```

## Example: Shared Boundary Dispute

Assume Farmer A moves a fence into Farmer B's recorded land.

KshetraProof will:

1. Load the official old boundary.
2. Display the current drone/aerial view.
3. Capture RTK points along the shared boundary.
4. Mark the current fence or field bund.
5. Calculate the difference between the official line and physical line.
6. Record statements from both landholders.
7. Attach photos, marker IDs, and survey evidence.
8. Mark the boundary as disputed if a party objects.
9. Send the case to the authorized officer.
10. Preserve the final decision and all previous versions.

The system does not declare encroachment or ownership by itself.

## Example: Lawful Inheritance

If a parent dies and the land legally passes to heirs:

```text
Old record:       P-101 owned by Ramesh Kumar
Approved change:  Ownership passes to two legal heirs
Boundary:         Unchanged
System result:    Ownership-history update
```

If the land is also legally partitioned:

```text
Old parcel:       P-101, 4 acres
Approved change:  P-101A and P-101B, 2 acres each
System result:    Parent parcel retained as history; child parcels created
```

## Prototype Features

### Dashboard

- Total villages.
- Total parcels.
- Verified parcels.
- Pending parcels.
- Disputed parcels.
- High-priority conflicts.
- Survey-progress chart.
- Conflict-type chart.

### Interactive Parcel Map

- Parcel polygons.
- Old cadastral boundary.
- Proposed/current boundary.
- Approved boundary.
- RTK boundary points.
- Boundary markers.
- Roads and canals.
- Disputed areas.
- Parcel search and filters.

### Parcel Details

- Parcel ID.
- Survey number.
- ULPIN field.
- Owner record.
- Recorded area.
- Measured area.
- Land type.
- Survey date.
- Accuracy label.
- Evidence files.
- Objections.
- Version history.

### Hardware Simulation

The prototype represents the proposed field hardware:

- Survey drone.
- RTK/CORS GNSS rover.
- Smart boundary-verification pole.
- Coded boundary markers.
- Rugged field tablet.
- Solar field-power kit.

All prototype hardware values are simulated and labelled clearly.

### Boundary-Point Capture

A surveyor can simulate capturing:

- Parcel ID.
- Marker ID.
- Boundary-point ID.
- Latitude and longitude.
- RTK status.
- Accuracy.
- Photo.
- Note.
- Capture time.

### Conflict Detection

The prototype can display:

- Area mismatch.
- Boundary shift.
- Parcel overlap.
- Missing parcel.
- Owner-record mismatch.
- Pending mutation.
- Registration mismatch.
- Disputed shared boundary.

### Objection Management

Citizens or landholders can submit:

- Name and contact.
- Parcel ID.
- Objection type.
- Boundary claim.
- Description.
- Supporting image or document.

### Officer Review

An authorized officer can review:

- Old map.
- Current proposed boundary.
- RTK points.
- Evidence photographs.
- Ownership records.
- Mutation and registration status.
- Objections.
- Surveyor notes.

Possible actions:

- Approve proposed boundary.
- Request field verification.
- Mark parcel disputed.
- Reject proposed change.
- Refer to legal process.

Every decision creates a history record.

### Parcel Report

The report includes:

- Parcel identity.
- Survey number.
- Owner record.
- Recorded and measured area.
- Boundary points.
- Evidence count.
- Objection count.
- Accuracy class.
- Current status.
- Version history.
- Legal disclaimer.

## Proposed Hardware

The production concept includes:

### Survey drone

Captures high-resolution aerial imagery of the village and agricultural land.

### RTK/CORS GNSS rover

Measures ground-control points, parcel corners, and disputed boundary points.

### Smart survey pole

Combines a GNSS receiver, camera, marker scanner, push button, battery, and Bluetooth connection to the field tablet.

### Boundary markers

Reflective or QR-coded markers identify important parcel corners and shared-boundary points.

### Field tablet

Provides offline maps, evidence collection, parcel search, and objection forms.

### Solar field kit

Provides portable power for the tablet, GNSS rover, and communication devices.

## Technical Architecture

```text
React Web Application
          ↓
Node.js + Express REST API
          ↓
JSON/SQLite for prototype
or PostgreSQL + PostGIS for production
          ↓
Parcel, geometry, evidence, conflict,
objection, device, and history data
```

### Frontend

- React.
- Vite.
- React Router.
- Tailwind CSS.
- React-Leaflet.
- Axios.
- React Hook Form.
- Recharts.
- Lucide React.

### Backend

- Node.js.
- Express.js.
- JWT authentication.
- bcrypt.
- Multer.
- Zod or Joi.
- dotenv.
- CORS.

### Data and GIS

- JSON or SQLite for the basic prototype.
- PostgreSQL/PostGIS for production spatial data.
- GeoJSON for map display.
- Object storage for photos, documents, and drone imagery.

## Project Structure

```text
kshetraproof/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── data/
│   │   └── server.js
│   ├── uploads/
│   └── package.json
├── README.md
└── IMPLEMENTATION.md
```

## Main API Routes

```http
POST /api/auth/login
GET  /api/villages
GET  /api/parcels
GET  /api/parcels/:id
GET  /api/parcels/:id/geojson
GET  /api/parcels/:id/history
POST /api/parcels/:id/points
POST /api/evidence/upload
GET  /api/parcels/:id/evidence
GET  /api/conflicts
POST /api/conflicts/run-analysis
POST /api/objections
PUT  /api/objections/:id/status
GET  /api/reviews/pending
POST /api/reviews/:parcelId/decision
GET  /api/devices
POST /api/devices/:id/telemetry
```

## Demo Data

Use a fictional village called `Rampur` with five parcels.

Main parcel:

```text
Parcel ID: P-101
Survey number: 101
Owner: Ramesh Kumar
Recorded area: 2.00 acres
Measured area: 1.85 acres
Difference: 0.15 acres
Status: Boundary conflict
```

Use additional parcels to demonstrate verified, pending, disputed, and boundary-shift statuses.

## Quick Start

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

### Suggested dependencies

```bash
# Client
npm install react-router-dom axios leaflet react-leaflet react-hook-form recharts lucide-react

# Server
npm install express cors dotenv bcrypt jsonwebtoken multer zod
```

## Demonstration Flow

Use this sequence in the demo video:

1. Login as a surveyor.
2. Open the Rampur dashboard.
3. Open the village map.
4. Select Parcel P-101.
5. Compare the old and current boundary.
6. Open the hardware-status panel.
7. Show simulated RTK rover status.
8. Capture boundary marker BM-101-A.
9. Attach a sample evidence photo.
10. Show the area or boundary conflict.
11. Submit a citizen objection.
12. Switch to the officer role.
13. Review the map and evidence.
14. Select `Request field verification` or `Mark disputed`.
15. Show the parcel history.
16. Generate the parcel report.

## Accuracy and Legal Disclaimer

The prototype uses fictional records and simulated drone/RTK values.

It does not:

- Determine legal ownership.
- Declare encroachment.
- Issue a title certificate.
- Update official land records.
- Replace a revenue officer or court.
- Claim real survey accuracy.

The production system would require authorized government data access, compliant drone operations, approved survey procedures, official verification, and applicable state legal processes.

## Security and Privacy

The production system should include:

- Role-based access.
- Secure authentication.
- Encrypted communication.
- Private evidence storage.
- File validation.
- Audit logs.
- Versioned parcel records.
- Limited public exposure of personal information.
- Officer-only approval actions.

No real personal or land documents should be used in the prototype.

## Future Scope

- Real RTK rover integration through Bluetooth or serial.
- CORS/NTRIP correction support.
- Survey-grade drone import.
- Orthomosaic and point-cloud processing.
- PostGIS geometry analysis.
- Offline Android field application.
- QR/NFC marker scanning.
- Official RoR, registration, mutation, and court-record integration.
- ULPIN linkage through approved systems.
- Public verification portal.
- Digital signatures and audit trails.
- Precision-agriculture layers.

## Expected Impact

KshetraProof can help make rural agricultural land management more:

- Accurate.
- Transparent.
- Evidence-based.
- Easier to verify.
- Better connected to current records.
- Safer for shared-boundary disputes.
- More useful for agricultural planning.

## Project Summary

KshetraProof is not just a drone map. It is an evidence-linked land-resurvey workflow that connects physical survey data, official change records, landholder objections, officer review, and historical parcel versions.

```text
Measure → Compare → Explain → Verify → Decide → Preserve history
```

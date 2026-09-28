# KshetraProof Prototype Implementation Guide

## 1. Purpose

KshetraProof is a prototype web application for SIH26010: Survey/Resurvey of Rural Agricultural Land in India.

The prototype demonstrates how a proposed hardware-assisted system can:

1. Display agricultural parcels on a map.
2. Simulate drone and RTK/CORS survey inputs.
3. Capture boundary-point evidence.
4. Detect area and boundary conflicts.
5. Record citizen objections.
6. Support officer review.
7. Preserve parcel status history.
8. Generate a parcel survey report.

This is a proof of concept. The prototype uses simulated drone and RTK data. It does not determine legal ownership or update official government records.

## 2. Scope

### Included

- React frontend.
- Node.js and Express backend.
- Demo authentication.
- Village dashboard.
- Interactive parcel map.
- Parcel details.
- Simulated hardware status.
- Simulated RTK boundary-point capture.
- Evidence records.
- Conflict detection.
- Objection submission.
- Officer review.
- Parcel version history.
- Parcel report.

### Not included

- Real drone flight.
- Real RTK/CORS connection.
- Official land-record API integration.
- Legal title determination.
- Real ULPIN generation.
- Production-grade AI boundary extraction.
- National-scale deployment.

## 3. Demonstration scenario

Use one fictional village named `Rampur` and five parcels.

The main demonstration parcel is `P-101`:

- Survey number: `101`
- Recorded owner: `Ramesh Kumar`
- Recorded area: `2.00 acres`
- Measured area: `1.85 acres`
- Difference: `0.15 acres`
- Status: `Boundary conflict`
- Action: `Field verification required`

Demo story:

```text
Old map and current survey do not match.
A surveyor captures a simulated RTK boundary point.
The system attaches a photo and marker ID.
The conflict engine detects the area mismatch.
A citizen submits an objection.
An officer reviews the evidence.
The parcel status is updated and a report is generated.
```

## 4. Technology stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- React-Leaflet
- Axios
- React Hook Form
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- JWT authentication for the prototype
- Multer for file uploads
- Zod or Joi for request validation
- bcrypt for password hashing
- dotenv
- CORS

### Database

For the one-day prototype, use either JSON/SQLite for fastest implementation or PostgreSQL with PostGIS for a more realistic implementation. Start with JSON or SQLite if necessary, but keep the API and data model compatible with PostgreSQL/PostGIS.

### Production direction

- PostgreSQL + PostGIS
- Object storage for imagery and evidence
- Offline Flutter/Android field application
- RTK rover connection through Bluetooth or serial
- Drone-processing pipeline
- Government-approved land-record APIs

## 5. Architecture

```text
React Frontend
    |
    | REST API / JSON
    v
Node.js + Express Backend
    |
    +-- Authentication
    +-- Parcel service
    +-- Survey-point service
    +-- Evidence service
    +-- Conflict service
    +-- Objection service
    +-- Review service
    +-- Report service
    |
    v
JSON/SQLite or PostgreSQL/PostGIS
    |
    +-- Parcels
    +-- Boundary points
    +-- Evidence
    +-- Conflicts
    +-- Objections
    +-- Parcel history
```

## 6. Project structure

```text
kshetraproof/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── ParcelMap.jsx
│   │   │   ├── DeviceStatus.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── EvidenceCard.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── VillageMap.jsx
│   │   │   ├── ParcelDetails.jsx
│   │   │   ├── BoundaryCapture.jsx
│   │   │   ├── Conflicts.jsx
│   │   │   ├── Objections.jsx
│   │   │   ├── OfficerReview.jsx
│   │   │   ├── ParcelReport.jsx
│   │   │   └── Devices.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── parcelService.js
│   │   │   ├── surveyService.js
│   │   │   ├── conflictService.js
│   │   │   └── objectionService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── data/
│   │   │   └── demoData.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── villages.routes.js
│   │   │   ├── parcels.routes.js
│   │   │   ├── points.routes.js
│   │   │   ├── evidence.routes.js
│   │   │   ├── conflicts.routes.js
│   │   │   ├── objections.routes.js
│   │   │   ├── reviews.routes.js
│   │   │   └── devices.routes.js
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── data/
│   │   │   └── demoData.json
│   │   └── server.js
│   ├── uploads/
│   ├── package.json
│   └── .env
├── README.md
└── IMPLEMENTATION.md
```

## 7. Required pages

### 7.1 Login

Fields: email, password, and role.

Demo users:

```text
surveyor@demo.com / demo123
officer@demo.com / demo123
```

Roles: `surveyor`, `officer`, and `admin`.

### 7.2 Dashboard

Show total villages, total parcels, surveyed parcels, verified parcels, pending parcels, disputed parcels, high-priority conflicts, survey progress, and conflict-type charts.

### 7.3 Village map

Show parcel polygons, old cadastral boundaries, proposed boundaries, RTK points, boundary markers, roads, canals, and disputed parcels.

Map colours:

```text
Blue: old boundary
Green: verified
Yellow: pending
Red: disputed
Orange: area mismatch
Purple: government/common land
```

### 7.4 Parcel details

Show parcel ID, survey number, ULPIN field, owner, recorded area, measured area, land type, status, accuracy class, survey date, boundary points, evidence, objections, and history.

Actions: capture boundary point, view evidence, submit objection, open officer review, and download report.

### 7.5 Boundary capture

Show simulated device status:

```text
Smart pole: Connected
RTK receiver: Simulated fixed
Accuracy: 0.03 m
Battery: 78%
Network: Offline mode
```

Fields: parcel ID, marker ID, boundary-point ID, latitude, longitude, accuracy, RTK status, note, and photo.

On capture:

1. Validate fields.
2. Create a point record.
3. Add it to the parcel.
4. Display it on the map.
5. Create an evidence record.
6. Add a parcel-history event.

### 7.6 Conflicts

Show conflict ID, parcel ID, conflict type, recorded value, measured value, difference, priority, status, and required action.

Conflict types: area mismatch, boundary shift, parcel overlap, missing parcel, owner mismatch, mutation pending, registration mismatch, and disputed boundary.

### 7.7 Objections

Fields: parcel ID, objector name, contact, objection type, description, claimed boundary, supporting document, and photo.

Statuses: submitted, under review, field verification requested, resolved, and rejected.

### 7.8 Officer review

Show old map, proposed map, RTK points, evidence photos, owner record, mutation status, registration status, objections, and surveyor notes.

Actions: approve proposed boundary, request field visit, mark disputed, reject proposed change, or refer to legal process. Every action must create a history entry.

### 7.9 Parcel report

Include parcel identity, survey number, village, owner record, recorded area, measured area, boundary points, evidence count, objection count, accuracy class, current status, version number, and this disclaimer:

```text
This is a survey and verification report for demonstration purposes.
It is not a legal title certificate and does not replace an official
revenue-department decision.
```

## 8. REST API

```http
POST /api/auth/login
GET  /api/auth/me
GET  /api/villages
GET  /api/villages/:id
GET  /api/parcels
GET  /api/parcels/:id
GET  /api/parcels/:id/geojson
GET  /api/parcels/:id/history
PUT  /api/parcels/:id/status
GET  /api/parcels/:id/points
POST /api/parcels/:id/points
POST /api/evidence/upload
GET  /api/parcels/:id/evidence
GET  /api/conflicts
GET  /api/conflicts/:id
POST /api/conflicts/run-analysis
PUT  /api/conflicts/:id/status
GET  /api/objections
POST /api/objections
GET  /api/objections/:id
PUT  /api/objections/:id/status
GET  /api/reviews/pending
POST /api/reviews/:parcelId/decision
GET  /api/devices
POST /api/devices/:id/telemetry
PUT  /api/devices/:id/status
```

Example boundary-point request:

```json
{
  "markerId": "BM-101-A",
  "pointCode": "A",
  "latitude": 20.123456,
  "longitude": 73.123456,
  "elevation": 102.3,
  "accuracy": 0.03,
  "rtkStatus": "fixed",
  "note": "Boundary point captured near field bund"
}
```

## 9. Data model

### Parcel

```json
{
  "id": 1,
  "parcelId": "P-101",
  "villageId": 1,
  "surveyNumber": "101",
  "ulpin": "DEMO-ULPIN-101",
  "ownerName": "Ramesh Kumar",
  "recordedArea": 2.0,
  "measuredArea": 1.85,
  "landType": "Agricultural",
  "status": "conflict",
  "accuracyClass": "Simulated RTK",
  "oldGeometry": {},
  "proposedGeometry": {},
  "approvedGeometry": null
}
```

### Boundary point

```json
{
  "id": 1,
  "parcelId": "P-101",
  "pointCode": "A",
  "markerId": "BM-101-A",
  "latitude": 20.123456,
  "longitude": 73.123456,
  "elevation": 102.3,
  "accuracy": 0.03,
  "rtkStatus": "fixed",
  "photoUrl": "/uploads/bm-101-a.jpg",
  "note": "Boundary point captured",
  "capturedBy": "survey-demo",
  "capturedAt": "2026-09-28T09:00:00Z"
}
```

### Conflict

```json
{
  "id": 1,
  "parcelId": "P-101",
  "type": "area_mismatch",
  "recordedValue": 2.0,
  "measuredValue": 1.85,
  "difference": 0.15,
  "priority": "high",
  "status": "open",
  "recommendedAction": "Field verification required"
}
```

### Objection

```json
{
  "id": 1,
  "parcelId": "P-101",
  "objectorName": "Suresh Kumar",
  "type": "boundary_claim",
  "description": "The proposed boundary includes part of my cultivated field.",
  "status": "submitted"
}
```

## 10. Conflict logic

```js
const difference = Math.abs(recordedArea - measuredArea);
const percentage = (difference / recordedArea) * 100;

if (percentage > 5) {
  conflictType = 'area_mismatch';
  priority = 'high';
}

if (boundaryShiftMetres > 0.30) {
  conflictType = 'boundary_shift';
}
```

Status rules:

```text
No conflict + sufficient evidence       → Verified
Conflict + no objection                 → Pending field verification
Conflict + objection                    → Disputed
Officer approval                        → Approved
Officer request                         → Field visit required
```

Do not automatically treat a conflict as an ownership decision.

## 11. Demo GeoJSON

```js
export const villageGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        parcelId: 'P-101',
        surveyNumber: '101',
        owner: 'Ramesh Kumar',
        status: 'conflict',
        recordedArea: 2.0,
        measuredArea: 1.85
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [73.1230, 20.1230],
          [73.1240, 20.1230],
          [73.1240, 20.1240],
          [73.1230, 20.1240],
          [73.1230, 20.1230]
        ]]
      }
    }
  ]
};
```

Use a separate proposed polygon with a small shift to make the boundary conflict visible.

## 12. Hardware simulation API

### Simulated drone

```json
{
  "missionId": "M-001",
  "villageId": 1,
  "imageCount": 128,
  "surveyDate": "2026-09-28",
  "source": "simulated_drone",
  "orthomosaicUrl": "/uploads/rampur-orthomosaic.jpg"
}
```

### Simulated RTK point

```json
{
  "parcelId": "P-101",
  "markerId": "BM-101-A",
  "latitude": 20.123456,
  "longitude": 73.123456,
  "accuracy": 0.03,
  "status": "fixed",
  "source": "simulated_rtk"
}
```

### Simulated device telemetry

```json
{
  "deviceId": "SMART-POLE-001",
  "battery": 78,
  "network": "offline",
  "gnss": "fixed",
  "lastSync": "2026-09-28T09:00:00Z"
}
```

Every simulated value must be labelled in the UI as `Demo`, `Mock`, or `Simulated`.

## 13. Implementation order

### Phase 1: Setup

1. Create React/Vite client.
2. Create Express server.
3. Add environment variables.
4. Add routing.
5. Add Tailwind styling.

### Phase 2: Core UI

1. Build layout.
2. Build sidebar and header.
3. Build dashboard cards.
4. Build parcel list.
5. Build map page.

### Phase 3: Main workflow

1. Open parcel.
2. View parcel details.
3. Capture simulated boundary point.
4. Save evidence.
5. Display point on map.
6. Show conflict.
7. Submit objection.
8. Review objection.
9. Update status.
10. Display version history.

### Phase 4: Hardware layer

1. Add device-status panel.
2. Add simulated drone mission.
3. Add simulated RTK point.
4. Add marker IDs.
5. Add battery and network indicators.

### Phase 5: Submission polish

1. Add loading states.
2. Add error messages.
3. Add empty states.
4. Add demo labels.
5. Test all buttons.
6. Deploy.
7. Record the demonstration video.

## 14. Frontend implementation rules

- Use reusable components.
- Keep all API calls in `services/`.
- Do not put API calls directly in every component.
- Use loading and error states.
- Use confirmation dialogs for status changes.
- Make the app responsive for laptop and mobile.
- Use clear colours for parcel status.
- Show `Simulated` labels beside hardware values.
- Never display fake accuracy as actual survey accuracy.

## 15. Backend implementation rules

- Validate all request bodies.
- Use consistent error responses.
- Add timestamps to all records.
- Preserve history after every status change.
- Store uploaded files with unique names.
- Do not expose sensitive files publicly.
- Use role checks for officer actions.
- Keep simulated hardware routes separate from production routes.

Example error response:

```json
{
  "success": false,
  "message": "Parcel not found",
  "code": "PARCEL_NOT_FOUND"
}
```

Example success response:

```json
{
  "success": true,
  "data": {},
  "message": "Boundary point captured successfully"
}
```

## 16. Environment variables

### Client `.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_MAP_DEFAULT_LAT=20.1235
VITE_MAP_DEFAULT_LNG=73.1235
```

### Server `.env`

```env
PORT=5000
JWT_SECRET=change_this_for_demo
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/kshetraproof
UPLOAD_DIR=uploads
```

## 17. Local setup

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

### Dependencies

```bash
# client
npm install react-router-dom axios leaflet react-leaflet react-hook-form recharts lucide-react
npm install -D tailwindcss @vitejs/plugin-react

# server
npm install express cors dotenv bcrypt jsonwebtoken multer zod
npm install -D nodemon
```

## 18. Required demo flow

1. Login as a surveyor.
2. Open the Rampur dashboard.
3. Open the village map.
4. Click Parcel P-101.
5. Show the old and proposed boundary.
6. Open the hardware panel.
7. Show simulated RTK rover as fixed.
8. Capture marker BM-101-A.
9. Attach a sample evidence photo.
10. Show the area mismatch.
11. Submit a citizen objection.
12. Login or switch to officer role.
13. Review the evidence.
14. Select `Request field verification` or `Mark disputed`.
15. Show parcel history.
16. Generate the parcel report.

## 19. Demo wording

> KshetraProof is a software proof of concept for a hardware-assisted rural agricultural land resurvey system. It simulates inputs from a survey drone, RTK/CORS rover, smart boundary pole, and coded boundary markers. The prototype demonstrates parcel mapping, evidence capture, conflict detection, objection handling, officer review, and versioned parcel reporting. Real hardware and official land-record APIs are planned for the production version.

## 20. Important disclaimers

- Demo data is fictional.
- RTK values are simulated.
- Drone imagery is simulated or sample imagery.
- The prototype does not determine legal ownership.
- The prototype does not update official land records.
- Final decisions remain with the authorized revenue authority.
- Production drone operation must comply with applicable aviation rules and permissions.

## 21. Acceptance checklist

### Functionality

- [ ] Login works.
- [ ] Dashboard loads.
- [ ] Map displays parcels.
- [ ] Parcel popup works.
- [ ] Parcel details page works.
- [ ] Simulated point capture works.
- [ ] Evidence appears after capture.
- [ ] Conflict is displayed.
- [ ] Objection can be submitted.
- [ ] Officer can change status.
- [ ] History is visible.
- [ ] Report is generated.

### Presentation

- [ ] Hardware status is visible.
- [ ] Simulated data is clearly labelled.
- [ ] Architecture is shown in PPT.
- [ ] Video link works without permission request.
- [ ] Screenshots are added to the PPT.
- [ ] No unsupported accuracy or legal claims are made.

## 22. Production extension plan

1. Offline Android field application.
2. Bluetooth connection to a real RTK receiver.
3. NTRIP/CORS correction support.
4. Survey-grade drone data import.
5. Orthomosaic and point-cloud processing.
6. PostGIS parcel geometry.
7. Real boundary-distance and overlap calculations.
8. QR/NFC boundary-marker scanning.
9. Secure object storage.
10. State land-record API integration.
11. Role-based government authentication.
12. Public verification and objection portal.
13. Audit logs and digital signatures.
14. Accuracy and quality reports.

## 23. Final result

The completed prototype must demonstrate:

```text
Field hardware input
        ↓
Parcel-linked evidence
        ↓
Map and boundary comparison
        ↓
Conflict detection
        ↓
Citizen objection
        ↓
Officer decision
        ↓
Versioned parcel report
```

The prototype is successful if a reviewer can understand how a real drone, RTK rover, smart pole, boundary marker, field tablet, and land-record system will work together.

# 🌾 KshetraProof (क्षेत्रप्रूफ़)

> **SIH26010: Software Control and Verification Layer for Hardware-Assisted Rural Agricultural Land Survey & Resurvey in India**

KshetraProof connects agricultural parcel maps, simulated field survey evidence (drones, RTK/CORS GNSS, smart boundary poles, coded markers), area mismatch conflicts, citizen objections, officer reviews, and immutable version history into a unified digital workflow.

---

## 📌 Problem Statement

Many rural land records (7/12 extracts and old paper cadastral maps from 1985 or earlier) **do not match present ground conditions** because of:

- Inheritance and informal family partitions.
- Mud bund shifts caused by tractor tilling over decades.
- Registered sales or gifts not reflected in updated mutation records.
- Unrecorded transactions and boundary encroachment.
- Differences between textual area records (acres/hectares) and spatial map geometry.
- Shared-boundary disputes between neighbouring landholders.

These issues lead to land disputes, delayed revenue decisions, incorrect agricultural planning, and administrative inefficiency.

---

## 💡 Proposed Solution & Innovation

KshetraProof is an **evidence-linked shared-boundary verification platform**.

It compares:
```text
Old Cadastral Map (1985) + 7/12 Records
                  +
Current Aerial / Drone Survey Layer
                  +
RTK/CORS Ground Points (±0.03m Precision)
                  +
Current Legal & Administrative Change Records
                  ↓
Automated Conflict Engine & Revenue Officer Review
```

### Key Innovation
The platform distinguishes **lawful changes** (inheritance, sale, partition, acquisition, survey correction) from **unsupported physical shifts** (moved fences or bund encroachment). It does not decide ownership automatically—it presents transparent spatial evidence to authorized revenue officers for verification and decision.

---

## 🚀 Prototype Features & Workflow

### 1. Resurvey Control Dashboard (`/dashboard`)
- Overview stats: Total Parcels (5), Verified (1), Pending (1), Disputed (1), High-Priority Conflicts (2).
- Live hardware telemetry panel (Smart Pole connected, RTK fixed, battery, offline mode).
- Pie charts for parcel status split and daily survey progress.

### 2. Interactive Cadastral Map (`/map`)
- Leaflet map displaying **Old 1985 Boundaries (Solid Blue Line)** vs **Proposed Resurvey Boundaries (Dashed Ink Line)**.
- Map Layer Switcher: Toggle between **CARTO Parchment**, **Google Maps Road**, **Google Satellite (HD)**, and **Esri Imagery**.
- Floating parcel card, RTK pillar markers (`BM-101-A` to `E`), and map legend.

### 3. Parcel Details & Timeline (`/parcels/P-101`)
- Area visualizer comparing **2.00 acres (Recorded)** vs **1.85 acres (Measured RTK)** with a `Δ 0.15 ac (7.5%)` deficit badge.
- Tabbed inspector for RTK boundary points, photo evidence, citizen objections, and version audit history (`v1.0` → `v7.0`).

### 4. Boundary Point Capture (`/boundary-capture`)
- Field tablet interface for surveyors with live hardware telemetry, RTK fix simulator, photo upload, and instant map update.

### 5. Automated Conflict Engine (`/conflicts`)
- Registry of flagged area mismatches (>5% threshold) and boundary shifts (>0.30m), recommending officer field verification.

### 6. Citizen Objections Portal (`/objections`)
- Public submission form for landholders to lodge boundary claims, upload 7/12 documents, and track reference numbers (`OBJ-001`).

### 7. Revenue Officer Review (`/reviews`)
- Split-screen review desk with spatial map overlay and 5 action buttons (*Approve Proposed*, *Request Field Visit*, *Mark Disputed*, *Reject Change*, *Refer Legal*) requiring mandatory officer comments.

### 8. Printable Survey Sheet Report (`/reports/parcels/P-101`)
- Printed-sheet design with village title block grid, map snapshot, coordinate tables, rotated DEMO stamp, and legal disclaimer notice.

### 9. Hardware Fleet Status (`/devices`)
- Telemetry cards for survey drones (`M-001`), Smart Pole rovers, and CORS reference stations.

---

## 🎬 Demonstration Flow

```text
Login (Surveyor) → Village Map → Inspect Parcel P-101
      │
      ├─▸ Capture RTK Point (BM-101-E, ±0.03m precision)
      ├─▸ Conflict Engine Flagged (7.5% Area Deficit)
      ├─▸ Submit Citizen Objection (OBJ-002)
      └─▸ Revenue Officer Review (Switch Persona → Request Field Visit / Approve)
            │
            └─▸ Version History Updated (v1.0 → v7.0) → Generate Survey Sheet Report
```

---

## 🔑 Demo Login Credentials

You can log in or switch roles instantly using the top header pill:

| Role | Email | Password | Primary Actions |
|---|---|---|---|
| **Field Surveyor** | `surveyor@demo.com` | `demo123` | Capture RTK points, attach evidence, view map |
| **Revenue Officer** | `officer@demo.com` | `demo123` | Review conflicts, approve/dispute boundaries, generate report |
| **System Admin** | `admin@demo.com` | `demo123` | Manage village settings & device telemetry |
| **Landholder / Citizen** | `citizen@demo.com` | `demo123` | View draft parcel info & submit objections |

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js `v18+` or `v24+`
- npm `v9+` or `v11+`

### 1. Start Backend API Server
```bash
cd server
npm install
npm run dev
```
*Backend API server runs on `http://localhost:5000/api`*

### 2. Start Frontend Web Client
```bash
cd client
npm install
npm run dev
```
*Frontend web application runs on `http://localhost:5173`*

---

## 🛠️ Technology Stack

### Prototype Implementation
- **Frontend**: React 18, Vite, Tailwind CSS ("Earth & Field" visual theme), React-Leaflet, Recharts, Lucide React, Axios.
- **Backend**: Node.js, Express.js, JWT Authentication, Multer file uploads, In-memory JSON database (`demoData.json`).
- **Maps**: Leaflet (CARTO Parchment, Google Maps Road & Satellite, Esri World Imagery).

### Target Production Architecture
- **Hardware**: Survey-grade RTK/PPK Quadcopter Drone, CORS-connected RTK GNSS Rover, Smart Survey Pole, QR/NFC Boundary Markers.
- **Backend & GIS**: Node.js/Python, PostgreSQL + PostGIS, Object Storage, Offline Android Field App, State Land Record APIs (RoR/Mutation).

---

## 📁 Project Structure

```text
KshetraProof/
├── client/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/         # Layout, Header, Sidebar, ParcelMap, DeviceStatus, etc.
│   │   ├── context/            # AuthContext (Role Switcher & JWT state)
│   │   ├── pages/              # Login, Dashboard, VillageMap, ParcelDetails, BoundaryCapture,
│   │   │                       # Conflicts, Objections, OfficerReview, ParcelReport, Devices
│   │   ├── services/           # Axios API services
│   │   └── index.css           # Tailwind & Warm Parchment map styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                     # Node.js + Express REST API Server
│   ├── src/
│   │   ├── data/               # demoData.json (Rampur village 5 parcels dataset)
│   │   └── server.js           # REST API server & routes
│   ├── uploads/                # Evidence photos folder
│   ├── .env
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🌐 Core API Routes

```http
POST /api/auth/login                # Authenticate user and issue JWT
GET  /api/villages                   # Fetch village metadata
GET  /api/parcels                    # Fetch all parcels or filter by status
GET  /api/parcels/:id                # Fetch single parcel with points & evidence
POST /api/parcels/:id/points         # Capture simulated RTK boundary point
POST /api/evidence/upload            # Upload field photo evidence
GET  /api/conflicts                  # Retrieve flagged area/boundary conflicts
POST /api/conflicts/run-analysis     # Execute automated conflict detection scan
POST /api/objections                 # Submit citizen objection claim
POST /api/reviews/:parcelId/decision # Execute Revenue Officer review decision
GET  /api/parcels/:id/history        # Retrieve immutable version audit trail
GET  /api/devices                    # Fetch hardware telemetry status
```

---

## ⚠️ Disclaimer

1. **Demonstration Data**: All village parcels, owner names, coordinates, and survey values are simulated for demonstration purposes.
2. **Non-Legal Status**: The prototype demonstrates software workflows. It does not determine legal title ownership or update official state revenue records.
3. **Legal Disclaimer Notice** (as displayed on generated reports):
   > *"This is a survey and verification report for demonstration purposes. It is not a legal title certificate and does not replace an official revenue-department decision."*

---

## 📜 Summary

```text
Measure → Compare → Explain → Verify → Decide → Preserve History
```

Developed as a software prototype for **SIH26010: Resurvey of Rural Agricultural Land in India**.

# 🌾 KshetraProof (क्षेत्रप्रूफ़)

> **SIH26010: Software Control and Verification Layer for Hardware-Assisted Rural Agricultural Land Survey & Resurvey in India.**

KshetraProof connects agricultural parcel maps, simulated field survey evidence (drones, RTK/CORS GNSS, smart boundary poles, coded markers), area mismatch conflicts, citizen objections, officer reviews, and immutable version history into a unified digital workflow.

---

## 📌 Problem Overview

In rural India, paper land records (7/12 extracts) and outdated cadastral maps (from 1985 or earlier) often **do not match present ground conditions** due to:
- Inheritance & informal family land partitions.
- Mud bund shifts caused by tractor tilling over decades.
- Unrecorded land transactions & encroachment.
- Mismatches between textual records (acres/hectares) and spatial map geometry.

**KshetraProof** provides a web-based proof-of-concept demonstrating how software acts as the control and verification bridge between on-ground survey hardware and official revenue decisions.

---

## 🚀 Key Features

1. **🌾 "Earth & Field" Aesthetic Design**:
   - Custom palette tailored for land revenue: Deep forest shell (`#0F1F17`), warm parchment canvas (`#F7F4EC`), crop-green primary (`#6FA85A`), wheat-gold highlights (`#F2B632`), and soil/clay pastel cards.
   - Topographic contour backgrounds, dashed survey lines, and tabular mono typography for coordinates and ULPIN IDs.

2. **🗺️ Interactive Cadastral Map**:
   - Leaflet/CARTO parchment map renderer comparing **Old 1985 Boundaries (Solid Blue Line)** vs **Proposed Resurvey Boundaries (Dashed Ink Line)**.
   - Map Layer Switcher: Toggle between CARTO Parchment, Google Maps Road, Google Satellite (HD), and Esri Imagery.
   - Floating parcel inspection card, RTK pillar markers, and map legend.

3. **📍 Simulated RTK Boundary Point Capture**:
   - Field-tablet interface displaying live hardware status (Smart Pole connected, RTK fixed ±0.03m, battery 78%, offline field mode).
   - Capture boundary markers (`BM-101-A` to `E`), auto-tag GPS coordinates, attach field photos, and trigger real-time polygon updates.

4. **⚠️ Automated Conflict Engine**:
   - Scans village parcels for area mismatches (>5% threshold) and boundary shifts (>0.30m).
   - Pre-loaded demonstration scenario on parcel **P-101** (Recorded **2.00 acres** vs Measured **1.85 acres** → 0.15 ac / 7.5% deficit).

5. **📝 Public Citizen Objections Portal**:
   - Allows farmers and neighboring landholders to file boundary claims, upload 7/12 receipts, and track reference numbers (`OBJ-001`).

6. **⚖️ Revenue Officer Case Review**:
   - Split-screen review desk with side-by-side spatial map overlays and evidence verification.
   - 5 Officer Decision Actions with mandatory remarks:
     - 🟢 **Approve Proposed Boundary**
     - 🔵 **Request On-Ground Field Visit**
     - 🔴 **Mark Disputed**
     - ⚪ **Reject Proposed Change**
     - ⚖️ **Refer to Revenue Legal Tribunal**

7. **📋 Printable Survey Sheet Report**:
   - Printed-sheet design with Source Serif 4 typography, village title block grid, map snapshot, coordinate tables, rotated DEMO stamp, and verbatim legal disclaimer notice.

8. **📡 Hardware Fleet Telemetry**:
   - Live telemetry status cards for survey drones (`M-001` quadcopter), RTK rovers, and CORS base stations.

---

## 🎬 Main User Journey

```text
Login → Select Village → View Map → Inspect Parcel P-101
  │
  ├─▸ Capture RTK Point (BM-101-E, ±0.03m)
  ├─▸ Conflict Engine Flagged (Area Deficit 7.5%)
  ├─▸ File Citizen Objection (OBJ-001)
  └─▸ Revenue Officer Review (Request Field Visit / Approve)
        │
        └─▸ Version History Updated (v1.0 → v7.0) → Generate Survey Sheet Report
```

---

## 🛠️ Technology Stack

### Frontend (`/client`)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom "Earth & Field" tokens)
- **Maps**: Leaflet & React-Leaflet (CARTO, Google Maps & Esri layers)
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP**: Axios & React Hook Form

### Backend (`/server`)
- **Runtime**: Node.js & Express.js
- **Auth**: JWT & role-based middleware
- **Uploads**: Multer (field photo evidence)
- **Data Persistence**: In-memory JSON database (`demoData.json`)

---

## 📁 Project Structure

```text
KshetraProof/
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Layout, Header, Sidebar, ParcelMap, DeviceStatus, etc.
│   │   ├── context/            # AuthContext (Role Switcher & JWT state)
│   │   ├── pages/              # Login, Dashboard, VillageMap, ParcelDetails, BoundaryCapture,
│   │   │                       # Conflicts, Objections, OfficerReview, ParcelReport, Devices
│   │   ├── services/           # Axios API services
│   │   ├── index.css           # Tailwind & Warm Parchment map styles
│   │   └── App.jsx             # React Router setup
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                     # Node.js + Express REST API Server
│   ├── src/
│   │   ├── data/               # demoData.json (Rampur village 5 parcels dataset)
│   │   └── server.js           # REST API routes & controllers
│   ├── uploads/                # Evidence photos folder
│   ├── .env
│   └── package.json
├── 01_PRD.md                   # Product Requirements Document
├── 02_Technical_Architecture.md# Technical Architecture Spec
├── 03_Security_and_Access.md   # Security & Access Spec
├── 04_Feature_Ticket_List.md   # Feature Checklist
├── 05_Frontend_Spec.md         # Frontend UI Specification
├── design.md                   # Visual Design System Tokens ("Earth & Field")
├── implementation.md           # Technical Implementation Guide
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start & Setup

### Prerequisites
- Node.js `v18+` or `v24+`
- npm `v9+` or `v11+`

### 1. Backend API Server Setup
```bash
cd server
npm install
npm run dev
```
*Server starts on `http://localhost:5000`*

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev
```
*Client starts on `http://localhost:5173`*

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

## ⚠️ Important Disclaimers

1. **Demonstration Data**: All village parcels, owner names, coordinates, and survey values are simulated for demonstration purposes.
2. **Non-Legal Status**: The prototype demonstrates software workflows. It does not determine legal title ownership or update official state revenue records.
3. **Legal Disclaimer Notice** (as displayed on generated reports):
   > *"This is a survey and verification report for demonstration purposes. It is not a legal title certificate and does not replace an official revenue-department decision."*

---

## 📜 License & Acknowledgments

Developed as a software prototype for **SIH26010: Resurvey of Rural Agricultural Land in India**.

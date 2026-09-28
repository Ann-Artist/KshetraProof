# KshetraProof Feature Ticket List

## Priorities

- P0: Required for the prototype demo.
- P1: Important for a polished prototype.
- P2: Production extension.

## Epic E1: Project foundation

### KP-001 — Create React/Vite project
**Priority:** P0  
**Acceptance:** Application runs locally and displays the KshetraProof shell.

### KP-002 — Create Express backend
**Priority:** P0  
**Acceptance:** Server starts and exposes `/api/health`.

### KP-003 — Configure environment variables
**Priority:** P0  
**Acceptance:** API URL, port, secret placeholders, and upload directory are configured through `.env`.

### KP-004 — Add reusable layout
**Priority:** P0  
**Acceptance:** Header, sidebar, content area, responsive layout, and mobile navigation work.

## Epic E2: Authentication and access

### KP-010 — Demo login
**Priority:** P0  
**Acceptance:** Surveyor and officer demo users can log in.

### KP-011 — Protected routes
**Priority:** P0  
**Acceptance:** Unauthenticated users cannot access application pages.

### KP-012 — Role-based navigation
**Priority:** P0  
**Acceptance:** Officer-only actions are hidden or disabled for surveyors.

## Epic E3: Dashboard and village management

### KP-020 — Dashboard statistics
**Priority:** P0  
**Acceptance:** Parcel totals, verified, pending, disputed, and conflict counts are displayed.

### KP-021 — Survey progress chart
**Priority:** P1  
**Acceptance:** Chart shows parcel status distribution.

### KP-022 — Village list
**Priority:** P0  
**Acceptance:** User can select Rampur village and open its map.

## Epic E4: Parcel map

### KP-030 — Interactive map
**Priority:** P0  
**Acceptance:** Parcel polygons appear on a Leaflet map.

### KP-031 — Parcel status styling
**Priority:** P0  
**Acceptance:** Parcel colour changes according to status.

### KP-032 — Parcel popup
**Priority:** P0  
**Acceptance:** Clicking a parcel shows ID, survey number, owner, area, and status.

### KP-033 — Old and proposed boundary layers
**Priority:** P0  
**Acceptance:** Both boundaries can be visually compared.

### KP-034 — Marker and RTK-point layers
**Priority:** P1  
**Acceptance:** Boundary markers and captured points appear on the map.

## Epic E5: Parcel records

### KP-040 — Parcel details page
**Priority:** P0  
**Acceptance:** Full parcel metadata and status are visible.

### KP-041 — Parcel evidence list
**Priority:** P0  
**Acceptance:** Linked evidence files, notes, and timestamps appear.

### KP-042 — Parcel history
**Priority:** P0  
**Acceptance:** Status changes and decisions appear chronologically.

## Epic E6: Hardware simulation

### KP-050 — Device status panel
**Priority:** P0  
**Acceptance:** Drone, RTK rover, smart pole, battery, network, and marker statuses appear.

### KP-051 — Simulated drone mission
**Priority:** P1  
**Acceptance:** A mission record shows image count and source as simulated drone.

### KP-052 — Simulated RTK point capture
**Priority:** P0  
**Acceptance:** Capture button creates a point with simulated coordinates, accuracy, marker, and parcel ID.

### KP-053 — Evidence photo upload
**Priority:** P0  
**Acceptance:** Sample photo is linked to the captured point.

## Epic E7: Conflict management

### KP-060 — Area mismatch rule
**Priority:** P0  
**Acceptance:** P-101 is flagged because recorded and measured areas differ by more than the configured threshold.

### KP-061 — Conflict list
**Priority:** P0  
**Acceptance:** User can filter conflicts by type, priority, and status.

### KP-062 — Conflict detail
**Priority:** P0  
**Acceptance:** Conflict values, evidence, and recommended action are visible.

### KP-063 — Boundary shift simulation
**Priority:** P1  
**Acceptance:** Proposed boundary can be displayed separately from old boundary.

## Epic E8: Objections

### KP-070 — Submit objection
**Priority:** P0  
**Acceptance:** A user can submit an objection against P-101.

### KP-071 — Objection status
**Priority:** P0  
**Acceptance:** Objection moves through submitted, review, field verification, and resolved states.

### KP-072 — Evidence attachment
**Priority:** P1  
**Acceptance:** Objection can contain a sample document or image.

## Epic E9: Officer review

### KP-080 — Review queue
**Priority:** P0  
**Acceptance:** Officer sees pending conflicts and objections.

### KP-081 — Evidence review
**Priority:** P0  
**Acceptance:** Officer can view map, points, photos, and objection details together.

### KP-082 — Review decision
**Priority:** P0  
**Acceptance:** Officer can request field verification or mark a parcel disputed.

### KP-083 — Decision history
**Priority:** P0  
**Acceptance:** Every decision creates a history entry.

## Epic E10: Reporting

### KP-090 — Parcel report
**Priority:** P0  
**Acceptance:** Report includes parcel information, measurements, evidence, objections, status, and disclaimer.

### KP-091 — Download or print report
**Priority:** P1  
**Acceptance:** Report can be printed or downloaded from the browser.

## Epic E11: Quality and submission

### KP-100 — Demo labels
**Priority:** P0  
**Acceptance:** Simulated drone, RTK, coordinates, and accuracy are labelled clearly.

### KP-101 — Loading and error states
**Priority:** P0  
**Acceptance:** Network and empty states are understandable.

### KP-102 — Responsive layout
**Priority:** P1  
**Acceptance:** Core screens work on laptop and mobile widths.

### KP-103 — Deployment
**Priority:** P0  
**Acceptance:** Public demo link opens without requiring local setup.

### KP-104 — Demo recording
**Priority:** P0  
**Acceptance:** Video demonstrates login, map, capture, conflict, objection, review, and report.

## Epic E12: Production roadmap

### KP-110 — Real RTK integration
**Priority:** P2  
**Acceptance:** Bluetooth or serial RTK input can populate boundary points.

### KP-111 — Offline mobile application
**Priority:** P2  
**Acceptance:** Field collection continues without internet and synchronizes later.

### KP-112 — Real drone import
**Priority:** P2  
**Acceptance:** Orthomosaic and mission metadata can be imported.

### KP-113 — PostGIS geometry analysis
**Priority:** P2  
**Acceptance:** Overlap, gap, area, and boundary calculations use spatial queries.

### KP-114 — Official API integration
**Priority:** P2  
**Acceptance:** Approved interfaces can exchange RoR, mutation, and registration data.

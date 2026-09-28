# KshetraProof Technical Architecture Document

## 1. Architecture objective

Provide a modular web platform that can use simulated survey inputs now and connect to real drone, RTK/CORS, mobile, GIS, and land-record systems later.

## 2. High-level architecture

```text
React Web Client
       |
       | HTTPS REST API
       v
Node.js + Express API
       |
       +-- Auth service
       +-- Parcel service
       +-- Survey-point service
       +-- Evidence service
       +-- Conflict service
       +-- Objection service
       +-- Review service
       +-- Report service
       +-- Device simulation service
       |
       v
PostgreSQL/PostGIS or JSON/SQLite for MVP
       |
       +-- Parcel geometry
       +-- Survey evidence
       +-- Workflow records
       +-- History and audit records
```

## 3. Technology stack

### Frontend

- React and Vite.
- React Router.
- Tailwind CSS.
- React-Leaflet.
- Axios.
- React Hook Form.
- Recharts.
- Lucide React.

### Backend

- Node.js.
- Express.
- JWT.
- bcrypt.
- Multer.
- Zod or Joi.
- dotenv.
- CORS.

### Data

- MVP: JSON or SQLite.
- Target: PostgreSQL with PostGIS.
- Evidence: local uploads for MVP; object storage in production.

## 4. Frontend modules

- Authentication.
- Dashboard.
- Village map.
- Parcel details.
- Boundary capture.
- Evidence gallery.
- Conflict dashboard.
- Objection management.
- Officer review.
- Device status.
- Parcel report.

## 5. Backend modules

- `auth`: login, token validation, role checks.
- `villages`: village list and metadata.
- `parcels`: parcel records and GeoJSON.
- `survey-points`: boundary and control points.
- `evidence`: photos, notes, and documents.
- `conflicts`: mismatch detection and status.
- `objections`: citizen claims and workflow.
- `reviews`: officer decisions.
- `reports`: report generation.
- `devices`: simulated hardware status.

## 6. API design

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

## 7. Main data entities

- User.
- Village.
- Parcel.
- Boundary point.
- Evidence.
- Conflict.
- Objection.
- Review decision.
- Parcel history.
- Device telemetry.

## 8. Geometry handling

- Store parcel geometry as GeoJSON in the MVP.
- Use PostGIS geometry in production.
- Keep old, proposed, and approved geometry separately.
- Never overwrite the historical geometry.
- Return map data as GeoJSON.

## 9. Hardware integration model

### Drone input

```json
{
  "missionId": "M-001",
  "villageId": 1,
  "imageCount": 128,
  "source": "simulated_drone"
}
```

### RTK input

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

Every value must be labelled as simulated in the MVP.

## 10. Conflict engine

- Area mismatch: percentage difference above the configured threshold.
- Boundary shift: simulated distance above the configured threshold.
- Overlap: geometry intersection greater than zero.
- Missing parcel: old record has no current geometry.
- Record mismatch: ownership or transaction data disagrees.

## 11. Deployment

### MVP

- Frontend: Vercel or Netlify.
- Backend: Render, Railway, or similar.
- Database: Supabase, Neon, or SQLite.

### Production

- Government or controlled cloud.
- PostgreSQL/PostGIS.
- Object storage.
- API gateway.
- Central logging.
- Backup and disaster recovery.

## 12. Failure handling

- Show loading states.
- Show retry actions for API failures.
- Preserve unsynchronized demo records locally.
- Do not delete a parcel on failed updates.
- Record failed sync attempts.
- Use consistent error codes.

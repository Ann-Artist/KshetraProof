# KshetraProof Product Requirements Document

## 1. Product overview

KshetraProof is a web-based prototype for SIH26010: Survey/Resurvey of Rural Agricultural Land in India. It is the software control and verification layer for a proposed hardware-assisted system using drone imagery, RTK/CORS GNSS, smart boundary markers, and a field tablet.

The prototype connects parcel maps, simulated survey evidence, conflicts, objections, officer review, and parcel history in one workflow.

## 2. Problem

Rural agricultural land records may not match present ground conditions because of inheritance, informal partition, unrecorded transactions, encroachment, outdated cadastral maps, missing mutations, and mismatches between textual records and spatial maps.

## 3. Goals

- Display agricultural parcels on an interactive map.
- Link every parcel to its survey number and record details.
- Simulate drone and RTK/CORS survey inputs.
- Capture boundary-point evidence.
- Detect area and boundary conflicts.
- Record citizen objections.
- Support authorized-officer review.
- Preserve parcel versions and decisions.
- Generate a traceable parcel survey report.

## 4. Non-goals

- Legal title determination.
- Official land-record updating.
- Real drone operation.
- Real RTK/CORS integration in the prototype.
- Automatic ULPIN generation.
- Automatic dispute resolution.
- National-scale deployment.

## 5. Users

| User | Need |
|---|---|
| Surveyor | View assignments, collect points, photos, and evidence |
| Revenue officer | Review conflicts, objections, and evidence |
| Panchayat officer | View village progress and assist verification |
| Administrator | Manage users, villages, and system settings |
| Citizen/landholder | View draft parcel information and submit objections |

## 6. Main user journey

```text
Login → Select village → View map → Open parcel → Capture evidence
→ Detect conflict → Submit objection → Officer review
→ Update status → Preserve history → Generate report
```

## 7. Functional requirements

### FR-01 Authentication

The system shall support role-based login for surveyors, officers, administrators, and demo citizens.

### FR-02 Dashboard

The system shall display parcel counts, survey progress, verified parcels, pending parcels, disputed parcels, and high-priority conflicts.

### FR-03 Village map

The system shall display parcel polygons, old boundaries, proposed boundaries, survey points, boundary markers, roads, canals, and conflict status.

### FR-04 Parcel details

The system shall display parcel ID, survey number, ULPIN field, owner record, area, land type, status, evidence, objections, and history.

### FR-05 Hardware simulation

The system shall display simulated status for a drone, RTK rover, smart pole, boundary markers, tablet, network, and battery.

### FR-06 Boundary-point capture

The system shall allow a surveyor to create a simulated boundary point with marker ID, coordinates, accuracy, RTK status, note, and photograph.

### FR-07 Evidence management

The system shall link evidence files and notes to a parcel and boundary point.

### FR-08 Conflict detection

The system shall detect or display area mismatch, boundary shift, overlap, missing parcel, record mismatch, pending mutation, and disputed boundary.

### FR-09 Objections

The system shall allow submission and tracking of parcel objections.

### FR-10 Officer review

An authorized officer shall be able to approve, request field verification, mark disputed, reject a proposed change, or refer a case for legal review.

### FR-11 History

Every status change and officer decision shall create a history entry.

### FR-12 Report

The system shall generate a parcel survey report containing parcel details, measurements, evidence count, objections, status, accuracy label, and disclaimer.

## 8. Non-functional requirements

- Responsive on desktop and mobile browser.
- Clear status colours and labels.
- Demo data must be clearly identified as simulated.
- API responses should be consistent.
- Records should include timestamps.
- Officer actions require authorization.
- The prototype should be deployable using common cloud hosting.
- Basic screens should load within three seconds on a normal connection.
- The application should remain usable if map tiles are temporarily unavailable.

## 9. Success criteria

The prototype is successful when a reviewer can:

1. Log in.
2. Open Rampur village.
3. View parcels on the map.
4. Open P-101.
5. Capture a simulated RTK point.
6. View a boundary/area conflict.
7. Submit an objection.
8. Review the objection as an officer.
9. Update the parcel status.
10. View the version history and report.

## 10. Demo data

Use a fictional Rampur village with five parcels. P-101 should show 2.00 acres recorded area and 1.85 acres measured area, producing a high-priority area mismatch.

## 11. Disclaimers

The prototype uses fictional data and simulated survey inputs. It does not determine ownership, issue a title certificate, update official records, or claim actual RTK/drone accuracy.

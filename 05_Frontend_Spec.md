# KshetraProof Frontend Specification

## 1. Frontend objective

Create a clear, responsive interface for viewing agricultural parcels, collecting simulated survey evidence, reviewing conflicts, handling objections, and generating parcel reports.

## 2. Design principles

- Map-first workflow.
- Simple language.
- Clear status colours.
- Evidence visible beside the map.
- Role-specific actions.
- Simulated values visibly labelled.
- Mobile-friendly layouts.
- No legal or accuracy overclaiming.

## 3. Visual system

### Colours

| Meaning | Colour |
|---|---|
| Primary | Deep green |
| Verified | Green |
| Pending | Yellow/amber |
| Conflict | Orange |
| Disputed | Red |
| Old boundary | Blue |
| Government/common land | Purple |
| Neutral | Slate/grey |

### Typography

- Use a clear sans-serif font.
- Page title: 24–30 px.
- Section title: 18–22 px.
- Body text: 14–16 px.
- Small metadata: 12–13 px.

### Components

- App shell.
- Header.
- Sidebar.
- Stat card.
- Status badge.
- Parcel table.
- Map panel.
- Evidence card.
- Timeline.
- Device card.
- Modal.
- Toast notification.
- Empty state.
- Error state.

## 4. Route map

```text
/login
/dashboard
/villages
/villages/:villageId/map
/parcels/:parcelId
/parcels/:parcelId/capture
/conflicts
/conflicts/:conflictId
/objections
/objections/:objectionId
/reviews
/reviews/:parcelId
/reports/parcels/:parcelId
/devices
```

## 5. Layout

### Desktop

```text
┌──────────────┬──────────────────────────────┐
│ Sidebar      │ Header                       │
│              ├──────────────────────────────┤
│ Navigation   │ Main content                  │
│              │                              │
└──────────────┴──────────────────────────────┘
```

### Map screen

```text
┌──────────────────────────────┬─────────────┐
│ Map                          │ Parcel list │
│                              │ Filters     │
│                              │ Details     │
└──────────────────────────────┴─────────────┘
```

On mobile, the parcel panel becomes a bottom sheet or collapsible drawer.

## 6. Login screen

### Elements

- KshetraProof logo/name.
- Email field.
- Password field.
- Role selector or demo-user buttons.
- Login button.
- Demo-data disclaimer.

### States

- Empty form.
- Loading.
- Invalid credentials.
- Successful login.

## 7. Dashboard screen

### Top cards

- Total parcels.
- Verified.
- Pending.
- Disputed.
- High-priority conflicts.

### Main content

- Village progress chart.
- Conflict chart.
- Recent objections.
- Recent survey activity.
- Device-health summary.

## 8. Map screen

### Controls

- Village selector.
- Search by parcel ID or survey number.
- Status filter.
- Conflict filter.
- Layer toggles.
- Fit-to-village button.
- Legend.

### Layers

- Old cadastral boundary.
- Proposed boundary.
- Approved boundary.
- Boundary points.
- Markers.
- Roads and canals.
- Drone imagery placeholder.

### Popup

```text
Parcel P-101
Survey No. 101
Owner: Ramesh Kumar
Recorded area: 2.00 acres
Measured area: 1.85 acres
Status: Boundary conflict
[Open details]
```

## 9. Parcel details screen

Use tabs:

- Overview.
- Map comparison.
- Evidence.
- Objections.
- History.

### Overview actions

- Capture point.
- Submit objection.
- Review conflict.
- Generate report.

## 10. Boundary capture screen

### Device card

```text
Smart pole: Connected
RTK: Simulated fixed
Accuracy: 0.03 m
Battery: 78%
Network: Offline mode
```

### Form

- Marker ID.
- Point code.
- Latitude.
- Longitude.
- Elevation.
- Accuracy.
- RTK status.
- Notes.
- Photo upload.

### Success state

Show:

- Point saved.
- Evidence linked.
- Point visible on map.
- Parcel history updated.

## 11. Conflict screen

### Conflict card

```text
Area mismatch
Recorded: 2.00 acres
Measured: 1.85 acres
Difference: 0.15 acres
Priority: High
Status: Open
Action: Field verification required
```

### Comparison panel

Show old boundary in blue and proposed boundary in red. Add captured RTK points in green.

## 12. Objection screen

### Form

- Objector name.
- Contact.
- Objection type.
- Description.
- Claimed boundary.
- Supporting file.
- Confirmation checkbox.
- Submit button.

### Confirmation

Display:

```text
Your objection was recorded.
Reference: OBJ-001
Status: Submitted
```

## 13. Officer review screen

Use a two-column layout:

- Left: map and boundary comparison.
- Right: owner record, evidence, objections, and actions.

Actions must include confirmation dialogs:

- Request field verification.
- Mark disputed.
- Approve proposed boundary.
- Reject proposed change.
- Refer for legal review.

## 14. Report screen

Use a printable white report layout with:

- KshetraProof heading.
- Parcel identity.
- Map image.
- Area comparison.
- Boundary-point table.
- Evidence count.
- Objection summary.
- Current status.
- Version information.
- Disclaimer.

## 15. State handling

### Loading

Use skeleton cards or a spinner with text such as `Loading parcel data...`.

### Empty

Use clear messages such as `No conflicts found for this village.`

### Error

Show the problem and a retry button.

### Offline/demo

Show a visible banner:

```text
Demo mode: survey hardware values are simulated.
```

## 16. Accessibility

- Use labels for all form fields.
- Maintain keyboard navigation.
- Provide visible focus states.
- Do not rely only on colour to communicate status.
- Use icons with text labels.
- Maintain readable contrast.
- Provide alt text for evidence images.
- Use confirmation text for irreversible workflow actions.

## 17. Frontend data services

Create these service functions:

```js
login(credentials)
getDashboard()
getVillages()
getVillageMap(villageId)
getParcel(parcelId)
getParcelHistory(parcelId)
captureBoundaryPoint(parcelId, payload)
getEvidence(parcelId)
getConflicts(filters)
submitObjection(payload)
getPendingReviews()
submitReviewDecision(parcelId, payload)
getDeviceStatus()
generateParcelReport(parcelId)
```

## 18. Frontend acceptance criteria

- User can log in.
- Dashboard cards show demo values.
- Map renders parcel polygons.
- Parcel colours match status.
- Parcel popup opens.
- Parcel details page loads.
- Boundary capture form saves a simulated point.
- Captured point appears on the map.
- Evidence appears on the parcel page.
- Conflict information is understandable.
- Objection form submits successfully.
- Officer actions are role-protected.
- History timeline updates after a decision.
- Report is printable or downloadable.
- Simulated values are clearly labelled.
- Layout works on desktop and mobile.

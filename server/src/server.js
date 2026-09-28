import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kshetraproof_demo_secret_key_2026';

// Middleware
app.use(cors());
app.use(express.json());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Multer storage for evidence uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

// Load Data from JSON into memory for live persistence during runtime
const dataFilePath = path.join(__dirname, 'data/demoData.json');
let dbData = {
  villages: [],
  parcels: [],
  boundaryPoints: [],
  evidence: [],
  conflicts: [],
  objections: [],
  parcelHistory: [],
  devices: []
};

try {
  const raw = fs.readFileSync(dataFilePath, 'utf8');
  dbData = JSON.parse(raw);
} catch (err) {
  console.error('Error loading demoData.json:', err);
}

function saveDb() {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(dbData, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save to demoData.json:', e);
  }
}

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    // Demo fallback for ease of testing
    req.user = { email: 'surveyor@demo.com', role: 'surveyor', name: 'Sunil Varma' };
    return next();
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.user = { email: 'surveyor@demo.com', role: 'surveyor', name: 'Sunil Varma' };
      return next();
    }
    req.user = user;
    next();
  });
}

// ------------------- API ROUTES -------------------

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  let selectedRole = role || 'surveyor';
  let name = 'Demo User';
  if (email.includes('officer')) {
    selectedRole = 'officer';
    name = 'Vikram Desai (Revenue Officer)';
  } else if (email.includes('admin')) {
    selectedRole = 'admin';
    name = 'System Administrator';
  } else if (email.includes('surveyor')) {
    selectedRole = 'surveyor';
    name = 'Sunil Varma (Surveyor #402)';
  } else if (email.includes('citizen')) {
    selectedRole = 'citizen';
    name = 'Ramesh Kumar (Landholder)';
  }

  const payload = { email, role: selectedRole, name };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

  return res.json({
    success: true,
    data: {
      token,
      user: payload
    },
    message: 'Login successful'
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ success: true, data: req.user });
});

// Villages
app.get('/api/villages', (req, res) => {
  res.json({ success: true, data: dbData.villages });
});

app.get('/api/villages/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const village = dbData.villages.find(v => v.id === id || v.villageId === req.params.id);
  if (!village) {
    return res.status(404).json({ success: false, message: 'Village not found' });
  }
  res.json({ success: true, data: village });
});

// Dashboard summary
app.get('/api/dashboard', (req, res) => {
  const totalParcels = dbData.parcels.length;
  const verified = dbData.parcels.filter(p => p.status === 'verified' || p.status === 'approved').length;
  const pending = dbData.parcels.filter(p => p.status === 'pending').length;
  const disputed = dbData.parcels.filter(p => p.status === 'disputed').length;
  const conflict = dbData.parcels.filter(p => p.status === 'conflict').length;
  const highPriorityConflicts = dbData.conflicts.filter(c => c.priority === 'high' && c.status === 'open').length;

  res.json({
    success: true,
    data: {
      totalVillages: dbData.villages.length,
      totalParcels,
      verifiedParcels: verified,
      pendingParcels: pending,
      disputedParcels: disputed,
      conflictParcels: conflict,
      highPriorityConflicts,
      surveyProgressPercent: 80,
      recentActivity: dbData.parcelHistory.slice(-5).reverse(),
      conflicts: dbData.conflicts,
      objections: dbData.objections.slice(-5).reverse()
    }
  });
});

// Parcels
app.get('/api/parcels', (req, res) => {
  let result = dbData.parcels;
  if (req.query.status) {
    result = result.filter(p => p.status === req.query.status);
  }
  res.json({ success: true, data: result });
});

app.get('/api/parcels/:id', (req, res) => {
  const idStr = req.params.id;
  const parcel = dbData.parcels.find(p => p.parcelId === idStr || p.id === parseInt(idStr, 10));
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Parcel not found' });
  }

  // Include points, evidence, objections, conflicts, and history
  const points = dbData.boundaryPoints.filter(pt => pt.parcelId === parcel.parcelId);
  const evidence = dbData.evidence.filter(ev => ev.parcelId === parcel.parcelId);
  const objections = dbData.objections.filter(obj => obj.parcelId === parcel.parcelId);
  const conflicts = dbData.conflicts.filter(c => c.parcelId === parcel.parcelId);
  const history = dbData.parcelHistory.filter(h => h.parcelId === parcel.parcelId);

  res.json({
    success: true,
    data: {
      ...parcel,
      points,
      evidence,
      objections,
      conflicts,
      history
    }
  });
});

app.get('/api/parcels/:id/geojson', (req, res) => {
  const idStr = req.params.id;
  const parcel = dbData.parcels.find(p => p.parcelId === idStr || p.id === parseInt(idStr, 10));
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Parcel not found' });
  }

  const featureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          parcelId: parcel.parcelId,
          layerType: 'old_boundary',
          owner: parcel.ownerName,
          status: parcel.status
        },
        geometry: parcel.oldGeometry
      },
      {
        type: 'Feature',
        properties: {
          parcelId: parcel.parcelId,
          layerType: 'proposed_boundary',
          owner: parcel.ownerName,
          status: parcel.status
        },
        geometry: parcel.proposedGeometry
      }
    ]
  };
  res.json(featureCollection);
});

app.get('/api/parcels/:id/history', (req, res) => {
  const idStr = req.params.id;
  const history = dbData.parcelHistory.filter(h => h.parcelId === idStr);
  res.json({ success: true, data: history });
});

app.put('/api/parcels/:id/status', authenticateToken, (req, res) => {
  const idStr = req.params.id;
  const { status, notes } = req.body;
  const parcel = dbData.parcels.find(p => p.parcelId === idStr || p.id === parseInt(idStr, 10));
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Parcel not found' });
  }

  parcel.status = status;

  // Add history
  const versionNum = `v${(dbData.parcelHistory.filter(h => h.parcelId === parcel.parcelId).length + 1).toFixed(1)}`;
  const historyItem = {
    id: dbData.parcelHistory.length + 1,
    parcelId: parcel.parcelId,
    version: versionNum,
    action: `Status updated to ${status}`,
    actor: req.user.name || 'Revenue Officer',
    role: req.user.role || 'officer',
    notes: notes || `Parcel status changed to ${status}`,
    timestamp: new Date().toISOString()
  };
  dbData.parcelHistory.push(historyItem);
  saveDb();

  res.json({ success: true, data: parcel, message: 'Parcel status updated successfully' });
});

// Boundary Points
app.get('/api/parcels/:id/points', (req, res) => {
  const idStr = req.params.id;
  const points = dbData.boundaryPoints.filter(pt => pt.parcelId === idStr);
  res.json({ success: true, data: points });
});

app.post('/api/parcels/:id/points', authenticateToken, upload.single('photo'), (req, res) => {
  const idStr = req.params.id;
  const parcel = dbData.parcels.find(p => p.parcelId === idStr || p.id === parseInt(idStr, 10));
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Parcel not found' });
  }

  const { markerId, pointCode, latitude, longitude, elevation, accuracy, rtkStatus, note } = req.body;

  let photoUrl = req.file ? `/uploads/${req.file.filename}` : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80';

  const newPoint = {
    id: dbData.boundaryPoints.length + 1,
    parcelId: parcel.parcelId,
    pointCode: pointCode || String.fromCharCode(65 + dbData.boundaryPoints.filter(p => p.parcelId === parcel.parcelId).length),
    markerId: markerId || `BM-${parcel.parcelId}-${Date.now().toString().slice(-4)}`,
    latitude: parseFloat(latitude) || 20.1230,
    longitude: parseFloat(longitude) || 73.1230,
    elevation: parseFloat(elevation) || 102.5,
    accuracy: parseFloat(accuracy) || 0.03,
    rtkStatus: rtkStatus || 'fixed',
    photoUrl,
    note: note || 'Simulated RTK point captured via Smart Pole',
    capturedBy: req.user.name || 'Sunil Varma (Surveyor #402)',
    capturedAt: new Date().toISOString()
  };

  dbData.boundaryPoints.push(newPoint);

  // Link evidence
  const newEvidence = {
    id: dbData.evidence.length + 1,
    parcelId: parcel.parcelId,
    markerId: newPoint.markerId,
    type: 'photo',
    title: `Boundary Point ${newPoint.markerId} Photo`,
    url: photoUrl,
    description: newPoint.note,
    uploadedBy: req.user.name || 'Sunil Varma',
    timestamp: new Date().toISOString()
  };
  dbData.evidence.push(newEvidence);

  // Add history event
  dbData.parcelHistory.push({
    id: dbData.parcelHistory.length + 1,
    parcelId: parcel.parcelId,
    version: `v${(dbData.parcelHistory.filter(h => h.parcelId === parcel.parcelId).length + 1).toFixed(1)}`,
    action: `Boundary Point Captured (${newPoint.markerId})`,
    actor: req.user.name || 'Sunil Varma',
    role: 'surveyor',
    notes: `RTK Fixed reading (±${newPoint.accuracy}m accuracy) captured at Lat ${newPoint.latitude.toFixed(5)}, Lng ${newPoint.longitude.toFixed(5)}.`,
    timestamp: new Date().toISOString()
  });

  saveDb();

  res.json({
    success: true,
    data: newPoint,
    message: 'Boundary point captured and saved successfully'
  });
});

// Evidence
app.get('/api/parcels/:id/evidence', (req, res) => {
  const idStr = req.params.id;
  const items = dbData.evidence.filter(e => e.parcelId === idStr);
  res.json({ success: true, data: items });
});

app.post('/api/evidence/upload', authenticateToken, upload.single('file'), (req, res) => {
  const { parcelId, markerId, title, description } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?w=600&auto=format&fit=crop&q=80';

  const item = {
    id: dbData.evidence.length + 1,
    parcelId: parcelId || 'P-101',
    markerId: markerId || 'BM-101-GENERIC',
    type: 'photo',
    title: title || 'Field Survey Photo',
    url: photoUrl,
    description: description || 'Uploaded field evidence',
    uploadedBy: req.user.name || 'Sunil Varma',
    timestamp: new Date().toISOString()
  };

  dbData.evidence.push(item);
  saveDb();

  res.json({ success: true, data: item, message: 'Evidence uploaded successfully' });
});

// Conflicts
app.get('/api/conflicts', (req, res) => {
  let result = dbData.conflicts;
  if (req.query.status) {
    result = result.filter(c => c.status === req.query.status);
  }
  if (req.query.priority) {
    result = result.filter(c => c.priority === req.query.priority);
  }
  res.json({ success: true, data: result });
});

app.get('/api/conflicts/:id', (req, res) => {
  const conflict = dbData.conflicts.find(c => c.conflictId === req.params.id || c.id === parseInt(req.params.id, 10));
  if (!conflict) {
    return res.status(404).json({ success: false, message: 'Conflict not found' });
  }
  res.json({ success: true, data: conflict });
});

app.post('/api/conflicts/run-analysis', authenticateToken, (req, res) => {
  // Re-run conflict detection algorithm across all parcels
  let newlyDetected = 0;
  dbData.parcels.forEach(parcel => {
    const diff = Math.abs(parcel.recordedArea - parcel.measuredArea);
    const pct = (diff / parcel.recordedArea) * 100;
    if (pct > 5.0) {
      const existing = dbData.conflicts.find(c => c.parcelId === parcel.parcelId && c.type === 'area_mismatch');
      if (!existing) {
        dbData.conflicts.push({
          id: dbData.conflicts.length + 1,
          conflictId: `CONF-${parcel.parcelId}-AUTO`,
          parcelId: parcel.parcelId,
          type: 'area_mismatch',
          title: `Area Mismatch (${pct.toFixed(1)}% Difference)`,
          recordedValue: parcel.recordedArea,
          measuredValue: parcel.measuredArea,
          difference: parseFloat(diff.toFixed(2)),
          unit: 'acres',
          boundaryShiftMetres: 0.42,
          priority: 'high',
          status: 'open',
          recommendedAction: 'Field verification required & Revenue Officer review',
          detectedAt: new Date().toISOString()
        });
        parcel.status = 'conflict';
        newlyDetected++;
      }
    }
  });

  saveDb();
  res.json({
    success: true,
    data: { newlyDetected, totalConflicts: dbData.conflicts.length },
    message: `Conflict analysis complete. ${newlyDetected} new high-priority conflicts flagged.`
  });
});

app.put('/api/conflicts/:id/status', authenticateToken, (req, res) => {
  const conflict = dbData.conflicts.find(c => c.conflictId === req.params.id || c.id === parseInt(req.params.id, 10));
  if (!conflict) {
    return res.status(404).json({ success: false, message: 'Conflict not found' });
  }

  conflict.status = req.body.status || conflict.status;
  saveDb();
  res.json({ success: true, data: conflict, message: 'Conflict status updated' });
});

// Objections
app.get('/api/objections', (req, res) => {
  res.json({ success: true, data: dbData.objections });
});

app.get('/api/objections/:id', (req, res) => {
  const objection = dbData.objections.find(o => o.objectionId === req.params.id || o.id === parseInt(req.params.id, 10));
  if (!objection) {
    return res.status(404).json({ success: false, message: 'Objection not found' });
  }
  res.json({ success: true, data: objection });
});

app.post('/api/objections', upload.single('document'), (req, res) => {
  const { parcelId, objectorName, contact, type, description, claimedBoundary } = req.body;
  const count = dbData.objections.length + 1;
  const objectionId = `OBJ-${String(count).padStart(3, '0')}`;

  const newObjection = {
    id: count,
    objectionId,
    parcelId: parcelId || 'P-101',
    objectorName: objectorName || 'Anonymous Citizen',
    contact: contact || '+91 98765 43210',
    type: type || 'boundary_claim',
    description: description || 'Objection regarding proposed boundary shift.',
    claimedBoundary: claimedBoundary || null,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    documentUrl: req.file ? `/uploads/${req.file.filename}` : null
  };

  dbData.objections.push(newObjection);

  // Update target parcel status to disputed if conflict/pending
  const parcel = dbData.parcels.find(p => p.parcelId === newObjection.parcelId);
  if (parcel) {
    parcel.status = 'disputed';
    dbData.parcelHistory.push({
      id: dbData.parcelHistory.length + 1,
      parcelId: parcel.parcelId,
      version: `v${(dbData.parcelHistory.filter(h => h.parcelId === parcel.parcelId).length + 1).toFixed(1)}`,
      action: 'Citizen Objection Submitted',
      actor: newObjection.objectorName,
      role: 'citizen',
      notes: `Reference ${objectionId}: ${newObjection.description}`,
      timestamp: new Date().toISOString()
    });
  }

  saveDb();

  res.json({
    success: true,
    data: newObjection,
    message: `Objection recorded successfully with reference ${objectionId}`
  });
});

app.put('/api/objections/:id/status', authenticateToken, (req, res) => {
  const objection = dbData.objections.find(o => o.objectionId === req.params.id || o.id === parseInt(req.params.id, 10));
  if (!objection) {
    return res.status(404).json({ success: false, message: 'Objection not found' });
  }

  objection.status = req.body.status || objection.status;
  saveDb();
  res.json({ success: true, data: objection, message: 'Objection status updated' });
});

// Officer Reviews
app.get('/api/reviews/pending', authenticateToken, (req, res) => {
  const pending = dbData.parcels.filter(p => p.status === 'conflict' || p.status === 'disputed' || p.status === 'pending');
  res.json({ success: true, data: pending });
});

app.post('/api/reviews/:parcelId/decision', authenticateToken, (req, res) => {
  const parcelId = req.params.parcelId;
  const { decision, notes, newBoundary } = req.body;

  const parcel = dbData.parcels.find(p => p.parcelId === parcelId || p.id === parseInt(parcelId, 10));
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Parcel not found' });
  }

  // decision map: approve -> approved, field_visit -> field_visit, mark_disputed -> disputed, reject -> pending
  let newStatus = parcel.status;
  if (decision === 'approve') {
    newStatus = 'approved';
    parcel.approvedGeometry = newBoundary || parcel.proposedGeometry;
  } else if (decision === 'field_visit') {
    newStatus = 'field_visit';
  } else if (decision === 'mark_disputed') {
    newStatus = 'disputed';
  } else if (decision === 'reject') {
    newStatus = 'pending';
  } else if (decision === 'refer_legal') {
    newStatus = 'disputed';
  }

  parcel.status = newStatus;

  // Record history
  const historyEvent = {
    id: dbData.parcelHistory.length + 1,
    parcelId: parcel.parcelId,
    version: `v${(dbData.parcelHistory.filter(h => h.parcelId === parcel.parcelId).length + 1).toFixed(1)}`,
    action: `Officer Decision: ${decision.toUpperCase().replace('_', ' ')}`,
    actor: req.user.name || 'Vikram Desai (Revenue Officer)',
    role: req.user.role || 'officer',
    notes: notes || `Official review action '${decision}' executed by Revenue Officer.`,
    timestamp: new Date().toISOString()
  };
  dbData.parcelHistory.push(historyEvent);

  saveDb();

  res.json({
    success: true,
    data: { parcel, decision, historyEvent },
    message: `Officer decision recorded. Parcel status updated to ${newStatus}.`
  });
});

// Devices Telemetry
app.get('/api/devices', (req, res) => {
  res.json({ success: true, data: dbData.devices });
});

app.post('/api/devices/:id/telemetry', (req, res) => {
  const device = dbData.devices.find(d => d.id === req.params.id);
  if (!device) {
    return res.status(404).json({ success: false, message: 'Device not found' });
  }

  const { battery, network, gnss, accuracy } = req.body;
  if (battery !== undefined) device.battery = battery;
  if (network !== undefined) device.network = network;
  if (gnss !== undefined) device.gnss = gnss;
  if (accuracy !== undefined) device.accuracy = accuracy;
  device.lastSync = new Date().toISOString();

  saveDb();
  res.json({ success: true, data: device, message: 'Telemetry updated (Simulated)' });
});

app.put('/api/devices/:id/status', (req, res) => {
  const device = dbData.devices.find(d => d.id === req.params.id);
  if (!device) {
    return res.status(404).json({ success: false, message: 'Device not found' });
  }

  device.status = req.body.status || device.status;
  device.lastSync = new Date().toISOString();
  saveDb();

  res.json({ success: true, data: device, message: 'Device status updated' });
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error', code: 'SERVER_ERROR' });
});

app.listen(PORT, () => {
  console.log(`KshetraProof API Server running on port ${PORT}`);
});

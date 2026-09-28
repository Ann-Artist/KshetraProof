import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VillageMap from './pages/VillageMap';
import ParcelDetails from './pages/ParcelDetails';
import BoundaryCapture from './pages/BoundaryCapture';
import Conflicts from './pages/Conflicts';
import Objections from './pages/Objections';
import OfficerReview from './pages/OfficerReview';
import ParcelReport from './pages/ParcelReport';
import Devices from './pages/Devices';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/map" element={<PrivateRoute><VillageMap /></PrivateRoute>} />
      <Route path="/villages/:villageId/map" element={<PrivateRoute><VillageMap /></PrivateRoute>} />
      <Route path="/parcels" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/parcels/:parcelId" element={<PrivateRoute><ParcelDetails /></PrivateRoute>} />
      <Route path="/parcels/:parcelId/capture" element={<PrivateRoute><BoundaryCapture /></PrivateRoute>} />
      <Route path="/boundary-capture" element={<PrivateRoute><BoundaryCapture /></PrivateRoute>} />
      <Route path="/conflicts" element={<PrivateRoute><Conflicts /></PrivateRoute>} />
      <Route path="/conflicts/:conflictId" element={<PrivateRoute><Conflicts /></PrivateRoute>} />
      <Route path="/objections" element={<PrivateRoute><Objections /></PrivateRoute>} />
      <Route path="/objections/:objectionId" element={<PrivateRoute><Objections /></PrivateRoute>} />
      <Route path="/reviews" element={<PrivateRoute><OfficerReview /></PrivateRoute>} />
      <Route path="/reviews/:parcelId" element={<PrivateRoute><OfficerReview /></PrivateRoute>} />
      <Route path="/reports/parcels/:parcelId" element={<PrivateRoute><ParcelReport /></PrivateRoute>} />
      <Route path="/devices" element={<PrivateRoute><Devices /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

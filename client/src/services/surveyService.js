import api from './api';

export const surveyService = {
  getBoundaryPoints: async (parcelId) => {
    const res = await api.get(`/parcels/${parcelId}/points`);
    return res.data;
  },
  captureBoundaryPoint: async (parcelId, formData) => {
    const res = await api.post(`/parcels/${parcelId}/points`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  getEvidence: async (parcelId) => {
    const res = await api.get(`/parcels/${parcelId}/evidence`);
    return res.data;
  },
  uploadEvidence: async (formData) => {
    const res = await api.post('/evidence/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  getDevices: async () => {
    const res = await api.get('/devices');
    return res.data;
  },
  updateDeviceTelemetry: async (id, payload) => {
    const res = await api.post(`/devices/${id}/telemetry`, payload);
    return res.data;
  }
};

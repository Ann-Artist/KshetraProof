import api from './api';

export const parcelService = {
  getDashboard: async () => {
    const res = await api.get('/dashboard');
    return res.data;
  },
  getVillages: async () => {
    const res = await api.get('/villages');
    return res.data;
  },
  getVillageMap: async (villageId) => {
    const res = await api.get(`/villages/${villageId}`);
    return res.data;
  },
  getParcels: async (params = {}) => {
    const res = await api.get('/parcels', { params });
    return res.data;
  },
  getParcel: async (id) => {
    const res = await api.get(`/parcels/${id}`);
    return res.data;
  },
  getParcelHistory: async (id) => {
    const res = await api.get(`/parcels/${id}/history`);
    return res.data;
  },
  updateParcelStatus: async (id, payload) => {
    const res = await api.put(`/parcels/${id}/status`, payload);
    return res.data;
  }
};

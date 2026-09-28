import api from './api';

export const conflictService = {
  getConflicts: async (params = {}) => {
    const res = await api.get('/conflicts', { params });
    return res.data;
  },
  getConflict: async (id) => {
    const res = await api.get(`/conflicts/${id}`);
    return res.data;
  },
  runAnalysis: async () => {
    const res = await api.post('/conflicts/run-analysis');
    return res.data;
  },
  updateConflictStatus: async (id, status) => {
    const res = await api.put(`/conflicts/${id}/status`, { status });
    return res.data;
  }
};

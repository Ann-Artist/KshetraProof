import api from './api';

export const objectionService = {
  getObjections: async () => {
    const res = await api.get('/objections');
    return res.data;
  },
  getObjection: async (id) => {
    const res = await api.get(`/objections/${id}`);
    return res.data;
  },
  submitObjection: async (formData) => {
    const res = await api.post('/objections', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  updateObjectionStatus: async (id, status) => {
    const res = await api.put(`/objections/${id}/status`, { status });
    return res.data;
  }
};

export const reviewService = {
  getPendingReviews: async () => {
    const res = await api.get('/reviews/pending');
    return res.data;
  },
  submitDecision: async (parcelId, decisionPayload) => {
    const res = await api.post(`/reviews/${parcelId}/decision`, decisionPayload);
    return res.data;
  }
};

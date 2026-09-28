import api from './api';

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

export default reviewService;

import { apiClient } from "./config";

export const getSymptoms = async () => {
    return await apiClient.get('/symptoms');
};

export const getOneSymptom = async (id) => {
    return await apiClient.get(`/symptoms/${id}`);
};

export const addSymptom = async (payload) => {
    return await apiClient.post('/symptoms', payload);
};

export const updateSymptom = async (id, payload) => {
    return await apiClient.put(`/symptoms/${id}`, payload);
};

export const deleteSymptom = async (id) => {
    return await apiClient.delete(`/symptoms/${id}`);
};

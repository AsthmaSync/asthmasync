import { apiClient } from "./config";

export const getMedications = async () => {
    return await apiClient.get('/medications');
};

export const getOneMedication = async (id) => {
    return await apiClient.get(`/medications/${id}`);
};

export const addMedication = async (payload) => {
    return await apiClient.post('/medications', payload);
};

export const updateMedication = async (id, payload) => {
    return await apiClient.patch(`/medications/${id}`, payload);
};

export const deleteMedication = async (id) => {
    return await apiClient.delete(`/medications/${id}`);
};

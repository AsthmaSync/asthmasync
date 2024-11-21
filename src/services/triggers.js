import { apiClient } from "./config";

export const getTriggers = async () => {
    return await apiClient.get('/triggers');
};

export const getOneTrigger = async (id) => {
    return await apiClient.get(`/triggers/${id}`);
};

export const addTrigger = async (payload) => {
    return await apiClient.post('/triggers', payload);
};

export const updateTrigger = async (id, payload) => {
    return await apiClient.patch(`/triggers/${id}`, payload);
};

export const deleteTrigger = async (id) => {
    return await apiClient.delete(`/triggers/${id}`);
};

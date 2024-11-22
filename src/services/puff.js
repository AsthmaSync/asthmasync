import { apiClient } from "./config";

// Get all inhalers
export const getInhalers = async () => {
    return await apiClient.get('/inhalers');
};

// Get one inhaler details
export const getOneInhaler = async (id) => {
    return await apiClient.get(`/inhalers/${id}`);
};

// Add new inhaler
export const addInhaler = async (payload) => {
    return await apiClient.post('/inhalers', payload);
};

// Record puffs used
export const recordPuffsUsed = async (inhalerId, puffsUsed) => {
    return await apiClient.patch(`/inhalers/${inhalerId}`, { puffsUsed });
};

// Track inhaler puffs
export const trackInhalerPuffs = async (inhalerId) => {
    return await apiClient.get(`/inhalers/${inhalerId}`);
};

// Delete inhaler
export const deleteInhaler = async (id) => {
    return await apiClient.delete(`/inhalers/${id}`);
}; 
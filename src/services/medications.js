import { apiClient } from "./config";

export const getMedications = async () => {
    return await apiClient.get('/medications');
};

export const getOneMedication = async (id) => {
    return await apiClient.get(`/medications/${id}`);
};

export const addMedication = async (payload) => {
    const formattedPayload = {
        name: payload.name,
        dosage: payload.dosage,
        frequency: payload.frequency,
        startDate: payload.startDate,
        endDate: payload.endDate || undefined,
        purpose: payload.purpose,
        taken: payload.taken,
        dosageTaken: Number(payload.dosageTaken)
    };

    console.log('Sending to server:', formattedPayload);
    return await apiClient.post('/medications', formattedPayload);
};

export const updateMedication = async (id, payload) => {
    return await apiClient.patch(`/medications/${id}`, payload);
};

export const deleteMedication = async (id) => {
    return await apiClient.delete(`/medications/${id}`);
};

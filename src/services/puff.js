import { apiClient } from "./config";

// Get all inhalers
export const getInhalers = async () => {
    try {
        const response = await apiClient.get('/inhalers');
        console.log('Raw inhalers response:', response);
        const inhalers = Array.isArray(response.data) ? response.data : 
                        (response.data?.inhalers || []);
        return { data: inhalers };
    } catch (error) {
        console.error('Error in getInhalers:', error);
        throw error;
    }
};

// Get one inhaler
export const getOneInhaler = async (id) => {
    try {
        const response = await apiClient.get(`/inhalers/${id}`);
        return response;
    } catch (error) {
        console.error('Error in getOneInhaler:', error);
        throw error;
    }
};

// Add new inhaler
export const addInhaler = async (payload) => {
    try {
        const response = await apiClient.post('/inhalers', payload);
        console.log('Add inhaler response:', response);
        return response;
    } catch (error) {
        console.error('Error in addInhaler:', error);
        throw error;
    }
};

// Record puffs used
export const recordPuffsUsed = async (inhalerId, puffsUsed) => {
    try {
        const response = await apiClient.patch(`/inhalers/${inhalerId}`, {
            inhalerId,
            puffsUsed: Number(puffsUsed)
        });
        console.log('Record puffs response:', response);

        // Extract the updated inhaler data from the response
        const updatedInhaler = response.data.inhaler || response.data;
        const remainingPuffs = updatedInhaler.remainingPuffs;
        const originalTotal = updatedInhaler.oriTotal;

        return {
            status: response.status,
            data: {
                message: response.data.message || 'Successfully recorded puffs',
                inhaler: {
                    remainingPuffs,
                    oriTotal: originalTotal
                }
            }
        };
    } catch (error) {
        console.error('Error in recordPuffsUsed:', error);
        throw error;
    }
};

// Track inhaler puffs
export const trackInhalerPuffs = async (inhalerId) => {
    try {
        const response = await apiClient.get(`/inhalers/${inhalerId}`);
        return response;
    } catch (error) {
        console.error('Error in trackInhalerPuffs:', error);
        throw error;
    }
};

// Delete inhaler
export const deleteInhaler = async (id) => {
    try {
        const response = await apiClient.delete(`/inhalers/${id}`);
        return response;
    } catch (error) {
        console.error('Error in deleteInhaler:', error);
        throw error;
    }
};


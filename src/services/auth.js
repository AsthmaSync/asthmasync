import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    try {
        const response = await apiClient.post('/users/register', payload);
        if (response.data && response.data.token) {
            return {
                data: {
                    token: response.data.token
                }
            };
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export const apiLogin = async (payload) => {
    return await apiClient.post('/users/signin', payload)
}

export const apiData = async () => {
    try {
        // First get the dashboard data
        const dashboardResponse = await apiClient.get('/users/me/dashboard');
        
        // Then get medications separately
        const medicationsResponse = await apiClient.get('/medications');
        
        console.log('Dashboard data:', dashboardResponse.data);
        console.log('User medications data:', medicationsResponse.data);
        
        // Combine the data
        const data = {
            ...dashboardResponse.data,
            medications: medicationsResponse.data || [],
            symptoms: dashboardResponse.data.symptoms || [],
            triggers: dashboardResponse.data.triggers || [],
            inhalers: dashboardResponse.data.inhalers || []
        };
        
        return { data };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}

export const apiUser = async () => {
    return await apiClient.get('/users/me')
}


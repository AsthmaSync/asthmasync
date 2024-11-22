import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    return await apiClient.post('/users/register', payload)
}

export const apiLogin = async (payload) => {
    return await apiClient.post('/users/signin', payload)
}

export const apiData = async () => {
    return await apiClient.get('/users/me/dashboard');
}

export const apiUser = async () => {
    return await apiClient.get('/users/me')
}


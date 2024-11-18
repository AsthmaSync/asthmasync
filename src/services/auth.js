import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    return await apiClient.post ('/users/register', payload)
}
export const apiLogin = async (payload) => {
    return await apiClient.post ('/users/signin', payload)
}
export const apiProfile = async (payload) => {
    return await apiClient.get ( '/users/me/dashboard', payload)
}
export const apiUser = async (payload) => {
    return await apiClient.fetch( '/users/me', payload)
}


import { baseAPI } from "../config/apiService"

export const api = {
    // API AUTH
    getProfile: () => {
        return baseAPI.get(`/profile`)
    },

    getProfileById: () => {
        return baseAPI.get(`/profile/${id}`)
    }
}
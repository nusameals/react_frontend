import { baseAPI } from "../config/apiService"

export const api = {

    // getBiodata: () => {
    //     return baseAPI.get(`/biodatas`);
    // },

    // getBiodataById: (id) => {
    //     return baseAPI.get(`/biodatas/${id}`);
    // },

    // createBiodata: (body)=>{
    //     return baseAPI.post(`/biodatas`, body)
    // },

    // updateBiodata: (id, body) => {
    //     return baseAPI.put(`/biodatas/${id}`, body)
    // },

    // deleteBiodata: (id) => {
    //     return baseAPI.delete(`/biodatas/${id}`)
    // },

    getMenu: () => {
        return baseAPI.get(`/menuProduct`);
    }

}
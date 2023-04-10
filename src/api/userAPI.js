
import axios from 'axios'
import { url } from './api';
const URL = `${url}/api/user`;


export const createUser = (payload) => axios.post(`${URL}/create-user`, payload)

export const updatePracticeProgress = (payload) => {

    return axios.put(`${URL}/update-practice-progress`,payload,{
        headers: {
            token:
            "Bearer " +
            JSON.parse(localStorage.getItem("user")).accessToken,
          },
    })
}

export const updateLearningProgress = (payload) => {
    return axios.put(`${URL}/update-learning-progress`,payload,{
        headers: {
            token:
            "Bearer " +
            JSON.parse(localStorage.getItem("user")).accessToken,
          },
    }) 
}

export const updateUserInfo = (payload) => {  
    return axios.put(`${URL}/update-user-info`,payload,{
        headers: {
            token:
            "Bearer " +
            JSON.parse(localStorage.getItem("user")).accessToken,
          },
    }) 
}

export const getUser = (userCre) => axios.post(`${URL}/get-user`, userCre)

export const getNewUsers = () => axios.get(`${URL}/get-new-user`)



import axios from 'axios'
import { url } from './api';
const URL = `${url}/api/auth`;


export const register = (payload) => {
    return axios.post(`${URL}/register`, payload)
}

export const verify = (payload) => {
    return axios.post(`${URL}/register/verify`, payload)
}

export const loginStart = (user) => axios.post(`${URL}/login`, user)
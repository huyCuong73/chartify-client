
import axios from 'axios'
import { url } from './api';
const URL = `${url}/api/post`;


export const getPost = () => {
    return axios.get(`${URL}/`)
}

export const getPostDetail = (id) => {
    return axios.get(`${URL}/${id}`)
}
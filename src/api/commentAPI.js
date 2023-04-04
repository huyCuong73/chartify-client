import axios from 'axios'
import { url } from './api';
const URL = `${url}/api/comment`;

export const submitComment = (payload) => axios.post(`${URL}/post-comment`, payload, {
    headers: {
        token:
        "Bearer " +
        JSON.parse(localStorage.getItem("user")).accessToken,
      },
})

export const getComments = (pageId) => axios.get(`${URL}/${pageId}`)

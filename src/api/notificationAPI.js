import axios from 'axios'
import { url } from './api';
const URL = `${url}/api/notification`;

export const updateNotification = (payload) => {

    return axios.put(`${URL}/update-notification`,payload,{
        headers: {
            token:
            "Bearer " +
            JSON.parse(localStorage.getItem("user")).accessToken,
        },
    })
}

export const getNotif = (payload) => axios.post(`${URL}/get-notification`,payload)

export const updateNewNotif = (payload) => axios.put(`${URL}/update-state-notif`,payload)

export const createNotif = (payload) => axios.post(`${URL}/create-notif`,payload)
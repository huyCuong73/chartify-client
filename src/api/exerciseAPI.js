
import axios from 'axios'
import { url } from './api';
const URL = `${url}/api/exercise`;

export const getAllExercises = (payload) => {
    if(localStorage.getItem("user")){
        return axios.post(`${URL}/`,payload,{
            headers: {
                token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
              },
        })
    }else{
        return axios.get(`${URL}/`)
    }
}



export const getExercise = (order) => axios.get(`${URL}/${order}`) 
export const submit = (payload) => axios.put(`${URL}/check-answer`,payload) 
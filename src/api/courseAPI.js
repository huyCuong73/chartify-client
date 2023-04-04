import axios from 'axios'
import { url } from './api';
const URL = `${url}/api/course`;

export const getCourses = () => {
    const res = axios.get(`${URL}/`)
    return res
}
export const getOneCourse = (id) => axios.get(`${URL}/${id}`)


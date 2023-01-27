import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: `http://localhost:4000/api`
    //VITE_API_URL
    //'https://backend-mern-calendar.up.railway.app/api'
})

//interceptors 
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default calendarApi
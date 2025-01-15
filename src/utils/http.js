// axios基础的封装
import axios from 'axios'
const httpRequest = axios.create({
    baseURL: '',    // TODO
    timeout: 5000
})

export default httpRequest
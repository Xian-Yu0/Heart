// axios基础的封装
import axios from 'axios'
const httpRequest = axios.create({
    baseURL: 'http://124.70.67.210:8000/',    // TODO
    timeout: 500000
})

export default httpRequest